import Link from "next/link";

function DashboardNav() {
  return (
    <div>
      <nav className="inline-flex flex-col space-y-10 text-2xl">
        <Link
          href="/dashboard/overview"
          className="hover:opacity-65 border border-spacing-20 border-gray-300 p-4 rounded-lg"
        >
          Overview
        </Link>
        <Link
          href="/dashboard/orders"
          className="hover:opacity-65 border border-spacing-20 border-gray-300 p-4 rounded-lg"
        >
          Orders
        </Link>
        <Link
          href="/dashboard/profile"
          className="hover:opacity-65 border border-spacing-20 border-gray-300 p-4 rounded-lg"
        >
          Profile
        </Link>
      </nav>
    </div>
  );
}

export default DashboardNav;
