export const allCourses = [
  {
    id: "comp-workshop",
    title: "Architectural Competitions Workshop",
    desc: "The Competition Design Studio is designed to develop architectural thinking, master parametric design tools, and create professional projects ready for global competitions.",
    category: "Workshop",
    price: "3,500 EGP",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rhino-grasshopper",
    title: "Rhino & Grasshopper + AI rendering",
    desc: "Master parametric design and create innovative architectural projects from scratch using Rhino, Grasshopper, and AI tools.",
    category: "Course",
    price: "2,500 EGP",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "photoshop-masterclass",
    title: "Architecture Photoshop Masterclass",
    desc: "Enhance your architectural visualization skills, master professional post-production techniques, and create stunning presentations.",
    category: "Course",
    price: "1,500 EGP",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "full-diploma",
    title: "The A-Z Architecture Diploma",
    desc: "The complete path from beginner to professional architect. Includes all courses, workshops, and direct mentorship.",
    category: "Diploma",
    price: "8,000 EGP",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
  },
];

export const courseCategories = [
  "All Courses",
  ...Array.from(new Set(allCourses.map((c) => c.category))),
];

export const courseOptions = allCourses.map((course) => ({
  value: course.id,
  label: `${course.title} (${course.price})`,
}));
