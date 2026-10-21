"use client";

import { useMemo, useState } from "react";
import { m, type Variants } from "framer-motion";
import { Check, Send } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Price } from "@/components/price";
import { Textarea } from "@/components/textarea";
import { useToast } from "@/components/toaster";

interface ContactCourse {
  id: string;
  title: string;
  price: string;
  discountPrice?: string | null;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

interface ContactFormProps {
  courseId?: string;
  courseTitle?: string;
  courses?: ContactCourse[];
  onSuccess?: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const ContactForm = ({
  courseId,
  courseTitle,
  courses,
  onSuccess,
}: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [methods, setMethods] = useState<UseFormReturn<ContactFormData> | null>(
    null,
  );

  const availableCourses = useMemo(() => courses ?? [], [courses]);

  const hasFixedCourse = Boolean(courseId);
  const hasCourseList = availableCourses.length > 0;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const resolvedCourse = hasFixedCourse
        ? (courseTitle ?? "General Inquiry")
        : (availableCourses.find((course) => course.id === data.course)
            ?.title ?? "General Inquiry");

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          course: resolvedCourse,
          message: data.message || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      toast.success("Request received! Our team will contact you shortly.");
      methods?.reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch {
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form<ContactFormData>
      onSubmit={onSubmit}
      onFormReady={setMethods}
      defaultValues={{
        name: "",
        email: "",
        phone: "",
        course: courseId || "",
        message: "",
      }}
    >
      <m.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col gap-4 sm:gap-5"
      >
        <m.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
        >
          <Input<ContactFormData>
            name="name"
            label="Full Name"
            placeholder="John Doe"
            showIconLabel={true}
            rules={{ required: "Name is required" }}
          />
          <Input<ContactFormData>
            name="phone"
            label="WhatsApp Number"
            placeholder="+20 123 456 7890"
            type="tel"
            showIconLabel={true}
            rules={{
              required: "Phone number is required",
              minLength: {
                value: 8,
                message: "Please enter a valid phone number",
              },
            }}
          />
        </m.div>

        <m.div variants={itemVariants}>
          <Input<ContactFormData>
            name="email"
            label="Email Address (Optional)"
            placeholder="john@example.com"
            type="email"
            showIconLabel={true}
            rules={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
          />
        </m.div>

        <m.div variants={itemVariants}>
          {hasFixedCourse ? (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">
                Selected Course
              </label>
              <div className="border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent">
                {courseTitle}
              </div>
            </div>
          ) : hasCourseList ? (
            <Controller
              name="course"
              rules={{
                validate: (value) => Boolean(value) || "Please select a course",
              }}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-foreground">
                    Which course are you interested in?
                  </label>

                  <div className="grid max-h-64 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
                    {availableCourses.map((course) => {
                      const checked = field.value === course.id;

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
                            type="radio"
                            name={field.name}
                            value={course.id}
                            checked={checked}
                            onChange={() => {
                              field.onChange(course.id);
                              field.onBlur();
                            }}
                            className="sr-only"
                          />

                          <span
                            className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                              checked
                                ? "border-accent bg-accent"
                                : "border-border"
                            }`}
                          >
                            {checked && <Check className="size-3 text-white" />}
                          </span>

                          <span className="min-w-0 flex-1 truncate text-sm">
                            {course.title}
                          </span>

                          <Price
                            price={course.price}
                            discountPrice={course.discountPrice}
                            size="sm"
                            className="shrink-0 flex-col items-end sm:flex-row sm:items-baseline"
                          />
                        </label>
                      );
                    })}
                  </div>

                  {fieldState.error && (
                    <span className="text-xs font-medium text-accent">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          ) : (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">
                Course
              </label>
              <div className="border border-border bg-background p-3 text-sm text-foreground-second sm:p-4">
                No courses listed yet. Send us a message and we&apos;ll match
                you with the right program personally.
              </div>
            </div>
          )}
        </m.div>

        <m.div variants={itemVariants}>
          <Textarea<ContactFormData>
            name="message"
            label="Additional Notes (Optional)"
            placeholder="Any specific questions?"
            rows={3}
          />
        </m.div>

        <m.div variants={itemVariants} className="mt-2 flex sm:justify-end">
          <Button
            type="submit"
            variant="solid"
            color="MAIN"
            loading={isSubmitting}
            className="w-full bg-accent text-white hover:bg-accent-hover sm:w-auto"
          >
            {!isSubmitting && <Send className="mr-2 size-4" />}
            Submit Request
          </Button>
        </m.div>
      </m.div>
    </Form>
  );
};
