<!--#include file="../inc/function.asp"-->
<%
id = trim(request("id"))
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="../css/f22.css" rel="stylesheet" type="text/css">
<title>�ջ�ȷ��</title>
<script type="text/javascript" src="../../../../scripts/jquery-1.2.6.min.js"></script>
<script type="text/javascript" src="../../../../js/sound.js"></script>
<script language="javascript">
function clothing(id){
  showModalDialog('../clothing.asp?id='+id,'example04','dialogWidth:600px;dialogHeight:370px;center: yes;help:no;resizable:yes;status:no');
}

function chkkp()
{
  if(event.keyCode<45||event.keyCode>57){event.returnValue = false;}
}

function chkblur(obj)
{ 
  if(isNaN(obj.value))
    {alert('�������ͣ�');obj.focus();}
  obj.value=Math.floor(obj.value);
  if(obj.value<0)
    {obj.value=1;}
}

$(function(){
	$("#key")
	.keydown(function(){									
			if(event.keyCode==13)
			{
			    if($("#key").val()=='')
				  {$("#key").focus();
				   return false;}
				var clothingid=$("#key").val();
			    $("#clothingid").val(clothingid.toUpperCase());
				$("#key").val('');
				$("#key").select();
				$("#key").focus();
				$("#submit1").click();
				event.keyCode=0;
				return false;
			}
	})
});
  
function submitdata()
{ var str,obj,typ,nums;
  if($("#typ").eq(0).attr('checked'))
    {typ=1;}
  else
    {typ=-1;}
  nums=parseInt($("#nums").val());
  str = 'id='+$("#id").val()+'&clothingid='+$("#clothingid").val()+'&typ='+typ+'&tmln='+$("#tmln").val()+'&nums='+nums;
  obj = chkclothing('2062_getsell_save.asp?date()',str);
  if(obj=='true')
  {
     PlayScanSound();
     var i=parseInt($("#calNum").text());
	 i=i+(typ*nums);
     $("#calNum").text(i.toString(10));
	
	 if ($("#scantype").eq(0).attr('checked'))
	 {
  	    getjson('GetDataJson.asp?date()','act=d_sell&id='+$("#id").val());
	 }
	 else
	 {
 	    getjson('GetDataJsonForSH.asp?date()','act=d_sell&id='+$("#id").val()+'&clothingid='+$("#clothingid").val()+'&tmln='+$("#tmln").val());

	 }
	 
  }
  else if(obj=='flow'){
    alert("ϵͳ������Ϊ���ü�¼������ˮ�ţ�����¼���ظ������룡");
     $("#key").focus();
		 $("#key").select();
  }
  else
  {
     alert("����ʧ�ܣ�\n\n1����Ų����ڣ�\n\n2�������ȡλ����ȷ��\n\n3���˿�Ų��ڷ������У�");
     $("#key").focus();
	 $("#key").select();
  }
}

function chkclothing(url,data)
{
   var html = $.ajax({
        url: url,
        type: "POST",
		dataType: "html",
        data: data,
        async: false
        }).responseText;
        return html;
}

function getjson(url,data)
{
	$.ajax({
	url: url,
	type: "post",
	dataType: "json",
	data: data,
	async: false,
	success: function(msg) {
           var json = msg["data"];
           $("#gridcontent").empty();
		   var zn1=0;
		   var zn2=0;
		   var zce=0;
		   var zs=0;
           $.each(json,function(i,o){
            var row=$("#sub_template").clone();
			    row.find("#sub_clothingid").html('<a href=javascript:clothing("'+o.clothingid+'")>'+o.clothingid+'</a>');
				row.find("#sub_sname").text(o.s_name);
                row.find("#sub_colorid").text(o.colorid+o.c_name);
                row.find("#sub_sizeid").text(o.sizeid);
                row.find("#sub_snums").text(o.snums);
				row.find("#sub_fnums").text(o.fnums);
				row.find("#sub_ce").text(o.ce);
				row.find("#sub_xprice").text(o.x_price);
				row.appendTo("#gridcontent");
                row.show();
				zn1+=parseInt(o.snums);
				zn2+=parseInt(o.fnums);
				zce+=parseInt(o.ce);
				zs=zs+parseInt(o.fnums)*parseFloat(o.x_price);
			});
		   $("#zs_nums").text(zn1.toString(10));
		   $("#zf_nums").text(zn2.toString(10));
		   $("#z_ce").text(zce.toString(10));
		   $("#z_xprice").text(zs.toString(10));
		}
	})
}

function qryalldata()
{
  	getjson('GetDataJson.asp?date()','act=d_sell&id='+$("#id").val());
}

