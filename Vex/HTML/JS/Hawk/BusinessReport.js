﻿
var m_divi = $.cookie("compName"); //登录环境
var m_url = '';

//初始化
$(function () {

    //初始化供应商
    $('#txtsp1_supplier').combogrid({
        panelWidth: 200,
        url: GetWSRRURL('ffda947c-e49f-4106-982a-dbda0664b282') + "&XML=" + GetFormJson('', 'SupplierInfo') + "&Where=SP1_State='20'",
        idField: 'sp1_suppliercode',
        textField: 'sp1_name',
        mode: 'remote',
        columns: [[
                { field: 'sp1_suppliercode', title: '供应商编号', width: 80 },
                { field: 'sp1_name', title: '供应商简称', width: 80 }
        ]]
    });

    //初始化品牌
    $('#txtbrand').combogrid({
        panelWidth: 180,
        url: GetWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124') + "&XML=" + GetFormJson('', 'GETBRAND') + "&Where=BR1_State='20'",
        idField: 'br1_brandcode',
        textField: 'br1_name',
        mode: 'remote',
        columns: [[
                { field: 'br1_brandcode', title: '品牌编号', width: 80 },
                { field: 'br1_name', title: '品牌简称', width: 80 }
        ]]
    });

    //加载业务报表数据
    // InitGrid('');//GetWSRRURL('e0dbebb3-df55-486a-9316-9b1ca5f309be') + "&XML=" + GetFormJson('', 'GetBusinessReport') + "&Where=PO1_DIVI='" + m_divi + "'";   
});

//加载业务数据
function InitGrid() {
    $('#tabBusiness').datagrid({
        striped: true,
        singleSelect: true,
        pagination: true, //是否开启分页
        pageSize: 20, //默认一页数据条数 
        rownumbers: true,
        loadMsg: '数据努力加载中...',
        fit: true,
        columns: [[
            { field: 'suppliercode', title: '供应商编号' },
            { field: 'suppliername', title: '供应商名称' },
            { field: 'supperierstyle', title: '供应商款号' },
            { field: 'supperiercolor', title: '供应商颜色' },
            { field: 'supperiersize', title: '供应商尺码' },
            { field: 'brandname', title: '品牌名称' },
            { field: 'pocode', title: '采购单号' },
            { field: 'po2_liseq', title: '项次', sortable: true },
            { field: 'po2_lsseq', title: '子项次' },
            { field: 'sku', title: 'SKU', sortable: true },
            { field: 'pznumber', title: '采购数量' },
            { field: 'currency', title: '币种' },
            { field: 'ocurrencyamount', title: '采购金额' },
            { field: 'paymenttypename', title: '付款方式' },
            { field: 'apcode', title: '到货计划单号' },
            { field: 'aplannumber', title: '到货计划数量' },
            { field: 'apamount', title: '到货计划金额' },
            { field: 'rpdate', title: '入库日期', formatter: function (date) { if (date != '') { var myDate = date.split(' ')[0]; return myDate } else { return date } } },
            { field: 'rpnumber', title: '收货数量' },
            { field: 'rptotalamount', title: '收货金额' },
            //{ field: 'mvldate', title: '异动日期' },
            { field: 'mvlnumber', title: '异动数量' },
            { field: 'mvlamount', title: '异动金额' },
            //{ field: 'rtdate', title: '退货日期' },
            { field: 'rtpznumber', title: '退货数量' },
            { field: 'rtocurrencysums', title: '退货金额' }
        ]],
        onBeforeLoad: function (param) {
            var txtpo1_pocode = $('#txtpo1_pocode').val();  //采购单号
            var txtapcode = $('#txtAPCode').val(); //到货计划单号
            var txtsp1_supplier = $('#txtsp1_supplier').combobox('getValue'); //供应商
            var txtSKU = $('#txtSKU').val(); //sku
            var txtDateBegin = $('#txtDateBegin').datebox('getValue'); //入库开始日期
            var txtDateEnd = $('#txtDateEnd').datebox('getValue'); //入库结束日期
            var txtBrand = $('#txtbrand').combogrid('getValue'); //品牌               

            var data = [];
            data[data.length] = { "name": "txt模块", "value": "POPaymentTrackReport" };
            data[data.length] = { "name": "txt操作类型", "value": "GETBESINESS" };
            data[data.length] = { "name": "txtDIVI", "value": m_divi };
            data[data.length] = { "name": "txtCONO", "value": "HYFG" };
            data[data.length] = { "name": "txt采购编号", "value": txtpo1_pocode };
            data[data.length] = { "name": "txt品牌", "value": txtBrand };
            data[data.length] = { "name": "txt到货计划编号", "value": txtapcode };
            data[data.length] = { "name": "txtSKU", "value": txtSKU };
            data[data.length] = { "name": "txt供应商编号", "value": txtsp1_supplier };
            data[data.length] = { "name": "txt入库日期起", "value": txtDateBegin };
            data[data.length] = { "name": "txt入库日期止", "value": txtDateEnd };
            data[data.length] = { "name": "txt是否分页", "value": "1" };
            data[data.length] = { "name": "txt排序字段", "value": "po2_liseq" };
            data[data.length] = { "name": "txt每页数量", "value": param.rows };
            data[data.length] = { "name": "txt返回页码", "value": param.page };

            var xmlData = GetDBFrameAML(data);//组成调用APIxml
            var url = GetWSRRURL('d4fe08ef-9fc8-46f8-96cb-1ac4ef260b05') + xmlData;
            m_url = url;
            $('#tabBusiness').datagrid('options').url = url;
        },
        toolbar: [
            {
                text: '查看供应商资金池',
                iconCls: 'icon-search',
                handler: function () {
                    searchSupplierPoolTrans();
                }
            },
            '-',
            {
                text: '全部导出',
                iconCls: 'icon-print',
                handler: function () {
                    //导出
                    excelExport();
                }
            }
        ],
        onLoadSuccess: function (data) {
            if (data.rows.length == 1 && data.rows[0].pocode == "") {
                ClearGrid("#tabBusiness");
                $.messager.alert("提示", "无相关数据!");
            }
            if (data.rows == null || data.rows.length == 0) {
                data.total = 0;
            }
            else {
                data.total = data.rows[0].count_num;
            }
        }
    });
}

