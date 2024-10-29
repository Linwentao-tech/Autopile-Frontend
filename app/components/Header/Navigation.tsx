import { auth } from "@/app/auth";
import Link from "next/link";

async function Navigation() {
  const session = await auth();
  return (
    <nav>
      <ul className="flex space-x-4 ">
        <li>
          <Link
            href="/category/all-products"
            className="hover:text-orange-500 transition-colors duration-500 "
          >
            Shop Parts
          </Link>
        </li>
        <li>
          <Link
            href="/category/wholesale"
            className="hover:text-orange-500 transition-colors duration-500 "
          >
            Wholesale
          </Link>
        </li>
        <li>
          <Link
            href="/reviews"
            className="hover:text-orange-500 transition-colors duration-500 "
          >
            Reviews
          </Link>
        </li>
        <li>
          <Link
            href="/premium-area"
            className="hover:text-orange-500 transition-colors duration-500 "
          >
            Premium Area
          </Link>
        </li>
        {session && (
          <li>
            <Link
              href="/dashboard"
              className="hover:text-orange-500 transition-colors duration-500 "
            >
              Dashboard
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
