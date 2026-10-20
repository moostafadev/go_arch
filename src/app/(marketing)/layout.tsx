import { ClientLayout } from "@/layouts/client";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
