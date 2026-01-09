import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect these route groups
  const protectedRoutes = [
    "/admin",
    "/faculty",
    "/registrar",
    "/dashboard",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If not a protected route, do nothing
  if (!isProtected) {
    return NextResponse.next();
  }

  // Create Supabase server client
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not logged in, send to login
  if (!user) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Fetch user role
  const { data: roleRow, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();


  if (error || !roleRow) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const role = roleRow.role;

  // Admin routes
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Faculty routes
  if (pathname.startsWith("/faculty") && role !== "teacher") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Registrar routes
  if (pathname.startsWith("/registrar") && role !== "registrar") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Student dashboard (prevent admin/faculty from landing here accidentally)
  if (
    pathname.startsWith("/dashboard") &&
    role !== "student" &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/faculty/:path*", "/registrar/:path*", "/dashboard"],
};
