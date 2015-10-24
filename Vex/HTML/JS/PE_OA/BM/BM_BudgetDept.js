var m_DatagridID = '#Budgetlb'; //预算列表ID
var m_LastIndex = undefined;  //预算列表最后一次选中行下标  
var m_PageNumber = 1;  //当前页码
var m_PageSize = 2000;  //每页显示行数

//用户信息
var m_UserInfo = basedata_getUserInfo();
m_UserInfo.depts = [];
m_UserInfo.deptstree = [];
var m_deptchoose = {};


//基础数据
var m_Coms = [];  //公司
var m_Brands = []; //品牌
var m_CostCenters = [];  //成本中心

//------------


//相关数组
var m_DLList = []; // 大类
var m_XLList = []; // 小类
var m_MDDXLList = []; // 模板下大小类
var m_XMList = []; // 项目名称  
var m_States = [{ id: "0", text: "未审核" }, { id: "1", text: "已审核" }];//状态  
//年份
var m_Years = [{ "text": "2014" }, { "text": "2015" }, { "text": "2016" }, { "text": "2017" }, { "text": "2018" }];


// 过滤条件
var m_Filter = '';  //主的条件
var m_Filter1 = ''; //查询条件
var m_Filter2 = ''; //查询条件到项目
var m_Filter3 = ''; //查询条件到部门
var m_OrderBy = 'BG3_Com, BG3_Brand, BG3_CenterCode'; //排序方式


//主条件切换时，是否放弃数据保存标志， 品牌，大小类，年份切换时用
var m_changeFlag = 0;
var m_Role = 'A'; //操作员身份
var m_FuncType = 'BZ'; //功能页面打开方式
var m_BillInfo = ''; //审批记录信息
var m_EditFlag = 0; //是否可编辑状态


var m_btn3bgcolor = '#28b779';
/***********************************************************************
 *  初始化设置
 *  DLY 
 */
$(function () {
    // 当窗口大小发生变化时，调整DataGrid的大小
    $(window).resize(function () {
        //根据index.html页面的高度设置列表高度 
        $(m_DatagridID).datagrid('resize', {
            width: $(document.body).width()
            //height: getcurheight()
        });
    }); 

    //确认操作员
    for (var i = 0; i < m_UserInfo.roles.length; i++) {
        var authorization_text = m_UserInfo.roles[i].authorization_name;
        var authorization_id = m_UserInfo.roles[i].authorization_id;
        if (authorization_text == '预算专员') {
            m_Role = 'A'
        } else if (authorization_text == '预算经理') {
            m_Role = 'B';
            break;
        }
    }

    //审批记录 
    if (dataUtil_undefinedOrNull(basedata_getUrlParam("v0"), '') == 'sp') {
        m_FuncType = 'SP'; 
        var fid = basedata_getUrlParam("v1"); 
        var cons_sp = ' AND BG4_id = \'' + fid + '\' ';
        var cXML_sp = '<Page>1</Page><Num>1</Num>'
                 + '<Cons>' + cons_sp + '</Cons><OrderBy>' + '' + '</OrderBy>';
        cXML_sp = basedata_addROOT(cXML_sp);
        var curl_sp = GetWSRRURL(peoa_GetWSRRURL(14)) + "&type=GetApH&XML=" + encodeURIComponent(cXML_sp)
                 + "&s=" + new Date().getTime();//拼接url 
        $.ajax({
            url: curl_sp,
            type: "GET",
            async: false,
            dataType: "json",
            success: function (data) {
                if (data && data.rows && data.rows.length > 0) {
                    if (dataUtil_undefinedOrNull(data.rows[0].bg4_id, '') != '') {
                        m_BillInfo = data.rows[0];
                    }
                }
            }
        });
    }

    //初始化赋值
    var cxml = '';
    $('#cxBrand').combobox('setValue', '');
    $('#cxYear').combobox('setValue', basedata_getBMYear()); 

    //基础数据获取   
    var Brandid = peoa_GetBDFID(15);//品牌 
    var DLListid = peoa_GetBDFID(17);//预算科目大类
    var cons = ' AND CT1_FatherID in ('
             + '\'' + Brandid + '\','  + '\'' + DLListid + '\''
             + ') AND CT1_State=\'启用\'';
    var cons1 = ' AND CT1_FatherID in (\'11111111-1111-1111-1111-111111111111\'';  // 小类fatherid拼接
    var res = basedata_getBDCommon('gbd12', cons);
    for (var i = 0; i < res.length; i++) {
        var f1 = res[i].ct1_fatherid.toUpperCase();
        if (f1 == Brandid.toUpperCase()) {
            m_Brands.push(res[i]);
        } else if (f1 == DLListid.toUpperCase()) {
            m_DLList.push(res[i]);
            cons1 = cons1 + ', \'' + res[i].ct1_id + '\'';
        }
    }
    cons1 = cons1 + ')'; 
    //取所有的小类
    m_XLList = basedata_getBDCommon('gbd12', cons1); 


    //获取部门数组 编制和审批
    if (m_FuncType == 'BZ') {  
        // 部门获取通过预算专员
        m_UserInfo.depts = []; 
        var cons = ' AND OZ1_State=\'启用\'  AND OZ1_BMPer LIKE \'%|' + m_UserInfo.UserName+ '|%\' ';
        var cXML = '<Page>' + '' + '</Page><Num>' + '' + '</Num>'
            + '<Cons>' + cons + '</Cons><OrderBy>' + '' + '</OrderBy>';
        cXML = basedata_addROOT(cXML);
        var curl = GetWSRRURL(peoa_GetWSRRURL(11)) + "&type=GetOrgs&XML=" + encodeURIComponent(cXML)
            + "&s=" + new Date().getTime();  //拼接url   
        $.ajax({
            url: curl,
            options: "JSON",
            async: false,
            success: function (data) {
                m_UserInfo.depts = [];
                var data1 = eval('(' + data + ')');
                if (data1.rows && dataUtil_undefinedOrNull(data1.rows[0].oz1_id,'') != '') {
                    m_UserInfo.depts = data1.rows;
                }
            }
        }); 
    } else if (m_FuncType == 'SP') {
        // 部门获取通过记录部门
        var cons = ' AND OZ1_OrgCode=\'' + m_BillInfo.bg4_deptid + '\' ';
        var cXML = '<Page>0</Page><Num>0</Num>'
                  + '<Cons>' + cons + '</Cons><OrderBy></OrderBy>'
        cXML = basedata_addROOT(cXML);
        //alert(cXML);	
        var curl = GetWSRRURL(peoa_GetWSRRURL(11)) + "&type=GetOrgs&XML=" + encodeURIComponent(cXML)
            + "&s=" + new Date().getTime();  //拼接url   
        $.ajax({
            url: curl,
            options: "JSON",
            async: false,
            success: function (data) {
                m_UserInfo.depts = [];
                var data1 = eval('(' + data + ')');
                if (data1.rows[0]) {
                    m_UserInfo.depts.push(data1.rows[0]);
                }
            }
        });
    }

    

    /*
    //年份
    $('#cxYear').combobox({
        panelWidth: "90",
        panelHeight: "80",
        editable: false,
        multiple: false,
        valueField: 'text',
        textField: 'text',
        data: m_Years,
        onChange: function (data) {
            //重新加载数据
            searchByCons();
        },
        onShowPanel: function (rowIndex) {
            actContralSave('combo', '#cxYear');
        }
    }); 

    //品牌选项获取  
    $('#cxBrand').combobox({
        panelWidth: "90",
        panelHeight: "70",
        editable: false,
        multiple: false,
        valueField: 'ct1_code',
        textField: 'ct1_code',
        data: m_Brands,
        onChange: function (newValue, oldValue) {
            searchByCons();
        },
        onShowPanel: function () {
            actContralSave('combo', '#cxBrand');
        }
    });
    */


    //部门 下拉框设置
    if (m_UserInfo.depts.length == 1) {
        $('#cxDept').combobox({
            panelWidth: "155",
            panelHeight: "130",
            animate: true,
            onlyLeafCheck: true,
            editable: false,
            multiple: false,
            valueField: 'oz1_orgcode',
            textField: 'oz1_orgname',
            data: m_UserInfo.depts 
        });
        m_deptchoose = m_UserInfo.depts[0];
        $('#cxDept').combobox('disable');
        $('#cxDept').combobox('setValue', m_UserInfo.depts[0].oz1_orgcode); 
        $('#cxBrand').combobox('setValue', m_deptchoose.oz1_brand); //设置品牌
        //设置小类选择div  
        var modelid = m_deptchoose.oz1_modeltype //模板类别fatherid 
        //获取项目数组
        var xmid = m_deptchoose.oz1_id //项目fatherid
        var cons = ' AND CT1_State=\'启用\'  AND CT1_FatherID in (\'' + xmid + '\' ';
        if (modelid != '') {
            cons = cons + ', \'' + modelid + '\'';
        }
        cons = cons + ')';
        res = basedata_getBDCommon('gbd12', cons);
        m_MDDXLList = [];
        m_XMList = [];
        for (var i = 0; i < res.length; i++) {
            var f1 = res[i].ct1_fatherid.toUpperCase();
            if (f1 == modelid.toUpperCase()) {
                m_MDDXLList.push(res[i]);
            } else if (f1 == xmid.toUpperCase()) {
                m_XMList.push(res[i]);

            }
        }
        $('#cxProject').combobox('setValue', ''); //清空项目
        $('#cxProject').combobox('loadData', m_XMList);//设置项目
        $("#spanXLCode").html(''); //清空小类
        setXLTypes();
        changeDept(m_UserInfo.depts[0].oz1_orgcode);
    } else {  
        $('#cxDept').combobox({
            panelWidth: "155",
            panelHeight: "130",
            animate: true,
            onlyLeafCheck: true,
            editable: false, 
            valueField: 'oz1_orgcode',
            textField: 'oz1_orgname',
            data: m_UserInfo.depts,
            onSelect: function (data) { 
                m_deptchoose = data; 
                //设置小类选择div  
                var modelid = m_deptchoose.oz1_modeltype //模板类别fatherid 
                $('#cxBrand').combobox('setValue', m_deptchoose.oz1_brand); //设置品牌
                //获取项目数组
                var xmid = m_deptchoose.oz1_id //项目fatherid
                var cons = ' AND CT1_State=\'启用\'  AND CT1_FatherID in (\''+ xmid + '\' ';
                if (modelid != '') {
                    cons = cons + ', \'' + modelid + '\'';
                }
                cons = cons + ')'; 
                res = basedata_getBDCommon('gbd12', cons);
                m_MDDXLList = [];
                m_XMList = [];
                for (var i = 0; i < res.length; i++) {
                    var f1 = res[i].ct1_fatherid.toUpperCase();
                    if (f1 == modelid.toUpperCase()) {
                        m_MDDXLList.push(res[i]);
                    } else if (f1 == xmid.toUpperCase()) {
                        m_XMList.push(res[i]);
                        
                    }
                }
                $('#cxProject').combobox('setValue', ''); //清空项目
                $('#cxProject').combobox('loadData', m_XMList);//设置项目
                $("#spanXLCode").html(''); //清空小类
                setXLTypes();
                changeDept(m_deptchoose.oz1_orgcode);
                //重新加载数据
                searchByCons();
            },
            onChange: function (newValue, oldValue) { 
               
            },
            onShowPanel: function (rowIndex) { 
                actContralSave('combo', '#cxDept');
            }
        });
    } 

    //项目选项获取  
    $('#cxProject').combobox({
        panelWidth: "150",
        panelHeight: "70",
        editable: false,
        multiple: false,
        valueField: 'ct1_codename',
        textField: 'ct1_codename',
        data: m_XMList,
        onChange: function (newValue, oldValue) {
            searchByCons();
        },
        onShowPanel: function () {
            actContralSave('combo', '#cxProject');
        }
    });
      

    //初始化列表
    actyslbcsh(m_DatagridID);
    searchByCons();

    //鼠标单击后事件设置选中行合计值
    document.onmouseup = function (e) {
        getRowTotal(m_LastIndex, 'dg');
        return true;
    }

});


