-- CreateTable
CREATE TABLE "error_log" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stack" TEXT,

    CONSTRAINT "error_log_pkey" PRIMARY KEY ("id")
);
