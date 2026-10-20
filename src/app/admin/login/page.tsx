"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { useToast } from "@/components/toaster";
import { m } from "framer-motion";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-arch-grid-fade" />
        <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md border border-border bg-card p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-black uppercase tracking-tight text-foreground">
            Admin <span className="text-accent">Access</span>
          </h1>
          <p className="text-sm text-foreground-second">
            Sign in to manage your academy
          </p>
        </div>

        <Form<LoginFormData>
          onSubmit={onSubmit}
          defaultValues={{ email: "", password: "" }}
          className="flex flex-col gap-5"
        >
          <Input<LoginFormData>
            name="email"
            label="Email Address"
            placeholder="admin@goarch.com"
            type="email"
            showIconLabel={true}
          />

          <Input<LoginFormData>
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            showIconLabel={true}
          />

          <Button
            type="submit"
            variant="solid"
            color="MAIN"
            loading={loading}
            className="mt-2 w-full bg-accent py-3 text-white hover:bg-accent-hover"
          >
            Sign In
          </Button>
        </Form>
      </m.div>
    </div>
  );
}
