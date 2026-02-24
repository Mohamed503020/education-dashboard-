import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

@WebSocketGateway({
  namespace: '/notifications',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<string, Set<string>> = new Map();

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (token) {
        const payload = this.jwtService.verify(token);
        client.userId = payload.sub;

        // Track user's socket connections
        if (!this.userSockets.has(client.userId)) {
          this.userSockets.set(client.userId, new Set());
        }
        this.userSockets.get(client.userId).add(client.id);

        // Join user-specific room for notifications
        client.join(`user:${client.userId}`);
        
        console.log(`Notification client connected: ${client.userId}`);
      }
    } catch (error) {
      console.log('Notification connection without valid token');
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      const userSocketSet = this.userSockets.get(client.userId);
      if (userSocketSet) {
        userSocketSet.delete(client.id);
        if (userSocketSet.size === 0) {
          this.userSockets.delete(client.userId);
        }
      }
    }
    console.log(`Notification client disconnected: ${client.userId}`);
  }

  // Send notification to specific user
  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  // Send notification to multiple users
  sendNotificationToUsers(userIds: string[], notification: any) {
    userIds.forEach(userId => {
      this.server.to(`user:${userId}`).emit('notification', notification);
    });
  }

  // Send live stream started notification
  sendLiveStreamNotification(userIds: string[], liveStreamData: any) {
    userIds.forEach(userId => {
      this.server.to(`user:${userId}`).emit('liveStreamStarted', liveStreamData);
    });
  }

  // Check if user is online
  isUserOnline(userId: string): boolean {
    return this.userSockets.has(userId) && this.userSockets.get(userId).size > 0;
  }

  // Get online users count
  getOnlineUsersCount(): number {
    return this.userSockets.size;
  }
}
