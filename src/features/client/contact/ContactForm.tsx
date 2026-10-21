"use client";

import { useState } from "react";
import { m, type Variants } from "framer-motion";
import { Send } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Textarea } from "@/components/textarea";
import { useToast } from "@/components/toaster";
import { allCourses, courseOptions } from "@/constants/courses";

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
  onSuccess,
}: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [methods, setMethods] = useState<UseFormReturn<ContactFormData> | null>(
    null,
  );

  const fixedCourseTitle =
    courseTitle || allCourses.find((course) => course.id === courseId)?.title;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const resolvedCourse = courseId
        ? (fixedCourseTitle ?? data.course)
        : (allCourses.find((course) => course.id === data.course)?.title ??
          data.course);

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
          {courseId ? (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">
                Selected Course
              </label>
              <div className="border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent">
                {fixedCourseTitle}
              </div>
            </div>
          ) : (
            <Select<ContactFormData>
              name="course"
              label="Which course are you interested in?"
              placeholder="Select a course..."
              options={courseOptions}
            />
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
