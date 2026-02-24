import { Types } from 'mongoose';

// User Types
export type UserRole = 'teacher' | 'student' | 'admin';

export interface IUser {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
  isActive: boolean;
  isVerified: boolean;
  lastLogin?: Date;
  studentId?: string;
  enrollmentDate?: Date;
  department?: string;
  specialization?: string;
  enrolledCourses?: Types.ObjectId[];
  teachingCourses?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Course Types
export type CourseStatus = 'draft' | 'published' | 'archived';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface ICourse {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  shortDescription?: string;
  teacher: Types.ObjectId | IUser;
  thumbnail?: string;
  status: CourseStatus;
  level: CourseLevel;
  category?: string;
  tags: string[];
  price: number;
  isFree: boolean;
  duration: number;
  enrolledStudents: Types.ObjectId[];
  enrollmentCount: number;
  materials: Types.ObjectId[];
  liveStreams: Types.ObjectId[];
  rating: number;
  ratingCount: number;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Material Types
export type MaterialType = 'video' | 'pdf' | 'assignment' | 'document' | 'link';
export type AssignmentStatus = 'not_submitted' | 'submitted' | 'graded' | 'late';

export interface ISubmission {
  student: Types.ObjectId;
  fileUrl: string;
  fileName: string;
  submittedAt: Date;
  score?: number;
  feedback?: string;
  status: AssignmentStatus;
}

export interface ICompletion {
  student: Types.ObjectId;
  completedAt: Date;
  progress: number;
}

export interface IMaterial {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  type: MaterialType;
  course: Types.ObjectId | ICourse;
  uploadedBy: Types.ObjectId | IUser;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  duration?: number;
  thumbnail?: string;
  order: number;
  isPublished: boolean;
  dueDate?: Date;
  maxScore?: number;
  submissions?: ISubmission[];
  completions?: ICompletion[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Live Stream Types
export type LiveStreamStatus = 'scheduled' | 'live' | 'ended' | 'cancelled';

export interface IRaisedHand {
  student: Types.ObjectId;
  raisedAt: Date;
  answeredAt?: Date;
  isAnswered: boolean;
}

export interface ILiveStream {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  course: Types.ObjectId | ICourse;
  teacher: Types.ObjectId | IUser;
  status: LiveStreamStatus;
  scheduledStartTime?: Date;
  actualStartTime?: Date;
  endTime?: Date;
  duration?: number;
  roomId: string;
  participants: Types.ObjectId[];
  participantCount: number;
  maxParticipants: number;
  raisedHands: IRaisedHand[];
  recordingUrl?: string;
  isRecorded: boolean;
  chatEnabled: boolean;
  thumbnail?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Chat Types
export type MessageType = 'text' | 'system' | 'hand_raise' | 'hand_lower' | 'join' | 'leave';

export interface IChatMessage {
  _id?: Types.ObjectId;
  liveStream: Types.ObjectId | ILiveStream;
  sender: Types.ObjectId | IUser;
  content: string;
  type: MessageType;
  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: Types.ObjectId;
  isPinned: boolean;
  replyTo?: Types.ObjectId | IChatMessage;
  createdAt?: Date;
  updatedAt?: Date;
}

// Notification Types
export type NotificationType =
  | 'live_stream_starting'
  | 'live_stream_started'
  | 'live_stream_ended'
  | 'new_material'
  | 'assignment_due'
  | 'assignment_graded'
  | 'course_enrolled'
  | 'course_update'
  | 'system';

export interface INotification {
  _id?: Types.ObjectId;
  recipient: Types.ObjectId | IUser;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  readAt?: Date;
  course?: Types.ObjectId | ICourse;
  liveStream?: Types.ObjectId | ILiveStream;
  material?: Types.ObjectId | IMaterial;
  actionUrl?: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

// Enrollment Types
export type EnrollmentStatus = 'active' | 'completed' | 'dropped' | 'suspended';

export interface IEnrollment {
  _id?: Types.ObjectId;
  student: Types.ObjectId | IUser;
  course: Types.ObjectId | ICourse;
  status: EnrollmentStatus;
  enrolledAt: Date;
  completedAt?: Date;
  progress: number;
  completedMaterials: Types.ObjectId[];
  totalTimeSpent: number;
  lastAccessedAt?: Date;
  certificateUrl?: string;
  finalGrade?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// API Response Types
export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
