//下拉数组 
var m_AssetsType = [];//资产类别 
var m_BudgetType = [];//预算类别  


/*********************************/
/**
 * 设置打印页面数据
 * @param formId
 */
function setValues() { 
    var billInfo ='';
    if (basedata_getUrlParam("v0") == undefined || basedata_getUrlParam("v0") == '') {
        alert('申购单号无效！');
        return false;

    }
    var cPOApplyCode = basedata_getUrlParam("v0");

    var cxml = '';

    /*
    //是否选项获取 
    m_YesOrNo = basedata_getBDX('gbd2', basedata_getCommonData('CONOT')
        , basedata_getCommonData('DIVI'), '2', '启用', 'BDType', 'YesOrNo', '', '');

    //资产类别 
    m_AssetsType = basedata_getBDX('gbd2', basedata_getCommonData('CONOT')
        , basedata_getCommonData('DIVI'), '2', '启用', 'BDType', 'AssetsType', '', '');

    //预算内外 
    m_BudgetType = basedata_getBDX('gbd2', basedata_getCommonData('CONOT')
        , basedata_getCommonData('DIVI'), '2', '启用', 'BDType', 'BudgetType', '', '');

    //单据状态 
    m_APPState = basedata_getBDX('gbd2', basedata_getCommonData('CONOT')
        , basedata_getCommonData('DIVI'), '2', '启用', 'BDType', 'FA_APPState', '', '');
    */

    //基础数据
    var AssetsTypeid = peoa_GetBDFID(5);
    var BudgetTypeid = peoa_GetBDFID(12);  
    var cons = ' AND CT1_FatherID in (' 
             + '\'' + AssetsTypeid + '\',' + '\'' + BudgetTypeid + '\'' 
             + ')'; 
    var res = basedata_getBDCommon('gbd12', cons);
    for (var i = 0; i < res.length; i++) {
        var f1 = res[i].ct1_fatherid.toUpperCase();
        if (f1 == AssetsTypeid.toUpperCase()) {
            m_AssetsType.push(res[i]);
        } else if (f1 == BudgetTypeid.toUpperCase()) {
            m_BudgetType.push(res[i]);
        } 
    }
    


    var billInfo = '';
    //获取主表信息
    var cxml3 = '<CONO>HWA</CONO><DIVI>D01</DIVI><POApplyCode>' + cPOApplyCode + '</POApplyCode>'
    cxml3 = basedata_addROOT(cxml3);
    var curl = GetWSRRURL(peoa_GetWSRRURL(3)) + "&type=GetH&XML="
              + encodeURIComponent(cxml3); //拼接url
    $.ajax({
        url: curl,
        type: "GET",
        async: false,
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //alert(jsonUtil_jsonToStr(data));
            if (data && data.rows) {
                billInfo = data.rows[0];
                var cdata = data.rows[0];
                $('#POApplyCode').attr('value', cdata.fa1_poapplycode);
                $('#ApplyDt').attr('value', dateUtil_dateFomaterB(new Date(cdata.fa1_applydt), '-'));
                $('#ApplyUser').attr('value', cdata.fa1_applyuser);
                $('#EmployeeId').attr('value', cdata.fa1_employeeid);
                $('#DeptName').attr('value', cdata.fa1_deptname);
                $('#CenterCode').attr('value', cdata.fa1_centercode);
                $('#AssetsType').attr('value', basedata_getCodename(m_AssetsType, cdata.fa1_assetstype,'ct1_code','ct1_codename'));
                $('#BudgetType').attr('value', basedata_getCodename(m_BudgetType, cdata.fa1_budgettype, 'ct1_code', 'ct1_codename'));
                $('#ConfirmAmount').text(dataUtil_formatNum(cdata.fa1_confirmamount));
                $('#Comment').text(decodeURIComponent(cdata.fa1_comment));
            } 
        }
    }) 

    if($('#POApplyCode').attr('value')==''){
        return false;
    }
    //获取从表信息
    cxml3 = '<CONO>HWA</CONO><DIVI>D01</DIVI><POApplyCode>' + cPOApplyCode + '</POApplyCode>'
    cxml3 = basedata_addROOT(cxml3);
    var curl = GetWSRRURL(peoa_GetWSRRURL(3)) + "&type=GetD&XML="
              + encodeURIComponent(cxml3); //拼接url
    $.ajax({
        url: curl,
        type: "GET",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //alert(jsonUtil_jsonToStr(data));   
            if (data && data.rows) {
                var cdata = data.rows;
                for (var i = 0; i < cdata.length; i++) {
                    if (i < 10) {
                        $('#spantd' + i + '1').text(cdata[i].largeclassname);
                        $('#spantd' + i + '2').text(cdata[i].smallclassname);
                        $('#spantd' + i + '3').text(cdata[i].assetsname);
                        $('#spantd' + i + '4').text(cdata[i].brandcode);
                        $('#spantd' + i + '5').text(cdata[i].model);
                        $('#spantd' + i + '6').text(cdata[i].number);
                        $('#spantd' + i + '7').text(dataUtil_formatNum(cdata[i].applyprice));
                        $('#spantd' + i + '8').text(dataUtil_formatNum(cdata[i].sureprice));
                        $('#spantd' + i + '9').text(cdata[i].username);
                    }
                }
            }
        }
    })


    //设置打印签字信息begin
    var imgt = '<img height="40" border="0" '
         + 'oncontextmenu="return false" ondragstart="return false" '
        + 'onselectstart ="return false" onselect="return false" oncopy="return false" '
        + 'onbeforecopy="return false" onmouseup="return false" '
        + 'src=>';

    //获取审批信息
    var spInfo = new Object()
    spInfo.bmzname = getSignNameAndDate(billInfo.fa1_departmentdirector,1);
    spInfo.bmzdate = getSignNameAndDate(billInfo.fa1_departmentdirector,2);
    spInfo.sybjlname = getSignNameAndDate(billInfo.fa1_divisionmanager, 1);
    spInfo.sybjldate = getSignNameAndDate(billInfo.fa1_divisionmanager, 2);
    spInfo.xxzjname = getSignNameAndDate(billInfo.fa1_itdirector, 1);
    spInfo.xxzjdate = getSignNameAndDate(billInfo.fa1_itdirector, 2);
    spInfo.cgjlname = getSignNameAndDate(billInfo.fa1_purchasemanager, 1);
    spInfo.cgjldate = getSignNameAndDate(billInfo.fa1_purchasemanager, 2);
    spInfo.xzzjname = getSignNameAndDate(billInfo.fa1_shareservicecenterdirector, 1);
    spInfo.xzzjdate = getSignNameAndDate(billInfo.fa1_shareservicecenterdirector, 2);
    spInfo.cwjlname = getSignNameAndDate(billInfo.fa1_financedirector, 1);
    spInfo.cwjldate = getSignNameAndDate(billInfo.fa1_financedirector, 2);  
 
   
    //获取相关签名信息
    var cons = ' AND CT1_FatherID = \'' + peoa_GetBDFID(10) + '\'';
    var pers = '\'' + spInfo.bmzname + '\',' + '\'' + spInfo.sybjlname + '\',' 
             + '\'' + spInfo.xxzjname + '\',' + '\'' + spInfo.cgjlname + '\',' 
             + '\'' + spInfo.xzzjname + '\',' + '\'' + spInfo.cwjlname + '\','
             + '\'A\'';
             cons = cons + 'AND CT1_Code IN (' + pers + ')'; 
    var signs = basedata_getBDCommon('gbd12', cons);  
 

    //部门长
    if (spInfo.bmzname != '') {
        $('#sign_bmz').html(spInfo.bmzname);
        for (var i = 0; i < signs.length; i++) { 
            if (signs[i].ct1_code == spInfo.bmzname && signs[i].ct1_fieldvalues1 == '图片') {
                var isrc = basedata_random(signs[i].ct1_fieldvalues3, signs[i].ct1_fieldvalues4, signs[i].ct1_fieldvalues5);
                var imgs = imgt.replace('src=', 'src="' + isrc + '"');
                $('#sign_bmz').html(imgs);
                //$('#sign_bmz').html(imgs + '<br><font size=1>' + spInfo.bmzdate + '</font>');
                break;
            }
        }
    }  

    //事业部经理
    if (spInfo.sybjlname != '') {
        $('#sign_sybjl').html(spInfo.sybjlname);
        for (var i = 0; i < signs.length; i++) {
            if (signs[i].ct1_code == spInfo.sybjlname && signs[i].ct1_fieldvalues1 == '图片') {
                var isrc = basedata_random(signs[i].ct1_fieldvalues3, signs[i].ct1_fieldvalues4, signs[i].ct1_fieldvalues5);
                var imgs = imgt.replace('src=', 'src="' + isrc + '"');
                $('#sign_sybjl').html(imgs);
                break;
            }
        }
    }

    //信息总监
    if (spInfo.xxzjname != '') {
        $('#sign_xxzj').html(spInfo.xxzjname);
        for (var i = 0; i < signs.length; i++) {
            if (signs[i].ct1_code == spInfo.xxzjname && signs[i].ct1_fieldvalues1 == '图片') {
                var isrc = basedata_random(signs[i].ct1_fieldvalues3, signs[i].ct1_fieldvalues4, signs[i].ct1_fieldvalues5);
                var imgs = imgt.replace('src=', 'src="' + isrc + '"');
                $('#sign_xxzj').html(imgs);
                break;
            }
        }
    }

    //采购经理
    if (spInfo.cgjlname != '') {
        $('#sign_cgjl').html(spInfo.cgjlname);
        for (var i = 0; i < signs.length; i++) {
            if (signs[i].ct1_code == spInfo.cgjlname && signs[i].ct1_fieldvalues1 == '图片') {
                var isrc = basedata_random(signs[i].ct1_fieldvalues3, signs[i].ct1_fieldvalues4, signs[i].ct1_fieldvalues5);
                var imgs = imgt.replace('src=', 'src="' + isrc + '"');
                $('#sign_cgjl').html(imgs);
                break;
            }
        }
    }

    //行政总监
    if (spInfo.xzzjname != '') {
        $('#sign_xzzj').html(spInfo.xzzjname);
        for (var i = 0; i < signs.length; i++) {
            if (signs[i].ct1_code == spInfo.xzzjname && signs[i].ct1_fieldvalues1 == '图片') {
                var isrc = basedata_random(signs[i].ct1_fieldvalues3, signs[i].ct1_fieldvalues4, signs[i].ct1_fieldvalues5);
                var imgs = imgt.replace('src=', 'src="' + isrc + '"');
                $('#sign_xzzj').html(imgs);
                break;
            }
        }
    }
     
    //财务经理
    if (spInfo.cwjlname != '') {
        $('#sign_cwjl').html(spInfo.cwjlname);
        for (var i = 0; i < signs.length; i++) {
            if (signs[i].ct1_code == spInfo.cwjlname && signs[i].ct1_fieldvalues1 == '图片') {
                var isrc = basedata_random(signs[i].ct1_fieldvalues3, signs[i].ct1_fieldvalues4, signs[i].ct1_fieldvalues5);
                var imgs = imgt.replace('src=', 'src="' + isrc + '"');
                $('#sign_cwjl').html(imgs);
                break;
            }
        }
    }
    
    //设置打印签字信息end
    
    
  /*
  $('#printTT').text(basedate_getPrintTT(billInfo.comID,billInfo.companyCode));  
   window.print(); 
  */
  
  // 设置表单编号条形码 
    var srcstr = 'http://192.168.0.43/barcode.bracodeServlet?image=1&type=21&data=' + cPOApplyCode + '&height=50';
  $('#billcodetxm').attr('src',srcstr);
  
 
  
}


/***********************************************************************
 *  undefined 或 null  转换成 '' 
 *  DLY 
 */ 
function undefinedOrNull(obj){ 
	 if(obj == undefined || obj == null){
		 return '';
	 }else{
		 return obj;
	 }
}
  
/***********************************************************************
 *  分割审批信息
 *  DLY 
 */
function getSignNameAndDate(s, type) {
    res = '';
    if (undefinedOrNull(s) != '' && s.length > 11 && s.indexOf('驳回') == -1 ) {
        if (type == 1) {
            res = dataUtil_trim(s.substring(0, s.length - 10));
        } else if (type == 2) {
            res = dataUtil_trim(s.substring(s.length - 10, s.length));
        }
    }
    return res;
}