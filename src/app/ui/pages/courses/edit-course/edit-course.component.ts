import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { CourseService } from '../../../../core/services/course.service';
import { UpdateCourseRequest } from '../../../../core/models/course.model';

interface CourseForm {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  tags: string;
  status: 'draft' | 'published' | 'archived';
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
  private courseService = inject(CourseService);
  
  courseId: string = '';
  activeSection = signal<'info' | 'lessons' | 'videos' | 'pdfs'>('info');
  isLoading = true;
  isSaving = false;
  errorMessage = '';
  
  course: CourseForm = {
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    tags: '',
    status: 'published'
  };

  lessons: LessonItem[] = [];
  videos: VideoItem[] = [];
  pdfs: PdfItem[] = [];

  // New item forms
  newLesson: Partial<LessonItem> = { title: '', description: '', duration: '', order: 1 };
  newVideo: Partial<VideoItem> = { title: '', url: '', duration: '', lessonId: 0 };
  newPdf: Partial<PdfItem> = { title: '', lessonId: 0 };

  categories = [
    'Technology',
    'Science',
    'Business',
    'Arts',
    'Design',
    'Marketing',
    'Finance',
    'Engineering'
  ];

  levels: ('beginner' | 'intermediate' | 'advanced')[] = [
    'beginner',
    'intermediate',
    'advanced'
  ];

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
    this.loadCourseData();
  }

  loadCourseData() {
    if (!this.courseId) {
      this.isLoading = false;
      return;
    }

    this.courseService.getCourseById(this.courseId).subscribe({
      next: (data) => {
        this.course = {
          title: data.title,
          description: data.description,
          category: data.category || '',
          level: data.level || 'beginner',
          price: data.price || 0,
          tags: data.tags?.join(', ') || '',
          status: data.status || 'published'
        };

        // Map materials to lessons/videos/pdfs
        if (data.materials && data.materials.length > 0) {
          let lessonOrder = 0;
          data.materials.forEach((m, i) => {
            if (m.type === 'video') {
              this.videos.push({
                id: i + 1, title: m.title, url: m.fileUrl || '',
                duration: m.duration ? m.duration + ' min' : '', lessonId: 0
              });
            } else if (m.type === 'pdf') {
              this.pdfs.push({
                id: i + 1, title: m.title, fileName: m.fileUrl || '',
                size: '', lessonId: 0
              });
            } else {
              lessonOrder++;
              this.lessons.push({
                id: i + 1, title: m.title, description: m.description || '',
                duration: m.duration ? m.duration + ' min' : '', order: lessonOrder
              });
            }
          });
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load course data.';
        this.isLoading = false;
      }
    });
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
    if (!this.course.title || !this.course.description) {
      this.errorMessage = 'Title and description are required.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    const updateData: UpdateCourseRequest = {
      title: this.course.title,
      description: this.course.description,
      category: this.course.category,
      level: this.course.level,
      status: this.course.status,
      price: this.course.price,
      tags: this.course.tags ? this.course.tags.split(',').map(t => t.trim()).filter(t => t) : []
    };

    this.courseService.updateCourse(this.courseId, updateData).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/courses/all']);
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err.error?.message || 'Failed to update course.';
      }
    });
  }

  onCancel() {
    this.router.navigate(['/courses/all']);
  }

  onReset() {
    this.lessons = [];
    this.videos = [];
    this.pdfs = [];
    this.loadCourseData();
  }
}
