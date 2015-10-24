
//控件ID
var m_TabsId = '#rwzx';         //任务中心选项卡id
var m_DatagridId = '#Billlb';   //单据列表id

var m_LastIndex = -1;  //列表最后一次选中行下标
var m_PageNumber = 1;  //当前页码
var m_PageSize = 10;  //每页显示行数

var m_States;  //单据状态
var m_AssetsTypes; //资产类型
var m_BudgetTypes;//预算类别


//用户信息
var m_UserInfo = basedata_getUserInfo(); 
 
  
// 过滤条件
var m_Filter = '';  //主的条件
var m_Filter1 = ''; //查询条件
var m_OrderBy = ' LV1_RgDt DESC '; //排序方式


//选择行数据
var m_SelectRow ;




 

/***********************************************************************
 *  低值易耗品申购单列表设置
 *  DLY
 *  2013-05-14
 */ 
$(function () {
    var cxml = '';
     

    // 当窗口大小发生变化时，调整DataGrid的大小
    $(window).resize(function () {
        //根据index.html页面的高度设置选项卡大小 
        $(m_TabsId).tabs('resize', {
            width: $(document.body).width(),
            height: getcurheight()
        });

        //根据index.html页面的高度设置列表高度 
        $(m_DatagridId).datagrid('resize', {
            width: $(document.body).width()*0.997,
            height: getcurheight()
        });
       
    }); 

    //单据状态
    $('#cxState').combobox({
        panelWidth: "200",
        panelHeight: "150",
        editable: false,
        multiple: false,
        valueField: 'code',
        textField: 'codename'

    }); 
    m_States = basedata_getBDX('gbd2', basedata_getCommonData('CONOT')
        , basedata_getCommonData('DIVI'), '2', '启用', 'BDType', 'FA_APPState', '', 'CT1_Code');
    m_States.push({ "code": "全部", "codename": "全部" });
    $('#cxState').combobox('loadData', m_States);


    //资产类别 下拉框设置 
    $('#cxAssetsType').combobox({
        panelWidth: "145",
        panelHeight: "80",
        editable: false,
        multiple: false,
        valueField: 'code',
        textField: 'codename',
        data: basedata_getBD('gbd2', cxml)
    }); 
    m_AssetsTypes = basedata_getBDX('gbd2', basedata_getCommonData('CONOT')
        , basedata_getCommonData('DIVI'), '2', '启用', 'BDType', 'AssetsType', '', '');
    m_AssetsTypes.push({ "code": "全部", "codename": "全部" });
    $('#cxAssetsType').combobox('loadData', m_AssetsTypes);
    
    //预算类别 
    m_BudgetTypes = basedata_getBDX('gbd2', basedata_getCommonData('CONOT')
        , basedata_getCommonData('DIVI'), '2', '启用', 'BDType', 'BudgetType', '', '');
	
    //设置低值易耗品申购单列表
    $(m_DatagridId).datagrid({
		//title:'',
		//iconCls:'icon-save',
		//width:document.body.clientWidth*0.987,
        height:getcurheight(),
	    //url:'datagrid_data1.json',
		nowrap: true,
		striped: false,
		collapsible:true,
		//sortName: 'id',
		//sortOrder: 'desc',
		remoteSort: false,
		idField: 'lv1_id',
		singleSelect:true,
		frozenColumns:[[  
		]],
		columns:[[  		          
		    { field: 'lv1_id', title: 'lv1_ID', width: 100, hidden: true },
            { field: 'lv1_cono', title: 'lv1_CONO', width: 100, hidden: true },
	        { field: 'lv1_divi', title: 'lv1_DIVI', width: 100, hidden: true },
	        { field: 'lv1_poapplycode', title: '申购单号', width: 135, sortable: true },
	        { field: 'lv1_genuscompanycode', title: 'lv1_GenuscomPanyCode', width: 105, sortable: true, hidden: true },
		    { field: 'lv1_genuscompanyname', title: '所属公司', width: 75, sortable: true },
	        { field: 'lv1_state', title: '状态', width: 100
			    , formatter: function (val) { return basedata_getCodename(m_States, val); }
	        },
            { field: 'lv1_applyuser', title: '申请人', width: 60 },
	        { field: 'lv1_employeeid', title: '员工号', width: 60 },
	        { field: 'lv1_applydt', title: '申请日期', width: 75
                 , formatter: function (val) { return dateUtil_dateFomaterB(new Date(val),'-'); }
	        },
	        { field: 'lv1_deptid', title: 'lv1_DeptID', width: 100, hidden: true },
	        { field: 'lv1_deptname', title: '部门名称', width: 105, sortable: true },
	        { field: 'lv1_centercode', title: '成本中心', width: 80 },
	        { field: 'lv1_centername', title: 'lv1_CenterName', width: 105, hidden: true },
	        { field: 'lv1_applyamount', title: '申请总金额', width: 100, align: "right"
			    , formatter: function (val) { return dataUtil_formatNum(val); }},
	        { field: 'lv1_confirmamount', title: '确认总金额', width: 100, align: "right"
			    , formatter: function (val) { return dataUtil_formatNum(val); }},
		    { field: 'lv1_assetstype', title: '资产类别', width: 80 
			    , formatter: function (val) { return basedata_getCodename(m_AssetsTypes, val); }
		    },
            { field: 'lv1_budgettype', title: '预算类别', width: 80, hidden: true
			    , formatter: function (val) { return basedata_getCodename(m_BudgetTypes, val); }
            },
	        { field: 'lv1_projectcode', title: '项目代码', width: 100 },
	        { field: 'lv1_advancedcode', title: '高薪代码', width: 100 },
	        { field: 'lv1_departmentdirector', title: 'lv1_DepartmentDirector', width: 105, hidden: true },
		    { field: 'lv1_divisionmanager', title: 'lv1_DivisionManager', width: 100, hidden: true },
	        { field: 'lv1_itdirector', title: 'lv1_ITDirector', width: 100, hidden: true },
	        { field: 'lv1_purchasemanager', title: 'lv1_PurchaseManager', hidden: true },
	        { field: 'lv1_shareservicecenterdirector', title: 'lv1_ShareServiceCenterDirector', width: 105, hidden: true },
		    { field: 'lv1_financedirector', title: 'lv1_FinanceDirector', width: 100, hidden: true },
	        { field: 'lv1_isreject', title: 'lv1_IsReject', width: 100, hidden: true },
	        { field: 'lv1_comment', title: 'lv1_Comment', width: 100, hidden: true },
	        { field: 'lv1_rgdt', title: '创建时间', width: 105},
		    { field: 'lv1_rguser', title: '创建人', width: 80 },
	        { field: 'lv1_lmdt', title: '修改时间', width: 105 },
	        { field: 'lv1_lmuser', title: '修改人', width: 80 },
	        { field: 'lv1_uptno', title: '修改次数', width: 80 }
		]],
		pagination:false,
		rownumbers:true, 
		toolbar: '#tjcxk',
		onRowContextMenu:onRowContextMenu,
		onDblClickRow :function(rowIndex, rowData){   
		    view('actdjmx');
		},
		onClickRow :function(rowIndex){    
		} 
	}); 
	
	//设置查询分页控件  
	//pager.pagination("options")
	//对象如下：total | pageSize | pageNumber | pageList | loading | buttons | showPageList | showRefresh | onSelectPage 
	//| onBeforeRefresh | onRefresh | onChangePageSize | beforePageText | afterPageText | displayMsg | 
	 
   $('#cxpager').pagination({  
	   total:0,
	   pageNumber:1,
	   pageSize: m_PageSize,//每页显示的记录条数，默认为20  
	   pageList: [10, 20, 50],//可以设置每页记录条数的列表  
       showPageList: true, //不显示每页记录数列表
       beforePageText: '第',//页数文本框前显示的汉字  
       afterPageText: '页    共 {pages} 页',  
       displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
       exportExcel: false,
       onBeforeRefresh: function () {
       },
       onSelectPage: function (pageNumber, pageSize) { 
	        actLoadData(pageNumber,pageSize);
       },
       buttons: [{
                text: '单据明细',
                iconCls: 'icon-menu',
                handler: function () {
                    view('actdjmx');
                }
       }, {
           text: '导出Excel',
           iconCls: 'icon-excel',
           handler: function () {
               var rows = getExcelData(1, 1000);
               dataExpotToFile('2', rows, m_States, m_AssetsTypes, m_BudgetTypes);
           }
       }]
    	   
   });  
    
    //初始化条件 - 条件分类
   var uType = 0;
   for (var i = 0; i < m_UserInfo.roles.length; i++) {
       var authorization_id = m_UserInfo.roles[i].authorization_id;
       if (authorization_id == peoa_GetActorID(1)) { //申请人
           uType = uType > 1 ? uType : 1;
       } else if (authorization_id == peoa_GetActorID(2)) { //部门长
           uType = uType > 2 ? uType : 2;
       } else if (authorization_id == peoa_GetActorID(12)) { //综合管理部负责人
           uType = uType > 2 ? uType : 2.1;
       } else if (authorization_id == peoa_GetActorID(3)) { //事业部部门长
           uType = uType > 3 ? uType : 3;
       } else if (authorization_id ==  peoa_GetActorID(4)) { //信息专员
           uType = uType > 4 ? uType : 4;
       } else if (authorization_id ==  peoa_GetActorID(8)) { //信息总监
               uType = uType > 5 ? uType : 5;
       } else if (authorization_id == peoa_GetActorID(7) ) { //财务经理 
               uType = uType > 5.1 ? uType : 5.1; 
       } else if (authorization_id == peoa_GetActorID(6)  
           || authorization_id == peoa_GetActorID(5) || authorization_id == peoa_GetActorID(11)
           || authorization_id == peoa_GetActorID(13)
           ) { //采购经理 和 行政总监 和 固定资产运维 和 资产查看权限
           uType = uType > 6 ? uType : 6;
   }  
}
  
   if (uType == 0) { //无权限
       m_Filter = ' AND 1>2 '
   } else if (uType == 1) { //申请人
       m_Filter = m_Filter + ' AND lv1_applyuser=\'' + m_UserInfo.UserName + '\'';
   } else if (uType == 2) { //部门长
       var mdepts = basedata_getMDeptCodes(m_UserInfo.empCode) + '\'-2\'';
       m_Filter = m_Filter + ' AND lv1_DeptID in (' + mdepts + ')';
   } else if (uType == 2.1) { //综合管理部负责人
       var mdepts = basedata_getMDeptCodes(m_UserInfo.empCode) + '\'-2\'';
       var morgs = basedata_getOrgsByZHGLBEmpID(m_UserInfo.empCode, '');
       m_Filter = m_Filter + ' AND ( OZ1_ComCode1 in (' + morgs
           + ') OR  LV1_DeptID  in (' + mdepts + '))';
   } else if (uType == 3) { //事业部部门长
       var mdepts = basedata_getMDeptCodes(m_UserInfo.empCode) + '\'-2\''; 
       m_Filter = m_Filter + ' AND ( lv1_DeptID1 in (' + mdepts
           + ') OR lv1_DeptID in (' + mdepts + '))';
   } else if (uType == 4) { //信息专员 
       m_Filter = m_Filter + ' AND  lv1_AssetsType = 1  ';
   } else if (uType == 5) { //信息总监 
       var mdepts = basedata_getMDeptCodes(m_UserInfo.empCode) + '\'-2\'';
       m_Filter = m_Filter + ' AND (lv1_AssetsType = 1 OR lv1_DeptID in (' + mdepts + '))';
   } else if (uType == 5.1) { //财务经理 
       var myyorgid = peoa_GetOrgID(1); 
       var mqtcwbid = peoa_GetOrgID(3);
       if (m_UserInfo.empCode == '1412188') { // 高晓红
           m_Filter = m_Filter + ' AND OZ1_ComCode1 = \'' + myyorgid + '\' AND LV1_DeptID1 not in (\'' + mqtcwbid + '\') ';
       } else { 
           m_Filter = m_Filter + ' AND (OZ1_ComCode1 not in (\'' + myyorgid + '\') '
                    + ' OR LV1_DeptID1 = \'' + mqtcwbid + '\' )';
       }
   } else if (uType == 6) {  //采购经理 和 行政总监 和 固定资产运维 和 资产查看权限
       m_Filter = 'AND 1=1 ';
   } 


   actLoadData(1, m_PageSize);
    //searchByCons() ;

    //锁定光标
   document.getElementById("cxBillCode").focus();

    //选项卡绑定事件 
   basedata_bindTabEvent(m_TabsId, '#tabs-mm');
   basedata_bindTabMenuEvent(m_TabsId, '#tabs-mm');
});


