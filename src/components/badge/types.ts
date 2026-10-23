import type { ReactNode } from "react";

export type BadgeTone = "accent" | "neutral";

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  pulse?: boolean;
  blur?: boolean;
  animate?: boolean;
  delay?: number;
  className?: string;
}
