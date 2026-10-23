"use client";

import { RotateCcw } from "lucide-react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { ImageInput } from "@/components/image-input";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { useToast } from "@/components/toaster";
import {
  SEO_DEFAULTS,
  SEO_IMAGE_RATIO,
  SEO_LIMITS,
  SEO_PAGES,
  type SeoPageKey,
} from "@/constants/seo";

import { saveSeoSetting } from "./api";
import { SeoPreview } from "./Preview";
import type { SeoFormData, SeoSetting } from "./types";
import { parseKeywords, toFormData } from "./utils";

interface SeoFormProps {
  setting: SeoSetting;
  onSaved: (setting: SeoSetting) => void;
}

interface CounterProps {
  current: number;
  max: number;
}

const Counter = ({ current, max }: CounterProps) => (
  <span
    className={`text-[11px] ${current > max ? "font-semibold text-danger" : "text-foreground-second"}`}
  >
    {current}/{max}
  </span>
);

export const SeoForm = ({ setting, onSaved }: SeoFormProps) => {
  const { toast } = useToast();

  const onSubmit = async (data: SeoFormData) => {
    try {
      const saved = await saveSeoSetting(setting.pageKey, data);
      toast.success("SEO settings saved");
      onSaved(saved);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save SEO settings",
      );
    }
  };

  return (
    <Form<SeoFormData>
      onSubmit={onSubmit}
      defaultValues={toFormData(setting)}
      className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2"
    >
      <SeoFormFields pageKey={setting.pageKey} />
    </Form>
  );
};

const SeoFormFields = ({ pageKey }: { pageKey: SeoPageKey }) => {
  const { control, reset } = useFormContext<SeoFormData>();
  const { isSubmitting, isDirty } = useFormState({ control });

  const title = useWatch({ control, name: "title" }) ?? "";
  const description = useWatch({ control, name: "description" }) ?? "";
  const keywords = useWatch({ control, name: "keywords" }) ?? "";
  const image = useWatch({ control, name: "image" }) ?? "";

  const keywordCount = parseKeywords(keywords).length;
  const page = SEO_PAGES.find((item) => item.key === pageKey);

  const isInvalid =
    !title.trim() ||
    !description.trim() ||
    title.length > SEO_LIMITS.title ||
    description.length > SEO_LIMITS.description ||
    keywordCount > SEO_LIMITS.keywords;

  const handleReset = () => {
    reset(toFormData(SEO_DEFAULTS[pageKey]), { keepDefaultValues: true });
  };

  return (
    <>
      <div className="flex flex-col gap-3 border border-border bg-card p-3 sm:gap-4 sm:p-4">
        <div className="flex flex-col gap-1">
          <Input<SeoFormData>
            name="title"
            label="Page Title"
            placeholder="e.g. Courses & Diplomas | GO ARCH"
            rules={{
              required: "Title is required",
              maxLength: {
                value: SEO_LIMITS.title,
                message: `Title must not exceed ${SEO_LIMITS.title} characters`,
              },
            }}
          />
          <div className="flex justify-end">
            <Counter current={title.length} max={SEO_LIMITS.title} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Textarea<SeoFormData>
            name="description"
            label="Description"
            placeholder="Short summary shown in search results"
            rows={4}
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-danger">
              {description.length > SEO_LIMITS.description
                ? "Description is too long"
                : ""}
            </span>
            <Counter
              current={description.length}
              max={SEO_LIMITS.description}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Input<SeoFormData>
            name="keywords"
            label="Keywords (comma separated)"
            placeholder="architecture, rhino, grasshopper"
          />
          <div className="flex justify-end">
            <Counter current={keywordCount} max={SEO_LIMITS.keywords} />
          </div>
        </div>

        <ImageInput<SeoFormData>
          name="image"
          label="Social Share Image"
          placeholder="Select a share image"
          ratio={SEO_IMAGE_RATIO}
        />

        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            color="NEUTRAL"
            onClick={handleReset}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="mr-2 size-4" />
            Use defaults
          </Button>

          <Button
            type="submit"
            color="MAIN"
            loading={isSubmitting}
            disabled={isInvalid || !isDirty}
            className="w-full bg-accent text-white hover:bg-accent-hover sm:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <SeoPreview
        title={title}
        description={description}
        image={image}
        path={page?.path ?? "/"}
      />
    </>
  );
};