/***********************************************************************
 *  打开单据明细
 *  DLY
 *  2014-05-15
 */ 
function addTab(title, url) {
	var content = '未实现';
	if ($(m_TabsId).tabs('exists', title)) {
	    $(m_TabsId).tabs('select', title);
	} else { 
		var h = window.screen.height-20;
		h = 480; 
		if (url) {
		    content = '<iframe frameborder="0"  src="'
		        + url + '" style="overflow:hidden;width:100%;height:' + h + 'px;"></iframe>';
		} else {
			content = '未实现';
		} 
		$(m_TabsId).tabs('add', {
			title : title,
			content : content,
			closable : true
		});
	}
}



/***********************************************************************
 *  清除按钮事件：清除查询条件
 *  DLY
 *  2013-05-25
 */ 
function clearText() { 
    $('#cxBillCode').attr('value', '');
    $('#cxDeptName').attr('value', '');
    $('#cxCostCenter').attr('value', '');
    $('#cxAppPer').attr('value', '');
    $('#cxAppDate').attr('value', '');
    $('#cxState').combobox('setValue', '');
    $('#cxAssetsType').combobox('setValue', ''); 
}

/***********************************************************************
 *  查询按钮事件：根据条件查询
 *  DLY
 *  2013-06-15
 */ 
