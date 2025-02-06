"use client";

import OrderTab from "./OrderTab";

export default function DashboardContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          </div>
          <OrderTab />
        </div>
      </div>
    </div>
  );
}
