-- AlterTable
ALTER TABLE `user_registrations` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user_registrations` ADD CONSTRAINT `user_registrations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
