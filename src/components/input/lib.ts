export const INPUT_TYPES = {
  PASSWORD: "password",
  PHONE: "tel",
  NUMBER: "number",
} as const;

export const isPasswordType = (type: string) => type === INPUT_TYPES.PASSWORD;
export const isPhoneType = (type: string) => type === INPUT_TYPES.PHONE;
export const isNumberType = (type: string) => type === INPUT_TYPES.NUMBER;

export const getInputType = (type: string, showPassword: boolean) => {
  if (isPasswordType(type)) return showPassword ? "text" : "password";
  if (isNumberType(type)) return "text";
  return type;
};

export const sanitizePhoneNumber = (value: string) => value.replace(/\D/g, "");

export const sanitizeNumber = (value: string) => {
  let sanitized = value.replace(/[^\d.-]/g, "");
  sanitized =
    sanitized[0] === "-"
      ? "-" + sanitized.slice(1).replace(/-/g, "")
      : sanitized.replace(/-/g, "");
  const firstDotIndex = sanitized.indexOf(".");
  if (firstDotIndex !== -1) {
    sanitized =
      sanitized.slice(0, firstDotIndex + 1) +
      sanitized.slice(firstDotIndex + 1).replace(/\./g, "");
  }
  return sanitized;
};
