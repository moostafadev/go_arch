"use client";

import { LoadingImage as Image } from "@/components/loading-image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  Controller,
  FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";

import { Button } from "../button";
import { IProps } from "./types";

const ImageInput = <T extends FieldValues>({
  name,
  label,
  placeholder = "Select an image from your device",
  className,
  disabled = false,
}: IProps<T>) => {
  const { control } = useFormContext<T>();
  const { errors } = useFormState({ control, name });

  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const error = errors[name];

  const errorMessage =
    typeof error?.message === "string" && error.message
      ? error.message
      : error?.type === "required"
        ? "This field is required"
        : uploadError || undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const imageUrl = typeof field.value === "string" ? field.value : "";

        const openFilePicker = () => {
          if (disabled || uploading) return;
          inputRef.current?.click();
        };

        const handleFileChange = async (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const file = event.target.files?.[0];
          if (!file) return;

          setUploadError("");

          if (!file.type.startsWith("image/")) {
            setUploadError("Please select a valid image");
            event.target.value = "";
            return;
          }

          const maxSize = 5 * 1024 * 1024;
          if (file.size > maxSize) {
            setUploadError("Image size must not exceed 5MB");
            event.target.value = "";
            return;
          }

          setUploading(true);

          try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload/image", {
              method: "POST",
              body: formData,
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
              setUploadError(result.message || "Failed to upload image");
              return;
            }

            field.onChange(result.url);
            field.onBlur();
          } catch {
            setUploadError("An error occurred while uploading");
          } finally {
            setUploading(false);
            event.target.value = "";
          }
        };

        const handleRemove = () => {
          if (disabled || uploading) return;
          field.onChange("");
          field.onBlur();
          setUploadError("");
        };

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

            <input
              ref={inputRef}
              id={name}
              type="file"
              accept="image/*"
              disabled={disabled || uploading}
              className="hidden"
              onChange={handleFileChange}
            />

            {imageUrl ? (
              <div className="relative overflow-hidden border border-border bg-background">
                <div className="relative flex min-h-48 items-center justify-center bg-card p-3">
                  <div className="relative h-64 w-full">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-contain"
                    />
                  </div>

                  <Button
                    type="button"
                    color="DANGER"
                    size="icon"
                    className="absolute right-2 top-2 z-20 shadow-md text-white sm:w-auto sm:px-3"
                    disabled={disabled || uploading}
                    onClick={handleRemove}
                  >
                    <X aria-hidden="true" className="size-4" />
                    <span className="hidden sm:inline sm:ml-1.5">Remove</span>
                  </Button>

                  {uploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-sm z-30">
                      <Loader2 className="size-7 animate-spin text-accent" />
                      <span className="text-sm font-medium text-foreground">
                        Uploading...
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-border p-2">
                  <span className="truncate text-xs text-foreground-second">
                    Uploaded successfully
                  </span>
                  <Button
                    type="button"
                    color="INFO"
                    variant="soft"
                    size="sm"
                    className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                    disabled={disabled || uploading}
                    onClick={openFilePicker}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                disabled={disabled || uploading}
                onClick={openFilePicker}
                className={`flex min-h-36 w-full flex-col items-center justify-center gap-2 border border-dashed bg-background px-4 py-6 text-center outline-none transition-all duration-200 hover:border-accent/50 hover:bg-accent/5 focus:border-accent/60 focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-danger" : "border-border"}`}
              >
                {uploading ? (
                  <>
                    <Loader2 className="size-7 animate-spin text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      Uploading...
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex size-10 items-center justify-center bg-accent/10 text-accent">
                      <ImagePlus className="size-5" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {placeholder}
                    </span>
                    <span className="text-xs text-foreground-second">
                      PNG, JPG, WEBP — max 5MB
                    </span>
                  </>
                )}
              </button>
            )}

            {errorMessage && (
              <span className="text-xs font-medium text-danger">
                {errorMessage}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default ImageInput;
