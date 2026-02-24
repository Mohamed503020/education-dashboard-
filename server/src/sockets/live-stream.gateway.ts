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
import { LiveStreamService } from '../modules/live-stream/live-stream.service';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userName?: string;
  userRole?: string;
}

@WebSocketGateway({
  namespace: '/live-stream',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class LiveStreamGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Track users in rooms
  private roomUsers: Map<string, Set<{ odId: string; userName: string; socket: string }>> = new Map();

  constructor(
    private jwtService: JwtService,
    private liveStreamService: LiveStreamService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (token) {
        const payload = this.jwtService.verify(token);
        client.userId = payload.sub;
        client.userName = payload.email;
        client.userRole = payload.role;
        console.log(`Client connected: ${client.userId}`);
      }
    } catch (error) {
      console.log('Connection without valid token');
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      // Remove from all rooms
      this.roomUsers.forEach((users, roomId) => {
        const user = Array.from(users).find(u => u.odId === client.userId);
        if (user) {
          users.delete(user);
          
          // Notify room
          this.server.to(roomId).emit('userLeft', {
            odId: client.userId,
            userName: client.userName,
          });

          // Update participant count
          this.server.to(roomId).emit('participantCount', {
            count: users.size,
          });
        }
      });
    }
    console.log(`Client disconnected: ${client.userId}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string },
  ) {
    if (!client.userId) {
      return { error: 'Unauthorized' };
    }

    const { roomId } = data;

    try {
      // Join the live stream
      await this.liveStreamService.join(roomId, client.userId);

      // Join socket room
      client.join(roomId);

      // Track user in room
      if (!this.roomUsers.has(roomId)) {
        this.roomUsers.set(roomId, new Set());
      }

      this.roomUsers.get(roomId).add({
        odId: client.userId,
        userName: client.userName,
        socket: client.id,
      });

      // Notify room
      this.server.to(roomId).emit('userJoined', {
        odId: client.userId,
        userName: client.userName,
      });

      // Send current participant count
      const participants = this.roomUsers.get(roomId);
      this.server.to(roomId).emit('participantCount', {
        count: participants?.size || 0,
      });

      return { success: true, roomId };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string },
  ) {
    if (!client.userId) {
      return { error: 'Unauthorized' };
    }

    const { roomId } = data;

    try {
      await this.liveStreamService.leave(roomId, client.userId);

      // Leave socket room
      client.leave(roomId);

      // Remove from tracking
      const users = this.roomUsers.get(roomId);
      if (users) {
        const user = Array.from(users).find(u => u.odId === client.userId);
        if (user) {
          users.delete(user);
        }
      }

      // Notify room
      this.server.to(roomId).emit('userLeft', {
        odId: client.userId,
        userName: client.userName,
      });

      // Update participant count
      this.server.to(roomId).emit('participantCount', {
        count: users?.size || 0,
      });

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('raiseHand')
  async handleRaiseHand(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string },
  ) {
    if (!client.userId) {
      return { error: 'Unauthorized' };
    }

    const { roomId } = data;

    try {
      await this.liveStreamService.raiseHand(roomId, client.userId);

      // Notify room (especially teacher)
      this.server.to(roomId).emit('handRaised', {
        odId: client.userId,
        userName: client.userName,
        raisedAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('lowerHand')
  async handleLowerHand(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string },
  ) {
    if (!client.userId) {
      return { error: 'Unauthorized' };
    }

    const { roomId } = data;

    try {
      await this.liveStreamService.lowerHand(roomId, client.userId);

      // Notify room
      this.server.to(roomId).emit('handLowered', {
        odId: client.userId,
        userName: client.userName,
      });

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('answerHand')
  async handleAnswerHand(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string; studentId: string },
  ) {
    if (!client.userId || client.userRole !== 'teacher') {
      return { error: 'Unauthorized' };
    }

    const { roomId, studentId } = data;

    try {
      await this.liveStreamService.answerHand(roomId, studentId, client.userId);

      // Notify room
      this.server.to(roomId).emit('handAnswered', {
        studentId,
        answeredAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('startStream')
  async handleStartStream(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { liveStreamId: string },
  ) {
    if (!client.userId || client.userRole !== 'teacher') {
      return { error: 'Unauthorized' };
    }

    try {
      const liveStream = await this.liveStreamService.start(data.liveStreamId, client.userId);

      // Notify all users in the course that stream has started
      this.server.emit('streamStarted', {
        liveStreamId: liveStream._id,
        roomId: liveStream.roomId,
        title: liveStream.title,
        course: liveStream.course,
      });

      return { success: true, roomId: liveStream.roomId };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('endStream')
  async handleEndStream(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { liveStreamId: string; roomId: string },
  ) {
    if (!client.userId || client.userRole !== 'teacher') {
      return { error: 'Unauthorized' };
    }

    try {
      const liveStream = await this.liveStreamService.end(data.liveStreamId, client.userId);

      // Notify all users in the room
      this.server.to(data.roomId).emit('streamEnded', {
        liveStreamId: liveStream._id,
        roomId: liveStream.roomId,
        duration: liveStream.duration,
      });

      // Clear room tracking
      this.roomUsers.delete(data.roomId);

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('getParticipants')
  async handleGetParticipants(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string },
  ) {
    const users = this.roomUsers.get(data.roomId);
    return {
      participants: users ? Array.from(users).map(u => ({
        odId: u.odId,
        userName: u.userName,
      })) : [],
    };
  }

  // Method to broadcast to a specific room (used by other services)
  broadcastToRoom(roomId: string, event: string, data: any) {
    this.server.to(roomId).emit(event, data);
  }

  // Method to broadcast to all connected clients
  broadcastToAll(event: string, data: any) {
    this.server.emit(event, data);
  }

  // ─── WebRTC Signaling ────────────────────────────────────────────

  @SubscribeMessage('webrtc-offer')
  async handleWebRTCOffer(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string; offer: any },
  ) {
    // Teacher broadcasts SDP offer to all students in the room
    client.to(data.roomId).emit('webrtc-offer', {
      offer: data.offer,
      from: client.userId,
    });
    return { success: true };
  }

  @SubscribeMessage('webrtc-answer')
  async handleWebRTCAnswer(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string; answer: any; to: string },
  ) {
    // Student sends SDP answer back to the teacher
    // Find the teacher's socket in the room
    const roomUsers = this.roomUsers.get(data.roomId);
    if (roomUsers) {
      const target = Array.from(roomUsers).find(u => u.odId === data.to);
      if (target) {
        this.server.to(target.socket).emit('webrtc-answer', {
          answer: data.answer,
          from: client.userId,
        });
      }
    }
    return { success: true };
  }

  @SubscribeMessage('webrtc-ice-candidate')
  async handleICECandidate(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string; candidate: any; to?: string },
  ) {
    if (data.to) {
      // Send ICE candidate to specific peer
      const roomUsers = this.roomUsers.get(data.roomId);
      if (roomUsers) {
        const target = Array.from(roomUsers).find(u => u.odId === data.to);
        if (target) {
          this.server.to(target.socket).emit('webrtc-ice-candidate', {
            candidate: data.candidate,
            from: client.userId,
          });
        }
      }
    } else {
      // Broadcast ICE candidate to all others in the room
      client.to(data.roomId).emit('webrtc-ice-candidate', {
        candidate: data.candidate,
        from: client.userId,
      });
    }
    return { success: true };
  }

  @SubscribeMessage('camera-status')
  async handleCameraStatus(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string; hasCamera: boolean; hasAudio: boolean },
  ) {
    // Broadcast camera/audio status to all in room
    this.server.to(data.roomId).emit('camera-status', {
      userId: client.userId,
      hasCamera: data.hasCamera,
      hasAudio: data.hasAudio,
    });
    return { success: true };
  }
}
