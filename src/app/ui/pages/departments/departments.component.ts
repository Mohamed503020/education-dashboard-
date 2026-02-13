import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

interface Department {
  id: number;
  name: string;
  head: string;
  professors: number;
  students: number;
  courses: number;
  established: string;
  color: string;
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {
  languageService = inject(LanguageService);

  departments: Department[] = [
    { id: 1, name: 'Computer Science', head: 'Dr. John Smith', professors: 25, students: 450, courses: 18, established: '1985', color: '#5b5fc7' },
    { id: 2, name: 'Mathematics', head: 'Dr. Sarah Johnson', professors: 20, students: 380, courses: 15, established: '1960', color: '#28a745' },
    { id: 3, name: 'Physics', head: 'Dr. Michael Brown', professors: 18, students: 320, courses: 12, established: '1965', color: '#17a2b8' },
    { id: 4, name: 'Chemistry', head: 'Dr. Emily Davis', professors: 15, students: 280, courses: 10, established: '1962', color: '#ffc107' },
    { id: 5, name: 'Biology', head: 'Dr. Robert Wilson', professors: 22, students: 400, courses: 14, established: '1970', color: '#dc3545' },
    { id: 6, name: 'English', head: 'Dr. Lisa Anderson', professors: 16, students: 350, courses: 11, established: '1958', color: '#6f42c1' },
  ];
}
