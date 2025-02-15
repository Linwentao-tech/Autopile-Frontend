"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PriceRangeComponent from "./SideBarExpand";
import { useState } from "react";

function ProductSideBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { href: "/category/all-products", label: "All Products" },
    { href: "/category/accessories", label: "Accessories" },
    { href: "/category/best-seller", label: "Best Seller" },
    { href: "/category/engine", label: "Engine" },
    { href: "/category/vehicle-body-parts", label: "Vehicle Body Parts" },
    { href: "/category/wheels-and-rims", label: "Wheels & Rims" },
    { href: "/category/wholesale", label: "Wholesale" },
  ];

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between lg:hidden p-4 border-b border-zinc-800"
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
          <span className="font-medium text-lg">Filters & Categories</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Sidebar Content */}
      <div
        className={`
    transition-all duration-1000 ease-in-out
    ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
    lg:block lg:max-h-none lg:opacity-100 p-4 sm:p-5 lg:p-6 space-y-8
  `}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-medium text-white flex items-center gap-2 text-center lg:text-left justify-center lg:justify-start">
            <span>Browse Categories</span>
          </h2>
          <hr className="border-t border-zinc-700 my-4" />
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 px-3 rounded-md transition-all duration-200 hover:bg-zinc-800 text-center lg:text-left ${
                    pathname === link.href
                      ? "bg-orange-500/10 text-orange-500 font-medium"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-medium text-white flex items-center gap-2 text-center lg:text-left justify-center lg:justify-start">
            <span>Filter Options</span>
          </h2>
          <hr className="border-t border-zinc-700 my-4" />
          <div className="bg-zinc-800/50 rounded-md p-4">
            <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[220px] mx-auto">
              <PriceRangeComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSideBar;
