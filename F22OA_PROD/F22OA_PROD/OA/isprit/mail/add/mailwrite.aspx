﻿<%@ page language="C#" autoeventwireup="true" inherits="isprit_mail_add_mailwrite, App_Web_mailwrite.aspx.a8c6f93b" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>HtmlEdit</title>
		
		<link href="images/css.css" rel="stylesheet" type="text/css"/>
		<script language="JavaScript" type="text/javascript">
function CheckForm()
{
   if (document.all.TO_ID.value=="")
   { alert("请添加收件人！");
     return (false);
   }
     if (document.all.tbtitle.value=="")
   { alert("请填写邮件标题！");
     document.all.tbtitle.focus();
     return (false);
   }
   return (true);
  }
//清除用户
function clear_user()
{
  document.all.TO_NAME.value="";
  document.all.TO_ID.value="";
}
//清除文件
function clear_file()
{
  document.all.TO_FILE.value="";
  document.all.HFILE.value="";
}

function LoadWindow(url)
{
  loc_x=document.body.scrollLeft+event.clientX-event.offsetX-100;
  loc_y=document.body.scrollTop+event.clientY-event.offsetY+170;
  window.showModalDialog(url,self,"edge:raised;scroll:2;status:0;help:0;resizable:1;dialogWidth:350px;dialogHeight:300px;dialogTop:"+loc_y+"px;dialogLeft:"+loc_x+"px");
}

		</script>
		<script language="JavaScript" type="text/javascript">
<!--
var Format = "Normal";
var initHTML = "";
var CssFile="";
var edit;
var RangeType;
var CssFile="";
var returnValue="";

//把iframe中填充为新的模板
function getModel(sVal) {
  if (document.all.Editorstatus.value == "html" ) 
   Editor.document.body.innerText=sVal 
  else 
     Editor.document.body.innerHTML=sVal
}

//把iframe中的数据送给表单
function posts ()
{
if (document.all.TO_ID.value=="")
   { alert("请添加收件人！");
     return (false);
   }
     if (Editor.document.body.innerHTML=="")
   { alert("请填写邮件内容！");
     
     return (false);
   }
				 document.all.tbcontent.value = Editor.document.body.innerHTML;
				 Editor.document.body.innerHTML="";
				 return true
	

}

