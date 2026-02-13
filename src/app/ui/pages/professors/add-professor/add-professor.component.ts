import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  selector: 'app-add-professor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './add-professor.component.html',
  styleUrl: './add-professor.component.scss'
})
export class AddProfessorComponent {
  private router = inject(Router);

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

  onSubmit() {
    console.log('Submitting professor:', this.professor);
    // In real app, call API to save professor
    this.router.navigate(['/professors/all']);
  }

  onReset() {
    this.professor = {
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
  }
}
