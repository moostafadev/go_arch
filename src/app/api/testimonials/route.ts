import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, data: testimonials });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
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

    const count = await prisma.testimonial.count();

    if (count >= TESTIMONIAL_RULES.maxItems) {
      return NextResponse.json(
        {
          success: false,
          error: `You can add up to ${TESTIMONIAL_RULES.maxItems} testimonials`,
        },
        { status: 400 },
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: { name, role, text, image, order: parseOrder(body.order) },
    });

    revalidatePath("/", "layout");

    return NextResponse.json(
      { success: true, data: testimonial },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 500 },
    );
  }
}
