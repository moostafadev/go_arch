export const toDigits = (value: string): string => value.replace(/\D/g, "");

export const formatPhone = (value: string): string => {
  const digits = toDigits(value);
  return digits ? `+${digits}` : "";
};

export const toTelHref = (value: string): string => `tel:${formatPhone(value)}`;

export const toMailHref = (value: string): string => `mailto:${value}`;

export const toWhatsAppUrl = (value: string, message?: string): string => {
  const base = `https://wa.me/${toDigits(value)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
