"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Edit, MessageCircleQuestion, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { ReorderButtons } from "@/components/reorder-buttons";
import { useToast } from "@/components/toaster";
import { FAQ_RULES } from "@/constants/faqs";

import { DeleteDialog } from "./DeleteDialog";
import { FaqForm } from "./Form";
import { FaqsSkeleton } from "./Skeleton";
import { deleteFaq, getFaqs, reorderFaqs } from "./api";
import type { Faq } from "./types";

export const FaqsMain = () => {
  const { openDialog, closeDialog } = useDialog();
  const { toast } = useToast();

  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const data = await getFaqs();
      setFaqs(data);
    } catch {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      try {
        const data = await getFaqs();
        if (!ignore) {
          setFaqs(data);
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          toast.error("Failed to load FAQs");
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
    if (toIndex < 0 || toIndex >= faqs.length) return;

    const previous = faqs;
    const next = [...faqs];
    const [moved] = next.splice(fromIndex, 1);

    if (!moved) return;

    next.splice(toIndex, 0, moved);

    setFaqs(next);
    setReordering(true);

    try {
      const saved = await reorderFaqs(next.map((item) => item.id));
      setFaqs(saved);
    } catch (err) {
      setFaqs(previous);
      toast.error(
        err instanceof Error ? err.message : "Failed to reorder FAQs",
      );
    } finally {
      setReordering(false);
    }
  };

  const handleDelete = (faq: Faq) => {
    openDialog({
      title: "Delete FAQ",
      size: "md",
      children: (
        <DeleteDialog
          onCancel={closeDialog}
          onConfirm={async () => {
            try {
              await deleteFaq(faq.id);
              setFaqs((prev) => prev.filter((row) => row.id !== faq.id));
              toast.success("FAQ deleted");
              closeDialog();
            } catch (err) {
              toast.error(
                err instanceof Error ? err.message : "Failed to delete FAQ",
              );
            }
          }}
        />
      ),
    });
  };

  const handleOpenForm = (faq?: Faq) => {
    openDialog({
      title: faq ? "Edit FAQ" : "Add FAQ",
      size: "lg",
      children: (
        <FaqForm
          initialData={faq}
          onSuccess={() => {
            closeDialog();
            loadData();
          }}
        />
      ),
    });
  };

  const reachedLimit = faqs.length >= FAQ_RULES.maxItems;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-foreground-second sm:text-sm">
            {faqs.length}/{FAQ_RULES.maxItems} questions shown on the home page.
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
          <span className="hidden sm:inline">Add FAQ</span>
        </Button>
      </div>

      {loading ? (
        <FaqsSkeleton />
      ) : faqs.length === 0 ? (
        <div className="border border-border bg-card p-8 text-center sm:p-12">
          <MessageCircleQuestion className="mx-auto mb-3 size-8 text-foreground-second" />
          <p className="text-sm font-medium text-foreground">No FAQs yet.</p>
          <p className="mt-1 text-xs text-foreground-second">
            The website is showing sample questions until you add your own.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {faqs.map((faq, index) => (
              <m.article
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="flex flex-col gap-3 border border-border bg-card p-3 sm:p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 flex-1 text-sm font-bold text-foreground">
                    {faq.question}
                  </p>

                  <ReorderButtons
                    index={index}
                    total={faqs.length}
                    disabled={reordering}
                    onMove={(toIndex) => handleReorder(index, toIndex)}
                  />
                </div>

                <p className="line-clamp-3 text-xs leading-relaxed text-foreground-second">
                  {faq.answer}
                </p>

                <div className="flex items-center justify-end gap-1 border-t border-border/50 pt-3">
                  <Button
                    onClick={() => handleOpenForm(faq)}
                    size="icon"
                    variant="ghost"
                    aria-label="Edit FAQ"
                    className="size-8 text-foreground-second hover:text-accent"
                  >
                    <Edit className="size-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(faq)}
                    size="icon"
                    variant="ghost"
                    aria-label="Delete FAQ"
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
