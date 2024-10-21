/*
  Warnings:

  - You are about to drop the column `userName` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Student] DROP CONSTRAINT [Student_userName_key];

-- AlterTable
ALTER TABLE [dbo].[Student] DROP COLUMN [userName];

-- AlterTable
ALTER TABLE [dbo].[User] ADD [userName] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_userName_key] UNIQUE NONCLUSTERED ([userName]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
