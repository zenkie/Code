﻿/// JS名：DeliveryPlan.js
/// 说明：到货计划
/// 创建人：俞佳伟 
/// 创建日期：2015-01-20

var m_divi = ""; //事业体
var m_rowIndexPO = undefined; //记录编辑行索引
var m_rowIndexAP = undefined; //记录编辑行索引

$(function () {
    m_divi = $.cookie("compName");

    var url = GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson("", 'GETAPOHEAD') + "&WHERE=" + " AP1_DIVI = '" + m_divi + "'";
    InitGird_APO_Head(url);
});

//主页到货计划主表数据加载
function InitGird_APO_Head(url) {
    $('#APOHeadList').datagrid({
        url: url,
        striped: true, //True 奇偶行使用不同背景色
        singleSelect: true, //单行选择
        fit: true,
        pagination: true, //是否开启分页
        pageSize: 20, //默认一页数据条数 
        rownumbers: true,
        onSelect: onClickRow,
        columns: [[
            { field: "ap1_apcode", title: "到货计划编号" },
            { field: "ap1_po1_purchasecode", title: "采购单编号" },
            { field: "ap1_hstate", title: "最高状态" },
            { field: "ap1_lstate", title: "最低状态" },
            { field: "po1_pznumber", title: "采购总数" },
            { field: "rp2_number_total", title: "已入库总数" },
            { field: "ap1_aplannumber", title: "到货计划总数" },
            { field: "po1_rguser", title: "采购人" },
            { field: "po1_rgdt", title: "采购时间" },
            { field: "ap1_rguser", title: "创建人" },
            { field: "ap1_rgdt", title: "创建时间" },
            { field: "ap1_lmuser", title: "更新人" },
            { field: "ap1_lmdt", title: "更新时间" },
        ]],
        toolbar: [
                {
                    id: 'btn_Add',
                    text: '新增',
                    iconCls: 'icon-add',
                    handler: function () {
                        //新增 

                        //ShowPOGoods('Add');
                        $('#winEditAPO').window('open');
                        $('#txtpo1_pocode').val("");
                        $('#txtap1_apcode').val("");
                        $('#APOdate').datebox('setValue', '');
                        $('#APOdate').datebox('enable');
                        $('#txtpo1_pocode').removeAttr('disabled');
                        ClearGrid('#tabGoodList');

                        var data = [];
                        data[data.length] = { "name": "txtdate", "value": '' };
                        var url = GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson(data, 'GETPODDETAIL') + "&WHERE=1=10000";
                        InitGrid_GoodList(url);
                    }
                },
                '-',
                {
                    id: 'btn_Edit',
                    text: '修改',
                    iconCls: 'icon-edit',
                    handler: function () {
                        //修改
                        btnEditAP2_APODetail();
                    }
                }
        ]
    });
}

//主页到货计划子表数据加载
function InitGird_APO_Detail(url) {
    $('#APODetailList').datagrid({
        url: url,
        striped: true, //True 奇偶行使用不同背景色
        singleSelect: true, //单行选择
        fit: true,
        rownumbers: true,
        columns: [[
                { field: 'ap2_linumber', title: '项次', width: 40 },
                { field: 'ap2_lsnumber', title: '子项次', width: 90 },
                { field: 'po2_pd1_supperierstyle', title: '供应商款号', width: 80 },
                { field: 'po2_pd1_supperiercolor', title: '供应商颜色', width: 80 },
                { field: 'po2_pd1_supperiersize', title: '供应商尺码', width: 80 },
                { field: 'po2_pd1_productcode', title: 'SKU' },
                { field: 'po2_number', title: '采购数量', width: 80 },
                { field: 'rpnumbersums', title: '已入库数量', width: 100 },
                { field: 'aplannumbersums', title: '已生成计划数量', width: 100 },
                { field: 'differences', title: '数量差异', width: 100 },
                { field: 'ap2_aplannumber', title: '本次计划到货数', width: 100, editor: { type: 'validatebox', options: { required: true } } },
                { field: 'ap1_aplandt', title: '本次计划到货日期', width: 100, formatter: Formater.date },
                { field: 'ap1_rguser', title: '更新人', width: 100 },
                { field: 'ap1_rgdt', title: '更新时间', width: 120 },
        ]]
        //,
        //toolbar: [
        //    {
        //        text: '新增明细',
        //        iconCls: 'icon-add',
        //        handler: function () {
        //            //新增到货计划明细
        //            var getHeadRow = $('#APOHeadList').datagrid('getSelected');
        //            if (getHeadRow.ap1_apcode == '') {
        //                $.messager.alert('请先选中需要添加到货计划明细的到货计划单');
        //                return false;
        //            }
        //            $('#winEditAPO').window('open');
        //            $('#txtpo1_pocode').val(getHeadRow.ap1_po1_purchasecode);
        //            $('#txtap1_apcode').val(getHeadRow.ap1_apcode);
        //            $('#APOdate').datebox('setValue', DateParser(getHeadRow.ap1_aplandt));
        //            $('#APOdate').datebox('disable');
        //            $('#txtpo1_pocode').attr('disable', 'disable');
        //            $('#txtap1_apcode').attr('disable', 'disable');

        //            var data = [];
        //            //data[data.length] = { "name": "txtpurchasecode", "value": getHeadRow.ap1_po1_purchasecode };
        //            data[data.length] = { "name": "txtdivi", "value": m_divi };
        //            data[data.length] = { "name": "txtdate", "value": DateParser(getHeadRow.ap1_aplandt) };

        //            var url = GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson(data, 'GETPODDETAIL') + "&WHERE=" + " PO2_POCode = '" + getHeadRow.ap1_po1_purchasecode + "' AND PO2_DIVI='" + m_divi + "' AND PO2_State='35'";
        //            InitGrid_GoodList(url);
        //        }
        //    }
        //]

    });
}

