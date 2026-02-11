import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Check if user has userEmail in cookies (set during login)
  const userEmail = req.cookies.get("userEmail")?.value;

  // If trying to access /home without auth, redirect to login
  if (!userEmail && req.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/home/:path*"],
};
