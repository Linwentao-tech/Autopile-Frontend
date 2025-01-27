"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSuccess } from "@/app/_lib/features/success/successSlice";
import { RootState } from "../_lib/store";

const SuccessMessage = () => {
  const message = useSelector((state: RootState) => state.success.message);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1500);

      const clearTimer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div
      className={`absolute -top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div
        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg max-w-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-green-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Success</p>
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
