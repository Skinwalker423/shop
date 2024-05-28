import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: NextRequest) {
  console.log("req", request.nextUrl.pathname);

  return NextResponse.json({ message: "test" });
}
