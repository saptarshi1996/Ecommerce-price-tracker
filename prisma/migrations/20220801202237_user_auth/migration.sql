-- CreateTable
CREATE TABLE `user_authentications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` INTEGER NOT NULL,
    `isRevoked` BOOLEAN NULL DEFAULT false,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_authentications` ADD CONSTRAINT `user_authentications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