/***********************************************************************
 *  查询事件：根据条件查询
 *  DLY 
 */
function searchByCons() {
    $("#spanTatolpage").html('0');
    $("#spanTatol").html('0');
    $("#spanTatolT").html('0');
    $(m_DatagridID).datagrid('loadData', []);
    m_PageNumber = 1;
    
    //拼接条件 获取数据集
    var sbrand = $('#cxBrand').combobox('getValue');
    var sdept = $('#cxDept').combobox('getValue');
    var syear = $('#cxYear').combobox('getValue');
    var sxlcode = $("#spanXLCode").html();
    var sproject = $('#cxProject').combogrid('getValue');
    if (sbrand == '' || sdept == '' || syear == '' ) {
        $(m_DatagridID).datagrid('loadData', []);
        return true;
    } 
    var cfilter = ' AND bg3_type = \'1\'  AND isnull(bg3_state,0) = 0';
    cfilter = cfilter + ' AND  bg3_deptid = \'' + sdept + '\'';
    cfilter = cfilter + ' AND  bg3_year = \'' + syear + '\'';
    cfilter = cfilter + ' AND  bg3_brand = \'' + sbrand + '\'';
    m_Filter3 = cfilter;  // 条件到部门 
    cfilter = cfilter + ' AND  bg3_project = \'' + sproject + '\'';
    m_Filter2 = cfilter; // 条件到项目
    if (sxlcode == '') { 
        sxlcode = 'abc';
    } else { 
        sxlcode = basedata_getCodename(m_MDDXLList, $("#spanXLCode").html(), 'ct1_id', 'ct1_code');
    }
    cfilter = cfilter + ' AND  isnull(bg3_xlcode,\'\') = \'' + sxlcode + '\'';

    m_Filter1 = cfilter; // 条件到小类
    actLoadData(m_PageNumber, m_PageSize);

}
 

/***********************************************************************
 *  刷新列表数据
 *  DLY 
 */
