import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

interface ReportCard {
  id: string;
  title: string;
  value: number | string;
  change: number;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface ActivityItem {
  id: number;
  type: 'enrollment' | 'grade' | 'attendance' | 'payment';
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

interface PerformanceData {
  department: string;
  students: number;
  avgGrade: number;
  attendance: number;
  completion: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  selectedPeriod = signal<'weekly' | 'monthly' | 'yearly'>('monthly');
  selectedReportType = signal<string>('overview');

  reportCards: ReportCard[] = [
    {
      id: 'students',
      title: 'reports.totalStudents',
      value: 12548,
      change: 12.5,
      icon: 'school',
      color: '#6366f1',
      trend: 'up'
    },
    {
      id: 'courses',
      title: 'reports.activeCourses',
      value: 856,
      change: 8.3,
      icon: 'menu_book',
      color: '#10b981',
      trend: 'up'
    },
    {
      id: 'revenue',
      title: 'reports.totalRevenue',
      value: '$2.4M',
      change: 15.2,
      icon: 'payments',
      color: '#f59e0b',
      trend: 'up'
    },
    {
      id: 'completion',
      title: 'reports.completionRate',
      value: '87.5%',
      change: -2.1,
      icon: 'trending_up',
      color: '#ef4444',
      trend: 'down'
    }
  ];

  enrollmentTrend: ChartData[] = [
    { label: 'Jan', value: 1200, color: '#6366f1' },
    { label: 'Feb', value: 1350, color: '#6366f1' },
    { label: 'Mar', value: 1580, color: '#6366f1' },
    { label: 'Apr', value: 1420, color: '#6366f1' },
    { label: 'May', value: 1680, color: '#6366f1' },
    { label: 'Jun', value: 1890, color: '#6366f1' },
    { label: 'Jul', value: 2100, color: '#6366f1' },
    { label: 'Aug', value: 2350, color: '#6366f1' },
    { label: 'Sep', value: 2580, color: '#6366f1' },
    { label: 'Oct', value: 2450, color: '#6366f1' },
    { label: 'Nov', value: 2720, color: '#6366f1' },
    { label: 'Dec', value: 2890, color: '#6366f1' }
  ];

  courseDistribution: ChartData[] = [
    { label: 'Technology', value: 35, color: '#6366f1' },
    { label: 'Business', value: 25, color: '#10b981' },
    { label: 'Science', value: 20, color: '#f59e0b' },
    { label: 'Arts', value: 12, color: '#ef4444' },
    { label: 'Others', value: 8, color: '#8b5cf6' }
  ];

  recentActivities: ActivityItem[] = [
    {
      id: 1,
      type: 'enrollment',
      title: 'New Enrollment',
      description: '25 students enrolled in Advanced Web Development',
      time: '2 hours ago',
      icon: 'person_add',
      color: '#6366f1'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grades Published',
      description: 'Final grades published for Data Science 101',
      time: '4 hours ago',
      icon: 'grade',
      color: '#10b981'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      description: 'Batch payment of $45,000 received',
      time: '5 hours ago',
      icon: 'payments',
      color: '#f59e0b'
    },
    {
      id: 4,
      type: 'attendance',
      title: 'Attendance Alert',
      description: '15 students have low attendance in CS201',
      time: '6 hours ago',
      icon: 'warning',
      color: '#ef4444'
    },
    {
      id: 5,
      type: 'enrollment',
      title: 'Course Completed',
      description: '120 students completed Python Fundamentals',
      time: '8 hours ago',
      icon: 'check_circle',
      color: '#10b981'
    }
  ];

  performanceData: PerformanceData[] = [
    { department: 'Computer Science', students: 2450, avgGrade: 3.65, attendance: 92, completion: 89 },
    { department: 'Business Admin', students: 1890, avgGrade: 3.42, attendance: 88, completion: 85 },
    { department: 'Engineering', students: 2100, avgGrade: 3.58, attendance: 90, completion: 87 },
    { department: 'Arts & Design', students: 980, avgGrade: 3.72, attendance: 94, completion: 91 },
    { department: 'Medical Sciences', students: 1560, avgGrade: 3.81, attendance: 96, completion: 93 },
    { department: 'Law', students: 720, avgGrade: 3.55, attendance: 89, completion: 86 }
  ];

  topCourses = [
    { name: 'Advanced Web Development', students: 450, rating: 4.9, completion: 92 },
    { name: 'Data Science Fundamentals', students: 380, rating: 4.8, completion: 88 },
    { name: 'Machine Learning Basics', students: 320, rating: 4.7, completion: 85 },
    { name: 'Digital Marketing', students: 290, rating: 4.6, completion: 90 },
    { name: 'UI/UX Design', students: 275, rating: 4.8, completion: 87 }
  ];

  ngOnInit(): void {
    // Initialize data
  }

  setPeriod(period: 'weekly' | 'monthly' | 'yearly'): void {
    this.selectedPeriod.set(period);
  }

  setReportType(type: string): void {
    this.selectedReportType.set(type);
  }

  getMaxValue(data: ChartData[]): number {
    return Math.max(...data.map(d => d.value));
  }

  getBarHeight(value: number, max: number): number {
    return (value / max) * 100;
  }

  exportReport(format: 'pdf' | 'excel' | 'csv'): void {
    console.log(`Exporting report as ${format}`);
  }

  getGradeColor(grade: number): string {
    if (grade >= 3.7) return '#10b981';
    if (grade >= 3.3) return '#6366f1';
    if (grade >= 3.0) return '#f59e0b';
    return '#ef4444';
  }

  getAttendanceColor(attendance: number): string {
    if (attendance >= 90) return '#10b981';
    if (attendance >= 80) return '#6366f1';
    if (attendance >= 70) return '#f59e0b';
    return '#ef4444';
  }

  getTotalDistribution(): number {
    return this.courseDistribution.reduce((acc, curr) => acc + curr.value, 0);
  }

  getStrokeDashoffset(index: number): number {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset -= this.courseDistribution[i].value * 2.51;
    }
    return offset;
  }
}
