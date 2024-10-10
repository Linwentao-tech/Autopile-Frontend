"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../_lib/hooks";
import { updateQuantity, removeItem } from "../_lib/features/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";
import CartWarning from "../components/CartWarming";
import Button from "../components/Button";
import getStripe from "@/app/_lib/stripe";

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

const GST_RATE = 0.13; // 13% GST
const DELIVERY_FEE = 10; // $10 delivery fee

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items) as CartItem[];
  const dispatch = useAppDispatch();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const parsePrice = (price: string): number => {
    return parseFloat(price.replace("$", ""));
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + parsePrice(item.price) * item.quantity;
  }, 0);

  const gstAmount = subtotal * GST_RATE;
  const totalWithGST = subtotal + gstAmount;
  const totalWithDelivery = totalWithGST + DELIVERY_FEE;

  const handleCheckout = async () => {
    setCheckoutError(null);
    const stripe = await getStripe();

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          gstAmount,
          deliveryFee: DELIVERY_FEE,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred during checkout");
      }

      const data = await response.json();
      const result = await stripe?.redirectToCheckout({ sessionId: data.id });

      if (result?.error) {
        throw new Error(result.error.message);
      }
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      if (error instanceof Error) {
        setCheckoutError(error.message);
      } else {
        setCheckoutError("An unexpected error occurred");
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-4xl font-extrabold mb-4">My cart</h1>
        <p className="text-lg ">
          Your cart is empty.{" "}
          <Link
            href="/category/all-products"
            className="text-orange-500 hover:underline"
          >
            Continue shopping
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <CartWarning />
      <div className="container mx-auto px-4 py-8 text-white">
        {checkoutError && (
          <div className="bg-red-500 text-white p-4 mb-4 rounded">
            Error: {checkoutError}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h1 className="text-2xl font-bold mb-6">My cart</h1>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b border-gray-700 py-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-400">{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="bg-gray-800 text-white px-2 py-1"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="bg-gray-800 text-white px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-semibold">
                    ${(parsePrice(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-gray-400 hover:text-red-500"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <Button type="clear_cart">Clear Cart</Button>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Order summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST ({(GST_RATE * 100).toFixed(0)}%)</span>
                  <span>${gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${DELIVERY_FEE.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                Proceed to Checkout
              </button>
              <div className="flex justify-center items-center mt-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
