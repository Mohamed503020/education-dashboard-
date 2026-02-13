import { Injectable, signal, effect } from '@angular/core';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface TranslationSet {
  [key: string]: string;
}

export interface Translations {
  en: TranslationSet;
  ar: TranslationSet;
}

const TRANSLATIONS: Translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.eventManagement': 'Event Management',
    'nav.professors': 'Professors',
    'nav.students': 'Students',
    'nav.allStudents': 'All Students',
    'nav.addStudents': 'Add Students',
    'nav.editStudents': 'Edit Students',
    'nav.aboutStudents': 'About Students',
    'nav.courses': 'Courses',
    'nav.library': 'Library',
    'nav.departments': 'Departments',
    'nav.staff': 'Staff',
    'nav.holiday': 'Holiday',
    'nav.fees': 'Fees',
    'nav.mainMenu': 'MAIN MENU',
    
    // Common
    'common.search': 'Search',
    'common.addNew': '+ Add new',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.previous': 'Previous',
    'common.next': 'Next',
    'common.showing': 'Showing',
    'common.to': 'to',
    'common.of': 'of',
    'common.entries': 'entries',
    'common.listView': 'List View',
    'common.gridView': 'Grid View',
    'common.show': 'Show',
    'common.actions': 'Actions',
    
    // Students
    'students.title': 'All Student',
    'students.listTitle': 'All Students List',
    'students.profile': 'Profile',
    'students.rollNo': 'Roll No.',
    'students.name': 'Name',
    'students.education': 'Education',
    'students.mobile': 'Mobile',
    'students.email': 'Email',
    'students.admissionDate': 'Admission Date',
    'students.action': 'Action',
    'students.addStudent': 'Add Student',
    'students.editStudent': 'Edit Student',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome to EDUMIN Dashboard',
    'dashboard.totalStudents': 'Total Students',
    'dashboard.professors': 'Professors',
    'dashboard.courses': 'Courses',
    'dashboard.departments': 'Departments',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.upcomingEvents': 'Upcoming Events',
    'dashboard.recentActivities': 'Recent Activities',
    'dashboard.studentStatistics': 'Student Statistics',
    
    // Common extended
    'common.name': 'Name',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.status': 'Status',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.allStatus': 'All Status',
    'common.export': 'Export',
    'common.weekly': 'Weekly',
    'common.monthly': 'Monthly',
    'common.yearly': 'Yearly',
    
    // Settings
    'settings.title': 'Settings',
    'settings.theme': 'Theme',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.language': 'Language',
    'settings.english': 'English',
    'settings.arabic': 'Arabic',
    'settings.layout': 'Layout',
    'settings.wide': 'Wide',
    'settings.boxed': 'Boxed',
    'settings.compact': 'Compact',
    'settings.sidebarStyle': 'Sidebar Style',
    'settings.default': 'Default',
    'settings.mini': 'Mini',
    'settings.icon': 'Icon Only',
    'settings.primaryColor': 'Primary Color',
    'settings.sidebarColor': 'Sidebar Color',
    'settings.reset': 'Reset Settings',
    
    // Professors
    'professors.title': 'Professors',
    'professors.subtitle': 'Manage all professors in your institution',
    'professors.listTitle': 'All Professors List',
    'professors.department': 'Department',
    'professors.subject': 'Subject',
    'professors.experience': 'Experience',
    'professors.addNew': 'Add Professor',
    'professors.allDepartments': 'All Departments',
    
    // Courses
    'courses.title': 'Courses',
    'courses.subtitle': 'Manage all courses and curriculum',
    'courses.listTitle': 'All Courses List',
    'courses.courseName': 'Course Name',
    'courses.duration': 'Duration',
    'courses.instructor': 'Instructor',
    'courses.students': 'Students',
    'courses.addNew': 'Add Course',
    'courses.allDepartments': 'All Departments',
    'courses.credits': 'Credits',
    
    // Library
    'library.title': 'Library',
    'library.subtitle': 'Manage library books and members',
    'library.listTitle': 'Library Books',
    'library.bookName': 'Book Name',
    'library.bookTitle': 'Book Title',
    'library.author': 'Author',
    'library.category': 'Category',
    'library.available': 'Available',
    'library.totalBooks': 'Total Books',
    'library.activeMembers': 'Active Members',
    'library.borrowedToday': 'Borrowed Today',
    'library.returnedToday': 'Returned Today',
    'library.addBook': 'Add Book',
    'library.searchBooks': 'Search books...',
    'library.allCategories': 'All Categories',
    'library.allStatus': 'All Status',
    'library.copies': 'Copies',
    
    // Departments
    'departments.title': 'Departments',
    'departments.subtitle': 'Manage academic departments',
    'departments.listTitle': 'All Departments',
    'departments.deptName': 'Department Name',
    'departments.head': 'Head',
    'departments.staffCount': 'Staff Count',
    'departments.addNew': 'Add Department',
    'departments.established': 'Established',
    
    // Staff
    'staff.title': 'Staff',
    'staff.subtitle': 'Manage administrative staff members',
    'staff.listTitle': 'All Staff Members',
    'staff.position': 'Position',
    'staff.department': 'Department',
    'staff.role': 'Role',
    'staff.joinDate': 'Join Date',
    'staff.addNew': 'Add Staff',
    'staff.allDepartments': 'All Departments',
    
    // Holiday
    'holiday.title': 'Holiday Calendar',
    'holiday.subtitle': 'Academic year holidays',
    'holiday.listTitle': 'Holiday Calendar',
    'holiday.holidayName': 'Holiday Name',
    'holiday.date': 'Date',
    'holiday.type': 'Type',
    'holiday.addNew': 'Add Holiday',
    'holiday.national': 'National',
    'holiday.religious': 'Religious',
    'holiday.academic': 'Academic',
    'holiday.other': 'Other',
    
    // Fees
    'fees.title': 'Fee Management',
    'fees.subtitle': 'Manage student fees and payments',
    'fees.listTitle': 'Fee Structure',
    'fees.feeType': 'Fee Type',
    'fees.amount': 'Amount',
    'fees.dueDate': 'Due Date',
    'fees.status': 'Status',
    'fees.totalCollected': 'Total Collected',
    'fees.pending': 'Pending',
    'fees.overdue': 'Overdue',
    'fees.paidStudents': 'Paid Students',
    'fees.addPayment': 'Add Payment',
    'fees.searchStudent': 'Search student...',
    'fees.allTypes': 'All Types',
    'fees.studentName': 'Student Name',
    'fees.studentId': 'Student ID',
    
    // Events
    'events.title': 'Event Management',
    'events.subtitle': 'Manage institutional events',
    'events.totalEvents': 'Total Events',
    'events.upcoming': 'Upcoming',
    'events.ongoing': 'Ongoing',
    'events.completed': 'Completed',
    'events.addNew': 'Add Event',
    'events.searchEvents': 'Search events...',
    'events.allCategories': 'All Categories',
    'events.attendees': 'Attendees',
    
    // Sidebar
    'sidebar.students': 'Students',
    'sidebar.professors': 'Professors',
    'sidebar.courses': 'Courses',
    
    // Footer
    'footer.copyright': 'Copyright © Designed & Developed by',
    'footer.designLab': 'DexignLab',
    'footer.year': '2023',
    
    // Course Details
    'courseDetails.credits': 'Credits',
    'courseDetails.students': 'Students',
    'courseDetails.instructor': 'Instructor',
    'courseDetails.editCourse': 'Edit Course',
    'courseDetails.continueLearning': 'Continue Learning',
    'courseDetails.courseProgress': 'Course Progress',
    'courseDetails.lessonsCompleted': 'Lessons Completed',
    'courseDetails.overview': 'Overview',
    'courseDetails.lessons': 'Lessons',
    'courseDetails.videos': 'Videos',
    'courseDetails.resources': 'Resources',
    'courseDetails.aboutCourse': 'About This Course',
    'courseDetails.whatYouLearn': 'What You\'ll Learn',
    'courseDetails.requirements': 'Requirements',
    'courseDetails.courseIncludes': 'Course Includes',
    'courseDetails.videoLessons': 'Video Lessons',
    'courseDetails.chapters': 'Chapters',
    'courseDetails.downloadableResources': 'Downloadable Resources',
    'courseDetails.practiceQuizzes': 'Practice Quizzes',
    'courseDetails.certificate': 'Certificate of Completion',
    'courseDetails.courseCurriculum': 'Course Curriculum',
    'courseDetails.addLesson': 'Add Lesson',
    'courseDetails.lesson': 'Lesson',
    'courseDetails.startLesson': 'Start Lesson',
    'courseDetails.allVideos': 'All Course Videos',
    'courseDetails.addVideo': 'Add Video',
    'courseDetails.courseResources': 'Course Resources',
    'courseDetails.addResource': 'Add Resource',
    'courseDetails.name': 'Name',
    'courseDetails.type': 'Type',
    'courseDetails.size': 'Size',
    'courseDetails.download': 'Download',
    'courseDetails.preview': 'Preview',
    'courseDetails.documents': 'Documents',
    'courseDetails.learn1': 'Understand programming fundamentals',
    'courseDetails.learn2': 'Write clean and efficient Python code',
    'courseDetails.learn3': 'Work with data structures and algorithms',
    'courseDetails.learn4': 'Build real-world applications',
    'courseDetails.learn5': 'Debug and troubleshoot code',
    'courseDetails.learn6': 'Apply object-oriented programming principles',
    'courseDetails.req1': 'Basic computer skills',
    'courseDetails.req2': 'No prior programming experience required',
    'courseDetails.req3': 'A computer with internet access',
    'courseDetails.req4': 'Willingness to learn and practice'
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.eventManagement': 'إدارة الفعاليات',
    'nav.professors': 'الأساتذة',
    'nav.students': 'الطلاب',
    'nav.allStudents': 'جميع الطلاب',
    'nav.addStudents': 'إضافة طلاب',
    'nav.editStudents': 'تعديل الطلاب',
    'nav.aboutStudents': 'عن الطلاب',
    'nav.courses': 'الدورات',
    'nav.library': 'المكتبة',
    'nav.departments': 'الأقسام',
    'nav.staff': 'الموظفين',
    'nav.holiday': 'العطلات',
    'nav.fees': 'الرسوم',
    'nav.mainMenu': 'القائمة الرئيسية',
    
    // Common
    'common.search': 'بحث',
    'common.addNew': '+ إضافة جديد',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.previous': 'السابق',
    'common.next': 'التالي',
    'common.showing': 'عرض',
    'common.to': 'إلى',
    'common.of': 'من',
    'common.entries': 'سجلات',
    'common.listView': 'عرض قائمة',
    'common.gridView': 'عرض شبكة',
    'common.show': 'عرض',
    'common.actions': 'إجراءات',
    
    // Students
    'students.title': 'جميع الطلاب',
    'students.listTitle': 'قائمة جميع الطلاب',
    'students.profile': 'الصورة',
    'students.rollNo': 'رقم القيد',
    'students.name': 'الاسم',
    'students.education': 'التعليم',
    'students.mobile': 'الجوال',
    'students.email': 'البريد الإلكتروني',
    'students.admissionDate': 'تاريخ القبول',
    'students.action': 'إجراء',
    'students.addStudent': 'إضافة طالب',
    'students.editStudent': 'تعديل طالب',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.welcome': 'مرحباً بك في لوحة تحكم EDUMIN',
    'dashboard.totalStudents': 'إجمالي الطلاب',
    'dashboard.professors': 'الأساتذة',
    'dashboard.courses': 'الدورات',
    'dashboard.departments': 'الأقسام',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.upcomingEvents': 'الفعاليات القادمة',
    'dashboard.recentActivities': 'الأنشطة الأخيرة',
    'dashboard.studentStatistics': 'إحصائيات الطلاب',
    
    // Common extended
    'common.name': 'الاسم',
    'common.email': 'البريد الإلكتروني',
    'common.phone': 'الهاتف',
    'common.status': 'الحالة',
    'common.active': 'نشط',
    'common.inactive': 'غير نشط',
    'common.allStatus': 'جميع الحالات',
    'common.export': 'تصدير',
    'common.weekly': 'أسبوعي',
    'common.monthly': 'شهري',
    'common.yearly': 'سنوي',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.theme': 'المظهر',
    'settings.light': 'فاتح',
    'settings.dark': 'داكن',
    'settings.language': 'اللغة',
    'settings.english': 'الإنجليزية',
    'settings.arabic': 'العربية',
    'settings.layout': 'التخطيط',
    'settings.wide': 'واسع',
    'settings.boxed': 'مربع',
    'settings.compact': 'مضغوط',
    'settings.sidebarStyle': 'نمط الشريط الجانبي',
    'settings.default': 'افتراضي',
    'settings.mini': 'صغير',
    'settings.icon': 'أيقونات فقط',
    'settings.primaryColor': 'اللون الرئيسي',
    'settings.sidebarColor': 'لون الشريط الجانبي',
    'settings.reset': 'إعادة ضبط الإعدادات',
    
    // Professors
    'professors.title': 'الأساتذة',
    'professors.subtitle': 'إدارة جميع الأساتذة في مؤسستك',
    'professors.listTitle': 'قائمة جميع الأساتذة',
    'professors.department': 'القسم',
    'professors.subject': 'المادة',
    'professors.experience': 'الخبرة',
    'professors.addNew': 'إضافة أستاذ',
    'professors.allDepartments': 'جميع الأقسام',
    
    // Courses
    'courses.title': 'الدورات',
    'courses.subtitle': 'إدارة جميع الدورات والمناهج',
    'courses.listTitle': 'قائمة جميع الدورات',
    'courses.courseName': 'اسم الدورة',
    'courses.duration': 'المدة',
    'courses.instructor': 'المدرب',
    'courses.students': 'الطلاب',
    'courses.addNew': 'إضافة دورة',
    'courses.allDepartments': 'جميع الأقسام',
    'courses.credits': 'الساعات المعتمدة',
    
    // Library
    'library.title': 'المكتبة',
    'library.subtitle': 'إدارة كتب المكتبة والأعضاء',
    'library.listTitle': 'كتب المكتبة',
    'library.bookName': 'اسم الكتاب',
    'library.bookTitle': 'عنوان الكتاب',
    'library.author': 'المؤلف',
    'library.category': 'الفئة',
    'library.available': 'متاح',
    'library.totalBooks': 'إجمالي الكتب',
    'library.activeMembers': 'الأعضاء النشطين',
    'library.borrowedToday': 'المستعار اليوم',
    'library.returnedToday': 'المرتجع اليوم',
    'library.addBook': 'إضافة كتاب',
    'library.searchBooks': 'بحث عن كتب...',
    'library.allCategories': 'جميع الفئات',
    'library.allStatus': 'جميع الحالات',
    'library.copies': 'النسخ',
    
    // Departments
    'departments.title': 'الأقسام',
    'departments.subtitle': 'إدارة الأقسام الأكاديمية',
    'departments.listTitle': 'جميع الأقسام',
    'departments.deptName': 'اسم القسم',
    'departments.head': 'رئيس القسم',
    'departments.staffCount': 'عدد الموظفين',
    'departments.addNew': 'إضافة قسم',
    'departments.established': 'تأسس',
    
    // Staff
    'staff.title': 'الموظفين',
    'staff.subtitle': 'إدارة موظفي الإدارة',
    'staff.listTitle': 'جميع الموظفين',
    'staff.position': 'المنصب',
    'staff.department': 'القسم',
    'staff.role': 'الدور',
    'staff.joinDate': 'تاريخ الانضمام',
    'staff.addNew': 'إضافة موظف',
    'staff.allDepartments': 'جميع الأقسام',
    
    // Holiday
    'holiday.title': 'تقويم العطلات',
    'holiday.subtitle': 'عطلات العام الدراسي',
    'holiday.listTitle': 'تقويم العطلات',
    'holiday.holidayName': 'اسم العطلة',
    'holiday.date': 'التاريخ',
    'holiday.type': 'النوع',
    'holiday.addNew': 'إضافة عطلة',
    'holiday.national': 'وطنية',
    'holiday.religious': 'دينية',
    'holiday.academic': 'أكاديمية',
    'holiday.other': 'أخرى',
    
    // Fees
    'fees.title': 'إدارة الرسوم',
    'fees.subtitle': 'إدارة رسوم الطلاب والمدفوعات',
    'fees.listTitle': 'هيكل الرسوم',
    'fees.feeType': 'نوع الرسوم',
    'fees.amount': 'المبلغ',
    'fees.dueDate': 'تاريخ الاستحقاق',
    'fees.status': 'الحالة',
    'fees.totalCollected': 'إجمالي المحصل',
    'fees.pending': 'قيد الانتظار',
    'fees.overdue': 'متأخر',
    'fees.paidStudents': 'الطلاب المسددين',
    'fees.addPayment': 'إضافة دفعة',
    'fees.searchStudent': 'بحث عن طالب...',
    'fees.allTypes': 'جميع الأنواع',
    'fees.studentName': 'اسم الطالب',
    'fees.studentId': 'رقم الطالب',
    
    // Events
    'events.title': 'إدارة الفعاليات',
    'events.subtitle': 'إدارة فعاليات المؤسسة',
    'events.totalEvents': 'إجمالي الفعاليات',
    'events.upcoming': 'القادمة',
    'events.ongoing': 'الجارية',
    'events.completed': 'المكتملة',
    'events.addNew': 'إضافة فعالية',
    'events.searchEvents': 'بحث عن فعاليات...',
    'events.allCategories': 'جميع الفئات',
    'events.attendees': 'الحضور',
    
    // Sidebar
    'sidebar.students': 'الطلاب',
    'sidebar.professors': 'الأساتذة',
    'sidebar.courses': 'الدورات',
    
    // Footer
    'footer.copyright': 'حقوق النشر © تصميم وتطوير',
    'footer.designLab': 'DexignLab',
    'footer.year': '2023',
    
    // Course Details
    'courseDetails.credits': 'الساعات المعتمدة',
    'courseDetails.students': 'الطلاب',
    'courseDetails.instructor': 'المدرب',
    'courseDetails.editCourse': 'تعديل الدورة',
    'courseDetails.continueLearning': 'متابعة التعلم',
    'courseDetails.courseProgress': 'تقدم الدورة',
    'courseDetails.lessonsCompleted': 'الدروس المكتملة',
    'courseDetails.overview': 'نظرة عامة',
    'courseDetails.lessons': 'الدروس',
    'courseDetails.videos': 'الفيديوهات',
    'courseDetails.resources': 'الموارد',
    'courseDetails.aboutCourse': 'عن هذه الدورة',
    'courseDetails.whatYouLearn': 'ماذا ستتعلم',
    'courseDetails.requirements': 'المتطلبات',
    'courseDetails.courseIncludes': 'تتضمن الدورة',
    'courseDetails.videoLessons': 'دروس فيديو',
    'courseDetails.chapters': 'فصول',
    'courseDetails.downloadableResources': 'موارد قابلة للتحميل',
    'courseDetails.practiceQuizzes': 'اختبارات تدريبية',
    'courseDetails.certificate': 'شهادة إتمام',
    'courseDetails.courseCurriculum': 'منهج الدورة',
    'courseDetails.addLesson': 'إضافة درس',
    'courseDetails.lesson': 'درس',
    'courseDetails.startLesson': 'بدء الدرس',
    'courseDetails.allVideos': 'جميع فيديوهات الدورة',
    'courseDetails.addVideo': 'إضافة فيديو',
    'courseDetails.courseResources': 'موارد الدورة',
    'courseDetails.addResource': 'إضافة مورد',
    'courseDetails.name': 'الاسم',
    'courseDetails.type': 'النوع',
    'courseDetails.size': 'الحجم',
    'courseDetails.download': 'تحميل',
    'courseDetails.preview': 'معاينة',
    'courseDetails.documents': 'المستندات',
    'courseDetails.learn1': 'فهم أساسيات البرمجة',
    'courseDetails.learn2': 'كتابة كود Python نظيف وفعال',
    'courseDetails.learn3': 'العمل مع هياكل البيانات والخوارزميات',
    'courseDetails.learn4': 'بناء تطبيقات واقعية',
    'courseDetails.learn5': 'تصحيح الأخطاء واستكشاف المشاكل',
    'courseDetails.learn6': 'تطبيق مبادئ البرمجة كائنية التوجه',
    'courseDetails.req1': 'مهارات الكمبيوتر الأساسية',
    'courseDetails.req2': 'لا تحتاج خبرة سابقة في البرمجة',
    'courseDetails.req3': 'جهاز كمبيوتر متصل بالإنترنت',
    'courseDetails.req4': 'الرغبة في التعلم والممارسة'
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = signal<Language>(this.loadLanguage());
  
  readonly language = this.currentLang.asReadonly();

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      this.applyLanguage(lang);
      this.saveLanguage(lang);
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

  translate(key: string): string {
    const lang = this.currentLang();
    return TRANSLATIONS[lang][key] || key;
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
