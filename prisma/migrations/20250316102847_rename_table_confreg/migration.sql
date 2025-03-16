/*
  Warnings:

  - You are about to drop the `ConfirmRegistration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConfirmRegistration" DROP CONSTRAINT "ConfirmRegistration_user_id_fkey";

-- DropTable
DROP TABLE "ConfirmRegistration";

-- CreateTable
CREATE TABLE "confirm_registration" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "confirm_registration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "confirm_registration" ADD CONSTRAINT "confirm_registration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
