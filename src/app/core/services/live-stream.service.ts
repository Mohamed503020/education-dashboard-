import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, filter, map, tap } from 'rxjs';
import { LiveStream, CreateLiveStreamRequest, Participant, RaisedHand } from '../models/live-stream.model';
import { WebSocketService } from './websocket.service';
import { environment } from '../../../environments/environment';

export interface LiveStreamEvent {
  type: string;
  data: any;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService {
  private http = inject(HttpClient);
  private wsService = inject(WebSocketService);
  
  private apiUrl = `${environment.apiUrl}/live-streams`;
  private currentStreamSubject = new BehaviorSubject<LiveStream | null>(null);
  private participantsSubject = new BehaviorSubject<Participant[]>([]);
  private raisedHandsSubject = new BehaviorSubject<RaisedHand[]>([]);
  private eventsSubject = new Subject<LiveStreamEvent>();

  currentStream$ = this.currentStreamSubject.asObservable();
  participants$ = this.participantsSubject.asObservable();
  raisedHands$ = this.raisedHandsSubject.asObservable();
  events$ = this.eventsSubject.asObservable();

  // REST API methods
  createLiveStream(data: CreateLiveStreamRequest): Observable<LiveStream> {
    return this.http.post<LiveStream>(this.apiUrl, data);
  }

  getLiveStream(id: string): Observable<LiveStream> {
    return this.http.get<LiveStream>(`${this.apiUrl}/${id}`);
  }

  getLiveStreamsByCourse(courseId: string): Observable<LiveStream[]> {
    return this.http.get<LiveStream[]>(`${this.apiUrl}/course/${courseId}`);
  }

  getActiveLiveStreams(): Observable<LiveStream[]> {
    return this.http.get<LiveStream[]>(`${this.apiUrl}/live`);
  }

  getMyLiveStreams(): Observable<LiveStream[]> {
    return this.http.get<LiveStream[]>(`${this.apiUrl}/my-streams`);
  }

  startLiveStream(id: string): Observable<LiveStream> {
    return this.http.post<LiveStream>(`${this.apiUrl}/${id}/start`, {}).pipe(
      tap(stream => this.currentStreamSubject.next(stream))
    );
  }

  endLiveStream(id: string): Observable<LiveStream> {
    return this.http.post<LiveStream>(`${this.apiUrl}/${id}/end`, {}).pipe(
      tap(stream => this.currentStreamSubject.next(stream))
    );
  }

  deleteLiveStream(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // WebSocket methods
  joinStream(roomId: string): Observable<LiveStreamEvent> {
    const messages$ = this.wsService.connect('live-stream');
    
    // Send join event — wait for socket connection then join
    this.wsService.sendWhenReady('live-stream', 'joinRoom', { roomId });

    return messages$.pipe(
      map(message => ({
        type: message.event || message.type,
        data: message.data,
        timestamp: new Date()
      })),
      tap(event => {
        this.handleStreamEvent(event);
        this.eventsSubject.next(event);
      })
    );
  }

  leaveStream(roomId: string): void {
    this.wsService.send('live-stream', 'leaveRoom', { roomId });
    this.wsService.disconnect('live-stream');
    this.currentStreamSubject.next(null);
    this.participantsSubject.next([]);
    this.raisedHandsSubject.next([]);
  }

  raiseHand(roomId: string): void {
    this.wsService.send('live-stream', 'raiseHand', { roomId });
  }

  lowerHand(roomId: string): void {
    this.wsService.send('live-stream', 'lowerHand', { roomId });
  }

  acknowledgeHand(roomId: string, userId: string): void {
    this.wsService.send('live-stream', 'answerHand', { roomId, studentId: userId });
  }

  private handleStreamEvent(event: LiveStreamEvent): void {
    switch (event.type) {
      case 'streamData':
      case 'stream-update':
        if (event.data.stream) {
          this.currentStreamSubject.next(event.data.stream);
        }
        break;
      case 'userJoined':
        const joinData = event.data;
        const newParticipant: Participant = {
          user: joinData.odId || joinData.userId || joinData.user,
          joinedAt: new Date().toISOString(),
          socketId: joinData.socketId,
          userName: joinData.userName
        };
        const currentParticipants = this.participantsSubject.value;
        // Avoid duplicates
        const alreadyExists = currentParticipants.some(p => p.user === newParticipant.user);
        if (!alreadyExists) {
          this.participantsSubject.next([...currentParticipants, newParticipant]);
        }
        break;
      case 'userLeft':
        const leftId = event.data.odId || event.data.userId || event.data.user;
        const filtered = this.participantsSubject.value.filter(
          p => p.user !== leftId
        );
        this.participantsSubject.next(filtered);
        break;
      case 'handRaised':
        const handData = event.data;
        const newHand: RaisedHand = {
          user: handData.odId || handData.userId || handData.user,
          raisedAt: handData.raisedAt || new Date().toISOString(),
          addressed: false
        };
        const currentHands = this.raisedHandsSubject.value;
        this.raisedHandsSubject.next([...currentHands, newHand]);
        break;
      case 'handLowered':
        const loweredId = event.data.odId || event.data.userId || event.data.user;
        const filteredHands = this.raisedHandsSubject.value.filter(
          h => h.user !== loweredId
        );
        this.raisedHandsSubject.next(filteredHands);
        break;
      case 'participantsList':
        this.participantsSubject.next(event.data.participants || []);
        break;
      case 'raisedHandsList':
        this.raisedHandsSubject.next(event.data.raisedHands || []);
        break;
    }
  }

  getCurrentStream(): LiveStream | null {
    return this.currentStreamSubject.value;
  }
}
