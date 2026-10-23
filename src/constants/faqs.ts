export interface FaqData {
  question: string;
  answer: string;
}

export const FAQ_RULES = {
  questionMax: 200,
  answerMax: 2000,
  maxItems: 30,
} as const;

export const FAQ_DEFAULTS: FaqData[] = [
  {
    question: "Are the courses in Arabic or English?",
    answer:
      "All courses are taught in a mix of Arabic and English, focusing on the technical terminology used globally in the architecture industry.",
  },
  {
    question:
      "What's the difference between a diploma, a bundle, and a course?",
    answer:
      "A course focuses on one specific skill (like Photoshop). A bundle combines related courses at a discount. A diploma is a comprehensive program covering all aspects of architectural design.",
  },
  {
    question: "Is access really for life?",
    answer:
      "Yes, once you enroll, you get lifetime access to the course materials, including any future updates.",
  },
  {
    question: "Who teaches the courses?",
    answer:
      "Courses are taught by practicing architects with years of experience in winning international competitions and real-world projects.",
  },
];
