"use client";
import { usePathname } from "next/navigation";
import { type ChildrenProps } from "../InterfaceType";

function Header({ children }: ChildrenProps) {
  const pathname: string = usePathname();
  const isHomePage: boolean = pathname === "/";

  return (
    <div className="relative">
      {isHomePage && (
        <video
          className="w-full h-full  object-cover absolute z-0 "
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
        <div className="p-4">{children}</div>
        {isHomePage && <div>This is homepage content</div>}
      </div>
    </div>
  );
}

export default Header;