function searchByCons()  { 
	m_PageNumber = 1; 
	var cfilter = ''
	if ($('#cxBillCode').attr('value') != '') {
	    cfilter = cfilter + ' AND lv1_poapplycode LIKE \'%' + $('#cxBillCode').attr('value') + '%\'';
	}
	if ($('#cxDeptName').attr('value') != '') {
	    cfilter = cfilter + ' AND lv1_deptname LIKE \'%' + $('#cxDeptName').attr('value') + '%\'';
	}
	if ($('#cxAppPer').attr('value') != '') {
	    cfilter = cfilter + ' AND lv1_applyuser LIKE \'%' + $('#cxAppPer').attr('value') + '%\'';
	} 
	if ($('#cxCostCenter').attr('value') != '') {
	    cfilter = cfilter + ' AND lv1_centercode LIKE \'%' + $('#cxCostCenter').attr('value') + '%\'';
	} 
	if ($('#cxState').combobox('getValue') != '' && $('#cxState').combobox('getValue') != '全部') {
	    if ($('#cxState').combobox('getValue') == '20') { 
	        cfilter = cfilter + ' AND lv1_state LIKE \'2_\'';
	    } else { 
	        cfilter = cfilter + ' AND lv1_state = \'' + $('#cxState').combobox('getValue') + '\'';
	    }
	} 
	if ($('#cxAssetsType').combobox('getValue') != '' && $('#cxAssetsType').combobox('getValue') != '全部') {
	    cfilter = cfilter + ' AND  lv1_assetstype = \'' + $('#cxAssetsType').combobox('getValue') + '\'';
	}
	if ($('#cxAppDate').attr('value') != '') {
	    cfilter = cfilter + ' AND  convert(varchar(10),lv1_applydt,120) LIKE \'' + $('#cxAppDate').attr('value') + '%\'';
	}
	
	m_Filter1 = cfilter;
	//alert(m_Filter1);
	actLoadData(m_PageNumber, m_PageSize); 
}


 
/***********************************************************************
 *  刷新列表数据
 *  DLY
 *  2014-05-25
 */ 
