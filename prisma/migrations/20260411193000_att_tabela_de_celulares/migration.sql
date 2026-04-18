-- CreateTable
CREATE TABLE `celulares` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(70) NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `img` VARCHAR(70) NOT NULL,
    `estoque` INTEGER NOT NULL,
    `compra_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `celulares` ADD CONSTRAINT `celulares_compra_id_fkey` FOREIGN KEY (`compra_id`) REFERENCES `compraPix`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
