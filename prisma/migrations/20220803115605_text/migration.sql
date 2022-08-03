/*
  Warnings:

  - Added the required column `icon` to the `sites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sites` ADD COLUMN `icon` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `urls` MODIFY `link` TEXT NOT NULL;
