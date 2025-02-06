"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { CartItem, Product } from "../InterfaceType";
import {
  updateShoppingCartItem,
  deleteShoppingCartItem,
  clearShoppingCart,
} from "@/app/actions/shoppingCartItem";
import { showToast } from "../ToastMessage";

function formatProductName(productName: string) {
  return productName
    .toLowerCase()
    .split(" ")
    .filter((word) => word.trim() !== "")
    .join("-");
}

export default function CartTable({
  products,
  cartItems: initialCartItems,
}: {
  products: Product[];
  cartItems: CartItem[];
}) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    initialCartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as { [key: number]: number })
  );

  const [isUpdating, setIsUpdating] = useState<{ [key: number]: boolean }>({});

  // Keep track of the last updated quantities to compare
  const [lastUpdatedQuantities, setLastUpdatedQuantities] = useState<{
    [key: number]: number;
  }>(
    initialCartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as { [key: number]: number })
  );

  useEffect(() => {
    const updateQuantities = async () => {
      for (const item of cartItems) {
        const newQuantity = quantities[item.id];
        const lastQuantity = lastUpdatedQuantities[item.id];

        // Only update if quantity has changed and not already updating
        if (newQuantity !== lastQuantity && !isUpdating[item.id]) {
          setIsUpdating((prev) => ({ ...prev, [item.id]: true }));

          try {
            if (newQuantity === 0) {
              const result = await deleteShoppingCartItem(item.id.toString());
              if (result?.success) {
                showToast.success("Item removed from cart");
                // Remove item from frontend state
                setCartItems((prev) =>
                  prev.filter((cartItem) => cartItem.id !== item.id)
                );
              } else {
                showToast.error("Failed to remove item");
                setQuantities((prev) => ({
                  ...prev,
                  [item.id]: lastQuantity,
                }));
              }
            } else {
              const result = await updateShoppingCartItem(
                item.id.toString(),
                newQuantity
              );

              if (result?.success) {
                showToast.success("Cart updated successfully");
                setLastUpdatedQuantities((prev) => ({
                  ...prev,
                  [item.id]: newQuantity,
                }));
              } else {
                showToast.error("Failed to update cart");
                setQuantities((prev) => ({
                  ...prev,
                  [item.id]: lastQuantity,
                }));
              }
            }
          } catch {
            showToast.error("Failed to update cart");
            setQuantities((prev) => ({
              ...prev,
              [item.id]: lastQuantity,
            }));
          } finally {
            setIsUpdating((prev) => ({ ...prev, [item.id]: false }));
          }
        }
      }
    };

    updateQuantities();
  }, [quantities, cartItems, isUpdating, lastUpdatedQuantities]);

  const getProductDetails = (productId: string) => {
    return products.find((product) => product.id === productId);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-pulse"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-24 h-24 text-orange-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-zinc-400 mb-8 max-w-md">
          Looks like you have not added anything to your cart yet. Explore our
          products and find something you love.
        </p>
        <Link
          href="/category/all-products"
          className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-full 
                   hover:from-orange-700 hover:to-orange-800 transition-all duration-300 
                   shadow-lg hover:shadow-orange-500/20"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        <div className="flex items-center gap-4">
          <p className="text-zinc-400">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
          <button
            onClick={async () => {
              try {
                const result = await clearShoppingCart();
                if (result?.success) {
                  showToast.success("Cart cleared successfully");
                  setCartItems([]);
                } else {
                  showToast.error("Failed to clear cart");
                }
              } catch {
                showToast.error("Failed to clear cart");
              }
            }}
            className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 
                     rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Clear Cart
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
        {cartItems.map((item, index) => {
          const product = getProductDetails(item.productId.toString());
          if (!product) return null;

          const price = product.comparePrice || product.price;
          const total = price * quantities[item.id];

          return (
            <div
              key={item.id}
              className={`flex items-center gap-6 p-6 hover:bg-zinc-800/50 transition-colors duration-300
                      ${
                        index !== cartItems.length - 1
                          ? "border-b border-zinc-800"
                          : ""
                      }`}
            >
              {/* Product Image */}
              <Link
                href={`/product-page/${formatProductName(product.name)}`}
                className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg border border-zinc-700 hover:border-orange-500 transition-colors duration-300"
              >
                <Image
                  src={product.productMedias[0].fullUrl}
                  alt={product.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover object-center hover:scale-110 transition-transform duration-300"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-1 min-w-0 flex items-center justify-between gap-6">
                <div>
                  <Link
                    href={`/product-page/${formatProductName(product.name)}`}
                    className="text-lg font-medium text-white hover:text-orange-500 transition-colors duration-300"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-400">Price:</span>
                      <span className="text-white">${price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-400">Total:</span>
                      <span className="text-white font-medium">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={quantities[item.id]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 0 && value <= 10) {
                        setQuantities({
                          ...quantities,
                          [item.id]: value,
                        });
                      }
                    }}
                    min="0"
                    max="10"
                    className="w-16 text-white px-2 py-1 bg-black border border-zinc-700 rounded-lg 
                             hover:border-orange-500 focus:border-orange-500 focus:outline-none
                             transition-colors duration-300"
                  />
                  <button
                    onClick={() =>
                      setQuantities({
                        ...quantities,
                        [item.id]: 0,
                      })
                    }
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="mt-8 flex justify-end">
        <Link
          href="/checkout"
          className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 
                   hover:from-orange-700 hover:to-orange-800 text-white font-medium rounded-lg 
                   transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
        >
          Continue to Checkout
        </Link>
      </div>
    </div>
  );
}
