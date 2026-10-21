"use client";

import { LoadingImage as Image } from "@/components/loading-image";
import { AlertTriangle, ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  Controller,
  FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";

import { Button } from "../button";
import { IProps } from "./types";

const MIN_RATIO = 1.5;
const MAX_RATIO = 2.2;

const readImageRatio = (file: File): Promise<number> =>
  new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      URL.revokeObjectURL(url);
      resolve(ratio);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0);
    };
    img.src = url;
  });

const getRatioWarning = (ratio: number): string | null => {
  if (!ratio) return null;
  if (ratio >= MIN_RATIO && ratio <= MAX_RATIO) return null;

  if (ratio < 0.9) {
    return "This image is portrait. Course cards will crop it to a horizontal strip — the top and bottom will be hidden. Landscape 16:9 works best.";
  }
  if (ratio < MIN_RATIO) {
    return "This image is square-ish. Course cards will crop the sides. Landscape 16:9 works best.";
  }
  return "This image is very wide. The edges may be cropped on course cards. Landscape 16:9 works best.";
};

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
  const [ratioWarning, setRatioWarning] = useState("");

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
          setRatioWarning("");

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

          const ratio = await readImageRatio(file);
          const warning = getRatioWarning(ratio);
          if (warning) setRatioWarning(warning);

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
          setRatioWarning("");
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

            {ratioWarning && (
              <div className="flex items-start gap-2 border border-warning/30 bg-warning/10 p-3 text-xs text-warning sm:p-4">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold">Aspect ratio warning</p>
                  <p className="mt-0.5 text-warning/90">{ratioWarning}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRatioWarning("")}
                  aria-label="Dismiss warning"
                  className="flex size-6 shrink-0 items-center justify-center text-warning transition-colors hover:bg-warning/20"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            )}

            {imageUrl ? (
              <div className="relative overflow-hidden border border-border bg-background">
                <div className="relative flex min-h-48 items-center justify-center bg-card p-3 sm:p-4">
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

                <div className="flex items-center justify-between gap-2 border-t border-border p-3 sm:p-4">
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
                className={`flex min-h-36 w-full flex-col items-center justify-center gap-2 border border-dashed bg-background p-3 text-center outline-none transition-all duration-200 hover:border-accent/50 hover:bg-accent/5 focus:border-accent/60 focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50 sm:p-4 ${error ? "border-danger" : "border-border"}`}
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
                    <span className="text-[10px] font-medium uppercase tracking-wider text-foreground-second/70">
                      Best: landscape 16:9 · 1280×720+
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
