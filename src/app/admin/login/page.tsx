import type { Metadata } from "next";

import { LoginForm } from "@/features/admin/auth";

export const metadata: Metadata = {
  title: "Admin Login | GO ARCH",
  description: "Sign in to the GO ARCH admin dashboard.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-arch-grid-fade" />
        <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <LoginForm />
    </div>
  );
}