//加载供应商资金往来明细
function InitGrid_Supplier(url) {
    $('#tabSupplierList').datagrid({
        url: url,
        striped: true,
        singleSelect: true,
        pagination: true, //是否开启分页
        pageSize: 20, //默认一页数据条数 
        rownumbers: true,
        sortName: 'sp3_rgdt',
        sortOrder: 'desc',
        fit: true,
        columns: [[
            { field: 'sp3_rgdt', title: '交易日期', width: 150 },
            { field: 'sp3_reftype', title: '交易类型', width: 100 },
            { field: 'sp3_currency', title: '币种', width: 100 },
            //{ field: '', title: '期初金额' },
            { field: 'sp3_transamount', title: '交易金额', width: 100 },
            { field: 'sp3_surplusamount', title: '期末金额', width: 100 }
            //{ field: 'sp3_seq', title: '交易单据号' }
        ]]
    });
}


//查看供应商资金池
function searchSupplierPoolTrans() {
    var getRows = $('#tabBusiness').datagrid('getSelected');
    if (getRows.suppliercode != '') {
        $('#winSupplier').window('open');
        //初始化供应商资金池界面查询条件
        $('#txtsp3_suppliercode').val(getRows.suppliercode);
        $('#txtsp3_suppliername').val(getRows.suppliername);

        //初始化币种
        $('#txtcurrency').combobox({
            url: GetComboxWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124', "", "CT1_OptionsValues", "CT1_Options") +
                "&pagerows=20000&XML=" + GetFormJson([{ "name": "txtzt", "value": m_divi }], 'GET') + "&Where=CT1_Code='" + "CUCD" + "' AND CT1_State='20'",
            panelHeight: '120',
            valueField: 'id',
            textField: 'text',
            required: true
        });


    }
    else {
        alert('请选择行');
    }
}

