"use client";

import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ZAxis,
} from "recharts";

interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  subTotal: number;
  paymentStatus: string;
}

interface ScatterData {
  x: number;
  y: number;
  z: number;
  date: string;
  orderNumber: string;
}

interface OrderSummaryProps {
  orders: Order[];
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ScatterData;
  }>;
}

export default function OrderSummary({ orders }: OrderSummaryProps) {
  const stats = useMemo(() => {
    const total = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const average = total / (orders.length || 1);

    const scatterData = orders.map((order) => ({
      x: new Date(order.orderDate).getTime(),
      y: order.totalAmount,
      z: order.subTotal / 100,
      date: new Date(order.orderDate).toLocaleDateString(),
      orderNumber: order.orderNumber,
    }));

    return {
      totalOrders: orders.length,
      totalSpent: total.toFixed(2),
      averageOrder: average.toFixed(2),
      scatterData,
    };
  }, [orders]);

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-900 p-3 border border-zinc-800 rounded-lg shadow-lg">
          <p className="text-white mb-1">{data.orderNumber}</p>
          <p className="text-orange-500">Amount: ${data.y.toFixed(2)}</p>
          <p className="text-zinc-400">Date: {data.date}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 mb-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/20 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium mb-2">
            Total Orders
          </h3>
          <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
        </div>
        <div className="bg-black/20 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium mb-2">
            Total Spent
          </h3>
          <p className="text-3xl font-bold text-white">${stats.totalSpent}</p>
        </div>
        <div className="bg-black/20 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium mb-2">
            Average Order
          </h3>
          <p className="text-3xl font-bold text-white">${stats.averageOrder}</p>
        </div>
      </div>

      {/* Scatter Plot */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-zinc-400 text-sm font-medium mb-4">
          Order Distribution
        </h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis
                dataKey="x"
                type="number"
                domain={["auto", "auto"]}
                name="Date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                stroke="#71717a"
                fontSize={12}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis
                dataKey="y"
                type="number"
                name="Amount"
                stroke="#71717a"
                fontSize={12}
                tickFormatter={(value: number) => `$${value}`}
              />
              <ZAxis dataKey="z" range={[50, 200]} name="Size" />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                data={stats.scatterData}
                fill="#ea580c"
                fillOpacity={0.6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
