import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearWarning } from "@/app/_lib/features/cart/cartSlice";
import { RootState } from "../_lib/store";

const CartWarning = () => {
  const warning = useSelector((state: RootState) => state.cart.warning);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (warning) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4500);

      const clearTimer = setTimeout(() => {
        dispatch(clearWarning());
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [warning, dispatch]);

  if (!warning) return null;

  return (
    <div
      className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      } scroll-smooth overscroll-contain`}
    >
      <div
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded shadow-lg max-w-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-orange-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Warning</p>
            <p className="text-sm">{warning}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartWarning;
