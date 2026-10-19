// src/features/layout/footer/CopyrightYear.tsx
import { io } from "next/cache";

export async function CopyrightYear() {
  await io();
  const year = new Date().getFullYear();
  return <span>&copy; {year} GO ARCH Academy. All rights reserved.</span>;
}
