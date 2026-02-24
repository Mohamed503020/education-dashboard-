import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from '../models/certificate.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/certificates`;

  issueCertificate(courseId: string, examAttemptId?: string): Observable<Certificate> {
    return this.http.post<Certificate>(this.apiUrl, { courseId, examAttemptId });
  }

  getMyCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.apiUrl}/my-certificates`);
  }

  getCertificateById(id: string): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.apiUrl}/${id}`);
  }

  verifyCertificate(certificateNumber: string): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.apiUrl}/verify/${certificateNumber}`);
  }

  getCoursesCertificates(courseId: string): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.apiUrl}/course/${courseId}`);
  }
}
