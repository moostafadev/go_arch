"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { LockKeyhole, Mail } from "lucide-react";
import { m } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
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

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground-second" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/50"
                placeholder="admin@goarch.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground-second" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="border border-accent/50 bg-accent/10 p-3 text-center text-xs font-medium text-accent">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="solid"
            color="MAIN"
            loading={loading}
            className="mt-2 w-full bg-accent py-3 text-white hover:bg-accent-hover"
          >
            Sign In
          </Button>
        </form>
      </m.div>
    </div>
  );
}
