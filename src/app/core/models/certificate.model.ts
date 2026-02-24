export interface Certificate {
  _id: string;
  certificateNumber: string;
  student: any;
  course: any;
  exam?: any;
  examAttempt?: any;
  studentName: string;
  courseName: string;
  examScore: number;
  issueDate: string;
  expiryDate?: string;
  isValid: boolean;
  createdAt: string;
  updatedAt: string;
}
