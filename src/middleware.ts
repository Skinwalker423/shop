import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const newUrl = new URL("http://localhost:3000");
  if ((await isAuthenticated(request)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": "Basic",
      },
    });
  }
  return NextResponse.next();
}

const isAuthenticated = async (req: NextRequest) => {
  const authHeader =
    req.headers.get("authorization") ||
    req.headers.get("Authorization");
  console.log("headers", authHeader);

  if (!authHeader) return false;

  const [username, password] = Buffer.from(
    authHeader?.split(" ")[1],
    "base64"
  )
    .toString()
    .split(":");
  console.log("buffer", username, password);

  if (authHeader === "admin") return true;

  return false;
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
