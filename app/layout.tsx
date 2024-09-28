import Footer from "@/app/components/Footer/Footer";
import Advertisement from "@/app/components/Header/Advertisement";
import Header from "@/app/components/Header/Header";
import Info from "@/app/components/Header/Info";
import NavigationSection from "@/app/components/Header/NavigationSection";
import { type ChildrenProps } from "@/app/components/InterfaceType";
import "@/app/globals.css";
import PremiumHeader from "./components/Header/PremiumHeader";

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body className="bg-black text-white  text-base">
        {/* make components server components by passing as props */}
        <Header
          advertisement={<Advertisement />}
          premiumArea={<PremiumHeader />}
        >
          <Info />
          <NavigationSection />
        </Header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
