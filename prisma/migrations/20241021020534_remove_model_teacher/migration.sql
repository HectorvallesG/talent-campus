/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Teacher] DROP CONSTRAINT [Teacher_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Student] DROP COLUMN [teacherId];

-- DropTable
DROP TABLE [dbo].[Teacher];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
