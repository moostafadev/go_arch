"use client";

import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { MessageCircle } from "lucide-react";
import { ContactForm } from "../contact";

interface EnrollCardProps {
  courseTitle: string;
  price: string;
  courseId: string;
}

export const EnrollCard = ({
  courseTitle,
  price,
  courseId,
}: EnrollCardProps) => {
  const { openDialog } = useDialog();

  const handleOpenForm = () => {
    openDialog({
      title: "Complete Your Enrollment",
      size: "md",
      children: (
        <div className="pt-2">
          <ContactForm courseId={courseId} courseTitle={courseTitle} />
        </div>
      ),
    });
  };

  return (
    <div className="sticky top-24 border border-border bg-card p-6">
      <h3 className="mb-2 text-lg font-bold text-foreground">Enrollment</h3>
      <div className="mb-6 flex items-baseline gap-2">
        <span className="text-4xl font-black text-foreground">{price}</span>
        <span className="text-sm text-foreground-second">/ one-time</span>
      </div>

      <Button
        onClick={handleOpenForm}
        variant="solid"
        color="MAIN"
        className="mb-3 w-full bg-accent text-white hover:bg-accent-hover"
      >
        <MessageCircle className="mr-2 size-4" />
        Buy via WhatsApp
      </Button>

      <p className="text-center text-xs text-foreground-second">
        Fill a quick form. Our team will contact you to complete the payment.
      </p>
    </div>
  );
};
