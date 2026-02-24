import { Injectable, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { io, Socket } from 'socket.io-client';

export interface SocketMessage {
  event: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private authService = inject(AuthService);
  private sockets: Map<string, Socket> = new Map();
  private messageSubjects: Map<string, Subject<any>> = new Map();
  private connectionStatus = new BehaviorSubject<Map<string, boolean>>(new Map());

  connectionStatus$ = this.connectionStatus.asObservable();

  connect(namespace: string): Observable<any> {
    if (this.sockets.has(namespace)) {
      return this.messageSubjects.get(namespace)!.asObservable();
    }

    const token = this.authService.getToken();
    const messageSubject = new Subject<any>();

    const socket = io(`${environment.wsUrl}/${namespace}`, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log(`Socket.io connected to ${namespace}`);
      this.updateConnectionStatus(namespace, true);
    });

    socket.on('disconnect', (reason) => {
      console.log(`Socket.io disconnected from ${namespace}:`, reason);
      this.updateConnectionStatus(namespace, false);
    });

    socket.on('connect_error', (error) => {
      console.error(`Socket.io connection error on ${namespace}:`, error.message);
    });

    // Listen for all events using onAny
    socket.onAny((event: string, data: any) => {
      messageSubject.next({ event, type: event, data });
    });

    this.sockets.set(namespace, socket);
    this.messageSubjects.set(namespace, messageSubject);

    return messageSubject.asObservable();
  }

  send(namespace: string, event: string, data: any): void {
    const socket = this.sockets.get(namespace);
    if (socket && socket.connected) {
      socket.emit(event, data);
    }
  }

  /**
   * Queue a send until the socket is connected. If already connected, sends immediately.
   */
  sendWhenReady(namespace: string, event: string, data: any): void {
    const socket = this.sockets.get(namespace);
    if (!socket) return;
    if (socket.connected) {
      socket.emit(event, data);
    } else {
      socket.once('connect', () => {
        socket.emit(event, data);
      });
    }
  }

  /**
   * Listen for a specific event on a namespace.
   */
  on(namespace: string, event: string, callback: (data: any) => void): void {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.on(event, callback);
    }
  }

  /**
   * Remove listener for a specific event on a namespace.
   */
  off(namespace: string, event: string, callback?: (data: any) => void): void {
    const socket = this.sockets.get(namespace);
    if (socket) {
      if (callback) {
        socket.off(event, callback);
      } else {
        socket.off(event);
      }
    }
  }

  /**
   * Emit an event and wait for acknowledgement from the server.
   */
  sendWithAck(namespace: string, event: string, data: any): Promise<any> {
    const socket = this.sockets.get(namespace);
    if (socket && socket.connected) {
      return socket.emitWithAck(event, data);
    }
    return Promise.reject('Socket not connected');
  }

  disconnect(namespace: string): void {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.disconnect();
      this.sockets.delete(namespace);
      this.messageSubjects.delete(namespace);
      this.updateConnectionStatus(namespace, false);
    }
  }

  disconnectAll(): void {
    this.sockets.forEach((socket) => {
      socket.disconnect();
    });
    this.sockets.clear();
    this.messageSubjects.clear();
    this.connectionStatus.next(new Map());
  }

  private updateConnectionStatus(namespace: string, connected: boolean): void {
    const current = this.connectionStatus.value;
    current.set(namespace, connected);
    this.connectionStatus.next(new Map(current));
  }

  isConnected(namespace: string): boolean {
    return this.connectionStatus.value.get(namespace) || false;
  }

  ngOnDestroy(): void {
    this.disconnectAll();
  }
}
