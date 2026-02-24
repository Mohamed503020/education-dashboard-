export interface Material {
  _id: string;
  title: string;
  description?: string;
  type: MaterialType;
  course: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  duration?: number;
  order: number;
  isPublished: boolean;
  submissions?: Submission[];
  createdAt: Date;
  updatedAt: Date;
}

export enum MaterialType {
  VIDEO = 'video',
  PDF = 'pdf',
  ASSIGNMENT = 'assignment'
}

export interface Submission {
  student: string;
  fileUrl: string;
  fileName: string;
  submittedAt: Date;
  grade?: number;
  feedback?: string;
  gradedAt?: Date;
}

export interface CreateMaterialRequest {
  title: string;
  description?: string;
  type: MaterialType;
  course: string;
  order?: number;
}

export interface UpdateMaterialRequest {
  title?: string;
  description?: string;
  order?: number;
  isPublished?: boolean;
}

export interface SubmitAssignmentRequest {
  materialId: string;
  file: File;
}

export interface GradeSubmissionRequest {
  studentId: string;
  grade: number;
  feedback?: string;
}
