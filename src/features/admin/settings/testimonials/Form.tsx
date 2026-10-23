"use client";

import { useState } from "react";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { ImageInput } from "@/components/image-input";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { useToast } from "@/components/toaster";
import {
  TESTIMONIAL_IMAGE_RATIO,
  TESTIMONIAL_RULES,
} from "@/constants/testimonials";

import { createTestimonial, updateTestimonial } from "./api";
import type { Testimonial, TestimonialFormData } from "./types";
import { toFormData } from "./utils";

interface TestimonialFormProps {
  initialData?: Testimonial;
  onSuccess: () => void;
}

export const TestimonialForm = ({
  initialData,
  onSuccess,
}: TestimonialFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);

    try {
      if (initialData) {
        await updateTestimonial(initialData.id, data);
        toast.success("Testimonial updated");
      } else {
        await createTestimonial(data);
        toast.success("Testimonial added");
      }

      onSuccess();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save testimonial",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form<TestimonialFormData>
      onSubmit={onSubmit}
      defaultValues={toFormData(initialData)}
      className="flex flex-col gap-3 pt-2 max-h-[75vh] overflow-y-auto pr-2 pb-4 sm:gap-4"
    >
      <Input<TestimonialFormData>
        name="name"
        label="Student Name"
        placeholder="e.g. Ahmed Hassan"
        rules={{
          required: "Name is required",
          maxLength: {
            value: TESTIMONIAL_RULES.nameMax,
            message: `Name must not exceed ${TESTIMONIAL_RULES.nameMax} characters`,
          },
        }}
      />

      <Input<TestimonialFormData>
        name="role"
        label="Role / Title"
        placeholder="e.g. Architecture Student"
        rules={{
          required: "Role is required",
          maxLength: {
            value: TESTIMONIAL_RULES.roleMax,
            message: `Role must not exceed ${TESTIMONIAL_RULES.roleMax} characters`,
          },
        }}
      />

      <Textarea<TestimonialFormData>
        name="text"
        label="Testimonial"
        placeholder="What did the student say?"
        rows={4}
        rules={{
          required: "Testimonial text is required",
          maxLength: {
            value: TESTIMONIAL_RULES.textMax,
            message: `Testimonial must not exceed ${TESTIMONIAL_RULES.textMax} characters`,
          },
        }}
      />

      <ImageInput<TestimonialFormData>
        name="image"
        label="Student Photo (Optional)"
        placeholder="Select a photo"
        ratio={TESTIMONIAL_IMAGE_RATIO}
      />

      <Button
        type="submit"
        color="MAIN"
        loading={isSubmitting}
        className="mt-2 w-full bg-accent text-white hover:bg-accent-hover"
      >
        {initialData ? "Update Testimonial" : "Add Testimonial"}
      </Button>
    </Form>
  );
};
