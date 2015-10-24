﻿<%@ page language="C#" autoeventwireup="true" inherits="buyproduct_manager_basic_BP_BSSuptyper, App_Web_bp_bssuptyper.aspx.11713791" %>
 <%@ Register Src="../../../inc/uc_pagehead.ascx" TagName="uc_pagehead" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>供应商级别档案</title>
    <link  href="../../../css/project.css"type="text/css"  rel="stylesheet">
</head>
<body  topmargin="10" leftmargin="10">
    <form id="form1" runat="server">
       <!--head-->
       <uc1:uc_pagehead id="Uc_pagehead1" runat="server" />
    <!--head end-->

        
    <div  class="BContent">
    <table width="100%" cellpadding="1" cellspacing="1" align="center">
    <!----->
    <tr>
    <td>
    <table width="100%" height="400" bordercolor="507CD1" border="0">
<tr>
<td valign="top" style="height: 386px">
<asp:GridView id="GridView1" runat="server" Width="100%"  CssClass="tbGrid" CellSpacing="1" ForeColor="#333333" RowStyle-HorizontalAlign="Center" GridLines="None" DataSourceID="ObjectDataSource1" DataKeyNames="SupTypeID" CellPadding="4" AutoGenerateColumns="False" AllowSorting="True" AllowPaging="True" >
<FooterStyle BackColor="#507CD1" ForeColor="White" Font-Bold="True"></FooterStyle>
<Columns>

<asp:TemplateField SortExpression="SupTypeID" HeaderText="类型编号">
<EditItemTemplate>
                     <asp:Label ID="LblSupTypeID" runat="server" Text='<%# Bind("SupTypeID") %>'></asp:Label>
</EditItemTemplate>

<ItemTemplate>
                    <asp:Label ID="Label11" runat="server" Text='<%# Bind("SupTypeID") %>'></asp:Label>
                
</ItemTemplate>

</asp:TemplateField>

<asp:TemplateField SortExpression="SupTypeCode" HeaderText="类型代码">
<EditItemTemplate>
                    <asp:TextBox ID="TxtSupTypeCode" runat="server" Text='<%# Bind("SupTypeCode") %>' Width="100px"></asp:TextBox>
                     <br />
                    <asp:RequiredFieldValidator id="RFVSupTypeCode" runat="server" ControlToValidate="TxtSupTypeCode" ErrorMessage="*" Display="Dynamic"></asp:RequiredFieldValidator>
</EditItemTemplate>


<HeaderStyle >
</HeaderStyle>
<ItemTemplate>
                    <asp:Label ID="LblSupTypeName" runat="server" Text='<%# Bind("SupTypeCode") %>'></asp:Label>
                
</ItemTemplate>
</asp:TemplateField>

<asp:TemplateField SortExpression="TxtSupTypeName" HeaderText="类型名称"><EditItemTemplate>
                    <asp:TextBox ID="TxtSupTypeName" runat="server" Text='<%# Bind("SupTypeName") %>' Width="120px"></asp:TextBox>
                     <br />
                    <asp:RequiredFieldValidator id="RFVSupTypeName" runat="server" ControlToValidate="TxtSupTypeName" ErrorMessage="*" Display="Dynamic"></asp:RequiredFieldValidator>
</EditItemTemplate>


<HeaderStyle >
</HeaderStyle>
<ItemTemplate>
                    <asp:Label ID="Label5" runat="server" Text='<%# Bind("SupTypeName") %>'></asp:Label>
                
</ItemTemplate>
</asp:TemplateField>



<asp:TemplateField  HeaderText="操作"><EditItemTemplate>
<asp:LinkButton runat="server" Text="更新" CommandName="Update" CausesValidation="True" id="LinkButton1"></asp:LinkButton>&nbsp;<asp:LinkButton runat="server" Text="取消" CommandName="Cancel" CausesValidation="False" id="LinkButton2"></asp:LinkButton>
</EditItemTemplate>

<HeaderStyle ></HeaderStyle>
<ItemTemplate>
<asp:LinkButton runat="server" Text="编辑" CommandName="Edit" CausesValidation="False" id="LinkButton1"></asp:LinkButton>&nbsp;