//查看供应商资金池界面  查询按钮事件
function btnSearch() {
    var SupplierCode = $('#txtsp3_suppliercode').val();
    var SupplierName = $('#txtsp3_suppliername').val();
    var Currency = $('#txtcurrency').combobox('getValue');
    var bDate = $('#beginDate').datebox('getText');
    var eDate = $('#endDate').datebox('getText');
    var Where = '';

    if (SupplierCode == '' || SupplierName == '') {
        $.messager.alert('提示', '供应商编号不能为空', 'warning');
        return;
    }
    if (Currency == '') {
        $.messager.alert('提示', '币种不能为空', 'warning');
        return;
    }

    //查询供应商资金余额
    var data = [];
    data[data.length] = { "name": "txtDIVI", "value": m_divi };
    data[data.length] = { "name": "txtSupplierCode", "value": SupplierCode };
    data[data.length] = { "name": "txtCurrency", "value": Currency };
    //data[data.length] = { "name": "txtBeginDate", "value": bDate };
    //data[data.length] = { "name": "txtEndDate", "value": eDate };
    var url = GetWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124') + "&XML=" + GetFormJson(data, 'GetSupplierPool');
    var htmlobj = $.ajax({
        url: url,
        type: 'post',
        async: false
    });
    var result = $.parseJSON(htmlobj.responseText);
    $('#txtsp3_surplusamount').val(result.rows[0].sp2_poolamount);

    //供应商交易记录表
    var url = GetWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124') + "&XML=" + GetFormJson([{ "name": "txtBeginDate", "value": bDate }, { "name": "txtEndDate", "value": eDate }], 'GetSupplierPoolTrans') +
        "&Where=SP3_DIVI='" + m_divi + "' AND SP3_SP1_SupplierCode='" + SupplierCode + "' AND SP3_Currency='" + Currency + "'";
    InitGrid_Supplier(url);
}

//查询业务报表数据
//function searchBusinessData() {

//    InitGrid();
//}

//取消按钮事件
function Cancel() {
    $('#txtpo1_pocode').val('');
    $('#txtAPCode').val('');
    $('#txtsp1_supplier').combobox('clear');
    $('#txtSKU').val('');
    $('#txtDateBegin').datebox('clear');
    $('#txtDateEnd').datebox('clear');
}

//导出
function excelExport() {

    var listData = $('#tabBusiness').datagrid('getRows');

    if (listData.length <= 1 || listData == undefined) {
        alert("请先加载数据");
        return;
    }

    EasyUI_DataGrid_ExcelExport1($('#tabBusiness'), $('#tabBusiness'));

}

