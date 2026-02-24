import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { CourseService } from '../../../../core/services/course.service';
import { MaterialService } from '../../../../core/services/material.service';
import { Course } from '../../../../core/models/course.model';
import { environment } from '../../../../../environments/environment';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  order: number;
  isCompleted: boolean;
}

interface Video {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  lessonId: number;
}

interface PDF {
  id: number;
  title: string;
  url: string;
  size: string;
  lessonId: number;
}

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  private courseService = inject(CourseService);
  private materialService = inject(MaterialService);
  
  courseId: string = '';
  activeTab = signal<'overview' | 'lessons' | 'videos' | 'resources'>('overview');
  expandedLesson = signal<number | null>(null);
  isLoading = true;
  
  // Media viewer signals
  currentVideo = signal<Video | null>(null);
  currentPdf = signal<PDF | null>(null);
  showVideoPlayer = signal<boolean>(false);
  showPdfViewer = signal<boolean>(false);

  // Dynamic course data from API
  courseData: Course | null = null;

  // Mapped display properties
  course = {
    name: '',
    code: '',
    description: '',
    department: '',
    professor: '',
    credits: 0,
    duration: '',
    students: 0,
    rating: 0,
    lessons: [] as Lesson[],
    videos: [] as Video[],
    pdfs: [] as PDF[]
  };

  lessons: Lesson[] = [];
  videos: Video[] = [];
  pdfs: PDF[] = [];

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
        this.courseData = data;
        
        // Map API data to display properties
        const teacherName = typeof data.teacher === 'object' && data.teacher
          ? (data.teacher as any).firstName + ' ' + (data.teacher as any).lastName
          : 'Teacher';
        
        this.course = {
          name: data.title,
          code: data.category || '',
          description: data.description,
          department: data.category || 'General',
          professor: teacherName,
          credits: 0,
          duration: data.duration ? data.duration + ' hours' : 'Self-paced',
          students: data.enrolledStudents.length || data.enrollmentCount || 0,
          rating: data.rating || 0,
          lessons: [],
          videos: [],
          pdfs: []
        };

        // Try to map from course.materials first
        this.mapMaterials(data.materials || []);

        // Also fetch materials separately via MaterialService for reliability
        this.materialService.getMaterialsByCourse(this.courseId).subscribe({
          next: (materials) => {
            if (materials && materials.length > 0) {
              // Reset and remap from dedicated materials endpoint
              this.videos = [];
              this.pdfs = [];
              this.lessons = [];
              this.mapMaterials(materials);
            }
          }
        });

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private mapMaterials(materials: any[]) {
    if (!materials || materials.length === 0) {
      // If no materials, create placeholder content from tags
      if (this.lessons.length === 0 && this.courseData?.tags && this.courseData.tags.length > 0) {
        this.courseData.tags.forEach((tag: string, i: number) => {
          this.lessons.push({
            id: i + 1,
            title: 'Module ' + (i + 1) + ': ' + tag.charAt(0).toUpperCase() + tag.slice(1),
            description: 'Learn about ' + tag,
            duration: '45 min',
            order: i + 1,
            isCompleted: false
          });
        });
      }
    } else {
      this.videos = [];
      this.pdfs = [];
      this.lessons = [];
      let lessonOrder = 0;

      materials.forEach((m: any, i: number) => {
        // Skip if material is just an ObjectId string (not populated)
        if (typeof m === 'string') return;

        if (m.type === 'video') {
          this.videos.push({
            id: i + 1,
            title: m.title,
            url: m.fileUrl || '',
            thumbnail: m.thumbnail || '',
            duration: m.duration ? this.formatSeconds(m.duration) : '',
            lessonId: 0
          });
        } else if (m.type === 'pdf') {
          // Prepend backend base URL for relative upload paths
          let pdfUrl = m.fileUrl || '';
          if (pdfUrl && pdfUrl.startsWith('/uploads/')) {
            pdfUrl = environment.wsUrl + pdfUrl;
          }
          this.pdfs.push({
            id: i + 1,
            title: m.title,
            url: pdfUrl,
            size: m.fileSize ? this.formatFileSize(m.fileSize) : '',
            lessonId: 0
          });
        } else {
          lessonOrder++;
          this.lessons.push({
            id: i + 1,
            title: m.title,
            description: m.description || '',
            duration: m.duration ? this.formatSeconds(m.duration) : '',
            order: lessonOrder,
            isCompleted: false
          });
        }
      });
    }

    this.course.lessons = this.lessons;
    this.course.videos = this.videos;
    this.course.pdfs = this.pdfs;
  }

  private formatSeconds(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    return `${hrs}h ${rem}m`;
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  setActiveTab(tab: 'overview' | 'lessons' | 'videos' | 'resources') {
    this.activeTab.set(tab);
  }

  toggleLesson(lessonId: number) {
    if (this.expandedLesson() === lessonId) {
      this.expandedLesson.set(null);
    } else {
      this.expandedLesson.set(lessonId);
    }
  }

  getVideosForLesson(lessonId: number): Video[] {
    return this.videos.filter(v => v.lessonId === lessonId);
  }

  getPdfsForLesson(lessonId: number): PDF[] {
    return this.pdfs.filter(p => p.lessonId === lessonId);
  }

  getCompletedLessonsCount(): number {
    return this.lessons.filter(l => l.isCompleted).length;
  }

  getProgressPercentage(): number {
    return Math.round((this.getCompletedLessonsCount() / this.lessons.length) * 100);
  }

  playVideo(video: Video) {
    this.currentVideo.set(video);
    this.showVideoPlayer.set(true);
  }

  closeVideoPlayer() {
    this.showVideoPlayer.set(false);
    this.currentVideo.set(null);
  }

  viewPdf(pdf: PDF) {
    this.currentPdf.set(pdf);
    this.showPdfViewer.set(true);
  }

  closePdfViewer() {
    this.showPdfViewer.set(false);
    this.currentPdf.set(null);
  }

  downloadPdf(pdf: PDF) {
    window.open(pdf.url, '_blank');
  }

  getSafeVideoUrl(): SafeResourceUrl {
    const video = this.currentVideo();
    if (video) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
    }
    return '';
  }

  getSafePdfUrl(): SafeResourceUrl {
    const pdf = this.currentPdf();
    if (pdf) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(pdf.url);
    }
    return '';
  }

  markLessonComplete(lesson: Lesson) {
    lesson.isCompleted = !lesson.isCompleted;
  }
}
