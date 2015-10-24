﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Map.aspx.cs" Inherits="Talent.Web.Map.Map" %>

 <link href="../Css/bmapCommon.css" rel="stylesheet" type="text/css" >
 <style type="text/css">
 .searchBar UL.searchContent
 {
     overflow:visible
 }
 .mySubMenu div.button
 {
     margin-right:3px
 }
 </style>
<div class="pageHeader">
	<div class="searchBar">
		<ul class="searchContent">
			<li style="width:270px">
                <label>公司名称：</label>
                <input  type="text"  class="medium" size=25  id="Map_Name" />
            </li>
            <li style="width:270px">
                <label>公司所在地：</label>
                <input  type="text"  size=25 class="medium"  id="Map_Position"  />
            </li>
            <li style="width:200px">
                <label>人才类别：</label>
                <select id="Map_TalentClass" >
                    <option></option>
                    <%=optionstr %>
                </select>
            </li>
            <li style="float:right;width:220px;htight:25px;line-height:25px; overflow:visible" class="mySubMenu" >
                <div <%=per.PM_Level >= 1 ?"":"style='visibility:hidden'" %> class="button"><div class="buttonContent"><button type="button"    onclick="map.openBz();">打开标注</button></div></div>
                <div <%=per.PM_Level >= 1 ?"":"style='visibility:hidden'" %> class="button"><div class="buttonContent"><button type="button"    onclick="map.closeBz();">关闭标注</button></div></div>
                <div class="buttonActive"><div class="buttonContent"><button name="mapsearch"  >查询</button></div></div>
            </li>
        </ul>
		
	</div>
</div>

<div class="pageContent">

	<form method="post" action="ajaxWebServices.ashx" enctype="multipart/form-data" class="pageForm required-validate" onsubmit="return iframeCallback(this,navTabAjaxDone)">
		<div class="pageFormContent TermClass" layoutH="36" style="width:100%;height:100%; padding:0px; margin:0px">
            <div id="MapContainer"  style="width:100%;height:100%; padding:0px; margin:0px" >

			</div>
        </div>
	</form>

</div>