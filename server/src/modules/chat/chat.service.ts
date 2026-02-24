import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChatMessage, ChatMessageDocument, MessageType } from '../../models/chat-message.model';
import { LiveStream, LiveStreamDocument, LiveStreamStatus } from '../../models/live-stream.model';
import { SendMessageDto, GetMessagesDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessageDocument>,
    @InjectModel(LiveStream.name) private liveStreamModel: Model<LiveStreamDocument>,
  ) {}

  async sendMessage(sendMessageDto: SendMessageDto, senderId: string): Promise<ChatMessageDocument> {
    const { liveStreamId, content, type, replyTo } = sendMessageDto;

    // Verify live stream exists and is live
    const liveStream = await this.liveStreamModel.findById(liveStreamId);
    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    if (liveStream.status !== LiveStreamStatus.LIVE) {
      throw new ForbiddenException('Chat is only available during live streams');
    }

    if (!liveStream.chatEnabled) {
      throw new ForbiddenException('Chat is disabled for this stream');
    }

    const message = new this.chatMessageModel({
      liveStream: new Types.ObjectId(liveStreamId),
      sender: new Types.ObjectId(senderId),
      content,
      type: type || MessageType.TEXT,
      replyTo: replyTo ? new Types.ObjectId(replyTo) : undefined,
    });

    const savedMessage = await message.save();
    return savedMessage.populate('sender', '-password');
  }

  async getMessages(getMessagesDto: GetMessagesDto): Promise<{ messages: ChatMessageDocument[]; total: number }> {
    const { liveStreamId, page = 1, limit = 50 } = getMessagesDto;
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      this.chatMessageModel.find({
        liveStream: new Types.ObjectId(liveStreamId),
        isDeleted: false,
      })
        .populate('sender', '-password')
        .populate('replyTo')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 1 }),
      this.chatMessageModel.countDocuments({
        liveStream: new Types.ObjectId(liveStreamId),
        isDeleted: false,
      }),
    ]);

    return { messages, total };
  }

  async getRecentMessages(liveStreamId: string, limit: number = 50): Promise<ChatMessageDocument[]> {
    return this.chatMessageModel.find({
      liveStream: new Types.ObjectId(liveStreamId),
      isDeleted: false,
    })
      .populate('sender', '-password')
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async deleteMessage(messageId: string, userId: string, isTeacher: boolean): Promise<ChatMessageDocument> {
    const message = await this.chatMessageModel.findById(messageId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    // Only sender or teacher can delete
    if (message.sender.toString() !== userId && !isTeacher) {
      throw new ForbiddenException('You are not authorized to delete this message');
    }

    message.isDeleted = true;
    message.deletedAt = new Date();
    message.deletedBy = new Types.ObjectId(userId);

    await message.save();
    return message;
  }

  async pinMessage(messageId: string, userId: string): Promise<ChatMessageDocument> {
    const message = await this.chatMessageModel.findById(messageId)
      .populate('liveStream');

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    // Only teacher can pin messages
    const liveStream = message.liveStream as unknown as LiveStreamDocument;
    if (liveStream.teacher.toString() !== userId) {
      throw new ForbiddenException('Only the teacher can pin messages');
    }

    message.isPinned = !message.isPinned;
    await message.save();
    return message.populate('sender');
  }

  async getPinnedMessages(liveStreamId: string): Promise<ChatMessageDocument[]> {
    return this.chatMessageModel.find({
      liveStream: new Types.ObjectId(liveStreamId),
      isPinned: true,
      isDeleted: false,
    })
      .populate('sender', '-password')
      .sort({ createdAt: -1 });
  }

  async createSystemMessage(liveStreamId: string, content: string, type: MessageType): Promise<ChatMessageDocument> {
    // For system messages, we use a null sender or a specific system user
    const message = new this.chatMessageModel({
      liveStream: new Types.ObjectId(liveStreamId),
      sender: null,
      content,
      type,
    });

    return message.save();
  }
}
