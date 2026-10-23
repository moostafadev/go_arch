"use client";

import { useState } from "react";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { ImageInput } from "@/components/image-input";
import { Input } from "@/components/input";
import { useToast } from "@/components/toaster";
import {
  STUDENT_WORK_IMAGE_RATIO,
  STUDENT_WORK_RULES,
} from "@/constants/student-work";

import { createStudentWork, updateStudentWork } from "./api";
import type { StudentWorkFormData, StudentWorkItem } from "./types";
import { toFormData } from "./utils";

interface StudentWorkFormProps {
  initialData?: StudentWorkItem;
  onSuccess: () => void;
}

export const StudentWorkForm = ({
  initialData,
  onSuccess,
}: StudentWorkFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: StudentWorkFormData) => {
    setIsSubmitting(true);

    try {
      if (initialData) {
        await updateStudentWork(initialData.id, data);
        toast.success("Student work updated");
      } else {
        await createStudentWork(data);
        toast.success("Student work added");
      }

      onSuccess();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save student work",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form<StudentWorkFormData>
      onSubmit={onSubmit}
      defaultValues={toFormData(initialData)}
      className="flex flex-col gap-3 pt-2 max-h-[75vh] overflow-y-auto pr-2 pb-4 sm:gap-4"
    >
      <Input<StudentWorkFormData>
        name="title"
        label="Project Title"
        placeholder="e.g. Parametric Pavilion"
        rules={{
          required: "Title is required",
          maxLength: {
            value: STUDENT_WORK_RULES.titleMax,
            message: `Title must not exceed ${STUDENT_WORK_RULES.titleMax} characters`,
          },
        }}
      />

      <ImageInput<StudentWorkFormData>
        name="image"
        label="Project Image"
        placeholder="Select an image"
        ratio={STUDENT_WORK_IMAGE_RATIO}
      />

      <Input<StudentWorkFormData>
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
        {initialData ? "Update Project" : "Add Project"}
      </Button>
    </Form>
  );
};
