import { User } from './auth.model';

export type CourseStage = 'primary' | 'preparatory' | 'secondary';

export interface Course {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  teacher: User | string;
  instructor?: User | string; // alias for backward compatibility
  category: string;
  stage?: CourseStage;
  grade?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published' | 'archived';
  price: number;
  isFree?: boolean;
  materials: Material[];
  enrolledStudents: string[];
  enrollmentCount: number;
  tags: string[];
  rating?: number;
  ratingCount?: number;
  duration?: number;
  liveStreams?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  _id: string;
  title: string;
  description?: string;
  type: 'video' | 'pdf' | 'assignment' | 'document' | 'link';
  fileUrl: string;
  duration?: number;
  order: number;
  course: string;
  uploadedBy: string;
  submissions?: Submission[];
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  student: string;
  fileUrl: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  category: string;
  stage?: CourseStage;
  grade?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  price?: number;
  isFree?: boolean;
  status?: 'draft' | 'published';
  shortDescription?: string;
  tags?: string[];
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  category?: string;
  stage?: CourseStage;
  grade?: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
  status?: 'draft' | 'published' | 'archived';
  price?: number;
  tags?: string[];
}

export interface Enrollment {
  _id: string;
  student: User | string;
  course: Course | string;
  enrolledAt: string;
  completedMaterials: string[];
  progress: number;
  lastAccessedAt?: string;
  completedAt?: string;
  status: 'active' | 'completed' | 'dropped';
}
