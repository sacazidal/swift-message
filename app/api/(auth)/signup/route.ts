import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { validationReg } from "@/utils/validation";
import { logErrorToDatabase } from "@/utils/logger";
export async function POST(req: NextRequest) {
  try {
    // получаю тело запроса
    const { email, username, password } = await req.json();

    // проверяю, что все поля заполнены и прошли валидацию
    const validationError = validationReg(email, username, password);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // проверяю, что email и username уникальны
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Пользователь с таким email или username уже существует" },
        { status: 400 }
      );
    }

    // хэширую пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // создаю нового пользователя
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // удаляю пароль из объекта пользователя, чтобы его не передавать в ответе
    const { password: _, ...userWithoutPassword } = newUser;
    void _;

    // отправляю ответ с информацией о зарегистрированном пользователе
    return NextResponse.json(
      {
        message: "Пользователь успешно зарегистрирован",
        user: userWithoutPassword,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      await logErrorToDatabase(error);
    }
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
