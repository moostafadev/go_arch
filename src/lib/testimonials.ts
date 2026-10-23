import { cache } from "react";

import { TESTIMONIAL_DEFAULTS } from "@/constants/testimonials";

import { prisma } from "./prisma";

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string | null;
}

const toDefaults = (): ClientTestimonial[] =>
  TESTIMONIAL_DEFAULTS.map((item, index) => ({
    id: `default-${index}`,
    name: item.name,
    role: item.role,
    text: item.text,
    image: item.image,
  }));

export const fetchTestimonials = cache(
  async (): Promise<ClientTestimonial[]> => {
    try {
      const rows = await prisma.testimonial.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        select: { id: true, name: true, role: true, text: true, image: true },
      });

      if (rows.length === 0) return toDefaults();

      return rows;
    } catch {
      return toDefaults();
    }
  },
);
