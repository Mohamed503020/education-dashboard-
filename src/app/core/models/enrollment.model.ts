export interface Enrollment {
  _id: string;
  student: string | StudentInfo;
  course: string | CourseInfo;
  enrolledAt: Date;
  progress: MaterialProgress[];
  completedAt?: Date;
  certificate?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface CourseInfo {
  _id: string;
  title: string;
  thumbnail?: string;
}

export interface MaterialProgress {
  material: string;
  completed: boolean;
  completedAt?: Date;
  watchTime?: number;
}

export interface EnrollmentStats {
  totalEnrollments: number;
  completedCourses: number;
  inProgressCourses: number;
  averageProgress: number;
}

export interface UpdateProgressRequest {
  materialId: string;
  completed: boolean;
  watchTime?: number;
}
