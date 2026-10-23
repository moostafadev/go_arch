export interface ContactSettings {
  phone: string;
  email: string;
}

export const SITE_SETTING_KEY = "main";

export const CONTACT_DEFAULTS: ContactSettings = {
  phone: "201234567890",
  email: "hello@goarch.academy",
};

export const CONTACT_RULES = {
  phonePattern: /^\d{8,15}$/,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  emailMax: 120,
} as const;