//加载需要做到货计划的采购单子表数据
function InitGrid_GoodList(url) {
    $('#tabGoodList').datagrid({
        url: url,
        striped: true, //True 奇偶行使用不同背景色
        fit: true,
        rownumbers: true,
        onClickRow: onClickRowPO, //单击行 进入编辑模式
        columns: [[
            { field: 'ck', checkbox: true, width: 15 },
            //{ field: "ap1_apcode", title: "序号" },
            { field: "po2_state", title: "状态", width: 35 },
            { field: "po2_pd1_supperierstyle", title: "供应商款号", width: 100 },
            { field: "po2_pd1_supperiercolor", title: "供应商颜色/简", width: 80 },
            { field: "po2_pd1_supperiersize", title: "供应商尺码", width: 70 },
            { field: "po2_pd1_productcode", title: "SKU" },
            { field: "po2_dcurrencyprice", title: "采购价", width: 80 },
            { field: "po2_number", title: "采购数量" },
            { field: "total", title: "已做到货计划数量" },
            { field: "ap1_aplannumber", title: "本次计划到货数量", width: 120, editor: { type: 'numberbox' }, required: true },
            { field: "ap1_aplandt", title: "本次计划到货日期", width: 120, editor: { type: 'datebox', options: { formatter: DateFormatter, parser: DateParser } }, required: true }
        ]],
        toolbar: [
            {
                id: 'btn_AddAP',
                text: '生成到货计划',
                iconCls: 'icon-add',
                handler: function () {
                    //选中采购单中的采购明细，生成到货计划
                    //btnAddAP();
                    AddAPODetail();
                }
            }
        ],
        onLoadSuccess: function (data) {
            if (data.rows[0].po2_pocode == "") {
                ClearGrid('#tabGoodList');
            }
        }
    });
}

//单击选中到货计划表中的一行数据时触发事件(根据到货计划编号加载到货计划子表)
function onClickRow(RowIndex, RowData) {
    var purchasecode = RowData.ap1_po1_purchasecode;
    var ap2_apcode = RowData.ap1_apcode;
    var data = [];
    data[data.length] = { "name": "txtpurchasecode", "value": purchasecode };
    data[data.length] = { "name": "txtdivi", "value": m_divi };
    var url = GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson(data, 'GETAPOLIST') + "&WHERE=" + " PO2_POCode = '"
        + purchasecode + "' AND AP2_APCode='" + ap2_apcode + "'";
    InitGird_APO_Detail(url);
}

//采购单表中的商品信息窗口
function ShowPOGoods(type) {
    $('#winEditAPO').window('open');
    if (type == "Add") {
        $('#txtpo1_pocode').val("");
        $('#txtap1_apcode').val("");
        $('#txtpo1_pocode').attr('disable', false);
        ClearGrid('#tabGoodList');
        //$('#txtpo1_pocode').val("");
        //$('#APOdate').datebox('setValue', '');

    }
    if (type == "Edit") {
        var pocode = $('#txtpo1_pocode_add').val();
        $('#txtpo1_pocode').val(pocode);
        var apcode = $('#txtap1_apcode_add').val();
        $('#txtap1_apcode').val(apcode);
        $('#txtpo1_pocode').attr('disabled', true);
        $('#txtap1_apcode').attr('disabled', true);
        $('#APOdate').datebox('setValue', '');
    }

    if (type == "Add") {
        $('#btn_EditApp').hide();
        $('#btn_AddAP').show();
    }
    if (type == "Edit") {
        $('#btn_EditApp').show();
        $('#btn_AddAP').hide();

    }
}

