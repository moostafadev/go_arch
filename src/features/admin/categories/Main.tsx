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
import { getCategories, deleteCategory } from "./api";
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
    } catch (error) {
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
      } catch (error) {
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

  const handleDelete = (id: string) => {
    openDialog({
      title: "Delete Category",
      size: "md",
      children: (
        <DeleteDialog
          onCancel={closeDialog}
          onConfirm={async () => {
            try {
              await deleteCategory(id);
              toast.success("Category deleted successfully");
              closeDialog();
              loadData();
            } catch (error) {
              toast.error("Failed to delete category");
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
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Course Categories
        </h1>
        <Button
          onClick={() => handleOpenForm()}
          color="MAIN"
          size="sm"
          className="bg-accent text-white sm:px-6 sm:py-2"
        >
          <Plus className="size-3.5 sm:size-4 sm:mr-2" />
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
                <th className="p-2 sm:p-4 text-xs sm:text-sm font-bold text-foreground">
                  Name
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm font-bold text-foreground">
                  Slug
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm font-bold text-foreground">
                  Courses
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm font-bold text-foreground text-right">
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
                      className="p-4 text-xs sm:text-sm text-center text-foreground-second"
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
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-foreground font-medium max-w-[120px] sm:max-w-none truncate">
                        {category.name}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-foreground-second max-w-[100px] sm:max-w-none truncate">
                        {category.slug}
                      </td>
                      <td className="p-2 sm:p-4">
                        <Tag
                          variant="soft"
                          color="NEUTRAL"
                          size="xs"
                          className="sm:px-2.5 sm:py-1 sm:text-xs"
                        >
                          {category._count.courses}
                        </Tag>
                      </td>
                      <td className="p-2 sm:p-4 flex items-center justify-end gap-1 sm:gap-2">
                        <Button
                          onClick={() => handleOpenForm(category)}
                          size="icon"
                          variant="ghost"
                          className="size-7 sm:size-8 text-foreground-second hover:text-accent"
                        >
                          <Edit className="size-3.5 sm:size-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(category.id)}
                          size="icon"
                          variant="ghost"
                          className="size-7 sm:size-8 text-foreground-second hover:text-danger"
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
