import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-website-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './website-layout.component.html',
  styleUrls: ['./website-layout.component.scss']
})
export class WebsiteLayoutComponent {
  private router = inject(Router);
  isMenuOpen = false;

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  get userName(): string {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.firstName || 'طالب';
    } catch { return 'طالب'; }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/site']);
  }
}
