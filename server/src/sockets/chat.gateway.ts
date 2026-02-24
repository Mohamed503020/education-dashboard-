import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from '../modules/chat/chat.service';
import { MessageType } from '../models/chat-message.model';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userName?: string;
  userRole?: string;
}

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private chatService: ChatService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (token) {
        const payload = this.jwtService.verify(token);
        client.userId = payload.sub;
        client.userName = payload.email;
        client.userRole = payload.role;
        console.log(`Chat client connected: ${client.userId}`);
      }
    } catch (error) {
      console.log('Chat connection without valid token');
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    console.log(`Chat client disconnected: ${client.userId}`);
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { liveStreamId: string },
  ) {
    if (!client.userId) {
      return { error: 'Unauthorized' };
    }

    const { liveStreamId } = data;
    
    // Join chat room
    client.join(`chat:${liveStreamId}`);

    // Send recent messages
    const messages = await this.chatService.getRecentMessages(liveStreamId);

    return { 
      success: true, 
      messages: messages.reverse(), // Reverse to show oldest first
    };
  }

  @SubscribeMessage('leaveChat')
  async handleLeaveChat(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { liveStreamId: string },
  ) {
    client.leave(`chat:${data.liveStreamId}`);
    return { success: true };
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { liveStreamId: string; content: string; replyTo?: string },
  ) {
    if (!client.userId) {
      return { error: 'Unauthorized' };
    }

    try {
      const message = await this.chatService.sendMessage(
        {
          liveStreamId: data.liveStreamId,
          content: data.content,
          type: MessageType.TEXT,
          replyTo: data.replyTo,
        },
        client.userId,
      );

      // Broadcast to all clients in the chat room
      this.server.to(`chat:${data.liveStreamId}`).emit('newMessage', {
        _id: message._id,
        content: message.content,
        sender: message.sender,
        type: message.type,
        createdAt: message.createdAt,
        replyTo: message.replyTo,
      });

      return { success: true, message };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { liveStreamId: string; messageId: string },
  ) {
    if (!client.userId) {
      return { error: 'Unauthorized' };
    }

    try {
      await this.chatService.deleteMessage(
        data.messageId,
        client.userId,
        client.userRole === 'teacher',
      );

      // Notify all clients in the chat room
      this.server.to(`chat:${data.liveStreamId}`).emit('messageDeleted', {
        messageId: data.messageId,
      });

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('pinMessage')
  async handlePinMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { liveStreamId: string; messageId: string },
  ) {
    if (!client.userId || client.userRole !== 'teacher') {
      return { error: 'Unauthorized' };
    }

    try {
      const message = await this.chatService.pinMessage(data.messageId, client.userId);

      // Notify all clients in the chat room
      this.server.to(`chat:${data.liveStreamId}`).emit('messagePinned', {
        messageId: data.messageId,
        isPinned: message.isPinned,
        message,
      });

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { liveStreamId: string; isTyping: boolean },
  ) {
    if (!client.userId) {
      return { error: 'Unauthorized' };
    }

    // Broadcast typing indicator to others
    client.to(`chat:${data.liveStreamId}`).emit('userTyping', {
      userId: client.userId,
      userName: client.userName,
      isTyping: data.isTyping,
    });

    return { success: true };
  }

  // Helper method to broadcast system messages
  async broadcastSystemMessage(liveStreamId: string, content: string, type: MessageType) {
    const message = await this.chatService.createSystemMessage(liveStreamId, content, type);
    
    this.server.to(`chat:${liveStreamId}`).emit('newMessage', {
      _id: message._id,
      content: message.content,
      type: message.type,
      createdAt: message.createdAt,
      isSystem: true,
    });
  }
}
