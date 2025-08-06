import { NextResponse } from "next/server";

const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { isAuthenticated } = body;

    const res = NextResponse.json({
      success: true,
    });

    res.cookies.set({
      name: COOKIE_NAME,
      value: isAuthenticated,
      httpOnly: COOKIE_OPTIONS.httpOnly,
      secure: COOKIE_OPTIONS.secure,
      sameSite: COOKIE_OPTIONS.sameSite,
      path: COOKIE_OPTIONS.path,
      maxAge: COOKIE_MAX_AGE,
    });

    return res;
  } catch (err) {
    console.error("Cookie error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
