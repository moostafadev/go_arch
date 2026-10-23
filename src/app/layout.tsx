import type { Metadata } from "next";
import localFont from "next/font/local";
import { preconnect, prefetchDNS } from "react-dom";
import "./globals.css";
import { DialogProvider } from "@/components/dialog";
import { ToastProvider } from "@/components/toaster";
import { MotionProvider } from "@/providers/motion";

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
  preload: true,
});

export const metadata: Metadata = {
  title: "GO ARCH - Architecture Academy",
  description: "Master Architecture & Parametric Design",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  prefetchDNS("https://res.cloudinary.com");
  prefetchDNS("https://images.unsplash.com");
  preconnect("https://res.cloudinary.com", { crossOrigin: "anonymous" });
  preconnect("https://images.unsplash.com", { crossOrigin: "anonymous" });

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${centuryGothic.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground overflow-x-hidden">
        <MotionProvider>
          <ToastProvider>
            <DialogProvider>{children}</DialogProvider>
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
