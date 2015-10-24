﻿function getLodop(oOBJECT,oEMBED){
/**************************
  本函数根据浏览器类型决定采用哪个对象作为控件实例：
  IE系列、IE内核系列的浏览器采用oOBJECT，
  其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED。
**************************/
        var strHtml1="<font color='#FF00FF'>打印控件未安装!点击这里<a href='dygs/install_lodop.exe'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtml2 = "<font color='#FF00FF'>打印控件需要升级!点击这里<a href='dygs/install_lodop.exe'>执行升级</a>,升级后请重新进入。</font>";
        var strHtml3="<font color='#FF00FF'>注意：<br>1：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它;<br>2：如果浏览器表现出停滞不动等异常，建议关闭其“plugin-container”(网上搜关闭方法)功能;</font>";
        var LODOP=oEMBED;		
	try{		     
	     if (navigator.appVersion.indexOf("MSIE")>=0) LODOP=oOBJECT;

	     if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) 
		 return LODOP; 
	    
	     //*****如下空白位置适合调用统一功能:*********	     


	     //*******************************************
	     return LODOP; 
	}catch(err){
	     document.documentElement.innerHTML="Error:"+strHtml1+document.documentElement.innerHTML;
	     return LODOP; 
	}
}


function CheckIsInstall() {
    try {
        var LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));
        if ((LODOP != null) && (typeof (LODOP.VERSION) != "undefined")) return true;
        return false;
    } catch (err) {
        return false;
    }
}
