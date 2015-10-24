<%option explicit
Response.Expires=-1000
'on error resume next%>
<!--#include file="inc/function.asp" -->
<%dim ds
set ds=server.CreateObject("ADODB.Recordset")
    ds.activeconnection = cn%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>添加换货单</title>
<link href="css/f22.css" rel="stylesheet" type="text/css">
<script language="javascript" src="../inc/js/setday.js"></script>
<script type="text/javascript" src="inc/abc.js"></script>
<script language="javascript">
<%Call SelectSF()%>
function checkform(){
  var outindentid,outindent,set_depotid,get_mchid,backrate,get_depotid,msg="";
  with(document){
    outindentid=trim(form1.outindentid.value);
    outindent=trim(form1.outindent.value);
    set_depotid=trim(form1.set_depotid.value);
	get_mchid=trim(form1.get_mchid.value);
	get_depotid=trim(form1.get_depotid.value);
	backrate=trim(form1.backrate.value);
    if(isEmpty(outindentid)){
      msg="流水号不能为空!";
	  form1.outindentid.focus();
    }
    if(isEmpty(outindent)){
      msg="配货单号不能为空!";
      form1.outindent.focus();
    }
	
	if(isEmpty(set_depotid)){
	  msg="收货仓库不能为空!";
	  alert(msg);
	  selectMD('sm');
	  return false;
	}
	if(isEmpty(get_depotid) || isEmpty(get_mchid)){
	  msg="发货仓库不能为空!";
	  alert(msg);
	  selectMD('sm');
	  return false;
	}
	if(isEmpty(backrate)){
	  form1.backrate.value="0";
	}
  }
  if(msg=="")
    return true;
  else{
    alert(msg);
    return false;
  }
}

</script>
<base target="_self">
</head>

<body>
<%
dim id,sql,action
dim outIndentid,outindent,MerchantId,setdate,sure,chk_sure,set_depotid,getdate,d_type,crname,chkname,parentid 'as string
dim chk_date,sure_date,ov_date,ov_sure,ov_name,cr_date,crdate,comment,backrate,selltype,backdate 'as string
dim sdptname,edptname,merchantname,get_depotid,get_mchid,eparentid,sparentid ' as string
id=trim(request("id"))
action=trim(request.Form("action"))
if id<>"" then session("id")=id
if action="" then action=trim(request.QueryString("action"))
'response.Write(action)
select case action
case "del"
  Call getGant("del",0)
  if id="" then 
    Err.Raise 50001,"create_quota.edit","请选择要删除的单据!"
  else
    sql="delete from d_outIndent Where outindentid='" & id &"'"
    cn.execute sql
	set cn=nothing
	call close("删除成功!")
  end if
case "save"
  save
case "edit"
  if id="" then
    Err.Raise 50001,"create_quota.edit","请先选择单据,才能编辑!"
  else
    sql="Select * From v22p_outindent Where outindentid="&qts(id)
	ds.source = sql
    ds.open
    'response.Write(sql)
    if not ds.eof then
	  outindentid=ds("outindentid")
	  outindent=ds("outindent")
      set_depotid=ds("depotid")
	  sdptname=ds("setdptname")
      merchantid=ds("merchantid")
	  get_depotid=ds("set_depotid")
	  edptname=ds("getdptname")
	  setdate=ds("setdate")
	  parentid=ds("setparentid")
      eparentid=ds("getparentid")
	  'getdate=ds("getdate")
      backrate=ds("backrate")
      comment=ds("comment")
    end if
    ds.close
    set ds=nothing
    call show
  end if
case "create"
  Call getGant("create",0)
  outindentid=getid("d_outindentpro","outindentid","SQ",session("dm").System_UserId)
  outindent=outindentid
  get_depotid=session("dm").System_Depotid
  edptname=session("dm").System_DepotName
  get_mchid=session("dm").System_UnitId
  merchantid=get_mchid
  'set_depotid=session("dm").System_Depotid
  'sdptname=session("dm").System_DepotName
  setdate=get_date(date)
  backrate="True"
  session("id")=outindentid
  call show
case else
  Err.Raise 50001,"create_quota.else","没有设置命令!"
