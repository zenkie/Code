package org.apache.jsp.expense;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;
import ep.org.branch.expense.dojo.CashExpenseInfo;
import ep.org.branch.expense.dojo.CashExpensePurposeCost;

public final class cashExpensePrint_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");

String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\r\n");
      out.write("<html>\r\n");
      out.write("  <head>\r\n");
      out.write("    <base href=\"");
      out.print(basePath);
      out.write("\">\r\n");
      out.write("    \r\n");
      out.write("    <title>现金付款单打印</title>\r\n");
      out.write("    \r\n");
      out.write("\t<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.print( path);
      out.write("/css/mycommon.css\" />\r\n");
      out.write("\t<style type=\"text/css\">\r\n");
      out.write("\t\tbody {font-family:Sans-serif;}\r\n");
      out.write("\t\t\r\n");
      out.write("\t</style>\r\n");
      out.write("\t\r\n");
      out.write("  </head>\r\n");
      out.write("  \r\n");
      out.write("  <script type=\"text/javascript\">\r\n");
      out.write("  \tfunction Print() {  \r\n");
      out.write("\t\r\n");
      out.write("\t\r\n");
      out.write("\ttry{\r\n");
      out.write("\t\t\tif (document.all.eprint.defaultPrinterName.length==0){\r\n");
      out.write("\t\t\talert(\"请先安装打印机，再执行此功能！\");\r\n");
      out.write("\t\t\treturn;\r\n");
      out.write("\t}\r\n");
      out.write("\r\n");
      out.write("  \t    eprint.InitPrint();\r\n");
      out.write("  \t    eprint.marginTop=1;\r\n");
      out.write("  \t\teprint.marginLeft=10;\r\n");
      out.write(" \t\teprint.marginRight=10;\r\n");
      out.write("  \t\teprint.marginBottom=1;\r\n");
      out.write("  \t\teprint.header = \"\";\r\n");
      out.write("  \t\teprint.footer = \"\";\r\n");
      out.write("  \t\teprint.Print();\r\n");
      out.write("\t\twindow.close();\r\n");
      out.write("\t//document.all.eprint.Print(true);//不弹出打印对话框直接打印\r\n");
      out.write("\t}catch(e){\r\n");
      out.write("\t\tinitForm();\r\n");
      out.write("\t\r\n");
      out.write("\t}\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("function Preview() \r\n");
      out.write("{\r\n");
      out.write("\t\r\n");
      out.write("\ttry{\r\n");
      out.write("\t\r\n");
      out.write("\t\tif (document.all.eprint.defaultPrinterName.length==0){\r\n");
      out.write("\t\t\talert(\"请先安装打印机，再执行此功能！\");\r\n");
      out.write("\t\t\treturn;\r\n");
      out.write("\t\t}\r\n");
      out.write("\r\n");
      out.write("  \t\teprint.InitPrint();\r\n");
      out.write(" \t\t//document.all.webprint.SetMarginMeasure(2);//1mm是default, 2 inch\r\n");
      out.write("  \t\teprint.marginTop=1;\r\n");
      out.write("  \t\teprint.marginLeft=1;\r\n");
      out.write(" \t\teprint.marginRight=1;\r\n");
      out.write("  \t\teprint.marginBottom=1;\r\n");
      out.write(" \t\teprint.header = \"\";\r\n");
      out.write("  \t\teprint.footer = \"\";\r\n");
      out.write("  \t\teprint.Preview();\r\n");
      out.write("  \t\twindow.close();\r\n");
      out.write("\t}catch(e){\r\n");
      out.write("\t\t\r\n");
      out.write("\t\tinitForm();\r\n");
      out.write("\t}\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("function initForm(){\r\n");
      out.write("\ttry{\r\n");
      out.write("\t\tif (document.all.eprint.defaultPrinterName.length==0){\r\n");
      out.write("\t\talert(\"请先安装打印机，再执行此功能！\");\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t}\r\n");
      out.write("\t}\r\n");
      out.write("\tcatch(e){\r\n");
      out.write("\t\r\n");
      out.write("\t\tvar url=document.getElementById(\"webContext\").value+'/expense/webprintDownload.jsp';\r\n");
      out.write("\t\twindow.open(url,'webprint打印控件下载','scrollbars=yes,width=400px,height=200px,resizable=yes,menubar=no,status=no,location=no');\r\n");
      out.write("\t}\t\r\n");
      out.write("}\r\n");
      out.write("  \t\r\n");
      out.write("  </script>\r\n");
      out.write("  \r\n");
      out.write("  <body  onload=\"Print()\">\r\n");
      out.write("    <object id=\"eprint\" classid=\"clsid:CA03A5A8-9890-49BE-BA4A-8C524EB06441\"  viewasext> </object>\r\n");
      out.write("   ");
CashExpenseInfo cashExpenseInfo = (CashExpenseInfo)request.getAttribute("cashExpenseInfo");
      out.write("\r\n");
      out.write("   \r\n");
      out.write("   <div style=\"position:relative;width: 95%;height: 100%; left: 30 \">\r\n");
      out.write("   <div align=\"center\" style=\"height: 20\"><img alt=\"\" src=\"");
      out.print(path );
      out.write("/img/image2.png\"></div>\r\n");
      out.write("    \r\n");
      out.write("    <div style=\"position:absolute;top: 50;z-index: 1\">\r\n");
      out.write("    <div align=\"center\" style=\"height: 50\">\r\n");
      out.write("    \t\r\n");
      out.write("    <font style=\"font-weight: 600;font-size: 18\">Petty Cash Request</font> <br> <font  style=\"font-weight: 600;font-size: 18\">现金付款申请 </font>  </div>\r\n");
      out.write("    \r\n");
      out.write("    <div align=\"right\" style=\"position: absolute;top: 2;right: 0%\">\r\n");
      out.write("   \t <img alt=\"\" src=\"");
      out.print(path);
      out.write("/barcode.bracodeServlet?image=1&type=21&data=");
      out.print(cashExpenseInfo.getCashExpenseNo() );
      out.write("&height=50\" >\r\n");
      out.write("  \t</div>\r\n");
      out.write("    \t<br />\r\n");
      out.write("    <div style=\"width: 100%;border: 1;border-color: red;\" >\r\n");
      out.write("    \t\r\n");
      out.write("    \t\r\n");
      out.write("    ");
      out.write("\r\n");
      out.write("    \t  <table width=\"100%\" cellPadding=0 cellSpacing=0  frame=box style=\"BORDER-COLLAPSE:collapse; \" bgColor=white borderColor=black>\t\t\r\n");
      out.write("    \t\r\n");
      out.write("    \t\t<tr>\r\n");
      out.write("    \t\t\t<td class=\"td_field_thin\" >\r\n");
      out.write("    \tInstruction:The invoice must be affixed separately.<br/>\r\n");
      out.write("    \t         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;  &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;       The expense is just to be paied for personal's cash request.<br />\r\n");
      out.write("    \t费用说明：发票必须要每张分开贴，可以看清楚。费用是付给个人的现金费用。\r\n");
      out.write("    \t\t\t</td>\r\n");
      out.write("    \t\t</tr>\r\n");
      out.write("    \t</table>\r\n");
      out.write("    \t\r\n");
      out.write("    </div>\r\n");
      out.write("    <table height=\"5\">\r\n");
      out.write("    \t<tr  height=\"4\">\r\n");
      out.write("    \t<td  height=\"2\">\r\n");
      out.write("    \t</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    </table>\r\n");
      out.write("    \r\n");
      out.write("    \r\n");
      out.write(" ");
      out.write(" \r\n");
      out.write("    \t\r\n");
      out.write("     <table width=\"100%\" cellPadding=0 cellSpacing=0  frame=box style=\"BORDER-COLLAPSE: collapse; \" bgColor=white borderColor=black>\t\t\r\n");
      out.write("    \r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"35%\">Name/申请人：\t\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"17%\">");
      out.print(cashExpenseInfo.getEmployeeName());
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"31%\">Report to/上司：\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"17%\">");
      out.print(cashExpenseInfo.getLeadername());
      out.write("</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">Department/部门（店铺）全称：\t\t\t\t\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">");
      out.print(cashExpenseInfo.getBranchName() );
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">Date/日期：\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">");
      out.print(cashExpenseInfo.getApplyDate() );
      out.write(" </td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">Department Cost Centre/部门成本中心代码：\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">");
      out.print(cashExpenseInfo.getBranchCostCenter() );
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">Telephone/电话号码：</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">");
      out.print(cashExpenseInfo.getTelephone() );
      out.write(" </td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >Employee Code/职员编码：\t\t\t\r\n");
      out.write("\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(cashExpenseInfo.getEmployeeID() );
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >Mobile phone/移动电话：\t\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">");
      out.print(cashExpenseInfo.getMobilephone() );
      out.write(" </td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td colspan=\"4\" class=\"td_field_thin\" height=\"27\">Charged to/and Reasons付款说明：");
      out.print(cashExpenseInfo.getBankAccout() );
      out.write("\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \r\n");
      out.write("    </table>\r\n");
      out.write("    \r\n");
      out.write("   ");
      out.write(" \r\n");
      out.write("    <table width=\"100%\" cellPadding=0 cellSpacing=0  frame=box style=\"BORDER-COLLAPSE: collapse; \" bgColor=white borderColor=black>\t\t\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"4%\" height=\"30\">No<br />序号</td>    \r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"10%\">Date<br/>日期</td>  \r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"25%\">Justification Detailed<br />费用明细</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"12%\">AMT<br/> 金额 </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" colspan=\"3\" align=\"center\">Type ticked by Applicant(filled by FIN)<br/>票据分类（财务部填）\t</td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"10%\">AMT<br/> 金额</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t");
 CashExpensePurposeCost cashExpensePurposeCost = null;
    	   List purposeCostList = (List)request.getAttribute("purposeCostList"); 
    	   cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(0);
    	
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\" >1</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"24\" width=\"1%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\" >office expense</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"130\">办公费用</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" ></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Salary social benefits</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">工资社会保险  \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(1); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">2</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Image and display\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">陈列费用    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Office Supplies\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">统一福利费\t\t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(2); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">3</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Network&Phone expense</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">电话宽带费用\t\t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Local traffic allowance</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">市内交通费</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(3); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">4</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Meetting\t  \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">会务费 \t\t \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Training\t\t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">培训费   \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(4); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">5</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Maintenance\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">维护费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Administration expense\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">行政管理费 \r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(5); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">6</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Customs\\inspection\\testing\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">报关\\商检费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Export commissions\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">外销费用\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(6); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">7</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Insurance\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">保险费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Consultancy\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">中介服务费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(7); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">8</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Rental\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">租金\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Water and electricity\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">水电能源费 \r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(8); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">9</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Recruitment\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">招聘费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Desgin fee\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">设计费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(9); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">10</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Advertisement media\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">广告费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Advertisement printed material\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">宣传费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(10); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">11</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Material expense\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">物料消耗\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Decoration\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">零星装修费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\t");
 cashExpensePurposeCost = (CashExpensePurposeCost)purposeCostList.get(11); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">12</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"2\">");
      out.print(cashExpensePurposeCost.getExpenseAmout());
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Shop manage expense\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">店铺管理费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"15\">Shop other expense\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">店铺其他杂费\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  colspan=\"3\" height=\"20\" align=\"center\">Total/合计：\t\t\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">");
      out.print(cashExpenseInfo.getTotalMoney() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" align=\"center\">Total </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">合计\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" colspan=\"9\" height=\"20\">TOTAL In Words/大写总金额：\t\t\r\n");
      out.write("    \t\t\t");
      out.print(request.getAttribute("totalMoneyCN") );
      out.write("\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td  height=\"20\" class=\"td_field_thin\" colspan=\"4\">The temporary Cash Advance remainder/临时借款余额\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td height=\"20\"  class=\"td_field_thin\" colspan=\"4\" rowspan=\"3\" align=\"center\">The actual payment 实际支付金额：<font style=\"text-decoration: underline; \"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; </font>                     元（出纳填写<br/> Filled by Cashier ）\t\t\t\t\t\t\r\n");
      out.write("\t\t\t</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"20\" class=\"td_field_thin\" colspan=\"4\" align=\"center\">Offset Cash Advance 抵冲借款：    <br />     \t\t\t\t\t\t\r\n");
      out.write("\t\t\t\t&nbsp;&nbsp;<input type=\"checkbox\">  Yes是 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;      <input type=\"checkbox\">No否\t\t\t\t\t\t\r\n");
      out.write("\t\t\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"20\" class=\"td_field_thin\" colspan=\"4\">The amount to offset Cash Advance/抵冲借款金额\r\n");
      out.write("\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    </table>\r\n");
      out.write("    <font size=\"1\">Approved by RD/需求部门审批（如有需求部门，“需求部门”则由申请人负责填写，并交由需求部门长签字确认）</font>\r\n");
      out.write("    \r\n");
      out.write("  ");
      out.write(" \r\n");
      out.write("    \t\r\n");
      out.write("     <table width=\"100%\" cellPadding=0 cellSpacing=0  frame=box style=\"BORDER-COLLAPSE: collapse; \" bgColor=white borderColor=black>\t\t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.20%\" align=\"center\">\r\n");
      out.write("    \t\t\t需求部门<br/><span style=\"font-size:12px\">RD</span></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"16.20%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.20%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.20%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.20%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.20%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"12.20%\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" align=\"center\">\r\n");
      out.write("    \t\t\t需求部门长<br/><span style=\"font-size:12px\">Approved by DM</span></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" ></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" ></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" ></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" ></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" ></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" ></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    </table>\r\n");
      out.write(" \r\n");
      out.write("    <font size=\"1\"> Approved/审批</font>\t\t\t\t\t\t\t\t\t\t\t\r\n");
      out.write("   ");
      out.write("\r\n");
      out.write("    <table width=\"100%\" cellPadding=0 cellSpacing=0  frame=box style=\"BORDER-COLLAPSE: collapse; \" bgColor=white borderColor=black>\t\r\n");
      out.write("    \t<tr> \r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\" align=\"center\">\r\n");
      out.write("    \t\t\t部门经理批准<br /><span style=\"font-size:12px\">Approved by DM</span></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"16.28%\" align=\"center\">\r\n");
      out.write("    \t\t\t部门总监(部长)批准<br /><span style=\"font-size:12px\">Approved by BU</span></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\" align=\"center\">\r\n");
      out.write("    \t\t\t事业部总经理 <br /><span style=\"font-size:12px\">Approved by BMD</span></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\" align=\"center\">\r\n");
      out.write("    \t\t\t财务审核 <br /><span style=\"font-size:12px\">Audited by FIN</span></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\" align=\"center\">\r\n");
      out.write("    \t\t\t财务总监 <br /><span style=\"font-size:12px\">Approved by FM</span></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\" align=\"center\">\r\n");
      out.write("    \t\t\t总经理 <br /><span style=\"font-size:12px\">Approved by MD</span></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"12.28%\" align=\"center\">\r\n");
      out.write("    \t\t\t签 收 <br /><span style=\"font-size:12px\">Received by</span></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"16.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" width=\"12.28%\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" >日期/Date:\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"27\" >日期/Date:</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    </table>\r\n");
      out.write("    </div>\r\n");
      out.write("    \r\n");
      out.write("    <br />\r\n");
      out.write("    <div style=\"position: absolute;top: 1030;z-index:2;left: 28%\" >\r\n");
      out.write("    \t<img alt=\"\" src=\"");
      out.print(path );
      out.write("/img/image1.jpeg\" height=\"9\">\r\n");
      out.write("    </div>\r\n");
      out.write("    \r\n");
      out.write("    </div>\r\n");
      out.write("  </body>\r\n");
      out.write("</html>\r\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
