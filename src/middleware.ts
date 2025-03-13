import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const privateRoutes = ["/", "/history", "/rewards", "/receive", "/send"];
const authRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const user = await auth();
  const path = req.nextUrl.pathname;
  if (privateRoutes.includes(path) && !user)
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  if (authRoutes.includes(path) && user)
    return NextResponse.redirect(new URL("/", req.nextUrl));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
