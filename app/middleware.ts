import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
//import { authenticate } from "auth-provider";
import { NextRequest, NextResponse } from "next/server";

export default NextAuth(authConfig).auth;

export function middleware(request: NextRequest) {
  console.log("----------request", request);
  //const {user} = auth();
  const isAuthenticated = true;

  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
