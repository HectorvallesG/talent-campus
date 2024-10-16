/*
  Warnings:

  - You are about to drop the column `faculty` on the `ProfileStudent` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `ProfileStudent` table. All the data in the column will be lost.
  - Added the required column `faculty` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialty` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ProfileStudent] DROP COLUMN [faculty],
[specialty];

-- AlterTable
ALTER TABLE [dbo].[Student] ADD [faculty] NVARCHAR(1000) NOT NULL,
[specialty] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
