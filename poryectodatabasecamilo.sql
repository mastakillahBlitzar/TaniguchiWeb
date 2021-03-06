USE [master]
GO
/****** Object:  Database [Trafiyadb]    Script Date: 05/05/2017 10:34:12 ******/
CREATE DATABASE [trafiyadb]
GO
USE [trafiyadb]
GO
/****** Object:  Table [dbo].[Auth]    Script Date: 05/05/2017 10:34:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auth](
	[auth_username] [nvarchar](50) NOT NULL,
	[auth_usr_id] [int] NOT NULL,
	[auth_password] [nvarchar](max) NOT NULL,
	[auth_createdat] [datetime] NULL,
	[auth_updatedat] [datetime] NULL,
 CONSTRAINT [PK_Auth_1] PRIMARY KEY CLUSTERED 
(
	[auth_username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AK_IdUserAuth] UNIQUE NONCLUSTERED 
(
	[auth_usr_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Event]    Script Date: 05/05/2017 10:34:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Event](
	[ev_id] [int] IDENTITY(1,1) NOT NULL,
	[ev_usr_id] [int] NOT NULL,
	[ev_longitude] [float] NOT NULL,
	[ev_latitude] [float] NOT NULL,
	[ev_address] [nvarchar](100) NULL,
	[ev_description] [nvarchar](500) NULL,
	[ev_dateat] [datetime] NOT NULL,
	[ev_createdat] [datetime] NULL,
	[ev_updatedat] [datetime] NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[ev_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EventImage]    Script Date: 05/05/2017 10:34:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventImage](
	[img_id] [int] IDENTITY(1,1) NOT NULL,
	[img_ev_id] [int] NOT NULL,
	[img_nombre] [nvarchar](100) NULL,
	[img_urlpath] [nvarchar](500) NULL,
	[img_created] [datetime] NULL,
	[img_updated] [datetime] NULL,
 CONSTRAINT [PK_EventImage] PRIMARY KEY CLUSTERED 
(
	[img_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EventMapCapture]    Script Date: 05/05/2017 10:34:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventMapCapture](
	[mapscreen_ev_id] [int] NOT NULL,
	[mapscreen_name] [nvarchar](50) NOT NULL,
	[mapscreen_url] [nvarchar](500) NOT NULL,
	[mapscreen_createdat] [datetime] NULL,
	[mapscreen_updatedat] [datetime] NULL,
 CONSTRAINT [PK_EventMapCapture_1] PRIMARY KEY CLUSTERED 
(
	[mapscreen_ev_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 05/05/2017 10:34:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[usr_id] [int] IDENTITY(1,1) NOT NULL,
	[usr_name] [nvarchar](100) NOT NULL,
	[usr_surname] [nvarchar](100) NOT NULL,
	[usr_email] [nvarchar](100) NOT NULL,
	[usr_adress] [nvarchar](100) NULL,
	[usr_createdat] [datetime] NULL,
	[usr_updatedat] [datetime] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[usr_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserPosition]    Script Date: 05/05/2017 10:34:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserPosition](
	[pos_usr_id] [int] NOT NULL,
	[pos_longitude] [float] NOT NULL,
	[pos_latitude] [float] NOT NULL,
	[pos_dateat] [datetime] NOT NULL,
	[pos_created] [datetime] NOT NULL,
	[pos_updated] [datetime] NOT NULL,
 CONSTRAINT [PK_UserPosition] PRIMARY KEY CLUSTERED 
(
	[pos_usr_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Auth]  WITH CHECK ADD  CONSTRAINT [FK_Auth_User] FOREIGN KEY([auth_usr_id])
REFERENCES [dbo].[User] ([usr_id])
GO
ALTER TABLE [dbo].[Auth] CHECK CONSTRAINT [FK_Auth_User]
GO
ALTER TABLE [dbo].[Event]  WITH CHECK ADD  CONSTRAINT [FK_Event_User] FOREIGN KEY([ev_usr_id])
REFERENCES [dbo].[User] ([usr_id])
GO
ALTER TABLE [dbo].[Event] CHECK CONSTRAINT [FK_Event_User]
GO
ALTER TABLE [dbo].[EventImage]  WITH CHECK ADD  CONSTRAINT [FK_EventImage_Event] FOREIGN KEY([img_ev_id])
REFERENCES [dbo].[Event] ([ev_id])
GO
ALTER TABLE [dbo].[EventImage] CHECK CONSTRAINT [FK_EventImage_Event]
GO
ALTER TABLE [dbo].[EventMapCapture]  WITH CHECK ADD  CONSTRAINT [FK_EventMapCapture_Event1] FOREIGN KEY([mapscreen_ev_id])
REFERENCES [dbo].[Event] ([ev_id])
GO
ALTER TABLE [dbo].[EventMapCapture] CHECK CONSTRAINT [FK_EventMapCapture_Event1]
GO
ALTER TABLE [dbo].[UserPosition]  WITH CHECK ADD  CONSTRAINT [FK_UserPosition_User] FOREIGN KEY([pos_usr_id])
REFERENCES [dbo].[User] ([usr_id])
GO
ALTER TABLE [dbo].[UserPosition] CHECK CONSTRAINT [FK_UserPosition_User]
GO
USE [master]
GO
ALTER DATABASE [Trafiyadb] SET  READ_WRITE 
GO
