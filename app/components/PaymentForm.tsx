"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { orderComplete } from "@/app/actions/order";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const paymentFormSchema = z.object({});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

function CheckoutForm({ orderId }: { orderId: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
  });

  const onSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        const result = await orderComplete(orderId);
        if (result.success) {
          window.location.href = "/success";
        } else {
          setErrorMessage(
            "Payment successful but failed to update order status."
          );
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("An unexpected error occurred.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-red-500 flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-red-500 text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
        <h3 className="text-lg font-medium text-white mb-4">Payment Details</h3>
        <div className="space-y-4">
          <PaymentElement
            id="payment-element"
            options={{
              layout: {
                type: "tabs",
                defaultCollapsed: false,
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full relative bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-6 rounded-xl
                 font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-orange-600 disabled:hover:to-orange-700
                 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing Payment...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            Pay Securely Now
          </div>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
            clipRule="evenodd"
          />
        </svg>
        Secured by Stripe
      </div>
    </form>
  );
}

export default function PaymentForm({
  clientSecret,
  orderId,
}: {
  clientSecret: string;
  orderId: number;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#ea580c",
            colorBackground: "#18181b",
            colorText: "#ffffff",
            colorDanger: "#ef4444",
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
            spacingUnit: "4px",
            borderRadius: "8px",
          },
        },
      }}
    >
      <CheckoutForm orderId={orderId} />
    </Elements>
  );
}
