import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LazyMotion, domAnimation } from "framer-motion";
import { DialogProvider } from "@/components/dialog";
import { ToastProvider } from "@/components/toaster";

const centuryGothic = localFont({
  src: [
    {
      path: "../fonts/Century-Gothic-Sans-Font/CenturyGothicPaneuropeanRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Century-Gothic-Sans-Font/CenturyGothicPaneuropeanBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-century-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GO ARCH - Architecture Academy",
  description: "Master Architecture & Parametric Design",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${centuryGothic.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground overflow-x-hidden">
        <LazyMotion features={domAnimation} strict>
          <ToastProvider>
            <DialogProvider>{children}</DialogProvider>
          </ToastProvider>
        </LazyMotion>
      </body>
    </html>
  );
}
