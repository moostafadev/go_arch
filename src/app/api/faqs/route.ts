import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { FAQ_RULES } from "@/constants/faqs";
import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

const parseOrder = (value: unknown): number => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.trunc(numeric) : 0;
};

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, data: faqs });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch FAQs" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const question = String(body.question ?? "").trim();
    const answer = String(body.answer ?? "").trim();

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: "Question and answer are required" },
        { status: 400 },
      );
    }

    if (
      question.length > FAQ_RULES.questionMax ||
      answer.length > FAQ_RULES.answerMax
    ) {
      return NextResponse.json(
        { success: false, error: "One or more fields are too long" },
        { status: 400 },
      );
    }

    const count = await prisma.faq.count();

    if (count >= FAQ_RULES.maxItems) {
      return NextResponse.json(
        {
          success: false,
          error: `You can add up to ${FAQ_RULES.maxItems} FAQs`,
        },
        { status: 400 },
      );
    }

    const faq = await prisma.faq.create({
      data: { question, answer, order: parseOrder(body.order) },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: faq }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create FAQ" },
      { status: 500 },
    );
  }
}
