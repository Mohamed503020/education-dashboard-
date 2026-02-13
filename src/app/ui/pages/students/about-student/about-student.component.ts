import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  profileImage: string;
  // Parent Info
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  guardianEmail: string;
  // Academic Info
  studentId: string;
  department: string;
  batch: string;
  semester: number;
  enrollmentDate: string;
  cgpa: number;
  totalCredits: number;
  completedCredits: number;
  feeStatus: 'paid' | 'pending' | 'partial';
  status: 'active' | 'inactive' | 'graduated';
}

interface EnrolledCourse {
  id: number;
  code: string;
  name: string;
  professor: string;
  credits: number;
  progress: number;
  grade?: string;
}

interface ActivityItem {
  id: number;
  type: 'assignment' | 'exam' | 'attendance' | 'fee' | 'course';
  title: string;
  description: string;
  date: string;
  icon: string;
}

@Component({
  selector: 'app-about-student',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './about-student.component.html',
  styleUrls: ['./about-student.component.scss']
})
export class AboutStudentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  studentId: string = '';
  activeTab = signal<'overview' | 'courses' | 'activity' | 'documents'>('overview');

  student: StudentProfile = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    profileImage: 'assets/images/student-avatar.png',
    fatherName: '',
    motherName: '',
    guardianPhone: '',
    guardianEmail: '',
    studentId: '',
    department: '',
    batch: '',
    semester: 1,
    enrollmentDate: '',
    cgpa: 0,
    totalCredits: 0,
    completedCredits: 0,
    feeStatus: 'pending',
    status: 'active'
  };

  enrolledCourses: EnrolledCourse[] = [];
  recentActivity: ActivityItem[] = [];

  // Statistics
  attendanceRate = 0;
  assignmentsCompleted = 0;
  totalAssignments = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['id'] || '1';
      this.loadStudentData();
    });
  }

  private loadStudentData(): void {
    // Mock data - In real app, this would come from API
    this.student = {
      id: this.studentId,
      firstName: 'Ahmed',
      lastName: 'Mohamed',
      email: 'ahmed.mohamed@university.edu',
      phone: '+20 123 456 7890',
      dateOfBirth: '2000-05-15',
      gender: 'Male',
      bloodGroup: 'A+',
      nationality: 'Egyptian',
      religion: 'Islam',
      address: '123 Main Street, Apt 4B',
      city: 'Cairo',
      country: 'Egypt',
      zipCode: '11511',
      profileImage: 'assets/images/student-avatar.png',
      fatherName: 'Mohamed Ahmed Ali',
      motherName: 'Fatima Hassan',
      guardianPhone: '+20 111 222 3333',
      guardianEmail: 'mohamed.ali@email.com',
      studentId: 'STU-2024-001',
      department: 'Computer Science',
      batch: '2024',
      semester: 3,
      enrollmentDate: '2022-09-01',
      cgpa: 3.75,
      totalCredits: 120,
      completedCredits: 45,
      feeStatus: 'paid',
      status: 'active'
    };

    this.enrolledCourses = [
      {
        id: 1,
        code: 'CS301',
        name: 'Data Structures & Algorithms',
        professor: 'Dr. Sarah Johnson',
        credits: 4,
        progress: 75,
        grade: 'A'
      },
      {
        id: 2,
        code: 'CS302',
        name: 'Database Management Systems',
        professor: 'Prof. Michael Chen',
        credits: 3,
        progress: 60
      },
      {
        id: 3,
        code: 'CS303',
        name: 'Web Development',
        professor: 'Dr. Emily Brown',
        credits: 3,
        progress: 85,
        grade: 'A+'
      },
      {
        id: 4,
        code: 'MATH201',
        name: 'Linear Algebra',
        professor: 'Prof. Robert Wilson',
        credits: 3,
        progress: 50
      },
      {
        id: 5,
        code: 'ENG101',
        name: 'Technical Writing',
        professor: 'Dr. Lisa Anderson',
        credits: 2,
        progress: 90,
        grade: 'A'
      }
    ];

    this.recentActivity = [
      {
        id: 1,
        type: 'assignment',
        title: 'Assignment Submitted',
        description: 'Submitted "Data Structures Lab 5" for CS301',
        date: '2024-01-15',
        icon: 'assignment_turned_in'
      },
      {
        id: 2,
        type: 'exam',
        title: 'Exam Result',
        description: 'Scored 92/100 in CS302 Midterm Exam',
        date: '2024-01-12',
        icon: 'quiz'
      },
      {
        id: 3,
        type: 'attendance',
        title: 'Attendance Marked',
        description: 'Present in all classes today',
        date: '2024-01-11',
        icon: 'check_circle'
      },
      {
        id: 4,
        type: 'fee',
        title: 'Fee Payment',
        description: 'Semester fee payment completed',
        date: '2024-01-01',
        icon: 'payments'
      },
      {
        id: 5,
        type: 'course',
        title: 'Course Enrolled',
        description: 'Enrolled in "Advanced Programming" course',
        date: '2023-12-20',
        icon: 'school'
      }
    ];

    this.attendanceRate = 92;
    this.assignmentsCompleted = 18;
    this.totalAssignments = 20;
  }

  setActiveTab(tab: 'overview' | 'courses' | 'activity' | 'documents'): void {
    this.activeTab.set(tab);
  }

  getFullName(): string {
    return `${this.student.firstName} ${this.student.lastName}`;
  }

  getStatusClass(): string {
    switch (this.student.status) {
      case 'active': return 'status--active';
      case 'inactive': return 'status--inactive';
      case 'graduated': return 'status--graduated';
      default: return '';
    }
  }

  getFeeStatusClass(): string {
    switch (this.student.feeStatus) {
      case 'paid': return 'fee-status--paid';
      case 'pending': return 'fee-status--pending';
      case 'partial': return 'fee-status--partial';
      default: return '';
    }
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#22c55e';
    if (progress >= 60) return '#3b82f6';
    if (progress >= 40) return '#f59e0b';
    return '#ef4444';
  }

  getActivityTypeClass(type: string): string {
    return `activity-item--${type}`;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = `https://ui-avatars.com/api/?name=${this.student.firstName}+${this.student.lastName}&background=6366f1&color=fff&size=150`;
  }

  editStudent(): void {
    this.router.navigate(['/students/edit', this.studentId]);
  }

  printProfile(): void {
    window.print();
  }

  goBack(): void {
    this.router.navigate(['/students/all']);
  }

  calculateAge(): number {
    const today = new Date();
    const birthDate = new Date(this.student.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