//从表单中取数据，用于修改文章时
function mr()
{
    Editor.document.body.innerHTML = document.all.tbcontent.value;
}
//初始化编辑器
function initEditor(Model)
{
    Editor.document.designMode=Model;
    Editor.document.open();
    initHTML = "";
    Editor.document.write(initHTML);
    Editor.document.close();
    mr();
    if(CssFile!="")
    {
        Editor.document.createStyleSheet(CssFile);
    }
    Editor.document.body.style.fontFamily = "{defaultfont}";
    Editor.document.body.style.fontSize ="12px";
    mr();
}
function doZoom( sizeCombo ) 
{
	if (sizeCombo.value != null || sizeCombo.value != "")
	if (oblog_bIsIE5){
	var z = Editor.document.body.runtimeStyle;}
	else{
	var z = Editor.document.body.style;
	}
	z.zoom = sizeCombo.value + "%" ;
}
// 修改编辑栏高度
function bobo_Size(num)
{
	var obj=document.getElementById("bobo_editor");
	if (parseInt(obj.Height)+num>=300) {
		//alert(obj.offsetHeight)
		obj.height+=num;
		Editor.height=+num;
	}
	if (num>0)
	{
		obj.width="100%";
	}
}
function FormatText(command, option)
{
var codewrite
if (oblog_bIsIE5){
		if (option=="removeFormat"){
		command=option;
		option=null;}
		Editor.focus();
	  	Editor.document.execCommand(command, false, option);
		oblog_pureText = false;
		Editor.focus();
		
}else{
		if ((command == 'forecolor') || (command == 'backcolor')) {
			parent.command = command;
			buttonElement = document.getElementById(command);
			Editor.focus();
			document.getElementById("colourPalette").style.left = getOffsetLeft(buttonElement) + "px";
			document.getElementById("colourPalette").style.top = (getOffsetTop(buttonElement) + buttonElement.offsetHeight) + "px";
		
			if (document.getElementById("colourPalette").style.visibility=="hidden")
				{document.getElementById("colourPalette").style.visibility="visible";
			}else {
				document.getElementById("colourPalette").style.visibility="hidden";
			}
		
			//get current selected range
			var sel = Editor.document.selection; 
			if (sel != null) {
				colour = sel.createRange();
			}
		}
		else{
		Editor.focus();
	  	Editor.document.execCommand(command, false, option);
		oblog_pureText = false;
		Editor.focus();
		}
	}

}
function oblog_rCode(s,a,b,i){
	//s原字串，a要换掉pattern，b换成字串，i是否区分大小写
	a = a.replace("?","\\?");
	if (i==null)
	{
		var r = new RegExp(a,"gi");
	}else if (i) {
		var r = new RegExp(a,"g");
	}
	else{
		var r = new RegExp(a,"gi");
	}
	return s.replace(r,b); 
}
function bobo_replace()
{
	var arr = showModalDialog("images/replace.html", "", "dialogWidth:16.5em; dialogHeight:13em; status:0; help:0");
	if (arr != null){
		var ss;
		ss = arr.split("*")
		a = ss[0];
		b = ss[1];
		i = ss[2];
		con = Editor.document.body.innerHTML;
		if (i == 1)
		{
			con = oblog_rCode(con,a,b,true);
		}else{
			con = oblog_rCode(con,a,b);
		}
		Editor.document.body.innerHTML = con;
	}
	else Editor.focus();
}
//特殊字符
function insertSpecialChar()
{
	var arr = showModalDialog("images/specialchar.html", "","dialogWidth:25em; dialogHeight:15em; status:0; help:0");
	if (arr != null) pasteHTML(arr);
	Editor.focus() ;
}
//插入RM电影
function bobo_forrm()
{
	var arr = showModalDialog("images/rm.htm", "", "dialogWidth:30em; dialogHeight:13.5em; status:0; help:0");
	
	if (arr != null)
	{
		var ss;
		ss = arr.split("*")
		path = ss[0];
		row = ss[1];
		col = ss[2];
		autostart = ss[3];
		ran = rand();
		var string;
		string="<object classid='clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA' width='"+row+"' height='"+col+"'><param name='CONTROLS' value='ImageWindow'><param name='CONSOLE' value='Clip'><param name='AUTOSTART' value='"+ autostart +"'><param name=src value="+path+"></object><br><object classid='clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'  width="+row+" height=32><param name='CONTROLS' value='ControlPanel,StatusBar'><param name='CONSOLE' value='Clip'></object>";
		//string = "[RM="+ row +","+ col +","+ autostart +"]"+ path +"[/RM]";
		Editor.document.body.innerHTML+=string;
	}
	else Editor.focus();
}
//插入表情动作
function bobo_foremot()
{
	var arr = showModalDialog("images/emot.htm", "", "dialogWidth:20em; dialogHeight:12em; status:0; help:0");
	
	if (arr != null)
	{
		pasteHTML(arr);
		Editor.focus();
	}
	else Editor.focus();
}
//ADD SWF
function bobo_forswf()
{
	var arr = showModalDialog("images/swf.htm", "", "dialogWidth:30em; dialogHeight:10em; status:0; help:0");
	if (arr != null){
		var ss;
		ss=arr.split("*")
		path=ss[0];
		row=ss[1];
		col=ss[2];
		var string;
		string="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'  codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0' width="+row+" height="+col+"><param name=movie value="+path+"><param name=quality value=high><embed src="+path+" pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' type='application/x-shockwave-flash' width="+row+" height="+col+"></embed></object>"
		//string="[flash="+row+","+col+"]"+path+"[/flash]"
		Editor.document.body.innerHTML+=string;
	}
	else Editor.focus();
}
//插入WMV电影
function bobo_forwmv()
{
	var arr = showModalDialog("images/wmv.htm", "", "dialogWidth:30em; dialogHeight:13.5em; status:0; help:0");
	
	if (arr != null){
		var ss;
		ss=arr.split("*")
		path=ss[0];
		autostart=ss[1];
		width=ss[2];
		height=ss[3];
		ran=rand();
		var string;
		var ubbstring;
		string="<object align=center classid=CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95 hspace=5 vspace=5 width="+ width +" height="+ height +"><param name=Filename value="+ path +"><param name=ShowStatusBar value=1><embed type=application/x-oleobject codebase=http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701 flename=mp src="+ path +"  width="+ width +" height="+ height +"></embed></object>";
		string="<EMBED id=MediaPlayer"+ran+" src="+ path +" width="+ width +" height="+ height +" autostart=\""+ autostart +"\" loop=\"false\"></EMBED><p></p>";
		//string="[MP="+ width +","+ height +","+ autostart +"]"+ path +"[/MP]";
		Editor.document.body.innerHTML+=string;
	}
	else Editor.focus();
}
//清楚代码
function CleanCode()
{
	Editor.focus();
	if (oblog_bIsIE5){
	// 0bject based cleaning
		var body = Editor.document.body;
		for (var index = 0; index < body.all.length; index++) {
			tag = body.all[index];
		//*if (tag.Attribute["className"].indexOf("mso") > -1)
			tag.removeAttribute("className","",0);
			tag.removeAttribute("style","",0);
		}
	// Regex based cleaning
		var html = Editor.document.body.innerHTML;
		html = html.replace(/\<p>/gi,"[$p]");
		html = html.replace(/\<\/p>/gi,"[$\/p]");
		html = html.replace(/\<br>/gi,"[$br]");
		html = html.replace(/\<[^>]*>/g,"");        ///过滤其它所有"<...>"标签
		html = html.replace(/\[\$p\]/gi,"<p>");
		html = html.replace(/\[\$\/p\]/gi,"<\/p>");
		html = html.replace(/\[\$br\]/gi,"<br>");
		Editor.document.body.innerHTML = html;
	}else
	{
		var html = Editor.document.body.ownerDocument.createRange();
		html.selectNodeContents(Editor.document.body);
		Editor.document.body.innerHTML = html.toString();
	}
}
function setFocus()
{
    Editor.focus();
}
function fixSize()
{
    document.all.Editor.style.height = Math.max(document.body.clientHeight - document.all.Editor.offsetTop, 0);
}
//选择对象
function selectRange()
{
    edit = Editor.document.selection.createRange();
    RangeType = Editor.document.selection.type;
}
function execCommand(command,para)
{
    if (Format == "Normal")
    {
        setFocus();
        selectRange();
        if ((command == "Undo") || (command == "Redo"))
        {
            document.execCommand(command);
        }
        else
        {
            if (para=="")
            {
                edit.execCommand(command);
            }
            else
            {
                edit.execCommand(command, false, arguments[1]);
            }
            Editor.focus();
        }
        if (RangeType != "Control")
        {
            edit.select();
        }
    }
}

