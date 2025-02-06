import { NextResponse } from "next/server";
import { auth } from "./app/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuth = !!req.auth;

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

// export const config = {
//   matcher: ["/login", "/signup", "/dashboard"],
// };
export const config = {
  /*
   * Match all request paths except:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - public folder
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
