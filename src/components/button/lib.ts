import { BUTTON_VARIANT, COLOR } from "@/constants/types";
import { TSize } from "./types";

type ColorVariant = Exclude<BUTTON_VARIANT, "card">;

export const getColor = (
  color: COLOR = "NEUTRAL",
  variant: ColorVariant = "solid",
) => {
  const colors: Record<COLOR, Record<ColorVariant, string>> = {
    MAIN: {
      solid: "bg-accent text-white hover:bg-accent-hover",
      soft: "bg-accent/10 text-accent hover:bg-accent/20",
      outline: "border border-accent/50 text-accent hover:bg-accent/10",
      ghost: "text-accent hover:bg-accent/10",
    },
    SECONDARY: {
      solid: "bg-card text-foreground hover:bg-card-hover",
      soft: "bg-card/40 text-foreground hover:bg-card/60",
      outline: "border border-border text-foreground hover:bg-card",
      ghost: "text-foreground hover:bg-card",
    },
    SUCCESS: {
      solid: "bg-success text-success-foreground hover:bg-success/90",
      soft: "bg-success/10 text-success hover:bg-success/15",
      outline: "border border-success/50 text-success hover:bg-success/10",
      ghost: "text-success hover:bg-success/10",
    },
    DANGER: {
      solid: "bg-danger text-danger-foreground hover:bg-danger/90",
      soft: "bg-danger/10 text-danger hover:bg-danger/15",
      outline: "border border-danger/50 text-danger hover:bg-danger/10",
      ghost: "text-danger hover:bg-danger/10",
    },
    WARNING: {
      solid: "bg-warning text-warning-foreground hover:bg-warning/90",
      soft: "bg-warning/10 text-warning hover:bg-warning/15",
      outline: "border border-warning/50 text-warning hover:bg-warning/10",
      ghost: "text-warning hover:bg-warning/10",
    },
    INFO: {
      solid: "bg-info text-info-foreground hover:bg-info/90",
      soft: "bg-info/10 text-info hover:bg-info/15",
      outline: "border border-info/50 text-info hover:bg-info/10",
      ghost: "text-info hover:bg-info/10",
    },
    NEUTRAL: {
      solid: "bg-foreground text-background hover:bg-foreground/90",
      soft: "bg-card text-foreground hover:bg-card-hover",
      outline: "border border-border text-foreground hover:bg-card",
      ghost: "text-foreground hover:bg-card",
    },
  };

  return colors[color]?.[variant] ?? colors.NEUTRAL.solid;
};

export const getCardStyles = (selected: boolean) => {
  return selected
    ? "border-accent bg-accent/10 shadow-sm text-accent"
    : "border-border bg-background text-foreground hover:border-accent/40 hover:bg-accent/5";
};

export const getSize = (size: TSize) => {
  switch (size) {
    case "xs":
      return "px-3 py-1.5 text-xs";
    case "sm":
      return "px-4 py-1.5 text-sm";
    case "lg":
      return "px-8 py-2.5 text-base";
    case "icon":
      return "p-1.5";
    case "md":
    default:
      return "px-6 py-2 text-sm";
  }
};