//新增到货计划时 输入采购单号 显示采购明细
function btnPO2_PODetailList() {
    var PodCode = $('#txtpo1_pocode').val();
    var date = $('#APOdate').datebox('getValue');
    if (date == '' || date == undefined || PodCode == '' || PodCode == undefined) {
        alert('请填写到货计划日期、采购单号');
        return false;
    }
    if (PodCode != "" || PodCode != undefined) {
        var data = [];
        data[data.length] = { "name": "txtpurchasecode", "value": PodCode };
        data[data.length] = { "name": "txtdivi", "value": m_divi };
        data[data.length] = { "name": "txtdate", "value": date };

        var url = GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson(data, 'GETPODDETAIL') + "&WHERE=" + " PO2_POCode = '" + PodCode + "' AND PO2_DIVI='" + m_divi + "' AND PO2_State='35'";
        InitGrid_GoodList(url);
    }
    else {
        alert('请输入采购单号');
    }

}

//主界面修改到货计划表
function btnEditAP2_APODetail() {
    var PurchaseCode = $('#APOHeadList').datagrid('getSelected').ap1_po1_purchasecode;  //采购单号
    var apcode = $('#APOHeadList').datagrid('getSelected').ap1_apcode; //到货计划编号
    var planDate = $('#APOHeadList').datagrid('getSelected').ap1_aplandt; //到货计划日期

    if (PurchaseCode == "" || PurchaseCode == undefined) {
        alert('请选择需要修改的数据');
    }
    else {
        //ShowAPOHeadWin();
        $('#winAddAPO').window('open');
        $('#txtap1_apcode_add').val(apcode);
        $('#txtpo1_pocode_add').val(PurchaseCode);
        $('#txtap1_aplandt_add').datebox('setValue', DateParser(planDate));
        var data = [];
        data[data.length] = { "name": "txtpurchasecode", "value": PurchaseCode };
        data[data.length] = { "name": "txtdivi", "value": m_divi };
        var url = GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson(data, 'GETAPOLIST') + "&WHERE=" + " AP2_APCode = '" + apcode + "'";
        InitGrid_AP2_APODetail(url);
    }
}


//加载采购单 到货计划
function InitGrid_AP2_APODetail(url) {
    $('#tabAddAPOdetail').datagrid({
        url: url,
        striped: true, //True 奇偶行使用不同背景色
        singleSelect: true, //单行选择
        fit: true,
        rownumbers: true,
        onClickRow: onClickRowAP, //单击行进入编辑模式
        columns: [[
            { field: 'ck', checkbox: true, width: 15 },
            { field: "ap2_apcode", title: "到货计划编号" },
            { field: "po2_state", title: "状态", width: 35 },
            { field: "po2_pd1_supperierstyle", title: "供应商款号", width: 120 },
            { field: "po2_pd1_supperiercolor", title: "供应商颜色", width: 80 },
            { field: "po2_pd1_supperiersize", title: "供应商尺码", width: 80 },
            { field: "po2_ocurrencyprice", title: "原币采购价", width: 100 },
            { field: "po2_dcurrencyprice", title: "本币采购价", width: 100 },
            { field: "po2_Number", title: "采购数量", width: 50 },
            { field: "aplannumbersums", title: "已生成到货计划数量", width: 120 },
            { field: "ap2_aplannumber", title: "本次计划到货数量", width: 120, editor: { type: 'numberbox' } },
            { field: "ap1_aplandt", title: "本次计划到货日期", width: 120, editor: { type: 'datebox', options: { formatter: DateFormatter, parser: DateParser } } },
            { field: "ap1_rguser", title: "创建人", editor: true, width: 40 },
            { field: "ap1_rgdt", title: "创建时间", editor: true, width: 100 },
        ]],
        toolbar: [
                {
                    id: 'btn_Add',
                    text: '新增',
                    iconCls: 'icon-add',
                    handler: function () {
                        $('#winEditAPO').window('open');

                        var pocode = $('#txtpo1_pocode_add').val();
                        $('#txtpo1_pocode').val(pocode);
                        $('#txtpo1_pocode').attr('disabled', true);

                        var apcode = $('#txtap1_apcode_add').val();
                        $('#txtap1_apcode').val(apcode);

                        var planDate = $('#txtap1_aplandt_add').datebox('getValue'); //到货计划日期
                        $('#APOdate').datebox('setValue', planDate);
                        $('#APOdate').datebox('disable');

                        btnPO2_PODetailList();
                    }
                },
                '-',
                {
                    id: 'btn_Delete',
                    text: '删除',
                    iconCls: 'icon-remove',
                    handler: function () {
                        //删除
                        $.messager.confirm('提示框', '确认删除？', function (r) {
                            if (r) {
                                DeleteAPDetail();
                            }
                        });
                    }
                },
                '-',
                {
                    id: 'btn_Edit',
                    text: '确认修改',
                    iconCls: 'icon-edit',
                    handler: function () {
                        UpdateAPDetail();
                    }
                }
        ],
        onLoadSuccess: function (data) {
            if (data.rows[0].ap2_id == "") {
                ClearGrid('#tabAddAPOdetail');
            }
        }
    });
}

