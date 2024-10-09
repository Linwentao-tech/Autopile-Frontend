"use client";
import {
  type ButtonType,
  type ChildrenProps,
} from "@/app/components/InterfaceType";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../_lib/hooks";
import { addItem } from "../_lib/features/cart/cartSlice";
import { useCallback, useEffect, useState } from "react";

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
          price: productPrice || "",
          quantity: quantity,
        })
      );
      setAddToCartClicked(true);
    }
  }, [dispatch, productId, productName, productImage, productPrice, quantity]);

  useEffect(() => {
    if (addToCartClicked) {
      console.log("Current items in cart:", items);
      setAddToCartClicked(false);
    }
  }, [items, addToCartClicked]);
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
  if (type == "Add_to_cart_homepage")
    return (
      <div>
        <button
          className="bg-transparent text-white px-14 py-3  rounded-full  border-2 border-white  hover:bg-white hover:text-black hover:border-white
          transition-all duration-500"
          onClick={handleAddToCart}
        >
          {children}
        </button>
      </div>
    );
  if (type === "Add_to_cart_productPage") {
    return (
      <div className="w-full ">
        <button
          className="bg-transparent text-white rounded-full border-2 border-white hover:text-opacity-60
                transition-all duration-500 mt-5 w-full py-2 px-4"
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
        <button className="bg-orange-700 px-4 py-2 text-black rounded-full  transition-all   border-2 border-transparent duration-500 w-full hover:opacity-60">
          {children}
        </button>
      </div>
    );
}

export default Button;
