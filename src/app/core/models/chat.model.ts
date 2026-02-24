export interface ChatMessage {
  _id: string;
  content: string;
  sender: string | SenderInfo;
  liveStream: string;
  type: MessageType;
  replyTo?: string;
  isPinned: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SenderInfo {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
}

export enum MessageType {
  TEXT = 'text',
  SYSTEM = 'system',
  QUESTION = 'question'
}

export interface SendMessageRequest {
  content: string;
  liveStreamId: string;
  type?: MessageType;
  replyTo?: string;
}

export interface ChatEvent {
  type: 'new-message' | 'message-pinned' | 'message-deleted';
  data: ChatMessage;
  timestamp: Date;
}
