﻿<%@ page language="C#" masterpagefile="~/cashcard/main/car/user/carmaster.master" autoeventwireup="true" inherits="car_user_userEdit, App_Web_useredit.aspx.d716d88e" title="Untitled Page" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ctplhder" Runat="Server">
    <asp:UpdatePanel id="UpdatePanel1" runat="server">
        <contenttemplate>
<TABLE style="WIDTH: 263px; HEIGHT: 242px"><TR><TD style="WIDTH: 2px; text-align: left;"><asp:Label id="Label1" runat="server" Text="流水号：" Width="72px"></asp:Label></TD><TD style="WIDTH: 100px">&nbsp;<asp:Label id="lbproposerid" runat="server"></asp:Label></TD></TR><TR><TD style="WIDTH: 2px; text-align: left;"><asp:Label id="Label3" runat="server" Text="姓名：" Width="72px"></asp:Label></TD><TD style="WIDTH: 100px">&nbsp;<asp:Label id="lbname" runat="server"></asp:Label></TD></TR><TR><TD style="WIDTH: 2px; text-align: left;"><asp:Label id="Label5" runat="server" Text="性别：" Width="70px"></asp:Label></TD><TD style="WIDTH: 100px">&nbsp;<asp:Label id="lbsex" runat="server"></asp:Label></TD></TR><TR><TD style="WIDTH: 2px; text-align: left;"><asp:Label id="Label7" runat="server" Text="证件号：" Width="75px"></asp:Label></TD><TD style="WIDTH: 100px">&nbsp;<asp:Label id="lbidentity" runat="server"></asp:Label>&nbsp; </TD></TR><TR><TD style="WIDTH: 2px; height: 21px; text-align: left;"><asp:Label id="Label9" runat="server" Text="密码电话：" Width="80px"></asp:Label></TD><TD style="WIDTH: 100px; height: 21px;">
    &nbsp;<asp:Label id="lbpswmtel" runat="server"></asp:Label> </TD></TR><TR><TD style="WIDTH: 2px; text-align: left;"><asp:Label id="Label10" runat="server" Width="87px" Text="固定电话："></asp:Label></TD><TD style="WIDTH: 100px"><asp:TextBox id="txttel" runat="server"></asp:TextBox></TD></TR><TR><TD style="WIDTH: 2px; text-align: left;"><asp:Label id="Label12" runat="server" Text="移动电话：" Width="86px"></asp:Label></TD><TD style="WIDTH: 100px"><asp:TextBox id="txtmtel" runat="server"></asp:TextBox></TD></TR><TR><TD style="WIDTH: 2px; text-align: left;"><asp:Label id="Label13" runat="server" Text="通讯地址：" Width="82px"></asp:Label></TD><TD style="WIDTH: 100px">&nbsp;<asp:TextBox id="txtaddr" runat="server"></asp:TextBox></TD></TR><TR><TD style="WIDTH: 2px; HEIGHT: 26px"></TD><TD style="WIDTH: 100px; HEIGHT: 26px"><asp:Button id="Button1" runat="server" Width="73px" Text="修改" Height="27px" OnClick="Button1_Click"></asp:Button></TD></TR></TABLE>
</contenttemplate>
    </asp:UpdatePanel>
</asp:Content>

