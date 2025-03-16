/*
  Warnings:

  - You are about to drop the `error_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_statuses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_statuses" DROP CONSTRAINT "user_statuses_user_id_fkey";

-- DropTable
DROP TABLE "error_logs";

-- DropTable
DROP TABLE "user_statuses";

-- CreateTable
CREATE TABLE "userStatuses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'offline',
    "last_seen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "errorLog" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stack" TEXT,

    CONSTRAINT "errorLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "userStatuses_user_id_idx" ON "userStatuses"("user_id");

-- AddForeignKey
ALTER TABLE "userStatuses" ADD CONSTRAINT "userStatuses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
