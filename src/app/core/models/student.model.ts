export interface Student {
  id: number;
  rollNo: string;
  name: string;
  email: string;
  mobile: string;
  education: string;
  admissionDate: string;
  avatar: string;
  status?: 'active' | 'inactive';
}

export interface StudentTableData {
  students: Student[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}
