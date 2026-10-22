import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const body = await req.json();

    const updatedCategory = await prisma.category.update({
      where: { id: resolvedParams.id },
      data: {
        name: body.name,
        slug: body.slug,
      },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: updatedCategory });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update category" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;

    const category = await prisma.category.findUnique({
      where: { id: resolvedParams.id },
      include: {
        courses: {
          select: {
            id: true,
            title: true,
            _count: { select: { sales: true } },
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    const blocked = category.courses.filter(
      (course) => course._count.sales > 0,
    );

    if (blocked.length > 0) {
      const names = blocked.map((course) => `"${course.title}"`).join(", ");
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete: ${names} ${
            blocked.length === 1 ? "is" : "are"
          } linked to existing sales. Delete those sales first.`,
        },
        { status: 400 },
      );
    }

    await prisma.$transaction([
      prisma.course.deleteMany({ where: { categoryId: resolvedParams.id } }),
      prisma.category.delete({ where: { id: resolvedParams.id } }),
    ]);

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
