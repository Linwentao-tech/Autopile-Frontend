"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { type ChildrenProps } from "../InterfaceType";

interface HeaderProps extends ChildrenProps {
  advertisement: React.ReactNode;
}

function Header({ children, advertisement }: HeaderProps) {
  const pathname: string = usePathname();
  const isHomePage: boolean = pathname === "/";

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
      <div className="relative z-10">
        <div className="p-12">{children}</div>
        {isHomePage && advertisement}
      </div>
    </div>
  );
}

export default Header;
