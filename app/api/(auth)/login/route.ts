import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logErrorToDatabase } from "@/utils/logger";
import { validationLog } from "@/utils/validation";
import prisma from "@/lib/prisma";
import { getClientIp } from "request-ip";
import { logLogin } from "@/utils/logLogin";

export async function POST(req: NextRequest) {
  try {
    // проверяю, что JWT определен
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // получаю тело запроса
    const { username, password } = await req.json();

    // проверяю, что все поля заполнены и прошли валидацию
    const validationError = validationLog(username, password);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // проверяю, что такой пользователь существует
    const existingUser = await prisma.user.findFirst({
      where: { username },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Неверный логин или пароль" },
        { status: 400 }
      );
    }

    // сравниваю хэш паролей
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Неверный логин или пароль" },
        { status: 400 }
      );
    }

    // создаю токен
    const token = jwt.sign(
      { userId: existingUser.id, username },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    // сохраняю информацию об успешном входе
    const response = NextResponse.json(
      { message: "Успешная авторизация" },
      { status: 200 }
    );

    // устанавливаю cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      path: "/",
      sameSite: "strict",
    });

    // логирую вход
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const ipAddress =
      getClientIp({ headers: { "x-forwarded-for": forwardedFor } }) ||
      "unknown";
    await logLogin(existingUser.id, ipAddress);

    // возвращаю успешный ответ
    return response;
  } catch (error) {
    if (error instanceof Error) {
      await logErrorToDatabase(error);
    }
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
