<%Response.cachecontrol = "no-cache"
Response.Expires=-1000%>
<HTML>
  <HEAD><meta http-equiv="Content-Type" content="text/html; charset=gb2312">
  <title>打印小票</title>
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

  <style type="text/css">
<!--
body,td,th {
	font-size: 12px;
}

.t1{font-size:12px}
.t2{font-size:15px}
-->
</style></HEAD>
 <body>
  <form>
    <style media='print'>
   .Noprint { DISPLAY: none }
   .PageNext { PAGE-BREAK-AFTER: always }
  </style>
<%dim dname,retailid,sname,xname,suredate,suretime,add,vipcode,centum,tel,nums,sums,ssums,zsums,comment
retailid=trim(request.querystring("id"))
cn=session("cn")

if cn="" or cn=null then
  cn=request.Cookies("cn")
end if


set ds=Server.CreateObject("ADODB.Recordset")
ds.ActiveConnection = cn
ds.source = "select a.retailid,b.d_name,isnull(a.vipcode,'') as vipcode,convert(char(10),a.sure_date,126) as surdate,"&_
"convert(char(8),a.sure_date,114) as surtime,a.s_name,a.comment from d_retail a,j_depot b"&_
" where a.depotid=b.depotid and a.retailid='"&retailid&"'"
'"where a.retailid='"&retailid&"' and a.depotid=b.depotid "
'response.Write "<textarea>"& ds.Source&"</textarea>"
'response.end
ds.open
dname=ds("d_name") '店铺名称
sname=ds("s_name") '收银员
suredate=ds("surdate") '销售日期
suretime=ds("surtime") '销售时间
'add=ds("address") '店铺地址
'tel=ds("tel") '店铺电话
vipcode=ds("vipcode") 'VIP卡号
comment=ds("comment") '单据备注
'ssums=ds("s_sums") '实收
'zsums=ds("z_sums") '找回
centum=0
ds.close
if vipcode<>"" then
   ds.source = "select isnull(a.centum,0)+isnull(b.starcentum,0) as centum from vip_user a,vip_cardvip b "&_
               "where b.vipcardid='"&vipcode&"' and a.vipid=b.vipid"
   ds.open
   if not ds.eof then 
      centum=ds("centum")
   else
      centum=0
   end if
   ds.close
end if
'营业员
ds.Source="select names from jk_retailhistory where retailid='"&retailid&"'" 
ds.Open
xname=""
while not ds.EOF
xname=xname&ds("names")&","
ds.MoveNext
wend
ds.Close
if xname<>"" then xname=left(xname,len(xname)-1) '营业员
%>
<table style="width:198pt" border="0" align="center" cellpadding="0" cellspacing="0">
<tr><td align=center><b><font class="t2">销售小票</font></b><br><br></td></tr>
<tr><td align=center><b><font class="t2"><%=dname%></font></b><br></td></tr>
<tr><td>销售单号：<%=retailid%></td></tr><br>
<!--<tr><td>店铺：</td><td><%=dname%></td><td width=55>VIP卡号：</td><td><%=vipcode%></td></tr>
<tr><td>日期：</td><td><%=suredate%></td><td> 时间：</td><td><%=suretime%></td></tr>-->
</table>
<%ds.Source =" select a.styleid,a.clothingid,b.s_name,a.nums,discount=convert(numeric(14,2),a.discount),a.x_price,a.s_price,a.nums*a.s_price as sums,c.c_name,d.s_name,larg=isnull(a.larg,0),back=isnull(a.back,0) "&_
"from d_retailsub a,j_style b,j_color c,J_size d"&_
             " where a.styleid=b.styleid and a.colorid=c.colorid and a.sizeid=d.sizeid and a.retailid='"&retailid&"' order by larg,back "
  ds.Open
