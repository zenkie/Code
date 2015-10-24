﻿<%@ page language="C#" autoeventwireup="true" inherits="buyproduct_manager_chkprice_BP_ChkGiveSupplyList, App_Web_bp_chkgivesupplylist.aspx.68adc8a" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>供应商列表</title>
    <link  href="../../../css/project.css"type="text/css"  rel="stylesheet">
    <script language="javascript" type="text/javascript" src="../../../js/select.js"></script>
    <script language="javascript" type="text/javascript" src="../../../js/check.js"></script>
    
</head>
<body  topmargin="10" leftmargin="10">
    <form id="form1" runat="server">
      <!--head-->
         <TABLE class="tbTitle" cellSpacing="0" cellPadding="0" border="0">
			<TR>
				<TD class="tdTitle1" colSpan="1" rowSpan="1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前功能：
					<span id="rm_MainPanel_lFunctionName">供应商列表</span>&nbsp;&nbsp;&nbsp;
					
				</TD>
				<TD class="tdTitle2"></TD>
				<TD class="tdTitle3">
                    <span id="rm_MainPanel_lPageNO"></span></TD>
			</TR>
	</TABLE>
    <!--head end-->
    <!--menu----->
   <table  width="98%" class="menu">
    <tr>
    <td align="right">
    <div >

   
     </div>  
        </td> 
    </tr>
    </table>
    <!--menu----->

        
    <div  class="BContent">
    <!----contant------------------>
        <asp:HiddenField ID="HFPublishCode" runat="server" />
        <asp:HiddenField ID="HFMaterID" runat="server" />
        <asp:HiddenField ID="HFType" runat="server" />
        
    <table width="100%">
    <tr>
    <td align="right"></td>
    </tr>
    <tr>
    <td align="center">
        <asp:Label ID="LblAlart" runat="server" ForeColor="Red" Text=""></asp:Label></td>
    </tr>
    <tr>
    <td align="left">
                  <asp:GridView ID="GridView1" runat="server" AllowPaging="True" AllowSorting="True"
                AutoGenerateColumns="False" DataKeyNames="SupplyerSubID"   CssClass="tbGrid" CellSpacing="1" 
                HorizontalAlign="Center"   CellPadding="3" ForeColor="#333333" GridLines="None" Width="100%">
                <Columns>
                  
                   
                    <asp:BoundField DataField="PublishID" HeaderText="PublishID" ReadOnly="True" SortExpression="PublishID" Visible="false" />
                    <asp:BoundField DataField="SupplyNo" HeaderText="供应商编号" SortExpression="SupplyNo" />
                    <asp:BoundField DataField="LoginID" HeaderText="账号" SortExpression="LoginID" />
                    <asp:BoundField DataField="Calss" HeaderText="级别" SortExpression="Calss" />
                    <asp:BoundField DataField="Givenum" HeaderText="已供次数" SortExpression="Givenum" />
                    <asp:BoundField DataField="CompayName" HeaderText="公司名称" SortExpression="CompayName" />
                    <asp:BoundField DataField="Type" HeaderText="类型" SortExpression="Type" />
                   
                </Columns>
                 <RowStyle HorizontalAlign="Center" VerticalAlign="Middle" BackColor="#EFF3FB" />
                <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                <EditRowStyle BackColor="#2461BF" />
                <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                <PagerStyle  CssClass="header"  HorizontalAlign="Center" />
                <HeaderStyle  CssClass="dgHeader"   HorizontalAlign="Center" VerticalAlign="Middle" font-size=9pt  />
                <AlternatingRowStyle BackColor="White" />
                <EmptyDataTemplate>
                        <table id="GridViewf"  cellpadding="3" cellspacing="1" rules="cols"
                     class="tbGrid" width="100%">
                    <tr  Class="dgHeader" >
                            <th scope="col">供应商编号</th>
                            <th scope="col">账号</th>
                            <th scope="col">级别</th>
                            <th scope="col">已供次数</th>
                            <th scope="col">公司名称</th>
                            <th scope="col">类型</th>
                        </tr>
                        <tr  bgcolor="White">
                      <th scope="col"></th>
                         <th scope="col"> &nbsp;</th>
                         <th scope="col"> &nbsp;</th>
                         <th scope="col"> &nbsp;</th>
                         <th scope="col"> &nbsp;</th>
                         <th scope="col"> &nbsp;</th>
                         <th scope="col"> &nbsp;</th>
                    </tr>
                      </table>
                </EmptyDataTemplate>
            </asp:GridView>
            <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" TypeName="ddl_cgnew" SelectMethod="CG_GetGivePirceSupType"  >
                <SelectParameters>
                    <asp:ControlParameter ControlID="HFPublishCode" Name="PublishCode" PropertyName="Value"
                        Type="String" />
                    <asp:ControlParameter ControlID="HFMaterID" Name="MaterID" PropertyName="Value" Type="String" />
                     <asp:ControlParameter ControlID="HFType" Name="type" PropertyName="Value" Type="String" />
                </SelectParameters>

            </asp:ObjectDataSource>
    </td>
    </tr>
        <tr>
    <td>
    <table width="100%">

        <tr>
    <td valign="top">
        &nbsp;
    
    </td>
   
    </tr>
    </table>
    </td>
    </tr>
    </table>
    <!----contant end------------->
    
    </div>
    </form>
</body>
</html>
