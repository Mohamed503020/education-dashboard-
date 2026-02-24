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

  refreshMenu(): void {
    this.menuItems.set(this.getMenuItems());
  }

  private getMenuItems(): MenuItem[] {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user?.role;

    if (role === 'teacher') {
      return this.getTeacherMenu();
    }
    if (role === 'student') {
      return this.getStudentMenu();
    }
    // Admin / default
    return this.getAdminMenu();
  }

  private getTeacherMenu(): MenuItem[] {
    return [
      {
        id: 'dashboard',
        label: 'nav.dashboard',
        icon: 'dashboard',
        route: '/dashboard'
      },
      {
        id: 'students',
        label: 'nav.students',
        icon: 'people',
        expanded: false,
        children: [
          {
            id: 'all-students',
            label: 'nav.allStudents',
            icon: 'people_outline',
            route: '/students/all'
          },
          {
            id: 'add-students',
            label: 'nav.addStudents',
            icon: 'person_add',
            route: '/students/add'
          }
        ]
      },
      {
        id: 'courses',
        label: 'nav.courses',
        icon: 'menu_book',
        expanded: false,
        children: [
          {
            id: 'all-courses',
            label: 'All Courses',
            icon: 'list',
            route: '/courses/all'
          },
          {
            id: 'add-course',
            label: 'Add Course',
            icon: 'add',
            route: '/courses/add'
          }
        ]
      },
      {
        id: 'live',
        label: 'Live Streams',
        icon: 'live_tv',
        route: '/live/manage'
      }
    ];
  }

  private getStudentMenu(): MenuItem[] {
    return [
      {
        id: 'home',
        label: 'Home',
        icon: 'home',
        route: '/student-website'
      },
      {
        id: 'browse',
        label: 'Browse Courses',
        icon: 'search',
        route: '/browse'
      },
      {
        id: 'my-courses',
        label: 'My Courses',
        icon: 'menu_book',
        route: '/courses/all'
      },
      {
        id: 'live',
        label: 'Live Streams',
        icon: 'live_tv',
        route: '/live/active'
      }
    ];
  }

  private getAdminMenu(): MenuItem[] {
    return [
      {
        id: 'dashboard',
        label: 'nav.dashboard',
        icon: 'dashboard',
        route: '/dashboard'
      },
      {
        id: 'event-management',
        label: 'nav.eventManagement',
        icon: 'event',
        route: '/event-management'
      },
      {
        id: 'professors',
        label: 'nav.professors',
        icon: 'school',
        route: '/professors'
      },
      {
        id: 'students',
        label: 'nav.students',
        icon: 'people',
        expanded: false,
        children: [
          {
            id: 'all-students',
            label: 'nav.allStudents',
            icon: 'people_outline',
            route: '/students/all'
          },
          {
            id: 'add-students',
            label: 'nav.addStudents',
            icon: 'person_add',
            route: '/students/add'
          },
          {
            id: 'edit-students',
            label: 'nav.editStudents',
            icon: 'edit',
            route: '/students/edit'
          },
          {
            id: 'about-students',
            label: 'nav.aboutStudents',
            icon: 'info',
            route: '/students/about'
          }
        ]
      },
      {
        id: 'courses',
        label: 'nav.courses',
        icon: 'menu_book',
        route: '/courses'
      },
      {
        id: 'library',
        label: 'nav.library',
        icon: 'local_library',
        route: '/library'
      },
      {
        id: 'departments',
        label: 'nav.departments',
        icon: 'apartment',
        route: '/departments'
      },
      {
        id: 'staff',
        label: 'nav.staff',
        icon: 'badge',
        route: '/staff'
      },
      {
        id: 'holiday',
        label: 'nav.holiday',
        icon: 'event_available',
        route: '/holiday'
      },
      {
        id: 'fees',
        label: 'nav.fees',
        icon: 'payments',
        route: '/fees'
      },
      {
        id: 'reports',
        label: 'nav.reports',
        icon: 'assessment',
        route: '/reports'
      }
    ];
  }
}
