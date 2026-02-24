import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../../core/services/course.service';
import { Course, CourseStage } from '../../../../core/models/course.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stage-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './stage-courses.component.html',
  styleUrls: ['./stage-courses.component.scss']
})
export class StageCoursesComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private destroy$ = new Subject<void>();

  stage: CourseStage = 'primary';
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  loading = true;
  searchQuery = '';
  totalCourses = 0;

  stageInfo: Record<string, { name: string; icon: string; color: string; description: string }> = {
    'primary': {
      name: 'المرحلة الابتدائية',
      icon: '🎒',
      color: '#4CAF50',
      description: 'كورسات اللغة العربية للمرحلة الابتدائية من الصف الأول إلى السادس'
    },
    'preparatory': {
      name: 'المرحلة الاعدادية',
      icon: '📖',
      color: '#2196F3',
      description: 'كورسات اللغة العربية للمرحلة الاعدادية من الصف الأول إلى الثالث'
    },
    'secondary': {
      name: 'المرحلة الثانوية',
      icon: '🎓',
      color: '#9C27B0',
      description: 'كورسات اللغة العربية للمرحلة الثانوية من الصف الأول إلى الثالث'
    }
  };

  get currentStageInfo() {
    return this.stageInfo[this.stage] || this.stageInfo['primary'];
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.stage = params['stage'] as CourseStage;
      this.loadCourses();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCourses() {
    this.loading = true;
    this.courseService.getPublishedCourses({ stage: this.stage, limit: 50 }).subscribe({
      next: (res) => {
        this.courses = res.courses;
        this.filteredCourses = res.courses;
        this.totalCourses = res.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredCourses = this.courses;
      return;
    }
    const q = this.searchQuery.toLowerCase();
    this.filteredCourses = this.courses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }

  getTeacherName(course: Course): string {
    if (typeof course.teacher === 'object' && course.teacher) {
      return `${(course.teacher as any).firstName || ''} ${(course.teacher as any).lastName || ''}`.trim();
    }
    return 'مدرس';
  }

  getGradeName(grade?: number): string {
    if (!grade) return '';
    const names = ['', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'];
    return `الصف ${names[grade] || grade}`;
  }
}
