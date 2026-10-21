export interface SaleCourseRef {
  id: string;
  title: string;
  price: string;
}

export interface Sale {
  id: string;
  customerName: string;
  amount: string;
  phone?: string | null;
  email?: string | null;
  courses: SaleCourseRef[];
  createdAt: string;
}

export interface SaleFormData {
  customerName: string;
  courseIds: string[];
  amount: string;
  phone: string;
  email: string;
}

export interface CourseOption {
  id: string;
  title: string;
  price: string;
  discountPrice?: string | null;
}
