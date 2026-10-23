export const SEO_PAGES = [
  { key: "home", label: "Home", path: "/" },
  { key: "courses", label: "Courses", path: "/courses" },
  { key: "about", label: "About", path: "/about" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "privacy", label: "Privacy", path: "/privacy" },
  { key: "terms", label: "Terms", path: "/terms" },
] as const;

export type SeoPageKey = (typeof SEO_PAGES)[number]["key"];

export interface SeoData {
  title: string;
  description: string;
  keywords: string[];
  image: string | null;
}

export const SEO_LIMITS = {
  title: 70,
  description: 160,
  keywords: 15,
  keywordLength: 40,
} as const;

export const SEO_IMAGE_RATIO = {
  min: 1.7,
  max: 2.1,
  label: "1200×630 · 1.91:1",
} as const;

export const SEO_DEFAULTS: Record<SeoPageKey, SeoData> = {
  home: {
    title: "GO ARCH - Architecture Academy",
    description: "Master Architecture & Parametric Design",
    keywords: [],
    image: null,
  },
  courses: {
    title: "Courses & Diplomas | GO ARCH",
    description:
      "Master architectural design, parametric tools, and visualization through our professional courses and diplomas.",
    keywords: [],
    image: null,
  },
  about: {
    title: "About Us | GO ARCH",
    description:
      "Learn about GO ARCH's mission to bridge the gap between academic theory and real-world architectural practice.",
    keywords: [],
    image: null,
  },
  contact: {
    title: "Contact Us | GO ARCH",
    description:
      "Get in touch with GO ARCH. Ask about our architecture courses, mentorship programs, or general inquiries.",
    keywords: [],
    image: null,
  },
  privacy: {
    title: "Privacy Policy | GO ARCH",
    description:
      "Read our privacy policy to understand how GO ARCH collects, uses, and protects your personal information.",
    keywords: [],
    image: null,
  },
  terms: {
    title: "Terms & Conditions | GO ARCH",
    description:
      "Read the terms and conditions for using GO ARCH's platform and enrolling in our architectural courses.",
    keywords: [],
    image: null,
  },
};

export const isSeoPageKey = (value: unknown): value is SeoPageKey =>
  SEO_PAGES.some((page) => page.key === value);
