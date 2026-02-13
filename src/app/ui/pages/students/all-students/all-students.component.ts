import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../core/services/student.service';
import { Student, StudentTableData } from '../../../../core/models/student.model';
import { Breadcrumb } from '../../../../core/models/menu.model';
import { BreadcrumbComponent } from '../../../molecules/breadcrumb/breadcrumb.component';
import { ViewToggleComponent, ViewMode } from '../../../molecules/view-toggle/view-toggle.component';
import { ButtonComponent } from '../../../atoms/button/button.component';
import { StudentsTableComponent } from '../../../organisms/students-table/students-table.component';

@Component({
  selector: 'app-all-students',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ViewToggleComponent,
    ButtonComponent,
    StudentsTableComponent
  ],
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent {
  private studentService = inject(StudentService);

  breadcrumbs: Breadcrumb[] = [
    { label: 'Students', route: '/students' },
    { label: 'All Student' }
  ];

  viewMode = signal<ViewMode>('list');
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  searchQuery = signal<string>('');

  get tableData(): StudentTableData {
    const data = this.studentService.getStudentsPaginated(
      this.currentPage(),
      this.pageSize()
    );
    
    if (this.searchQuery()) {
      const filtered = this.studentService.searchStudents(this.searchQuery());
      const start = (this.currentPage() - 1) * this.pageSize();
      const end = start + this.pageSize();
      
      return {
        students: filtered.slice(start, end),
        totalCount: filtered.length,
        currentPage: this.currentPage(),
        pageSize: this.pageSize()
      };
    }
    
    return data;
  }

  onViewChange(view: ViewMode): void {
    this.viewMode.set(view);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }

  onEditStudent(student: Student): void {
    console.log('Edit student:', student);
  }

  onDeleteStudent(student: Student): void {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      this.studentService.deleteStudent(student.id);
    }
  }

  onAddNew(): void {
    console.log('Add new student');
  }
}
