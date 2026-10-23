import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { STUDENT_WORK_RULES } from "@/constants/student-work";
import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

const isHttpUrl = (value: string) => /^https?:\/\//i.test(value);

export async function GET() {
  try {
    const items = await prisma.studentWork.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, data: items });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch student work" },
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

    const count = await prisma.studentWork.count();

    if (count >= STUDENT_WORK_RULES.maxItems) {
      return NextResponse.json(
        {
          success: false,
          error: `You can add up to ${STUDENT_WORK_RULES.maxItems} items`,
        },
        { status: 400 },
      );
    }

    const last = await prisma.studentWork.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const nextOrder = (last?.order ?? -1) + 1;

    const item = await prisma.studentWork.create({
      data: { title, image, order: nextOrder },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create item" },
      { status: 500 },
    );
  }
}
