import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar: string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
  languageService = inject(LanguageService);

  staff: StaffMember[] = [
    { id: 1, name: 'Alice Thompson', email: 'alice.t@edu.com', phone: '+1 234 567 890', role: 'Administrator', department: 'Administration', joinDate: 'Jan 15, 2020', status: 'active', avatar: 'AT' },
    { id: 2, name: 'Bob Martinez', email: 'bob.m@edu.com', phone: '+1 234 567 891', role: 'Accountant', department: 'Finance', joinDate: 'Mar 20, 2019', status: 'active', avatar: 'BM' },
    { id: 3, name: 'Carol White', email: 'carol.w@edu.com', phone: '+1 234 567 892', role: 'Librarian', department: 'Library', joinDate: 'Sep 10, 2018', status: 'active', avatar: 'CW' },
    { id: 4, name: 'David Lee', email: 'david.l@edu.com', phone: '+1 234 567 893', role: 'IT Support', department: 'IT', joinDate: 'Jun 05, 2021', status: 'active', avatar: 'DL' },
    { id: 5, name: 'Eva Garcia', email: 'eva.g@edu.com', phone: '+1 234 567 894', role: 'Receptionist', department: 'Administration', joinDate: 'Nov 12, 2022', status: 'inactive', avatar: 'EG' },
  ];
}
