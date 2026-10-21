export interface PageMeta {
  label: string;
  href: string;
}

const PAGE_MAP: Record<string, PageMeta> = {
  "/": { label: "Home", href: "/" },
  "/courses": { label: "Courses", href: "/courses" },
  "/about": { label: "About Us", href: "/about" },
  "/contact": { label: "Contact", href: "/contact" },
  "/privacy": { label: "Privacy Policy", href: "/privacy" },
  "/terms": { label: "Terms & Conditions", href: "/terms" },
};

export const getPageMeta = (path: string): PageMeta => {
  if (PAGE_MAP[path]) return PAGE_MAP[path];

  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "courses" && segments[1]) {
    const title = segments[1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { label: `Course · ${title}`, href: path };
  }

  const fallback = segments
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" / ");

  return { label: fallback || path, href: path };
};
