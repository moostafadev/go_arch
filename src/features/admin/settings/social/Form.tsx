"use client";

import { Plus, RotateCcw, Trash2 } from "lucide-react";
import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { useToast } from "@/components/toaster";
import {
  SOCIAL_PLATFORMS,
  SOCIAL_RULES,
  type SocialPlatform,
} from "@/constants/social";
import { isHttpUrl } from "@/lib/social";

import { saveSocialLinks } from "./api";
import { SocialPreview } from "./Preview";
import type { SocialFormData, SocialLink } from "./types";
import { toFormData } from "./utils";

interface SocialSettingsFormProps {
  links: SocialLink[];
  onSaved: (links: SocialLink[]) => void;
}

const urlRules = {
  required: "URL is required",
  validate: (value: unknown) =>
    isHttpUrl(String(value).trim()) ||
    "Enter a valid URL starting with https://",
};

const labelRules = {
  required: "Label is required",
  maxLength: {
    value: SOCIAL_RULES.labelMax,
    message: `Label must not exceed ${SOCIAL_RULES.labelMax} characters`,
  },
};

export const SocialSettingsForm = ({
  links,
  onSaved,
}: SocialSettingsFormProps) => {
  const { toast } = useToast();

  const onSubmit = async (data: SocialFormData) => {
    try {
      const saved = await saveSocialLinks(data);
      toast.success("Social links saved");
      onSaved(saved);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save social links",
      );
    }
  };

  return (
    <Form<SocialFormData>
      onSubmit={onSubmit}
      defaultValues={toFormData(links)}
      className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2"
    >
      <SocialSettingsFields />
    </Form>
  );
};

const SocialSettingsFields = () => {
  const { control, reset } = useFormContext<SocialFormData>();
  const { isSubmitting, isDirty } = useFormState({ control });
  const { fields, append, remove } = useFieldArray({ control, name: "links" });

  const links = useWatch({ control, name: "links" }) ?? [];

  const usedPlatforms = new Set<SocialPlatform>(
    links.map((link) => link.platform).filter((key) => key !== "other"),
  );

  const getOptions = (index: number) =>
    SOCIAL_PLATFORMS.filter(
      (platform) =>
        platform.key === "other" ||
        platform.key === links[index]?.platform ||
        !usedPlatforms.has(platform.key),
    ).map((platform) => ({ value: platform.key, label: platform.label }));

  const getPlaceholder = (index: number) =>
    SOCIAL_PLATFORMS.find((platform) => platform.key === links[index]?.platform)
      ?.placeholder ?? "https://";

  const handleAdd = () => {
    const nextPlatform =
      SOCIAL_PLATFORMS.find(
        (platform) =>
          platform.key !== "other" && !usedPlatforms.has(platform.key),
      )?.key ?? "other";

    append({ platform: nextPlatform, url: "", label: "" });
  };

  const reachedLimit = fields.length >= SOCIAL_RULES.maxLinks;

  return (
    <>
      <div className="flex flex-col gap-3 border border-border bg-card p-3 sm:gap-4 sm:p-4">
        {fields.length === 0 ? (
          <p className="border border-dashed border-border bg-background p-4 text-center text-sm text-foreground-second">
            No social links yet. Add your first one.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <li
                key={field.id}
                className="flex flex-col gap-3 border border-border bg-background p-3"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[11rem_1fr_auto] sm:items-end">
                  <Select<SocialFormData>
                    name={`links.${index}.platform`}
                    label="Platform"
                    options={getOptions(index)}
                  />

                  <Input<SocialFormData>
                    name={`links.${index}.url`}
                    label="URL"
                    placeholder={getPlaceholder(index)}
                    type="url"
                    rules={urlRules}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    color="DANGER"
                    size="icon"
                    onClick={() => remove(index)}
                    aria-label="Remove link"
                    className="size-8.5 self-end"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                {links[index]?.platform === "other" && (
                  <Input<SocialFormData>
                    name={`links.${index}.label`}
                    label="Label"
                    placeholder="e.g. Behance"
                    rules={labelRules}
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        <Button
          type="button"
          variant="outline"
          color="NEUTRAL"
          onClick={handleAdd}
          disabled={reachedLimit || isSubmitting}
          className="w-full"
        >
          <Plus className="mr-2 size-4" />
          Add link
          <span className="text-xs text-foreground-second">
            {fields.length}/{SOCIAL_RULES.maxLinks}
          </span>
        </Button>

        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            color="NEUTRAL"
            onClick={() => reset()}
            disabled={isSubmitting || !isDirty}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="mr-2 size-4" />
            Discard changes
          </Button>

          <Button
            type="submit"
            color="MAIN"
            loading={isSubmitting}
            disabled={!isDirty}
            className="w-full bg-accent text-white hover:bg-accent-hover sm:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <SocialPreview links={links} />
    </>
  );
};