//主页查询 筛选
function btnSearch() {
    var strWhere = "";
    var pocode = $('#txtpo1_pocode_srh').val();
    var apcode = $('#txtap1_apcode_srh').val();
    var user = $('#txtap1_rguser').val();
    if (pocode != undefined && pocode != "") {
        strWhere = strWhere + " and AP1_PO1_PurchaseCode='" + pocode + "'";
    }
    if (apcode != undefined && apcode != "") {
        strWhere = strWhere + " and AP1_APCode='" + apcode + "'";
    }
    if (user != undefined && user != "") {
        strWhere = strWhere + " and PO1_RgUser='" + user + "'";
    }
    var url = GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson("", 'GETAPOHEAD') + "&WHERE=" + " AP1_DIVI = '" + m_divi + "'" + strWhere;
    InitGird_APO_Head(url);
}


//单击行进入采购单子表编辑模式
function onClickRowPO(index, row) {
    if (m_rowIndexPO != index) {
        $('#tabGoodList').datagrid('endEdit', m_rowIndexPO);
    }
    m_rowIndexPO = index;
    $('#tabGoodList').datagrid('beginEdit', index);
}

function onClickRowAP(index, row) {
    if (m_rowIndexAP != index) {
        $('#tabAddAPOdetail').datagrid('endEdit', m_rowIndexAP);
    }
    if (row.rpnumbersums == 0 && row.po2_state <= 35) {  //rpnumbersums==0 表示没有收货，可以编辑到货数量和日期
        m_rowIndexAP = index;
        $('#tabAddAPOdetail').datagrid('beginEdit', index);
    }
    //else {
    //    alert('此状态下不能修改');
    //}
}


//删除到货计划 子表
function DeleteAPDetail() {
    var dltRow = $('#tabAddAPOdetail').datagrid('getChecked');
    if (dltRow.length == 0) {
        alert('选择需要删除的行');
        return false;
    }
    for (var i = 0; i < dltRow.length; i++) {
        if (dltRow[i].rpnumbersums > 0 || dltRow[i].po2_state > 35) {
            alert('已有收货记录,不允许删除');
            return false;
        }
    }

    var deleteJSON = GetEditJson(null, null, dltRow);
    var data = [];
    data[data.length] = { "name": "txtapo", "value": deleteJSON, "specialCharset": true };
    data[data.length] = { "name": "txtdivi", "value": m_divi };
    var XMLData = GetFormJson(data, 'APO');
    $.messager.progress({ title: '请稍后', msg: '处理中' });
    $.ajax({
        url: GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850'),
        type: 'post',
        async: true, //异步,
        data: { "XML": XMLData },
        success: function (result) {
            try {
                var result = eval("[" + result + "]");
                if (result[0].Error) {
                    $.messager.progress('close');
                    $.messager.alert("系统错误", result[0].Error, 'error');
                } else if (result[0].rows[0].result == "False") {
                    $.messager.progress('close');
                    $.messager.alert("提示", result[0].rows[0].message, 'error');
                }
                else {
                    $.messager.progress('close');
                    $('#APOHeadList').datagrid("reload"); //重载到货计划主表
                    $('#APODetailList').datagrid("reload"); //重载到货计划明细
                    alert('成功删除!');
                }
            } catch (ex) {
                $.messager.progress('close');
                $.messager.alert("提示", ex, 'error');
            }
        },
        error: function () {
            $.messager.alert("提示", "提交错误了！", 'error');
        }
    });

    $('#tabAddAPOdetail').datagrid('reload');
}

