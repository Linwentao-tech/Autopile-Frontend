import Link from "next/link";

function Navigation() {
  return (
    <nav>
      <ul className="flex space-x-4 ">
        <li>
          <Link
            href="/parts"
            className="hover:text-orange-500 transition-colors duration-500 "
          >
            Shop Parts
          </Link>
        </li>
        <li>
          <Link
            href="/wholesale"
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
            href="/premium"
            className="hover:text-orange-500 transition-colors duration-500 "
          >
            Premium Area
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
