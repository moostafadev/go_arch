import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    const updatedCourse = await prisma.course.update({
      where: { id: resolvedParams.id },
      data: {
        title: body.title,
        slug: body.slug,
        desc: body.desc,
        price: body.price,
        discountPrice: body.discountPrice || null,
        hours: body.hours || null,
        image: body.image,
        categoryId: body.categoryId,
      },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: updatedCourse });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update" },
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
    await prisma.course.delete({ where: { id: resolvedParams.id } });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete" },
      { status: 500 },
    );
  }
}
