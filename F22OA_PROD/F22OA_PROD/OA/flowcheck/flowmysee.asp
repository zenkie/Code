<!-- #include file="setup.asp" -->
<%act=HTMLEncode(request("act"))
fdate=HTMLEncode(request("fdate"))
ldate=HTMLEncode(request("ldate"))
tname=HTMLEncode(request("tname"))
if fdate="" then fdate=get_date(date) end if
if ldate="" then ldate=get_date(date) end if
set rs=server.CreateObject("adodb.recordset")
select case act
case "left"  SeachLeft
case "right" SeachRight
case else SeachMain
end select
set rs=nothing

Sub SeachMain%>
<table width="100%" height="25" border="0" cellpadding="1" cellspacing="1" bgcolor="#3399ff" ID="Table1">
<tr valign="middle">
   <td nowrap onMouseMove="this.bgColor='#aaaaff'" onMouseOut="this.bgColor='cornsilk'"
			align="center" bgcolor="cornsilk" style="CURSOR: hand" onClick="location='flowmynofinish.asp?tname=<% =escape("我的未完成记录")%>'" vAlign="baseline">
			<img src="../icon/menu/diary.gif" width="16" height="16"> 我的未完成记录</td>
   <td nowrap onMouseMove="this.bgColor='#aaaaff'" onMouseOut="this.bgColor='cornsilk'"
			align="center" bgcolor="cornsilk" style="CURSOR: hand" onClick="location='flowmyyesfinish.asp?tname=<% =escape("我的已完成记录")%>'" vAlign="baseline">
			<img src="../icon/menu/diary.gif" width="16" height="16"> 我的已完成记录</td>
   <td nowrap onMouseMove="this.bgColor='#aaaaff'" onMouseOut="this.bgColor='cornsilk'"
			align="center" bgcolor="cornsilk" style="CURSOR: hand" onClick="location='flowmycheck.asp?tname=<% =escape("我经审的记录")%>'" vAlign="baseline">
			<img src="../icon/menu/diary.gif" width="16" height="16"> 我经审的记录</td>
   <td nowrap onMouseMove="this.bgColor='#aaaaff'" onMouseOut="this.bgColor='cornsilk'"
			align="center" bgcolor="cornsilk" style="CURSOR: hand" onClick="location='flowmysee.asp?tname=<% =escape("需我查阅的记录")%>'" vAlign="baseline">
			<img src="../icon/menu/diary.gif" width="16" height="16"> 需我查阅的记录</td>
</tr>
</table>
<table width="100%" border="0" cellpadding="1" cellspacing="1">
<tr><td></td></tr>
</table>
<table width="100%" height="40" border="0" cellpadding="1" cellspacing="1">
<form name="form1" method="post" action="?">
<tr><td>选择提交时间段 
<input type="text" name="fdate" size=10 value="<%=fdate%>" onfocus="setday(this)" readonly>
<input type="text" name="ldate" size=10 value="<%=ldate%>" onfocus="setday(this)" readonly>
<input type="hidden" name="tname" value="<%=tname%>">
<input type="submit" name="submit" value=" 查 询 " class=CommonButton></td></tr>
</form>
</table>
<table width="100%" height=400 border="0" cellpadding="1" cellspacing="1">
<tr height=400>
  <td width="15%"><iFrame Name=iFrmRef1 id=iFrmRef1 SRC="?act=left&fdate=<%=fdate%>&ldate=<%=ldate%>" width=100% height=100% scrolling="no" frameborder="0"></iFrame></td>
  <td width="85%"><iFrame Name=iFrmRef2 id=iFrmRef2 SRC="?act=right&typeid=0&fdate=<%=fdate%>&ldate=<%=ldate%>" width=100% height=100% scrolling="yes" frameborder="0"></iFrame></td>
</tr>
</table>
<%End Sub

