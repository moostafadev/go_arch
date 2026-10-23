import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { SEO_LIMITS, SEO_PAGES, isSeoPageKey } from "@/constants/seo";
import { prisma } from "@/lib/prisma";
import { resolveSeoSettings } from "@/lib/seo";

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

const sanitizeKeywords = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  const cleaned = value
    .map((item) => String(item).trim())
    .filter(
      (item) => item.length > 0 && item.length <= SEO_LIMITS.keywordLength,
    );

  return Array.from(new Set(cleaned));
};

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const rows = await prisma.seoSetting.findMany();
    const map = resolveSeoSettings(rows);

    const data = SEO_PAGES.map((page) => ({
      pageKey: page.key,
      ...map[page.key],
    }));

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch SEO settings" },
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
    const { pageKey } = body;

    if (!isSeoPageKey(pageKey)) {
      return NextResponse.json(
        { success: false, error: "Invalid page" },
        { status: 400 },
      );
    }

    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const keywords = sanitizeKeywords(body.keywords);
    const image = body.image ? String(body.image).trim() : null;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 },
      );
    }

    if (title.length > SEO_LIMITS.title) {
      return NextResponse.json(
        {
          success: false,
          error: `Title must not exceed ${SEO_LIMITS.title} characters`,
        },
        { status: 400 },
      );
    }

    if (description.length > SEO_LIMITS.description) {
      return NextResponse.json(
        {
          success: false,
          error: `Description must not exceed ${SEO_LIMITS.description} characters`,
        },
        { status: 400 },
      );
    }

    if (keywords.length > SEO_LIMITS.keywords) {
      return NextResponse.json(
        {
          success: false,
          error: `Use at most ${SEO_LIMITS.keywords} keywords`,
        },
        { status: 400 },
      );
    }

    const saved = await prisma.seoSetting.upsert({
      where: { pageKey },
      create: { pageKey, title, description, keywords, image },
      update: { title, description, keywords, image },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      data: {
        pageKey,
        title: saved.title,
        description: saved.description,
        keywords: saved.keywords,
        image: saved.image,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to save SEO settings" },
      { status: 500 },
    );
  }
}
