"use client";

import { ReactNode } from "react";
import { MotionProvider } from "./motion";
import { ToastProvider } from "./toast";
import { DialogProvider } from "./dialog";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MotionProvider>
      <ToastProvider>
        <DialogProvider>{children}</DialogProvider>
      </ToastProvider>
    </MotionProvider>
  );
};
