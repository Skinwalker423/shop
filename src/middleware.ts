import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const newUrl = new URL("/", request.url);
  console.log("url", request.url);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
