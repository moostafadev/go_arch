import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { courses: true },
        },
      },
    });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
      },
    });
    return NextResponse.json(
      { success: true, data: newCategory },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create category. Slug might be duplicated.",
      },
      { status: 500 },
    );
  }
}
