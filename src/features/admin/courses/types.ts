export interface Course {
  id: string;
  title: string;
  slug: string;
  desc: string;
  price: string;
  discountPrice?: string | null;
  hours?: string | null;
  image: string;
  categoryId: string;
  category: {
    name: string;
  };
}

export interface CourseFormData {
  title: string;
  slug: string;
  desc: string;
  price: string;
  discountPrice?: string;
  hours?: string;
  image: string;
  categoryId: string;
}

export interface CategoryOption {
  id: string;
  name: string;
}
