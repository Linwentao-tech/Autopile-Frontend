"use client";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { type ChildrenProps } from "../InterfaceType";
import PremiumPageBackGround from "@/public/PremiumAreaBackground.jpg";
import Image from "next/image";
import background from "@/public/background.png";
import aboutUsbackground from "@/public/about-us-header.jpg";

interface HeaderProps extends ChildrenProps {
  advertisement: ReactNode;
  premiumArea: ReactNode;
  aboutUs: ReactNode;
}

function Header({
  children,
  advertisement,
  premiumArea,
  aboutUs,
}: HeaderProps) {
  const pathname: string = usePathname();
  const isHomePage: boolean = pathname === "/";
  const isPremiumPage: boolean = pathname === "/premium-area";
  const isPartsPage: boolean = pathname === "/category/all-products";
  const isWholesalePage: boolean = pathname === "/category/wholesale";
  const isAboutUsPage: boolean = pathname === "/about-us";
  const isAccessoriesPage: boolean = pathname === "/category/accessories";
  const isBestSellersPage: boolean = pathname === "/category/best-seller";
  const isEnginePage: boolean = pathname === "/category/engine";
  const isVehiclePage: boolean = pathname === "/category/vehicle-body-parts";
  const isWheelsPage: boolean = pathname === "/category/wheels-and-rims";
  const isCartPage: boolean = pathname === "/cart";
  const isDashboardPage: boolean = pathname === "/dashboard";
  return (
    <div className="relative ">
      {isHomePage && (
        <video
          className="w-full  object-cover absolute z-0 h-screen md:h-full lg:h-full"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {isPremiumPage && (
        <Image
          src={PremiumPageBackGround}
          alt="Premium area background"
          className="w-screen h-full object-cover absolute z-0"
          fill
          loading="lazy"
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIyMjIiLz48L3N2Zz4="
        />
      )}
      {isAboutUsPage && (
        <Image
          src={aboutUsbackground}
          alt="About us background"
          className="w-screen h-full object-cover object-[center_21%]"
          fill
          loading="eager"
          sizes="100vw"
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIyMjIiLz48L3N2Zz4="
        />
      )}
      {(isWholesalePage ||
        isPartsPage ||
        isAccessoriesPage ||
        isBestSellersPage ||
        isEnginePage ||
        isVehiclePage ||
        isWheelsPage ||
        isCartPage ||
        isDashboardPage) && (
        <Image
          src={background}
          alt="Category background"
          className="w-screen h-full absolute z-0 filter brightness-200"
          fill
          priority
          sizes="100vw"
          quality={75}
        />
      )}

      <div className="relative z-10 ">
        <div className="p-7 md:p-9 lg:p-12">{children}</div>
        {isHomePage && advertisement}
        {isPremiumPage && premiumArea}
        {isAboutUsPage && aboutUs}
      </div>
    </div>
  );
}

export default Header;
