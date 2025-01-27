"use client";
import {
  type ButtonType,
  type ChildrenProps,
} from "@/app/components/InterfaceType";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../_lib/hooks";
import { addItem, clearCart } from "../_lib/features/cart/cartSlice";
import { useCallback, useEffect, useState } from "react";
import getStripe from "@/app/_lib/stripe";
interface ButtonProps extends ChildrenProps {
  type: ButtonType;
  productId?: string;
  productName?: string;
  productImage?: string;
  productPrice?: string;
  quantity?: number;
}

function Button({
  children,
  type,
  productId,
  productName,
  productImage,
  productPrice,
  quantity = 1,
}: ButtonProps) {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [addToCartClicked, setAddToCartClicked] = useState(false);
  const handleAddToCart = useCallback(() => {
    if (productId && productName && productImage) {
      dispatch(
        addItem({
          id: productId,
          name: productName,
          image: productImage,
          price: productPrice?.toString() || "",
          quantity: quantity,
        })
      );
      setAddToCartClicked(true);
    }
  }, [dispatch, productId, productName, productImage, productPrice, quantity]);

  useEffect(() => {
    if (addToCartClicked) {
      setAddToCartClicked(false);
    }
  }, [items, addToCartClicked]);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

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
          items: [
            {
              id: productId,
              name: productName,
              price: productPrice,
              quantity: 1,
              image: productImage,
            },
          ],
          deliveryFee: 10,
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
        console.log(checkoutError);
      } else {
        setCheckoutError("An unexpected error occurred");
        console.log(checkoutError);
      }
    }
  };
  if (typeof type === "object" && type.type === "orange_button")
    if (type.subtype === "shop_now")
      return (
        <div>
          <Link href="/category/all-products">
            <button
              className={`bg-orange-700 px-7 py-4 text-black rounded-full hover:border-white transition-all hover:bg-transparent hover:text-white border-2 border-transparent duration-500`}
            >
              {children}
            </button>
          </Link>
        </div>
      );
    else if (type.subtype === "learn_about")
      return (
        <div>
          <Link href="/about-us">
            <button
              className={`bg-orange-700 px-7 py-4 text-black rounded-full hover:border-white transition-all hover:bg-transparent hover:text-white border-2 border-transparent duration-500`}
            >
              {children}
            </button>
          </Link>
        </div>
      );
    else if (type.subtype === "premium_area")
      return (
        <div>
          <Link href="/premium-area" scroll={false}>
            <button
              className={`bg-orange-700 px-7 py-4 text-black rounded-full hover:border-white transition-all hover:bg-transparent hover:text-white border-2 border-transparent duration-500`}
            >
              {children}
            </button>
          </Link>
        </div>
      );
    else if (type.subtype === "default")
      return (
        <div>
          <button
            className={`bg-orange-700 px-7 py-4 text-black rounded-full hover:border-white transition-all hover:bg-transparent hover:text-white border-2 border-transparent duration-500`}
          >
            {children}
          </button>
        </div>
      );
  if (type == "orange_submit_button")
    return (
      <div>
        <button
          className={`bg-orange-700 px-12 py-2 ml-56 mt-4 text-black rounded-full hover:border-white transition-all hover:bg-transparent hover:text-white border-2 border-transparent duration-500`}
        >
          {children}
        </button>
      </div>
    );
  if (type == "transparent-button")
    return (
      <div>
        <Link href="/category/all-products">
          <button
            className="bg-transparent text-white px-8 py-3  rounded-full  border-2 border-white  hover:bg-orange-700 hover:text-black hover:border-orange-700 
        transition-all duration-500"
          >
            {children}
          </button>
        </Link>
      </div>
    );
  if (type === "Add_to_cart_homepage") {
    return (
      <div>
        <button
          className="bg-transparent text-white px-14 py-3 rounded-full border-2 border-white
                       hover:bg-white hover:text-black hover:border-white
                       transition-all duration-300 ease-in-out
                       active:bg-white active:text-black active:scale-95
                       active:duration-150 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          onClick={handleAddToCart}
        >
          {children}
        </button>
      </div>
    );
  }
  if (type === "Add_to_cart_productPage") {
    return (
      <div className="w-full">
        <button
          className="bg-transparent text-white rounded-full border-2 border-white
                       hover:text-opacity-60 
                       transition-all duration-300 ease-in-out
                       mt-5 w-full py-2 px-4
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                       active:bg-white active:text-black active:scale-95
                       active:duration-150"
          onClick={handleAddToCart}
        >
          {children}
        </button>
      </div>
    );
  }
  if (type === "Buy_now")
    return (
      <div className="w-full ">
        <button
          onClick={handleCheckout}
          className="bg-orange-700 px-4 py-2 text-black rounded-full  transition-all   border-2 border-transparent duration-500 w-full hover:opacity-60"
        >
          {children}
        </button>
      </div>
    );
  if (type === "clear_cart")
    return (
      <div className="w-32">
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-orange-700 px-4 py-3 text-white rounded-full  transition-all   border-2 border-transparent duration-500 w-full hover:opacity-60"
        >
          {children}
        </button>
      </div>
    );
}

export default Button;
