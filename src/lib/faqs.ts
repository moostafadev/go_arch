import { cache } from "react";

import { FAQ_DEFAULTS } from "@/constants/faqs";

import { prisma } from "./prisma";

export interface ClientFaq {
  id: string;
  question: string;
  answer: string;
}

const toDefaults = (): ClientFaq[] =>
  FAQ_DEFAULTS.map((item, index) => ({
    id: `default-${index}`,
    question: item.question,
    answer: item.answer,
  }));

export const fetchFaqs = cache(async (): Promise<ClientFaq[]> => {
  try {
    const rows = await prisma.faq.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: { id: true, question: true, answer: true },
    });

    if (rows.length === 0) return toDefaults();

    return rows;
  } catch {
    return toDefaults();
  }
});
