"use client";

import OrderTab from "./OrderTab";

export default function DashboardContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="bg-zinc-900 rounded-lg sm:rounded-xl overflow-hidden border border-zinc-800">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-10">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Dashboard
            </h1>
          </div>
          <OrderTab />
        </div>
      </div>
    </div>
  );
}
