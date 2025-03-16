import prisma from "@/lib/prisma";
import { generateConfirmationEmail } from "@/utils/generateConfirmationEmail";
import { logErrorToDatabase } from "@/utils/logger";
import { sendRecoveryCode } from "@/utils/sendRecoveryCode";
import { validationRecovery } from "@/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // получаю тело запроса
    const { email } = await req.json();

    // проверяю, что все поля заполнены и прошли валидацию
    const validationError = validationRecovery(email);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // проверяю, что email существует
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          error: "Ошибка при отправке инструкции",
        },
        { status: 400 }
      );
    }

    // генерирую и отправляю код восстановления пароля
    const generateCode = generateConfirmationEmail();
    await sendRecoveryCode(email, generateCode);

    // отправляю ответ с информацией об успешной отправке
    return NextResponse.json(
      { message: "Инструкция направлена на указанную почту" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      await logErrorToDatabase(error);
    }
  }
}
