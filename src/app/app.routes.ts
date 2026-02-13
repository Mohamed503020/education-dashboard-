import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./ui/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'students',
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        loadComponent: () => import('./ui/pages/students/all-students/all-students.component').then(m => m.AllStudentsComponent)
      },
      {
        path: 'add',
        loadComponent: () => import('./ui/pages/students/add-student/add-student.component').then(m => m.AddStudentComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./ui/pages/students/edit-student/edit-student.component').then(m => m.EditStudentComponent)
      }
    ]
  },
  {
    path: 'professors',
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        loadComponent: () => import('./ui/pages/professors/professors.component').then(m => m.ProfessorsComponent)
      },
      {
        path: 'add',
        loadComponent: () => import('./ui/pages/professors/add-professor/add-professor.component').then(m => m.AddProfessorComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./ui/pages/professors/edit-professor/edit-professor.component').then(m => m.EditProfessorComponent)
      }
    ]
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        loadComponent: () => import('./ui/pages/courses/courses.component').then(m => m.CoursesComponent)
      },
      {
        path: 'add',
        loadComponent: () => import('./ui/pages/courses/add-course/add-course.component').then(m => m.AddCourseComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./ui/pages/courses/edit-course/edit-course.component').then(m => m.EditCourseComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./ui/pages/courses/course-details/course-details.component').then(m => m.CourseDetailsComponent)
      },
      {
        path: ':courseId/lessons/add',
        loadComponent: () => import('./ui/pages/courses/add-lesson/add-lesson.component').then(m => m.AddLessonComponent)
      },
      {
        path: ':courseId/lessons/edit/:lessonId',
        loadComponent: () => import('./ui/pages/courses/add-lesson/add-lesson.component').then(m => m.AddLessonComponent)
      },
      {
        path: ':courseId/videos/add',
        loadComponent: () => import('./ui/pages/courses/add-lesson/add-lesson.component').then(m => m.AddLessonComponent)
      },
      {
        path: ':courseId/resources/add',
        loadComponent: () => import('./ui/pages/courses/add-lesson/add-lesson.component').then(m => m.AddLessonComponent)
      }
    ]
  },
  {
    path: 'departments',
    loadComponent: () => import('./ui/pages/departments/departments.component').then(m => m.DepartmentsComponent)
  },
  {
    path: 'staff',
    loadComponent: () => import('./ui/pages/staff/staff.component').then(m => m.StaffComponent)
  },
  {
    path: 'holiday',
    loadComponent: () => import('./ui/pages/holiday/holiday.component').then(m => m.HolidayComponent)
  },
  {
    path: 'fees',
    loadComponent: () => import('./ui/pages/fees/fees.component').then(m => m.FeesComponent)
  },
  {
    path: 'library',
    loadComponent: () => import('./ui/pages/library/library.component').then(m => m.LibraryComponent)
  },
  {
    path: 'event-management',
    loadComponent: () => import('./ui/pages/event-management/event-management.component').then(m => m.EventManagementComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
