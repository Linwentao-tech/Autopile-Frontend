import { NextResponse } from "next/server";
import { auth } from "./app/auth";
import { cookies } from "next/headers";
import { refreshToken } from "./app/actions/authActions";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isAuth = !!req.auth;

  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;
  const actualrefreshToken = cookieStore.get("RefreshToken")?.value;

  if (!authToken && actualrefreshToken) {
    const response = NextResponse.next();
    const data = await refreshToken();
    response.cookies.set("AuthToken", data.data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 60,
    });

    response.cookies.set("RefreshToken", data.data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  }

  if (
    isAuth &&
    (nextUrl.pathname === "/login" || nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
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
