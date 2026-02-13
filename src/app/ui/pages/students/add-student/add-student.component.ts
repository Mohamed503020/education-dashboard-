import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  private router = inject(Router);
  languageService = inject(LanguageService);

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

  onSubmit(): void {
    console.log('Student Data:', this.student);
    // Here you would typically call a service to save the student
    this.router.navigate(['/students/all']);
  }

  onReset(): void {
    this.student = {
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
  }
}
