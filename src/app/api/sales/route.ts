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

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const sales = await prisma.sale.findMany({
      orderBy: { createdAt: "desc" },
      include: { courses: { include: { course: true } } },
    });

    return NextResponse.json({
      success: true,
      data: sales.map(serializeSale),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch sales" },
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
    const { customerName, courseIds, amount, phone, email, leadId } = body;

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

    const sale = await prisma.$transaction(async (tx) => {
      const created = await tx.sale.create({
        data: {
          customerName: String(customerName).trim(),
          amount: String(amount).trim(),
          phone: phone ? String(phone).trim() : null,
          email: email ? String(email).trim() : null,
          courses: {
            create: courseIds.map((courseId: unknown) => ({
              course: { connect: { id: String(courseId) } },
            })),
          },
        },
        include: { courses: { include: { course: true } } },
      });

      if (leadId) {
        await tx.lead.update({
          where: { id: String(leadId) },
          data: { saleId: created.id, status: "Contacted" },
        });
      }

      return created;
    });

    return NextResponse.json(
      { success: true, data: serializeSale(sale) },
      { status: 201 },
    );
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "This lead has already been converted to a sale",
        },
        { status: 400 },
      );
    }

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create sale" },
      { status: 500 },
    );
  }
}
