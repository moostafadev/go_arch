import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

export async function PATCH(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const ids: string[] = Array.isArray(body?.ids)
      ? body.ids.map((value: unknown) => String(value))
      : [];

    if (ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items to reorder" },
        { status: 400 },
      );
    }

    const existing = await prisma.studentWork.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    if (existing.length !== ids.length) {
      return NextResponse.json(
        { success: false, error: "Some items no longer exist" },
        { status: 400 },
      );
    }

    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.studentWork.update({
          where: { id },
          data: { order: index },
        }),
      ),
    );

    revalidatePath("/", "layout");

    const data = await prisma.studentWork.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to reorder student work" },
      { status: 500 },
    );
  }
}
