import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { SidebarItemComponent } from '../../molecules/sidebar-item/sidebar-item.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarItemComponent, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);

  get isCollapsed() {
    return this.sidebarService.collapsed();
  }

  get menuItems() {
    return this.sidebarService.menu();
  }

  toggleMenuItem(itemId: string): void {
    this.sidebarService.toggleMenuItem(itemId);
  }
}
