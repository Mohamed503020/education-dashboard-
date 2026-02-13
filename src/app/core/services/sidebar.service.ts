import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isCollapsed = signal<boolean>(false);
  private menuItems = signal<MenuItem[]>(this.getMenuItems());

  get collapsed() {
    return this.isCollapsed.asReadonly();
  }

  get menu() {
    return this.menuItems.asReadonly();
  }

  toggleSidebar(): void {
    this.isCollapsed.update(value => !value);
  }

  toggleMenuItem(itemId: string): void {
    this.menuItems.update(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, expanded: !item.expanded }
          : item
      )
    );
  }

  private getMenuItems(): MenuItem[] {
    return [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard'
      },
      {
        id: 'event-management',
        label: 'Event Management',
        icon: 'event',
        route: '/event-management'
      },
      {
        id: 'professors',
        label: 'Professors',
        icon: 'school',
        route: '/professors'
      },
      {
        id: 'students',
        label: 'Students',
        icon: 'people',
        expanded: true,
        children: [
          {
            id: 'all-students',
            label: 'All Students',
            icon: 'people_outline',
            route: '/students/all'
          },
          {
            id: 'add-students',
            label: 'Add Students',
            icon: 'person_add',
            route: '/students/add'
          },
          {
            id: 'edit-students',
            label: 'Edit Students',
            icon: 'edit',
            route: '/students/edit'
          },
          {
            id: 'about-students',
            label: 'About Students',
            icon: 'info',
            route: '/students/about'
          }
        ]
      },
      {
        id: 'courses',
        label: 'Courses',
        icon: 'menu_book',
        route: '/courses'
      },
      {
        id: 'library',
        label: 'Library',
        icon: 'local_library',
        route: '/library'
      },
      {
        id: 'departments',
        label: 'Departments',
        icon: 'apartment',
        route: '/departments'
      },
      {
        id: 'staff',
        label: 'Staff',
        icon: 'badge',
        route: '/staff'
      },
      {
        id: 'holiday',
        label: 'Holiday',
        icon: 'event_available',
        route: '/holiday'
      },
      {
        id: 'fees',
        label: 'Fees',
        icon: 'payments',
        route: '/fees'
      }
    ];
  }
}
