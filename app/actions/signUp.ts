"use server";

import type { userData } from "@/app/components/InterfaceType";
export async function signUp(userData: userData) {
  try {
    const response = await fetch(`${process.env.API_URL}/Auth/SignupUser`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    // const setCookieHeader = response.headers.get("set-cookie");

    // if (setCookieHeader) {
    //   // 提取实际的 JWT token
    //   const tokenMatch = setCookieHeader.match(/AuthToken=([^;]+)/);
    //   if (tokenMatch && tokenMatch[1]) {
    //     const actualToken = tokenMatch[1];
    //     // 只存储 JWT token 部分
    //     const cookieStore = cookies();
    //     cookieStore.set("AuthToken", actualToken, {
    //       httpOnly: true,
    //       secure: true,
    //       sameSite: "none",
    //       maxAge: 3 * 60 * 60,
    //     });
    //   }
    // }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("SignUp error:", error);
    return { success: false, error: "Network error occurred" };
  }
}
