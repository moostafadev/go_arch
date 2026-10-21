import { LoginFormData } from "./types";

export const loginAdmin = async (data: LoginFormData): Promise<void> => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }
};

export const logoutAdmin = async (): Promise<void> => {
  const res = await fetch("/api/auth/logout", { method: "POST" });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
};
