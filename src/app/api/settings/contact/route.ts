import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { CONTACT_RULES, SITE_SETTING_KEY } from "@/constants/site";
import { toDigits } from "@/lib/contact";
import { prisma } from "@/lib/prisma";
import { resolveContactSettings } from "@/lib/site-settings";

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
    const row = await prisma.siteSetting.findUnique({
      where: { key: SITE_SETTING_KEY },
      select: { phone: true, email: true },
    });

    return NextResponse.json({
      success: true,
      data: resolveContactSettings(row),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact settings" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const phone = toDigits(String(body.phone ?? ""));
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!CONTACT_RULES.phonePattern.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone must contain 8 to 15 digits including country code",
        },
        { status: 400 },
      );
    }

    if (
      email.length > CONTACT_RULES.emailMax ||
      !CONTACT_RULES.emailPattern.test(email)
    ) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    const saved = await prisma.siteSetting.upsert({
      where: { key: SITE_SETTING_KEY },
      create: { key: SITE_SETTING_KEY, phone, email },
      update: { phone, email },
      select: { phone: true, email: true },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      data: resolveContactSettings(saved),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to save contact settings" },
      { status: 500 },
    );
  }
}
