"use client";

import { useState } from "react";

import { Button } from "@/components/button";

interface DeleteDialogProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export const DeleteDialog = ({ onConfirm, onCancel }: DeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return (
    <div className="flex flex-col gap-4 pt-2 sm:gap-5">
      <p className="text-sm text-foreground-second">
        Are you sure you want to delete this sale? This action cannot be undone.
      </p>

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
