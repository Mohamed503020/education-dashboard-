import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

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

interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  department: string;
  professor: string;
  professorImage: string;
  credits: number;
  duration: string;
  students: number;
  rating: number;
  image: string;
  lessons: Lesson[];
  videos: Video[];
  pdfs: PDF[];
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
  
  courseId: string = '';
  activeTab = signal<'overview' | 'lessons' | 'videos' | 'resources'>('overview');
  expandedLesson = signal<number | null>(null);
  
  // Media viewer signals
  currentVideo = signal<Video | null>(null);
  currentPdf = signal<PDF | null>(null);
  showVideoPlayer = signal<boolean>(false);
  showPdfViewer = signal<boolean>(false);
  
  course: Course = {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Programming',
    description: 'This comprehensive course covers the fundamentals of programming using Python. Students will learn about variables, data types, control structures, functions, and basic object-oriented programming concepts. The course includes hands-on projects and real-world applications.',
    department: 'Computer Science',
    professor: 'Dr. Ahmed Hassan',
    professorImage: 'assets/images/professor1.jpg',
    credits: 3,
    duration: '16 weeks',
    students: 156,
    rating: 4.8,
    image: 'assets/images/course1.jpg',
    lessons: [],
    videos: [],
    pdfs: []
  };

  lessons: Lesson[] = [
    { id: 1, title: 'Introduction to Python', description: 'Learn the basics of Python programming language, installation, and setup.', duration: '45 min', order: 1, isCompleted: true },
    { id: 2, title: 'Variables and Data Types', description: 'Understanding variables, strings, numbers, and boolean data types.', duration: '60 min', order: 2, isCompleted: true },
    { id: 3, title: 'Control Structures', description: 'If statements, loops, and conditional logic in Python.', duration: '75 min', order: 3, isCompleted: false },
    { id: 4, title: 'Functions and Modules', description: 'Creating reusable code with functions and organizing code into modules.', duration: '90 min', order: 4, isCompleted: false },
    { id: 5, title: 'Lists and Dictionaries', description: 'Working with collections of data in Python.', duration: '60 min', order: 5, isCompleted: false },
    { id: 6, title: 'File Handling', description: 'Reading from and writing to files in Python.', duration: '45 min', order: 6, isCompleted: false },
    { id: 7, title: 'Object-Oriented Programming', description: 'Introduction to classes, objects, and OOP principles.', duration: '120 min', order: 7, isCompleted: false },
    { id: 8, title: 'Final Project', description: 'Build a complete application using all learned concepts.', duration: '180 min', order: 8, isCompleted: false }
  ];

  videos: Video[] = [
    { id: 1, title: 'Python Setup Tutorial', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'assets/images/video1.jpg', duration: '12:34', lessonId: 1 },
    { id: 2, title: 'Your First Python Program', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'assets/images/video2.jpg', duration: '18:45', lessonId: 1 },
    { id: 3, title: 'Understanding Variables', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'assets/images/video3.jpg', duration: '22:10', lessonId: 2 },
    { id: 4, title: 'Data Types Deep Dive', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'assets/images/video4.jpg', duration: '28:55', lessonId: 2 },
    { id: 5, title: 'If Statements Explained', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'assets/images/video5.jpg', duration: '15:20', lessonId: 3 },
    { id: 6, title: 'Loops in Python', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'assets/images/video6.jpg', duration: '25:00', lessonId: 3 },
    { id: 7, title: 'Creating Functions', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'assets/images/video7.jpg', duration: '32:15', lessonId: 4 },
    { id: 8, title: 'Working with Lists', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'assets/images/video8.jpg', duration: '20:40', lessonId: 5 }
  ];

  pdfs: PDF[] = [
    { id: 1, title: 'Python Basics Cheat Sheet', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '1.2 MB', lessonId: 1 },
    { id: 2, title: 'Variables Reference Guide', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '856 KB', lessonId: 2 },
    { id: 3, title: 'Control Structures Workbook', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '2.1 MB', lessonId: 3 },
    { id: 4, title: 'Functions Handbook', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '1.8 MB', lessonId: 4 },
    { id: 5, title: 'Data Structures Guide', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '3.2 MB', lessonId: 5 },
    { id: 6, title: 'File I/O Examples', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '945 KB', lessonId: 6 },
    { id: 7, title: 'OOP Principles PDF', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '2.5 MB', lessonId: 7 },
    { id: 8, title: 'Final Project Guidelines', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '1.1 MB', lessonId: 8 }
  ];

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') || '1';
    this.loadCourseData();
  }

  loadCourseData() {
    // In real app, fetch from API based on courseId
    this.course.lessons = this.lessons;
    this.course.videos = this.videos;
    this.course.pdfs = this.pdfs;
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
