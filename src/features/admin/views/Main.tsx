"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import {
  Eye,
  Globe,
  RefreshCw,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/button";
import { useToast } from "@/components/toaster";

import { ViewsSkeleton } from "./Skeleton";
import { getViews } from "./api";
import { ViewsData } from "./types";

interface StatCard {
  label: string;
  value: number;
  icon: LucideIcon;
}

interface PageMeta {
  label: string;
  href: string;
}

const PAGE_MAP: Record<string, PageMeta> = {
  "/": { label: "Home", href: "/" },
  "/courses": { label: "Courses", href: "/courses" },
  "/about": { label: "About Us", href: "/about" },
  "/contact": { label: "Contact", href: "/contact" },
  "/privacy": { label: "Privacy Policy", href: "/privacy" },
  "/terms": { label: "Terms & Conditions", href: "/terms" },
};

const getPageMeta = (path: string): PageMeta => {
  if (PAGE_MAP[path]) return PAGE_MAP[path];

  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "courses" && segments[1]) {
    const title = segments[1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { label: `Course · ${title}`, href: path };
  }

  const fallback = segments
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" / ");

  return { label: fallback || path, href: path };
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export const ViewsMain = () => {
  const { toast } = useToast();
  const [data, setData] = useState<ViewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      try {
        const result = await getViews();
        if (!ignore) setData(result);
      } catch {
        if (!ignore) toast.error("Failed to load views");
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
      const result = await getViews();
      setData(result);
      toast.success("Views refreshed");
    } catch {
      toast.error("Failed to refresh views");
    } finally {
      setRefreshing(false);
    }
  };

  const statCards: StatCard[] = [
    { label: "Total Views", value: data?.stats.total ?? 0, icon: Eye },
    { label: "Unique Visitors", value: data?.stats.unique ?? 0, icon: Users },
    { label: "Today", value: data?.stats.today ?? 0, icon: TrendingUp },
    { label: "This Week", value: data?.stats.week ?? 0, icon: Globe },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            Page Views
          </h1>
          <p className="text-xs text-foreground-second sm:text-sm">
            Anonymous — deduplicated per visitor per page (30 min window)
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
        <ViewsSkeleton />
      ) : !data ? (
        <div className="border border-border bg-card p-8 text-center text-foreground-second sm:p-12">
          <p className="text-sm">No data available.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-border bg-card p-3 sm:p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-second">
                      {stat.label}
                    </span>
                    <Icon className="size-4 text-foreground-second" />
                  </div>
                  <p className="mt-2 text-2xl font-black text-foreground">
                    {stat.value.toLocaleString()}
                  </p>
                </m.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
            <div className="border border-border bg-card">
              <div className="border-b border-border p-3 sm:p-4">
                <h2 className="text-sm font-bold text-foreground">Top Pages</h2>
              </div>

              {data.topPages.length === 0 ? (
                <p className="py-4 text-center text-sm text-foreground-second sm:py-6">
                  No views recorded yet.
                </p>
              ) : (
                <table className="w-full text-left text-xs">
                  <tbody>
                    {data.topPages.map((page) => {
                      const meta = getPageMeta(page.path);
                      return (
                        <tr
                          key={page.path}
                          className="border-b border-border/50 transition-colors last:border-0 hover:bg-card-hover"
                        >
                          <td className="p-3 sm:p-4">
                            <a
                              href={meta.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col gap-0.5 transition-colors hover:text-accent"
                            >
                              <span className="truncate font-medium text-foreground">
                                {meta.label}
                              </span>
                              <span className="truncate text-[10px] text-foreground-second">
                                {page.path}
                              </span>
                            </a>
                          </td>
                          <td className="whitespace-nowrap p-3 text-right font-semibold text-foreground-second sm:p-4">
                            {page.count.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <div className="border border-border bg-card">
              <div className="border-b border-border p-3 sm:p-4">
                <h2 className="text-sm font-bold text-foreground">
                  Recent Views
                </h2>
              </div>

              {data.recent.length === 0 ? (
                <p className="py-4 text-center text-sm text-foreground-second sm:py-6">
                  No views recorded yet.
                </p>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <tbody>
                      {data.recent.map((view) => {
                        const meta = getPageMeta(view.path);
                        return (
                          <tr
                            key={view.id}
                            className="border-b border-border/50 transition-colors last:border-0 hover:bg-card-hover"
                          >
                            <td className="p-3 sm:p-4">
                              <a
                                href={meta.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col gap-0.5 transition-colors hover:text-accent"
                              >
                                <span className="truncate font-medium text-foreground">
                                  {meta.label}
                                </span>
                                <span className="truncate text-[10px] text-foreground-second">
                                  {view.path}
                                </span>
                              </a>
                            </td>
                            <td className="whitespace-nowrap p-3 text-foreground-second sm:p-4">
                              {formatDate(view.createdAt)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
