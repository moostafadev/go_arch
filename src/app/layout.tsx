import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { DialogProvider } from "@/components/dialog";
import { ToastProvider } from "@/components/toaster";

import { Header, Footer } from "@/features/layout";

const centuryGothic = localFont({
  src: [
    {
      path: "../fonts/Century-Gothic-Sans-Font/CenturyGothicPaneuropeanThin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Century-Gothic-Sans-Font/CenturyGothicPaneuropeanLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Century-Gothic-Sans-Font/CenturyGothicPaneuropeanRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Century-Gothic-Sans-Font/CenturyGothicPaneuropeanSemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Century-Gothic-Sans-Font/CenturyGothicPaneuropeanBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Century-Gothic-Sans-Font/CenturyGothicPaneuropeanExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Century-Gothic-Sans-Font/CenturyGothicPaneuropeanBlack.ttf",
      weight: "900",
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
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <ToastProvider>
          <DialogProvider>
            <Header />

            <main className="flex-1 pb-16 pt-0 lg:pb-0 lg:pt-16">
              {children}
            </main>

            <Footer />
          </DialogProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
