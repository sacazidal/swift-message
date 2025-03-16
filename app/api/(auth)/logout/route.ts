import { logErrorToDatabase } from "@/utils/logger";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Выход выполнен" },
      { status: 200 }
    );
    response.cookies.delete("token");

    return response;
  } catch (error) {
    if (error instanceof Error) {
      await logErrorToDatabase(error);
    }
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
