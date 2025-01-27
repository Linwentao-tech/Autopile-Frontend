import { NextResponse } from "next/server";
import { auth } from "./app/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuth = !!req.auth;
  console.log(isAuth);

  // If authenticated user tries to access login or signup pages, redirect to home
  if (
    isAuth &&
    (nextUrl.pathname === "/login" || nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // If unauthenticated user tries to access dashboard, redirect to login
  if (!isAuth && nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/signup", "/dashboard"],
};
