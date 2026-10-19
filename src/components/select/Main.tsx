"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  Controller,
  FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { IProps } from "./types";

const Select = <T extends FieldValues>({
  name,
  label,
  placeholder = "Select...",
  options,
  className,
  disabled = false,
  onValueChange,
}: IProps<T>) => {
  const { control } = useFormContext<T>();
  const { errors } = useFormState({ control, name });
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const error = errors[name];
  const errorMessage =
    typeof error?.message === "string" && error.message
      ? error.message
      : error?.type === "required"
        ? "This field is required"
        : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedOption = options.find(
          (option) => option.value === field.value,
        );

        return (
          <div
            ref={containerRef}
            className={`flex flex-col gap-1 ${className ?? ""}`}
          >
            {label && (
              <label
                htmlFor={name}
                className={`text-sm font-medium ${error ? "text-accent" : "text-foreground"}`}
              >
                {label}
              </label>
            )}

            <div className="relative">
              <button
                id={name}
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={`flex h-8.5 w-full cursor-pointer items-center justify-between gap-2 border bg-card px-3 py-1.5 text-sm text-foreground outline-none transition-all duration-200 hover:border-accent/40 disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-accent" : "border-border"} ${open ? "border-accent shadow-md ring-2 ring-accent/15" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={open}
              >
                <span
                  className={`truncate text-start ${selectedOption ? "text-foreground" : "text-foreground-second"}`}
                >
                  {selectedOption?.label ?? placeholder}
                </span>
                <ChevronDown
                  className={`size-4 shrink-0 text-foreground-second transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && !disabled && (
                <div
                  role="listbox"
                  className="absolute inset-x-0 top-full z-50 mt-1 flex max-h-60 flex-col gap-px overflow-y-auto border border-border bg-card p-1 shadow-lg"
                >
                  {options.length > 0 ? (
                    options.map((option) => {
                      const isSelected = option.value === field.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            field.onChange(option.value);
                            field.onBlur();
                            onValueChange?.(option.value);
                            setOpen(false);
                          }}
                          className={`flex min-h-8 w-full cursor-pointer items-center justify-between gap-2 px-3 py-1.5 text-start text-sm transition-colors duration-150 ${isSelected ? "bg-accent/10 text-accent" : "text-foreground hover:bg-card-hover"}`}
                        >
                          <span className="truncate">{option.label}</span>
                          {isSelected && (
                            <Check className="size-4 shrink-0 text-accent" />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-3 py-1.5 text-sm text-foreground-second">
                      No options available
                    </div>
                  )}
                </div>
              )}
            </div>

            {errorMessage && (
              <span className="text-xs font-medium text-accent">
                {errorMessage}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default Select;