Sub SeachLeft%>
<script language="javascript">
function reflash(url){
window.parent.document.iFrmRef2.location=url;
}
</script>
<%
if fdate<>"" and ldate<>"" then 
  with response
    .write("<table border=0 cellpadding=1 cellspacing=1>")
	rs.open "select isnull(count(*),0) as cnt from o_threads where convert(char(10),crdate,126) between '"&fdate&"' and '"&ldate&"' "&_
			"and baseid in (select baseid from O_basesub where userid='"&request.cookies("userid")&"' and ifedit=1)",conn,1,1
	.write("<tr onMouseMove=""this.bgColor='#FFFFCC'"" onMouseOut=""this.bgColor=''"">")
	.write("<td><a href=""javascript:reflash('?act=right&typeid=0&fdate="&fdate&"&ldate="&ldate&"')"">全 部 ("&rs("cnt")&")</a></td></tr>")
	rs.close
	Sql="select a.typeid,max(b.typename) as typename from o_threads a,o_type b "&_
	    "where a.typeid=b.typeid and convert(char(10),a.crdate,126) between '"&fdate&"' and '"&ldate&"' "&_
		"and a.baseid in (select baseid from o_basesub where userid='"&request.cookies("userid")&"' and ifedit=1) group by a.typeid"
    rs.open Sql,conn,1,1
	set tmp=server.createobject("adodb.recordset")
	while not rs.eof
 	  tmp.open "select isnull(count(*),0) as cnt from o_threads where typeid="&rs("typeid")&_
	           " and convert(char(10),crdate,126) between '"&fdate&"' and '"&ldate&"' "&_
			   "and baseid in (select baseid from o_basesub where userid='"&request.cookies("userid")&"' and ifedit=1)",conn,1,1
	  .write("<tr onMouseMove=""this.bgColor='#FFFFCC'"" onMouseOut=""this.bgColor=''"">")
	  .write("<td><a href=""javascript:reflash('?act=right&typeid="&rs("typeid")&"&fdate="&fdate&"&ldate="&ldate&"')"">"&rs("typename")&" ("&tmp("cnt")&")</a></td></tr>")
	  tmp.close
	  rs.movenext
	Wend
	rs.close
	set tmp=nothing
    .write("</table>")
  end with 
end if     
End Sub

Sub SeachRight%>
<table width="700" border="0" cellpadding="1" cellspacing="1" ID=CommonListArea>
<tr align=center>
   <td width=30>结束</td>
   <td width=60>紧急程度</td>
   <td width=300>主题</td>
   <td width=70>提交人</td>
   <td width=70>最后处理人</td>
   <td width=170>最后处理日期</td>
</tr>
<%if fdate<>"" and ldate<>"" then
typeid=RequestInt("typeid")
select case typeid
  case 0 Sql="select a.*,c.statename,d.username as clusername,c.color,"&_
             "case when convert(char(10),a.crdate,126)=convert(char(10),getdate(),126) then 1 else 0 end as shownew "&_
			 "from o_threads a,o_type b,o_state c,j_user d where a.typeid=b.typeid and a.stateid=c.stateid "&_
			 "and a.lastname*=d.userid and convert(char(10),a.crdate,126) between '"&fdate&"' and '"&ldate&"' "&_
			 "and a.baseid in (select baseid from o_basesub where userid='"&request.cookies("userid")&"' and ifedit=1) "&_
			 " order by a.crdate desc,c.orders desc"
  case else Sql="select a.*,c.statename,d.username as clusername,c.color,"&_
                "case when convert(char(10),a.crdate,126)=convert(char(10),getdate(),126) then 1 else 0 end as shownew "&_
                "from o_threads a,o_type b,o_state c,j_user d where a.typeid=b.typeid and a.stateid=c.stateid "&_
				"and a.typeid="&typeid&" and a.lastname*=d.userid and convert(char(10),a.crdate,126) between '"&fdate&"' and '"&ldate&"' "&_
				"and a.baseid in (select baseid from o_basesub where userid='"&request.cookies("userid")&"' and ifedit=1) order by a.crdate desc,c.orders desc"
end select
rs.open Sql,conn,1,1
While not rs.eof
  response.write("<tr height=25 ")
  if rs("isov")=1 then
     response.write("bgcolor='#FFF8DC'")
  else
     response.write("bgcolor='#E0F3FF'")
  end if
  response.write(" onMouseMove=""this.bgColor='#FFFFCC'"" ")
  if rs("isov")=1 then
     response.write("onMouseOut=""this.bgColor='#FFF8DC'"">")
  else
     response.write("onMouseOut=""this.bgColor='#E0F3FF'"">")
  end if
  response.write("<td align=center>")
  if rs("isov")=1 then response.write("√") end if
  response.write("</td>")
  response.write("<td align=center><font color='"&rs("color")&"'>"&rs("statename")&"</font></td>")
  response.write("<td><a href=""javascript:void(null)"" onclick=""ShowOpen('flowread.asp?tid="&rs("tid")&"',1)""><font color='"&rs("color")&"'>"&rs("title")&"</font></a>")
  if rs("shownew")=1 then
     response.write(" <img src='img/flownew.gif'>")
  end if
  response.write("</td>")
  response.write("<td align=center>"&rs("crname")&"</td>")
  response.write("<td align=center>"&rs("clusername")&"</td>")
  response.write("<td align=center>"&rs("lastdatetime")&"</td>")
  response.write("</tr>")
rs.movenext
Wend
rs.close
end if%>
</table>
<%End Sub

call CloseConn
call Footer%>
