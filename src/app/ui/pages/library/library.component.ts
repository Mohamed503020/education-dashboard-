import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  copies: number;
  available: number;
  status: 'available' | 'limited' | 'unavailable';
}

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  languageService = inject(LanguageService);

  stats = [
    { icon: 'menu_book', value: '12,450', label: 'library.totalBooks', color: 'primary' },
    { icon: 'people', value: '890', label: 'library.activeMembers', color: 'success' },
    { icon: 'bookmark', value: '145', label: 'library.borrowedToday', color: 'warning' },
    { icon: 'assignment_return', value: '78', label: 'library.returnedToday', color: 'info' }
  ];

  books: Book[] = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', category: 'Computer Science', copies: 15, available: 8, status: 'available' },
    { id: 2, title: 'Calculus: Early Transcendentals', author: 'James Stewart', isbn: '978-1285741550', category: 'Mathematics', copies: 20, available: 5, status: 'limited' },
    { id: 3, title: 'Physics for Scientists', author: 'Paul A. Tipler', isbn: '978-1429201247', category: 'Physics', copies: 12, available: 0, status: 'unavailable' },
    { id: 4, title: 'Organic Chemistry', author: 'Paula Yurkanis Bruice', isbn: '978-0134042282', category: 'Chemistry', copies: 10, available: 4, status: 'limited' },
    { id: 5, title: 'Molecular Biology of the Cell', author: 'Bruce Alberts', isbn: '978-0815344322', category: 'Biology', copies: 8, available: 6, status: 'available' },
  ];
}
