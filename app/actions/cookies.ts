"use server";

import { cookies } from "next/headers";

export async function readCookies() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  console.log("Server-side cookies:", allCookies);
}
