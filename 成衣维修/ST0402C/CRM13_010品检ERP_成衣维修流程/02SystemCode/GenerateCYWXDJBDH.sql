USE [epapp]
GO
/****** Object:  StoredProcedure [dbo].[GenerateCYWXDJBDH]    Script Date: 04/23/2014 14:52:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		yuxiaodong
-- Create date: 2011-09-23
-- Description:	生成成衣维修登记表单号
-- =============================================
ALTER PROCEDURE [dbo].[GenerateCYWXDJBDH]
	-- Add the parameters for the stored procedure here
	
	
AS
	Declare @maxDH varchar(20); 
	Declare @number int;
	

BEGIN
	select @maxDH=max(dh) from cywxdjb where len(dh)=6
	if @maxDH is null 
	begin
		select '000001' as dh;
	end else
	begin
		
		select RIGHT('00000'+Cast(@maxDH+1 as varchar),6) as dh
	end
	
END