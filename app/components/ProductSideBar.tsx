"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PriceRangeComponent from "./SideBarExpand";

function ProductSideBar() {
  const pathname = usePathname();

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
    <div>
      <h2 className="text-xl">Browse by</h2>
      <hr className="border border-gray-600 my-4 w-56" />
      <ul className="text-md space-y-1.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:opacity-60 ${
                pathname === link.href ? "text-orange-500 underline" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="text-xl mt-10">Filter by</h2>
      <hr className="border border-gray-600 my-4 w-56" />
      <PriceRangeComponent />
    </div>
  );
}

export default ProductSideBar;
