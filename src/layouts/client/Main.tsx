import { Header } from "./Header";
import { Footer } from "./Footer";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16 pt-0 lg:pb-0 lg:pt-16">{children}</main>
      <Footer />
    </>
  );
};
