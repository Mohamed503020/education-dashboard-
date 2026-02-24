import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../../core/services/course.service';
import { LiveStreamService } from '../../../../core/services/live-stream.service';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-site-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-home.component.html',
  styleUrls: ['./site-home.component.scss']
})
export class SiteHomeComponent implements OnInit {
  private courseService = inject(CourseService);
  private liveStreamService = inject(LiveStreamService);

  primaryCourses: Course[] = [];
  preparatoryCourses: Course[] = [];
  secondaryCourses: Course[] = [];
  featuredCourses: Course[] = [];
  liveStreams: any[] = [];
  activeTab: string = 'primary';

  stages = [
    {
      key: 'primary',
      name: 'المرحلة الابتدائية',
      nameShort: 'ابتدائي',
      icon: '🎒',
      gradient: 'linear-gradient(135deg, #43a047, #66bb6a)',
      description: 'تأسيس قوي في اللغة العربية للصفوف من الرابع إلى السادس الابتدائي',
      grades: 'الصف الرابع – السادس',
      link: '/site/courses/primary',
      stats: { courses: 3, students: 250, lessons: 13 }
    },
    {
      key: 'preparatory',
      name: 'المرحلة الاعدادية',
      nameShort: 'اعدادي',
      icon: '📖',
      gradient: 'linear-gradient(135deg, #1565c0, #42a5f5)',
      description: 'تطوير المهارات اللغوية والنحوية للصفوف من الأول إلى الثالث الاعدادي',
      grades: 'الصف الأول – الثالث',
      link: '/site/courses/preparatory',
      stats: { courses: 3, students: 425, lessons: 20 }
    },
    {
      key: 'secondary',
      name: 'المرحلة الثانوية',
      nameShort: 'ثانوي',
      icon: '🎓',
      gradient: 'linear-gradient(135deg, #6a1b9a, #ab47bc)',
      description: 'إتقان البلاغة والنحو والأدب للصفوف من الأول إلى الثالث الثانوي',
      grades: 'الصف الأول – الثالث',
      link: '/site/courses/secondary',
      stats: { courses: 3, students: 625, lessons: 18 }
    }
  ];

  features = [
    { icon: '🎥', title: 'بث مباشر تفاعلي', desc: 'حصص لايف مع الأستاذ مباشرةً مع إمكانية السؤال والنقاش', color: '#e53935' },
    { icon: '📝', title: 'امتحانات ذكية', desc: 'اختبارات فورية بعد كل درس مع تصحيح تلقائي ومعرفة النتيجة حالاً', color: '#ff6f00' },
    { icon: '🏆', title: 'شهادات معتمدة', desc: 'احصل على شهادة إتمام معتمدة بعد اجتياز الامتحان بنجاح', color: '#d4a843' },
    { icon: '📚', title: 'مناهج منظمة', desc: 'دروس مرتبة بعناية حسب المراحل والصفوف التعليمية', color: '#2e7d32' },
    { icon: '🎬', title: 'فيديوهات عالية الجودة', desc: 'شرح واضح ومبسط بالفيديو مع أمثلة تطبيقية وتمارين', color: '#1565c0' },
    { icon: '🔄', title: 'مشاهدة بلا حدود', desc: 'شاهد الدروس في أي وقت وكرر المشاهدة حتى تفهم تماماً', color: '#6a1b9a' }
  ];

  testimonials = [
    { name: 'أحمد سعيد', stage: 'ثالثة ثانوي', text: 'شرح الأستاذ أحمد ممتاز جداً! جبت درجة عالية في العربي بفضل الكورسات دي.', rating: 5 },
    { name: 'فاطمة محمود', stage: 'ثالثة اعدادي', text: 'الامتحانات التجريبية ساعدتني كتير. النتيجة بتظهر فوراً وبعرف غلطاتي.', rating: 5 },
    { name: 'يوسف إبراهيم', stage: 'سادسة ابتدائي', text: 'ابني بقى يحب العربي بعد ما كان بيكرهه. الشرح سهل وواضح.', rating: 4 }
  ];

  ngOnInit() {
    this.loadFeaturedCourses();
    this.loadStageCourses();
    this.loadLiveStreams();
  }

  loadFeaturedCourses() {
    this.courseService.getPublishedCourses({ limit: 6 }).subscribe({
      next: (res) => this.featuredCourses = res.courses
    });
  }

  loadStageCourses() {
    this.courseService.getPublishedCourses({ stage: 'primary', limit: 3 }).subscribe({
      next: (res) => this.primaryCourses = res.courses
    });
    this.courseService.getPublishedCourses({ stage: 'preparatory', limit: 3 }).subscribe({
      next: (res) => this.preparatoryCourses = res.courses
    });
    this.courseService.getPublishedCourses({ stage: 'secondary', limit: 3 }).subscribe({
      next: (res) => this.secondaryCourses = res.courses
    });
  }

  loadLiveStreams() {
    this.liveStreamService.getActiveLiveStreams().subscribe({
      next: (streams) => this.liveStreams = streams,
      error: () => this.liveStreams = []
    });
  }

  getActiveTabCourses(): Course[] {
    switch (this.activeTab) {
      case 'primary': return this.primaryCourses;
      case 'preparatory': return this.preparatoryCourses;
      case 'secondary': return this.secondaryCourses;
      default: return this.primaryCourses;
    }
  }

  getTeacherName(course: Course): string {
    if (typeof course.teacher === 'object' && course.teacher) {
      return `${(course.teacher as any).firstName || ''} ${(course.teacher as any).lastName || ''}`.trim();
    }
    return 'أ/ أحمد محمد';
  }

  getStageName(stage?: string): string {
    const names: Record<string, string> = { 'primary': 'ابتدائي', 'preparatory': 'اعدادي', 'secondary': 'ثانوي' };
    return stage ? names[stage] || stage : '';
  }

  getGradeName(grade?: number): string {
    if (!grade) return '';
    const ordinals: Record<number, string> = { 1: 'الأول', 2: 'الثاني', 3: 'الثالث', 4: 'الرابع', 5: 'الخامس', 6: 'السادس' };
    return `الصف ${ordinals[grade] || grade}`;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
