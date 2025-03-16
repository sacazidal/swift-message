import prisma from "@/lib/prisma";
import { logErrorToDatabase } from "./logger";

export async function logLogin(userId: number, ipAddress: string) {
  try {
    await prisma.LoginLog.create({
      data: {
        userId,
        ipAddress,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      await logErrorToDatabase(error);
    }
  }
}
