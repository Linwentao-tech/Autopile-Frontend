import Advertisement from "./components/Header/Advertisement";
import Header from "./components/Header/Header";
import Info from "./components/Header/Info";
import NavigationSection from "./components/Header/NavigationSection";
import { type ChildrenProps } from "./components/InterfaceType";
import "./globals.css";

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body className="bg-black text-white  text-base">
        {/* make components server components by passing as props */}
        <Header advertisement={<Advertisement />}>
          <Info />
          <NavigationSection />
        </Header>
        {children}
      </body>
    </html>
  );
}
