import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["New", "Contacted", "Cancelled"];

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

export async function PATCH(
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
    const { status } = body;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value" },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.update({
      where: { id: resolved.id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: lead });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
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
    await prisma.lead.delete({ where: { id: resolved.id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete lead" },
      { status: 500 },
    );
  }
}
