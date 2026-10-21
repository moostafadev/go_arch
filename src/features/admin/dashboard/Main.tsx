"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Eye,
  RefreshCw,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/button";
import { Tag } from "@/components/tag";
import { useToast } from "@/components/toaster";

import { DashboardSkeleton } from "./Skeleton";
import { getDashboard } from "./api";
import { getPageMeta } from "./pageLabels";
import { DashboardData } from "./types";

const formatCurrency = (value: number) => `${value.toLocaleString()} EGP`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusBarColor: Record<string, string> = {
  New: "bg-info",
  Contacted: "bg-warning",
  Cancelled: "bg-danger",
};

interface KpiCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  href: string;
}

const KpiCard = ({ label, value, hint, icon: Icon, href }: KpiCardProps) => (
  <Link
    href={href}
    className="group flex flex-col border border-border bg-card p-3 transition-colors hover:border-accent/50 hover:bg-card-hover sm:p-4"
  >
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-second">
        {label}
      </span>
      <Icon className="size-4 text-foreground-second transition-colors group-hover:text-accent" />
    </div>

    <p className="mt-2 text-2xl font-black text-foreground">{value}</p>
    <p className="mt-1 text-[11px] text-foreground-second">{hint}</p>
  </Link>
);

export const DashboardMain = () => {
  const { toast } = useToast();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      try {
        const result = await getDashboard();
        if (!ignore) setData(result);
      } catch {
        if (!ignore) toast.error("Failed to load dashboard");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    init();

    return () => {
      ignore = true;
    };
  }, [toast]);

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      const result = await getDashboard();
      setData(result);
      toast.success("Dashboard refreshed");
    } catch {
      toast.error("Failed to refresh dashboard");
    } finally {
      setRefreshing(false);
    }
  };

  const maxAmount = Math.max(
    ...(data?.salesLast7Days.map((day) => day.amount) ?? []),
    1,
  );

  const totalLeads = data?.stats.totalLeads ?? 0;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4 sm:gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            Dashboard Overview
          </h1>
          <p className="text-xs text-foreground-second sm:text-sm">
            Welcome back — here is what is happening across your academy.
          </p>
        </div>

        <Button
          onClick={handleRefresh}
          loading={refreshing}
          variant="outline"
          color="NEUTRAL"
          size="sm"
          className="border-border"
        >
          {!refreshing && <RefreshCw className="mr-2 size-3.5" />}
          Refresh
        </Button>
      </div>

      {loading ? (
        <DashboardSkeleton />
      ) : !data ? (
        <div className="border border-border bg-card p-3 text-center text-foreground-second sm:p-4">
          <p className="text-sm">Failed to load dashboard data.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
            <KpiCard
              label="Revenue"
              value={formatCurrency(data.stats.lifetimeRevenue)}
              hint={`${formatCurrency(data.stats.todayRevenue)} today`}
              icon={Wallet}
              href="/admin/sales"
            />
            <KpiCard
              label="Sales"
              value={data.stats.totalSales.toLocaleString()}
              hint={`${data.stats.todaySales} today · ${data.stats.weekSales} this week`}
              icon={TrendingUp}
              href="/admin/sales"
            />
            <KpiCard
              label="Leads"
              value={data.stats.totalLeads.toLocaleString()}
              hint={`${data.stats.newLeads} new · ${data.stats.todayLeads} today`}
              icon={Users}
              href="/admin/leads"
            />
            <KpiCard
              label="Page Views"
              value={data.stats.totalViews.toLocaleString()}
              hint={`${data.stats.uniqueViews} unique · ${data.stats.todayViews} today`}
              icon={Eye}
              href="/admin/views"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
            <div className="border border-border bg-card p-3 sm:p-4 lg:col-span-2">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <div>
                  <h2 className="text-sm font-bold text-foreground">
                    Sales Trend
                  </h2>
                  <p className="text-[11px] text-foreground-second">
                    Revenue over the last 7 days
                  </p>
                </div>
                <Link
                  href="/admin/sales"
                  className="flex items-center gap-1 text-xs text-foreground-second transition-colors hover:text-accent"
                >
                  View all
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              {data.salesLast7Days.every((day) => day.count === 0) ? (
                <div className="flex h-40 items-center justify-center text-xs text-foreground-second">
                  No sales in the last 7 days.
                </div>
              ) : (
                <div className="flex h-40 items-end gap-2">
                  {data.salesLast7Days.map((day, index) => {
                    const height = (day.amount / maxAmount) * 100;
                    const weekday = new Date(day.date).toLocaleDateString(
                      "en-GB",
                      { weekday: "short" },
                    );

                    return (
                      <m.div
                        key={day.date}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <span className="text-[10px] font-semibold text-foreground-second">
                          {day.count > 0 ? day.count : ""}
                        </span>
                        <div
                          className="w-full bg-accent transition-colors hover:bg-accent-hover"
                          style={{
                            height: `${Math.max(height, 3)}%`,
                          }}
                          title={`${formatCurrency(day.amount)} · ${day.count} ${day.count === 1 ? "sale" : "sales"}`}
                        />
                        <span className="text-[10px] text-foreground-second">
                          {weekday}
                        </span>
                      </m.div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border border-border bg-card p-3 sm:p-4">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <div>
                  <h2 className="text-sm font-bold text-foreground">
                    Leads by Status
                  </h2>
                  <p className="text-[11px] text-foreground-second">
                    Pipeline breakdown
                  </p>
                </div>
              </div>

              {data.leadsByStatus.length === 0 ? (
                <p className="py-4 text-center text-xs text-foreground-second sm:py-6">
                  No leads captured yet.
                </p>
              ) : (
                <div className="flex flex-col gap-3 sm:gap-4">
                  {data.leadsByStatus.map((item) => {
                    const percentage =
                      totalLeads > 0 ? (item.count / totalLeads) * 100 : 0;
                    const barColor =
                      statusBarColor[item.status] ?? "bg-foreground-second";

                    return (
                      <div key={item.status}>
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="text-foreground">{item.status}</span>
                          <span className="font-semibold text-foreground-second">
                            {item.count}
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden bg-border">
                          <div
                            className={`h-full ${barColor} transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
            <div className="border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border p-3 sm:p-4">
                <h2 className="text-sm font-bold text-foreground">
                  Recent Leads
                </h2>
                <Link
                  href="/admin/leads"
                  className="flex items-center gap-1 text-xs text-foreground-second transition-colors hover:text-accent"
                >
                  View all
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              {data.recentLeads.length === 0 ? (
                <p className="py-4 text-center text-xs text-foreground-second sm:py-6">
                  No leads captured yet.
                </p>
              ) : (
                <ul>
                  {data.recentLeads.map((lead) => (
                    <li
                      key={lead.id}
                      className="flex items-center justify-between gap-3 border-b border-border/50 p-3 last:border-0 sm:p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {lead.name}
                        </p>
                        <p className="truncate text-[11px] text-foreground-second">
                          {lead.course}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Tag
                          variant="soft"
                          size="xs"
                          color={
                            lead.status === "New"
                              ? "INFO"
                              : lead.status === "Contacted"
                                ? "WARNING"
                                : "DANGER"
                          }
                        >
                          {lead.status}
                        </Tag>
                        <span className="text-[10px] text-foreground-second">
                          {formatDate(lead.createdAt)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border p-3 sm:p-4">
                <h2 className="text-sm font-bold text-foreground">
                  Recent Sales
                </h2>
                <Link
                  href="/admin/sales"
                  className="flex items-center gap-1 text-xs text-foreground-second transition-colors hover:text-accent"
                >
                  View all
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              {data.recentSales.length === 0 ? (
                <p className="py-4 text-center text-xs text-foreground-second sm:py-6">
                  No sales recorded yet.
                </p>
              ) : (
                <ul>
                  {data.recentSales.map((sale) => (
                    <li
                      key={sale.id}
                      className="flex items-center justify-between gap-3 border-b border-border/50 p-3 last:border-0 sm:p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {sale.customerName}
                        </p>
                        <p className="truncate text-[11px] text-foreground-second">
                          {sale.courses.join(", ")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm font-bold text-accent">
                          {sale.amount}
                        </span>
                        <span className="text-[10px] text-foreground-second">
                          {formatDate(sale.createdAt)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-3 sm:p-4">
              <div>
                <h2 className="text-sm font-bold text-foreground">Top Pages</h2>
                <p className="text-[11px] text-foreground-second">
                  Most visited pages across the site
                </p>
              </div>
              <Link
                href="/admin/views"
                className="flex items-center gap-1 text-xs text-foreground-second transition-colors hover:text-accent"
              >
                View all
                <ArrowRight className="size-3" />
              </Link>
            </div>

            {data.topPages.length === 0 ? (
              <p className="py-4 text-center text-xs text-foreground-second sm:py-6">
                No page views recorded yet.
              </p>
            ) : (
              <ul>
                {data.topPages.map((page) => {
                  const meta = getPageMeta(page.path);
                  return (
                    <li
                      key={page.path}
                      className="border-b border-border/50 last:border-0"
                    >
                      <a
                        href={meta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 p-3 transition-colors hover:bg-card-hover sm:p-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {meta.label}
                          </p>
                          <p className="truncate text-[10px] text-foreground-second">
                            {page.path}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs font-semibold text-foreground-second">
                          {page.count.toLocaleString()}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <Link
              href="/admin/leads"
              className="flex items-center justify-between border border-border bg-card p-3 text-xs text-foreground transition-colors hover:border-accent/50 hover:bg-card-hover sm:p-4"
            >
              <span className="flex items-center gap-2">
                <Users className="size-3.5 text-foreground-second" />
                Manage Leads
              </span>
              <ArrowRight className="size-3 text-foreground-second" />
            </Link>
            <Link
              href="/admin/sales"
              className="flex items-center justify-between border border-border bg-card p-3 text-xs text-foreground transition-colors hover:border-accent/50 hover:bg-card-hover sm:p-4"
            >
              <span className="flex items-center gap-2">
                <Wallet className="size-3.5 text-foreground-second" />
                Manage Sales
              </span>
              <ArrowRight className="size-3 text-foreground-second" />
            </Link>
            <Link
              href="/admin/courses"
              className="flex items-center justify-between border border-border bg-card p-3 text-xs text-foreground transition-colors hover:border-accent/50 hover:bg-card-hover sm:p-4"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="size-3.5 text-foreground-second" />
                Manage Courses
              </span>
              <ArrowRight className="size-3 text-foreground-second" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
