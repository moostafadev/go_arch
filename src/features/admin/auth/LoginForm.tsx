"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { m, type Variants } from "framer-motion";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { useToast } from "@/components/toaster";

import { loginAdmin } from "./api";
import { LoginFormData } from "./types";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      await loginAdmin(data);
      router.push("/admin");
      router.refresh();
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md border border-border bg-card p-4 shadow-2xl sm:p-8"
    >
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 text-center sm:mb-8"
      >
        <h1 className="mb-2 text-2xl font-black uppercase tracking-tight text-foreground">
          Admin <span className="text-accent">Access</span>
        </h1>
        <p className="text-sm text-foreground-second">
          Sign in to manage your academy
        </p>
      </m.div>

      <Form<LoginFormData>
        onSubmit={onSubmit}
        defaultValues={{ email: "", password: "" }}
      >
        <m.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-4 sm:gap-5"
        >
          <m.div variants={itemVariants}>
            <Input<LoginFormData>
              name="email"
              label="Email Address"
              placeholder="admin@goarch.com"
              type="email"
              showIconLabel={true}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              }}
            />
          </m.div>

          <m.div variants={itemVariants}>
            <Input<LoginFormData>
              name="password"
              label="Password"
              placeholder="••••••••"
              type="password"
              showIconLabel={true}
              rules={{
                required: "Password is required",
              }}
            />
          </m.div>

          <m.div variants={itemVariants} className="mt-2">
            <Button
              type="submit"
              variant="solid"
              color="MAIN"
              loading={loading}
              className="w-full bg-accent py-3 text-white hover:bg-accent-hover"
            >
              Sign In
            </Button>
          </m.div>
        </m.div>
      </Form>
    </m.div>
  );
};
