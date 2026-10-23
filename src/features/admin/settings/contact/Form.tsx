"use client";

import { RotateCcw } from "lucide-react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { useToast } from "@/components/toaster";
import { CONTACT_DEFAULTS, CONTACT_RULES } from "@/constants/site";

import { saveContactSettings } from "./api";
import { ContactPreview } from "./Preview";
import type { ContactFormData, ContactSettings } from "./types";

interface ContactSettingsFormProps {
  setting: ContactSettings;
  onSaved: (setting: ContactSettings) => void;
}

export const ContactSettingsForm = ({
  setting,
  onSaved,
}: ContactSettingsFormProps) => {
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const saved = await saveContactSettings(data);
      toast.success("Contact settings saved");
      onSaved(saved);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save contact settings",
      );
    }
  };

  return (
    <Form<ContactFormData>
      onSubmit={onSubmit}
      defaultValues={{ phone: setting.phone, email: setting.email }}
      className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2"
    >
      <ContactSettingsFields />
    </Form>
  );
};

const ContactSettingsFields = () => {
  const { control, reset } = useFormContext<ContactFormData>();
  const { isSubmitting, isDirty } = useFormState({ control });

  const phone = useWatch({ control, name: "phone" }) ?? "";
  const email = useWatch({ control, name: "email" }) ?? "";

  const handleReset = () => {
    reset(
      { phone: CONTACT_DEFAULTS.phone, email: CONTACT_DEFAULTS.email },
      { keepDefaultValues: true },
    );
  };

  return (
    <>
      <div className="flex flex-col gap-3 border border-border bg-card p-3 sm:gap-4 sm:p-4">
        <div className="flex flex-col gap-1">
          <Input<ContactFormData>
            name="phone"
            label="Phone / WhatsApp Number"
            placeholder="201234567890"
            type="tel"
            showIconLabel={true}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: CONTACT_RULES.phonePattern,
                message: "Enter 8 to 15 digits including country code",
              },
            }}
          />
          <span className="text-[11px] text-foreground-second">
            Digits only, with country code and no plus sign. Example:
            201234567890
          </span>
        </div>

        <Input<ContactFormData>
          name="email"
          label="Contact Email"
          placeholder="hello@goarch.academy"
          type="email"
          showIconLabel={true}
          rules={{
            required: "Email is required",
            maxLength: {
              value: CONTACT_RULES.emailMax,
              message: `Email must not exceed ${CONTACT_RULES.emailMax} characters`,
            },
            pattern: {
              value: CONTACT_RULES.emailPattern,
              message: "Please enter a valid email address",
            },
          }}
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
            disabled={!isDirty}
            className="w-full bg-accent text-white hover:bg-accent-hover sm:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <ContactPreview phone={phone} email={email} />
    </>
  );
};
