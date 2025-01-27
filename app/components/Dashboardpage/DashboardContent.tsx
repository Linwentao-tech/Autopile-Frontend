import Link from "next/link";

export default function DashboardContent() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-start">
      <div className="w-full mx-auto px-12 max-w-screen-2xl">
        <div className="my-6">
          <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
            <div className="flex flex-row">
              {/* Left Sidebar */}
              <aside className="w-[250px] shrink-0">
                <nav className="py-4">
                  <div className="space-y-1">
                    <Link
                      href="/dashboard"
                      className="flex items-center px-6 py-3 text-sm font-medium bg-orange-600 text-white"
                    >
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Overview
                    </Link>

                    <Link
                      href="/inventory"
                      className="flex items-center px-6 py-3 text-sm font-medium text-gray-400 hover:bg-zinc-800 hover:text-white"
                    >
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      Inventory
                    </Link>

                    <Link
                      href="/sales"
                      className="flex items-center px-6 py-3 text-sm font-medium text-gray-400 hover:bg-zinc-800 hover:text-white"
                    >
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Sales
                    </Link>

                    <Link
                      href="/reports"
                      className="flex items-center px-6 py-3 text-sm font-medium text-gray-400 hover:bg-zinc-800 hover:text-white"
                    >
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Reports
                    </Link>
                  </div>
                </nav>
              </aside>

              {/* Main Content */}
              <main className="flex-1 p-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Total Sales Card */}
                  <div className="bg-[#2A2A2A] rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-orange-600">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-400">
                          Total Sales
                        </p>
                        <p className="text-2xl font-semibold text-white mt-1">
                          $24,000
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Inventory Items Card */}
                  <div className="bg-[#2A2A2A] rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-orange-600">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-400">
                          Inventory Items
                        </p>
                        <p className="text-2xl font-semibold text-white mt-1">
                          156
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Active Users Card */}
                  <div className="bg-[#2A2A2A] rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-orange-600">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-400">
                          Active Users
                        </p>
                        <p className="text-2xl font-semibold text-white mt-1">
                          23
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                  <h2 className="text-lg font-medium text-white mb-4">
                    Recent Activity
                  </h2>
                  <div className="bg-[#2A2A2A] rounded-lg">
                    <ul className="divide-y divide-gray-800">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <li key={item} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-orange-500">
                              New sale completed
                            </p>
                            <span className="px-2 py-1 text-xs font-medium text-green-400 bg-[#1A1A1A] rounded-full">
                              Completed
                            </span>
                          </div>
                          <div className="mt-2 flex justify-between text-sm text-gray-400">
                            <p>Order #12345</p>
                            <p>2 hours ago</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
