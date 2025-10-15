import { NextRequest, NextResponse } from "next/server";
import { withSupabaseAuth } from "@/lib/supabase/middleware";
import { rateLimitByIP, getRateLimitHeaders, isRateLimited } from "@/lib/rate-limit";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isApiRoute = pathname.startsWith("/api/");
  const ip = (req as any).ip ?? req.headers.get("x-forwarded-for") ?? "127.0.0.1";

  // Rate limiting for API routes
  if (isApiRoute) {
    const apiConfig = pathname.includes("/auth/") ? "API_STRICT" : "API_GENERAL";
    const rateLimitResult = rateLimitByIP(ip, apiConfig);
    
    // Add rate limit headers
    const headers = getRateLimitHeaders(rateLimitResult);
    const response = NextResponse.next();
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    if (isRateLimited(rateLimitResult)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429, headers: response.headers }
      );
    }
  }

  // Rate limiting for auth routes
  if (isAuthRoute) {
    const rateLimitResult = rateLimitByIP(ip, "AUTH_LOGIN");
    
    if (isRateLimited(rateLimitResult)) {
      return NextResponse.json(
        { error: "Too many authentication attempts. Please try again later." },
        { status: 429 }
      );
    }
  }

  // Rate limiting for password reset
  if (pathname.includes("/reset-password")) {
    const rateLimitResult = rateLimitByIP(ip, "AUTH_RESET");
    
    if (isRateLimited(rateLimitResult)) {
      return NextResponse.json(
        { error: "Too many password reset attempts. Please try again later." },
        { status: 429 }
      );
    }
  }

  const { session, response } = await withSupabaseAuth(req);

  // Redirect authenticated users away from /login and /signup
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect /dashboard routes
  if (!session && isDashboardRoute) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/login", "/signup", "/forgot-password", "/dashboard/:path*"],
};


