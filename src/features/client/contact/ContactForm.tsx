"use client";

import { useState } from "react";
import { m, Variants } from "framer-motion";
import { Send } from "lucide-react";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Textarea } from "@/components/textarea";
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

interface ContactFormProps {
  courseId?: string;
  courseTitle?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const ContactForm = ({ courseId, courseTitle }: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCourse =
    courseTitle || allCourses.find((c) => c.id === courseId)?.title;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    console.log("Lead Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success("Request received! Our team will contact you shortly.");
  };

  return (
    <Form<ContactFormData>
      onSubmit={onSubmit}
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
        className="flex flex-col gap-5"
      >
        <m.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
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
        </m.div>

        <m.div variants={itemVariants}>
          <Input<ContactFormData>
            name="email"
            label="Email Address (Optional)"
            placeholder="john@example.com"
            type="email"
            showIconLabel={true}
          />
        </m.div>

        <m.div variants={itemVariants}>
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
