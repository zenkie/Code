USE [epapp]
GO
/****** Object:  StoredProcedure [dbo].[GenerateCYWXDJBDH_D]    Script Date: 12/15/2012 16:43:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






-- =============================================
-- Author:		yuxiaodong
-- Create date: 2011-09-23
-- Description:	生成成衣维修登记表单号
-- =============================================
ALTER PROCEDURE [dbo].[GenerateCYWXDJBDH_D](@shopid varchar(32),@COM varchar(32))
	-- Add the parameters for the stored procedure here
	
	
AS
	Declare @lASTDH varchar(32)
	Declare @LASTXH varchar(32)
	Declare @NETXH varchar(32)
	Declare @YMD varchar(32)


BEGIN
	
	if @COM='雅莹'
		begin
		Select @YMD=CONVERT(varchar(100), GETDATE(), 112)
		Select @lASTDH=isnull(max(DH),'0') from CYWXDJB where dh like 'D-WXE'+@shopid+@YMD+'%'
		select @LASTXH = RIGHT(@lASTDH,3)
		select @NETXH = RIGHT('00'+cast(@LASTXH+1 as varchar ),3) 
		select 'D-WXE'+@shopid+@YMD+@NETXH
		end
	ELSE IF @COM='贝爱' 
		begin
		Select @YMD=CONVERT(varchar(100), GETDATE(), 112)
		Select @lASTDH=isnull(max(DH),'0') from CYWXDJB where dh like 'D-WXT'+@shopid+@YMD+'%'
		select @LASTXH = RIGHT(@lASTDH,3)
		select @NETXH = RIGHT('00'+cast(@LASTXH+1 as varchar ),3) 
		select 'D-WXT'+@shopid+@YMD+@NETXH
		end
	ELSE IF @COM='纳卉'
		begin
		Select @YMD=CONVERT(varchar(100), GETDATE(), 112)
		Select @lASTDH=isnull(max(DH),'0') from CYWXDJB where dh like 'D-WXN'+@shopid+@YMD+'%'
		select @LASTXH = RIGHT(@lASTDH,3)
		select @NETXH = RIGHT('00'+cast(@LASTXH+1 as varchar ),3)  
		select 'D-WXN'+@shopid+@YMD+@NETXH
		end
	ELSE
	   begin
	   Select @YMD=CONVERT(varchar(100), GETDATE(), 112)
		Select @lASTDH=isnull(max(DH),'0') from CYWXDJB where dh like 'D-WX'+@shopid+@YMD+'%'
		select @LASTXH = RIGHT(@lASTDH,3)
		select @NETXH = RIGHT('00'+cast(@LASTXH+1 as varchar ),3)   
	    select 'D-WX'+@shopid+@YMD+@NETXH
	    end
	
	
	
	
END

