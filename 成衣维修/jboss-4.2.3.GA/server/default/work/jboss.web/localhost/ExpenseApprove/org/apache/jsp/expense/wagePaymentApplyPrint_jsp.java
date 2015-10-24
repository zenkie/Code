package org.apache.jsp.expense;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import ep.org.util.NumberUtil;
import java.util.*;
import ep.org.branch.expense.dojo.WagePaymentInfo;
import ep.org.branch.expense.dojo.WagePaymentPurposeCost;

public final class wagePaymentApplyPrint_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("    <title>工资付款申请</title>\r\n");
      out.write("    \r\n");
      out.write("\t\r\n");
      out.write("\r\n");
      out.write("  \r\n");
      out.write("  \t<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.print( path);
      out.write("/css/mycommon.css\" />\r\n");
      out.write("\t\t<script type=\"text/javascript\" src=\"");
      out.print( path);
      out.write("/myjs/myTime.js\"></script>\r\n");
      out.write("\t\t<script type=\"text/javascript\" src=\"");
      out.print( path);
      out.write("/js/jquery-1.5.2.min.js\"></script>\r\n");
      out.write("\t</head>\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write(" function Print() {  \r\n");
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
      out.write("\r\n");
      out.write("  \r\n");
      out.write(" </script>\r\n");
      out.write("\t<body  onload=\"Print()\">\r\n");
      out.write("\t\t <input type=\"hidden\" id=\"webContext\" value=\"");
      out.print(request.getContextPath() );
      out.write("\">\r\n");
      out.write("\t\t<object id=\"eprint\" classid=\"clsid:CA03A5A8-9890-49BE-BA4A-8C524EB06441\"  viewasext> </object>\r\n");
      out.write("   \t\t");
WagePaymentInfo wagePaymentInfo = (WagePaymentInfo)request.getAttribute("expenseInfo");
      out.write("\r\n");
      out.write("   \t\t\r\n");
      out.write("   \t\t\r\n");
      out.write("   <div style=\"position:relative;width: 95%;height: 100%; left: 30 \">\r\n");
      out.write("   <div align=\"center\" style=\"height: 20\"><img alt=\"\" src=\"");
      out.print(path );
      out.write("/img/image2.png\"></div>\r\n");
      out.write("    \r\n");
      out.write("    <div style=\"position:absolute;top: 50;z-index: 1\">\r\n");
      out.write("    <div align=\"center\" style=\"height: 50\">\r\n");
      out.write("    \t\r\n");
      out.write("    <font style=\"font-weight: 600;font-size: 18\">Wage Payment Application</font> <br> <font  style=\"font-weight: 600;font-size: 18\">工 资 付 款 申 请</font>  </div>\r\n");
      out.write("    \r\n");
      out.write("    <div align=\"right\" style=\"position: absolute;top: 2;right: 0%\">\r\n");
      out.write("   \t <img alt=\"\" src=\"");
      out.print(path);
      out.write("/barcode.bracodeServlet?image=1&type=21&data=");
      out.print(wagePaymentInfo.getExpenseNo() );
      out.write("&height=50\" >\r\n");
      out.write("  \t</div>\r\n");
      out.write("    \t<br />\r\n");
      out.write("    \r\n");
      out.write("   \r\n");
      out.write("   \r\n");
      out.write("    ");
      out.write("\r\n");
      out.write("    <table width=\"100%\" cellPadding=0 cellSpacing=0  frame=box style=\"BORDER-COLLAPSE: collapse;\" bgColor=white borderColor=black>\t\t\r\n");
      out.write("   \t\t<tr>\r\n");
      out.write("    \t\t<td height=\"25\" class=\"td_field_thin\" colspan=\"8\">\r\n");
      out.write("    \t\t\tPayment Type/付款方式： <input type=\"checkbox\" value=\"\" />Cash/现金\r\n");
      out.write("    \t\t\t<input type=\"checkbox\" value=\"\" />    T/T 电汇\r\n");
      out.write("    \t\t\t<input type=\"checkbox\" value=\"\"/> Draft 汇票\r\n");
      out.write("    \t\t\t<input type=\"checkbox\" value =\"\" />\tCheque 转帐支票\t\t\t\t\t\t\t\t\t\t\t\t\r\n");
      out.write("    \t\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"45\" class=\"td_field_thin\" width=\"25%\">Name/申请人：<br />\r\n");
      out.write("    \t\t\t");
      out.print(wagePaymentInfo.getEmployeeName() );
      out.write("\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"25%\">Department/部门<br />\r\n");
      out.write("    \t\t\t");
      out.print(wagePaymentInfo.getBranchName() );
      out.write("\t\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"25%\">Department Cost Centre/部门成本中心<br />\r\n");
      out.write("    \t\t\t");
      out.print(wagePaymentInfo.getBranchCostCenter() );
      out.write("\t\t\t\t\t\t\t\t\r\n");
      out.write("\t\t\t\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"25%\">Employee Code/职员编码\t<br />\r\n");
      out.write("    \t\t\t");
      out.print(wagePaymentInfo.getEmployeeID() );
      out.write("\t\t\t\t\t\t\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"45\" class=\"td_field_thin\">Telephone/电话号码\t<br />\r\n");
      out.write("    \t\t\t");
      out.print(wagePaymentInfo.getTelephone() );
      out.write("\t\t\t\t\t\t\t\t\t\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" colspan=\"2\">Mobile Phone/移动电话号码<br />\r\n");
      out.write("    \t\t\t");
      out.print(wagePaymentInfo.getTelephone() );
      out.write("\t\t\t\t\t\t\t\r\n");
      out.write(" \t\t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">Date/日期<br />\r\n");
      out.write("    \t\t\t");
      out.print(wagePaymentInfo.getApplyDate() );
      out.write("\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td  colspan=\"4\" class=\"td_field_thin\" height=\"45\">Charged to/and Reasons付款说明：<br />\r\n");
      out.write("    \t\t");
      out.print(wagePaymentInfo.getRemark() );
      out.write("\t\t\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \r\n");
      out.write("    </table>\r\n");
      out.write("    \r\n");
      out.write("   \r\n");
      out.write("     ");
      out.write("\r\n");
      out.write("    <table width=\"100%\" cellPadding=0 cellSpacing=0  frame=box style=\"BORDER-COLLAPSE: collapse;\" bgColor=white borderColor=black>\t\t\r\n");
      out.write("   \t\t<tr>\r\n");
      out.write("    \t\t<td align=\"center\" class=\"td_field_thin\" width=\"4%\" height=\"40\">No<br />序号</td>    \r\n");
      out.write("    \t\t<td align=\"center\" class=\"td_field_thin\" width=\"10%\">Date<br/>日期</td>  \r\n");
      out.write("    \t\t<td align=\"center\" class=\"td_field_thin\" width=\"25%\">Justification Detailed<br />费用明细</td>\r\n");
      out.write("    \t\t<td align=\"center\" class=\"td_field_thin\" width=\"12%\">AMT<br/> 金额 </td>\r\n");
      out.write("    \t\t<td align=\"center\" class=\"td_field_thin\"  width=\"1%\" rowspan=\"1\"></td>\r\n");
      out.write("    \t\t<td align=\"center\" class=\"td_field_thin\" colspan=\"2\" align=\"center\">Type ticked by Applicant<br/>票据分类（财务部填）\t</td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t<td align=\"center\" class=\"td_field_thin\" width=\"10%\">AMT<br/> 金额</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t");
 WagePaymentPurposeCost wagePaymentPurposeCost = null;
    	   List purposeCostList = (List)request.getAttribute("WPPurposeCostList"); 
    	   wagePaymentPurposeCost = (WagePaymentPurposeCost)purposeCostList.get(0);
    	
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" align=\"center\" >1</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpenseDate() );
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">");
      out.print(wagePaymentPurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(NumberUtil.formatFloatDecimal(2,wagePaymentPurposeCost.getExpenseAmout()));
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" rowspan=\"9\" width=\"1%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >The General Staff Wage</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >总部工资\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" ></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 wagePaymentPurposeCost = (WagePaymentPurposeCost)purposeCostList.get(1); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" align=\"center\">2</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpenseDate() );
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(NumberUtil.formatFloatDecimal(2,wagePaymentPurposeCost.getExpenseAmout()));
      out.write("</td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >The Shop Assistant Wage\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">导购工资</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 wagePaymentPurposeCost = (WagePaymentPurposeCost)purposeCostList.get(2); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" align=\"center\">3</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpenseDate() );
      out.write(" </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(NumberUtil.formatFloatDecimal(2,wagePaymentPurposeCost.getExpenseAmout()));
      out.write("</td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >The First Factory Wage</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">生产一厂工资\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 wagePaymentPurposeCost = (WagePaymentPurposeCost)purposeCostList.get(3); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" align=\"center\">4</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(NumberUtil.formatFloatDecimal(2,wagePaymentPurposeCost.getExpenseAmout()));
      out.write("</td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >The Second Factory Wage</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">生产二厂工资</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
  wagePaymentPurposeCost = (WagePaymentPurposeCost)purposeCostList.get(4); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" align=\"center\">5</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(NumberUtil.formatFloatDecimal(2,wagePaymentPurposeCost.getExpenseAmout()));
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >Social Benefit\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">社保费用</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 wagePaymentPurposeCost = (WagePaymentPurposeCost)purposeCostList.get(5); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" align=\"center\">6</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(NumberUtil.formatFloatDecimal(2,wagePaymentPurposeCost.getExpenseAmout()));
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" > Bonus</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">奖金和奖励费用\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 wagePaymentPurposeCost = (WagePaymentPurposeCost)purposeCostList.get(6); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" align=\"center\">7</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(NumberUtil.formatFloatDecimal(2,wagePaymentPurposeCost.getExpenseAmout()));
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" > </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t");
 wagePaymentPurposeCost = (WagePaymentPurposeCost)purposeCostList.get(7); 
      out.write("\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" align=\"center\">8</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpenseDate() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(wagePaymentPurposeCost.getExpensePurpose() );
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >");
      out.print(NumberUtil.formatFloatDecimal(2,wagePaymentPurposeCost.getExpenseAmout()));
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" > </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" ></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" ></td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  colspan=\"1\" >Total/合计：</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\">");
      out.print(NumberUtil.formatFloatDecimal(2,wagePaymentInfo.getTotalMoney()));
      out.write("</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" align=\"center\">Total </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" align=\"center\">合计\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"></td>\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t\t\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td height=\"40\" class=\"td_field_thin\" colspan=\"9\" height=\"20\">TOTAL In Words/大写总金额：\t\t\r\n");
      out.write("    \t\t\t");
      out.print(request.getAttribute("totalMoneyCN") );
      out.write("\r\n");
      out.write("    \t\t</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t\r\n");
      out.write("    </table>\r\n");
      out.write("    \t<br />\t\t\t\t\t\t\t\t\t\r\n");
      out.write("     ");
      out.write("\r\n");
      out.write("    <table width=\"100%\" cellPadding=0 cellSpacing=0  frame=box style=\"BORDER-COLLAPSE: collapse;\" bgColor=white borderColor=black>\t\t\r\n");
      out.write("   \t\t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"30\" width=\"14.28%\" align=\"center\"> 复核     <br />  Checked by\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"30\" width=\"14.28%\" align=\"center\">分公司财务审核 <br />    Approved by FIN </td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"30\" width=\"14.28%\" align=\"center\">部门经理(总监)批准<br />  Approved by DM\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"30\" width=\"14.28%\" align=\"center\"> 财务经理      <br /> Approved by FM\t\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"30\" width=\"14.28%\" align=\"center\">品牌总经理      <br />Approved by BMD</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"30\" width=\"14.28%\" align=\"center\">总经理       <br />    Approved by MD</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"30\" width=\"14.28%\" align=\"center\">签 收                 <br />     Received by</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"35\" width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"14.28%\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"35\" >日期/Date:\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >日期/Date:</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"35\" width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  width=\"14.28%\"></td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" width=\"14.28%\"></td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t<tr>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" height=\"35\" >日期/Date:\t</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\"  >日期/Date:</td>\r\n");
      out.write("    \t\t<td class=\"td_field_thin\" >日期/Date:</td>\r\n");
      out.write("    \t</tr>\r\n");
      out.write("    \t\r\n");
      out.write("    \t\r\n");
      out.write("    </table>\r\n");
      out.write("    </div>\r\n");
      out.write("    \r\n");
      out.write("    <br />\r\n");
      out.write("    <div style=\"position: absolute;top: 1000;z-index:2;left: 28%\" >\r\n");
      out.write("    \t<img alt=\"\" src=\"");
      out.print(path );
      out.write("/img/image1.jpeg\" height=\"9\">\r\n");
      out.write("    </div>\r\n");
      out.write("    \r\n");
      out.write("    </div>\r\n");
      out.write("\t</body>\r\n");
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
