import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CourseService } from '../../../core/services/course.service';
import { LiveStreamService } from '../../../core/services/live-stream.service';

@Component({
  selector: 'app-student-website',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-website.component.html',
  styleUrls: ['./student-website.component.scss']
})
export class StudentWebsiteComponent implements OnInit {
  user: any;
  enrolledCourses: any[] = [];
  publishedCourses: any[] = [];
  activeLiveStreams: any[] = [];

  private authService = inject(AuthService);
  private courseService = inject(CourseService);
  private liveStreamService = inject(LiveStreamService);

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadPublishedCourses();
    this.loadActiveLiveStreams();
    this.loadEnrolledCourses();
  }

  private loadPublishedCourses(): void {
    this.courseService.getPublishedCourses({ limit: 6 }).subscribe({
      next: (res) => this.publishedCourses = res.courses || [],
      error: () => this.publishedCourses = []
    });
  }

  private loadActiveLiveStreams(): void {
    this.liveStreamService.getActiveLiveStreams().subscribe({
      next: (res) => this.activeLiveStreams = res,
      error: () => this.activeLiveStreams = []
    });
  }

  private loadEnrolledCourses(): void {
    this.courseService.getEnrolledCourses().subscribe({
      next: (res) => this.enrolledCourses = res,
      error: () => this.enrolledCourses = []
    });
  }
}
