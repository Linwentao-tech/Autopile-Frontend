"use server";

import { cookies } from "next/headers";
export interface User {
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  roles: string[];
  emailConfirmed: boolean;
  userName?: string;
}
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;

  if (!authToken) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/Auth/GetUserInfoById`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `AuthToken=${authToken}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.log("Response not ok:", await response.text());
      return null;
    }

    const data = await response.json();
    if (data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
