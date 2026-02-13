import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../core/models/student.model';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';
import { ActionButtonsComponent } from '../../molecules/action-buttons/action-buttons.component';
import { PaginationComponent } from '../../molecules/pagination/pagination.component';

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AvatarComponent,
    ActionButtonsComponent,
    PaginationComponent
  ],
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  @Input() students: Student[] = [];
  @Input() totalItems = 0;
  @Input() currentPage = 1;
  @Input() pageSize = 10;

  @Output() edit = new EventEmitter<Student>();
  @Output() delete = new EventEmitter<Student>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();

  searchQuery = '';
  pageSizeOptions = [10, 25, 50, 100];

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }

  onPageSizeChange(): void {
    this.pageSizeChange.emit(this.pageSize);
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onEdit(student: Student): void {
    this.edit.emit(student);
  }

  onDelete(student: Student): void {
    this.delete.emit(student);
  }
}
