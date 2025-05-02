/*
  Warnings:

  - You are about to alter the column `A` on the `_cvtoskill` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `B` on the `_cvtoskill` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `cv` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `cv` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `cv` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `skill` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  
*/
-- DropForeignKey
ALTER TABLE `_cvtoskill` DROP FOREIGN KEY `_CvToSkill_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cvtoskill` DROP FOREIGN KEY `_CvToSkill_B_fkey`;

-- DropForeignKey
ALTER TABLE `cv` DROP FOREIGN KEY `Cv_userId_fkey`;

-- AlterTable
ALTER TABLE `_cvtoskill` MODIFY `A` INTEGER NOT NULL,
    MODIFY `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cv` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `skill` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Cv` ADD CONSTRAINT `Cv_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CvToSkill` ADD CONSTRAINT `_CvToSkill_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cv`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CvToSkill` ADD CONSTRAINT `_CvToSkill_B_fkey` FOREIGN KEY (`B`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
