export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialFormData {
  name: string;
  role: string;
  text: string;
  image: string;
  order: string;
}
