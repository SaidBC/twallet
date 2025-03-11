import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/sessions";

const privateRoutes = ["/"];
const authRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const user = await getSessionUser();
  const path = req.nextUrl.pathname;
  if (privateRoutes.includes(path) && !user)
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  if (authRoutes.includes(path) && user)
    return NextResponse.redirect(new URL("/", req.nextUrl));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
