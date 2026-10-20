export interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    courses: number;
  };
}

export interface CategoryFormData {
  name: string;
  slug: string;
}
