<!--#include FILE="upload_inc.asp"-->
<html>
<head>
</head>
<style>
body { font-size:9pt  }
</style>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<script>
if (top.location==self.location){
	top.location="login.asp"
}
</script>
<%
set upload=new upload_5xsoft
set file=upload.file("sf_upfile")
if file.fileSize<1 then
   response.write"<script language=javascript>alert('您没有选择图片。~~~\n\n－－－－－请点击浏览按钮，从弹出的窗口中选择要上传的图片。\n\n－－－－－然后点击上传按钮就可以把图片上传了...\n\n－－－－－不过要注意图片的格式哦~~~');history.back()</script>"
   response.end 
end if
if file.fileSize<10 or file.fileSize>1000*1024 then
	response.write "错误:上传的图片大小超过了限制! <a href='javascript:history.go(-1)'>退回上一步</a>"
	response.end
end if
upfilename = split(file.FileName,".")
upfileext = upfilename(ubound(upfilename))
if upfileext<>"jpg" and upfileext<>"jpeg" and upfileext<>"gif" and upfileext<>"JPG" and upfileext<>"JPEG" and upfileext<>"GIF"then
	response.write "错误:上传的文件格式不对! <a href='javascript:history.go(-1)'>退回上一步</a>"
	response.end
end if
ufp="news_"&year(now)&month(now)&day(now)&hour(now)&minute(now)&second(now)&"."&upfilename(ubound(upfilename))
file.saveas Server.mappath("../../../../upload/"&ufp)
%>
<script >
parent.formadd.ImageUrl.value='/upload/<%=ufp%>'
parent.formadd.ImageShopPic.src='../../../../upload/<%=ufp%>'
location.replace('upload.asp')
</script>
<%
set file=nothing
set upload=nothing
'set my_conn = nothing
'set rs = nothing
%>
</body></html>