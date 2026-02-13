import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../organisms/sidebar/sidebar.component';
import { HeaderComponent } from '../../organisms/header/header.component';
import { SettingsPanelComponent } from '../../organisms/settings-panel/settings-panel.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, SettingsPanelComponent, TranslatePipe],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  private sidebarService = inject(SidebarService);
  private themeService = inject(ThemeService);

  get isCollapsed() {
    return this.sidebarService.collapsed();
  }

  get layoutClass() {
    const settings = this.themeService.currentSettings();
    return `layout-${settings.layout} sidebar-${settings.sidebarStyle}`;
  }
}
