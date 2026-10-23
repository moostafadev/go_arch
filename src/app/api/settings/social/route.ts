import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { SITE_SETTING_KEY } from "@/constants/site";
import { prisma } from "@/lib/prisma";
import { resolveSocialLinks } from "@/lib/site-settings";
import { parseSocialLinks } from "@/lib/social";

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
      select: { socials: true },
    });

    return NextResponse.json({
      success: true,
      data: resolveSocialLinks(row?.socials),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch social links" },
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
    const parsed = parseSocialLinks(body.links);

    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, error: parsed.error },
        { status: 400 },
      );
    }

    const saved = await prisma.siteSetting.upsert({
      where: { key: SITE_SETTING_KEY },
      create: { key: SITE_SETTING_KEY, socials: { set: parsed.links } },
      update: { socials: { set: parsed.links } },
      select: { socials: true },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      data: resolveSocialLinks(saved.socials),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to save social links" },
      { status: 500 },
    );
  }
}
