import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import {
  emptySectionMap,
  getSectionKeys,
  isImageSection,
  type ImageSection,
} from "@/constants/images";
import { prisma } from "@/lib/prisma";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

const buildMap = async (
  section: ImageSection,
): Promise<Record<string, string | null>> => {
  const keys = getSectionKeys(section);
  const map: Record<string, string | null> = emptySectionMap(section);

  const rows = await prisma.siteImage.findMany({
    where: { key: { in: keys } },
    select: { key: true, url: true },
  });

  for (const row of rows) {
    if (row.url) map[row.key] = row.url;
  }

  return map;
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;

  if (!isImageSection(section)) {
    return NextResponse.json(
      { success: false, error: "Unknown image section" },
      { status: 404 },
    );
  }

  try {
    const data = await buildMap(section);
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const { section } = await params;

  if (!isImageSection(section)) {
    return NextResponse.json(
      { success: false, error: "Unknown image section" },
      { status: 404 },
    );
  }

  try {
    const body = await req.json();
    const entries = (body?.images ?? {}) as Record<string, unknown>;

    const allowed = new Set<string>(getSectionKeys(section));
    const updates: { key: string; url: string | null }[] = [];

    for (const [key, value] of Object.entries(entries)) {
      if (!allowed.has(key)) continue;

      const url = typeof value === "string" ? value.trim() : "";

      if (url && !/^https?:\/\//i.test(url)) {
        return NextResponse.json(
          { success: false, error: "Invalid image URL" },
          { status: 400 },
        );
      }

      updates.push({ key, url: url || null });
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: "No images to save" },
        { status: 400 },
      );
    }

    await prisma.$transaction(
      updates.map(({ key, url }) =>
        prisma.siteImage.upsert({
          where: { key },
          create: { key, url },
          update: { url },
        }),
      ),
    );

    revalidatePath("/", "layout");

    const data = await buildMap(section);
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to save images" },
      { status: 500 },
    );
  }
}
