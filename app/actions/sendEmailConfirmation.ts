"use server";

import { cookies } from "next/headers";

export async function sendEmailConfirmation(email: string) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("AuthToken")?.value;

    if (!authToken) {
      return null;
    }

    const response = await fetch(
      `${process.env.API_URL}/Auth/SendEmailConfirmationLink?email=${email}`,
      {
        method: "GET",
        headers: { Cookie: `AuthToken=${authToken}` },
        cache: "no-store",
        credentials: "include",
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error sending email confirmation:", error);
    throw error;
  }
}
