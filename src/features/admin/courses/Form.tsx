"use client";

import { useState, useEffect } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Textarea } from "@/components/textarea";
import { ImageInput } from "@/components/image-input";
import { useToast } from "@/components/toaster";
import { createCourse, updateCourse } from "./api";
import { Course, CourseFormData, CategoryOption } from "./types";

interface CourseFormProps {
  initialData?: Course;
  categories: CategoryOption[];
  onSuccess: () => void;
}

export const CourseForm = ({
  initialData,
  categories,
  onSuccess,
}: CourseFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const onSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
      if (initialData) {
        await updateCourse(initialData.id, data);
        toast.success("Course updated successfully");
      } else {
        await createCourse(data);
        toast.success("Course created successfully");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save course. Check if slug is unique.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form<CourseFormData>
      onSubmit={onSubmit}
      defaultValues={{
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        desc: initialData?.desc || "",
        price: initialData?.price || "",
        discountPrice: initialData?.discountPrice || "",
        hours: initialData?.hours || "",
        image: initialData?.image || "",
        categoryId: initialData?.categoryId || "",
      }}
      className="flex flex-col gap-3 pt-2 max-h-[75vh] overflow-y-auto pr-2 pb-4 sm:gap-4"
    >
      <CourseFormFields
        isSubmitting={isSubmitting}
        initialData={initialData}
        categoryOptions={categoryOptions}
      />
    </Form>
  );
};

const CourseFormFields = ({
  isSubmitting,
  initialData,
  categoryOptions,
}: {
  isSubmitting: boolean;
  initialData?: Course;
  categoryOptions: { value: string; label: string }[];
}) => {
  const titleValue = useWatch<CourseFormData>({ name: "title" });
  const methods = useFormContext<CourseFormData>();

  useEffect(() => {
    if (!initialData && titleValue) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      methods.setValue("slug", generatedSlug);
    }
  }, [titleValue, initialData, methods]);

  return (
    <>
      <Input<CourseFormData>
        name="title"
        label="Course Title"
        placeholder="e.g. Architectural Competitions"
      />
      <Input<CourseFormData>
        name="slug"
        label="Slug (URL)"
        placeholder="e.g. architectural-competitions"
      />
      <Textarea<CourseFormData>
        name="desc"
        label="Description"
        placeholder="Course description..."
        rows={3}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Input<CourseFormData>
          name="price"
          label="Price"
          placeholder="e.g. 2,500 EGP"
        />
        <Input<CourseFormData>
          name="discountPrice"
          label="Discount Price (Optional)"
          placeholder="e.g. 1,900 EGP"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Input<CourseFormData>
          name="hours"
          label="Hours (Optional)"
          placeholder="e.g. 15 Hours"
        />
        <Select<CourseFormData>
          name="categoryId"
          label="Category"
          placeholder="Select Category"
          options={categoryOptions}
        />
      </div>

      <ImageInput<CourseFormData> name="image" label="Course Image" />

      <Button
        type="submit"
        color="MAIN"
        loading={isSubmitting}
        className="mt-4 w-full bg-accent text-white hover:bg-accent-hover"
      >
        {initialData ? "Update Course" : "Create Course"}
      </Button>
    </>
  );
};
