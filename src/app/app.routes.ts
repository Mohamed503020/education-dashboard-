import { Routes } from '@angular/router';
import { authGuard, teacherGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ===== Student Website =====
  {
    path: 'site',
    loadComponent: () => import('./ui/templates/website-layout/website-layout.component').then(m => m.WebsiteLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./ui/pages/site/site-home/site-home.component').then(m => m.SiteHomeComponent)
      },
      {
        path: 'courses/:stage',
        loadComponent: () => import('./ui/pages/site/stage-courses/stage-courses.component').then(m => m.StageCoursesComponent)
      },
      {
        path: 'course/:id',
        loadComponent: () => import('./ui/pages/site/site-course-detail/site-course-detail.component').then(m => m.SiteCourseDetailComponent)
      },
      {
        path: 'exam/:id',
        loadComponent: () => import('./ui/pages/site/take-exam/take-exam.component').then(m => m.TakeExamComponent),
        canActivate: [authGuard]
      },
      {
        path: 'certificate/:id',
        loadComponent: () => import('./ui/pages/site/certificate-view/certificate-view.component').then(m => m.CertificateViewComponent),
        canActivate: [authGuard]
      },
      {
        path: 'my-courses',
        loadComponent: () => import('./ui/pages/site/my-courses/my-courses.component').then(m => m.MyCoursesComponent),
        canActivate: [authGuard]
      },
      {
        path: 'learn/:id',
        loadComponent: () => import('./ui/pages/site/course-viewer/course-viewer.component').then(m => m.CourseViewerComponent),
        canActivate: [authGuard]
      },
      {
        path: 'live',
        loadComponent: () => import('./ui/pages/site/site-live/site-live.component').then(m => m.SiteLiveComponent)
      },
      {
        path: 'live/:id',
        loadComponent: () => import('./ui/pages/live-stream/live-stream-viewer/live-stream-viewer.component').then(m => m.LiveStreamViewerComponent),
        canActivate: [authGuard]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'site',
    pathMatch: 'full'
  },
  // Auth routes
  {
    path: 'login',
    loadComponent: () => import('./ui/pages/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./ui/pages/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [guestGuard]
  },
  // Browse courses (public)
  {
    path: 'browse',
    loadComponent: () => import('./ui/pages/course-browse/course-browse.component').then(m => m.CourseBrowseComponent)
  },
  {
    path: 'browse/:id',
    loadComponent: () => import('./ui/pages/course-detail/course-detail.component').then(m => m.CourseDetailComponent)
  },
  // Live stream routes
  {
    path: 'live',
    children: [
      {
        path: 'active',
        loadComponent: () => import('./ui/pages/live-stream/active-streams/active-streams.component').then(m => m.ActiveStreamsComponent),
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        loadComponent: () => import('./ui/pages/live-stream/teacher-live-manage/teacher-live-manage.component').then(m => m.TeacherLiveManageComponent),
        canActivate: [teacherGuard]
      },
      {
        path: ':id',
        loadComponent: () => import('./ui/pages/live-stream/live-stream-viewer/live-stream-viewer.component').then(m => m.LiveStreamViewerComponent),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./ui/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'students',
    canActivate: [teacherGuard],
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
      },
      {
        path: 'about/:id',
        loadComponent: () => import('./ui/pages/students/about-student/about-student.component').then(m => m.AboutStudentComponent)
      }
    ]
  },
  {
    path: 'professors',
    canActivate: [teacherGuard],
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
    path: 'teachers',
    loadComponent: () => import('./ui/pages/teachers/teachers.component').then(m => m.TeachersComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'courses',
    canActivate: [teacherGuard],
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
    loadComponent: () => import('./ui/pages/departments/departments.component').then(m => m.DepartmentsComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'staff',
    loadComponent: () => import('./ui/pages/staff/staff.component').then(m => m.StaffComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'holiday',
    loadComponent: () => import('./ui/pages/holiday/holiday.component').then(m => m.HolidayComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'fees',
    loadComponent: () => import('./ui/pages/fees/fees.component').then(m => m.FeesComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'library',
    loadComponent: () => import('./ui/pages/library/library.component').then(m => m.LibraryComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'event-management',
    loadComponent: () => import('./ui/pages/event-management/event-management.component').then(m => m.EventManagementComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'reports',
    loadComponent: () => import('./ui/pages/reports/reports.component').then(m => m.ReportsComponent),
    canActivate: [teacherGuard]
  },
  {
    path: '**',
    redirectTo: 'site'
  }
];
