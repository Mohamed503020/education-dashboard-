import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  languageService = inject(LanguageService);

  stats = [
    { icon: 'people', value: '2,450', label: 'dashboard.totalStudents', color: 'primary' },
    { icon: 'school', value: '150', label: 'dashboard.professors', color: 'success' },
    { icon: 'menu_book', value: '85', label: 'dashboard.courses', color: 'warning' },
    { icon: 'apartment', value: '12', label: 'dashboard.departments', color: 'info' }
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
}
