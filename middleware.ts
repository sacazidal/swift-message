import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validPaths } from "./lib/paths";

export function middleware(request: NextRequest) {
  // Получаем текущий путь
  const path = request.nextUrl.pathname;

  if (path.startsWith("/_next/") || path.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Получаем куки
  const cookie = request.cookies.get("last-visited-path")?.value;

  // Обновляем куки с текущим путем
  const response = NextResponse.next();
  response.cookies.set("last-visited-path", path);

  // Проверяем, существует ли запрашиваемый путь
  const isPathExists = checkIfPathExists(path); // Реализуйте эту функцию

  if (!isPathExists) {
    // Если путь не существует, перенаправляем на последний сохраненный путь из куки
    const redirectPath = cookie || "/"; // Если куки нет, перенаправляем на главную
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return response;
}

function checkIfPathExists(path: string): boolean {
  return validPaths.includes(path);
}
