BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [rol] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [isActivated] NVARCHAR(1000) NOT NULL CONSTRAINT [User_isActivated_df] DEFAULT 'false',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Admin] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Admin_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Admin_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Admin_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Admin_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Teacher] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [userName] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Teacher_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Teacher_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Teacher_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Teacher_userName_key] UNIQUE NONCLUSTERED ([userName]),
    CONSTRAINT [Teacher_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Student] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [userName] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [teacherId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Student_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Student_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Student_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Student_userName_key] UNIQUE NONCLUSTERED ([userName]),
    CONSTRAINT [Student_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Projects] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [studentId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Projects_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Projects_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Projects_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Projects_studentId_key] UNIQUE NONCLUSTERED ([studentId])
);

-- CreateTable
CREATE TABLE [dbo].[ProfileStudent] (
    [id] NVARCHAR(1000) NOT NULL,
    [bio] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [faculty] NVARCHAR(1000) NOT NULL,
    [career] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ProfileStudent_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [studentId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ProfileStudent_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ProfileStudent_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [ProfileStudent_studentId_key] UNIQUE NONCLUSTERED ([studentId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Admin] ADD CONSTRAINT [Admin_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Teacher] ADD CONSTRAINT [Teacher_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Student] ADD CONSTRAINT [Student_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Projects] ADD CONSTRAINT [Projects_studentId_fkey] FOREIGN KEY ([studentId]) REFERENCES [dbo].[Student]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProfileStudent] ADD CONSTRAINT [ProfileStudent_studentId_fkey] FOREIGN KEY ([studentId]) REFERENCES [dbo].[Student]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
