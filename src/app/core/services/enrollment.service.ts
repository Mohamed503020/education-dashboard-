import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/course.model';
import { environment } from '../../../environments/environment';

export interface EnrollResponse {
  enrollment: Enrollment;
  message: string;
}

export interface UpdateProgressRequest {
  materialId: string;
  completed: boolean;
  watchTime?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/enrollments`;

  enrollInCourse(courseId: string): Observable<EnrollResponse> {
    return this.http.post<EnrollResponse>(this.apiUrl, { courseId });
  }

  unenrollFromCourse(courseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}`);
  }

  getMyEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/my-enrollments`);
  }

  getEnrollmentByCourse(courseId: string): Observable<Enrollment | null> {
    return this.http.get<Enrollment | null>(`${this.apiUrl}/course/${courseId}`);
  }

  getCourseEnrollments(courseId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/course/${courseId}/students`);
  }

  updateProgress(enrollmentId: string, data: UpdateProgressRequest): Observable<Enrollment> {
    return this.http.patch<Enrollment>(`${this.apiUrl}/${enrollmentId}/progress`, data);
  }

  markMaterialComplete(enrollmentId: string, materialId: string): Observable<Enrollment> {
    return this.updateProgress(enrollmentId, { materialId, completed: true });
  }

  getEnrollmentStats(): Observable<{
    totalEnrollments: number;
    completedCourses: number;
    inProgress: number;
  }> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  isEnrolled(courseId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check/${courseId}`);
  }
}
