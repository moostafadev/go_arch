import { FieldValues, Path } from "react-hook-form";

export interface ImageRatioRule {
  min: number;
  max: number;
  label: string;
}

export interface IProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  ratio?: ImageRatioRule;
}
