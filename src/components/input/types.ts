import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface IProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  showIconLabel?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  onValueChange?: (value: string) => void;
}
