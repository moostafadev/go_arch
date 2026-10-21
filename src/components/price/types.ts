export type PriceSize = "sm" | "md" | "lg" | "xl";

export interface PriceProps {
  price: string;
  discountPrice?: string | null;
  size?: PriceSize;
  className?: string;
}
