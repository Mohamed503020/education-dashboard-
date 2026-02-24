export interface Notification {
  _id: string;
  recipient: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: NotificationData;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationData {
  courseId?: string;
  liveStreamId?: string;
  materialId?: string;
  userId?: string;
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

export interface NotificationEvent {
  type: 'new-notification' | 'notification-read';
  data: Notification;
  timestamp: Date;
}
