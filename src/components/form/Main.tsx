"use client";

import { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { IProps } from "./types";

/**
 * Thin wrapper around `react-hook-form`. Wraps the tree in a `FormProvider`
 * so nested fields (`Input`, `Select`, `Switch`, etc.) can read
 * form context by name via `useFormContext`, without prop drilling.
 */
const Form = <T extends FieldValues>({
  onSubmit,
  children,
  className,
  onFormReady,
  ...formOptions
}: IProps<T>) => {
  const methods = useForm<T>(formOptions);

  useEffect(() => {
    onFormReady?.(methods);
  }, [methods, onFormReady]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
