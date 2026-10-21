"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { useToast } from "@/components/toaster";

import { createSale, getCourseOptions, updateSale } from "./api";
import { CourseOption, Sale, SaleFormData } from "./types";

const parsePrice = (price: string): number => {
  const numeric = price.replace(/[^\d.]/g, "");
  return numeric ? Number(numeric) : 0;
};

const effectivePrice = (course: CourseOption): string =>
  course.discountPrice || course.price;

const formatTotal = (total: number) => `${total.toLocaleString()} EGP`;

export interface LeadPrefill {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
}

interface SaleFormProps {
  initialData?: Sale;
  prefillLead?: LeadPrefill;
  onSuccess: () => void;
}

export const SaleForm = ({
  initialData,
  prefillLead,
  onSuccess,
}: SaleFormProps) => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const data = await getCourseOptions();
        if (!ignore) setCourses(data);
      } catch {
        if (!ignore) toast.error("Failed to load courses");
      } finally {
        if (!ignore) setLoadingCourses(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [toast]);

  const onSubmit = async (data: SaleFormData) => {
    try {
      if (initialData) {
        await updateSale(initialData.id, data);
        toast.success("Sale updated successfully");
      } else {
        await createSale(data, prefillLead?.id);
        toast.success(
          prefillLead ? "Lead converted to sale" : "Sale created successfully",
        );
      }

      onSuccess();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to save sale. Please try again.",
      );
    }
  };

  return (
    <Form<SaleFormData>
      onSubmit={onSubmit}
      defaultValues={{
        customerName: initialData?.customerName || prefillLead?.name || "",
        courseIds: initialData?.courses.map((course) => course.id) || [],
        amount: initialData?.amount || "",
        phone: initialData?.phone || prefillLead?.phone || "",
        email: initialData?.email || prefillLead?.email || "",
      }}
      className="flex flex-col gap-3 pt-2 max-h-[75vh] overflow-y-auto pr-2 pb-4 sm:gap-4"
    >
      <SaleFormFields
        initialData={initialData}
        prefillLead={prefillLead}
        courses={courses}
        loadingCourses={loadingCourses}
      />
    </Form>
  );
};

interface SaleFormFieldsProps {
  initialData?: Sale;
  prefillLead?: LeadPrefill;
  courses: CourseOption[];
  loadingCourses: boolean;
}

const SaleFormFields = ({
  initialData,
  prefillLead,
  courses,
  loadingCourses,
}: SaleFormFieldsProps) => {
  const { control, setValue } = useFormContext<SaleFormData>();
  const { isSubmitting } = useFormState({ control });

  const watchedIds = useWatch({ control, name: "courseIds" });

  const [isAmountManual, setIsAmountManual] = useState(Boolean(initialData));

  useEffect(() => {
    if (!prefillLead || initialData) return;
    if (loadingCourses || courses.length === 0) return;

    const target = prefillLead.course.trim().toLowerCase();
    const matched = courses.find(
      (course) => course.title.trim().toLowerCase() === target,
    );

    if (matched) {
      setValue("courseIds", [matched.id], { shouldValidate: true });
    }
  }, [prefillLead, initialData, courses, loadingCourses, setValue]);

  const suggestedTotal = useMemo(() => {
    const ids = watchedIds ?? [];

    return ids.reduce((sum, id) => {
      const course = courses.find((item) => item.id === id);
      return course ? sum + parsePrice(effectivePrice(course)) : sum;
    }, 0);
  }, [watchedIds, courses]);

  useEffect(() => {
    if (isAmountManual) return;

    setValue("amount", suggestedTotal > 0 ? formatTotal(suggestedTotal) : "", {
      shouldValidate: true,
    });
  }, [suggestedTotal, isAmountManual, setValue]);

  return (
    <>
      <Input<SaleFormData>
        name="customerName"
        label="Customer Name"
        placeholder="John Doe"
        rules={{ required: "Customer name is required" }}
      />

      <Controller
        name="courseIds"
        control={control}
        rules={{
          validate: (value) => value.length > 0 || "Select at least one course",
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">
              Courses
            </label>

            {loadingCourses ? (
              <div className="flex items-center justify-center gap-2 border border-border bg-background p-3 text-sm text-foreground-second sm:p-4">
                <Loader2 className="size-4 animate-spin" />
                Loading courses...
              </div>
            ) : courses.length === 0 ? (
              <div className="border border-border bg-background p-3 text-center text-sm text-foreground-second sm:p-4">
                No courses available. Create a course first.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {courses.map((course) => {
                  const checked = field.value.includes(course.id);
                  const hasDiscount = Boolean(course.discountPrice);

                  return (
                    <label
                      key={course.id}
                      className={`flex cursor-pointer items-center gap-2 border p-3 transition-colors sm:p-4 ${
                        checked
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-background text-foreground hover:border-accent/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          field.onChange(
                            event.target.checked
                              ? [...field.value, course.id]
                              : field.value.filter((id) => id !== course.id),
                          );
                          field.onBlur();
                        }}
                        className="sr-only"
                      />

                      <span
                        className={`flex size-4 shrink-0 items-center justify-center border ${
                          checked ? "border-accent bg-accent" : "border-border"
                        }`}
                      >
                        {checked && <Check className="size-3 text-white" />}
                      </span>

                      <span className="min-w-0 flex-1 truncate text-sm">
                        {course.title}
                      </span>

                      <span className="flex shrink-0 flex-col items-end text-xs leading-tight">
                        {hasDiscount ? (
                          <>
                            <span className="font-semibold text-accent">
                              {course.discountPrice}
                            </span>
                            <span className="text-foreground-second line-through">
                              {course.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-foreground-second">
                            {course.price}
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            {fieldState.error && (
              <span className="text-xs font-medium text-danger">
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />

      <div className="flex flex-col gap-1">
        <Input<SaleFormData>
          name="amount"
          label="Amount Paid"
          placeholder="e.g. 2,500 EGP"
          rules={{ required: "Amount is required" }}
          onValueChange={() => setIsAmountManual(true)}
        />

        {suggestedTotal > 0 && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-foreground-second">
              Suggested:{" "}
              <strong className="text-foreground">
                {formatTotal(suggestedTotal)}
              </strong>
            </span>

            {isAmountManual && (
              <button
                type="button"
                onClick={() => setIsAmountManual(false)}
                className="cursor-pointer text-xs font-medium text-accent transition-colors hover:underline"
              >
                Use suggested
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Input<SaleFormData>
          name="phone"
          label="Phone (Optional)"
          placeholder="+20 123 456 7890"
          type="tel"
        />

        <Input<SaleFormData>
          name="email"
          label="Email (Optional)"
          placeholder="john@example.com"
          type="email"
          rules={{
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          }}
        />
      </div>

      <Button
        type="submit"
        color="MAIN"
        loading={isSubmitting}
        className="mt-2 w-full bg-accent text-white hover:bg-accent-hover"
      >
        {initialData
          ? "Update Sale"
          : prefillLead
            ? "Convert to Sale"
            : "Create Sale"}
      </Button>
    </>
  );
};
