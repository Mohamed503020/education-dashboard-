import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam, ExamAttempt, QuestionAnswer } from '../models/exam.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/exams`;

  getExamsByCourse(courseId: string): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}/course/${courseId}`);
  }

  getExamById(id: string): Observable<Exam> {
    return this.http.get<Exam>(`${this.apiUrl}/${id}`);
  }

  getMyExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}/my-exams`);
  }

  createExam(data: any): Observable<Exam> {
    return this.http.post<Exam>(this.apiUrl, data);
  }

  updateExam(id: string, data: any): Observable<Exam> {
    return this.http.patch<Exam>(`${this.apiUrl}/${id}`, data);
  }

  deleteExam(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Attempts
  startExam(examId: string): Observable<ExamAttempt> {
    return this.http.post<ExamAttempt>(`${this.apiUrl}/${examId}/start`, {});
  }

  submitExam(attemptId: string, answers: { questionIndex: number; selectedAnswer: number }[]): Observable<ExamAttempt> {
    return this.http.post<ExamAttempt>(`${this.apiUrl}/attempts/${attemptId}/submit`, { answers });
  }

  getMyAttempts(examId: string): Observable<ExamAttempt[]> {
    return this.http.get<ExamAttempt[]>(`${this.apiUrl}/${examId}/attempts`);
  }

  getAttempt(attemptId: string): Observable<ExamAttempt> {
    return this.http.get<ExamAttempt>(`${this.apiUrl}/attempts/${attemptId}`);
  }

  getCourseResults(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/course/${courseId}/results`);
  }
}
