/*
  Warnings:

  - You are about to drop the column `compra_id` on the `celulares` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `celulares` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `comprapix` table. All the data in the column will be lost.
  - Added the required column `marca` to the `celulares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_item` to the `celulares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_total` to the `compraPix` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `celulares` DROP FOREIGN KEY `celulares_compra_id_fkey`;

-- AlterTable
ALTER TABLE `celulares` DROP COLUMN `compra_id`,
    DROP COLUMN `valor`,
    ADD COLUMN `marca` VARCHAR(50) NOT NULL,
    ADD COLUMN `valor_item` DECIMAL(10, 2) NOT NULL,
    MODIFY `img` VARCHAR(70) NULL;

-- AlterTable
ALTER TABLE `comprapix` DROP COLUMN `valor`,
    ADD COLUMN `valor_total` DECIMAL(10, 2) NOT NULL;

-- CreateTable
CREATE TABLE `pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor_pedido` DECIMAL(10, 2) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `compra_id` INTEGER NOT NULL,
    `produto_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_compra_id_fkey` FOREIGN KEY (`compra_id`) REFERENCES `compraPix`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `celulares`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
