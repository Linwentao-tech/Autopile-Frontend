import Link from "next/link";
import DashboardLink from "../Dashboardpage/DashboardLink";

async function Navigation() {
  return (
    <nav>
      <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:space-x-4 md:space-x-6 lg:space-x-8 text-base lg:text-lg">
        <li className="w-full sm:w-auto text-center">
          <Link
            href="/category/all-products"
            className="block hover:text-orange-500 transition-colors duration-500 "
          >
            Shop Parts
          </Link>
        </li>
        <li>
          <Link
            href="/category/wholesale"
            className="block hover:text-orange-500 transition-colors duration-500 "
          >
            Wholesale
          </Link>
        </li>

        <li>
          <Link
            href="/premium-area"
            className="block hover:text-orange-500 transition-colors duration-500 "
          >
            Premium Area
          </Link>
        </li>
        <li>
          <Link
            href="/about-us"
            className="block hover:text-orange-500 transition-colors duration-500 "
          >
            About Us
          </Link>
        </li>
        <li>
          <DashboardLink className="block hover:text-orange-500 transition-colors duration-500 text-sm md:text-base" />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
