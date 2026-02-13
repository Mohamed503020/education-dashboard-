import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

interface Professor {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  status: 'active' | 'inactive';
  avatar: string;
}

@Component({
  selector: 'app-professors',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss']
})
export class ProfessorsComponent {
  languageService = inject(LanguageService);

  professors: Professor[] = [
    { id: 1, name: 'Dr. John Smith', email: 'john.smith@edu.com', phone: '+1 234 567 890', department: 'Computer Science', subject: 'Algorithms', status: 'active', avatar: 'JS' },
    { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.j@edu.com', phone: '+1 234 567 891', department: 'Mathematics', subject: 'Calculus', status: 'active', avatar: 'SJ' },
    { id: 3, name: 'Dr. Michael Brown', email: 'm.brown@edu.com', phone: '+1 234 567 892', department: 'Physics', subject: 'Quantum Mechanics', status: 'active', avatar: 'MB' },
    { id: 4, name: 'Dr. Emily Davis', email: 'e.davis@edu.com', phone: '+1 234 567 893', department: 'Chemistry', subject: 'Organic Chemistry', status: 'inactive', avatar: 'ED' },
    { id: 5, name: 'Dr. Robert Wilson', email: 'r.wilson@edu.com', phone: '+1 234 567 894', department: 'Biology', subject: 'Genetics', status: 'active', avatar: 'RW' },
    { id: 6, name: 'Dr. Lisa Anderson', email: 'l.anderson@edu.com', phone: '+1 234 567 895', department: 'English', subject: 'Literature', status: 'active', avatar: 'LA' },
  ];

  selectedProfessors: number[] = [];

  toggleSelectAll(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedProfessors = this.professors.map(p => p.id);
    } else {
      this.selectedProfessors = [];
    }
  }

  toggleSelect(id: number): void {
    const index = this.selectedProfessors.indexOf(id);
    if (index === -1) {
      this.selectedProfessors.push(id);
    } else {
      this.selectedProfessors.splice(index, 1);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedProfessors.includes(id);
  }

  get allSelected(): boolean {
    return this.professors.length > 0 && this.selectedProfessors.length === this.professors.length;
  }
}
