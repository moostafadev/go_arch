"use client";

import { useState } from "react";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { useToast } from "@/components/toaster";
import { FAQ_RULES } from "@/constants/faqs";

import { createFaq, updateFaq } from "./api";
import type { Faq, FaqFormData } from "./types";
import { toFormData } from "./utils";

interface FaqFormProps {
  initialData?: Faq;
  onSuccess: () => void;
}

export const FaqForm = ({ initialData, onSuccess }: FaqFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FaqFormData) => {
    setIsSubmitting(true);

    try {
      if (initialData) {
        await updateFaq(initialData.id, data);
        toast.success("FAQ updated");
      } else {
        await createFaq(data);
        toast.success("FAQ added");
      }

      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save FAQ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form<FaqFormData>
      onSubmit={onSubmit}
      defaultValues={toFormData(initialData)}
      className="flex flex-col gap-3 pt-2 max-h-[75vh] overflow-y-auto pr-2 pb-4 sm:gap-4"
    >
      <Input<FaqFormData>
        name="question"
        label="Question"
        placeholder="e.g. Is access really for life?"
        rules={{
          required: "Question is required",
          maxLength: {
            value: FAQ_RULES.questionMax,
            message: `Question must not exceed ${FAQ_RULES.questionMax} characters`,
          },
        }}
      />

      <Textarea<FaqFormData>
        name="answer"
        label="Answer"
        placeholder="Write the answer shown when the question is opened."
        rows={5}
        rules={{
          required: "Answer is required",
          maxLength: {
            value: FAQ_RULES.answerMax,
            message: `Answer must not exceed ${FAQ_RULES.answerMax} characters`,
          },
        }}
      />

      <Input<FaqFormData>
        name="order"
        label="Display Order"
        placeholder="0"
        type="number"
      />

      <Button
        type="submit"
        color="MAIN"
        loading={isSubmitting}
        className="mt-2 w-full bg-accent text-white hover:bg-accent-hover"
      >
        {initialData ? "Update FAQ" : "Add FAQ"}
      </Button>
    </Form>
  );
};
