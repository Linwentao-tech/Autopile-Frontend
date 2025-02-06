"use client";

import { useEffect, useState } from "react";
import { getOrder } from "@/app/actions/order";
import { showToast } from "../ToastMessage";
import { getProducts } from "@/app/actions/getProducts";
import Image from "next/image";
import OrderSummary from "./OrderSummary";
import Link from "next/link";

interface OrderItem {
  productId: string;
  quantity: number;
}

interface Order {
  id: number;
  userId: string;
  orderNumber: string;
  orderDate: string;
  status: number;
  subTotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  stripeSessionId: string | null;
  shippingAddress_Line1: string;
  shippingAddress_Line2: string;
  shippingAddress_City: string;
  shippingAddress_Country: string;
  shippingAddress_State: string;
  shippingAddress_PostalCode: string;
  orderItems: OrderItem[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  productMedias: {
    fullUrl: string;
  }[];
}

export default function OrderTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [orderResponse, productsResponse] = await Promise.all([
          getOrder(),
          getProducts(),
        ]);
        console.log(orderResponse);

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

  const getProductDetails = (productId: string) => {
    return products.find((product) => product.id === productId);
  };

  const getPaymentStatusDisplay = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <span className="text-yellow-500">Pending Payment</span>;
      case "paid":
        return <span className="text-green-500">Paid</span>;
      case "failed":
        return <span className="text-red-500">Failed</span>;
      default:
        return <span className="text-zinc-400">{status}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-white">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-medium text-white mb-2">No Orders Yet</h3>
          <p className="text-zinc-400">You have not placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrderSummary orders={orders} />

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium text-white">
                  {order.orderNumber}
                </h3>
                <p className="text-zinc-400">
                  {new Date(order.orderDate).toLocaleDateString()}{" "}
                  {new Date(order.orderDate).toLocaleTimeString()}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-zinc-400">
                    Status: {getPaymentStatusDisplay(order.paymentStatus)}
                  </p>
                  {order.paymentStatus.toLowerCase() === "pending" && (
                    <Link
                      href={`/payment?order=${order.orderNumber}`}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-full transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Complete Payment
                    </Link>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
                <p className="text-zinc-400">
                  Subtotal: ${order.subTotal.toFixed(2)}
                </p>
                <p className="text-zinc-400">
                  Delivery Fee: ${order.deliveryFee.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <div className="grid gap-6">
                <div className="space-y-4">
                  {order.orderItems.map((item) => {
                    const product = getProductDetails(item.productId);
                    return (
                      <div
                        key={item.productId}
                        className="flex items-center gap-4 bg-black/20 p-4 rounded-lg"
                      >
                        {product && (
                          <>
                            <div className="w-16 h-16 relative flex-shrink-0">
                              <Image
                                src={product.productMedias[0].fullUrl}
                                alt={product.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium truncate">
                                {product.name}
                              </h4>
                              <p className="text-zinc-400">
                                Quantity: {item.quantity}
                              </p>
                              <p className="text-white">
                                ${(product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">
                      Shipping Address
                    </h4>
                    <div className="text-white space-y-1">
                      <p>{order.shippingAddress_Line1}</p>
                      {order.shippingAddress_Line2 && (
                        <p>{order.shippingAddress_Line2}</p>
                      )}
                      <p>
                        {order.shippingAddress_City},{" "}
                        {order.shippingAddress_State}{" "}
                        {order.shippingAddress_PostalCode}
                      </p>
                      <p>{order.shippingAddress_Country}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">
                      Payment Method
                    </h4>
                    <p className="text-white">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