function   actLoadData(page,number)   {   
    var totalCount = 0;
    $(m_DatagridId).datagrid('loadData', []);
    m_PageNumber = page;
    m_PageSize = number;
    var cXML = '<Page>' + m_PageNumber + '</Page><Num>' + m_PageSize + '</Num>'
             + '<Cons>' + m_Filter + m_Filter1 + '</Cons><OrderBy>' + m_OrderBy + '</OrderBy>'
    cXML = basedata_addROOT(cXML);
	var curl = GetWSRRURL(peoa_GetWSRRURL(15)) + "&type=GetHs&XML="+ encodeURIComponent(cXML) ; //拼接url
    //alert(cXML);	
	$.ajax({
	    url: curl,
	    type: "GET",
	    async: false,
	    //contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function (data) {
	        //alert(jsonUtil_jsonToStr(data));
	        if (data && data.rows && data.rows.length > 0) {
	            $(m_DatagridId).datagrid('loadData', data.rows);
	            totalCount = data.total;
	        }
	    }
	});
	$('#cxpager').pagination({
		total:totalCount,
		pageNumber:page
	}); 
	
}

/***********************************************************************
 *  获取导出数据
 *  DLY 
 */
function getExcelData(page, number) {
    var rows = [];
    m_PageNumber = page;
    m_PageSize = number;
    var cXML = '<Page>' + m_PageNumber + '</Page><Num>' + m_PageSize + '</Num>'
             + '<Cons>' + m_Filter + m_Filter1 + '</Cons><OrderBy>' + m_OrderBy + '</OrderBy>'
    cXML = basedata_addROOT(cXML);
    var curl = GetWSRRURL(peoa_GetWSRRURL(15)) + "&type=GetHs&XML=" + encodeURIComponent(cXML); //拼接url
    //alert(cXML);	
    $.ajax({
        url: curl,
        type: "GET",
        async: false,
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //alert(jsonUtil_jsonToStr(data));
            if (data && data.rows && data.rows.length > 0) {
                rows = data.rows;
            }
        }
    });
    return rows;

}

