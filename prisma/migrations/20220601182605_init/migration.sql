-- CreateTable
CREATE TABLE `urls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` TEXT NOT NULL,
    `site` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedAt` TIMESTAMP(6) NULL,
    `updatedAt` TIMESTAMP(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `currentPrice` FLOAT NULL,
    `lowestPrice` FLOAT NULL,
    `imageUrl` TEXT NULL,
    `isInStock` BOOLEAN NOT NULL DEFAULT false,
    `urlId` INTEGER NULL,
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedAt` TIMESTAMP(6) NULL,
    `updatedAt` TIMESTAMP(6) NULL,

    UNIQUE INDEX `products_urlId_key`(`urlId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_urlId_fkey` FOREIGN KEY (`urlId`) REFERENCES `urls`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
