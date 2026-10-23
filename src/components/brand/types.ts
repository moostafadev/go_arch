export type BrandSize = "sm" | "md" | "lg";

export interface BrandProps {
  size?: BrandSize;
  onNavigate?: () => void;
  className?: string;
  priority?: boolean;
  animateOnView?: boolean;
}
