<%Response.cachecontrol = "no-cache"
Response.Expires=-1000%>
<HTML>
  <HEAD><meta http-equiv="Content-Type" content="text/html; charset=gb2312">
  <title>��ӡСƱ</title>
  <link href="css/f22.css" rel="stylesheet" type="text/css">
    <script language="javascript">
	function printTable(id){
	  window.print();
	}
	function printTable1(id){
  	var   op   =   window.open(); 
	var a = document.all[id];
	op.document.writeln("<link href=\"css\/f22.css\" rel=\"stylesheet\" type=\"text\/css\">");
  	op.document.writeln(a.outerHTML);
	//alert(a.outerHTML);
  	op.document.writeln("<scr"+"ipt>window.print();<\/scr"+"ipt>");
  	}
  	function pageClose(){
	window.returnValue=1;
 	 window.close();
  	}
  </script>

  </HEAD>
 <body>
  <form>
  <style media='print'>
   .Noprint { DISPLAY: none }
   .PageNext { PAGE-BREAK-AFTER: always }
  </style>
  <style>
body,td,th {
	font-size: 12px;
}
  .f1{font-size:20px}
  .f2{font-size:12px}
  .f3{font-size:10px}
  </style>
<%dim depotname,retailid,sum,xname,suredate,tel,vipcode,comment,depotid,add,sname,centum
retailid=trim(request.querystring("id"))
depotname=trim(session("dm").System_depotname)
depotid=trim(session("dm").System_depotid)
cn=session("cn")
set ds=Server.CreateObject("ADODB.Recordset")
ds.ActiveConnection = cn
sum=0

ds.Source =" select a.s_name,a.cr_name,b.clothingid,b.styleid,b.colorid,b.sizeid,b.x_price,b.discount,b.s_price,b.nums,isnull(b.larg,0) as zs,b.nums*b.s_price as sums,"& _
  			"  b.nums*b.x_price as xsums,b.nums*b.x_price-b.nums*b.s_price as zsums from d_retail a,d_retailsub b "& _
  			 " where a.retailid=b.retailid and a.retailid='"&retailid&"'"& _
			 " order by b.s_price desc"
ds.Open

'ӪҵԱ
set rs=server.CreateObject("adodb.recordset")
rs.ActiveConnection=cn
rs.Source="select names from jk_retailhistory where retailid='"&retailid&"'" 
rs.Open
xname=""
while not rs.EOF
xname=xname&rs("names")&","
rs.MoveNext
wend
rs.Close
rs.source="select a.vipcode,b.tel,convert(char(10),a.sure_date,126) as suredate,a.comment,b.address,a.s_name,a.s_sums,a.z_sums from d_retail a,j_depot b where a.depotid=b.depotid and a.retailid='"&retailid&"'"
rs.open
vipcode=rs("vipcode")
suredate=rs("suredate")
tel=rs("tel")
comment=rs("comment")
add=rs("address")
sname=rs("s_name")
ssums=rs("s_sums")
zsums=rs("z_sums")
rs.close
if vipcode<>"" then
   rs.source = "select isnull(a.centum,0)+isnull(b.starcentum,0) as centum from vip_user a,vip_cardvip b "&_
               "where b.vipcardid='"&vipcode&"' and a.vipid=b.vipid"
   rs.open
   if not rs.eof then 
      centum=rs("centum")
   else
      centum=0
   end if
   rs.close
end if
set rs=nothing
if xname<>"" then xname=left(xname,len(xname)-1)%>
<table style='width:63mm' border="0" align="center" cellpadding="0" cellspacing="0">
<tr align=center height=60><td colspan=2 valign="middle"><img src="img/xpl_logo.jpg" border="0"><b><font class=f1> �������۵�</font></b></td></tr>
<tr height="20"><td colspan="2"><font class='f2'>���ţ�<%=retailid%></font></td></tr>
<tr height=20><td><font class='f2'>�������ƣ�<%=depotname%></font></td><td><font class='f2'>VIP����<%=vipcode%></font></td></tr>
<tr height=20><td><font class='f2'>���ڣ�<%=suredate%></font></td><td><font class='f2'>ʱ�䣺<%=time%></font></td></tr>
</table>
<%dim ds,cn,tmp,i
sum=0
%><table width="242" border="1" align="center" cellpadding="0" cellspacing="0" class='f12' id="t" style='width:63mm'>
  <tr align=center>
    <td width="31%">����</td>
    <td width="16%">��ɫ</td>	
	<td width="12%">����</td>	
    <td width="13%">����</td>
	<td width="14%">���ۼ�</td>
    <td width="14%">�����</td>
  </tr>
  <%
  i=0
  while not ds.eof
  i=i+1%>
  <tr align=center>
    <td><%=ds("styleid")%></td>
    <td><%=ds("colorid")%></td>
	<td><%=ds("sizeid")%></td>	
    <td><%nums=nums+cdbl(ds("nums"))
    response.Write cdbl(ds("nums"))%></td>
	<td><%xsums=xsums+cdbl(ds("xsums"))
    response.Write cdbl(ds("xsums"))%></td>
    <td><%sums=sums+cdbl(ds("sums"))
    response.Write cdbl(ds("sums"))%></td>
  </tr>
  <%ds.MoveNext
  wend
  ds.Close%>
  <tr align=center height="20"><td colspan="3">�ܼ�</td><td><%=nums%></td><td><%=xsums%></td><td><%=sums%></td></tr>
</table> 
<table style='width:63mm' border="0" align="center" cellpadding="0" cellspacing="0"> 
  <tr height="20"><td>֧��</td><td><%=ssums%></td><td>����</td><td></td><td><%=zsums%></td></tr>
  <tr height="20"><td>ӪҵԱ</td><td colspan="5"><%=xname%></td></tr>
</table>
<table style='width:63mm' border="0" align="center" cellpadding="0" cellspacing="0">
<%ds.source = "select retype,sums from pos_skfs where retailid='"&retailid&"' and isnull(sums,0)<>0"
ds.open
j=1
while not ds.eof
   retype=ds("retype")
   if j=1 then%>
   <tr><td width=100><font class=f2>�տʽ��</font></td><td width=250><font class=f2><%response.write(retype&" : "&ds("sums"))%></font></td></tr>
   <%else%>
   <tr><td></tr><td><font class=f2><%response.write(retype&" : "&ds("sums"))%></font></td></tr>
   <%end if
   j=j+1
ds.movenext
wend
ds.close
set ds=nothing%>
</table>
<br>
<table style='width:63mm' border="0" align="center" cellpadding="0" cellspacing="0">
<tr align="center" height=40><td><font class=f1>**** ��л�ݹ� ****</font></td></tr>
<tr><td><br></td></tr>
<tr height="50">
  <td align="left">&nbsp;&nbsp;&nbsp;&nbsp;ע������������7�����������������ƾСƱ����������ؼ���Ʒ���⡣<br>
  <td align="center">&nbsp;</td>
</tr>
</table>
<center class="Noprint" >
<input  type="button"  value="��ӡ(P)" onClick="printTable('t');" accesskey="p">
<!--<input  type="button"  value="ֱ�Ӵ�ӡ"  onclick="b2();">
<input  type="button"  value="ҳ������"  onclick="b3();">
<input  type="button"  value="��ӡԤ��"  onclick="b4();">-->
<input  type="button"  value="�ر�(C)"  onclick="pageClose();" accesskey="c">
</center>
</form>
<script language="javascript">
var wh=300+20*<%=i%>;
window.dialogWidth="400px";
window.dialogHeight=wh+"px";
</script>
 </body>
</HTML>
