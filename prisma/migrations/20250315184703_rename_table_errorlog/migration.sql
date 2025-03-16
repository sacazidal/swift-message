/*
  Warnings:

  - You are about to drop the `error_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "error_log";

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stack" TEXT,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);