//导出Exel主函数
function EasyUI_DataGrid_ExcelExport1(pgrid, pagination) {
    var btnExcel = null;
    pagination.find('a.l-btn').each(function () {
        if ($(this).find('span.icon-excel').length) {
            btnExcel = $(this);
            btnExcel.linkbutton('disable');
            btnExcel.linkbutton({ iconCls: "pagination-loading" });

        }
    });

    var dataOptions = pgrid.datagrid("options");
    var dataColumns = dataOptions.columns;
    var dataColumnsFrozen = dataOptions.frozenColumns;
    var dataParam = dataOptions.queryParams;
    //var pageSize = dataOptions.pageSize;
    //var pageNumber = dataOptions.pageNumber;

    var txtpo1_pocode = $('#txtpo1_pocode').val();  //采购单号
    var txtapcode = $('#txtAPCode').val(); //到货计划单号
    var txtsp1_supplier = $('#txtsp1_supplier').combobox('getValue'); //供应商
    var txtSKU = $('#txtSKU').val(); //sku
    var txtDateBegin = $('#txtDateBegin').datebox('getValue'); //入库开始日期
    var txtDateEnd = $('#txtDateEnd').datebox('getValue'); //入库结束日期
    var txtBrand = $('#txtbrand').combogrid('getValue'); //品牌               

    var data = [];
    data[data.length] = { "name": "txt模块", "value": "POPaymentTrackReport" };
    data[data.length] = { "name": "txt操作类型", "value": "GETBESINESS" };
    data[data.length] = { "name": "txtDIVI", "value": m_divi };
    data[data.length] = { "name": "txtCONO", "value": "HYFG" };
    data[data.length] = { "name": "txt采购编号", "value": txtpo1_pocode };
    data[data.length] = { "name": "txt品牌", "value": txtBrand };
    data[data.length] = { "name": "txt到货计划编号", "value": txtapcode };
    data[data.length] = { "name": "txtSKU", "value": txtSKU };
    data[data.length] = { "name": "txt供应商编号", "value": txtsp1_supplier };
    data[data.length] = { "name": "txt入库日期起", "value": txtDateBegin };
    data[data.length] = { "name": "txt入库日期止", "value": txtDateEnd };
    data[data.length] = { "name": "txt是否分页", "value": "0" };
    data[data.length] = { "name": "txt排序字段", "value": "" };
    data[data.length] = { "name": "txt每页数量", "value": "" };
    data[data.length] = { "name": "txt返回页码", "value": "" };

    var xmlData = GetDBFrameAML(data);//组成调用APIxml
    var strUrl = GetWSRRURL('d4fe08ef-9fc8-46f8-96cb-1ac4ef260b05') + xmlData;
    var title = "业务报表";

    var strXMLCol = "<Root><List>";

    if (dataColumnsFrozen != null && dataColumnsFrozen.length > 0) {
        for (var i = 0; i < dataColumnsFrozen[0].length; i++) {

            if (dataColumnsFrozen[0][i].checkbox == true) {
                continue;
            }

            strXMLCol += "<Rows>";
            strXMLCol += "<field>" + dataColumnsFrozen[0][i].field + "</field>";

            if (dataColumnsFrozen[0][i].title) {
                strXMLCol += "<title>" + dataColumnsFrozen[0][i].title + "</title>";
            }
            else {
                strXMLCol += "<title>" + dataColumnsFrozen[0][i].field + "</title>";

            }
            if (dataColumnsFrozen[0][i].width) {
                strXMLCol += "<width>" + dataColumnsFrozen[0][i].width + "</width>";
            }
            else {
                strXMLCol += "<width></width>";

            }

            if (dataColumnsFrozen[0][i].hidden) {
                strXMLCol += "<hidden>true</hidden>";
            }
            else {
                strXMLCol += "<hidden>false</hidden>";
            }

            if (dataColumnsFrozen[0][i].formatDataType) {
                strXMLCol += "<formatDataType>" + dataColumnsFrozen[0][i].formatDataType + "</formatDataType>";
            }
            else {
                strXMLCol += "<formatDataType></formatDataType>";
            }
            strXMLCol += "</Rows>";
        }
    }
    if (dataColumns != null && dataColumns.length > 0) {
        for (var i = 0; i < dataColumns[0].length; i++) {

            if (dataColumns[0][i].checkbox == true) {
                continue;
            }

            strXMLCol += "<Rows>";
            strXMLCol += "<field>" + (dataColumns[0][i].field) + "</field>";

            if (dataColumns[0][i].title) {
                strXMLCol += "<title>" + (dataColumns[0][i].title) + "</title>";
            }
            else {
                strXMLCol += "<title>" + (dataColumns[0][i].field) + "</title>";

            }

            if (dataColumns[0][i].width) {
                strXMLCol += "<width>" + dataColumns[0][i].width + "</width>";
            }
            else {
                strXMLCol += "<width></width>";

            }

            if (dataColumns[0][i].hidden) {
                strXMLCol += "<hidden>true</hidden>";
            }
            else {
                strXMLCol += "<hidden>false</hidden>";
            }

            if (dataColumns[0][i].formatDataType) {
                strXMLCol += "<formatDataType>" + dataColumns[0][i].formatDataType + "</formatDataType>";
            }
            else {
                strXMLCol += "<formatDataType></formatDataType>";
            }
            strXMLCol += "</Rows>";
        }
    }

    strXMLCol += "</List></Root>";

    strXMLCol = strXMLCol.replace(/\(/g, "").replace(/\)/g, "");
    dataParam.ExcelExportColumns = strXMLCol;

    $.messager.confirm('提示框', "是否导出", function (e) {
        if (e) {
            $.messager.progress({ title: '请稍后', msg: '处理中' });

            $.ajax({
                url: strUrl + "&pagerows=0&pageNumber=1&ExcelExport=true&title=" + escape(title) + "&rd=" + Math.random(),
                data: dataParam,
                type: 'POST',
                options: "JSON",
                success: function (data) {
                    if (btnExcel != null) {
                        btnExcel.linkbutton('enable');

                        btnExcel.linkbutton({ iconCls: "icon-excel" });
                    }
                    if (eval("[" + data + "]")[0].Error) {
                        $.messager.alert("导出Excel出错了", eval("[" + data + "]")[0].Error, 'error');
                        return;
                    }
                    $.messager.progress('close');
                    var strFileName = eval("[" + data + "]")[0].FileName;
                    //strFileName = strFileName.substring(0, 29) + FileName.substring(4);
                    window.location.href = strFileName;
                },
                error: function (date) {
                    alert("错误!");
                    $.messager.progress('close');
                }

            });
            return false;
        }
    });
}