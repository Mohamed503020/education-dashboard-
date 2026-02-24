import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatMessageDocument = ChatMessage & Document;

export enum MessageType {
  TEXT = 'text',
  SYSTEM = 'system',
  HAND_RAISE = 'hand_raise',
  HAND_LOWER = 'hand_lower',
  JOIN = 'join',
  LEAVE = 'leave',
}

@Schema({ timestamps: true })
export class ChatMessage {
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LiveStream', required: true })
  liveStream: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ enum: MessageType, default: MessageType.TEXT })
  type: MessageType;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deletedBy?: Types.ObjectId;

  @Prop({ default: false })
  isPinned: boolean;

  @Prop({ type: Types.ObjectId, ref: 'ChatMessage' })
  replyTo?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);

// Indexes for faster queries
ChatMessageSchema.index({ liveStream: 1, createdAt: 1 });
ChatMessageSchema.index({ sender: 1 });
