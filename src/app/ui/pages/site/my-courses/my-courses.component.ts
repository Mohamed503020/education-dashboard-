import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { CertificateService } from '../../../../core/services/certificate.service';
import { Course } from '../../../../core/models/course.model';
import { Certificate } from '../../../../core/models/certificate.model';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  private enrollmentService = inject(EnrollmentService);
  private certificateService = inject(CertificateService);

  enrollments: any[] = [];
  certificates: Certificate[] = [];
  loading = true;
  activeTab: 'courses' | 'certificates' = 'courses';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.enrollmentService.getMyEnrollments().subscribe({
      next: (data) => {
        this.enrollments = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

    this.certificateService.getMyCertificates().subscribe({
      next: (certs) => {
        this.certificates = certs;
      }
    });
  }

  getCourseName(enrollment: any): string {
    if (typeof enrollment.course === 'object' && enrollment.course) {
      return enrollment.course.title || 'كورس';
    }
    return 'كورس';
  }

  getCourseId(enrollment: any): string {
    if (typeof enrollment.course === 'object' && enrollment.course) {
      return enrollment.course._id || '';
    }
    return enrollment.course || '';
  }

  getStageName(stage?: string): string {
    const names: Record<string, string> = {
      'primary': 'ابتدائي',
      'preparatory': 'اعدادي',
      'secondary': 'ثانوي'
    };
    return stage ? names[stage] || '' : '';
  }

  getStageColor(stage?: string): string {
    const colors: Record<string, string> = {
      'primary': '#4CAF50',
      'preparatory': '#2196F3',
      'secondary': '#9C27B0'
    };
    return stage ? colors[stage] || '#1a6b3c' : '#1a6b3c';
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getCertificateForCourse(courseId: string): Certificate | undefined {
    return this.certificates.find(c => {
      const cId = typeof c.course === 'object' ? (c.course as any)._id : c.course;
      return cId === courseId;
    });
  }
}
