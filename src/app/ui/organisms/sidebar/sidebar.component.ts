import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarItemComponent } from '../../molecules/sidebar-item/sidebar-item.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarItemComponent, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private sidebarService = inject(SidebarService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    // Refresh menu items based on current user role
    this.sidebarService.refreshMenu();
    // Also refresh when user changes (login/logout)
    this.authService.currentUser$.subscribe(() => {
      this.sidebarService.refreshMenu();
    });
  }

  get isCollapsed() {
    return this.sidebarService.collapsed();
  }

  get menuItems() {
    return this.sidebarService.menu();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  toggleMenuItem(itemId: string): void {
    this.sidebarService.toggleMenuItem(itemId);
  }

  logout(): void {
    this.authService.logout();
  }
}
