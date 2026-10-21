import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

const parseAmount = (amount: string): number => {
  const numeric = amount.replace(/[^\d.]/g, "");
  return numeric ? Number(numeric) : 0;
};

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
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setUTCHours(0, 0, 0, 0);

    const startOfWeek = new Date(startOfToday);
    startOfWeek.setUTCDate(
      startOfToday.getUTCDate() - startOfToday.getUTCDay(),
    );

    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setUTCDate(startOfToday.getUTCDate() - 6);

    const [
      totalLeads,
      newLeads,
      todayLeads,
      weekLeads,
      totalSales,
      todaySales,
      weekSales,
      salesRecords,
      totalCourses,
      recentLeadsRaw,
      recentSalesRaw,
      leadsByStatusRaw,
      totalViews,
      todayViews,
      uniqueViewsRaw,
      topPagesRaw,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "New" } }),
      prisma.lead.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.lead.count({ where: { createdAt: { gte: startOfWeek } } }),
      prisma.sale.count(),
      prisma.sale.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.sale.count({ where: { createdAt: { gte: startOfWeek } } }),
      prisma.sale.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        select: { amount: true, createdAt: true },
      }),
      prisma.course.count(),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          phone: true,
          course: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.sale.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          customerName: true,
          amount: true,
          createdAt: true,
          courses: { select: { course: { select: { title: true } } } },
        },
      }),
      prisma.lead.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.pageView.groupBy({ by: ["ipHash"] }),
      prisma.pageView.groupBy({
        by: ["path"],
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 5,
      }),
    ]);

    const dayBuckets: Record<string, { count: number; amount: number }> = {};

    for (let i = 0; i < 7; i++) {
      const day = new Date(sevenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      dayBuckets[day.toISOString().slice(0, 10)] = { count: 0, amount: 0 };
    }

    let totalRevenue = 0;

    for (const sale of salesRecords) {
      const key = sale.createdAt.toISOString().slice(0, 10);
      const bucket = dayBuckets[key];

      if (bucket) {
        bucket.count += 1;
        bucket.amount += parseAmount(sale.amount);
        totalRevenue += parseAmount(sale.amount);
      }
    }

    const allSalesRevenue = await prisma.sale.findMany({
      select: { amount: true },
    });

    const lifetimeRevenue = allSalesRevenue.reduce(
      (sum, sale) => sum + parseAmount(sale.amount),
      0,
    );

    const salesLast7Days = Object.entries(dayBuckets)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const todayRevenue = salesLast7Days[salesLast7Days.length - 1]?.amount ?? 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          lifetimeRevenue,
          weekRevenue: totalRevenue,
          todayRevenue,
          totalSales,
          todaySales,
          weekSales,
          totalLeads,
          newLeads,
          todayLeads,
          weekLeads,
          totalCourses,
          totalViews,
          todayViews,
          uniqueViews: uniqueViewsRaw.length,
        },
        salesLast7Days,
        leadsByStatus: leadsByStatusRaw.map((entry) => ({
          status: entry.status,
          count: entry._count.status,
        })),
        recentLeads: recentLeadsRaw,
        recentSales: recentSalesRaw.map((sale) => ({
          id: sale.id,
          customerName: sale.customerName,
          amount: sale.amount,
          createdAt: sale.createdAt,
          courses: sale.courses.map(({ course }) => course.title),
        })),
        topPages: topPagesRaw.map((entry) => ({
          path: entry.path,
          count: entry._count.path,
        })),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to load dashboard" },
      { status: 500 },
    );
  }
}
