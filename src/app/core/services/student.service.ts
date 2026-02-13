import { Injectable, signal } from '@angular/core';
import { Student, StudentTableData } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = signal<Student[]>(this.getMockStudents());

  getStudents(): Student[] {
    return this.students();
  }

  getStudentsPaginated(page: number, pageSize: number): StudentTableData {
    const allStudents = this.students();
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    return {
      students: allStudents.slice(start, end),
      totalCount: allStudents.length,
      currentPage: page,
      pageSize: pageSize
    };
  }

  searchStudents(query: string): Student[] {
    const lowerQuery = query.toLowerCase();
    return this.students().filter(student => 
      student.name.toLowerCase().includes(lowerQuery) ||
      student.email.toLowerCase().includes(lowerQuery) ||
      student.rollNo.toLowerCase().includes(lowerQuery)
    );
  }

  addStudent(student: Omit<Student, 'id'>): void {
    const newStudent: Student = {
      ...student,
      id: this.students().length + 1
    };
    this.students.update(students => [...students, newStudent]);
  }

  updateStudent(id: number, updates: Partial<Student>): void {
    this.students.update(students => 
      students.map(s => s.id === id ? { ...s, ...updates } : s)
    );
  }

  deleteStudent(id: number): void {
    this.students.update(students => students.filter(s => s.id !== id));
  }

  private getMockStudents(): Student[] {
    return [
      {
        id: 1,
        rollNo: '01',
        name: 'Tiger Nixon',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'M.COM, P.H.D.',
        admissionDate: '2011/04/25',
        avatar: 'assets/images/avatars/avatar-1.jpg'
      },
      {
        id: 2,
        rollNo: '02',
        name: 'Garrett Winters',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'M.COM, P.H.D.',
        admissionDate: '2011/07/25',
        avatar: 'assets/images/avatars/avatar-2.jpg'
      },
      {
        id: 3,
        rollNo: '03',
        name: 'Ashton Cox',
        email: 'info@example.com',
        mobile: '(123) 4567 890',
        education: 'B.COM, M.COM.',
        admissionDate: '2009/01/12',
        avatar: 'assets/images/avatars/avatar-3.jpg'
      },
      {
        id: 4,
        rollNo: '04',
        name: 'Cedric Kelly',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'B.COM, M.COM.',
        admissionDate: '2012/03/29',
        avatar: 'assets/images/avatars/avatar-4.jpg'
      },
      {
        id: 5,
        rollNo: '05',
        name: 'Airi Satou',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'B.A, B.C.A',
        admissionDate: '2008/11/28',
        avatar: 'assets/images/avatars/avatar-5.jpg'
      },
      {
        id: 6,
        rollNo: '06',
        name: 'Brielle Williamson',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'B.COM, M.COM.',
        admissionDate: '2012/12/02',
        avatar: 'assets/images/avatars/avatar-6.jpg'
      },
      {
        id: 7,
        rollNo: '07',
        name: 'Herrod Chandler',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'B.A, B.C.A',
        admissionDate: '2012/08/06',
        avatar: 'assets/images/avatars/avatar-7.jpg'
      },
      {
        id: 8,
        rollNo: '08',
        name: 'Rhona Davidson',
        email: 'info@example.com',
        mobile: '(123) 4567890',
        education: 'B.TACH, M.TACH',
        admissionDate: '2010/10/14',
        avatar: 'assets/images/avatars/avatar-8.jpg'
      },
      {
        id: 9,
        rollNo: '09',
        name: 'Colleen Hurst',
        email: 'info@example.com',
        mobile: '(123) 4567 890',
        education: 'B.A, B.C.A',
        admissionDate: '2009/09/15',
        avatar: 'assets/images/avatars/avatar-9.jpg'
      },
      {
        id: 10,
        rollNo: '10',
        name: 'Sonya Frost',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'B.COM, M.COM.',
        admissionDate: '2008/12/13',
        avatar: 'assets/images/avatars/avatar-10.jpg'
      },
      {
        id: 11,
        rollNo: '11',
        name: 'Jena Gaines',
        email: 'info@example.com',
        mobile: '(123) 4567 890',
        education: 'B.COM, M.COM.',
        admissionDate: '2008/12/19',
        avatar: 'assets/images/avatars/avatar-1.jpg'
      },
      {
        id: 12,
        rollNo: '12',
        name: 'Quinn Flynn',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'B.A, B.C.A',
        admissionDate: '2013/03/03',
        avatar: 'assets/images/avatars/avatar-2.jpg'
      },
      {
        id: 13,
        rollNo: '13',
        name: 'Charde Marshall',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'B.COM, M.COM.',
        admissionDate: '2008/10/16',
        avatar: 'assets/images/avatars/avatar-3.jpg'
      },
      {
        id: 14,
        rollNo: '14',
        name: 'Haley Kennedy',
        email: 'info@example.com',
        mobile: '(123) 4567 890',
        education: 'B.TACH, M.TACH',
        admissionDate: '2012/12/18',
        avatar: 'assets/images/avatars/avatar-4.jpg'
      },
      {
        id: 15,
        rollNo: '15',
        name: 'Tatyana Fitzpatrick',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'M.COM, P.H.D.',
        admissionDate: '2010/03/17',
        avatar: 'assets/images/avatars/avatar-5.jpg'
      },
      {
        id: 16,
        rollNo: '16',
        name: 'Michael Silva',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'B.COM, M.COM.',
        admissionDate: '2012/11/27',
        avatar: 'assets/images/avatars/avatar-6.jpg'
      },
      {
        id: 17,
        rollNo: '17',
        name: 'Paul Byrd',
        email: 'info@example.com',
        mobile: '(123) 4567 890',
        education: 'B.A, B.C.A',
        admissionDate: '2010/06/09',
        avatar: 'assets/images/avatars/avatar-7.jpg'
      },
      {
        id: 18,
        rollNo: '18',
        name: 'Gloria Little',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'B.TACH, M.TACH',
        admissionDate: '2009/04/10',
        avatar: 'assets/images/avatars/avatar-8.jpg'
      },
      {
        id: 19,
        rollNo: '19',
        name: 'Bradley Greer',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'M.COM, P.H.D.',
        admissionDate: '2012/10/13',
        avatar: 'assets/images/avatars/avatar-9.jpg'
      },
      {
        id: 20,
        rollNo: '20',
        name: 'Dai Rios',
        email: 'info@example.com',
        mobile: '(123) 4567 890',
        education: 'B.COM, M.COM.',
        admissionDate: '2012/09/26',
        avatar: 'assets/images/avatars/avatar-10.jpg'
      },
      {
        id: 21,
        rollNo: '21',
        name: 'Jenette Caldwell',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'B.A, B.C.A',
        admissionDate: '2011/09/03',
        avatar: 'assets/images/avatars/avatar-1.jpg'
      },
      {
        id: 22,
        rollNo: '22',
        name: 'Yuri Berry',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'B.TACH, M.TACH',
        admissionDate: '2009/06/25',
        avatar: 'assets/images/avatars/avatar-2.jpg'
      },
      {
        id: 23,
        rollNo: '23',
        name: 'Caesar Vance',
        email: 'info@example.com',
        mobile: '(123) 4567 890',
        education: 'M.COM, P.H.D.',
        admissionDate: '2011/12/12',
        avatar: 'assets/images/avatars/avatar-3.jpg'
      },
      {
        id: 24,
        rollNo: '24',
        name: 'Doris Wilder',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'B.COM, M.COM.',
        admissionDate: '2010/09/20',
        avatar: 'assets/images/avatars/avatar-4.jpg'
      },
      {
        id: 25,
        rollNo: '25',
        name: 'Angelica Ramos',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'B.A, B.C.A',
        admissionDate: '2009/10/09',
        avatar: 'assets/images/avatars/avatar-5.jpg'
      },
      {
        id: 26,
        rollNo: '26',
        name: 'Gavin Joyce',
        email: 'info@example.com',
        mobile: '(123) 4567 890',
        education: 'B.TACH, M.TACH',
        admissionDate: '2010/12/22',
        avatar: 'assets/images/avatars/avatar-6.jpg'
      },
      {
        id: 27,
        rollNo: '27',
        name: 'Jennifer Chang',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'M.COM, P.H.D.',
        admissionDate: '2010/11/14',
        avatar: 'assets/images/avatars/avatar-7.jpg'
      },
      {
        id: 28,
        rollNo: '28',
        name: 'Brenden Wagner',
        email: 'info@example.com',
        mobile: '123 456 7890',
        education: 'B.COM, M.COM.',
        admissionDate: '2011/06/07',
        avatar: 'assets/images/avatars/avatar-8.jpg'
      },
      {
        id: 29,
        rollNo: '29',
        name: 'Fiona Green',
        email: 'info@example.com',
        mobile: '(123) 4567 890',
        education: 'B.A, B.C.A',
        admissionDate: '2010/03/11',
        avatar: 'assets/images/avatars/avatar-9.jpg'
      },
      {
        id: 30,
        rollNo: '30',
        name: 'Shou Itou',
        email: 'info@example.com',
        mobile: '987 654 3210',
        education: 'B.TACH, M.TACH',
        admissionDate: '2011/08/14',
        avatar: 'assets/images/avatars/avatar-10.jpg'
      }
    ];
  }
}
