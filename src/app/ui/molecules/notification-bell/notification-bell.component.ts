import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="notification-bell" *ngIf="authService.isAuthenticated()">
      <button class="bell-btn" (click)="toggleDropdown()">
        <span class="bell-icon">🔔</span>
        @if (unreadCount > 0) {
          <span class="badge">{{ unreadCount > 9 ? '9+' : unreadCount }}</span>
        }
      </button>

      @if (showDropdown) {
        <div class="dropdown">
          <div class="dropdown-header">
            <h4>Notifications</h4>
            @if (unreadCount > 0) {
              <button class="mark-all-btn" (click)="markAllAsRead()">Mark all read</button>
            }
          </div>
          
          <div class="dropdown-content">
            @if (notifications.length === 0) {
              <div class="empty-state">
                <p>No notifications</p>
              </div>
            } @else {
              @for (notification of notifications.slice(0, 5); track notification._id) {
                <div 
                  class="notification-item" 
                  [class.unread]="!notification.isRead"
                  (click)="handleNotificationClick(notification)"
                >
                  <div class="notification-icon">
                    {{ getNotificationIcon(notification.type) }}
                  </div>
                  <div class="notification-content">
                    <p class="notification-title">{{ notification.title }}</p>
                    <p class="notification-message">{{ notification.message }}</p>
                    <span class="notification-time">{{ notification.createdAt | date:'short' }}</span>
                  </div>
                </div>
              }
            }
          </div>
          
          @if (notifications.length > 5) {
            <div class="dropdown-footer">
              <a routerLink="/notifications" (click)="showDropdown = false">View all notifications</a>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .notification-bell {
      position: relative;
    }

    .bell-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      position: relative;
      font-size: 20px;
    }

    .badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #dc3545;
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      width: 360px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      overflow: hidden;
    }

    .dropdown-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #eee;
    }

    .dropdown-header h4 {
      margin: 0;
      font-size: 16px;
    }

    .mark-all-btn {
      background: none;
      border: none;
      color: #667eea;
      cursor: pointer;
      font-size: 13px;
    }

    .dropdown-content {
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-item {
      display: flex;
      gap: 12px;
      padding: 12px 16px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .notification-item:hover {
      background: #f8f9fa;
    }

    .notification-item.unread {
      background: #f0f4ff;
    }

    .notification-icon {
      width: 40px;
      height: 40px;
      background: #f5f5f5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    .notification-content {
      flex: 1;
      min-width: 0;
    }

    .notification-title {
      font-weight: 600;
      font-size: 14px;
      margin: 0 0 4px;
      color: #1a1a2e;
    }

    .notification-message {
      font-size: 13px;
      color: #666;
      margin: 0 0 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .notification-time {
      font-size: 11px;
      color: #999;
    }

    .empty-state {
      padding: 40px 20px;
      text-align: center;
      color: #666;
    }

    .dropdown-footer {
      padding: 12px;
      border-top: 1px solid #eee;
      text-align: center;
    }

    .dropdown-footer a {
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }
  `],
  host: {
    '(document:click)': 'onClickOutside($event)'
  }
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  authService = inject(AuthService);

  notifications: Notification[] = [];
  unreadCount = 0;
  showDropdown = false;

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.connectToNotifications();
    }

    const authSub = this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.connectToNotifications();
      }
    });
    this.subscriptions.push(authSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.notificationService.disconnectFromNotifications();
  }

  connectToNotifications(): void {
    const notifSub = this.notificationService.connectToNotifications().subscribe();
    const listSub = this.notificationService.notifications$.subscribe(
      notifications => this.notifications = notifications
    );
    const countSub = this.notificationService.unreadCount$.subscribe(
      count => this.unreadCount = count
    );
    this.subscriptions.push(notifSub, listSub, countSub);

    this.notificationService.requestNotificationPermission();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-bell')) {
      this.showDropdown = false;
    }
  }

  handleNotificationClick(notification: Notification): void {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification._id).subscribe();
    }
    this.showDropdown = false;
    // Navigate based on notification type/data
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe();
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'live_stream_started':
        return '🔴';
      case 'live_stream_scheduled':
        return '📅';
      case 'new_material':
        return '📚';
      case 'assignment_graded':
        return '📝';
      case 'course_enrolled':
        return '🎓';
      default:
        return '🔔';
    }
  }
}
