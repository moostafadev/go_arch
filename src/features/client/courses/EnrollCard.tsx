"use client";

import { MessageCircle } from "lucide-react";

import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { Price } from "@/components/price";

import { ContactForm } from "../contact";

interface EnrollCardProps {
  courseTitle: string;
  price: string;
  discountPrice?: string | null;
  courseId: string;
  whatsappUrl: string;
}

export const EnrollCard = ({
  courseTitle,
  price,
  discountPrice,
  courseId,
  whatsappUrl,
}: EnrollCardProps) => {
  const { openDialog, closeDialog } = useDialog();

  const handleOpenForm = () => {
    openDialog({
      title: "Complete Your Enrollment",
      size: "md",
      children: (
        <div className="pt-2">
          <ContactForm
            courseId={courseId}
            courseTitle={courseTitle}
            onSuccess={closeDialog}
          />
        </div>
      ),
    });
  };

  return (
    <div className="sticky top-24 border border-border bg-card p-3 sm:p-4 md:p-6">
      <h3 className="mb-2 text-lg font-bold text-foreground">Enrollment</h3>

      <div className="mb-4 flex flex-wrap items-baseline gap-2 sm:mb-6">
        <Price price={price} discountPrice={discountPrice} size="xl" />
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

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 flex w-full items-center justify-center gap-2 border border-border px-6 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card-hover"
      >
        Chat with us directly
      </a>

      <p className="text-center text-xs text-foreground-second">
        Fill a quick form. Our team will contact you to complete the payment.
      </p>
    </div>
  );
};
