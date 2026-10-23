import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import { TESTIMONIAL_RULES } from "@/constants/testimonials";
import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

const parseOrder = (value: unknown): number => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.trunc(numeric) : 0;
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
    const name = String(body.name ?? "").trim();
    const role = String(body.role ?? "").trim();
    const text = String(body.text ?? "").trim();
    const image = body.image ? String(body.image).trim() : null;

    if (!name || !role || !text) {
      return NextResponse.json(
        { success: false, error: "Name, role, and testimonial are required" },
        { status: 400 },
      );
    }

    if (
      name.length > TESTIMONIAL_RULES.nameMax ||
      role.length > TESTIMONIAL_RULES.roleMax ||
      text.length > TESTIMONIAL_RULES.textMax
    ) {
      return NextResponse.json(
        { success: false, error: "One or more fields are too long" },
        { status: 400 },
      );
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { name, role, text, image, order: parseOrder(body.order) },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: testimonial });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update testimonial" },
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

    await prisma.testimonial.delete({ where: { id } });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial" },
      { status: 500 },
    );
  }
}
