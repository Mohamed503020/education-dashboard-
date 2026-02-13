import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';
export type LayoutType = 'wide' | 'boxed' | 'compact';
export type SidebarStyle = 'default' | 'mini' | 'icon';
export type HeaderStyle = 'fixed' | 'static';

export interface LayoutSettings {
  theme: Theme;
  layout: LayoutType;
  sidebarStyle: SidebarStyle;
  headerStyle: HeaderStyle;
  sidebarColor: string;
  primaryColor: string;
}

const DEFAULT_SETTINGS: LayoutSettings = {
  theme: 'light',
  layout: 'wide',
  sidebarStyle: 'default',
  headerStyle: 'fixed',
  sidebarColor: '#5b5fc7',
  primaryColor: '#5b5fc7'
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private settings = signal<LayoutSettings>(this.loadSettings());
  
  readonly currentSettings = this.settings.asReadonly();

  constructor() {
    effect(() => {
      const settings = this.settings();
      this.applyTheme(settings);
      this.saveSettings(settings);
    });
  }

  get theme(): Theme {
    return this.settings().theme;
  }

  get layout(): LayoutType {
    return this.settings().layout;
  }

  get sidebarStyle(): SidebarStyle {
    return this.settings().sidebarStyle;
  }

  toggleTheme(): void {
    this.settings.update(s => ({
      ...s,
      theme: s.theme === 'light' ? 'dark' : 'light'
    }));
  }

  setTheme(theme: Theme): void {
    this.settings.update(s => ({ ...s, theme }));
  }

  setLayout(layout: LayoutType): void {
    this.settings.update(s => ({ ...s, layout }));
  }

  setSidebarStyle(sidebarStyle: SidebarStyle): void {
    this.settings.update(s => ({ ...s, sidebarStyle }));
  }

  setHeaderStyle(headerStyle: HeaderStyle): void {
    this.settings.update(s => ({ ...s, headerStyle }));
  }

  setSidebarColor(sidebarColor: string): void {
    this.settings.update(s => ({ ...s, sidebarColor }));
  }

  setPrimaryColor(primaryColor: string): void {
    this.settings.update(s => ({ ...s, primaryColor }));
  }

  resetSettings(): void {
    this.settings.set(DEFAULT_SETTINGS);
  }

  private applyTheme(settings: LayoutSettings): void {
    const root = document.documentElement;
    
    // Apply theme class
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${settings.theme}`);
    
    // Apply layout class
    document.body.classList.remove('layout-wide', 'layout-boxed', 'layout-compact');
    document.body.classList.add(`layout-${settings.layout}`);
    
    // Apply sidebar style
    document.body.classList.remove('sidebar-default', 'sidebar-mini', 'sidebar-icon');
    document.body.classList.add(`sidebar-${settings.sidebarStyle}`);
    
    // Apply header style
    document.body.classList.remove('header-fixed', 'header-static');
    document.body.classList.add(`header-${settings.headerStyle}`);
    
    // Apply CSS variables
    root.style.setProperty('--sidebar-color', settings.sidebarColor);
    root.style.setProperty('--sidebar-color-dark', this.darkenColor(settings.sidebarColor, 15));
    root.style.setProperty('--primary-color', settings.primaryColor);
    root.style.setProperty('--primary-hover', this.darkenColor(settings.primaryColor, 10));
  }

  private darkenColor(hex: string, percent: number): string {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse hex values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Darken
    r = Math.max(0, Math.floor(r * (100 - percent) / 100));
    g = Math.max(0, Math.floor(g * (100 - percent) / 100));
    b = Math.max(0, Math.floor(b * (100 - percent) / 100));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private loadSettings(): LayoutSettings {
    try {
      const saved = localStorage.getItem('edumin-settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error loading settings:', e);
    }
    return DEFAULT_SETTINGS;
  }

  private saveSettings(settings: LayoutSettings): void {
    try {
      localStorage.setItem('edumin-settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  }
}
