export interface StudentWorkItem {
  id: string;
  title: string;
  image: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentWorkFormData {
  title: string;
  image: string;
  order: string;
}