function actLoadData(page, number) {
    var totalCount = 0;
    m_PageNumber = page;
    m_PageSize = number;
    var cXML = '<Page>' + page + '</Page><Num>' + number + '</Num>'
             + '<Cons>' + m_Filter + m_Filter1 + '</Cons><OrderBy>' + m_OrderBy + '</OrderBy>';
    cXML = basedata_addROOT(cXML);
    var curl = GetWSRRURL(peoa_GetWSRRURL(14)) + "&type=GetHs&XML=" + encodeURIComponent(cXML); //拼接url
    //alert(cXML);	
    $.ajax({
        url: curl,
        type: "GET",
        async: false,
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //alert(jsonUtil_jsonToStr(data));
            $(m_DatagridID).datagrid('loadData', []);
            if (data && data.rows && data.rows.length > 0) {
                if (dataUtil_undefinedOrNull(data.rows[0].bg3_id, '') != '') {
                    $(m_DatagridID).datagrid('loadData', data.rows);
                }  
            }
        }
    })
    $(m_DatagridID).datagrid("clearSelections");


    // 合计当前页金额  
    var sum = 0;
    var rows = $(m_DatagridID).datagrid('getRows');
    for (var i = 0; i < rows.length; i++) {
        sum = sum * 1 + rows[i].bg3_total * 1;
    }
    $("#spanTatolpage").html(dataUtil_formatNum1(dataUtil_toFixed(sum, 0),'0'));

    // 合计项目金额
    var cXML = '<Page>1</Page><Num>1</Num>'
             + '<Cons>' + m_Filter + m_Filter2 + '</Cons><OrderBy>' + m_OrderBy + '</OrderBy>';
    cXML = basedata_addROOT(cXML);
    var curl = GetWSRRURL(peoa_GetWSRRURL(14)) + "&type=GetSums&XML=" + encodeURIComponent(cXML); //拼接url 
    $.ajax({
        url: curl,
        type: "GET",
        async: false,
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#spanTatol").html('0');
            if (data && data.rows && data.rows.length > 0) {
                if (dataUtil_undefinedOrNull(data.rows[0].stotal, '') != '') {
                    $("#spanTatol").html(dataUtil_formatNum1(data.rows[0].stotal, '0'));
                }
            }
        }
    })

    // 合计总金额
    var cXML = '<Page>1</Page><Num>1</Num>'
             + '<Cons>' + m_Filter + m_Filter3 + '</Cons><OrderBy>' + m_OrderBy + '</OrderBy>';
    cXML = basedata_addROOT(cXML);
    var curl = GetWSRRURL(peoa_GetWSRRURL(14)) + "&type=GetSums&XML=" + encodeURIComponent(cXML); //拼接url 
    $.ajax({
        url: curl,
        type: "GET",
        async: false,
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#spanTatolT").html('0');
            if (data && data.rows && data.rows.length > 0) {
                if (dataUtil_undefinedOrNull(data.rows[0].stotal, '') != '') {
                    $("#spanTatolT").html(dataUtil_formatNum1(data.rows[0].stotal, '0'));
                }
            }
        }
    })
}


/***********************************************************************
 *  部门预算列表初始化
 *  DLY 
 */
