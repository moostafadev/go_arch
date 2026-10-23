import type { ImageRatioRule } from "@/components/image-input";

export interface ManagedImageDef {
  key: string;
  label: string;
  description: string;
  ratio: ImageRatioRule;
}

export const IMAGE_SECTIONS = {
  about: [
    {
      key: "about-mission",
      label: "Mission Image",
      description: "Shown in the 'Why we exist' section.",
      ratio: { min: 0.9, max: 1.1, label: "square 1:1 · 800×800+" },
    },
    {
      key: "about-instructor",
      label: "Instructor Image",
      description: "Portrait shown in the 'Meet the Founder' section.",
      ratio: { min: 0.7, max: 0.9, label: "portrait 4:5 · 800×1000+" },
    },
  ],
  hero: [
    {
      key: "hero",
      label: "Hero Image",
      description:
        "Main visual in the home page hero. Rendered as portrait 4:5 on desktop.",
      ratio: { min: 0.72, max: 0.88, label: "portrait 4:5 · 1000×1250+" },
    },
  ],
} as const satisfies Record<string, readonly ManagedImageDef[]>;

export type ImageSection = keyof typeof IMAGE_SECTIONS;

export type SectionImageKey<S extends ImageSection> =
  (typeof IMAGE_SECTIONS)[S][number]["key"];

export type SectionImageMap<S extends ImageSection> = Record<
  SectionImageKey<S>,
  string | null
>;

export const isImageSection = (value: unknown): value is ImageSection =>
  typeof value === "string" && value in IMAGE_SECTIONS;

export const getSectionDefs = <S extends ImageSection>(section: S) =>
  IMAGE_SECTIONS[section];

export const getSectionKeys = <S extends ImageSection>(
  section: S,
): SectionImageKey<S>[] =>
  IMAGE_SECTIONS[section].map((item) => item.key) as SectionImageKey<S>[];

export const emptySectionMap = <S extends ImageSection>(
  section: S,
): SectionImageMap<S> => {
  const entries = IMAGE_SECTIONS[section].map(
    (item) => [item.key, null] as const,
  );

  return Object.fromEntries(entries) as SectionImageMap<S>;
};
