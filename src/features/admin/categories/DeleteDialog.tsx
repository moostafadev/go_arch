"use client";

import { useState } from "react";

import { Button } from "@/components/button";

interface DeleteDialogProps {
  courseCount: number;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export const DeleteDialog = ({
  courseCount,
  onConfirm,
  onCancel,
}: DeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return (
    <div className="flex flex-col gap-4 pt-2 sm:gap-5">
      <p className="text-sm text-foreground-second">
        Are you sure you want to delete this category? This action cannot be
        undone.
      </p>

      {courseCount > 0 && (
        <div className="border border-danger/30 bg-danger/10 p-3 text-sm text-danger sm:p-4">
          <p className="font-semibold">
            {courseCount} {courseCount === 1 ? "course" : "courses"} will also
            be deleted.
          </p>
          <p className="mt-1 text-xs text-danger/80">
            Categories linked to existing sales cannot be deleted until those
            sales are removed first.
          </p>
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          color="NEUTRAL"
          onClick={onCancel}
          disabled={isDeleting}
          className="border-border text-foreground hover:bg-card"
        >
          Cancel
        </Button>

        <Button
          variant="solid"
          color="DANGER"
          onClick={handleDelete}
          loading={isDeleting}
          className="bg-danger text-white hover:bg-danger/90"
        >
          Yes, Delete
        </Button>
      </div>
    </div>
  );
};
