import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Course, 
  CreateCourseRequest, 
  UpdateCourseRequest 
} from '../models/course.model';
import { environment } from '../../../environments/environment';

export interface CourseFilter {
  category?: string;
  level?: string;
  status?: string;
  stage?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  courses: T[];
  total: number;
}

export interface CoursesResponse {
  courses: Course[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/courses`;

  getCourses(filter?: CourseFilter): Observable<CoursesResponse> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.category) params = params.set('category', filter.category);
      if (filter.level) params = params.set('level', filter.level);
      if (filter.status) params = params.set('status', filter.status);
      if (filter.stage) params = params.set('stage', filter.stage);
      if (filter.search) params = params.set('search', filter.search);
      if (filter.page) params = params.set('page', filter.page.toString());
      if (filter.limit) params = params.set('limit', filter.limit.toString());
    }

    return this.http.get<CoursesResponse>(this.apiUrl, { params });
  }

  getPublishedCourses(filter?: CourseFilter): Observable<CoursesResponse> {
    return this.getCourses({ ...filter, status: 'published' });
  }

  // ...existing code...

  getMyCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/my-courses`);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/enrolled`);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(data: CreateCourseRequest): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, data);
  }

  updateCourse(id: string, data: UpdateCourseRequest): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/${id}`, data);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadThumbnail(courseId: string, file: File): Observable<Course> {
    const formData = new FormData();
    formData.append('thumbnail', file);
    return this.http.post<Course>(`${this.apiUrl}/${courseId}/thumbnail`, formData);
  }

  publishCourse(id: string): Observable<Course> {
    return this.updateCourse(id, { status: 'published' });
  }

  archiveCourse(id: string): Observable<Course> {
    return this.updateCourse(id, { status: 'archived' });
  }

  // ...existing code...
}
