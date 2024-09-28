"use client";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { type ChildrenProps } from "../InterfaceType";
import PremiumPageBackGround from "@/public/PremiumAreaBackground.jpg";
import Image from "next/image";
import background from "@/public/background.png";

interface HeaderProps extends ChildrenProps {
  advertisement: ReactNode;
  premiumArea: ReactNode;
}

function Header({ children, advertisement, premiumArea }: HeaderProps) {
  const pathname: string = usePathname();
  const isHomePage: boolean = pathname === "/";
  const isPremiumPage: boolean = pathname === "/premium";
  const isPartsPage: boolean = pathname === "/parts";
  const isReviewsPage: boolean = pathname === "/reviews";
  const isWholesalePage: boolean = pathname === "/wholesale";
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
      {(isReviewsPage || isWholesalePage || isPartsPage) && (
        <Image
          src={background}
          alt="background"
          className="w-full h-full object-cover absolute z-0 filter brightness-200 "
          placeholder="blur"
          fill
        />
      )}

      <div className="relative z-10">
        <div className="p-12">{children}</div>
        {isHomePage && advertisement}
        {isPremiumPage && premiumArea}
      </div>
    </div>
  );
}

export default Header;
