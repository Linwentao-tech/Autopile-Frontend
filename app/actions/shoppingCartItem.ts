"use server";

import { cookies } from "next/headers";

export async function addShoppingCartItem(productId: string, quantity: number) {
  console.log(productId, quantity);
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  try {
    const response = await fetch(
      `${process.env.API_URL}/ShoppingCartItem/AddShoppingCartItem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `AuthToken=${authToken}`,
        },
        body: JSON.stringify({ productId, quantity }),
        cache: "no-store",
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log(data);
    if (data.success) {
      return { success: true, data: data.data };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add shopping cart item");
  }
}

export async function getShoppingCartItems() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  try {
    const response = await fetch(
      `${process.env.API_URL}/ShoppingCartItem/ShoppingCartItemList`,
      {
        headers: {
          Cookie: `AuthToken=${authToken}`,
        },
        cache: "no-store",
        credentials: "include",
      }
    );
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get shopping cart items");
  }
}

export async function updateShoppingCartItem(
  shoppingCartItemId: string,
  quantity: number
) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  try {
    const response = await fetch(
      `${process.env.API_URL}/ShoppingCartItem/${shoppingCartItemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `AuthToken=${authToken}`,
        },
        body: JSON.stringify({ quantity }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update shopping cart item");
  }
}

export async function deleteShoppingCartItem(shoppingCartItemId: string) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  try {
    const response = await fetch(
      `${process.env.API_URL}/ShoppingCartItem/${shoppingCartItemId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `AuthToken=${authToken}`,
        },
      }
    );
    if (response.ok) {
      return { success: true };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete shopping cart item");
  }
}

export async function clearShoppingCart() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  try {
    const response = await fetch(`${process.env.API_URL}/ShoppingCartItem`, {
      method: "DELETE",
      headers: { Cookie: `AuthToken=${authToken}` },
    });
    console.log(response);
    if (response.ok) {
      return { success: true };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to clear shopping cart");
  }
}
