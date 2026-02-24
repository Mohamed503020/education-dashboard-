import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';
import { CourseService } from '../../../../core/services/course.service';
import { MaterialService } from '../../../../core/services/material.service';
import { CreateCourseRequest, CourseStage, Course } from '../../../../core/models/course.model';
import { forkJoin, of, switchMap, catchError } from 'rxjs';

interface CourseForm {
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  stage: CourseStage | '';
  grade: number | null;
  price: number;
  isFree: boolean;
  tags: string;
  status: 'draft' | 'published';
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
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  private router = inject(Router);
  private courseService = inject(CourseService);
  private materialService = inject(MaterialService);
  languageService = inject(LanguageService);

  activeSection = signal<'info' | 'lessons' | 'videos' | 'pdfs'>('info');
  isSaving = false;
  savingProgress = '';
  errorMessage = '';

  course: CourseForm = {
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    level: 'beginner',
    stage: '',
    grade: null,
    price: 0,
    isFree: true,
    tags: '',
    status: 'published'
  };

  lessons: LessonItem[] = [];
  videos: VideoItem[] = [];
  pdfs: PdfItem[] = [];

  private lessonIdCounter = 0;
  private videoIdCounter = 0;
  private pdfIdCounter = 0;

  categories = [
    'اللغة العربية',
    'النحو والصرف',
    'البلاغة',
    'الأدب',
    'القراءة',
    'التعبير',
    'الإملاء',
    'الخط العربي'
  ];

  stages: { value: CourseStage; label: string }[] = [
    { value: 'primary', label: 'المرحلة الابتدائية' },
    { value: 'preparatory', label: 'المرحلة الإعدادية' },
    { value: 'secondary', label: 'المرحلة الثانوية' }
  ];

  gradesForStage: { value: number; label: string }[] = [];

  levels: ('beginner' | 'intermediate' | 'advanced')[] = [
    'beginner',
    'intermediate',
    'advanced'
  ];

  setActiveSection(section: 'info' | 'lessons' | 'videos' | 'pdfs') {
    this.activeSection.set(section);
  }

  onStageChange() {
    this.course.grade = null;
    if (this.course.stage === 'primary') {
      this.gradesForStage = [
        { value: 1, label: 'الصف الأول' },
        { value: 2, label: 'الصف الثاني' },
        { value: 3, label: 'الصف الثالث' },
        { value: 4, label: 'الصف الرابع' },
        { value: 5, label: 'الصف الخامس' },
        { value: 6, label: 'الصف السادس' },
      ];
    } else if (this.course.stage === 'preparatory') {
      this.gradesForStage = [
        { value: 1, label: 'الصف الأول' },
        { value: 2, label: 'الصف الثاني' },
        { value: 3, label: 'الصف الثالث' },
      ];
    } else if (this.course.stage === 'secondary') {
      this.gradesForStage = [
        { value: 1, label: 'الصف الأول' },
        { value: 2, label: 'الصف الثاني' },
        { value: 3, label: 'الصف الثالث' },
      ];
    } else {
      this.gradesForStage = [];
    }
  }

