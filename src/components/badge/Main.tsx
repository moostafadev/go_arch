import { BadgeProps, BadgeTone } from "./types";

const toneClasses: Record<
  BadgeTone,
  { border: string; bg: string; text: string; dot: string }
> = {
  accent: {
    border: "border-accent/30",
    bg: "bg-accent/5",
    text: "text-accent-text",
    dot: "bg-accent",
  },
  neutral: {
    border: "border-border",
    bg: "bg-card",
    text: "text-foreground-second",
    dot: "bg-foreground-second",
  },
};

export const Badge = ({
  children,
  tone = "accent",
  pulse = true,
  blur = true,
  animate = true,
  delay = 0,
  className = "",
}: BadgeProps) => {
  const styles = toneClasses[tone];

  return (
    <div
      className={`inline-flex items-center gap-2 border px-3 py-1 ${styles.border} ${styles.bg} ${blur ? "backdrop-blur-sm" : ""} ${animate ? "animate-[hero-fade-up_0.45s_cubic-bezier(0.22,1,0.36,1)_both]" : ""} ${className}`}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      <span
        className={`flex h-2 w-2 ${styles.dot} ${pulse ? "animate-pulse" : ""}`}
      />
      <span
        className={`text-xs font-semibold uppercase tracking-wider ${styles.text}`}
      >
        {children}
      </span>
    </div>
  );
};
