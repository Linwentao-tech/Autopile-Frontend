"use client";

import { useEffect, useState } from "react";
import { getOrder } from "@/app/actions/order";
import { showToast } from "../ToastMessage";
import { getProducts } from "@/app/actions/getProducts";

import OrderSummary from "./OrderSummary";

import type { Product, Order } from "../InterfaceType";
import OrderCard from "./OrderCard";

export default function OrderTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateOrder = (newOrders: Order[]) => {
    setOrders(newOrders);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [orderResponse, productsResponse] = await Promise.all([
          getOrder(),
          getProducts(),
        ]);
        if (orderResponse?.success) {
          setOrders(orderResponse.data);
        } else {
          showToast.error("Failed to fetch orders");
        }
        if (productsResponse) {
          setProducts(productsResponse);
        }
      } catch {
        showToast.error("Error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-white text-base sm:text-lg animate-pulse">
          Loading orders...
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-2 sm:space-y-3">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-white">
            No Orders Yet
          </h3>
          <p className="text-sm sm:text-base text-zinc-400">
            You have not placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      <OrderSummary orders={orders} />
      <OrderCard
        orders={orders}
        updateOrder={updateOrder}
        products={products}
      />
    </div>
  );
}
