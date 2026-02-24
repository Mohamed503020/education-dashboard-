import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { WebSocketService } from './websocket.service';
import { environment } from '../../../environments/environment';

export interface Notification {
  _id: string;
  recipient: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: {
    courseId?: string;
    liveStreamId?: string;
    materialId?: string;
  };
  isRead: boolean;
  createdAt: Date;
}

export enum NotificationType {
  LIVE_STREAM_STARTED = 'live_stream_started',
  LIVE_STREAM_SCHEDULED = 'live_stream_scheduled',
  LIVE_STREAM_REMINDER = 'live_stream_reminder',
  NEW_MATERIAL = 'new_material',
  ASSIGNMENT_GRADED = 'assignment_graded',
  COURSE_ENROLLED = 'course_enrolled',
  GENERAL = 'general'
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);
  private wsService = inject(WebSocketService);
  
  private apiUrl = `${environment.apiUrl}/notifications`;
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);
  private newNotificationSubject = new Subject<Notification>();

  notifications$ = this.notificationsSubject.asObservable();
  unreadCount$ = this.unreadCountSubject.asObservable();
  newNotification$ = this.newNotificationSubject.asObservable();

  // REST API methods
  getNotifications(page: number = 1, limit: number = 20): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getUnreadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/unread`);
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/unread/count`).pipe(
      map(res => res.count),
      tap(count => this.unreadCountSubject.next(count))
    );
  }

  markAsRead(id: string): Observable<Notification> {
    return this.http.patch<Notification>(`${this.apiUrl}/${id}/read`, {}).pipe(
      tap(() => {
        const current = this.unreadCountSubject.value;
        if (current > 0) {
          this.unreadCountSubject.next(current - 1);
        }
        this.updateNotificationInList(id, { isRead: true });
      })
    );
  }

  markAllAsRead(): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/read-all`, {}).pipe(
      tap(() => {
        this.unreadCountSubject.next(0);
        const updated = this.notificationsSubject.value.map(n => ({ ...n, isRead: true }));
        this.notificationsSubject.next(updated);
      })
    );
  }

  deleteNotification(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const filtered = this.notificationsSubject.value.filter(n => n._id !== id);
        this.notificationsSubject.next(filtered);
      })
    );
  }

  // WebSocket methods
  connectToNotifications(): Observable<Notification> {
    const messages$ = this.wsService.connect('notifications');
    
    // Load initial notifications
    this.loadNotifications();
    
    return messages$.pipe(
      map(message => message.data as Notification),
      tap(notification => {
        this.handleNewNotification(notification);
      })
    );
  }

  disconnectFromNotifications(): void {
    this.wsService.disconnect('notifications');
  }

  private loadNotifications(): void {
    this.getNotifications().subscribe(notifications => {
      this.notificationsSubject.next(notifications);
    });
    
    this.getUnreadCount().subscribe();
  }

  private handleNewNotification(notification: Notification): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([notification, ...current]);
    
    if (!notification.isRead) {
      this.unreadCountSubject.next(this.unreadCountSubject.value + 1);
    }
    
    this.newNotificationSubject.next(notification);
    
    // Show browser notification if permitted
    this.showBrowserNotification(notification);
  }

  private updateNotificationInList(id: string, updates: Partial<Notification>): void {
    const current = this.notificationsSubject.value;
    const updated = current.map(n => 
      n._id === id ? { ...n, ...updates } : n
    );
    this.notificationsSubject.next(updated);
  }

  private showBrowserNotification(notification: Notification): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/assets/images/logo.png'
      });
    }
  }

  requestNotificationPermission(): void {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  refreshNotifications(): void {
    this.loadNotifications();
  }
}