function deldata()
{
    if (confirm("ɾ��ɨ��������,�˵���������ɨ���ջ�,ȷ��Ҫɾ����"))
	{
		getjson('GetDataJson.asp?date()','act=d_sell&typeid=-1&id='+$("#id").val());
	    getjson('GetDataJson.asp?date()','act=d_sell&id='+$("#id").val());
	}
	else
	{
	   return;
	}
}
</script>
</head>

<body onLoad="document.all.key.focus()">
<embed id="soundControl" src="../../../../sound/scan.wav"  mastersound hidden="true" loop="false" autostart="false"></embed>
<table width="100%" border="0" class="bar">
  <tr>
    <td>ҵ����� &gt;&gt; �����ջ�ȷ�� </td>
  </tr>
</table> 
<%

set rs = Server.CreateObject("ADODB.Recordset")
rs.ActiveConnection = cn

rs.source = "select getchk_sure from d_sell where sellid="&qts(id)
rs.open
if not rs.eof then
if rs(0)>0 then
     response.write("<script>alert('�˵�����ˣ�������ɨ��!');history.go(-2);</script>")
	 response.end
end if
end if
rs.close

sql = "select a.set_depotid,b.d_name,a.setsure_date from d_sell a,j_depot b where a.sellid='"&id&"' and a.set_depotid=b.depotid"
rs.source = sql
rs.open
if rs.eof then
  response.End()
else
  setdepotid=rs("set_depotid")
  setdptname=rs("d_name")
  setsure_date=rs("setsure_date")
end if
rs.close
set rs = nothing
cn.close
set cn= nothing
%>
<table width="100%" border="0" class="f14">
  <tr>
    <td>����: <%=id%> ������: <%=setdptname%>(<%=setdepotid%>) ��������: <%=setsure_date%></td>
  </tr>
</table>
<table width="100%" border="0">
  <tr>
    <td>
      ����:
      <input name="key" type="text" id="key"><input name="clothingid" type="hidden" id="clothingid">
	  <label><input type="radio" name="typ" id="typ" value="1" checked>��</label>
	  <label><input type="radio" name="typ" id="typ" value="-1">��</label>
	  ���� <input type="text" name="nums" id="nums" size="1" value="1" onKeyPress="chkkp()" onBlur="chkblur(this)" onFocus="this.select()">
	  <input type="button" name="submit1" id="submit1" value="ȷ��" onClick="submitdata()">
	  <input name="id" type="hidden" id="id" value="<%=id%>">
	  �����ȡ<input type="text" name="tmln" id="tmln" size=1 value="<%=session("postm_ln")%>" onKeyPress="chkkp()" onBlur="chkblur(this)" onFocus="this.select()">
	 
    </td>
    <td>������ <strong><span id="calNum" style="font-size:18px;color:red">0</span></strong>&nbsp;&nbsp;
       <input name="bu2" type="button" value="����������" onClick="javascript:document.getElementById('calNum').innerText='0';">
	   <input name="bu3" type="button" value="���ز�ѯ����" onClick="javascript:location.href='../search_frame.asp?action=search'">
	</td>
  </tr>
  <tr>
  <td><label><input type="radio" name="scantype" id="scantype" value="0" checked>��׼ģʽ</label>
	  <label><input type="radio" name="scantype" id="scantype" value="1" >����ģʽ</label>
	  &nbsp;&nbsp;&nbsp;&nbsp;
	 <input type="button" name="queryall" id="queryall" onClick="qryalldata();"  value="��ѯȫ����¼">
	 <input type="button" name="del" id="del" onClick="deldata();"  value="ɾ��ɨ������">
	  </td>
  <td> </td>
  </tr>
</table>
<table width="100%" border="1" class="f14" bordercolordark="#FFEFEF">
  <thead>
    <tr align="center"><td>�� ��</td>
	   <td>��ʽ����</td>
	   <td>�� ɫ</td>
	   <td>�� ��</td>
	   <td>�ջ�����</td>
	   <td>��������</td>
	   <td>�� ��</td>
	   <td>�� ��</td>
	</tr>
	<tr bgcolor="#C6E7FF" align="center">
	   <td>�� ��</td><td>&nbsp;</td>
	   <td>&nbsp;</td>
	   <td>&nbsp;</td>
	   <td id="zs_nums"></td>
	   <td id="zf_nums"></td>
	   <td id="z_ce"></td>
	   <td id="z_xprice"></td>
	</tr>
	<tr align=center id="sub_template">
	   <td id="sub_clothingid"></td>
	   <td id="sub_sname"></td>
	   <td id="sub_colorid"></td>
	   <td id="sub_sizeid"></td>
	   <td id="sub_snums"></td>
	   <td id="sub_fnums"></td>
	   <td id="sub_ce"></td>
	   <td id="sub_xprice"></td>
	</tr>
  </thead>
  <tbody id="gridcontent"></tbody>
</table>
<script type="text/javascript">
getjson('GetDataJson.asp?date()','act=d_sell&id='+$("#id").val());
</script>
</body>
</html>