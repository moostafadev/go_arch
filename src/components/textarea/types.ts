import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface IProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
}
