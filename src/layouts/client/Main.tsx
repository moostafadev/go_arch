import { ViewTracker } from "@/components/view-tracker";

import { Footer } from "./Footer";
import { Header } from "./Header";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ViewTracker />
      <Header />
      <main className="flex-1 pb-16 pt-0 lg:pb-0 lg:pt-16">{children}</main>
      <Footer />
    </>
  );
};
