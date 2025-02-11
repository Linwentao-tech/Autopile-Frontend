import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    userName?: string;
    roles?: string[];
    emailConfirmed?: boolean;
  }

  interface Session {
    user: User & {
      id: string;
      userName: string;
      roles: string[];
      emailConfirmed: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName: string;
    roles: string[];
    emailConfirmed: boolean;
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/Auth/Signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          credentials: "include",
          cache: "no-store",
        });
        const setCookieHeader = res.headers.get("set-cookie");
        console.log(setCookieHeader);
        if (setCookieHeader) {
          const tokenMatch = setCookieHeader.match(/AuthToken=([^;]+)/);
          const refreshTokenMatch =
            setCookieHeader.match(/RefreshToken=([^;]+)/);

          if (
            tokenMatch &&
            tokenMatch[1] &&
            refreshTokenMatch &&
            refreshTokenMatch[1]
          ) {
            const actualToken = tokenMatch[1];
            const actualRefreshToken = refreshTokenMatch[1];

            const cookieStore = cookies();

            cookieStore.set("AuthToken", actualToken, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
              maxAge: 30 * 60,
            });
            cookieStore.set("RefreshToken", actualRefreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
              maxAge: 7 * 24 * 60 * 60,
            });
          }
        }
        const user = await res.json();

        if (!user.message) {
          console.log("invalid credentials");
          return null;
        }
        return user.data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.userName = user.userName as string;
        token.roles = user.roles as string[];
        token.emailConfirmed = user.emailConfirmed as boolean;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add the custom fields to the session
      if (session.user) {
        session.user.id = token.id;
        session.user.userName = token.userName;
        session.user.roles = token.roles;
        session.user.emailConfirmed = token.emailConfirmed;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  pages: {
    signIn: "/login",
  },
});
