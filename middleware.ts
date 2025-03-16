import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicPaths, validPaths } from "./lib/paths";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/_next/") || path.startsWith("/api/")) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("last-visited-path")?.value;

  const response = NextResponse.next();
  response.cookies.set("last-visited-path", path);

  const isPathExists = checkIfPathExists(path);

  if (!isPathExists) {
    const redirectPath = cookie || "/";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  const token = request.cookies.get("token")?.value;

  if (!token && !publicPaths.includes(path)) {
    const redirectPath = token || "/login";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (token && publicPaths.includes(path)) {
    const redirectPath = "/";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return response;
}

function checkIfPathExists(path: string): boolean {
  return validPaths.includes(path);
}
