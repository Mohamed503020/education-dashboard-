import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, AvatarComponent, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private sidebarService = inject(SidebarService);
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  get isDarkMode(): boolean {
    return this.themeService.currentSettings().theme === 'dark';
  }

  get currentLanguage() {
    return this.languageService.language();
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

  onSearch(query: string): void {
    console.log('Search:', query);
  }
}
