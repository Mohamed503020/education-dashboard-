export type QuestionType = 'multiple_choice' | 'true_false';

export interface ExamQuestion {
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer?: number; // Hidden from students
  points: number;
}

export interface Exam {
  _id: string;
  title: string;
  description?: string;
  course: any;
  teacher: any;
  questions: ExamQuestion[];
  passingScore: number;
  timeLimit: number;
  maxAttempts: number;
  isActive: boolean;
  showResults: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AttemptStatus = 'in_progress' | 'completed' | 'timed_out';

export interface QuestionAnswer {
  questionIndex: number;
  selectedAnswer: number;
  isCorrect?: boolean;
}

export interface ExamAttempt {
  _id: string;
  exam: Exam | string;
  student: any;
  course: any;
  answers: QuestionAnswer[];
  score: number;
  totalPoints: number;
  earnedPoints: number;
  status: AttemptStatus;
  passed: boolean;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}
