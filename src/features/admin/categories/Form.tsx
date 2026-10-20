"use client";

import { useState, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { useToast } from "@/components/toaster";
import { createCategory, updateCategory } from "./api";
import { Category, CategoryFormData } from "./types";

interface CategoryFormProps {
  initialData?: Category;
  onSuccess: () => void;
}

export const CategoryForm = ({ initialData, onSuccess }: CategoryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      if (initialData) {
        await updateCategory(initialData.id, data);
        toast.success("Category updated");
      } else {
        await createCategory(data);
        toast.success("Category created");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save category. Check if slug is unique.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form<CategoryFormData>
      onSubmit={onSubmit}
      defaultValues={{
        name: initialData?.name || "",
        slug: initialData?.slug || "",
      }}
      className="flex flex-col gap-5 pt-2"
    >
      <CategoryFormFields
        isSubmitting={isSubmitting}
        initialData={initialData}
      />
    </Form>
  );
};

const CategoryFormFields = ({
  isSubmitting,
  initialData,
}: {
  isSubmitting: boolean;
  initialData?: Category;
}) => {
  const nameValue = useWatch<CategoryFormData>({ name: "name" });
  const methods = useFormContext<CategoryFormData>();

  useEffect(() => {
    if (!initialData && nameValue) {
      const generatedSlug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      methods.setValue("slug", generatedSlug);
    }
  }, [nameValue, initialData, methods]);

  return (
    <>
      <Input<CategoryFormData>
        name="name"
        label="Category Name"
        placeholder="e.g. Workshops"
      />
      <Input<CategoryFormData>
        name="slug"
        label="Slug (URL)"
        placeholder="e.g. workshops"
      />
      <Button
        type="submit"
        color="MAIN"
        loading={isSubmitting}
        className="mt-2 w-full bg-accent text-white hover:bg-accent-hover"
      >
        {initialData ? "Update Category" : "Create Category"}
      </Button>
    </>
  );
};
