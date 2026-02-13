import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

interface Course {
  id: number;
  name: string;
  code: string;
  department: string;
  credits: number;
  professor: string;
  students: number;
  maxStudents: number;
  status: 'active' | 'inactive' | 'upcoming';
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  lessons: number;
  duration: string;
  image: string;
  color: string;
  progress?: number;
}

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
export class CoursesComponent {
  languageService = inject(LanguageService);
  
  viewMode = signal<'grid' | 'list'>('grid');
  searchQuery = signal<string>('');
  selectedDepartment = signal<string>('');
  selectedLevel = signal<string>('');

  categoryStats: CategoryStat[] = [
    { name: 'Technology', count: 128, icon: 'computer', color: '#6366f1' },
    { name: 'Science', count: 86, icon: 'science', color: '#10b981' },
    { name: 'Business', count: 72, icon: 'business', color: '#f59e0b' },
    { name: 'Arts', count: 45, icon: 'palette', color: '#ec4899' }
  ];

  courses: Course[] = [
    { 
      id: 1, 
      name: 'Advanced Web Development', 
      code: 'CS301', 
      department: 'Computer Science', 
      credits: 4, 
      professor: 'Dr. John Smith', 
      students: 245, 
      maxStudents: 300,
      status: 'active',
      level: 'advanced',
      rating: 4.9,
      lessons: 48,
      duration: '16 weeks',
      image: 'assets/images/courses/web-dev.jpg',
      color: '#6366f1',
      progress: 75
    },
    { 
      id: 2, 
      name: 'Machine Learning Fundamentals', 
      code: 'CS401', 
      department: 'Computer Science', 
      credits: 4, 
      professor: 'Dr. Sarah Johnson', 
      students: 180, 
      maxStudents: 200,
      status: 'active',
      level: 'intermediate',
      rating: 4.8,
      lessons: 36,
      duration: '12 weeks',
      image: 'assets/images/courses/ml.jpg',
      color: '#10b981',
      progress: 60
    },
    { 
      id: 3, 
      name: 'Data Science with Python', 
      code: 'CS302', 
      department: 'Computer Science', 
      credits: 3, 
      professor: 'Dr. Michael Brown', 
      students: 156, 
      maxStudents: 180,
      status: 'active',
      level: 'intermediate',
      rating: 4.7,
      lessons: 32,
      duration: '10 weeks',
      image: 'assets/images/courses/python.jpg',
      color: '#f59e0b',
      progress: 45
    },
    { 
      id: 4, 
      name: 'Digital Marketing Mastery', 
      code: 'BUS201', 
      department: 'Business', 
      credits: 3, 
      professor: 'Dr. Emily Davis', 
      students: 198, 
      maxStudents: 250,
      status: 'active',
      level: 'beginner',
      rating: 4.6,
      lessons: 28,
      duration: '8 weeks',
      image: 'assets/images/courses/marketing.jpg',
      color: '#ec4899',
      progress: 80
    },
    { 
      id: 5, 
      name: 'UI/UX Design Principles', 
      code: 'DES101', 
      department: 'Design', 
      credits: 3, 
      professor: 'Dr. Robert Wilson', 
      students: 142, 
      maxStudents: 150,
      status: 'active',
      level: 'beginner',
      rating: 4.9,
      lessons: 24,
      duration: '8 weeks',
      image: 'assets/images/courses/uiux.jpg',
      color: '#8b5cf6',
      progress: 92
    },
    { 
      id: 6, 
      name: 'Blockchain Development', 
      code: 'CS501', 
      department: 'Computer Science', 
      credits: 4, 
      professor: 'Dr. Lisa Anderson', 
      students: 98, 
      maxStudents: 120,
      status: 'upcoming',
      level: 'advanced',
      rating: 0,
      lessons: 40,
      duration: '14 weeks',
      image: 'assets/images/courses/blockchain.jpg',
      color: '#14b8a6'
    },
    { 
      id: 7, 
      name: 'Financial Analysis', 
      code: 'FIN301', 
      department: 'Business', 
      credits: 3, 
      professor: 'Dr. James Taylor', 
      students: 165, 
      maxStudents: 200,
      status: 'active',
      level: 'intermediate',
      rating: 4.5,
      lessons: 30,
      duration: '10 weeks',
      image: 'assets/images/courses/finance.jpg',
      color: '#22c55e',
      progress: 55
    },
    { 
      id: 8, 
      name: 'Creative Writing Workshop', 
      code: 'ENG201', 
      department: 'Arts', 
      credits: 2, 
      professor: 'Dr. Maria Garcia', 
      students: 78, 
      maxStudents: 100,
      status: 'active',
      level: 'beginner',
      rating: 4.7,
      lessons: 20,
      duration: '6 weeks',
      image: 'assets/images/courses/writing.jpg',
      color: '#ef4444',
      progress: 88
    }
  ];

  departments = ['Computer Science', 'Business', 'Design', 'Arts', 'Science'];
  levels = ['beginner', 'intermediate', 'advanced'];

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode.set(mode);
  }

  get filteredCourses(): Course[] {
    return this.courses.filter(course => {
      const matchesSearch = !this.searchQuery() || 
        course.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
        course.code.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchesDept = !this.selectedDepartment() || course.department === this.selectedDepartment();
      const matchesLevel = !this.selectedLevel() || course.level === this.selectedLevel();
      return matchesSearch && matchesDept && matchesLevel;
    });
  }

  getEnrollmentPercentage(course: Course): number {
    return Math.round((course.students / course.maxStudents) * 100);
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
      'active': 'status-badge--active',
      'inactive': 'status-badge--inactive',
      'upcoming': 'status-badge--upcoming'
    };
    return classes[status] || '';
  }
}
