"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Edit, Plus, Quote, Trash2 } from "lucide-react";

import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { LoadingImage as Image } from "@/components/loading-image";
import { ReorderButtons } from "@/components/reorder-buttons";
import { useToast } from "@/components/toaster";
import { PLACEHOLDER_IMAGE } from "@/constants/placeholders";

import { DeleteDialog } from "./DeleteDialog";
import { TestimonialForm } from "./Form";
import { TestimonialsSkeleton } from "./Skeleton";
import { deleteTestimonial, getTestimonials, reorderTestimonials } from "./api";
import type { Testimonial } from "./types";

export const TestimonialsMain = () => {
  const { openDialog, closeDialog } = useDialog();
  const { toast } = useToast();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      try {
        const data = await getTestimonials();
        if (!ignore) {
          setTestimonials(data);
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          toast.error("Failed to load testimonials");
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      ignore = true;
    };
  }, [toast]);

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    if (reordering) return;
    if (fromIndex === toIndex) return;
    if (toIndex < 0 || toIndex >= testimonials.length) return;

    const previous = testimonials;
    const next = [...testimonials];
    const [moved] = next.splice(fromIndex, 1);

    if (!moved) return;

    next.splice(toIndex, 0, moved);

    setTestimonials(next);
    setReordering(true);

    try {
      const saved = await reorderTestimonials(next.map((item) => item.id));
      setTestimonials(saved);
    } catch (err) {
      setTestimonials(previous);
      toast.error(
        err instanceof Error ? err.message : "Failed to reorder testimonials",
      );
    } finally {
      setReordering(false);
    }
  };

  const handleDelete = (testimonial: Testimonial) => {
    openDialog({
      title: "Delete Testimonial",
      size: "md",
      children: (
        <DeleteDialog
          onCancel={closeDialog}
          onConfirm={async () => {
            try {
              await deleteTestimonial(testimonial.id);
              setTestimonials((prev) =>
                prev.filter((item) => item.id !== testimonial.id),
              );
              toast.success("Testimonial deleted");
              closeDialog();
            } catch (err) {
              toast.error(
                err instanceof Error
                  ? err.message
                  : "Failed to delete testimonial",
              );
            }
          }}
        />
      ),
    });
  };

  const handleOpenForm = (testimonial?: Testimonial) => {
    openDialog({
      title: testimonial ? "Edit Testimonial" : "Add Testimonial",
      size: "lg",
      children: (
        <TestimonialForm
          initialData={testimonial}
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
      <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            What Students Say
          </h1>
          <p className="text-xs text-foreground-second sm:text-sm">
            {testimonials.length}{" "}
            {testimonials.length === 1 ? "testimonial" : "testimonials"} shown
            on the home page.
          </p>
        </div>

        <Button
          onClick={() => handleOpenForm()}
          color="MAIN"
          size="sm"
          className="bg-accent text-white sm:px-6 sm:py-2"
        >
          <Plus className="size-3.5 sm:mr-2 sm:size-4" />
          <span className="hidden sm:inline">Add Testimonial</span>
        </Button>
      </div>

      {loading ? (
        <TestimonialsSkeleton />
      ) : testimonials.length === 0 ? (
        <div className="border border-border bg-card p-8 text-center sm:p-12">
          <Quote className="mx-auto mb-3 size-8 text-foreground-second" />
          <p className="text-sm font-medium text-foreground">
            No testimonials yet.
          </p>
          <p className="mt-1 text-xs text-foreground-second">
            The website is showing sample testimonials until you add your own.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => (
              <m.article
                key={testimonial.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="flex flex-col gap-3 border border-border bg-card p-3 sm:p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden border border-border bg-background">
                      <Image
                        src={testimonial.image || PLACEHOLDER_IMAGE}
                        alt={testimonial.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="truncate text-xs text-foreground-second">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <ReorderButtons
                    index={index}
                    total={testimonials.length}
                    disabled={reordering}
                    onMove={(toIndex) => handleReorder(index, toIndex)}
                  />
                </div>

                <p className="line-clamp-4 text-xs leading-relaxed text-foreground-second">
                  {testimonial.text}
                </p>

                <div className="mt-auto flex items-center justify-end gap-1 border-t border-border/50 pt-3">
                  <Button
                    onClick={() => handleOpenForm(testimonial)}
                    size="icon"
                    variant="ghost"
                    aria-label="Edit testimonial"
                    className="size-8 text-foreground-second hover:text-accent"
                  >
                    <Edit className="size-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(testimonial)}
                    size="icon"
                    variant="ghost"
                    aria-label="Delete testimonial"
                    className="size-8 text-foreground-second hover:text-danger"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
