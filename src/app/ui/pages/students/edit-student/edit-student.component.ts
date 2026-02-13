import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../../core/services/language.service';

interface StudentForm {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  gender: string;
  education: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
}

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  languageService = inject(LanguageService);

  studentId: string = '';

  student: StudentForm = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    gender: '',
    education: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    parentName: '',
    parentPhone: '',
    parentEmail: ''
  };

  educationOptions = [
    'B.Sc Computer Science',
    'B.Tech Engineering',
    'B.Com Commerce',
    'BBA Business',
    'B.A Arts',
    'M.Sc Computer Science',
    'MBA Business'
  ];

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    this.loadStudentData();
  }

  loadStudentData(): void {
    // Simulate loading student data - in real app, fetch from service
    this.student = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@edu.com',
      mobile: '+1 234 567 890',
      dateOfBirth: '2000-05-15',
      gender: 'male',
      education: 'B.Sc Computer Science',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      parentName: 'Jane Doe',
      parentPhone: '+1 234 567 891',
      parentEmail: 'jane.doe@email.com'
    };
  }

  onSubmit(): void {
    console.log('Updated Student Data:', this.student);
    this.router.navigate(['/students/all']);
  }

  onCancel(): void {
    this.router.navigate(['/students/all']);
  }
}
