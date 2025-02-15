"use client";

import Image from "next/image";
import Link from "next/link";
import { Order, Product } from "../InterfaceType";
import { useEffect, useState } from "react";
import { deleteOrder } from "@/app/actions/order";
import { showToast } from "../ToastMessage";
import dynamic from "next/dynamic";
import { getMap } from "@/app/actions/map";

const Map = dynamic(() => import("../Map"), {
  loading: () => (
    <div className="h-[300px] w-full rounded-lg overflow-hidden flex items-center justify-center bg-zinc-800">
      <p className="text-zinc-400">{"Loading map..."}</p>
    </div>
  ),
  ssr: false,
});

export default function OrderCard({
  orders,
  updateOrder,
  products,
}: {
  orders: Order[];
  updateOrder: (newOrders: Order[]) => void;
  products: Product[];
}) {
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [processedOrders, setProcessedOrders] = useState<Order[]>(orders);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  useEffect(() => {
    const fetchMap = async () => {
      if (!orders.length) {
        setIsLoadingMap(false);
        return;
      }

      setIsLoadingMap(true);

      try {
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            try {
              const mapData = await getMap(
                `${
                  order.shippingAddress_Line2 || order.shippingAddress_Line1
                }, ${order.shippingAddress_City}, ${
                  order.shippingAddress_State
                }, ${order.shippingAddress_Country}`
              );
              if (mapData.success && mapData.data) {
                return {
                  ...order,
                  map: {
                    lat: mapData.data.lat,
                    lon: mapData.data.lon,
                  },
                };
              }
              return order;
            } catch (error) {
              console.error("Error fetching map for order:", error);
              return order;
            }
          })
        );
        setProcessedOrders(updatedOrders);
      } catch (error) {
        console.error("Error processing orders:", error);
      } finally {
        setIsLoadingMap(false);
      }
    };

    fetchMap();
  }, [orders]);

  const handleDeleteOrder = async (orderId: number) => {
    try {
      setIsDeleting(orderId);
      const result = await deleteOrder(orderId.toString());
      if (result) {
        const updatedOrders = processedOrders.filter(
          (order) => order.id !== orderId
        );
        setProcessedOrders(updatedOrders);
        updateOrder(updatedOrders);
        showToast.success("Order cancelled successfully");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      showToast.error("Failed to cancel order");
    } finally {
      setIsDeleting(null);
    }
  };

  const getProductDetails = (productId: string) => {
    return products.find((product) => product.id === productId);
  };

  const getPaymentStatusDisplay = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "paid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
            Paid
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-red-100 text-red-800">
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
            Completed
          </span>
        );
    }
  };

  function renderMap(map: { lon: number; lat: number }) {
    if (!map) return null;
    return <Map center={[map.lat, map.lon]} />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {processedOrders.map((order) => (
        <div
          key={order.id}
          className="bg-black/20 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden border border-zinc-800"
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                  Order #{order.orderNumber}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 mt-1">
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                {getPaymentStatusDisplay(order.paymentStatus)}
                {order.paymentStatus === "Pending" && (
                  <>
                    <Link
                      href={`/payment?order=${order.orderNumber}`}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                      Pay Now
                    </Link>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      disabled={isDeleting === order.id}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isDeleting === order.id ? "Cancelling..." : "Cancel"}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">
                    Shipping Address
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-300">
                    {order.shippingAddress_Line1}
                    {order.shippingAddress_Line2 && (
                      <>, {order.shippingAddress_Line2}</>
                    )}
                    <br />
                    {order.shippingAddress_City}, {order.shippingAddress_State}
                    <br />
                    {order.shippingAddress_PostalCode}
                    <br />
                    {order.shippingAddress_Country}
                  </p>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">
                    Order Items
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    {order.orderItems.map((item) => {
                      const product = getProductDetails(item.productId);
                      return (
                        <div
                          key={item.productId}
                          className="flex items-center gap-3 sm:gap-4 bg-black/20 p-3 sm:p-4 rounded-lg"
                        >
                          {product && (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex-shrink-0">
                              <Image
                                src={product.productMedias[0].fullUrl}
                                alt={product.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base font-medium text-white truncate">
                              {product ? product.name : "Product not found"}
                            </p>
                            <p className="text-xs sm:text-sm text-zinc-400">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-sm sm:text-base text-zinc-400">
                    <span>Subtotal</span>
                    <span>${order.subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-zinc-400">
                    <span>Delivery Fee</span>
                    <span>${order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base sm:text-lg font-medium text-white pt-2 border-t border-zinc-800">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="h-[300px] sm:h-[400px] lg:h-[500px] bg-zinc-800 rounded-lg overflow-hidden">
                {isLoadingMap ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-zinc-400 animate-pulse">
                      Loading map...
                    </p>
                  </div>
                ) : order.map ? (
                  renderMap(order.map)
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-zinc-400">Map not available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
