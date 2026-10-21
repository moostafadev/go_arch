import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        sales: {
          take: 1,
          select: { id: true },
        },
      },
    });

    const data = leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      course: lead.course,
      message: lead.message,
      status: lead.status,
      createdAt: lead.createdAt,
      saleId: lead.sales[0]?.id ?? null,
    }));

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, course, email, message } = body;

    if (!name || !phone || !course) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and course are required" },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: String(name).trim(),
        phone: String(phone).trim(),
        course: String(course).trim(),
        email: email ? String(email).trim() : null,
        message: message ? String(message).trim() : null,
      },
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (err) {
    console.error("LEAD_CREATE_ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Failed to create lead",
      },
      { status: 500 },
    );
  }
}
