import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

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
    const resolved = await params;

    const sale = await prisma.sale.findUnique({
      where: { id: resolved.id },
      select: { id: true },
    });

    if (!sale) {
      return NextResponse.json(
        { success: false, error: "Sale not found" },
        { status: 404 },
      );
    }

    await prisma.$transaction([
      prisma.lead.updateMany({
        where: { saleId: resolved.id },
        data: { saleId: null },
      }),
      prisma.saleCourse.deleteMany({ where: { saleId: resolved.id } }),
      prisma.sale.delete({ where: { id: resolved.id } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, error: "Sale not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to delete sale" },
      { status: 500 },
    );
  }
}
