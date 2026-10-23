import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import { STUDENT_WORK_RULES } from "@/constants/student-work";
import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

const parseOrder = (value: unknown): number => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.trunc(numeric) : 0;
};

const isHttpUrl = (value: string) => /^https?:\/\//i.test(value);

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
    const title = String(body.title ?? "").trim();
    const image = String(body.image ?? "").trim();

    if (!title || !image) {
      return NextResponse.json(
        { success: false, error: "Title and image are required" },
        { status: 400 },
      );
    }

    if (title.length > STUDENT_WORK_RULES.titleMax) {
      return NextResponse.json(
        {
          success: false,
          error: `Title must not exceed ${STUDENT_WORK_RULES.titleMax} characters`,
        },
        { status: 400 },
      );
    }

    if (!isHttpUrl(image)) {
      return NextResponse.json(
        { success: false, error: "Invalid image URL" },
        { status: 400 },
      );
    }

    const item = await prisma.studentWork.update({
      where: { id },
      data: { title, image, order: parseOrder(body.order) },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: item });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update item" },
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

    await prisma.studentWork.delete({ where: { id } });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to delete item" },
      { status: 500 },
    );
  }
}
