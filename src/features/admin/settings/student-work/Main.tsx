"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Edit, ImagePlus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { LoadingImage as Image } from "@/components/loading-image";
import { Tag } from "@/components/tag";
import { useToast } from "@/components/toaster";
import { STUDENT_WORK_RULES } from "@/constants/student-work";

import { DeleteDialog } from "./DeleteDialog";
import { StudentWorkForm } from "./Form";
import { StudentWorkSkeleton } from "./Skeleton";
import { deleteStudentWork, getStudentWork } from "./api";
import type { StudentWorkItem } from "./types";

export const StudentWorkMain = () => {
  const { openDialog, closeDialog } = useDialog();
  const { toast } = useToast();

  const [items, setItems] = useState<StudentWorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await getStudentWork();
      setItems(data);
    } catch {
      toast.error("Failed to load student work");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      try {
        const data = await getStudentWork();
        if (!ignore) {
          setItems(data);
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          toast.error("Failed to load student work");
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      ignore = true;
    };
  }, [toast]);

  const handleDelete = (item: StudentWorkItem) => {
    openDialog({
      title: "Delete Project",
      size: "md",
      children: (
        <DeleteDialog
          onCancel={closeDialog}
          onConfirm={async () => {
            try {
              await deleteStudentWork(item.id);
              setItems((prev) => prev.filter((row) => row.id !== item.id));
              toast.success("Project deleted");
              closeDialog();
            } catch (err) {
              toast.error(
                err instanceof Error ? err.message : "Failed to delete project",
              );
            }
          }}
        />
      ),
    });
  };

  const handleOpenForm = (item?: StudentWorkItem) => {
    openDialog({
      title: item ? "Edit Project" : "Add Project",
      size: "lg",
      children: (
        <StudentWorkForm
          initialData={item}
          onSuccess={() => {
            closeDialog();
            loadData();
          }}
        />
      ),
    });
  };

  const reachedLimit = items.length >= STUDENT_WORK_RULES.maxItems;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            Students&apos; Work
          </h1>
          <p className="text-xs text-foreground-second sm:text-sm">
            {items.length}/{STUDENT_WORK_RULES.maxItems} projects shown on the
            home page.
          </p>
        </div>

        <Button
          onClick={() => handleOpenForm()}
          color="MAIN"
          size="sm"
          disabled={reachedLimit}
          className="bg-accent text-white sm:px-6 sm:py-2"
        >
          <Plus className="size-3.5 sm:mr-2 sm:size-4" />
          <span className="hidden sm:inline">Add Project</span>
        </Button>
      </div>

      {loading ? (
        <StudentWorkSkeleton />
      ) : items.length === 0 ? (
        <div className="border border-border bg-card p-8 text-center sm:p-12">
          <ImagePlus className="mx-auto mb-3 size-8 text-foreground-second" />
          <p className="text-sm font-medium text-foreground">
            No student work yet.
          </p>
          <p className="mt-1 text-xs text-foreground-second">
            The website shows placeholders until you add projects.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <m.article
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="flex flex-col border border-border bg-card"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden border-b border-border bg-background">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground">
                      {item.title}
                    </p>
                    <Tag variant="soft" color="NEUTRAL" size="xs">
                      #{item.order}
                    </Tag>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      onClick={() => handleOpenForm(item)}
                      size="icon"
                      variant="ghost"
                      aria-label="Edit project"
                      className="size-8 text-foreground-second hover:text-accent"
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(item)}
                      size="icon"
                      variant="ghost"
                      aria-label="Delete project"
                      className="size-8 text-foreground-second hover:text-danger"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
