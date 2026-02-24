import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';
import { CourseService, CourseFilter } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';
import { AuthService } from '../../../core/services/auth.service';

interface CategoryStat {
  name: string;
  count: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  languageService = inject(LanguageService);
  private courseService = inject(CourseService);
  private authService = inject(AuthService);
  
  viewMode = signal<'grid' | 'list'>('grid');
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('');
  selectedLevel = signal<string>('');

  courses: Course[] = [];
  categories: string[] = [];
  isLoading = true;
  totalCourses = 0;

  categoryStats: CategoryStat[] = [];

  levels = ['beginner', 'intermediate', 'advanced'];

  // Color palette for categories
  private categoryColors: { [key: string]: { icon: string; color: string } } = {
    'Technology': { icon: 'computer', color: '#6366f1' },
    'Science': { icon: 'science', color: '#10b981' },
    'Business': { icon: 'business', color: '#f59e0b' },
    'Arts': { icon: 'palette', color: '#ec4899' },
    'Design': { icon: 'design_services', color: '#8b5cf6' },
  };
  private defaultCatStyle = { icon: 'category', color: '#64748b' };

  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
  }

  loadCourses(): void {
    this.isLoading = true;
    const filter: CourseFilter = {};
    if (this.searchQuery()) filter.search = this.searchQuery();
    if (this.selectedCategory()) filter.category = this.selectedCategory();
    if (this.selectedLevel()) filter.level = this.selectedLevel();
    filter.limit = 50;

    this.courseService.getCourses(filter).subscribe({
      next: (res) => {
        this.courses = res.courses || [];
        this.totalCourses = res.total || this.courses.length;
        this.isLoading = false;
        this.buildCategoryStats();
      },
      error: () => {
        this.courses = [];
        this.isLoading = false;
      }
    });
  }

  loadCategories(): void {
    // Derive categories from loaded courses, or use a static fallback
    this.courseService.getCourses({ limit: 100 }).subscribe({
      next: (res) => {
        const cats = new Set<string>();
        (res.courses || []).forEach(c => { if (c.category) cats.add(c.category); });
        this.categories = Array.from(cats);
      },
      error: () => { this.categories = []; }
    });
  }

  private buildCategoryStats(): void {
    const map = new Map<string, number>();
    this.courses.forEach(c => {
      const cat = c.category || 'Other';
      map.set(cat, (map.get(cat) || 0) + 1);
    });
    this.categoryStats = Array.from(map.entries()).map(([name, count]) => {
      const style = this.categoryColors[name] || this.defaultCatStyle;
      return { name, count, icon: style.icon, color: style.color };
    });
  }

  onSearch(): void {
    this.loadCourses();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode.set(mode);
  }

  get filteredCourses(): Course[] {
    // Filtering is done server-side, but we can still do local text filter for instant UX
    return this.courses;
  }

  getTeacherName(course: Course): string {
    if (typeof course.teacher === 'object' && course.teacher) {
      return (course.teacher as any).firstName + ' ' + (course.teacher as any).lastName;
    }
    return 'Teacher';
  }

  getEnrollmentCount(course: Course): number {
    return course.enrolledStudents.length || course.enrollmentCount || 0;
  }

  getCourseColor(course: Course): string {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#22c55e', '#ef4444'];
    const idx = course.title ? course.title.charCodeAt(0) % colors.length : 0;
    return colors[idx];
  }

  getLevelBadgeClass(level: string): string {
    const classes: { [key: string]: string } = {
      'beginner': 'level-badge--beginner',
      'intermediate': 'level-badge--intermediate',
      'advanced': 'level-badge--advanced'
    };
    return classes[level] || '';
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'published': 'status-badge--active',
      'draft': 'status-badge--inactive',
      'archived': 'status-badge--upcoming'
    };
    return classes[status] || '';
  }

  deleteCourse(id: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => this.loadCourses(),
        error: (err) => alert('Failed to delete course: ' + (err.error?.message || 'Unknown error'))
      });
    }
  }

  get isTeacher(): boolean {
    return this.authService.isTeacher();
  }
}
