import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

const serializeSale = (sale: {
  id: string;
  customerName: string;
  amount: string;
  phone: string | null;
  email: string | null;
  createdAt: Date;
  courses: { course: { id: string; title: string; price: string } }[];
}) => ({
  id: sale.id,
  customerName: sale.customerName,
  amount: sale.amount,
  phone: sale.phone,
  email: sale.email,
  createdAt: sale.createdAt,
  courses: sale.courses.map(({ course }) => ({
    id: course.id,
    title: course.title,
    price: course.price,
  })),
});

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
    const resolved = await params;
    const body = await req.json();
    const { customerName, courseIds, amount, phone, email } = body;

    if (
      !customerName ||
      !Array.isArray(courseIds) ||
      courseIds.length === 0 ||
      !amount
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer name, at least one course, and amount are required",
        },
        { status: 400 },
      );
    }

    const sale = await prisma.sale.update({
      where: { id: resolved.id },
      data: {
        customerName: String(customerName).trim(),
        amount: String(amount).trim(),
        phone: phone ? String(phone).trim() : null,
        email: email ? String(email).trim() : null,
        courses: {
          deleteMany: {},
          create: courseIds.map((courseId: unknown) => ({
            course: { connect: { id: String(courseId) } },
          })),
        },
      },
      include: { courses: { include: { course: true } } },
    });

    return NextResponse.json({ success: true, data: serializeSale(sale) });
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
      { success: false, error: "Failed to update sale" },
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
