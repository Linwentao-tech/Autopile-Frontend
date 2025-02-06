"use client";
import { toast } from "react-hot-toast";

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      className:
        "bg-zinc-900 text-white border border-zinc-800 px-6 py-3 text-lg",
      iconTheme: {
        primary: "#ea580c",
        secondary: "#fff",
      },
    });
  },
  error: (message: string) => {
    toast.error(message, {
      className:
        "bg-zinc-900 text-white border border-zinc-800 px-6 py-3 text-lg",
    });
  },
};
