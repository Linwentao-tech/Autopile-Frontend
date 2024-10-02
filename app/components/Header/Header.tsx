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
  const isReviewsPage: boolean = pathname === "/reviews";
  const isWholesalePage: boolean = pathname === "/category/wholesale";
  const isAboutUsPage: boolean = pathname === "/about-us";
  const isAccessoriesPage: boolean = pathname === "/category/accessories";
  return (
    <div className="relative">
      {isHomePage && (
        <video
          className="w-full h-full object-cover absolute z-0"
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
          alt="background"
          className="w-full h-full object-cover absolute z-0"
          placeholder="blur"
          fill
        />
      )}
      {isAboutUsPage && (
        <Image
          src={aboutUsbackground}
          alt="background"
          className="w-full h-full object-cover object-[center_21%]"
          placeholder="blur"
          fill
          quality={100}
        />
      )}
      {(isReviewsPage ||
        isWholesalePage ||
        isPartsPage ||
        isAccessoriesPage) && (
        <Image
          src={background}
          alt="background"
          className="w-full h-full absolute z-0 filter brightness-200"
          placeholder="blur"
          fill
        />
      )}

      <div className="relative z-10">
        <div className="p-12">{children}</div>
        {isHomePage && advertisement}
        {isPremiumPage && premiumArea}
        {isAboutUsPage && aboutUs}
      </div>
    </div>
  );
}

export default Header;
