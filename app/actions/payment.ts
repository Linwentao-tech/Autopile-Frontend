"use server";

import { cookies } from "next/headers";

type item = {
  productId: string;
  quantity: number;
};

interface PaymentIntent {
  items: item[];
}

export async function createPaymentIntent(paymentIntent: PaymentIntent) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;

  if (!authToken) {
    throw new Error("No auth token found");
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/Payment/CreatePayment`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `AuthToken=${authToken}`,
        },
        body: JSON.stringify(paymentIntent),
        credentials: "include",
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Error creating payment intent");
  }
}
