import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CourseService } from '../../../../core/services/course.service';
import { ExamService } from '../../../../core/services/exam.service';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { Course } from '../../../../core/models/course.model';
import { Exam } from '../../../../core/models/exam.model';

@Component({
  selector: 'app-site-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-course-detail.component.html',
  styleUrls: ['./site-course-detail.component.scss']
})
export class SiteCourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private examService = inject(ExamService);
  private enrollmentService = inject(EnrollmentService);

  course: Course | null = null;
  exams: Exam[] = [];
  loading = true;
  enrolling = false;
  isEnrolled = false;

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  get currentUserId(): string {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}')._id || '';
    } catch { return ''; }
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadCourse(id);
  }

  loadCourse(id: string) {
    this.loading = true;
    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.course = course;
        this.isEnrolled = course.enrolledStudents.some(
          (s: any) => (typeof s === 'string' ? s : s._id) === this.currentUserId
        );
        this.loading = false;
        this.loadExams(id);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadExams(courseId: string) {
    this.examService.getExamsByCourse(courseId).subscribe({
      next: (exams) => this.exams = exams,
      error: () => {}
    });
  }

  enroll() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.course) return;

    this.enrolling = true;
    this.enrollmentService.enrollInCourse(this.course._id).subscribe({
      next: () => {
        this.isEnrolled = true;
        this.enrolling = false;
      },
      error: () => {
        this.enrolling = false;
      }
    });
  }

  getTeacherName(): string {
    if (this.course && typeof this.course.teacher === 'object') {
      return `${(this.course.teacher as any).firstName || ''} ${(this.course.teacher as any).lastName || ''}`.trim();
    }
    return 'مدرس';
  }

  getStageName(stage?: string): string {
    const names: Record<string, string> = {
      'primary': 'المرحلة الابتدائية',
      'preparatory': 'المرحلة الاعدادية',
      'secondary': 'المرحلة الثانوية'
    };
    return stage ? names[stage] || '' : '';
  }

  getGradeName(grade?: number): string {
    if (!grade) return '';
    const names = ['', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'];
    return `الصف ${names[grade] || grade}`;
  }
}
