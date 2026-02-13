import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

interface Course {
  id: number;
  name: string;
  code: string;
  department: string;
  credits: number;
  professor: string;
  students: number;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  languageService = inject(LanguageService);

  courses: Course[] = [
    { id: 1, name: 'Introduction to Programming', code: 'CS101', department: 'Computer Science', credits: 3, professor: 'Dr. John Smith', students: 45, status: 'active' },
    { id: 2, name: 'Calculus I', code: 'MATH101', department: 'Mathematics', credits: 4, professor: 'Dr. Sarah Johnson', students: 60, status: 'active' },
    { id: 3, name: 'Physics Fundamentals', code: 'PHY101', department: 'Physics', credits: 3, professor: 'Dr. Michael Brown', students: 38, status: 'active' },
    { id: 4, name: 'Organic Chemistry', code: 'CHEM201', department: 'Chemistry', credits: 4, professor: 'Dr. Emily Davis', students: 32, status: 'inactive' },
    { id: 5, name: 'Molecular Biology', code: 'BIO201', department: 'Biology', credits: 3, professor: 'Dr. Robert Wilson', students: 28, status: 'active' },
    { id: 6, name: 'World Literature', code: 'ENG101', department: 'English', credits: 3, professor: 'Dr. Lisa Anderson', students: 50, status: 'active' },
  ];
}
