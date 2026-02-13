import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

interface LessonForm {
  title: string;
  description: string;
  duration: string;
  order: number;
  content: string;
}

interface VideoItem {
  id: number;
  title: string;
  url: string;
  duration: string;
}

interface PdfItem {
  id: number;
  title: string;
  file: File | null;
  fileName: string;
}

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.scss'
})
export class AddLessonComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  courseId = '';
  activeSection = signal<'info' | 'videos' | 'resources'>('info');

  lesson: LessonForm = {
    title: '',
    description: '',
    duration: '',
    order: 1,
    content: ''
  };

  videos: VideoItem[] = [];
  pdfs: PdfItem[] = [];

  private videoIdCounter = 0;
  private pdfIdCounter = 0;

  constructor() {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '1';
  }

  setActiveSection(section: 'info' | 'videos' | 'resources') {
    this.activeSection.set(section);
  }

  addVideo() {
    this.videos.push({
      id: ++this.videoIdCounter,
      title: '',
      url: '',
      duration: ''
    });
  }

  removeVideo(id: number) {
    this.videos = this.videos.filter(v => v.id !== id);
  }

  addPdf() {
    this.pdfs.push({
      id: ++this.pdfIdCounter,
      title: '',
      file: null,
      fileName: ''
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

  onSubmit() {
    const lessonData = {
      ...this.lesson,
      videos: this.videos.filter(v => v.title && v.url),
      pdfs: this.pdfs.filter(p => p.title && p.file)
    };
    console.log('Creating lesson:', lessonData);
    // In real app, call API to create lesson
    this.router.navigate(['/courses', this.courseId]);
  }

  onCancel() {
    this.router.navigate(['/courses', this.courseId]);
  }
}
