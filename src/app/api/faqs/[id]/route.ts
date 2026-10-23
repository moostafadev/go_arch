import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import { FAQ_RULES } from "@/constants/faqs";
import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
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

    const faq = await prisma.faq.update({
      where: { id },
      data: { question, answer },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: faq });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, error: "FAQ not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update FAQ" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;

    await prisma.faq.delete({ where: { id } });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, error: "FAQ not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to delete FAQ" },
      { status: 500 },
    );
  }
}
