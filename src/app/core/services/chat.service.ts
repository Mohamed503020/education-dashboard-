import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { ChatMessage, SendMessageRequest } from '../models/live-stream.model';
import { WebSocketService } from './websocket.service';
import { environment } from '../../../environments/environment';

export interface ChatEvent {
  type: string;
  data: any;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private wsService = inject(WebSocketService);
  
  private apiUrl = `${environment.apiUrl}/chat`;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  private newMessageSubject = new Subject<ChatMessage>();
  private pinnedMessagesSubject = new BehaviorSubject<ChatMessage[]>([]);

  messages$ = this.messagesSubject.asObservable();
  newMessage$ = this.newMessageSubject.asObservable();
  pinnedMessages$ = this.pinnedMessagesSubject.asObservable();

  // REST API methods
  getMessages(liveStreamId: string, limit: number = 50, page?: number): Observable<ChatMessage[]> {
    let url = `${this.apiUrl}/messages/${liveStreamId}?limit=${limit}`;
    if (page) url += `&page=${page}`;
    return this.http.get<{ messages: ChatMessage[]; total: number }>(url).pipe(
      map(response => response.messages || [])
    );
  }

  getPinnedMessages(liveStreamId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/messages/${liveStreamId}/pinned`);
  }

  // WebSocket methods
  connectToChat(liveStreamId: string): Observable<ChatEvent> {
    const messages$ = this.wsService.connect('chat');
    
    // Join chat room — wait for socket to be connected
    this.wsService.sendWhenReady('chat', 'joinChat', { liveStreamId });

    // Load existing messages
    this.getMessages(liveStreamId).subscribe(messages => {
      this.messagesSubject.next(messages);
    });

    this.getPinnedMessages(liveStreamId).subscribe(pinned => {
      this.pinnedMessagesSubject.next(pinned);
    });

    return messages$.pipe(
      map(message => ({
        type: message.event || message.type,
        data: message.data,
        timestamp: new Date()
      })),
      tap(event => this.handleChatEvent(event))
    );
  }

  disconnectFromChat(liveStreamId: string): void {
    this.wsService.send('chat', 'leaveChat', { liveStreamId });
    this.wsService.disconnect('chat');
    this.messagesSubject.next([]);
    this.pinnedMessagesSubject.next([]);
  }

  sendMessage(data: SendMessageRequest): void {
    this.wsService.send('chat', 'sendMessage', data);
  }

  pinMessage(messageId: string): void {
    this.wsService.send('chat', 'pinMessage', { messageId });
  }

  unpinMessage(messageId: string): void {
    this.wsService.send('chat', 'unpinMessage', { messageId });
  }

  deleteMessage(messageId: string): void {
    this.wsService.send('chat', 'deleteMessage', { messageId });
  }

  private handleChatEvent(event: ChatEvent): void {
    switch (event.type) {
      case 'newMessage':
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next([...currentMessages, event.data]);
        this.newMessageSubject.next(event.data);
        break;
      case 'messagePinned':
        const pinned = this.pinnedMessagesSubject.value;
        this.pinnedMessagesSubject.next([...pinned, event.data]);
        break;
      case 'messageUnpinned':
        const filteredPinned = this.pinnedMessagesSubject.value.filter(
          m => m._id !== event.data._id
        );
        this.pinnedMessagesSubject.next(filteredPinned);
        break;
      case 'messageDeleted':
        const filtered = this.messagesSubject.value.filter(
          m => m._id !== event.data._id
        );
        this.messagesSubject.next(filtered);
        break;
      case 'chatHistory':
        this.messagesSubject.next(event.data.messages || []);
        break;
    }
  }

  getMessageCount(): number {
    return this.messagesSubject.value.length;
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
    this.pinnedMessagesSubject.next([]);
  }
}
