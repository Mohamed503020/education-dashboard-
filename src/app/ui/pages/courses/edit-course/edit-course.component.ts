import { Component, inject, OnInit, signal } from '@angular/core';
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
  fileName: string;
  size: string;
  lessonId: number;
  file?: File;
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
  activeSection = signal<'info' | 'lessons' | 'videos' | 'pdfs'>('info');
  
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

  lessons: LessonItem[] = [];
  videos: VideoItem[] = [];
  pdfs: PdfItem[] = [];

  // New item forms
  newLesson: Partial<LessonItem> = { title: '', description: '', duration: '', order: 1 };
  newVideo: Partial<VideoItem> = { title: '', url: '', duration: '', lessonId: 0 };
  newPdf: Partial<PdfItem> = { title: '', lessonId: 0 };

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

    // Load existing lessons
    this.lessons = [
      { id: 1, title: 'Introduction to Python', description: 'Getting started with Python basics', duration: '45 min', order: 1 },
      { id: 2, title: 'Variables and Data Types', description: 'Understanding variables and data types', duration: '60 min', order: 2 },
      { id: 3, title: 'Control Structures', description: 'If statements, loops, conditions', duration: '75 min', order: 3 }
    ];

    // Load existing videos
    this.videos = [
      { id: 1, title: 'Python Setup Tutorial', url: 'https://youtube.com/watch?v=xxx', duration: '12:34', lessonId: 1 },
      { id: 2, title: 'First Python Program', url: 'https://youtube.com/watch?v=yyy', duration: '18:45', lessonId: 1 },
      { id: 3, title: 'Working with Variables', url: 'https://youtube.com/watch?v=zzz', duration: '22:10', lessonId: 2 }
    ];

    // Load existing PDFs
    this.pdfs = [
      { id: 1, title: 'Python Cheat Sheet', fileName: 'python-basics.pdf', size: '1.2 MB', lessonId: 1 },
      { id: 2, title: 'Variables Reference', fileName: 'variables.pdf', size: '856 KB', lessonId: 2 }
    ];
  }

  setActiveSection(section: 'info' | 'lessons' | 'videos' | 'pdfs') {
    this.activeSection.set(section);
  }

  // Lessons
  addLesson() {
    if (this.newLesson.title) {
      const newId = this.lessons.length > 0 ? Math.max(...this.lessons.map(l => l.id)) + 1 : 1;
      this.lessons.push({
        id: newId,
        title: this.newLesson.title || '',
        description: this.newLesson.description || '',
        duration: this.newLesson.duration || '',
        order: this.lessons.length + 1
      });
      this.newLesson = { title: '', description: '', duration: '', order: this.lessons.length + 1 };
    }
  }

  removeLesson(id: number) {
    this.lessons = this.lessons.filter(l => l.id !== id);
    // Also remove associated videos and pdfs
    this.videos = this.videos.filter(v => v.lessonId !== id);
    this.pdfs = this.pdfs.filter(p => p.lessonId !== id);
  }

  // Videos
  addVideo() {
    if (this.newVideo.title && this.newVideo.url && this.newVideo.lessonId) {
      const newId = this.videos.length > 0 ? Math.max(...this.videos.map(v => v.id)) + 1 : 1;
      this.videos.push({
        id: newId,
        title: this.newVideo.title || '',
        url: this.newVideo.url || '',
        duration: this.newVideo.duration || '',
        lessonId: this.newVideo.lessonId || 0
      });
      this.newVideo = { title: '', url: '', duration: '', lessonId: 0 };
    }
  }

  removeVideo(id: number) {
    this.videos = this.videos.filter(v => v.id !== id);
  }

  // PDFs
  addPdf() {
    if (this.newPdf.title && this.newPdf.lessonId) {
      const newId = this.pdfs.length > 0 ? Math.max(...this.pdfs.map(p => p.id)) + 1 : 1;
      this.pdfs.push({
        id: newId,
        title: this.newPdf.title || '',
        fileName: this.newPdf.file?.name || 'document.pdf',
        size: this.newPdf.file ? this.formatFileSize(this.newPdf.file.size) : '0 KB',
        lessonId: this.newPdf.lessonId || 0,
        file: this.newPdf.file
      });
      this.newPdf = { title: '', lessonId: 0 };
    }
  }

  removePdf(id: number) {
    this.pdfs = this.pdfs.filter(p => p.id !== id);
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.newPdf.file = input.files[0];
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  getVideosForLesson(lessonId: number): VideoItem[] {
    return this.videos.filter(v => v.lessonId === lessonId);
  }

  getPdfsForLesson(lessonId: number): PdfItem[] {
    return this.pdfs.filter(p => p.lessonId === lessonId);
  }

  onSubmit() {
    console.log('Updating course:', this.course);
    console.log('Lessons:', this.lessons);
    console.log('Videos:', this.videos);
    console.log('PDFs:', this.pdfs);
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