<asp:ImageButton id="IbDel" runat="server" ToolTip="删除?" ImageUrl="../../../icon/delete.gif" CommandName="delete"  OnClientClick="return confirm('确认要删除此数据吗？')"  CausesValidation="False" ></asp:ImageButton>
</ItemTemplate>
</asp:TemplateField>
<asp:TemplateField  HeaderText="查看">
<ItemTemplate>
     <a href='BP_BSSuptyperTwo.aspx?pid=<%# Eval("SupTypeCode") %>'><img src="../../../icon/go3.gif" border="0" />物料大类</a>
                
</ItemTemplate>
</asp:TemplateField>
</Columns>

<RowStyle BackColor="#EFF3FB" HorizontalAlign="Center"></RowStyle>
<EmptyDataTemplate>
            <table cellspacing="0" cellpadding="3" rules="cols" border="1" id="ctl00_ctplhder_GridView11" 
            style="background-color:#507CD1;border-color:#999999;border-width:1px;border-style:None;width:100%;border-collapse:collapse;">
		 <tr  Class="dgHeader">
		
			<th scope="col">类型编号</th>
			<th scope="col">类型代码</th>
			<th scope="col">类型名称</th>
		</tr>
	 <tr  bgcolor="White">
                     
                         <th scope="col"> &nbsp;</th>
                         <th scope="col"> &nbsp;</th>
                         <th scope="col"> &nbsp;</th>
                         
                    </tr>
	
		</table>
        
</EmptyDataTemplate>

<SelectedRowStyle BackColor="#D1DDF1" ForeColor="#333333" Font-Bold="True"></SelectedRowStyle>

<PagerStyle CssClass="header" HorizontalAlign="Center" ></PagerStyle>

<HeaderStyle CssClass="dgHeader"  ></HeaderStyle>

<AlternatingRowStyle BackColor="White"></AlternatingRowStyle>
    <EditRowStyle  />
</asp:GridView> <asp:ObjectDataSource id="ObjectDataSource1" runat="server" UpdateMethod="CG_UpSupplyerType" TypeName="ddl_cgnew" SelectMethod="CG_GetSupplyerType" DeleteMethod="CG_DelSupplyerType" >
        <DeleteParameters>
            <asp:Parameter Name="SupTypeID" Type="Int32" />
        </DeleteParameters>
        <UpdateParameters>
            <asp:Parameter Name="SupTypeID" Type="Int32" />
            <asp:Parameter Name="SupTypeCode" Type="String" />
            <asp:Parameter Name="SupTypeName" Type="String" />
            <asp:Parameter Name="commet" DefaultValue="" Type="String" />
        </UpdateParameters>
    </asp:ObjectDataSource>
  
</td>
</tr>
     <tr>
     <td  >
     <hr  style="border:solid 0px #000;"/>
    
     </td>
     </tr>
<tr>
<td>
    
   
<table width="100%">

<tr>
<td align="left">
    &nbsp;类型代码：<asp:TextBox ID="TxtBoxCode" runat="server" CssClass="tbox" MaxLength="50" Width="200px"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="TxtBoxCode"
        ErrorMessage="*" ValidationGroup="add"></asp:RequiredFieldValidator>
    类型名称：<asp:TextBox ID="TxtBoxName" runat="server" CssClass="tbox" MaxLength="50" Width="200px"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="TxtBoxName"
        ErrorMessage="*" ValidationGroup="add"></asp:RequiredFieldValidator>
        </td>
        <td align="center">
    <asp:Button ID="BtnAddItem" runat="Server" OnClick="BtnAddItem_Click" Text="增加类型" ValidationGroup="add"  CssClass="btn"  /></td>
</tr>
<tr>
<td align="left" colspan="2">
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="TxtBoxCode"
        ErrorMessage="*类型代码只能是数字或字母类型" ValidationExpression="^[A-Za-z0-9]+$"></asp:RegularExpressionValidator></td>
</tr>
<tr>
<td align="center" colspan="2">
 <asp:Label ID="LblAlart" runat="server" ForeColor="Red"></asp:Label></td>
</tr>
</table>
   </td>
</tr>
</table>
    </td>
    </tr>
    <!----->
    
    </table>
 
    
    </div>
    </form>
</body>
</html>