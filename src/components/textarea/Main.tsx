"use client";

import { FieldValues, useFormContext, useFormState } from "react-hook-form";
import { IProps } from "./types";

const Textarea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 3,
  className,
  disabled = false,
}: IProps<T>) => {
  const { register, control } = useFormContext<T>();
  const { errors } = useFormState({ control, name });

  const error = errors[name];

  const errorMessage =
    typeof error?.message === "string" && error.message
      ? error.message
      : error?.type === "required"
        ? "This field is required"
        : undefined;

  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-sm font-medium ${error ? "text-danger" : "text-foreground"}`}
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full resize-none border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-second outline-none transition-all duration-200 focus:border-accent focus:shadow-md focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50`}
        {...register(name)}
      />

      {errorMessage && (
        <span className="text-xs font-medium text-danger">{errorMessage}</span>
      )}
    </div>
  );
};

export default Textarea;
