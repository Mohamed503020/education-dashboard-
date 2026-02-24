import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MaterialService } from '../../../../core/services/material.service';
import { CourseService } from '../../../../core/services/course.service';
import { ExamService } from '../../../../core/services/exam.service';
import { Course, Material } from '../../../../core/models/course.model';
import { Exam } from '../../../../core/models/exam.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-course-viewer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.scss']
})
export class CourseViewerComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private materialService = inject(MaterialService);
  private courseService = inject(CourseService);
  private examService = inject(ExamService);

  course: Course | null = null;
  materials: Material[] = [];
  exams: Exam[] = [];
  activeMaterial: Material | null = null;
  loading = true;
  sidebarOpen = true;
  activeTab: 'lessons' | 'exams' = 'lessons';
  apiBase = environment.apiUrl.replace('/api', '');

  get videos(): Material[] {
    return this.materials.filter(m => m.type === 'video');
  }

  get pdfs(): Material[] {
    return this.materials.filter(m => m.type === 'pdf');
  }

  get assignments(): Material[] {
    return this.materials.filter(m => m.type === 'assignment');
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  get materialFileUrl(): string {
    if (!this.activeMaterial?.fileUrl) return '';
    const url = this.activeMaterial.fileUrl;
    if (url.startsWith('http')) return url;
    return `${this.apiBase}${url}`;
  }

  get safePdfUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.materialFileUrl);
  }

  get activeIndex(): number {
    if (!this.activeMaterial) return -1;
    return this.materials.findIndex(m => m._id === this.activeMaterial!._id);
  }

  get hasNext(): boolean {
    return this.activeIndex < this.materials.length - 1;
  }

  get hasPrev(): boolean {
    return this.activeIndex > 0;
  }

  get progressPercent(): number {
    if (this.materials.length === 0) return 0;
    return Math.round(((this.activeIndex + 1) / this.materials.length) * 100);
  }

  ngOnInit() {
    const courseId = this.route.snapshot.params['id'];
    const materialId = this.route.snapshot.queryParams['material'];
    this.loadCourse(courseId, materialId);
  }

  ngOnDestroy() {}

  loadCourse(courseId: string, initialMaterialId?: string) {
    this.loading = true;
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loadMaterials(courseId, initialMaterialId);
        this.loadExams(courseId);
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/site']);
      }
    });
  }

  loadMaterials(courseId: string, initialMaterialId?: string) {
    this.materialService.getMaterialsByCourse(courseId).subscribe({
      next: (materials) => {
        this.materials = materials;
        if (initialMaterialId) {
          const found = materials.find(m => m._id === initialMaterialId);
          this.activeMaterial = found || materials[0] || null;
        } else {
          this.activeMaterial = materials[0] || null;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadExams(courseId: string) {
    this.examService.getExamsByCourse(courseId).subscribe({
      next: (exams) => this.exams = exams,
      error: () => {}
    });
  }

  selectMaterial(material: Material) {
    this.activeMaterial = material;
    // Update query param without full navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextMaterial() {
    if (this.hasNext) {
      this.selectMaterial(this.materials[this.activeIndex + 1]);
    }
  }

  prevMaterial() {
    if (this.hasPrev) {
      this.selectMaterial(this.materials[this.activeIndex - 1]);
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getMaterialIcon(type: string): string {
    switch (type) {
      case 'video': return '🎬';
      case 'pdf': return '📄';
      case 'assignment': return '📝';
      case 'document': return '📋';
      case 'link': return '🔗';
      default: return '📖';
    }
  }

  getTypeName(type: string): string {
    switch (type) {
      case 'video': return 'فيديو';
      case 'pdf': return 'ملف PDF';
      case 'assignment': return 'تكليف';
      default: return 'مادة';
    }
  }

  formatDuration(seconds?: number): string {
    if (!seconds) return '';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  downloadFile() {
    if (!this.materialFileUrl) return;
    window.open(this.materialFileUrl, '_blank');
  }

  getTeacherName(): string {
    if (this.course && typeof this.course.teacher === 'object') {
      return `${(this.course.teacher as any).firstName || ''} ${(this.course.teacher as any).lastName || ''}`.trim();
    }
    return 'المدرس';
  }
}
