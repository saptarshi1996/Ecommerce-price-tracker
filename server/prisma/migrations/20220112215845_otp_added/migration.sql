/*
  Warnings:

  - You are about to alter the column `created_at` on the `user_verifications` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `otp` to the `user_verifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_verifications` ADD COLUMN `otp` INTEGER NOT NULL,
    MODIFY `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(3);
