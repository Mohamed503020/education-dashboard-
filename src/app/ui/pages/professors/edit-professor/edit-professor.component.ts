import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

interface ProfessorForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  qualification: string;
  experience: number;
  joinDate: string;
  salary: number;
  address: string;
  city: string;
  country: string;
  bio: string;
  status: string;
}

@Component({
  selector: 'app-edit-professor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './edit-professor.component.html',
  styleUrl: './edit-professor.component.scss'
})
export class EditProfessorComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  professorId: string = '';

  professor: ProfessorForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    qualification: '',
    experience: 0,
    joinDate: '',
    salary: 0,
    address: '',
    city: '',
    country: '',
    bio: '',
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

  qualifications = [
    'Ph.D.',
    'M.Sc.',
    'M.A.',
    'M.B.A.',
    'M.Tech.',
    'B.Sc.',
    'B.A.'
  ];

  ngOnInit() {
    this.professorId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProfessorData();
  }

  loadProfessorData() {
    // Mock data - in real app, fetch from API
    this.professor = {
      firstName: 'Ahmed',
      lastName: 'Hassan',
      email: 'ahmed.hassan@university.edu',
      phone: '+1 234 567 8901',
      department: 'Computer Science',
      subject: 'Data Structures & Algorithms',
      qualification: 'Ph.D.',
      experience: 12,
      joinDate: '2012-08-15',
      salary: 85000,
      address: '123 University Ave',
      city: 'New York',
      country: 'USA',
      bio: 'Dr. Ahmed Hassan is a distinguished professor with over 12 years of experience in Computer Science. He specializes in algorithms and data structures, and has published numerous research papers in top-tier journals.',
      status: 'active'
    };
  }

  onSubmit() {
    console.log('Updating professor:', this.professor);
    // In real app, call API to update professor
    this.router.navigate(['/professors/all']);
  }

  onCancel() {
    this.router.navigate(['/professors/all']);
  }

  onReset() {
    this.loadProfessorData();
  }
}
