"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { showToast } from "../ToastMessage";
import { useState, useEffect } from "react";
import { getProducts } from "@/app/actions/getProducts";
import {
  clearShoppingCart,
  getShoppingCartItems,
} from "@/app/actions/shoppingCartItem";
import { CartItem, Product } from "../InterfaceType";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "@/app/actions/order";

const VALID_PAYMENT_METHODS = ["Credit Card"] as const;
type PaymentMethod = (typeof VALID_PAYMENT_METHODS)[number];

const checkoutSchema = z.object({
  paymentMethod: z
    .string()
    .min(1, "Payment method is required")
    .max(50, "Payment method cannot exceed 50 characters")
    .refine(
      (val): val is PaymentMethod =>
        VALID_PAYMENT_METHODS.includes(val as PaymentMethod),
      {
        message:
          "Invalid payment method. Must be one of: Credit Card, PayPal, Stripe",
      }
    ),
  shippingAddress_Line1: z
    .string()
    .min(1, "Shipping address line 1 is required")
    .max(100, "Address line 1 cannot exceed 100 characters"),
  shippingAddress_Line2: z
    .string()
    .max(100, "Address line 2 cannot exceed 100 characters")
    .optional(),
  shippingAddress_City: z
    .string()
    .min(1, "City is required")
    .max(100, "City cannot exceed 100 characters"),
  shippingAddress_Country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country cannot exceed 100 characters"),
  shippingAddress_State: z
    .string()
    .min(1, "State is required")
    .max(100, "State cannot exceed 100 characters"),
  shippingAddress_PostalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(20, "Postal code cannot exceed 20 characters")
    .regex(
      /^[A-Za-z0-9\s-]+$/,
      "Postal code can only contain letters, numbers, spaces, and hyphens"
    ),
  deliveryFee: z.number(),
  orderItems: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    })
  ),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cartData, productsData] = await Promise.all([
          getShoppingCartItems(),
          getProducts(),
        ]);
        console.log(cartData);
        setCartItems(cartData);
        setProducts(productsData);
      } catch {
        showToast.error("Failed to load cart items");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const getProductDetails = (productId: string) => {
    return products.find((product) => product.id === productId);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductDetails(item.productId.toString());
      if (product) {
        return total + (product.comparePrice || product.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const DELIVERY_FEE = 10;
  const subtotal = calculateSubtotal();
  const total = subtotal + DELIVERY_FEE;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "Credit Card",
      shippingAddress_Line1: "",
      shippingAddress_Line2: "",
      shippingAddress_City: "",
      shippingAddress_Country: "",
      shippingAddress_State: "",
      shippingAddress_PostalCode: "",
      deliveryFee: DELIVERY_FEE,
      orderItems: cartItems.map((item) => ({
        productId: item.productId.toString(),
        quantity: item.quantity,
      })),
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const orderData = {
        ...data,
        orderItems: cartItems.map((item) => ({
          productId: item.productId.toString(),
          quantity: item.quantity,
        })),
      };

      const response = await createOrder(orderData);

      if (!response.success) {
        throw new Error(response.message);
      }

      showToast.success("Order placed successfully!");
      await clearShoppingCart();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push(`/payment?order=${response.data.orderNumber}`);
    } catch (error) {
      console.error("Error creating order:", error);
      showToast.error(
        error instanceof Error ? error.message : "Please try again"
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-white">Your cart is empty</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
        <Link
          href="/cart"
          className="flex items-center gap-2 px-4 py-2 text-white bg-zinc-800 hover:bg-zinc-700 
                   rounded-lg transition-colors duration-300"
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side - Checkout Form */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Payment Method */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h2 className="text-xl font-semibold text-white mb-4">
                Payment Method
              </h2>
              <select
                {...register("paymentMethod")}
                className="w-full bg-black text-white px-4 py-2 rounded-lg border border-zinc-700 
                                 hover:border-orange-500 focus:border-orange-500 focus:outline-none transition-colors"
              >
                <option value="Credit Card">Credit Card</option>
              </select>
              {errors.paymentMethod && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Shipping Address */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h2 className="text-xl font-semibold text-white mb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <input
                    type="text"
                    {...register("shippingAddress_Line1")}
                    placeholder="Address Line 1"
                    className="w-full bg-black text-white px-4 py-2 rounded-lg border border-zinc-700 
                                     hover:border-orange-500 focus:border-orange-500 focus:outline-none transition-colors"
                  />
                  {errors.shippingAddress_Line1 && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.shippingAddress_Line1.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register("shippingAddress_Line2")}
                    placeholder="Address Line 2 (Optional)"
                    className="w-full bg-black text-white px-4 py-2 rounded-lg border border-zinc-700 
                                     hover:border-orange-500 focus:border-orange-500 focus:outline-none transition-colors"
                  />
                  {errors.shippingAddress_Line2 && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.shippingAddress_Line2.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      {...register("shippingAddress_City")}
                      placeholder="City"
                      className="w-full bg-black text-white px-4 py-2 rounded-lg border border-zinc-700 
                                       hover:border-orange-500 focus:border-orange-500 focus:outline-none transition-colors"
                    />
                    {errors.shippingAddress_City && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.shippingAddress_City.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      {...register("shippingAddress_State")}
                      placeholder="State"
                      className="w-full bg-black text-white px-4 py-2 rounded-lg border border-zinc-700 
                                       hover:border-orange-500 focus:border-orange-500 focus:outline-none transition-colors"
                    />
                    {errors.shippingAddress_State && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.shippingAddress_State.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      {...register("shippingAddress_PostalCode")}
                      placeholder="Postal Code"
                      className="w-full bg-black text-white px-4 py-2 rounded-lg border border-zinc-700 
                                       hover:border-orange-500 focus:border-orange-500 focus:outline-none transition-colors"
                    />
                    {errors.shippingAddress_PostalCode && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.shippingAddress_PostalCode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      {...register("shippingAddress_Country")}
                      placeholder="Country"
                      className="w-full bg-black text-white px-4 py-2 rounded-lg border border-zinc-700 
                                       hover:border-orange-500 focus:border-orange-500 focus:outline-none transition-colors"
                    />
                    {errors.shippingAddress_Country && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.shippingAddress_Country.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 
                               hover:from-orange-700 hover:to-orange-800 text-white font-medium rounded-lg 
                               transition-all duration-300 shadow-lg hover:shadow-orange-500/20
                               disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 sticky top-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Order Summary
            </h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => {
                const product = getProductDetails(item.productId.toString());
                if (!product) return null;

                const price = product.comparePrice || product.price;
                const itemTotal = price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-zinc-800"
                  >
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg border border-zinc-700 overflow-hidden">
                      <Image
                        src={product.productMedias[0].fullUrl}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-white mt-1">${itemTotal.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Calculations */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-white font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Shipping</span>
                <span className="text-white">${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
