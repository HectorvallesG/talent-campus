BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Recruiter] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [company] NVARCHAR(1000) CONSTRAINT [Recruiter_company_df] DEFAULT 'Indepediente',
    [tel] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Recruiter_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Recruiter_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Recruiter_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Recruiter_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Recruiter] ADD CONSTRAINT [Recruiter_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
