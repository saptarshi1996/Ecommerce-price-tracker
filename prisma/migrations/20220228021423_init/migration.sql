/*
  Warnings:

  - You are about to drop the `user_registations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user_registations`;

-- CreateTable
CREATE TABLE `user_registrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
