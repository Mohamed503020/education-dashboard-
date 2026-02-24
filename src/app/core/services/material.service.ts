import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material, Submission } from '../models/course.model';
import { environment } from '../../../environments/environment';

export interface CreateMaterialRequest {
  title: string;
  description?: string;
  type: 'video' | 'pdf' | 'assignment' | 'document' | 'link';
  course: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  duration?: number;
  order?: number;
  isPublished?: boolean;
}

export interface UploadResponse {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export interface UpdateMaterialRequest {
  title?: string;
  description?: string;
  order?: number;
  isPublished?: boolean;
}

export interface GradeSubmissionRequest {
  grade: number;
  feedback?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/materials`;

  getMaterialsByCourse(courseId: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/course/${courseId}`);
  }

  getMaterialById(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  // Create material with JSON body (backend expects JSON, not FormData)
  createMaterialJson(data: CreateMaterialRequest): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, data);
  }

  // Upload file to get fileUrl, then create material separately
  uploadFile(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload`, formData);
  }

  // Legacy FormData method (kept for backward compatibility)
  createMaterial(data: CreateMaterialRequest, file: File): Observable<Material> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', data.title);
    formData.append('type', data.type);
    formData.append('course', data.course);
    if (data.description) formData.append('description', data.description);
    if (data.order !== undefined) formData.append('order', data.order.toString());

    return this.http.post<Material>(this.apiUrl, formData);
  }

  uploadMaterial(data: CreateMaterialRequest, file: File): Observable<HttpEvent<Material>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', data.title);
    formData.append('type', data.type);
    formData.append('course', data.course);
    if (data.description) formData.append('description', data.description);
    if (data.order !== undefined) formData.append('order', data.order.toString());

    return this.http.post<Material>(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updateMaterial(id: string, data: UpdateMaterialRequest): Observable<Material> {
    return this.http.patch<Material>(`${this.apiUrl}/${id}`, data);
  }

  deleteMaterial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  reorderMaterials(courseId: string, materialIds: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reorder`, { courseId, materialIds });
  }

  // Assignment submissions
  submitAssignment(materialId: string, file: File): Observable<Submission> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Submission>(`${this.apiUrl}/${materialId}/submit`, formData);
  }

  getSubmissions(materialId: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.apiUrl}/${materialId}/submissions`);
  }

  gradeSubmission(materialId: string, studentId: string, data: GradeSubmissionRequest): Observable<Submission> {
    return this.http.patch<Submission>(
      `${this.apiUrl}/${materialId}/submissions/${studentId}/grade`, 
      data
    );
  }

  downloadMaterial(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, {
      responseType: 'blob'
    });
  }
}