%>
<%dim ds,cn,tmp,i,j,retype
nums=0
sums=0
i=0
%><table style="width:193pt" border="0" align="center" cellpadding="0" cellspacing="0" id="t">
  <tr><td colspan=8><hr size=1></td></tr>
  <tr align='center'>
    <td width="15%">款式编号</td>
	<td width="12%">色名</td>
	<td width="12%">尺码</td>
	 <td width="11%">数量</td>
    <!--<td width="15%">名称</td>-->
    <td width="15%">零售价</td>
	<td width="11%">折扣</td>
   
    <td width="18%">结算价</td>
    </tr>
  <%
  while not ds.eof
  i=i+1%>
  
  <%if ds("larg")=true then  %>
    <tr align=center>
    <td>赠品</td>
	<td></td>
    <td></td>
    <td></td>
	<td></td>
	<td></td>
	<td></td>
  </tr>
  <% end if %>
  
  <%if ds("back")=true then  %>
    <tr align=center>
    <td><%if ds("nums")<0 then response.Write("退货") else response.Write("换货")  end if %></td>
	<td></td>
    <td></td>
    <td></td>
	<td></td>
	<td></td>
	<td></td>
  </tr>
  <% end if %>
   
  <tr align=center>
    <td><%=ds("styleid")%></td>
	 <td><%=ds("c_name")%></td>
    <td><%=ds("s_name")%></td>
    <td><%=ds("nums")%></td>
	<td><%=ds("x_price")%></td>
	<td><%=ds("discount")%></td>
	<td><%=ds("s_price")%></td>
  </tr>
  
  <%nums=nums+cdbl(ds("nums"))
	sums=sums+cdbl(ds("sums"))
  ds.MoveNext
  wend
  ds.Close%>
 <tr><td colspan=8><hr size=1></td></tr>
  <tr align=center>
    <td>&nbsp;总计：</td>
    <td>&nbsp;&nbsp;&nbsp;</td>
	
    <td></td>
	<td><%=nums%><td>
    <td></td>
    <td colspan="2"><%=sums%></td>
  
  </tr>
  <tr><td colspan=8><hr size=1></td></tr>
  <!--
  <tr><td colspan=6><hr size=1></td></tr>
  <tr height="30">
  <td colspan="5" align="right"><font class="t2">总计：</font></td>
  <td colspan="5" align="right"><font class="t2">总计：</font></td>
  <td><font class="t2"><%=sums%></font></td>
  </tr>-->
</table>
<table style="width:198pt" border="0" align="center" cellpadding="0" cellspacing="0">
<tr><td colspan="2" width='100'>VIP:<%=vipcode%></td>
</tr>
<br>
<tr>
<td>收银:<%=sname%></td><td>导购:<%=xname%></td>
</tr>
<tr><td colspan="2">时间:<%=suredate%></td>
</tr>
</table>
<table style="width:198pt" border="0" align="center" cellpadding="0" cellspacing="0">  
<tr><td colspan="5">备&nbsp;&nbsp;注:<%=comment%></td></tr>
<tr><td>1.调换货品必须出示购物单据(特价货品恕不退换)</td></tr>
<tr><td>2.顾客请按标签之洗涤方法清洗衣服.</td></tr>
<!--<tr><td>导购员：</td><td><%=xname%></td><td>电&nbsp;话：</td><td><%=tel%></td></tr>
<tr height="30"><td colspan="4" align="center">***多谢惠顾***</td></tr>-->
</table>
<center class="Noprint" ><hr style="width:183pt" size=1>
<input  type="button"  value="打印(P)" onClick="printTable('t');" accesskey="p">
<!--<input  type="button"  value="直接打印"  onclick="b2();">
<input  type="button"  value="页面设置"  onclick="b3();">
<input  type="button"  value="打印预览"  onclick="b4();">-->
<input  type="button"  value="关闭(C)"  onclick="pageClose();" accesskey="c">
</center>
</form>
<script language="javascript">
var wh=300+20*<%=i%>;
window.dialogWidth="400px";
window.dialogHeight=wh+"px";
</script>
</body>
</HTML>

