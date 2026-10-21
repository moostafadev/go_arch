"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Edit, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { Tag } from "@/components/tag";
import { useToast } from "@/components/toaster";

import { DeleteDialog } from "./DeleteDialog";
import { SaleForm } from "./Form";
import { SalesSkeleton } from "./Skeleton";
import { deleteSale, getSales } from "./api";
import { Sale } from "./types";
import { formatPrice } from "@/lib/format";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const parseAmount = (amount: string): number => {
  const numeric = amount.replace(/[^\d.]/g, "");
  return numeric ? Number(numeric) : 0;
};

const formatCurrency = (total: number) => `${total.toLocaleString()} EGP`;

export const SalesMain = () => {
  const { openDialog, closeDialog } = useDialog();
  const { toast } = useToast();

  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const totalRevenue = useMemo(
    () => sales.reduce((sum, sale) => sum + parseAmount(sale.amount), 0),
    [sales],
  );

  const reload = async () => {
    try {
      const data = await getSales();
      setSales(data);
    } catch {
      toast.error("Failed to load sales");
    }
  };

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      try {
        const data = await getSales();
        if (!ignore) setSales(data);
      } catch {
        if (!ignore) toast.error("Failed to load sales");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    init();

    return () => {
      ignore = true;
    };
  }, [toast]);

  const handleDelete = (id: string) => {
    openDialog({
      title: "Delete Sale",
      size: "md",
      children: (
        <DeleteDialog
          onCancel={closeDialog}
          onConfirm={async () => {
            try {
              await deleteSale(id);
              setSales((prev) => prev.filter((sale) => sale.id !== id));
              toast.success("Sale deleted successfully");
              closeDialog();
            } catch {
              toast.error("Failed to delete sale");
            }
          }}
        />
      ),
    });
  };

  const handleOpenForm = (sale?: Sale) => {
    openDialog({
      title: sale ? "Edit Sale" : "Create Sale",
      size: "lg",
      children: (
        <SaleForm
          initialData={sale}
          onSuccess={() => {
            closeDialog();
            reload();
          }}
        />
      ),
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            Sales & Students
          </h1>
          <p className="text-xs text-foreground-second sm:text-sm">
            {sales.length} {sales.length === 1 ? "sale" : "sales"} recorded
          </p>
        </div>

        <Button
          onClick={() => handleOpenForm()}
          color="MAIN"
          size="sm"
          className="bg-accent text-white sm:px-6 sm:py-2"
        >
          <Plus className="size-3.5 sm:mr-2 sm:size-4" />
          <span className="hidden sm:inline">Add Sale</span>
        </Button>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4">
        <div className="border border-border bg-card p-3 sm:p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-second">
            Total Revenue
          </p>
          <p className="mt-1 text-2xl font-black text-accent sm:text-3xl">
            {loading ? "—" : formatCurrency(totalRevenue)}
          </p>
        </div>

        <div className="border border-border bg-card p-3 sm:p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-second">
            Total Sales
          </p>
          <p className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
            {loading ? "—" : sales.length}
          </p>
        </div>
      </div>

      {loading ? (
        <SalesSkeleton />
      ) : sales.length === 0 ? (
        <div className="border border-border bg-card p-8 text-center text-foreground-second sm:p-12">
          <p className="text-sm">No sales recorded yet.</p>
          <p className="mt-1 text-xs">
            Click &quot;Add Sale&quot; to record your first sale.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto border border-border bg-card [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border hover:[&::-webkit-scrollbar-thumb]:bg-foreground-second">
          <table className="w-full min-w-225 border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Customer
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Courses
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Amount
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Contact
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Date
                </th>
                <th className="p-3 text-right text-xs font-bold text-foreground sm:p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="popLayout">
                {sales.map((sale, index) => (
                  <m.tr
                    key={sale.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-b border-border/50 transition-colors hover:bg-card-hover"
                  >
                    <td className="whitespace-nowrap p-3 text-sm font-medium text-foreground sm:p-4">
                      {sale.customerName}
                    </td>

                    <td className="p-3 sm:p-4">
                      <div className="flex max-w-70 flex-wrap gap-1">
                        {sale.courses.map((course) => (
                          <Tag
                            key={course.id}
                            variant="soft"
                            color="NEUTRAL"
                            size="xs"
                          >
                            {course.title}
                          </Tag>
                        ))}
                      </div>
                    </td>

                    <td className="whitespace-nowrap p-3 text-sm font-bold text-accent sm:p-4">
                      {formatPrice(sale.amount)}
                    </td>

                    <td className="p-3 sm:p-4">
                      <div className="flex flex-col text-xs text-foreground-second">
                        {sale.phone && (
                          <span className="whitespace-nowrap">
                            {sale.phone}
                          </span>
                        )}
                        {sale.email && (
                          <span className="max-w-40 truncate">
                            {sale.email}
                          </span>
                        )}
                        {!sale.phone && !sale.email && <span>—</span>}
                      </div>
                    </td>

                    <td className="whitespace-nowrap p-3 text-xs text-foreground-second sm:p-4">
                      {formatDate(sale.createdAt)}
                    </td>

                    <td className="flex items-center justify-end gap-1 p-3 sm:p-4">
                      <Button
                        onClick={() => handleOpenForm(sale)}
                        size="icon"
                        variant="ghost"
                        aria-label="Edit"
                        className="size-8 text-foreground-second hover:text-accent"
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(sale.id)}
                        size="icon"
                        variant="ghost"
                        aria-label="Delete"
                        className="size-8 text-foreground-second hover:text-danger"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </td>
                  </m.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
