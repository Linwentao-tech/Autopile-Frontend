"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/app/_lib/hooks";
import { updateQuantity, removeItem } from "@/app/_lib/features/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";
import getStripe from "@/app/_lib/stripe";

const DELIVERY_FEE = 10;

function MiniCart() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    function () {
      if (cartItems.length > 0) {
        setIsVisible(true);
        startAutoHideTimer();
      }
    },
    [cartItems.length]
  );

  function startAutoHideTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(function () {
      setIsVisible(false);
    }, 3000);
  }

  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function handleMouseLeave() {
    startAutoHideTimer();
  }

  async function handleCheckout() {
    try {
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          deliveryFee: DELIVERY_FEE,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred during checkout");
      }

      const data = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      if (error instanceof Error) {
        setCheckoutError(error.message);
      } else {
        setCheckoutError("An unexpected error occurred");
      }
    }
  }

  function handleQuantityChange(id: string, newQuantity: number) {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeItem(id));
    }
  }

  if (!isVisible || cartItems.length === 0) return null;

  const subtotal = cartItems.reduce(function (total, item) {
    return total + parseFloat(item.price.replace("$", "")) * item.quantity;
  }, 0);

  return (
    <div
      className={`fixed top-20 -right-96 w-96 bg-gray-900 border border-gray-700 rounded-l-lg shadow-xl z-50 transform transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-x-[-384px]" : "translate-x-0"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={function () {
              setIsVisible(false);
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {checkoutError && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
            {checkoutError}
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 mb-4">
          {cartItems.map(function (item) {
            return (
              <div
                key={item.id}
                className="flex items-start gap-4 py-4 border-b border-gray-700"
              >
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-orange-500 mb-2">{item.price}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={function () {
                        handleQuantityChange(item.id, item.quantity - 1);
                      }}
                      className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={function () {
                        handleQuantityChange(item.id, item.quantity + 1);
                      }}
                      className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={function () {
                        dispatch(removeItem(item.id));
                      }}
                      className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-700 pt-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">
              Subtotal ({cartItems.length} items)
            </span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Delivery Fee</span>
            <span className="font-medium">${DELIVERY_FEE.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-gray-700">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">
              ${(subtotal + DELIVERY_FEE).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/cart"
            className="flex-1 bg-white text-black py-2 rounded-full text-center hover:bg-gray-200 transition-colors"
          >
            View Cart
          </Link>
          <button
            onClick={handleCheckout}
            className="flex-1 bg-orange-600 text-white py-2 rounded-full text-center hover:bg-orange-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniCart;
