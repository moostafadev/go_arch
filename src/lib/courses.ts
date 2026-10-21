import { cache } from "react";

import { prisma } from "./prisma";
import { ClientCourse } from "@/features/client/courses";
import { formatPrice } from "./format";

export const fetchClientCourses = cache(async (): Promise<ClientCourse[]> => {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    desc: course.desc,
    price: course.price,
    discountPrice: course.discountPrice,
    hours: course.hours,
    image: course.image,
    categoryName: course.category.name,
  }));
});

export const fetchClientCourseBySlug = cache(
  async (slug: string): Promise<ClientCourse | null> => {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: { category: { select: { name: true } } },
    });

    if (!course) return null;

    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      desc: course.desc,
      price: course.price,
      discountPrice: course.discountPrice,
      hours: course.hours,
      image: course.image,
      categoryName: course.category.name,
    };
  },
);

export const fetchCourseOptions = cache(
  async (): Promise<
    { id: string; title: string; price: string; discountPrice: string | null }[]
  > => {
    return prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, price: true, discountPrice: true },
    });
  },
);
