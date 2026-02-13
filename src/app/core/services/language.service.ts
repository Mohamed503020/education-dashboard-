import { Injectable, signal, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translateService = inject(TranslateService);
  private currentLang = signal<Language>(this.loadLanguage());
  
  readonly language = this.currentLang.asReadonly();

  constructor() {
    // Initialize translate service
    this.translateService.addLangs(['en', 'ar']);
    this.translateService.setDefaultLang('en');
    
    // Set initial language
    const savedLang = this.loadLanguage();
    this.translateService.use(savedLang);
    
    effect(() => {
      const lang = this.currentLang();
      this.applyLanguage(lang);
      this.saveLanguage(lang);
      this.translateService.use(lang);
    });
  }

  get direction(): Direction {
    return this.currentLang() === 'ar' ? 'rtl' : 'ltr';
  }

  get isRTL(): boolean {
    return this.currentLang() === 'ar';
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
  }

  toggleLanguage(): void {
    this.currentLang.update(lang => lang === 'en' ? 'ar' : 'en');
  }

  // Keep for backward compatibility - now uses ngx-translate
  translate(key: string): string {
    return this.translateService.instant(key);
  }

  t(key: string): string {
    return this.translate(key);
  }

  private applyLanguage(lang: Language): void {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    document.body.classList.remove('lang-en', 'lang-ar');
    document.body.classList.add(`lang-${lang}`);
  }

  private loadLanguage(): Language {
    try {
      const saved = localStorage.getItem('edumin-language');
      if (saved === 'ar' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      console.error('Error loading language:', e);
    }
    return 'en';
  }

  private saveLanguage(lang: Language): void {
    try {
      localStorage.setItem('edumin-language', lang);
    } catch (e) {
      console.error('Error saving language:', e);
    }
  }
}
