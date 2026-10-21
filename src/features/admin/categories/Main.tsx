"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { useToast } from "@/components/toaster";
import { Tag } from "@/components/tag";

import { CategoryForm } from "./Form";
import { DeleteDialog } from "./DeleteDialog";
import { CategoriesSkeleton } from "./Skeleton";
import { deleteCategory, getCategories } from "./api";
import { Category } from "./types";

export const CategoriesMain = () => {
  const { openDialog, closeDialog } = useDialog();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    let ignore = false;

    async function init() {
      try {
        const data = await getCategories();
        if (!ignore) {
          setCategories(data);
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          toast.error("Failed to load categories");
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      ignore = true;
    };
  }, [toast]);

  const handleDelete = (category: Category) => {
    openDialog({
      title: "Delete Category",
      size: "md",
      children: (
        <DeleteDialog
          courseCount={category._count.courses}
          onCancel={closeDialog}
          onConfirm={async () => {
            try {
              await deleteCategory(category.id);
              toast.success("Category and its courses deleted");
              closeDialog();
              loadData();
            } catch (err) {
              toast.error(
                err instanceof Error
                  ? err.message
                  : "Failed to delete category",
              );
            }
          }}
        />
      ),
    });
  };

  const handleOpenForm = (category?: Category) => {
    openDialog({
      title: category ? "Edit Category" : "Create Category",
      size: "md",
      children: (
        <CategoryForm
          initialData={category}
          onSuccess={() => {
            closeDialog();
            loadData();
          }}
        />
      ),
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Course Categories
        </h1>
        <Button
          onClick={() => handleOpenForm()}
          color="MAIN"
          size="sm"
          className="bg-accent text-white sm:px-6 sm:py-2"
        >
          <Plus className="size-3.5 sm:mr-2 sm:size-4" />
          <span className="hidden sm:inline">Add Category</span>
        </Button>
      </div>

      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <div className="border border-border bg-card overflow-x-auto w-full [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-none hover:[&::-webkit-scrollbar-thumb]:bg-foreground-second">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="p-3 text-xs font-bold text-foreground sm:p-4 sm:text-sm">
                  Name
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4 sm:text-sm">
                  Slug
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4 sm:text-sm">
                  Courses
                </th>
                <th className="p-3 text-right text-xs font-bold text-foreground sm:p-4 sm:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-8 text-center text-xs text-foreground-second sm:p-12 sm:text-sm"
                    >
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((category, index) => (
                    <m.tr
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-card-hover transition-colors"
                    >
                      <td className="p-3 text-xs font-medium text-foreground max-w-30 truncate sm:p-4 sm:max-w-none sm:text-sm">
                        {category.name}
                      </td>
                      <td className="p-3 text-xs text-foreground-second max-w-25 truncate sm:p-4 sm:max-w-none sm:text-sm">
                        {category.slug}
                      </td>
                      <td className="p-3 sm:p-4">
                        <Tag
                          variant="soft"
                          color="NEUTRAL"
                          size="xs"
                          className="sm:px-2.5 sm:py-1 sm:text-xs"
                        >
                          {category._count.courses}
                        </Tag>
                      </td>
                      <td className="p-3 flex items-center justify-end gap-1 sm:p-4 sm:gap-2">
                        <Button
                          onClick={() => handleOpenForm(category)}
                          size="icon"
                          variant="ghost"
                          className="size-7 text-foreground-second hover:text-accent sm:size-8"
                        >
                          <Edit className="size-3.5 sm:size-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(category)}
                          size="icon"
                          variant="ghost"
                          className="size-7 text-foreground-second hover:text-danger sm:size-8"
                        >
                          <Trash2 className="size-3.5 sm:size-4" />
                        </Button>
                      </td>
                    </m.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