//模式
function swapModes(Mode)
{
    switch(Mode)
    {
        case "Normal":
            if (Format == "Html")
            {
                Editor.document.body.innerHTML = Editor.document.body.innerText;
            }
            else
            {
                initHTML = Editor.document.body.innerHTML;
                initEditor("On");
            }
        break;
        case "Html":
            if (Format == "Preview")
            {
                initHTML = Editor.document.body.innerHTML;
                initEditor("On");
            }
            Editor.document.body.innerText = Editor.document.body.innerHTML;
        break;
        default:
            var strHTML = "";
            if(Format == "Html")
            {
                initHTML = Editor.document.body.innerText;
            }
            else
            {
                initHTML = Editor.document.body.innerHTML;
                initEditor("Off");
            }
        break;
    }
    Editor.focus();
    Format=Mode;
}

//粘标记
function pasteMark(Mark)
{
    var strHTML;
    if (Mark=='')
    {
        return(0);
    }
    setFocus();
    selectRange();
    var t=Mark.split(" ");
    strHTML = "<" + Mark + ">" + edit.text + "</" + t[0] + ">";
    if (Format == "Normal")
    {
        edit.pasteHTML(strHTML);
    }
    else
    {
        edit.text=strHTML;
        Editor.focus();
        edit.select();
    }
}

//粘贴html
function pasteHTML(HTML)
{
    setFocus();
    selectRange();
    if (Format == "Normal")
    {
        edit.pasteHTML(HTML);
    }
    else
    {
        edit.text=HTML;
    }
    Editor.focus();
    edit.select();
}

