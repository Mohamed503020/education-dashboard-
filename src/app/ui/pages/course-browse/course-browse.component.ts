import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService, CourseFilter } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-course-browse',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="course-browse">
      <div class="browse-header">
        <h1>Browse Courses</h1>
        <p>Explore our wide range of courses</p>
      </div>

      <div class="filters-section">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
            placeholder="Search courses..."
            class="search-input"
          >
        </div>

        <div class="filter-group">
          <select [(ngModel)]="selectedLevel" (change)="loadCourses()" class="filter-select">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select [(ngModel)]="selectedCategory" (change)="loadCourses()" class="filter-select">
            <option value="">All Categories</option>
            @for (category of categories; track category) {
              <option [value]="category">{{ category }}</option>
            }
          </select>
        </div>
      </div>

      @if (isLoading) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading courses...</p>
        </div>
      } @else if (courses.length === 0) {
        <div class="empty-state">
          <span class="empty-icon">📚</span>
          <h3>No courses found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>
      } @else {
        <div class="courses-grid">
          @for (course of courses; track course._id) {
            <div class="course-card" [routerLink]="['/courses', course._id]">
              <div class="course-thumbnail">
                @if (course.thumbnail) {
                  <img [src]="course.thumbnail" [alt]="course.title">
                } @else {
                  <div class="placeholder-thumbnail">📖</div>
                }
                <span class="course-level" [class]="course.level">{{ course.level }}</span>
              </div>
              <div class="course-content">
                <h3 class="course-title">{{ course.title }}</h3>
                <p class="course-description">{{ course.description | slice:0:100 }}...</p>
                <div class="course-meta">
                  <span class="instructor">
                    👨‍🏫 {{ getInstructorName(course) }}
                  </span>
                  <span class="students">
                    👥 {{ course.enrolledStudents.length || 0 }} students
                  </span>
                </div>
                <div class="course-footer">
                  @if (course.price && course.price > 0) {
                    <span class="course-price">\${{ course.price }}</span>
                  } @else {
                    <span class="course-price free">Free</span>
                  }
                  <button class="btn-enroll">View Course</button>
                </div>
              </div>
            </div>
          }
        </div>

        @if (totalPages > 1) {
          <div class="pagination">
            <button 
              (click)="goToPage(currentPage - 1)" 
              [disabled]="currentPage === 1"
              class="page-btn"
            >
              Previous
            </button>
            <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
            <button 
              (click)="goToPage(currentPage + 1)" 
              [disabled]="currentPage === totalPages"
              class="page-btn"
            >
              Next
            </button>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .course-browse {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .browse-header {
      margin-bottom: 32px;
    }

    .browse-header h1 {
      font-size: 32px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 8px;
    }

    .browse-header p {
      color: #666;
      font-size: 16px;
    }

    .filters-section {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 32px;
    }

    .search-box {
      flex: 1;
      min-width: 300px;
    }

    .search-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e1e1e1;
      border-radius: 8px;
      font-size: 15px;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .filter-group {
      display: flex;
      gap: 12px;
    }

    .filter-select {
      padding: 12px 16px;
      border: 2px solid #e1e1e1;
      border-radius: 8px;
      font-size: 15px;
      background: white;
      cursor: pointer;
      min-width: 150px;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .course-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
    }

    .course-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .course-thumbnail {
      position: relative;
      height: 180px;
      background: #f5f5f5;
    }

    .course-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .placeholder-thumbnail {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 48px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .course-level {
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
    }

    .course-level.beginner {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .course-level.intermediate {
      background: #fff3e0;
      color: #f57c00;
    }

    .course-level.advanced {
      background: #fce4ec;
      color: #c2185b;
    }

    .course-content {
      padding: 20px;
    }

    .course-title {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .course-description {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .course-meta {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
      font-size: 13px;
      color: #888;
    }

    .course-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid #eee;
    }

    .course-price {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a2e;
    }

    .course-price.free {
      color: #2e7d32;
    }

    .btn-enroll {
      padding: 8px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .btn-enroll:hover {
      opacity: 0.9;
    }

    .loading-state,
    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e1e1e1;
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .empty-icon {
      font-size: 64px;
      display: block;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      font-size: 20px;
      color: #333;
      margin-bottom: 8px;
    }

    .empty-state p {
      color: #666;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-top: 40px;
    }

    .page-btn {
      padding: 10px 20px;
      border: 2px solid #667eea;
      background: white;
      color: #667eea;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .page-btn:hover:not(:disabled) {
      background: #667eea;
      color: white;
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-info {
      color: #666;
    }
  `]
})
export class CourseBrowseComponent implements OnInit {
  private courseService = inject(CourseService);
  private authService = inject(AuthService);

  courses: Course[] = [];
  categories: string[] = [];
  isLoading = false;
  
  searchQuery = '';
  selectedLevel = '';
  selectedCategory = '';
  
  currentPage = 1;
  totalPages = 1;
  limit = 12;

  private searchTimeout: any;

  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
  }

  loadCourses(): void {
    this.isLoading = true;

    const filter: CourseFilter = {
      page: this.currentPage,
      limit: this.limit,
      status: 'published'
    };

    if (this.searchQuery) filter.search = this.searchQuery;
    if (this.selectedLevel) filter.level = this.selectedLevel;
    if (this.selectedCategory) filter.category = this.selectedCategory;

    this.courseService.getPublishedCourses(filter).subscribe({
      next: (response) => {
        this.courses = response.courses || [];
        this.totalPages = Math.ceil((response.total || 0) / this.limit);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading courses:', err);
        this.courses = [];
        this.isLoading = false;
      }
    });
  }

  loadCategories(): void {
    // Static categories for now
    this.categories = ['Mathematics', 'Programming', 'Languages', 'Science', 'Business', 'Design'];
  }

  onSearch(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.currentPage = 1;
      this.loadCourses();
    }, 300);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCourses();
    }
  }

  getInstructorName(course: Course): string {
    const teacher = (course as any).teacher || course.instructor;
    if (!teacher || typeof teacher === 'string') {
      return 'Instructor';
    }
    return `${teacher.firstName} ${teacher.lastName}`;
  }}