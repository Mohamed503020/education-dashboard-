import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { MaterialService } from '../../../core/services/material.service';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { LiveStreamService } from '../../../core/services/live-stream.service';
import { AuthService } from '../../../core/services/auth.service';
import { Course, Material } from '../../../core/models/course.model';
import { LiveStream } from '../../../core/models/live-stream.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="course-detail" *ngIf="course">
      <div class="course-hero">
        <div class="hero-content">
          <span class="course-category">{{ course.category }}</span>
          <h1>{{ course.title }}</h1>
          <p class="course-description">{{ course.description }}</p>
          
          <div class="course-stats">
            <div class="stat">
              <span class="stat-value">{{ course.enrolledStudents.length || 0 }}</span>
              <span class="stat-label">Students</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ materials.length }}</span>
              <span class="stat-label">Lessons</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ course.level }}</span>
              <span class="stat-label">Level</span>
            </div>
          </div>

          <div class="course-instructor">
            <div class="instructor-avatar">👨‍🏫</div>
            <div class="instructor-info">
              <span class="instructor-label">Instructor</span>
              <span class="instructor-name">{{ getInstructorName() }}</span>
            </div>
          </div>
        </div>

        <div class="hero-sidebar">
          <div class="enrollment-card">
            @if (course.thumbnail) {
              <img [src]="course.thumbnail" alt="Course thumbnail" class="card-thumbnail">
            }
            
            <div class="card-content">
              <div class="price-section">
                @if (course.price && course.price > 0) {
                  <span class="price">\${{ course.price }}</span>
                } @else {
                  <span class="price free">Free</span>
                }
              </div>

              @if (isEnrolled) {
                <button class="btn btn-success btn-block" routerLink="learn">
                  Continue Learning
                </button>
              } @else if (isTeacher) {
                <button class="btn btn-primary btn-block" routerLink="manage">
                  Manage Course
                </button>
              } @else {
                <button 
                  class="btn btn-primary btn-block" 
                  (click)="enrollInCourse()"
                  [disabled]="isEnrolling"
                >
                  @if (isEnrolling) {
                    <span class="spinner-border spinner-border-sm me-2"></span>
                  }
                  Enroll Now
                </button>
              }

              @if (!authService.isAuthenticated()) {
                <p class="login-prompt">
                  <a routerLink="/login" [queryParams]="{returnUrl: '/courses/' + course._id}">
                    Sign in
                  </a> to enroll in this course
                </p>
              }
            </div>
          </div>
        </div>
      </div>

      <div class="course-body">
        <div class="main-content">
          <section class="content-section">
            <h2>Course Content</h2>
            @if (materials.length === 0) {
              <div class="empty-content">
                <p>No lessons available yet</p>
              </div>
            } @else {
              <div class="materials-list">
                @for (material of materials; track material._id; let i = $index) {
                  <div class="material-item" [class.locked]="!isEnrolled && !isTeacher">
                    <div class="material-icon">
                      @if (material.type === 'video') {
                        🎥
                      } @else if (material.type === 'pdf') {
                        📄
                      } @else {
                        📝
                      }
                    </div>
                    <div class="material-info">
                      <span class="material-order">Lesson {{ i + 1 }}</span>
                      <h4>{{ material.title }}</h4>
                      @if (material.description) {
                        <p>{{ material.description }}</p>
                      }
                    </div>
                    <div class="material-meta">
                      @if (material.duration) {
                        <span class="duration">{{ formatDuration(material.duration) }}</span>
                      }
                      @if (!isEnrolled && !isTeacher) {
                        <span class="lock-icon">🔒</span>
                      }
                    </div>
                  </div>
                }
              </div>
            }
          </section>

          @if (liveStreams.length > 0) {
            <section class="content-section">
              <h2>Live Sessions</h2>
              <div class="live-streams-list">
                @for (stream of liveStreams; track stream._id) {
                  <div class="stream-item" [class.live]="stream.status === 'live'">
                    <div class="stream-status">
                      @if (stream.status === 'live') {
                        <span class="live-badge">🔴 LIVE NOW</span>
                      } @else if (stream.status === 'scheduled') {
                        <span class="scheduled-badge">📅 Scheduled</span>
                      }
                    </div>
                    <h4>{{ stream.title }}</h4>
                    @if (stream.scheduledStartTime) {
                      <p class="stream-time">{{ stream.scheduledStartTime | date:'medium' }}</p>
                    }
                    @if (stream.status === 'live' && (isEnrolled || isTeacher)) {
                      <button 
                        class="btn btn-sm btn-danger" 
                        [routerLink]="['/live', stream._id]"
                      >
                        Join Now
                      </button>
                    }
                  </div>
                }
              </div>
            </section>
          }
        </div>
      </div>
    </div>

    @if (isLoading) {
      <div class="loading-overlay">
        <div class="spinner"></div>
      </div>
    }
  `,
  styles: [`
    .course-detail {
      background: #f8f9fa;
      min-height: 100vh;
    }

    .course-hero {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 60px 24px;
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 40px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .hero-content {
      color: white;
    }

    .course-category {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      font-size: 13px;
      margin-bottom: 16px;
    }

    .hero-content h1 {
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .course-description {
      font-size: 18px;
      line-height: 1.7;
      opacity: 0.9;
      margin-bottom: 32px;
    }

    .course-stats {
      display: flex;
      gap: 32px;
      margin-bottom: 32px;
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 28px;
      font-weight: 700;
    }

    .stat-label {
      font-size: 13px;
      opacity: 0.7;
      text-transform: capitalize;
    }

    .course-instructor {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .instructor-avatar {
      width: 56px;
      height: 56px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .instructor-label {
      display: block;
      font-size: 12px;
      opacity: 0.7;
    }

    .instructor-name {
      font-weight: 600;
      font-size: 16px;
    }

    .enrollment-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      position: sticky;
      top: 24px;
    }

    .card-thumbnail {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-content {
      padding: 24px;
    }

    .price-section {
      text-align: center;
      margin-bottom: 20px;
    }

    .price {
      font-size: 36px;
      font-weight: 700;
      color: #1a1a2e;
    }

    .price.free {
      color: #2e7d32;
    }

    .btn {
      padding: 14px 24px;
      border-radius: 8px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s;
    }

    .btn-block {
      width: 100%;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-success {
      background: #2e7d32;
      color: white;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-sm {
      padding: 8px 16px;
      font-size: 14px;
    }

    .login-prompt {
      text-align: center;
      margin-top: 16px;
      font-size: 14px;
      color: #666;
    }

    .login-prompt a {
      color: #667eea;
      font-weight: 600;
    }

    .course-body {
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .content-section {
      background: white;
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 24px;
    }

    .content-section h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;
      color: #1a1a2e;
    }

    .materials-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .material-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 12px;
      transition: background 0.2s;
    }

    .material-item:hover {
      background: #f0f0f0;
    }

    .material-item.locked {
      opacity: 0.6;
    }

    .material-icon {
      width: 48px;
      height: 48px;
      background: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .material-info {
      flex: 1;
    }

    .material-order {
      font-size: 12px;
      color: #667eea;
      font-weight: 600;
    }

    .material-info h4 {
      font-size: 16px;
      font-weight: 600;
      margin: 4px 0;
    }

    .material-info p {
      font-size: 13px;
      color: #666;
      margin: 0;
    }

    .material-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .duration {
      font-size: 13px;
      color: #888;
    }

    .lock-icon {
      font-size: 20px;
    }

    .live-streams-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .stream-item {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 12px;
      border-left: 4px solid #e1e1e1;
    }

    .stream-item.live {
      border-left-color: #dc3545;
      background: #fff5f5;
    }

    .live-badge {
      color: #dc3545;
      font-weight: 600;
    }

    .scheduled-badge {
      color: #667eea;
    }

    .stream-item h4 {
      font-size: 16px;
      margin: 8px 0;
    }

    .stream-time {
      font-size: 13px;
      color: #666;
      margin-bottom: 12px;
    }

    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #e1e1e1;
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 992px) {
      .course-hero {
        grid-template-columns: 1fr;
      }

      .enrollment-card {
        position: static;
      }
    }
  `]
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private materialService = inject(MaterialService);
  private enrollmentService = inject(EnrollmentService);
  private liveStreamService = inject(LiveStreamService);
  authService = inject(AuthService);

  course: Course | null = null;
  materials: Material[] = [];
  liveStreams: LiveStream[] = [];
  
  isLoading = true;
  isEnrolled = false;
  isEnrolling = false;
  isTeacher = false;

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourse(courseId);
    }
  }

  loadCourse(id: string): void {
    this.isLoading = true;
    
    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.course = course;
        this.checkEnrollment(id);
        this.loadMaterials(id);
        this.loadLiveStreams(id);
        this.checkTeacherStatus(course);
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['/courses']);
      }
    });
  }

  checkEnrollment(courseId: string): void {
    if (this.authService.isAuthenticated()) {
      this.enrollmentService.isEnrolled(courseId).subscribe({
        next: (enrolled) => {
          this.isEnrolled = enrolled;
        }
      });
    }
  }

  checkTeacherStatus(course: Course): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const teacherId = typeof course.teacher === 'string' 
        ? course.teacher 
        : (course.teacher as any)?._id;
      this.isTeacher = currentUser._id === teacherId || currentUser.role === 'admin';
    }
  }

  loadMaterials(courseId: string): void {
    this.materialService.getMaterialsByCourse(courseId).subscribe({
      next: (materials) => {
        this.materials = materials;
      }
    });
  }

  loadLiveStreams(courseId: string): void {
    this.liveStreamService.getLiveStreamsByCourse(courseId).subscribe({
      next: (streams) => {
        this.liveStreams = streams.filter(s => s.status !== 'ended');
      }
    });
  }

  enrollInCourse(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: `/courses/${this.course?._id}` }
      });
      return;
    }

    this.isEnrolling = true;
    this.enrollmentService.enrollInCourse(this.course!._id).subscribe({
      next: () => {
        this.isEnrolled = true;
        this.isEnrolling = false;
      },
      error: () => {
        this.isEnrolling = false;
      }
    });
  }

  getInstructorName(): string {
    if (!this.course) return '';
    const teacher = this.course.teacher;
    if (typeof teacher === 'string') {
      return 'Instructor';
    }
    return `${(teacher as any)?.firstName} ${(teacher as any)?.lastName}`;
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}
