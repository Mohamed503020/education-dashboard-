import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

interface FeeRecord {
  id: number;
  studentName: string;
  studentId: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent {
  languageService = inject(LanguageService);

  stats = [
    { icon: 'account_balance', value: '$125,450', label: 'fees.totalCollected', color: 'primary' },
    { icon: 'pending_actions', value: '$45,200', label: 'fees.pending', color: 'warning' },
    { icon: 'error', value: '$12,800', label: 'fees.overdue', color: 'danger' },
    { icon: 'people', value: '1,245', label: 'fees.paidStudents', color: 'success' }
  ];

  fees: FeeRecord[] = [
    { id: 1, studentName: 'John Doe', studentId: 'STU001', type: 'Tuition', amount: 5000, dueDate: 'Mar 15, 2024', status: 'paid' },
    { id: 2, studentName: 'Jane Smith', studentId: 'STU002', type: 'Library', amount: 150, dueDate: 'Mar 10, 2024', status: 'pending' },
    { id: 3, studentName: 'Mike Johnson', studentId: 'STU003', type: 'Laboratory', amount: 300, dueDate: 'Feb 28, 2024', status: 'overdue' },
    { id: 4, studentName: 'Emily Brown', studentId: 'STU004', type: 'Tuition', amount: 5000, dueDate: 'Mar 15, 2024', status: 'paid' },
    { id: 5, studentName: 'David Wilson', studentId: 'STU005', type: 'Sports', amount: 200, dueDate: 'Mar 20, 2024', status: 'pending' },
  ];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  formatAmount(amount: number): string {
    return amount.toLocaleString();
  }
}
