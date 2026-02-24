import { Component, OnInit, inject } from '@angular/core';
import { TeacherService } from '@core/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  teachers: any[] = [];
  teacherService = inject(TeacherService);

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe({
      next: (res: unknown) => {
        if (res && typeof res === 'object' && 'data' in (res as any)) {
          this.teachers = (res as any).data || [];
        } else if (Array.isArray(res)) {
          this.teachers = res as any[];
        } else {
          this.teachers = [];
        }
      },
      error: () => {
        this.teachers = [];
      }
    });
  }
}