end select%>
<%sub show%>
<form name="form1" method="post" action="" onSubmit="return checkform();">
  <table width="480"  border="0" align="center" class="bar">
    <tr>
      <td align="center">换货单</td>
    </tr>
  </table>
  <table width="480"  border="0" align="center" class="tcontent">
    <tr>
      <td width="19%" align="right"><input name="action" type="hidden" value="save">
        流水号:</td>
      <td width="85%"><input name="outindentid" type="text" id="outindentid" value="<%=outindentid%>" size="22" maxlength="22" readonly>
          <input type="hidden" name="hiddenField">          </td>
    </tr>
    <tr>
      <td align="right">退货单号:</td>
      <td><input name="outindent" type="text" id="outindent" value="<%=outindent%>" size="22" maxlength="22">          </td>
    </tr>
    <tr>
      <td align="right">发货仓库:</td>
      <td>
        <input name="get_depotid" type="text" id="get_depotid" value="<%=get_depotid%>" size="22" maxlength="10" readonly>
          <input type="button" name="Submit" value="..." onClick="selectMD('sm');">
          <input name="edptname" type="text" class="tcontent" id="edptname" style="border:none;" value="<%=edptname%>" size="10" readonly>
          <input name="get_mchid" type="hidden" id="get_mchid" value="<%=merchantid%>">
          <input name="parentid" type="hidden" id="parentid" value="<%=parentid%>">
     </td>
    </tr>
    <tr>
      <td align="right">收货店铺:</td>
      <td>
        <input name="set_depotid" type="text" id="set_depotid" value="<%=set_depotid%>" size="22" maxlength="10" readonly>
        <input type="button" name="Submit" value="..." onClick="selectMD('sd');">
        <input name="sdptname" type="text" class="tcontent" id="sdptname" style="border:none;" value="<%=sdptname%>" size="10" readonly>
      </td>
    </tr>
    <tr>
      <td align="right">发货日期:</td>
      <td><input name="setdate" type="text" id="setdate" onFocus="setday(this)" value="<%=setdate%>" size="10" readonly>
      占有退货率:
      <input name="backrate" type="checkbox" id="backrate" value="1" <%if backrate="True" then response.Write(" checked") end if%>></td>
    </tr>
    
    <tr>
      <td align="right">备注:</td>
      <td><input name="comment" type="text" id="comment" value="<%=comment%>
" size="50"></td>
    </tr>
  </table>
  <table width="480"  border="0" align="center">
    <tr>
      <td></td>
    </tr>
  </table>
  <div align="center">
    <table width="480"  border="0" class="tcontent">
      <tr>
        <td align="center"><input type="submit" name="Submit" value="保存(S)" accesskey="s">
            <input type="button" name="Submit" value="取消(X)" onClick="window.close();" accesskey="x"></td>
      </tr>
    </table>
  </div>
</form>
<%end sub%>
<%sub save
  outindentid=trim(request.Form("outindentid"))
  outindent=trim(request.Form("outindent"))
  get_depotid=trim(request.Form("get_depotid"))
  set_depotid=trim(request.Form("set_depotid"))
  merchantid=trim(request.Form("get_mchid"))
  sparentid=trim(request.Form("sparentid"))
  eparentid=trim(request.Form("eparentid"))
  setdate=trim(request.Form("setdate"))
  backrate=trim(request.Form("backrate"))
  comment=trim(request.Form("comment"))
  setdate=get_date(setdate)
  sql="select * from d_outindentpro where outindentid ="& qts(outindentid)
  ds.CursorType = 1
  ds.CursorLocation = 2
  ds.LockType = 3
  ds.source = sql
  ds.open
  if ds.eof then
    Call getGant("create",0)
    '保存新增
    ds.AddNew
	ds("outindentid")=outindentid
	ds("outindent")=outindent
	ds("depotid")=set_depotid
	ds("merchantid")=merchantid
	ds("set_depotid")=get_depotid
	ds("setdate")=setdate
	ds("backrate")=session("d_type")
	ds("comment")=comment
	ds("cr_name")=session("dm").System_UserName
	ds("cr_date")=get_date(date)
	'ds("crdate")=get_date(date)
	ds("chk_sure")=0
	ds("sure")=0
	ds("ov_sure")=0
	ds("ass_sure")=0
	ds("prop_sure")=1
	ds("propdate")=get_date(date)
	ds("propname")=session("dm").System_UserName
	ds.Update
	ds.close
	set ds=nothing
	response.Write("<script language='javascript'>")
	response.Write("showModalDialog('f22_main.asp?id="&outindentid&"&pksname="&session("pksname")&"&opt=outindentPRO&numName=nums','es','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no');")
	response.Write("window.returnValue='r';window.close();</script>")
  else
    Call getGant("edit",0)
	ds("outindent")=outindent
	ds("depotid")=set_depotid
	ds("merchantid")=merchantid
	ds("set_depotid")=get_depotid
	ds("setdate")=setdate
	ds("comment")=comment
	ds.update
	ds.close
    set ds=nothing
	call close("修改成功!")
  end if
end sub%>
<%session("SPName")="f22_lroutindentsub"%>
<%if err.number <>0 then
    response.write "<script language='javascript'>alert("""&err.description&""");window.history.back();</script>"
end if%>
<script language="javascript">
 window.dialogWidth="500px";
  window.dialogHeight="280px";
  //window.dialogLeft   X座标   
  //window.dialogTop   Y座标 
</script>
</body>
</html>
<!--#include file="inc/foot.asp" -->