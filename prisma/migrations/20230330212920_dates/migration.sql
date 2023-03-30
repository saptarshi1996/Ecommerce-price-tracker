-- AlterTable
ALTER TABLE "user_verifications" ALTER COLUMN "expires_at" SET DATA TYPE DATE,
ALTER COLUMN "updated_at" SET DATA TYPE DATE,
ALTER COLUMN "deleted_at" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "deleted_at" SET DATA TYPE DATE,
ALTER COLUMN "updated_at" SET DATA TYPE DATE;
