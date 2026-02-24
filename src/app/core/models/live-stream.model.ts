import { User } from './auth.model';
import { Course } from './course.model';

export interface LiveStream {
  _id: string;
  title: string;
  description?: string;
  course: Course | string;
  teacher: User | string;
  roomId: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  scheduledStartTime?: string;
  actualStartTime?: string;
  endTime?: string;
  duration?: number;
  participants: any[];
  participantCount: number;
  raisedHands: RaisedHand[];
  maxParticipants: number;
  recordingUrl?: string;
  chatEnabled: boolean;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  user: string;
  joinedAt: string;
  leftAt?: string;
  socketId?: string;
  userName?: string;
}

export interface RaisedHand {
  user: string;
  raisedAt: string;
  addressed: boolean;
}

export interface CreateLiveStreamRequest {
  title: string;
  description?: string;
  course: string;
  scheduledStartTime?: string;
  maxParticipants?: number;
}

export interface ChatMessage {
  _id: string;
  liveStream: string;
  sender: User | string;
  content: string;
  type: 'text' | 'system' | 'announcement' | 'hand_raise' | 'hand_lower' | 'join' | 'leave';
  replyTo?: string;
  isPinned: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  liveStreamId: string;
  content: string;
  type?: 'text' | 'announcement';
  replyTo?: string;
}

export interface Notification {
  _id: string;
  recipient: string;
  type: 'live_starting' | 'live_started' | 'live_ended' | 'new_material' | 'assignment_graded' | 'enrollment_confirmed' | 'general';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
