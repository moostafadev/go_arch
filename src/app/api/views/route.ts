import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

import { prisma } from "@/lib/prisma";

const DEDUPE_WINDOW_MS = 30 * 60 * 1000;
const MAX_RECENT = 50;
const MAX_TOP_PAGES = 10;

const getClientIp = async () => {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    headersList.get("cf-connecting-ip") ??
    "";
  return ip;
};

const hashIp = (ip: string) => {
  const salt = process.env.IP_HASH_SALT ?? "go-arch-default-salt";
  return createHash("sha256")
    .update(`${ip}:${salt}`)
    .digest("hex")
    .slice(0, 16);
};

const isAuthorized = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === "authorized";
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path.trim() : "";
    const referrer =
      typeof body.referrer === "string" ? body.referrer.trim() : "";

    if (!path || !path.startsWith("/") || path.startsWith("/admin")) {
      return NextResponse.json({ success: true, counted: false });
    }

    const ip = await getClientIp();

    if (!ip) {
      return NextResponse.json({ success: true, counted: false });
    }

    const ipHash = hashIp(ip);
    const windowStart = new Date(Date.now() - DEDUPE_WINDOW_MS);

    const recent = await prisma.pageView.findFirst({
      where: { ipHash, path, createdAt: { gte: windowStart } },
      select: { id: true },
    });

    if (recent) {
      return NextResponse.json({ success: true, counted: false });
    }

    const headersList = await headers();

    await prisma.pageView.create({
      data: {
        ipHash,
        path,
        referrer: referrer || null,
        userAgent: headersList.get("user-agent") ?? null,
      },
    });

    return NextResponse.json({ success: true, counted: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to record view" },
      { status: 500 },
    );
  }
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [total, today, week, uniqueGroups, topPagesRaw, recent] =
      await Promise.all([
        prisma.pageView.count(),
        prisma.pageView.count({ where: { createdAt: { gte: startOfToday } } }),
        prisma.pageView.count({ where: { createdAt: { gte: startOfWeek } } }),
        prisma.pageView.groupBy({ by: ["ipHash"] }),
        prisma.pageView.groupBy({
          by: ["path"],
          _count: { path: true },
          orderBy: { _count: { path: "desc" } },
          take: MAX_TOP_PAGES,
        }),
        prisma.pageView.findMany({
          orderBy: { createdAt: "desc" },
          take: MAX_RECENT,
          select: {
            id: true,
            path: true,
            referrer: true,
            createdAt: true,
          },
        }),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          total,
          unique: uniqueGroups.length,
          today,
          week,
        },
        topPages: topPagesRaw.map((entry) => ({
          path: entry.path,
          count: entry._count.path,
        })),
        recent,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch views" },
      { status: 500 },
    );
  }
}
