import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: 'academic' | 'sports' | 'cultural' | 'meeting' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees: number;
}

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent {
  languageService = inject(LanguageService);

  stats = [
    { icon: 'event', value: '24', label: 'events.totalEvents', color: 'primary' },
    { icon: 'event_available', value: '12', label: 'events.upcoming', color: 'success' },
    { icon: 'pending', value: '3', label: 'events.ongoing', color: 'warning' },
    { icon: 'event_busy', value: '9', label: 'events.completed', color: 'info' }
  ];

  events: Event[] = [
    { id: 1, title: 'Annual Sports Day', date: 'Mar 15, 2024', time: '9:00 AM', location: 'Sports Ground', organizer: 'Sports Dept.', category: 'sports', status: 'upcoming', attendees: 500 },
    { id: 2, title: 'Science Exhibition', date: 'Mar 20, 2024', time: '10:00 AM', location: 'Main Hall', organizer: 'Science Club', category: 'academic', status: 'upcoming', attendees: 300 },
    { id: 3, title: 'Faculty Meeting', date: 'Mar 10, 2024', time: '2:00 PM', location: 'Conference Room', organizer: 'Admin', category: 'meeting', status: 'ongoing', attendees: 50 },
    { id: 4, title: 'Cultural Festival', date: 'Apr 01, 2024', time: '5:00 PM', location: 'Auditorium', organizer: 'Cultural Club', category: 'cultural', status: 'upcoming', attendees: 800 },
    { id: 5, title: 'Career Fair', date: 'Feb 28, 2024', time: '11:00 AM', location: 'Campus Plaza', organizer: 'Placement Cell', category: 'academic', status: 'completed', attendees: 450 },
  ];
}
