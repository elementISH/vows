import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const authPages = ["/login", "/signup"];

  if (authPages.includes(pathname)) {
    const authToken =
      req.cookies.get("auth_token")?.value == "false" ? false : true;
    if (authToken) {
      const redirectUrl = new URL("/shop", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup"],
};