/***********************************************************************
 *  根据title关闭选项卡
 *  DLY
 *  2014-05-25
 */ 
function closeTab(title) {  
	//alert(title);
    $(m_TabsId).tabs('close', title);
    actLoadData(m_PageNumber,m_PageSize);  
}

  

/***********************************************************************
 *  添加右击菜单内容
 *  DLY
 *  2013-08-12
 */ 
function onRowContextMenu(e, rowIndex, rowData){ 
   e.preventDefault();  
   var rowData = $(m_DatagridId).datagrid('getSelections');
   if(rowData.length == 1){ 
	   $('#mm').menu('show', {
	        left:e.pageX,
	        top:e.pageY
	   });  
   }else{
		alert('请选择一条记录，方可查询！');
   }
}
 

/***********************************************************************
 *  查看单据明细
 *  DLY
 *  2013-08-12
 */ 
function view(act) {
    var rowData = $(m_DatagridId).datagrid('getSelected');
    if (act == 'actdjmx') { 
        m_SelectRow = rowData;
        if (rowData) {
            var title = '申购单';
            var curl = ''; 
            curl = '../../../WEB/PE_OA/LV/LV_APPQuery.html' + '?v0=' + rowData.lv1_poapplycode;
            addTab(title + rowData.lv1_poapplycode, curl);
        } else {
            alert('请先选择一条记录！');
        }
    } 
    else {  
       var flowHis = [];
       var cXML = '<Page>' + '1' + '</Page><Num>' + '100' + '</Num>'
        + '<Cons1>' + rowData.lv1_poapplycode + '</Cons1>'
        + '<Cons2></Cons2><Cons3>GetWFTHisListByBillCode</Cons3>'
        + '<OrderBy>ORDER BY CONVERT(VARCHAR(20),WT1_RgDt,120) ASC</OrderBy>'
       cXML = basedata_addROOT(cXML);
        //alert(cXML);
       var curl = GetWSRRURL(peoa_GetWSRRURL(1)) + "&type=GetWFTHisList&XML=" + encodeURIComponent(cXML); //拼接url	
       $.ajax({
           url: curl,
           type: "GET",
           async: false,
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           success: function (data) {
               //alert(jsonUtil_jsonToStr(data)); 
               if (data && data.rows) {
                   flowHis = data.rows;
               }
           }
       })
       if (act == 'actspls') { 
           if(rowData){ 
               $('#flowHistoryInfo').dialog({
                   title:'审批历史',  
                   width:460,
                   height:180, 
                   left:event.clientX-20,
                   top:event.clientY-40
               });

               var itextc = '单据编号：' + rowData.lv1_poapplycode + '\n\n';
               var itext = '';
               for (var i = 0; i < flowHis.length; i++) {
                   if (flowHis[i].wt1_rejectreason != '') {
                       itext = itext + flowHis[i].wt1_wf3_currfuncname + '(驳回)   ' + flowHis[i].wt1_ckdt + '\n';
                   }else{ 
                       itext = itext + flowHis[i].wt1_wf3_currfuncname + '   ' + flowHis[i].wt1_ckdt + '\n';
                   }  
               }
               document.getElementById('flowHistoryInfoSpanC').innerText = itextc;
               document.getElementById('flowHistoryInfoSpan').innerText = itext;
               $('#flowHistoryInfo').dialog('open');
           }else{
               alert('请先选择一条记录！');
           }   
       } else if (act == 'actbhls') {
           if (rowData) {
               $('#flowHistoryInfo').dialog({
                   title: '驳回历史',
                   width: 460,
                   height: 180,
                   left: event.clientX - 20,
                   top: event.clientY - 70
               });

               var itextc = '单据编号：' + rowData.lv1_poapplycode + '\n\n';
               var itext = '';
               for (var i = 0; i < flowHis.length; i++) {
                   if (flowHis[i].wt1_rejectreason != '') {
                       itext = itext + flowHis[i].wt1_wf3_currfuncname + '(驳回)   ' + flowHis[i].wt1_ckdt + '\n'
                             + flowHis[i].wt1_rejectreason + '   ' + '\n\n';
                   }
               }
               for (var i = 0; i < flowHis.length; i++) {
                   itext = itext   + '  '
                
               }
               document.getElementById('flowHistoryInfoSpanC').innerText = itextc;
               document.getElementById('flowHistoryInfoSpan').innerText = itext;
               $('#flowHistoryInfo').dialog('open');
           } else {
               alert('请先选择一条记录！');
           }
       }
    }
}

  
/***********************************************************************
 *  查看单据明细
 *  DLY
 *  2013-08-12
 */
function FA_APPCenter_SelectRow( ) { 
        alert(m_SelectRow.id)
         
}
 

 
/*******************
* 获取列表高度
*/
function getcurheight() {
    var htjcxk = document.getElementById("tjcxk").style.height.replace('px', '');
    var curheight = parent.getTabsHeight() * 1 - htjcxk * 1 + 45;
    return curheight;
}