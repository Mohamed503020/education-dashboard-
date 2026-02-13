import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

interface Holiday {
  id: number;
  name: string;
  date: string;
  day: string;
  type: 'national' | 'religious' | 'academic' | 'other';
  description: string;
}

@Component({
  selector: 'app-holiday',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent {
  languageService = inject(LanguageService);

  currentYear = new Date().getFullYear();

  holidays: Holiday[] = [
    { id: 1, name: 'New Year\'s Day', date: 'January 1', day: 'Monday', type: 'national', description: 'Celebration of the new year' },
    { id: 2, name: 'Martin Luther King Jr. Day', date: 'January 15', day: 'Monday', type: 'national', description: 'Honoring MLK Jr.' },
    { id: 3, name: 'Spring Break', date: 'March 11-15', day: 'Mon-Fri', type: 'academic', description: 'Academic spring break' },
    { id: 4, name: 'Easter', date: 'March 31', day: 'Sunday', type: 'religious', description: 'Easter Sunday' },
    { id: 5, name: 'Memorial Day', date: 'May 27', day: 'Monday', type: 'national', description: 'Remembering fallen soldiers' },
    { id: 6, name: 'Independence Day', date: 'July 4', day: 'Thursday', type: 'national', description: 'US Independence Day' },
    { id: 7, name: 'Labor Day', date: 'September 2', day: 'Monday', type: 'national', description: 'Celebrating workers' },
    { id: 8, name: 'Thanksgiving', date: 'November 28', day: 'Thursday', type: 'national', description: 'Thanksgiving Day' },
    { id: 9, name: 'Winter Break', date: 'December 23 - January 3', day: 'Various', type: 'academic', description: 'Winter academic break' },
    { id: 10, name: 'Christmas Day', date: 'December 25', day: 'Wednesday', type: 'religious', description: 'Christmas celebration' },
  ];
}
