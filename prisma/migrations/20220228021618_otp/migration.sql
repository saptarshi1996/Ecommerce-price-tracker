/*
  Warnings:

  - Added the required column `otp` to the `user_registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_registrations` ADD COLUMN `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `deletedAt` TIMESTAMP(6) NULL,
    ADD COLUMN `isRevoked` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `otp` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(6) NULL;
