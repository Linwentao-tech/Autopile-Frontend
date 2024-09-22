import Link from "next/link";
import React from "react";
import { type SvgLogoProps } from "../InterfaceType";

function SvgLogo({ width, height }: SvgLogoProps) {
  return (
    <Link href="/" className="flex items-center space-x-2 text-base">
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox="10 55 180 90"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Logo"
        className="fill-current text-white"
      >
        <g>
          <path d="M55 122.5c0 12.426-10.074 22.5-22.5 22.5S10 134.926 10 122.5 20.074 100 32.5 100 55 110.074 55 122.5z" />
          <path d="M167.5 100c-21.039 0-22.501-17.017-22.525-21.453.016-.347.025-.696.025-1.047 0-12.426-10.074-22.5-22.5-22.5h-45C65.074 55 55 65.074 55 77.5S65.074 100 77.5 100h45c20.596 0 22.58 14.832 22.597 20.411A22.889 22.889 0 0 0 145 122.5c0 12.426 10.074 22.5 22.5 22.5s22.5-10.074 22.5-22.5-10.074-22.5-22.5-22.5z" />
        </g>
      </svg>
      <p className="font-semibold">autopile</p>
    </Link>
  );
}

export default SvgLogo;
