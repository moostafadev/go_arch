export interface TestimonialData {
  name: string;
  role: string;
  text: string;
  image: string | null;
}

export const TESTIMONIAL_RULES = {
  nameMax: 60,
  roleMax: 60,
  textMax: 400,
  maxItems: 30,
} as const;

export const TESTIMONIAL_IMAGE_RATIO = {
  min: 0.9,
  max: 1.1,
  label: "square 1:1 · 400×400+",
} as const;

export const TESTIMONIAL_DEFAULTS: TestimonialData[] = [
  {
    name: "Ahmed Hassan",
    role: "Architecture Student",
    text: "This program completely changed how I approach architectural design. The parametric design modules are top-notch.",
    image: null,
  },
  {
    name: "Sarah Smith",
    role: "Junior Architect",
    text: "The best investment I've made in my career. The competition workshop helped me land my first international internship.",
    image: null,
  },
  {
    name: "Omar Khaled",
    role: "Freelance Designer",
    text: "The AI rendering techniques taught here saved me hours of work and elevated the quality of my presentations.",
    image: null,
  },
  {
    name: "Laila Mahmoud",
    role: "Architecture Student",
    text: "Having an actual practicing architect as a mentor is a game-changer. The feedback is incredibly valuable.",
    image: null,
  },
];
