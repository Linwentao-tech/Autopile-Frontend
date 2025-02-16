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
  await revokeRefreshToken();
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  const refreshToken = cookieStore.get("RefreshToken")?.value;

  if (authToken || refreshToken) {
    cookieStore.delete("AuthToken");
    cookieStore.delete("RefreshToken");
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
export async function refreshToken() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("RefreshToken")!.value;

  const res = await fetch(`${process.env.API_URL}/Auth/refresh-token`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: decodeURIComponent(refreshToken),
    }),
  });
  if (!res.ok) {
    return {
      success: false,
      message: "Failed to refresh token",
    };
  }

  const data = await res.json();
  return data;
}

export async function revokeRefreshToken() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  if (authToken) {
    try {
      const response = await fetch(`${process.env.API_URL}/Auth/revoke-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `AuthToken=${authToken}`,
        },
      });
      if (!response.ok) {
        return {
          success: false,
          message: "Failed to revoke refresh token",
        };
      }
      return { success: true };
    } catch (error) {
      console.error("Revoke refresh token error:", error);
      throw new Error("Failed to revoke refresh token");
    }
  }
}
