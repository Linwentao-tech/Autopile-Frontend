import Footer from "@/app/components/Footer/Footer";
import Advertisement from "@/app/components/Header/Advertisement";
import Header from "@/app/components/Header/Header";
import Info from "@/app/components/Header/Info";
import NavigationSection from "@/app/components/Header/NavigationSection";
import { type ChildrenProps } from "@/app/components/InterfaceType";
import "@/app/globals.css";
import PremiumHeader from "./components/Header/PremiumHeader";
import AboutUsHeader from "./components/Header/AboutUsHeader";
import StoreProvider from "./StoreProvider";
import { Raleway } from "next/font/google";
import { Metadata } from "next";
import MiniCart from "./components/MiniCart";

const josefin = Raleway({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  authors: [{ name: "Wentao Lin" }],
  keywords:
    "Autopile, Auto Parts, Automotive Parts, Automotive Accessories, Automotive Services, Automotive Parts Online, Automotive Parts Store, Automotive Parts Supplier, Automotive Parts Wholesaler, Automotive Parts Distributor, Automotive Parts Manufacturer, Automotive Parts Retailer, Automotive Parts Supplier, Automotive Parts Wholesaler, Autom",
  title: {
    default: "Welcome | Autopile - Auto Parts",
    template: "%s | Autopile - Auto Parts",
  },
  description:
    "Autopile is a leading online retailer of automotive parts, accessories, and services. We offer a wide range of products from leading brands as well as a comprehensive selection of auto parts, accessories, and services.",
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body className={`bg-black text-white  text-base ${josefin.className}`}>
        <StoreProvider>
          {/* make components server components by passing as props */}
          <Header
            advertisement={<Advertisement />}
            premiumArea={<PremiumHeader />}
            aboutUs={<AboutUsHeader />}
          >
            <Info />
            <NavigationSection />
          </Header>
          {children}
          <Footer />
          <MiniCart />
        </StoreProvider>
      </body>
    </html>
  );
}
