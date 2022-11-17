/*
  Warnings:

  - You are about to drop the column `second_name` on the `users` table. All the data in the column will be lost.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `second_name`,
    ADD COLUMN `last_name` VARCHAR(100) NOT NULL;
