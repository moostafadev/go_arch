import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCourse = await prisma.course.create({
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

    return NextResponse.json(
      { success: true, data: newCourse },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create course" },
      { status: 500 },
    );
  }
}
