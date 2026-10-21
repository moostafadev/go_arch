import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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
      if (leadId) {
        const existing = await tx.lead.findUnique({
          where: { id: String(leadId) },
          select: {
            id: true,
            sales: { take: 1, select: { id: true } },
          },
        });

        if (!existing) {
          throw new Error("LEAD_NOT_FOUND");
        }

        if (existing.sales.length > 0) {
          throw new Error("LEAD_ALREADY_CONVERTED");
        }
      }

      const created = await tx.sale.create({
        data: {
          customerName: String(customerName).trim(),
          amount: String(amount).trim(),
          phone: phone ? String(phone).trim() : null,
          email: email ? String(email).trim() : null,
          leadId: leadId ? String(leadId) : null,
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
          data: { status: "Contacted" },
        });
      }

      return created;
    });

    return NextResponse.json(
      { success: true, data: serializeSale(sale) },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "LEAD_NOT_FOUND") {
        return NextResponse.json(
          { success: false, error: "Lead not found" },
          { status: 404 },
        );
      }

      if (err.message === "LEAD_ALREADY_CONVERTED") {
        return NextResponse.json(
          {
            success: false,
            error: "This lead has already been converted to a sale",
          },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      { success: false, error: "Failed to create sale" },
      { status: 500 },
    );
  }
}
