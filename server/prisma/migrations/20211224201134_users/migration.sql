/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_verified` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(255) NOT NULL,
    MODIFY `last_name` VARCHAR(255) NULL;
