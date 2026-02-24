import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CourseService } from '../../../core/services/course.service';
import { LiveStreamService } from '../../../core/services/live-stream.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  user: any;
  courses: any[] = [];
  liveStreams: any[] = [];

  private authService = inject(AuthService);
  private courseService = inject(CourseService);
  private liveStreamService = inject(LiveStreamService);

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadCourses();
    this.loadLiveStreams();
  }

  private loadCourses(): void {
    this.courseService.getMyCourses().subscribe({
      next: (res) => this.courses = res,
      error: () => this.courses = []
    });
  }

  private loadLiveStreams(): void {
    this.liveStreamService.getMyLiveStreams().subscribe({
      next: (res) => this.liveStreams = res,
      error: () => this.liveStreams = []
    });
  }
}
