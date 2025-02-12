"use client";

import Image from "next/image";
import Link from "next/link";
import { Order, Product } from "../InterfaceType";
import { useEffect, useState } from "react";
import { deleteOrder } from "@/app/actions/order";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
              const map = await getMap(
                `${order.shippingAddress_Line1}, ${order.shippingAddress_City}, ${order.shippingAddress_State}, ${order.shippingAddress_Country}`
              );
              if (map.success && map.data) {
                return { ...order, map: map.data };
              }
              console.error("Map data not available for order:", order.id);
              return order;
            } catch (error) {
              console.error("Error fetching map for order:", order.id, error);
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
      if (result.success) {
        showToast.success("Order deleted successfully");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        updateOrder(processedOrders.filter((order) => order.id !== orderId));
        router.refresh();
      } else {
        showToast.error("Failed to delete order");
      }
    } catch {
      showToast.error("Error deleting order");
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
        return <span className="text-yellow-500">Pending Payment</span>;
      case "completed":
        return <span className="text-green-500">Completed</span>;
      case "cancelled":
        return <span className="text-red-500">Cancelled</span>;
      default:
        return <span className="text-zinc-400">{status}</span>;
    }
  };

  function renderMap(map: { lon: number; lat: number }) {
    if (!map || !map.lat || !map.lon) {
      return (
        <div className="h-[300px] w-full rounded-lg overflow-hidden flex items-center justify-center bg-zinc-800">
          <p className="text-zinc-400">Map coordinates unavailable</p>
        </div>
      );
    }

    return (
      <div className="h-[300px] w-full rounded-lg overflow-hidden">
        <Map center={[map.lat, map.lon]} />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {processedOrders.map((order) => (
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
                  <div className="flex items-center gap-2">
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
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      disabled={isDeleting === order.id}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting === order.id ? (
                        <span>Deleting...</span>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Delete Order
                        </>
                      )}
                    </button>
                  </div>
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
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-zinc-800">
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
                <div className="col-span-1">
                  {order.map && !isLoadingMap ? (
                    renderMap(order.map)
                  ) : (
                    <div className="h-[300px] w-full rounded-lg overflow-hidden flex items-center justify-center bg-zinc-800">
                      <p className="text-zinc-400">
                        {isLoadingMap ? "Loading map..." : "Map unavailable"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
