"use client";

import { useFormContext, useFormState } from "react-hook-form";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { ImageInput } from "@/components/image-input";
import { useToast } from "@/components/toaster";
import {
  IMAGE_SECTIONS,
  type ImageSection,
  type SectionImageMap,
} from "@/constants/images";

import { saveSectionImages } from "./api";
import type { ImagesFormData } from "./types";

interface SectionImagesFormProps<S extends ImageSection> {
  section: S;
  images: SectionImageMap<S>;
  onSaved: (images: SectionImageMap<S>) => void;
}

export const SectionImagesForm = <S extends ImageSection>({
  section,
  images,
  onSaved,
}: SectionImagesFormProps<S>) => {
  const { toast } = useToast();
  const defs = IMAGE_SECTIONS[section];
  const imageRecord: Record<string, string | null> = images;

  const onSubmit = async (data: ImagesFormData) => {
    try {
      const saved = await saveSectionImages(section, data.images);
      toast.success("Images saved");
      onSaved(saved);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save images");
    }
  };

  const defaultValues: ImagesFormData = {
    images: Object.fromEntries(
      defs.map((def) => [def.key, imageRecord[def.key] ?? ""]),
    ),
  };

  return (
    <Form<ImagesFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2"
    >
      {defs.map((def) => (
        <div
          key={def.key}
          className="flex flex-col gap-3 border border-border bg-card p-3 sm:p-4"
        >
          <div>
            <p className="text-sm font-semibold text-foreground">{def.label}</p>
            <p className="text-xs text-foreground-second">{def.description}</p>
          </div>

          <ImageInput<ImagesFormData>
            name={`images.${def.key}`}
            placeholder={`Upload ${def.label.toLowerCase()}`}
            ratio={def.ratio}
          />
        </div>
      ))}

      <div className="flex justify-end lg:col-span-2">
        <SaveBar />
      </div>
    </Form>
  );
};

const SaveBar = () => {
  const { control } = useFormContext<ImagesFormData>();
  const { isSubmitting, isDirty } = useFormState({ control });

  return (
    <Button
      type="submit"
      color="MAIN"
      loading={isSubmitting}
      disabled={!isDirty}
      className="w-full bg-accent text-white hover:bg-accent-hover sm:w-auto"
    >
      Save Changes
    </Button>
  );
};
