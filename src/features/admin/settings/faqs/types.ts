export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface FaqFormData {
  question: string;
  answer: string;
}
