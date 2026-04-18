-- CreateTable
CREATE TABLE `pagador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(20) NOT NULL,
    `email` VARCHAR(191) NOT NULL DEFAULT 'não informado',
    `cpf` VARCHAR(11) NOT NULL DEFAULT '00000000000',
    `numero` VARCHAR(9) NULL,

    UNIQUE INDEX `pagador_cpf_key`(`cpf`),
    UNIQUE INDEX `pagador_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compraPix` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(10, 2) NULL,
    `data_pagamento` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `pix_id` VARCHAR(255) NULL DEFAULT 'pix realizado',
    `pagador_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `compraPix` ADD CONSTRAINT `compraPix_pagador_id_fkey` FOREIGN KEY (`pagador_id`) REFERENCES `pagador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
