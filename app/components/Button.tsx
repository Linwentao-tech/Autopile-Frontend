"use client";

import {
  type ButtonType,
  type ChildrenProps,
} from "@/app/components/InterfaceType";
import Link from "next/link";
import { addShoppingCartItem } from "../actions/shoppingCartItem";
import { showToast } from "./ToastMessage";

interface ButtonProps extends ChildrenProps {
  type: ButtonType;
  productId?: string;
  quantity?: number;
}

function Button({ children, type, productId, quantity }: ButtonProps) {
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
    if (!productId || !quantity) {
      throw new Error(
        "productId and quantity are required for Add_to_cart_homepage button type"
      );
    }
    return (
      <div>
        <button
          className="bg-transparent text-white px-14 py-3 rounded-full border-2 border-white
                       hover:bg-white hover:text-black hover:border-white
                       transition-all duration-300 ease-in-out
                       active:bg-white active:text-black active:scale-95
                       active:duration-150 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        >
          {children}
        </button>
      </div>
    );
  }
  if (type === "Add_to_cart_productPage") {
    if (!productId || !quantity) {
      throw new Error(
        "productId and quantity are required for Add_to_cart_productPage button type"
      );
    }
    return (
      <div className="w-full">
        <button
          className="bg-transparent text-white rounded-full border-2 border-white
                       hover:text-opacity-60
                       transition-all duration-300 ease-in-out
                       mt-5 w-full py-2 px-4 hover:bg-orange-700 hover:text-black hover:border-orange-700 
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                       active:bg-white active:text-black active:scale-95
                       active:duration-150"
          onClick={async () =>
            await addShoppingCartItem(productId, quantity).then((res) => {
              console.log(res);
              if (res?.success && res?.data.quantity < 10) {
                showToast.success("Added to cart");
              } else if (res?.data.quantity === 10) {
                showToast.error("Maximum quantity reached");
              } else {
                showToast.error("Error adding item to cart");
              }
            })
          }
        >
          {children}
        </button>
      </div>
    );
  }
}

export default Button;