//添加到货计划子表数据
function AddAPODetail() {
    var date = $('#APOdate').datebox('getValue');
    var getAddRows = $('#tabGoodList').datagrid('getChecked');
    var pocode = $('#txtpo1_pocode').val();
    for (var i = 0; i < getAddRows.length; i++) {
        var index = $('#tabGoodList').datagrid('getRowIndex', getAddRows[i]);
        $('#tabGoodList').datagrid('endEdit', index);
        if (getAddRows[i].ap1_aplannumber == '' || getAddRows[i].ap1_aplannumber <= 0) {
            alert(getAddRows[i].po2_pd1_productcode + '本次计划到货数量不能为空或小于等于0');
            return false;
        }
        if (getAddRows[i].ap1_aplandt == '') {
            alert(getAddRows[i].ap1_aplandt + '本次计划到货日期不能为空');
            return false;
        }
        if (getAddRows[i].total * 1 + getAddRows[i].ap1_aplannumber * 1 > getAddRows[i].po2_number * 1) {
            alert('不能超过采购数量');
            return false;
        }
        var txtAPCode = $('#txtap1_apcode').val();
        getAddRows[i].ap1_apcode = txtAPCode;
        getAddRows[i].aplandt = date;
        getAddRows[i].ap1_po1_purchasecode = pocode;
    }
    var XMLData = GetGetJson(getAddRows, 'EditAPODetail');
    $.messager.progress({ title: '请稍后', msg: '处理中' });
    //return;
    $.ajax({
        url: GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850'),
        type: 'post',
        async: true, //异步,
        data: { "XML": XMLData },
        success: function (result) {
            try {
                var result = eval("[" + result + "]");

                if (result[0].Error) {
                    $.messager.progress('close');
                    $.messager.alert("系统错误", result[0].Error, 'error');
                } else if (result[0].rows[0].result == "False") {
                    $.messager.progress('close');
                    $.messager.alert("提示", result[0].rows[0].message, 'error');
                }
                else {
                    $.messager.progress('close');
                    $.messager.alert("提示", result[0].rows[0].message);
                    $('#winAddAPO').window('close');
                    $('#winEditAPO').window('close');
                    $('#APOHeadList').datagrid('reload');

                }
            } catch (ex) {
                $.messager.progress('close');
                $.messager.alert("提示", ex, 'error');
            }
        },
        error: function () {
            $.messager.alert("提示", "提交错误了！", 'error');
        }
    });
}

//修改到货计划 子表
function UpdateAPDetail() {
    $('#tabAddAPOdetail').datagrid('endEdit', m_rowIndexAP);
    var updateRow = $('#tabAddAPOdetail').datagrid('getChanges', 'updated');
    if (updateRow.length < 1) {
        alert('没有需要修改的行');
        return false;
    }
    else {
        for (var i = 0; i < updateRow.length ; i++) {
            if (updateRow[i].po2_number < updateRow[i].aplannumbersums * 1 + updateRow[i].ap2_aplannumber * 1) {
                alert('不能超过采购数量');
                return false;
            }
        }
        var updateJSON = GetEditJson(null, updateRow, null);
        var data = [];
        data[data.length] = { "name": "txtapo", "value": updateJSON, "specialCharset": true };
        data[data.length] = { "name": "txtdivi", "value": m_divi };
        var XMLData = GetFormJson(data, 'APO');
        $.messager.progress({ title: '请稍后', msg: '处理中' });
        $.ajax({
            url: GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850'),
            type: 'post',
            async: true, //异步,
            data: { "XML": XMLData },
            success: function (result) {
                try {
                    var result = eval("[" + result + "]");

                    if (result[0].Error) {
                        $.messager.progress('close');
                        $.messager.alert("系统错误", result[0].Error, 'error');
                    } else if (result[0].rows[0].result == "False") {
                        $.messager.progress('close');
                        $.messager.alert("提示", result[0].rows[0].message, 'error');
                    }
                    else {
                        $.messager.progress('close');
                        $('#APOHeadList').datagrid("reload"); //重载到货计划主表
                        $('#APODetailList').datagrid("reload"); //重载到货计划明细
                    }
                } catch (ex) {
                    $.messager.progress('close');
                    $.messager.alert("提示", ex, 'error');
                }
            },
            error: function () {
                $.messager.alert("提示", "提交错误了！", 'error');
            }
        });

    }
    $('#tabAddAPOdetail').datagrid('reload');

}

//日期控件DateBox的格式化函数（2015-01-20）
function DateFormatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
//日期格式解析
function DateParser(s) {
    if (!s) return new Date();
    var ss = (s.split('/'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return y + '-' + m + '-' + d;
    } else {
        return new Date();
    }
    //var yy = date.getFullYear();
    //var mm = date.getMonth() + 1;
    //if (mm < 10) { mm = '0' + mm };
    //var dd = date.getDate();
    //if (dd < 10) { dd = '0' + dd };
    //return yy + '-' + mm + '-' + dd;
}