//选择时调用不同的css
function Check(t,n)
{
    if(n==1)
    {
        t.className ="Up";
    }
    else
    {
        if(n==2)
        {
            t.className ="Down";
        }
        else
        {
            t.className ="None";
        }
    }
}

//插入模板
function InsertImage()
{
  URL="model.htm";
  loc_x=document.body.scrollLeft+event.clientX-event.offsetX-100;
  loc_y=document.body.scrollTop+event.clientY-event.offsetY+170;
  window.showModalDialog(URL,self,"edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:350px;dialogHeight:300px;dialogTop:"+loc_y+"px;dialogLeft:"+loc_x+"px");
}

//检查浏览器版本
function CheckOS()
{
    if((window.navigator.userAgent.indexOf("IE 5") < 1)&&(window.navigator.userAgent.indexOf("IE 6") < 1))
    {
        alert("请使用Microsoft Internet Explorer 5.0\n或更高版本的浏览器！");
        window.close();
    }
}

//切换模式
function SelectFormat(Status)
{
    swapModes(Status);
    switch(Status)
    {
        case "Normal":
			document.all.Editorstatus.value = "normal"
            Html.style.display="none";
            Normal.style.display="block";
        break;
        case "Html":
		    document.all.Editorstatus.value = "html"
            Normal.style.display="none";
            Html.style.display="block";
        break;
        default:
		    document.all.Editorstatus.value = "normal"
            Normal.style.display="none";
            Html.style.display="block";
        break;
    }
    return(false);
}

//显示帮助
function showHelp()
{
    showModalDialog("help.htm","","dialogWidth:500px;dialogHeight:400px;status:no;");
}

//添加表格
function addTable()
{
    if(Format!="Preview")
    {
        ReturnValue=window.showModalDialog("table.htm","","dialogWidth=330px;dialogHeight=170px;status=0");
        if(ReturnValue && ReturnValue!="")
        {
            pasteHTML(ReturnValue);
        }
    }
}
//添加代码
function addCode()
{
	code = "<table width=\"100%\" cellspacing=\"0\" cellpadding=\"10\" bgcolor=\"#000000\" border=\"1\" bordercolor=\"#333333\" style=\"border-collapse:collapse;\"><tr><td width=\"100%\" bgcolor=#e6e6e6 style=\"Courier New;font-size: 12px;\">code:<br></td></tr></table><br>";
	pasteHTML(code);
}
//添加细线
function addLine()
{
	code = "<hr width=\"100%\" size=\"1\" color=\"#333333\">";
	pasteHTML(code);
}
//完成基本功能
function doFormat(what,para,Mark)
{
    selectRange ();
	if (Format=='Normal')
	{
		execCommand(what,para);
	}
	else
	{
		pasteMark(Mark);
	}
}

//下拉选择
function doSelectClick(str,el,Mark)
{
	var Index = el.selectedIndex;
	if (Index != 0)
	{
		el.selectedIndex = 0;
		if (Format=='Normal' && el.id != "OtherFormat")
		{
			doFormat(str,el.options[Index].value);
		}
		else
		{
			pasteMark(Mark);
		}
	}
}

//颜色表
function SelectColor(id)
{
    var c=window.showModalDialog("colorlist.htm",id.style.backgroundColor,"dialogWidth=420px;dialogHeight=360px;status=0");
    if(c && c!="")
    {
        id.style.backgroundColor=c;
    }
}
-->
		</script>
		
