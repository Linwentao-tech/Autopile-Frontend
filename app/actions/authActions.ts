"use server";

import { signIn, signOut } from "@/app/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";

export async function signInAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true, message: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    return { success: false, message: "Login failed" };
  }
}

export async function signOutAction() {
  console.log("clearing cookies");
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;

  if (authToken) {
    cookieStore.delete("AuthToken");
  }

  await signOut();
}

export async function resetPassword({
  email,
  emailVerifyToken,
  newPassword,
}: {
  email: string;
  emailVerifyToken: string;
  newPassword: string;
}) {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/ResetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        emailVerifyToken,
        newPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to reset password",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