  onFreeToggle() {
    if (this.course.isFree) {
      this.course.price = 0;
    }
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
    if (!this.course.title || !this.course.description || !this.course.category) {
      this.errorMessage = 'يرجى ملء جميع الحقول المطلوبة (العنوان، الوصف، التصنيف)';
      this.activeSection.set('info');
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.savingProgress = 'جاري إنشاء الكورس...';

    const courseData: CreateCourseRequest = {
      title: this.course.title,
      description: this.course.description,
      category: this.course.category,
      level: this.course.level,
      price: this.course.isFree ? 0 : this.course.price,
      isFree: this.course.isFree,
      status: this.course.status,
      tags: this.course.tags ? this.course.tags.split(',').map(t => t.trim()).filter(t => t) : [],
      ...(this.course.shortDescription ? { shortDescription: this.course.shortDescription } : {}),
      ...(this.course.stage ? { stage: this.course.stage as CourseStage } : {}),
      ...(this.course.grade ? { grade: this.course.grade } : {}),
    };

    this.courseService.createCourse(courseData).pipe(
      switchMap((createdCourse: Course) => {
        const courseId = createdCourse._id;
        return this.saveMaterials(courseId);
      })
    ).subscribe({
      next: () => {
        this.isSaving = false;
        this.savingProgress = '';
        this.router.navigate(['/courses/all']);
      },
      error: (err) => {
        this.isSaving = false;
        this.savingProgress = '';
        console.error('Create course error:', err);
        this.errorMessage = err.error?.message || 'فشل في إنشاء الكورس. يرجى المحاولة مرة أخرى.';
        this.activeSection.set('info');
      }
    });
  }

  private saveMaterials(courseId: string) {
    const materialRequests: any[] = [];
    let orderCounter = 0;

    // 1. Create lessons as 'document' type materials
    for (const lesson of this.lessons) {
      if (!lesson.title) continue;
      orderCounter++;
      materialRequests.push(
        this.materialService.createMaterialJson({
          title: lesson.title,
          description: lesson.description || undefined,
          type: 'document',
          course: courseId,
          order: orderCounter,
          duration: lesson.duration ? this.parseDurationToSeconds(lesson.duration) : undefined,
          isPublished: true,
        }).pipe(catchError(err => {
          console.error('Failed to create lesson:', lesson.title, err);
          return of(null);
        }))
      );
    }

    // 2. Create videos as 'video' type materials
    for (const video of this.videos) {
      if (!video.title || !video.url) continue;
      orderCounter++;
      materialRequests.push(
        this.materialService.createMaterialJson({
          title: video.title,
          type: 'video',
          course: courseId,
          fileUrl: video.url,
          order: orderCounter,
          duration: video.duration ? this.parseDurationToSeconds(video.duration) : undefined,
          isPublished: true,
        }).pipe(catchError(err => {
          console.error('Failed to create video:', video.title, err);
          return of(null);
        }))
      );
    }

    // 3. Upload PDF files, then create 'pdf' type materials
    for (const pdf of this.pdfs) {
      if (!pdf.title) continue;
      orderCounter++;
      const order = orderCounter;

      if (pdf.file) {
        // Upload file first, then create material
        materialRequests.push(
          this.materialService.uploadFile(pdf.file).pipe(
            switchMap(uploadResult => {
              this.savingProgress = `جاري رفع: ${pdf.title}...`;
              return this.materialService.createMaterialJson({
                title: pdf.title,
                type: 'pdf',
                course: courseId,
                fileUrl: uploadResult.fileUrl,
                fileName: uploadResult.fileName,
                fileSize: uploadResult.fileSize,
                mimeType: uploadResult.mimeType,
                order: order,
                isPublished: true,
              });
            }),
            catchError(err => {
              console.error('Failed to upload/create PDF:', pdf.title, err);
              return of(null);
            })
          )
        );
      } else {
        // No file - just create material entry
        materialRequests.push(
          this.materialService.createMaterialJson({
            title: pdf.title,
            type: 'pdf',
            course: courseId,
            order: order,
            isPublished: true,
          }).pipe(catchError(err => {
            console.error('Failed to create PDF entry:', pdf.title, err);
            return of(null);
          }))
        );
      }
    }

    if (materialRequests.length === 0) {
      return of(null);
    }

    this.savingProgress = `جاري حفظ المحتوى (${materialRequests.length} عنصر)...`;
    return forkJoin(materialRequests);
  }

  private parseDurationToSeconds(dur: string): number {
    // Parse "45 دقيقة" or "12:34" or "45" to seconds
    const colonMatch = dur.match(/^(\d+):(\d+)$/);
    if (colonMatch) {
      return parseInt(colonMatch[1]) * 60 + parseInt(colonMatch[2]);
    }
    const numMatch = dur.match(/(\d+)/);
    if (numMatch) {
      return parseInt(numMatch[1]) * 60; // assume minutes
    }
    return 0;
  }

  onReset(): void {
    this.course = {
      title: '',
      description: '',
      shortDescription: '',
      category: '',
      level: 'beginner',
      stage: '',
      grade: null,
      price: 0,
      isFree: true,
      tags: '',
      status: 'published'
    };
    this.gradesForStage = [];
    this.lessons = [];
    this.videos = [];
    this.pdfs = [];
    this.errorMessage = '';
  }
}
