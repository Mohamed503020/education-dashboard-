import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchBarComponent, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private sidebarService = inject(SidebarService);
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  authService = inject(AuthService);

  showUserMenu = false;

  get isDarkMode(): boolean {
    return this.themeService.currentSettings().theme === 'dark';
  }

  get currentLanguage() {
    return this.languageService.language();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  logout(): void {
    this.authService.logout();
    this.showUserMenu = false;
  }

  onSearch(query: string): void {
    console.log('Search:', query);
  }
}
