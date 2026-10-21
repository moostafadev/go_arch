"use client";

import { Eye, EyeOff, Hash, LockKeyhole, Phone } from "lucide-react";
import { useState } from "react";
import { FieldValues, useFormContext, useFormState } from "react-hook-form";

import { Button } from "../button";
import { Tooltip } from "../tooltip";
import { IProps } from "./types";
import {
  getInputType,
  isNumberType,
  isPasswordType,
  isPhoneType,
  sanitizeNumber,
  sanitizePhoneNumber,
} from "./lib";

const Input = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
  showIconLabel = false,
  rules,
}: IProps<T>) => {
  const { register, control } = useFormContext<T>();

  const { errors } = useFormState({ control, name });

  const [showPassword, setShowPassword] = useState(false);

  const error = errors[name];

  const errorMessage =
    typeof error?.message === "string" && error.message
      ? error.message
      : error?.type === "required"
        ? "This field is required"
        : undefined;

  const isPassword = isPasswordType(type);
  const isPhone = isPhoneType(type);
  const isNumber = isNumberType(type);
  const TypeIcon = isPhone
    ? Phone
    : isPassword
      ? LockKeyhole
      : isNumber
        ? Hash
        : null;

  const inputType = getInputType(type, showPassword);
  const { onChange, ...registerProps } = register(name, rules);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPhone) {
      event.target.value = sanitizePhoneNumber(event.target.value);
    } else if (isNumber) {
      event.target.value = sanitizeNumber(event.target.value);
    }
    onChange(event);
  };

  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      {label && (
        <label
          htmlFor={name}
          className={`flex items-center gap-1.5 text-sm font-medium ${
            error ? "text-accent" : "text-foreground"
          }`}
        >
          {TypeIcon &&
            (showIconLabel ? (
              <TypeIcon
                aria-hidden="true"
                className="size-3.5 text-foreground-second"
              />
            ) : (
              <Tooltip content={label} focusable={false}>
                <TypeIcon
                  aria-hidden="true"
                  className="size-3.5 text-foreground-second"
                />
              </Tooltip>
            ))}
          <span className={TypeIcon && !showIconLabel ? "sr-only" : undefined}>
            {label}
          </span>
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          inputMode={isPhone || isNumber ? "decimal" : undefined}
          autoComplete={isNumber ? "off" : undefined}
          className={`relative w-full border border-border bg-card px-3 py-1.5 text-sm text-foreground placeholder:text-foreground-second outline-none transition-all duration-200 focus:border-accent focus:shadow-md focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50 ${isPassword ? "pl-11" : "px-3"} ${
            error ? "border-accent" : ""
          }`}
          {...registerProps}
          onChange={handleChange}
        />

        {isPassword && (
          <Tooltip
            content={showPassword ? "Hide password" : "Show password"}
            focusable={false}
          >
            <Button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute left-0 top-0 h-full bg-accent/90 hover:bg-accent"
              color="MAIN"
              size="icon"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </Tooltip>
        )}
      </div>

      {errorMessage && (
        <span className="text-xs font-medium text-accent">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
