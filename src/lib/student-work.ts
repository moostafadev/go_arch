import { cache } from "react";

import { prisma } from "./prisma";

export interface ClientStudentWork {
  id: string;
  title: string;
  image: string;
}

export const fetchStudentWork = cache(
  async (): Promise<ClientStudentWork[]> => {
    try {
      const rows = await prisma.studentWork.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        select: { id: true, title: true, image: true },
      });

      return rows;
    } catch {
      return [];
    }
  },
);