</head>
<body bgcolor="azure"  onload="initEditor('ON');">
    <form id="form1" runat="server">
    <div>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
				<tr>
					<td><table width="650" border="1" align="center" cellPadding="6" cellSpacing="0" bordercolor="#dbdbdb"
							bgcolor="#f8f8f8" id="bobo_editor">
							<TBODY>
								<tr>
									<td valign="top"><table width="100%" border="0" cellspacing="1" cellpadding="0">
											<tr>
												<td><TEXTAREA class="BigStatic" id="TO_NAME" style="WIDTH: 518px; HEIGHT: 56px; BACKGROUND-COLOR: lightgrey"
														name="TO_NAME" rows="3" readOnly wrap="soft" cols="62" runat="server"></TEXTAREA><BR>
													<INPUT id="TO_ID" type="hidden" name="TO_ID" runat="server"></td>
												<td><INPUT class="bt" style="WIDTH: 96px; HEIGHT: 22px" onClick="LoadWindow('../../module/selectpeople.aspx')"
														type="button" value="添加"><BR>
													<INPUT class="bt" title="清空收件人" style="WIDTH: 96px; HEIGHT: 20px" onClick="clear_user()"
														type="button" value="清 空" name="button">&nbsp;</td>
											</tr>
											<tr>
												<td>
													邮件标题
													<asp:TextBox id="tbtitle" runat="server" CssClass="tb" Width="304px"></asp:TextBox>
													<asp:CheckBox id="cbmsg" runat="server" Text="使用短消息提醒对方" ForeColor="#C00000" Checked="True"></asp:CheckBox></td>
												<td align="center">&nbsp;<A href="../../../manager/multfile.aspx" target="_blank">上传文件</A></td>
											</tr>
											<tr>
												<td><TEXTAREA class="BigStatic" id="TO_FILE" style="WIDTH: 520px; HEIGHT: 56px" name="textarea"
														rows="3" readOnly wrap="soft" cols="62" runat="server"></TEXTAREA></td>
												<td><INPUT class="bt" style="WIDTH: 96px; HEIGHT: 20px" onClick="LoadWindow('../../module/selectAttach.aspx')"
														type="button" value="选择附件"><br>
													<INPUT class="bt" title="清空文件" style="WIDTH: 96px; HEIGHT: 20px" onClick="clear_file()"
														type="button" value="清空附件" name="button"></td>
											</tr>
										</table>
									</td>
								<tr>
									<td>
										<table cellspacing="1" cellpadding="1" border="0">
											<tr align="center">
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="全选" onClick="FormatText('selectAll')"><img src="images/selectAll.gif" width="16" height="16"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="撤销" onClick="doFormat('Undo','','')"><img src="images/undo.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="恢复" onClick="doFormat('Redo','','')"><img src="images/redo.gif" width="21" height="21"></td>
												<td width="5"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="粗体" onClick="doFormat('Bold','','b')"><img src="images/bold.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="斜体" onClick="doFormat('Italic','','i')"><img src="images/italic.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="下划线" onClick="doFormat('Underline','','u')"><img src="images/under.gif" width="21" height="21"></td>
												<td width="5"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="左对齐" onClick="doFormat('JustifyLeft','','p align=left')"><img src="images/aleft.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="居中" onClick="doFormat('JustifyCenter','','p align=center')"><img src="images/center.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="右对齐" onClick="doFormat('JustifyRight','','p align=right')"><img src="images/aright.gif" width="21" height="21"></td>
												<td width="5"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="插入链结" onClick="doFormat('CreateLink','','')"><img src="images/wlink.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="添加图片/附件" onClick="InsertImage()"><img src="images/model.gif" width="42" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="插入表格" onClick="addTable()"><img src="images/table.gif" width="21" height="21"></td>
												<td width="5"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="背景颜色" onClick="doFormat('BackColor',bkcolorimg.style.backgroundColor+'','font style=BACKGROUND-COLOR:'+bkcolorimg.style.backgroundColor)"
													width="18"><img id="bkcolorimg" style="BACKGROUND-COLOR: #ffffff" src="images/bgcolor.gif" width="21"
														height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="选择背景颜色" style="FONT-WEIGHT: normal; FONT-SIZE: 5pt"
													onClick="SelectColor(bkcolorimg)" width="8">▼</td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="字体颜色" onClick="doFormat('ForeColor',colorimg.style.backgroundColor+'','font color='+colorimg.style.backgroundColor)"
													width="18"><img id="colorimg" style="BACKGROUND-COLOR: #ffffff" src="images/fontcolor.gif" width="21"
														height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="选择字体颜色" style="FONT-WEIGHT: normal; FONT-SIZE: 5pt; LINE-HEIGHT: normal; FONT-STYLE: normal; FONT-VARIANT: normal"
													onClick="SelectColor(colorimg)" width="8">▼</td>
												<td width="5"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="减小缩进" onClick="doFormat('Outdent','','')"><img src="images/ileft.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="增加缩进" onClick="doFormat('Indent','','BLOCKQUOTE')"><img src="images/iright.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="插入水平线" onClick="addLine()"><img src="images/hr.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="编号" onClick="doFormat('FormatBlock','<OL>','ol')"><img src="images/nlist.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="项目符号" onClick="doFormat('FormatBlock','<UL>','ul')"><img src="images/ulist.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="插入代码" onClick="addCode()"><img src="images/code.gif" width="21" height="21"></td>
											</tr>
										</table>
										<table cellspacing="0" cellpadding="2">
											<TR>
												<TD><SELECT class="box2" style="WIDTH: 90px" onChange="doSelectClick('FontName',this,'font face=&quot;'+this.value+'&quot;')"
														size="1" name="selectFontName">
														<OPTION selected>[选择字体]</OPTION>
														<OPTION value="Arial">Arial</OPTION>
														<OPTION value="Arial Black">Arial Black</OPTION>
														<OPTION value="Arial Narrow">Arial Narrow</OPTION>
														<OPTION value="MS Outlook">MS Outlook</OPTION>
														<OPTION value="宋体">宋体</OPTION>
														<OPTION value="楷体_GB2312">楷体</OPTION>
														<OPTION value="隶书">隶书</OPTION>
														<OPTION value="黑体">黑体</OPTION>
														<OPTION value="仿宋_GB2312">仿宋</OPTION>
													</SELECT>
												</TD>
												<TD><SELECT class="box2" style="WIDTH: 90px; HEIGHT: 20px" onChange="doSelectClick('FontSize',this,'font size='+this.value);"
														size="1" name="selectFontSize">
														<OPTION selected>[字体大小]</OPTION>
														<OPTION value="1">(1)号字</OPTION>
														<OPTION value="2">(2)号字</OPTION>
														<OPTION value="3">(3)号字</OPTION>
														<OPTION value="4">(4)号字</OPTION>
														<OPTION value="5">(5)号字</OPTION>
														<OPTION value="6">(6)号字</OPTION>
														<OPTION value="7">(7)号字</OPTION>
													</SELECT>
												</TD>
												<TD><SELECT class="box2" id="OtherFormat" style="WIDTH: 90px; HEIGHT: 20px" onChange="doSelectClick('FormatBlock',this,this.value);this.returnValue=false;"
														size="1" name="OtherFormat">
														<OPTION selected>[特殊格式]</OPTION>
														<OPTION value="SUP">上标</OPTION>
														<OPTION value="SUB">下标</OPTION>
														<OPTION value="DEL">删除线</OPTION>
														<OPTION value="BIG">增大字体</OPTION>
														<OPTION value="SMALL">减小字体</OPTION>
													</SELECT>
												</TD>
												<TD><SELECT class="box2" id="select2" style="WIDTH: 90px; HEIGHT: 20px" onChange="doSelectClick('FormatBlock',this,this.options[this.selectedIndex].value); this.returnValue=false;"
														size="1" name="selectBlockFormat">
														<OPTION selected>段落格式</OPTION>
														<OPTION value="<P>">普通</OPTION>
														<OPTION value="<PRE>">已编排格式</OPTION>
														<OPTION value="<H1>">标题一</OPTION>
														<OPTION value="<H2>">标题二</OPTION>
														<OPTION value="<H3>">标题三</OPTION>
														<OPTION value="<H4>">标题四</OPTION>
														<OPTION value="<H5>">标题五</OPTION>
														<OPTION value="<H6>">标题六</OPTION>
													</SELECT>
												</TD>
												<TD><SELECT class="oblog_TBGen" id="Zoom" onChange="doZoom(this)" name="select2">
														<OPTION value="100" selected>
														100%<OPTION value="50">
														50%<OPTION value="75">
														75%<OPTION value="100">
														100%<OPTION value="125">
														125%<OPTION value="150">
														150%<OPTION value="175">
														175%<OPTION value="200">200%</OPTION>
													</SELECT></TD>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="去除格式" onClick="doFormat('RemoveFormat','','')"
													width="16"><img src="images/unformat.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="清除代码" onClick="CleanCode()"><span class="oblog_Btn"><img class="oblog_Ico" src="images/cleancode.gif" WIDTH="16" HEIGHT="16"></span></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="插入特殊字符" onClick="insertSpecialChar()"><img src="images/specialchar.gif" width="21" height="21"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="插入表情动作" onClick="bobo_foremot()"><img src="images/emot.gif" width="19" height="19"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="插入SWF" onClick="bobo_forswf()"><img src="images/swf.gif" width="16" height="16"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="插入RM电影" onClick="bobo_forrm()"><FONT face="宋体"></FONT></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="插入WMV电影" onClick="bobo_forwmv()"><FONT face="宋体"></FONT></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="查找替换" onClick="bobo_replace()"><img src="images/replace.gif" width="16" height="16"></td>
												<td class="None" onMouseDown="Check(this,2)" onMouseOver="Check(this,1)" onMouseOut="Check(this,0)"
													onMouseUp="Check(this,1)" title="帮助" onClick="showHelp()"><img src="images/help.gif" width="21" height="21"></td>
											</TR>
										</table>
									</td>
								</tr>
							</TBODY>
						</table>
					</td>
				</tr>
				<tr>
					<td align="center">
						<table width="650" border="1" cellpadding="0" cellspacing="0" bordercolor="#cccccc">
							<tr>
								<td>
									<iframe id="Editor" Name="Editor" style="WIDTH: 98.99%; HEIGHT: 328px" marginwidth="3" marginheight="3"
										frameborder="0"></iframe>
								</td>
							</tr>
						</table>
						<input type="hidden" id="tbcontent" runat="server"> <INPUT id="HFILE" type="hidden" name="HFILE" runat="server">
					</td>
				</tr>
				<tr height="15">
					<td height="15">
						<map name="Map">
							<area shape="RECT" coords="51,1,92,15" href="#" onClick="return(SelectFormat('Html'));">
						</map><map name="Map2">
							<area shape="RECT" coords="6,1,45,16" href="#" onClick="return(SelectFormat('Normal'));">
						</map><input name="doaction" type="hidden" id="doaction" value="{doaction}"> <input name="Editorstatus" type="hidden" value="normal">
						<div ID="Normal">
							<table width="100%" height="15" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td align="left"><IMG src="images/normal.gif" useMap="#Map" border="0" width="96" height="15"></td>
									<td align="center"><IMG src="images/scrollleft.gif" border="0" width="24" height="15"></td>
									<td align="center" width="100%" style="FILTER: Alpha(opacity=50); BACKGROUND-COLOR: white"></td>
									<td align="right"><IMG src="images/scrollright.gif" border="0" width="19" height="15"></td>
								</tr>
								<tr>
									<td colspan="4" align="center">
										<asp:Button ID="btsend" Runat="server" Text="发送邮件(A)" accessKey="a" OnClick="btsend_Click"></asp:Button>
									</td>
								</tr>
							</table>
						</div>
						<div ID="Html" style="DISPLAY: none">
							<table width="100%" height="15" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td align="left"><IMG src="images/html.gif" useMap="#Map2" border="0" width="96" height="15" alt="" ></td>
									<td align="center"><IMG src="images/scrollleft.gif" border="0" width="24" height="15" alt="" ></td>
									<td align="center" width="100%" style="FILTER: Alpha(opacity=50); BACKGROUND-COLOR: white"></td>
									<td align="right"><IMG src="images/scrollright.gif" border="0" width="19" height="15" alt="" ></td>
								</tr>
								<tr>
									<td colspan="4" align="center" style="height: 25px">
										<asp:Button ID="btsend1" Runat="server" Text="发送邮件(A)" accessKey="a"></asp:Button>
									</td>
								</tr>
							</table>
						</div>
						<a href="javascript:bobo_Size(-300)"><img src="images/minus.gif" unselectable="on" border='0'alt="" /></a>
						<a href="javascript:bobo_Size(300)"><img src="images/plus.gif" unselectable="on" border='0' alt="" /></a>
						<asp:Label id="strStatus" runat="server" ForeColor="Blue" DESIGNTIMEDRAGDROP="525"></asp:Label></td>
				</tr>
			</table>

    </div>
    </form>
</body>
</html>
