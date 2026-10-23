import type { SeoData, SeoPageKey } from "@/constants/seo";

export interface SeoSetting extends SeoData {
  pageKey: SeoPageKey;
}

export interface SeoFormData {
  title: string;
  description: string;
  keywords: string;
  image: string;
}
