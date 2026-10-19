"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Button } from "@/components/button";
import { useToast } from "@/components/toaster";
import { courseOptions, allCourses } from "@/constants/courses";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

// إضافة Props جديدة لاستقبال بيانات الكورس
interface ContactFormProps {
  courseId?: string;
  courseTitle?: string;
}

export const ContactForm = ({ courseId, courseTitle }: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // إذا كان هناك courseId، نبحث عن اسمه لعرضه
  const selectedCourse =
    courseTitle || allCourses.find((c) => c.id === courseId)?.title;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    console.log("Lead Data for Dashboard:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success(
      "Request received! Our team will contact you on WhatsApp shortly.",
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-transparent" // إزالة الحدود والخلفية لأنها موجودة بالفعل في الـ Dialog
    >
      <Form<ContactFormData>
        onSubmit={onSubmit}
        className="flex flex-col gap-5"
        // تعبئة الكورس تلقائياً إذا كان موجوداً
        defaultValues={{
          name: "",
          email: "",
          phone: "",
          course: courseId || "",
          message: "",
        }}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input<ContactFormData>
            name="name"
            label="Full Name"
            placeholder="John Doe"
            showIconLabel={true}
          />
          <Input<ContactFormData>
            name="phone"
            label="WhatsApp Number"
            placeholder="+20 123 456 7890"
            type="tel"
            showIconLabel={true}
          />
        </div>

        <Input<ContactFormData>
          name="email"
          label="Email Address (Optional)"
          placeholder="john@example.com"
          type="email"
          showIconLabel={true}
        />

        {/* إذا كان الكورس محدداً مسبقاً، نعرضه كنص، وإلا نعرض القائمة المنسدلة */}
        {courseId ? (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">
              Selected Course
            </label>
            <div className="border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent">
              {selectedCourse}
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

        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-sm font-medium text-foreground"
          >
            Additional Notes (Optional)
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Any specific questions?"
            className="w-full resize-none border border-border bg-background p-3 text-sm text-foreground placeholder:text-foreground-second outline-none transition-all duration-200 focus:border-accent focus:shadow-md focus:ring-2 focus:ring-accent/15"
          />
        </div>

        <Button
          type="submit"
          variant="solid"
          color="MAIN"
          loading={isSubmitting}
          className="mt-2 w-full bg-accent text-white hover:bg-accent-hover sm:w-auto sm:self-end"
        >
          {!isSubmitting && <Send className="mr-2 size-4" />}
          Submit Request
        </Button>
      </Form>
    </motion.div>
  );
};
