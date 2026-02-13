import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

interface CourseForm {
  code: string;
  name: string;
  department: string;
  credits: number;
  professor: string;
  maxStudents: number;
  description: string;
  prerequisites: string;
  schedule: string;
  startDate: string;
  endDate: string;
  status: string;
}

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  courseId: string = '';
  
  course: CourseForm = {
    code: '',
    name: '',
    department: '',
    credits: 3,
    professor: '',
    maxStudents: 50,
    description: '',
    prerequisites: '',
    schedule: '',
    startDate: '',
    endDate: '',
    status: 'active'
  };

  departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Engineering',
    'Business',
    'Arts & Languages'
  ];

  professors = [
    'Dr. Ahmed Hassan',
    'Dr. Sarah Johnson',
    'Dr. Mohammed Ali',
    'Dr. Emily Chen',
    'Dr. Robert Smith',
    'Dr. Fatima Al-Rashid'
  ];

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
    this.loadCourseData();
  }

  loadCourseData() {
    // Mock data - in real app, fetch from API
    this.course = {
      code: 'CS101',
      name: 'Introduction to Programming',
      department: 'Computer Science',
      credits: 3,
      professor: 'Dr. Ahmed Hassan',
      maxStudents: 60,
      description: 'An introductory course covering fundamental programming concepts using Python. Topics include variables, control structures, functions, and basic data structures.',
      prerequisites: '',
      schedule: 'Mon/Wed 9:00-10:30',
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      status: 'active'
    };
  }

  onSubmit() {
    console.log('Updating course:', this.course);
    // In real app, call API to update course
    this.router.navigate(['/courses/all']);
  }

  onCancel() {
    this.router.navigate(['/courses/all']);
  }

  onReset() {
    this.loadCourseData();
  }
}
