export interface ClientCourse {
  id: string;
  title: string;
  slug: string;
  desc: string;
  price: string;
  discountPrice: string | null;
  hours: string | null;
  image: string;
  categoryName: string;
}

export interface ClientCourseOption {
  id: string;
  title: string;
  price: string;
}
