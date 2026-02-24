import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';
import { CourseService } from '../../../core/services/course.service';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  languageService = inject(LanguageService);
  private courseService = inject(CourseService);
  private studentService = inject(StudentService);

  stats = [
    { icon: 'people', value: '...', label: 'dashboard.totalStudents', color: 'primary' },
    { icon: 'school', value: '...', label: 'dashboard.professors', color: 'success' },
    { icon: 'menu_book', value: '0', label: 'dashboard.courses', color: 'warning' },
    { icon: 'apartment', value: '0', label: 'dashboard.departments', color: 'info' }
  ];

  recentActivities = [
    { icon: 'person_add', text: 'New student registered', time: '2 min ago', color: 'primary' },
    { icon: 'edit', text: 'Course updated', time: '15 min ago', color: 'warning' },
    { icon: 'payment', text: 'Fee payment received', time: '1 hour ago', color: 'success' },
    { icon: 'event', text: 'Event scheduled', time: '3 hours ago', color: 'info' },
    { icon: 'delete', text: 'Record deleted', time: '5 hours ago', color: 'danger' }
  ];

  upcomingEvents = [
    { title: 'Annual Sports Day', date: 'Mar 15, 2024', type: 'Sports' },
    { title: 'Science Exhibition', date: 'Mar 20, 2024', type: 'Academic' },
    { title: 'Parent Meeting', date: 'Mar 25, 2024', type: 'Meeting' },
    { title: 'Cultural Festival', date: 'Apr 01, 2024', type: 'Cultural' }
  ];

  ngOnInit(): void {
    this.loadDynamicStats();
  }

  private loadDynamicStats(): void {
    // Load course count and categories dynamically
    this.courseService.getCourses({ limit: 200 }).subscribe({
      next: (res) => {
        const totalCourses = res.total || res.courses?.length || 0;
        const categories = new Set<string>();
        (res.courses || []).forEach(c => { if (c.category) categories.add(c.category); });
        
        this.stats[2].value = totalCourses.toString();
        this.stats[3].value = categories.size.toString();

        // Count enrolled students across all courses
        let totalStudents = new Set<string>();
        (res.courses || []).forEach(c => {
          (c.enrolledStudents || []).forEach(s => totalStudents.add(s));
        });
        this.stats[0].value = totalStudents.size > 0 ? totalStudents.size.toLocaleString() : '0';
      },
      error: () => { /* keep defaults */ }
    });
  }
}
