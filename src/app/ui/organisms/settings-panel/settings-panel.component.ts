import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme, LayoutType, SidebarStyle } from '../../../core/services/theme.service';
import { LanguageService, Language } from '../../../core/services/language.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss']
})
export class SettingsPanelComponent {
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  isOpen = signal(false);

  colorOptions = [
    { name: 'Purple', value: '#5b5fc7' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Indigo', value: '#6366f1' }
  ];

  get settings() {
    return this.themeService.currentSettings();
  }

  get currentLanguage() {
    return this.languageService.language();
  }

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  setLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
  }

  setLayout(layout: LayoutType): void {
    this.themeService.setLayout(layout);
  }

  setSidebarStyle(style: SidebarStyle): void {
    this.themeService.setSidebarStyle(style);
  }

  setPrimaryColor(color: string): void {
    this.themeService.setPrimaryColor(color);
  }

  setSidebarColor(color: string): void {
    this.themeService.setSidebarColor(color);
  }

  resetSettings(): void {
    this.themeService.resetSettings();
    this.languageService.setLanguage('en');
  }
}
