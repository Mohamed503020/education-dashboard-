import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../../core/services/language.service';

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

interface LessonItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  order: number;
}

interface VideoItem {
  id: number;
  title: string;
  url: string;
  duration: string;
  lessonId: number;
}

interface PdfItem {
  id: number;
  title: string;
  file: File | null;
  fileName: string;
  lessonId: number;
}

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  private router = inject(Router);
  languageService = inject(LanguageService);

  activeSection = signal<'info' | 'lessons' | 'videos' | 'pdfs'>('info');

  course: CourseForm = {
    code: '',
    name: '',
    department: '',
    credits: 3,
    professor: '',
    maxStudents: 30,
    description: '',
    prerequisites: '',
    schedule: '',
    startDate: '',
    endDate: '',
    status: 'active'
  };

  lessons: LessonItem[] = [];
  videos: VideoItem[] = [];
  pdfs: PdfItem[] = [];

  private lessonIdCounter = 0;
  private videoIdCounter = 0;
  private pdfIdCounter = 0;

  departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Business',
    'Engineering'
  ];

  professors = [
    'Dr. John Smith',
    'Dr. Sarah Johnson',
    'Dr. Michael Brown',
    'Dr. Emily Davis',
    'Dr. Robert Wilson',
    'Dr. Lisa Anderson'
  ];

  setActiveSection(section: 'info' | 'lessons' | 'videos' | 'pdfs') {
    this.activeSection.set(section);
  }

  // Lesson methods
  addLesson() {
    this.lessons.push({
      id: ++this.lessonIdCounter,
      title: '',
      description: '',
      duration: '',
      order: this.lessons.length + 1
    });
  }

  removeLesson(id: number) {
    this.lessons = this.lessons.filter(l => l.id !== id);
    // Reorder remaining lessons
    this.lessons.forEach((l, i) => l.order = i + 1);
  }

  // Video methods
  addVideo() {
    this.videos.push({
      id: ++this.videoIdCounter,
      title: '',
      url: '',
      duration: '',
      lessonId: 0
    });
  }

  removeVideo(id: number) {
    this.videos = this.videos.filter(v => v.id !== id);
  }

  // PDF methods
  addPdf() {
    this.pdfs.push({
      id: ++this.pdfIdCounter,
      title: '',
      file: null,
      fileName: '',
      lessonId: 0
    });
  }

  removePdf(id: number) {
    this.pdfs = this.pdfs.filter(p => p.id !== id);
  }

  onFileSelect(event: Event, pdf: PdfItem) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      pdf.file = input.files[0];
      pdf.fileName = input.files[0].name;
    }
  }

  onSubmit(): void {
    const courseData = {
      ...this.course,
      lessons: this.lessons.filter(l => l.title),
      videos: this.videos.filter(v => v.title && v.url),
      pdfs: this.pdfs.filter(p => p.title && p.file)
    };
    console.log('Course Data:', courseData);
    this.router.navigate(['/courses/all']);
  }

  onReset(): void {
    this.course = {
      code: '',
      name: '',
      department: '',
      credits: 3,
      professor: '',
      maxStudents: 30,
      description: '',
      prerequisites: '',
      schedule: '',
      startDate: '',
      endDate: '',
      status: 'active'
    };
    this.lessons = [];
    this.videos = [];
    this.pdfs = [];
  }
}