function actyslbcsh(dgid) {
    $(dgid).datagrid({
        //title:'预算列表', 
        //width: document.body.clientWidth,
        //height: getcurheight(), 
        height: 500,
        nowrap: true,
        striped: false,
        collapsible: true,
        //sortName: 'id',
        //sortOrder: 'asc',
        remoteSort: false,
        idField: 'bg3_id',
        frozenColumns: [[

        ]],
        columns: [[
            { field: 'bg3_id', title: 'FID', width: 100, hidden: true },
            { field: 'bg3_cono', title: 'cono', width: 40, hidden: true },
            { field: 'bg3_divi', title: 'divi', width: 40, hidden: true },
            { field: 'bg3_type', title: '类别', width: 40, hidden: true },
            { field: 'bg3_year', title: '年份', width: 50, hidden: true },
            { field: 'bg3_com', title: '<input id=\"detailcheckbox\" type=\"checkbox\">&nbsp;&nbsp;公司', width: 80
                , editor: {
                    type: 'combobox', options: {
                        valueField: 'text', textField: 'text',
                        data: m_Coms, editable: false, panelHeight: "80",
                        onShowPanel: function () { 
                            var ed = $(dgid).datagrid('getEditor', { index: m_LastIndex, field: 'bg3_com' });
                            $(ed.target).combobox("loadData", m_Coms);
                        }
                    }
            }},
            { field: 'bg3_branch', title: '大区', width: 80, hidden: true },
            { field: 'bg3_centercode', title: '成本中心', width: 80
                , editor: {
                    type: 'combobox', options: {
                        valueField: 'text', textField: 'text',
                        data: m_CostCenters, editable: false, panelHeight: "80",
                        onShowPanel: function () { 
                            var ed = $(dgid).datagrid('getEditor', { index: m_LastIndex, field: 'bg3_centercode' });
                            $(ed.target).combobox("loadData", m_CostCenters);
                        }
                    }
             }},
            { field: 'bg3_deptid', title: '部门编码', width: 100, hidden: true },
            { field: 'bg3_deptname', title: '部门名称', width: 100 },
            { field: 'bg3_remark1', title: '说明', width: 150, editor: 'text' },
            { field: 'bg3_remark2', title: '说明2', width: 100, hidden: true },
            {
                field: 'bg3_total', title: '合计', width: 90, align: "right"
				, editor: { type: 'numberbox', options: { disabled: true, precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m1', title: '1月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m2', title: '2月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m3', title: '3月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m4', title: '4月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m5', title: '5月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m6', title: '6月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m7', title: '7月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m8', title: '8月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m9', title: '9月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m10', title: '10月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m11', title: '11月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
            {
                field: 'bg3_m12', title: '12月', width: 80, align: "right"
				, editor: { type: 'numberbox', options: { precision: 0 } }
			    , formatter: function (val) { return dataUtil_formatNum1(val); }
            },
		    { field: 'bg3_state', title: '状态', width: 60 },
		    { field: 'bg3_dlcode', title: '大类代码', width: 80 },
		    { field: 'bg3_dlname', title: '大类名称', width: 80
                , formatter: function (val, row, index) {
                    return basedata_getCodename(m_DLList, row.bg3_dlcode, 'ct1_code', 'ct1_codename');
                }
		    },
		    { field: 'bg3_xlcode', title: '小类代码', width: 80 },
		    { field: 'bg3_xlname', title: '小类名称', width: 80
                , formatter: function (val, row, index) {
		        return basedata_getCodename(m_XLList, row.bg3_xlcode, 'ct1_code', 'ct1_codename');
		        }
		    },
            { field: 'bg3_brand', title: '品牌', width: 60 },
            { field: 'bg3_project', title: '项目', width: 120 },
			{ field: 'bg3_rgdt', title: '创建时间', width: 105 },
			{ field: 'bg3_rguser', title: '创建人', width: 70 },
		    { field: 'bg3_lmdt', title: '修改时间', width: 105 },
            { field: 'bg3_lmuser', title: '修改人', width: 70 },
            { field: 'bg3_uptno', title: '修改次数', width: 70 }
        ]],
        pagination: false,
        rownumbers: true,
        singleSelect: false,
        onDblClickRow: function (rowIndex) {
            $(dgid).datagrid("clearSelections");
            $(dgid).datagrid('selectRow', rowIndex);
            if (m_EditFlag == 1) { // 不可编辑
                return false;
            }
            m_LastIndex = rowIndex;
            $(dgid).datagrid('beginEdit', rowIndex);
        },
        onClickRow: function (rowIndex) {
            $(dgid).datagrid('endEdit', m_LastIndex);
        },
        onClickCell: function (rowIndex, field, value) {
        },
        onAfterEdit: function (index, row) {

        },
        //onRowContextMenu: onRowContextMenu, 
        toolbar: '#tjcxk'
    });
}


//添加右击菜单内容
function onRowContextMenu(e, rowIndex, rowData) {
    e.preventDefault();
    //var selected = $("#test").datagrid('getRows'); //获取所有行集合对象
    //selected[rowIndex].id; //index为当前右键行的索引，指向当前行对象
    //$('#mm').menu('show', {
    //    left: e.pageX,
    //    top: e.pageY
    //});
}


/***********************************************************************
 *  合计字段绑定只读事件
 *  DLY 
 */
function bindTotalField(rowIndex) {
    var ed = $(m_DatagridID).datagrid('getEditor', { index: rowIndex, field: 'bg3_total' });
    ed.target.bind('keypress', function () { return false; });
    ed.target.bind('keydown', function () { return false; });
    ed.target.bind('focus', function () { return false; });
    ed.target.bind('mousedown', function (e) {
        if (3 == e.which) {
            alert('该合计字段不可右键操作！');
        }
        return false;
    });
    //ed.target.bind('paste', function (e) { 
    //    return false;
    //});
    //var ed1 = $(m_DatagridID).datagrid('getEditor', { index: rowIndex, field: 'bg3_m1' });
    //ed1.target.bind('paste', function (e) {
    //    var element = this;
    //    setTimeout(function () {
    //        var text = $(element).val();
    //        text = window.clipboardData.getData("text"); 
    //        actCopeToAdd(text);
    //    }, 100); 
    //});


}


/***********************************************************************
 *  设置选中行合计值 或 设置行编辑窗合计
 *  DLY 
 */
function getRowTotal(rowIndex, type) {
    var sum = 0;
    if (type == 'dg') {
        if (rowIndex != undefined && rowIndex >= 0) {
            var edt = $(m_DatagridID).datagrid('getEditor', { index: rowIndex, field: 'bg3_total' });
            if (edt == undefined) {
                return false;
            }
            for (var i = 1; i < 13; i++) {
                var ed = $(m_DatagridID).datagrid('getEditor', { index: rowIndex, field: 'bg3_m' + i });
                if (ed != undefined && !isNaN(ed.target.val())) {
                    sum = sum * 1 + dataUtil_toFixed(ed.target.val(), 2) * 1;
                }
            }
            var sum1 = edt.target.val() * 1;
            if (dataUtil_toFixed(sum1, 2) != dataUtil_toFixed(sum, 2)) {
                edt.target.numberbox('setValue', dataUtil_toFixed(sum, 2) * 1);
            }

        }
    } else if (type == 'dlg') {
        sum = $('#rbg3_m1').numberbox('getValue') * 1 + $('#rbg3_m2').numberbox('getValue') * 1
                 + $('#rbg3_m3').numberbox('getValue') * 1 + $('#rbg3_m4').numberbox('getValue') * 1
                 + $('#rbg3_m5').numberbox('getValue') * 1 + $('#rbg3_m6').numberbox('getValue') * 1
                 + $('#rbg3_m7').numberbox('getValue') * 1 + $('#rbg3_m8').numberbox('getValue') * 1
                 + $('#rbg3_m9').numberbox('getValue') * 1 + $('#rbg3_m10').numberbox('getValue') * 1
                 + $('#rbg3_m11').numberbox('getValue') * 1 + $('#rbg3_m12').numberbox('getValue') * 1;
        $("#spanrowtotal").html(dataUtil_toFixed(sum, 2));
    }
    return sum;
}


/***********************************************************************
*  导出Excel
*  DLY 
*/
function actToExcel(type) {
    var rows = []
    if (type == 'model') {
        dataExpotToFile('4', [], [], []);
        return;
    }  
}
 

/***********************************************************************
 *  excel复制添加事件
 *  DLY 
 */
function actCopeToAdd(text) {
    var flag = 0;
    m_LastIndex = actEndEdit(m_DatagridID, m_LastIndex);
    $(m_DatagridID).datagrid("clearSelections");
    var gridlength = $(m_DatagridID).datagrid('getRows').length;
    if ($('#cxDept').combobox('getValue') == '') {
        alert('请先选择部门！');
        return false;
    }
    if ($('#cxYear').combobox('getValue') == '') {
        alert('年份不能为空！');
        return false;
    }
    if ($('#cxBrand').combobox('getValue') == '') {
        alert('品牌不能为空！');
        return false;
    }
    if ($('#cxProject').combobox('getValue') == '') {
        alert('请先选择项目！');
        return false;
    }
    if ($("#spanXLCode").html() == '') {
        alert('请先选择小类！');
        return false;
    }
    if (text == undefined) {
        if (navigator.appName.toLowerCase() == 'microsoft internet explorer') {
            text = window.clipboardData.getData("text");
        } else {
            $('#textexcelcope').val('');
            $('#excelcopedlg').dialog('open');
            return false;
        }
    }
    //alert(text); 
    if (dataUtil_undefinedOrNull(text, '') != '') {
        $('#waitdlg').dialog('open');
        flag = 1;
        setTimeout(function () {
            var reg = new RegExp("本行止\n", "g");
            text = text.replace(reg, '本行止\r\n');
            var reg2 = new RegExp("\"", "g");
            text = text.replace(reg2, '');
            var strlist1 = text.split('\r\n');
            var copyrows = [];
            for (var i = 0; i < strlist1.length - 1; i++) {
                var strlist2 = strlist1[i].split('\t');
                if (strlist2.length >= 15 && strlist2[0] != '公司' && strlist2[1] != '成本中心') {
                    var rownew = newRow();
                    //公司校验及填充
                    for (var c1 = 0; c1 < m_Coms.length; c1++) {
                        if (strlist2[0] == m_Coms[c1].text) {
                            rownew.bg3_com = strlist2[0];
                            break;
                        }
                    }
                    //成本中心校验及填充
                    for (var c2 = 0; c2 < m_CostCenters.length; c2++) {
                        if (strlist2[1] == m_CostCenters[c2].text) { 
                            rownew.bg3_centercode = strlist2[1];
                            break;
                        }
                    }
                    rownew.bg3_remark1 = strlist2[2];
                    rownew.bg3_m1 = strlist2[3];
                    rownew.bg3_m2 = strlist2[4];
                    rownew.bg3_m3 = strlist2[5];
                    rownew.bg3_m4 = strlist2[6];
                    rownew.bg3_m5 = strlist2[7];
                    rownew.bg3_m6 = strlist2[8];
                    rownew.bg3_m7 = strlist2[9];
                    rownew.bg3_m8 = strlist2[10];
                    rownew.bg3_m9 = strlist2[11];
                    rownew.bg3_m10 = strlist2[12];
                    rownew.bg3_m11 = strlist2[13];
                    rownew.bg3_m12 = strlist2[14];
                    var sum = 0;
                    for (var j = 3; j < 15; j++) {
                        if (!isNaN(strlist2[j])) {
                            sum = sum * 1 + dataUtil_toFixed(strlist2[j], 2) * 1;
                        }
                    }
                    rownew.bg3_total = sum;
                    copyrows.push(rownew);
                    actCopeToAdd_append(rownew);

                }
            }
        }, 100);
    }
    m_LastIndex = -1;
    if (flag == 1) {
        setTimeout(function () {
            $('#waitdlg').dialog('close');
        }, 1000);
    }

    function actCopeToAdd_append(appenrow) {
        setTimeout(function () {
            $(m_DatagridID).datagrid('appendRow', appenrow);
            $(m_DatagridID).datagrid('selectRow', gridlength);
            gridlength = gridlength * 1 + 1 * 1;
        }, 100);
    }
     
}


/***********************************************************************
 *  excel复制添加事件-插入首行
 *  DLY 
 */
function actCopeToAdd1_bak(text) {
    m_LastIndex = actEndEdit(m_DatagridID, m_LastIndex);
    if ($('#cxBrand').combobox('getValue') == '') {
        alert('请先选择品牌！');
        return false;
    }
    if ($('#cxDLCode').combogrid('getValue') == '') {
        alert('请先选择大类！');
        return false;
    }
    if ($('#cxYear').combobox('getValue') == '') {
        alert('请先选择年份！');
        return false;
    }
    if ($("#spanXLCode").html() == '') {
        alert('请先选择小类！');
        return false;
    }

    $('#waitdlg').dialog('open');
    if (text == undefined) {
        text = window.clipboardData.getData("text");
    }
    var flag = 0;
    var reg = new RegExp("\"", "g");
    text = text.replace(reg, '');
    var strlist1 = text.split('\r\n');
    for (var i = strlist1.length - 1; i >= 0 ; i--) {
        var strlist2 = strlist1[i].split('\t');
        if (strlist2.length == 18) {
            var rownew = newRow();
            //rownew.bg3_com = strlist2[0];
            rownew.bg3_branch = strlist2[1];
            //rownew.bg3_centercode = strlist2[2];
            rownew.bg3_deptname = strlist2[3];
            rownew.bg3_remark1 = strlist2[4];
            rownew.bg3_remark2 = strlist2[5];
            rownew.bg3_m1 = strlist2[6];
            rownew.bg3_m2 = strlist2[7];
            rownew.bg3_m3 = strlist2[8];
            rownew.bg3_m4 = strlist2[9];
            rownew.bg3_m5 = strlist2[10];
            rownew.bg3_m6 = strlist2[11];
            rownew.bg3_m7 = strlist2[12];
            rownew.bg3_m8 = strlist2[13];
            rownew.bg3_m9 = strlist2[14];
            rownew.bg3_m10 = strlist2[15];
            rownew.bg3_m11 = strlist2[16];
            rownew.bg3_m12 = strlist2[17];
            var sum = 0;
            for (var j = 6; j < 18; j++) {
                if (!isNaN(strlist2[j])) {
                    sum = sum * 1 + dataUtil_toFixed(strlist2[j], 2) * 1;
                }
            }
            rownew.bg3_total = sum;
            $(m_DatagridID).datagrid('insertRow', {
                index: 0,
                row: rownew
            });
            flag = 1;
        }
    }
    if (flag == 1) {
        m_LastIndex = 0;
        $(m_DatagridID).datagrid('selectRow', m_LastIndex);
        $(m_DatagridID).datagrid('beginEdit', m_LastIndex);
    }

    if (flag != undefined) {
        setTimeout(function () {
            $('#waitdlg').dialog('close');
        }, 500);
    }

}


/***********************************************************************
 *  添加事件
 *  DLY 
 */
function actAdd() { 
    if ($('#cxDept').combobox('getValue') == '') {
        alert('请先选择部门！');
        return false;
    }
    if ($('#cxYear').combobox('getValue') == '') {
        alert('年份不能为空！');
        return false;
    }
    if ($('#cxBrand').combobox('getValue') == '') {
        alert('品牌不能为空！');
        return false;
    }
    if ($('#cxProject').combobox('getValue') == '') {
        alert('请先选择项目！');
        return false;
    } 
    if ($("#spanXLCode").html() == '') {
        alert('请先选择小类！');
        return false;
    } 

    m_LastIndex = actEndEdit(m_DatagridID, m_LastIndex);
    $(m_DatagridID).datagrid("clearSelections");
    m_LastIndex = $(m_DatagridID).datagrid('getRows').length;
    var rownew = newRow();
    $(m_DatagridID).datagrid('appendRow', rownew);
    $(m_DatagridID).datagrid('beginEdit', m_LastIndex);
    $(m_DatagridID).datagrid('selectRow', m_LastIndex);

}


/***********************************************************************
 *  复制事件
 *  DLY 
 */
function actCopy() {
    var insertRowIndex = [];
    m_LastIndex = actEndEdit(m_DatagridID, m_LastIndex);
    var rows = $(m_DatagridID).datagrid("getSelections");
    var rowsindexs = [];
    for (var i = 0; i < rows.length; i++) {
        var rindex = $(m_DatagridID).datagrid('getRowIndex', rows[i]);
        rowsindexs.push({ r: rindex, row: rows[i] });
    }
    // 借用rowsindexs对选择行排序，便于复制操作
    rowsindexs.sort(function (a, b) {
        return a.r - b.r
    });
    var len = rowsindexs.length;
    $(m_DatagridID).datagrid("clearSelections");
    for (var i = len - 1; i >= 0; i--) {
        var rindex = rowsindexs[i].r;
        //var rownew = rowsindexs[i].row;
        //rownew.bg3_id = dataUtil_NewGuid();
        //rownew.bg3_state = '0'; 
        //rownew.rowindex = rindex*1 + 1;
        var rownew = newRow();
        rownew.bg3_com = rowsindexs[i].row.bg3_com;
        rownew.bg3_branch = rowsindexs[i].row.bg3_branch;
        rownew.bg3_year = rowsindexs[i].row.bg3_year;
        rownew.bg3_brand = rowsindexs[i].row.bg3_brand;
        rownew.bg3_project = rowsindexs[i].row.bg3_project;
        rownew.bg3_dlcode = rowsindexs[i].row.bg3_dlcode;
        //rownew.bg3_dlname = rowsindexs[i].row.bg3_dlname; 
        rownew.bg3_xlcode = rowsindexs[i].row.bg3_xlcode;
        //rownew.bg3_xlname = rowsindexs[i].row.bg3_xlname; 
        rownew.bg3_centercode = rowsindexs[i].row.bg3_centercode;
        rownew.bg3_deptid = rowsindexs[i].row.bg3_deptid;
        rownew.bg3_deptname = rowsindexs[i].row.bg3_deptname;
        rownew.bg3_remark1 = rowsindexs[i].row.bg3_remark1;
        rownew.bg3_remark2 = rowsindexs[i].row.bg3_remark2;
        rownew.bg3_m1 = rowsindexs[i].row.bg3_m1;
        rownew.bg3_m2 = rowsindexs[i].row.bg3_m2;
        rownew.bg3_m3 = rowsindexs[i].row.bg3_m3;
        rownew.bg3_m4 = rowsindexs[i].row.bg3_m4;
        rownew.bg3_m5 = rowsindexs[i].row.bg3_m5;
        rownew.bg3_m6 = rowsindexs[i].row.bg3_m6;
        rownew.bg3_m7 = rowsindexs[i].row.bg3_m7;
        rownew.bg3_m8 = rowsindexs[i].row.bg3_m8;
        rownew.bg3_m9 = rowsindexs[i].row.bg3_m9;
        rownew.bg3_m10 = rowsindexs[i].row.bg3_m10;
        rownew.bg3_m11 = rowsindexs[i].row.bg3_m11;
        rownew.bg3_m12 = rowsindexs[i].row.bg3_m12;
        rownew.bg3_total = rowsindexs[i].row.bg3_total;
        $(m_DatagridID).datagrid('insertRow', {
            index: rindex * 1 + 1,
            row: rownew
        });
        $(m_DatagridID).datagrid('selectRow', rindex + 1); 
        
    } 
 
}


/***********************************************************************
 *  删除事件
 *  DLY 
 */
function actDelete() {
    m_LastIndex = actEndEdit(m_DatagridID, m_LastIndex);
    var rows = $(m_DatagridID).datagrid("getSelections");
    if (rows.length == 0) {
        return false;
    }
    $.messager.confirm('确认框', '确认删除选中记录吗？', function (r) {
        if (r) {
            var rowsindexs = [];
            for (var i = 0; i < rows.length; i++) {
                var rindex = $(m_DatagridID).datagrid('getRowIndex', rows[i]);
                rowsindexs.push(rindex*1+100);
            }
            rowsindexs.sort();  // index 排序
            var len = rowsindexs.length;
            for (var i = len - 1; i >= 0; i--) {
                var index = rowsindexs[i]-100;
                $(m_DatagridID).datagrid('deleteRow', index);	//通过行号移除该行  
            }
        }
    });
}


/***********************************************************************
 *  保存事件
 *  DLY 
 */
function actSave() {
    var flag = false;

    //合计并结束编辑行
    getRowTotal(m_LastIndex, 'dg');
    m_LastIndex = actEndEdit(m_DatagridID, m_LastIndex);

    //行信息校验
    if (!saveCheck()) {
        return flag;
    }


    var dataRows = $(m_DatagridID).datagrid('getRows');
    var cXML1 = '';
    //以下拼接修改记录信息json
    if ($(m_DatagridID).datagrid('getChanges').length > 0) {
        //if (!shopaveCheck()) {
        //    return flag;
        //}
        var gridDataChanges = [];
        var inserted = $(m_DatagridID).datagrid('getChanges', "inserted");
        var updated = $(m_DatagridID).datagrid('getChanges', "updated");
        var deleted = $(m_DatagridID).datagrid('getChanges', "deleted");
        for (var i = 0; i < inserted.length; i++) {
            inserted[i]["bg3_total"] = inserted[i]["bg3_total"] * 1;
            for (var j = 1; j < 13; j++) {
                inserted[i]["bg3_m" + j] = inserted[i]["bg3_m" + j] * 1;
            } 
            inserted[i].bg3_rguser = m_UserInfo.UserName; 
            inserted[i].bg3_uptno = 0;
        }
        for (var i = 0; i < updated.length; i++) {
            updated[i]["bg3_total"] = updated[i]["bg3_total"] * 1;
            for (var j = 1; j < 13; j++) {
                updated[i]["bg3_m" + j] = updated[i]["bg3_m" + j] * 1;
            }
            updated[i].bg3_lmdt = dateUtil_dateFomaterA(new Date(), '/')
            updated[i].bg3_lmuser = m_UserInfo.UserName;
            updated[i].bg3_uptno = updated[i].bg3_uptno * 1 + 1;
        }
        for (var i = 0; i < deleted.length; i++) {
            var obj = new Object();
            obj.bg3_id = deleted[i].bg3_id;
            obj.bg3_state = '9';
            obj.bg3_lmdt = dateUtil_dateFomaterA(new Date(), '/')
            obj.bg3_lmuser = m_UserInfo.UserName;
            obj.bg3_uptno = deleted[i].bg3_uptno * 1 + 1;
            updated.push(obj);
        }
        cXML1 = GetEditJson(inserted, updated, []);//json转xml
    } else {
        alert('没有修改信息！');
        return flag;
    }
    var cxmlsJson = { XML: cXML1 };
    var curl = GetWSRRURL(peoa_GetWSRRURL(14)) + "&type=Save"; //拼接url
    //alert(cXML);	
    $.ajax({
        url: curl,
        type: "POST",
        async: false,
        data: cxmlsJson,
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //alert(jsonUtil_jsonToStr(data)); 
            if (data && data.rows) {
                if (data.rows[0].result.toUpperCase() == 'TRUE') {
                    actLoadData(m_PageNumber, m_PageSize);
                    //设置审批信息
                    flag = saveSPRow();
                }
            }
        }
    });

    if (flag) {
        alert('保存成功！');
    } else {
        alert('保存失败！');
    }
    return flag;
}


/***********************************************************************
 *  保存审批记录
 *  DLY 
 */
function saveSPRow() { 
    var flag = false;
    var curlt = ''
    var cxmlsJsont = {};
    var rowt = {};
    //首次保存生成审批记录
    if ($("#spanbg4_id").html() == '' && $("#spanTatolT").html() > '0') { 
        rowt.bg4_id = dataUtil_NewGuid();
        rowt.bg4_state = '未提交';
        rowt.bg4_rguser = m_UserInfo.UserName;
        rowt.bg4_type = '1';
        rowt.bg4_year = $('#cxYear').combobox('getValue');
        rowt.bg4_brand = $('#cxBrand').combobox('getValue');
        rowt.bg4_subject = rowt.bg4_year + '-' + $('#cxBrand').combobox('getValue')
                          + '-' + $('#cxDept').combobox('getText') + '-' + '预算编制';
        var reg = new RegExp(",", "g");
        rowt.bg4_total = $("#spanTatolT").html().replace(reg, '') * 1;
        rowt.bg4_deptid = $('#cxDept').combobox('getValue');
        rowt.bg4_deptname = $('#cxDept').combobox('getText');
        curlt = GetWSRRURL(peoa_GetWSRRURL(14));
        curlt = curlt + "&type=NewApH&actor=" + m_UserInfo.UserName + "&s=" + new Date().getTime();
        var rowInfot = [];
        rowInfot.push(rowt);
        var cXMLt = GetEditJson(rowInfot, [], []); //json转xml   
        cxmlsJsont = { XML: cXMLt }; 
    } else if ($("#spanbg4_id").html() != '') {
        //修改总金额 begin
        rowt.bg4_id = $("#spanbg4_id").html();
        var reg = new RegExp(",", "g");
        rowt.bg4_total = $("#spanTatolT").html().replace(reg, '') * 1;
        var rowInfot = [];
        rowInfot.push(rowt);
        var cXMLt = GetEditJson(rowInfot, [], []); //json转xml   
        cxmlsJsont = { XML: cXMLt };
        curlt = GetWSRRURL(peoa_GetWSRRURL(14));
        curlt = curlt + "&type=SetApH&actor=" + m_UserInfo.UserName + "&s=" + new Date().getTime();
    }
    $.ajax({
        url: curlt,
        type: "POST",
        async: false,
        data: cxmlsJsont,
        dataType: "json",
        success: function (result) {
            try {
                //alert(jsonUtil_jsonToStr(result));
                if (result.Error) {
                    $.messager.alert("系统错误", result.Error, 'error');
                } else if (result.rows[0].result == "False") {
                    $.messager.alert("提示", result.rows[0].message, 'error');
                } else if (result.rows[0].result == "True") {
                    flag = true;
                    $("#spanbg4_id").html(rowt.bg4_id);
                }
            } catch (ex) {
                $.messager.alert("提示", ex, 'error');
            }
        },
        error: function () {
            $.messager.alert("提示", "保存主记录失败！", 'error');
        }
    });
    return flag;
}


/***********************************************************************
 *  保存费用预算信息
 *  DLY 
 */
function saveCheck() {
    var flag = true;
    var rows = $(m_DatagridID).datagrid('getRows');
    for (var i = 0; i < rows.length; i++) {
        var j = i*1+1;
        if (dataUtil_undefinedOrNull(rows[i].bg3_com , '')== '') {
            alert('第'+j+'行公司必填！');
            return false;
        } 
        if (dataUtil_undefinedOrNull(rows[i].bg3_centercode , '')== '') {
            alert('第' + j + '行成本中心必填！');
            return false;
        }
    }
    return flag;
}


/***********************************************************************
 * 结束编辑行
 *  DLY 
 */
function actEndEdit(dgid, index) {
    if (index != undefined && index >= 0) {
        $(dgid).datagrid('endEdit', index);
    }
    return -1;
}


/***********************************************************************
 *  新增行对象
 *  DLY 
 */
function newRow() {
    var rownew = {};
    rownew.bg3_id = dataUtil_NewGuid();
    rownew.bg3_type = '1';
    rownew.bg3_state = '0';
    rownew.bg3_year = $('#cxYear').combobox('getValue');
    rownew.bg3_brand = $('#cxBrand').combobox('getValue');
    rownew.bg3_dlcode = basedata_getCodename(m_MDDXLList, $("#spanXLCode").html(), 'ct1_id', 'ct1_codename');
    rownew.bg3_xlcode = basedata_getCodename(m_MDDXLList, $("#spanXLCode").html(), 'ct1_id', 'ct1_code');  
    if (m_Coms.length == 1) {
        rownew.bg3_com = m_Coms[0].text;
    }
    if (m_CostCenters.length == 1) {
        rownew.bg3_centercode = m_CostCenters[0].text;
    }
    rownew.bg3_deptid = m_deptchoose.oz1_orgcode;
    rownew.bg3_deptname = m_deptchoose.oz1_orgname;
    rownew.bg3_project = $('#cxProject').combobox('getValue'); 
    return rownew;
}
  

/***********************************************************************
 *  设置小类div
 *  DLY 
 */
function setXLTypes() {
    var xllist = m_MDDXLList;
    if (xllist && xllist.length > 0 && xllist[0].ct1_id != '') {
        var shtml = ''; 
        for (var i = 0; i < xllist.length; i++) {
            if (xllist[i].ct1_code != '' && xllist[i].ct1_codename != '') {
                var mtitle = basedata_getCodename(m_XLList, xllist[i].ct1_code, 'ct1_code', 'ct1_codename') + '( ' + xllist[i].ct1_code + ' )';
                var msg = basedata_getCodename(m_XLList, xllist[i].ct1_code, 'ct1_code', 'ct1_fieldvalues5');
                shtml = shtml + '&nbsp;&nbsp;&nbsp;&nbsp;';
                shtml = shtml + '<input type="button" id="' + xllist[i].ct1_id
                    + '" value="' + mtitle
                    + '" class="btn3" onclick="basedata_rightClickXL(\'' + mtitle + '\',\'' + msg + '\'); chooseXL(\'' + xllist[i].ct1_id + '\');'
                    + '" oncontextmenu="basedata_rightClickXL(\'' + mtitle + '\',\'' + msg + '\');">';
            }
        }

        $('#cxXLTypes').html(shtml);
    } else {
        $('#cxXLTypes').html('');
    }
}


/***********************************************************************
 *  选择小类事件
 *  DLY 
 *  spanXLCode : 存放小类id
 */
function chooseXL(xlid) {
    m_LastIndex = actEndEdit(m_DatagridID, m_LastIndex);
    // 切换前提示保存
    if ($(m_DatagridID).datagrid('getChanges').length > 0) {
        $.messager.defaults = { ok: "保存", cancel: "不保存" }; // 修改按钮
        $.messager.confirm('警示', '当前数据已修改，是否先保存数据？'
            , function (r) {
                $.messager.defaults = { ok: "确定", cancel: "取消" }; // 还原按钮;
                if (r) {  //保存，不切换
                    if (actSave()) {
                        flag = false;
                        chooseXLT();
                    }
                } else {  //不保存，切换
                    chooseXLT();
                }
            });
    } else {  //切换   $.messager 变态，跟其他代码会同步执行，不能控制先后
         chooseXLT();
    }

    function chooseXLT() {
        if (xlid != undefined && xlid != '') {
            if ($('#spanXLCode').html() != '') {
                //$('#' + $('#spanXLCode').html()).css("background-color", '#fff');
                //$('#' + $('#spanXLCode').html()).css("color", '#20609b'); 
                $('#' + $('#spanXLCode').html()).removeClass("btn3_choose");
            }
            //$('#' + xlid).css("background-color", m_btn3bgcolor);
            //$('#' + xlid).css("color", '#fff');
            $('#' + xlid).addClass("btn3_choose");

            //存放小类id
            $('#spanXLCode').html(xlid);
        }
        //重新加载数据
        searchByCons();
    }
}


/***********************************************************************
 *  调整主条件，防止数据丢失控制
 *  DLY 
 *  m_changeFlag : 0 不可调整， 1 可调整
 */
function actContralSave(type, field1) {
    m_LastIndex = actEndEdit(m_DatagridID, m_LastIndex);
    if (type == undefined) {
        m_changeFlag = 0;
    } else if (type == 'combo') {
        if (field1 == '#cxBrand' || field1 == '#cxDLCode' || field1 == '#cxYear' || field1 == '#cxDept' || field1 == '#cxProject') {
            if (m_changeFlag != 1 && $(m_DatagridID).datagrid('getChanges').length > 0) {
                $.messager.defaults = { ok: "保存", cancel: "不保存" }; // 修改按钮
                $.messager.confirm('警示', '当前数据已修改，是否先保存数据？'
                    , function (r) {
                        $.messager.defaults = { ok: "确定", cancel: "取消" }; // 还原按钮;
                        if (r) {
                            if (field1 == '#cxDLCode') {
                                $(field1).combogrid('hidePanel');
                            } else {
                                $(field1).combobox('hidePanel');
                            }
                            actSave();
                        } else {
                            m_changeFlag = 1; //设置可下拉标志
                            if (field1 == '#cxDLCode') {
                                $(field1).combogrid('showPanel');
                            } else {
                                $(field1).combobox('showPanel');
                            }
                            return;
                        }
                    });
            }
            m_changeFlag = 0;
        }
    }
}


/***********************************************************************
 *  部门改变事件 
 *  DLY 
 */
function changeDept(deptid) {
    //拆分公司和成本中心
    m_Coms = [];
    if (dataUtil_undefinedOrNull(m_deptchoose.oz1_com,'')!=''){
        var coms = m_deptchoose.oz1_com.split(',');
        for (var i = 0; i < coms.length; i++) {
            if (coms[i] != '') {
                m_Coms.push({ text: coms[i] });
            }
        } 
    }

    m_CostCenters = []; 
    if (dataUtil_undefinedOrNull(m_deptchoose.oz1_com, '') != '') {
        var cccs = m_deptchoose.oz1_costcentercode1.split(',');
        for (var i = 0; i < cccs.length; i++) {
            if (cccs[i] != '') {
                m_CostCenters.push({ text: cccs[i] });
            }
        }
    }

    //状态控制 分编制和审核
    if (m_FuncType == 'BZ') { 
        $('#dnbtn').hide(); // 隐藏驳回按钮
        var flag = 0;
        m_EditFlag = 1;
        var cons = ' AND BG4_Type = \'1\' AND BG4_Year = \'' + $('#cxYear').combobox('getValue') + '\' ';
        cons = cons + ' AND BG4_DeptID = \'' + deptid + '\' ';
        var cXML = '<Page>1</Page><Num>1</Num>'
                 + '<Cons>' + cons + '</Cons><OrderBy>' + '' + '</OrderBy>';
        cXML = basedata_addROOT(cXML);
        var curl = GetWSRRURL(peoa_GetWSRRURL(14)) + "&type=GetApH&XML=" + encodeURIComponent(cXML)
                 + "&s=" + new Date().getTime();//拼接url 
        $.ajax({
            url: curl,
            type: "GET",
            async: false,
            dataType: "json",
            success: function (data) { 
                if (data.rows && data.rows.length >= 0) {
                    flag = 1;
                    if (data.rows.length > 0 && dataUtil_undefinedOrNull(data.rows[0].bg4_id, '') != '') {
                        $("#spanbg4_id").html(data.rows[0].bg4_id);
                        if ((data.rows[0].bg4_state != '未提交' && m_Role == 'A')
                            || data.rows[0].bg4_state == '已审核') {
                            $('#zbtns').hide();
                            $('#bkbjdiv').show();
                            $('#bkbjdiv').html('&nbsp;注意：当前部门预算 ' + data.rows[0].bg4_state + '，不可编辑！');
                            m_EditFlag = 1;
                        } else {
                            $('#zbtns').show();
                            $('#bkbjdiv').hide();
                            $('#bkbjdiv').html('');
                            if (data.rows[0].bg4_state == '未提交') {
                                $('#upbtn').show();
                            } else {
                                $('#upbtn').hide();
                            } 
                            m_EditFlag = 0;
                        }
                    } else {
                        $("#spanbg4_id").html('');
                        $('#zbtns').show();
                        $('#bkbjdiv').hide();
                        $('#bkbjdiv').html('');
                        $('#upbtn').show();
                        m_EditFlag = 0;
                    }
                } else { 
                    $("#spanbg4_id").html('');
                } 
            }
        }) 
        if (flag == 0) {
            $('#zbtns').hide();
            $('#bkbjdiv').show();
            $('#bkbjdiv').html('&nbsp;注意：审批记录获取失败，请截图与管理员联系！');
            m_EditFlag = 1;
        }

    } else if (m_FuncType == 'SP') { 
        $("#spanbg4_id").html(m_BillInfo.bg4_id);
        $('#spanbtnUp').html('审核');
        if (m_BillInfo.bg4_state == '已提交' && m_Role == 'B') {
            $('#zbtns').show();
            $('#bkbjdiv').hide();
            $('#bkbjdiv').html('');
            $('#upbtn').show();
            $('#dnbtn').show(); // 显示驳回按钮 
            m_EditFlag = 0;
        }
        else { 
            $('#zbtns').hide();
            $('#bkbjdiv').show();
            $('#bkbjdiv').html('&nbsp;注意：该预算编制您不可编辑！');
            m_EditFlag = 1; 
        }
    } 
    
}


/***********************************************************************
 *  提交事件 
 *  DLY 
 */
function actUp(type) { 
    m_LastIndex = actEndEdit(m_DatagridID, m_LastIndex);
    if ($(m_DatagridID).datagrid('getChanges').length > 0) {
        alert('数据已修改，请先保存！');
        return false;
    }  
    var bmmoney = dataUtil_undefinedOrNull(m_deptchoose.oz1_bmmoney, 0);
    var reg = new RegExp(",", "g");
    var curmoney = $("#spanTatolT").html().replace(reg, '') * 1;
    if (curmoney <= 0 && type == 'up') {
        alert('总金额必须大于0！');
        return false;
    }
    if (bmmoney > 0 && curmoney > bmmoney && type == 'up') {
        alert('总金额不能大于' + bmmoney + '！');
        return false;
    }
    if (m_FuncType == 'BZ') {
        var info = '';
        var row = {};
        row.bg4_id = $("#spanbg4_id").html();
        if (type == 'up') {
            row.bg4_upper1 = m_UserInfo.UserName;
            row.bg4_updt1 = dateUtil_dateFomaterB(new Date(), '-');
            row.bg4_updt2 = '';
            row.bg4_upper2 = '';
            row.bg4_state = '已提交';
            info = '确认提交当前部门预算编制吗？';
        }
        var curl = GetWSRRURL(peoa_GetWSRRURL(14));
        curl = curl + "&type=SetApH&actor=" + m_UserInfo.UserName + "&s=" + new Date().getTime();
        var rowInfo = [];
        rowInfo.push(row);
        var cXML = GetEditJson(rowInfo, [], []); //json转xml   
        var cxmlsJson = { XML: cXML };
        $.messager.confirm('确认框', info, function (r) {
            if (r) {
                $.ajax({
                    url: curl,
                    type: "POST",
                    async: false,
                    data: cxmlsJson,
                    dataType: "json",
                    success: function (result) {
                        try {
                            //alert(jsonUtil_jsonToStr(result));
                            if (result.Error) {
                                $.messager.alert("系统错误", result.Error, 'error');
                            } else if (result.rows[0].result == "False") {
                                $.messager.alert("提示", result.rows[0].message, 'error');
                            } else if (result.rows[0].result == "True") {
                                changeDept($('#cxDept').combobox('getValue'));
                                $.messager.alert("提示", "提交成功！");
                            }
                        } catch (ex) {
                            $.messager.alert("提示", ex, 'error');
                        }
                    },
                    error: function () {
                        $.messager.alert("提示", "提交失败！", 'error');
                    }
                });
            }
        });
    } else if (m_FuncType == 'SP') {
        var info = '';
        var actinfo = ''; 
        var row = {};
        row.bg4_id = m_BillInfo.bg4_id;
        if (type == 'up') { 
            if ($("#spanbtnUp").html() == '审核') {
                row.bg4_upper1 = m_BillInfo.bg4_upper1;
                row.bg4_updt1 = m_BillInfo.bg4_updt1;
                row.bg4_upper2 = m_UserInfo.UserName;
                row.bg4_updt2 = dateUtil_dateFomaterB(new Date(), '-');
                row.bg4_state = '已审核'; 
                info = '确认审核“' + m_BillInfo.bg4_subject + '”吗？';
                actinfo = '审核';
            }
        } else if (type == 'dn') {
            row.bg4_upper1 = m_BillInfo.bg4_upper1;
            row.bg4_updt1 = m_BillInfo.bg4_updt1;
            row.bg4_upper2 = m_UserInfo.UserName;
            row.bg4_updt2 = dateUtil_dateFomaterB(new Date(), '-') + ' (驳回)';
            row.bg4_state = '未提交';
            info = '确认驳回“' + m_BillInfo.bg4_subject + '”吗？';
            actinfo = '驳回';
        }
        var curl = GetWSRRURL(peoa_GetWSRRURL(14));
        curl = curl + "&type=SetApH&actor=" + m_UserInfo.UserName + "&s=" + new Date().getTime();
        var rowInfo = [];
        rowInfo.push(row);
        var cXML = GetEditJson(rowInfo, [], []); //json转xml   
        var cxmlsJson = { XML: cXML };
        $.messager.confirm('确认框', info, function (r) {
            if (r) {
                $.ajax({
                    url: curl,
                    type: "POST",
                    async: false,
                    data: cxmlsJson,
                    dataType: "json",
                    success: function (result) {
                        try {
                            //alert(jsonUtil_jsonToStr(result));
                            if (result.Error) {
                                $.messager.alert("系统错误", result.Error, 'error');
                            } else if (result.rows[0].result == "False") {
                                $.messager.alert("提示", result.rows[0].message, 'error');
                            } else if (result.rows[0].result == "True") { 
                                alert(actinfo + "成功！"); 
                                parent.closeTab(m_BillInfo.bg4_subject);  //关闭当前选项卡，待办任务
                            }
                        } catch (ex) {
                            $.messager.alert("提示", ex, 'error');
                        }
                    },
                    error: function () {
                        $.messager.alert("提示", actinfo + "失败！", 'error');
                    }
                })
            }
        });
    }

}


/*******************
 * 获取列表高度
 */
function getcurheight() {
    return;
    var htjcxk = document.getElementById("tjcxk").style.height.replace('px', '');
    var curheight = parent.getTabsHeight() * 1 - htjcxk * 1 + 80;
    return curheight;
}

