import prisma from "@/lib/prisma";

export async function logErrorToDatabase(error: Error) {
  try {
    await prisma.errorLog.create({
      data: {
        message: error.message,
        stack: error.stack || null,
      },
    });
  } catch (dbError) {
    console.error("Ошибка при записи в базу данных:", dbError);
  }
}
