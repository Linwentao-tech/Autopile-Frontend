"use server";

import type { CheckoutFormData } from "../components/InterfaceType";
import { cookies } from "next/headers";

export async function createOrder(orderData: CheckoutFormData) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  if (!authToken) {
    throw new Error("No auth token found");
  }
  try {
    const response = await fetch(`${process.env.API_URL}/Order/CreateOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `AuthToken=${authToken}`,
      },
      body: JSON.stringify(orderData),
      cache: "no-store",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error creating order:", error);
  }
}

export async function getOrder() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  if (!authToken) {
    throw new Error("No auth token found");
  }
  try {
    const response = await fetch(`${process.env.API_URL}/Order/GetUserOrders`, {
      method: "GET",
      headers: {
        Cookie: `AuthToken=${authToken}`,
      },
      cache: "no-store",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting order:", error);
  }
}

export async function deleteOrder(orderId: string) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  if (!authToken) {
    throw new Error("No auth token found");
  }
  try {
    const response = await fetch(
      `${process.env.API_URL}/Order/DeleteOrder/${orderId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `AuthToken=${authToken}`,
        },
        cache: "no-store",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete order");
    }
    return { success: true };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { success: false };
  }
}

export async function getOrderById(orderId: string) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  if (!authToken) {
    throw new Error("No auth token found");
  }
  try {
    const response = await fetch(
      `${process.env.API_URL}/Order/GetOrderByOrderId/${orderId}`,
      {
        method: "GET",
        headers: {
          Cookie: `AuthToken=${authToken}`,
        },
        cache: "no-store",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting order by id:", error);
  }
}

export async function orderComplete(orderId: number) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  if (!authToken) {
    throw new Error("No auth token found");
  }
  try {
    const response = await fetch(`${process.env.API_URL}/Order/CompleteOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `AuthToken=${authToken}`,
      },
      cache: "no-store",
      credentials: "include",
      body: JSON.stringify(orderId),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error completing order:", error);
  }
}
