"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/toaster";

import { logoutAdmin } from "./api";

export const useLogout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logoutAdmin();
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Failed to sign out. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
};
