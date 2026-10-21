export const formatPrice = (value: string | null | undefined): string => {
  if (!value) return "";
  const trimmed = String(value).trim();
  if (!trimmed) return "";
  if (/\begp\b/i.test(trimmed)) return trimmed;
  return `${trimmed} EGP`;
};
