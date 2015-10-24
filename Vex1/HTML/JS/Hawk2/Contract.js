﻿/*
创建人：刘洪
创建时间：2015-01-05

*/

var m_RgUser;
var m_compName = $.cookie("compName");


//初始化各类信息
$(document).ready(function () {

    //初始化--付款--下拉框
    $('#cmbPC1_PaymentType').combobox({
        required: true,
        url: GetComboxWSRRURL('597aac46-2fc7-43e7-81a6-cddf9ba869b8', "", "CT1_KeyID", "CT1_KeyName") + "&XML=" + GetFormJson([{ "name": "txtzt", "value": m_compName }], 'GET') + "&Where=CT1_Code='" + "TEPY" + "'",
        type: 'post',
        editable: false,
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto'
    });

    //初始化--采购类型--下拉框
    $('#txtPC1_POTypeCode').combobox({
        required: true,
        url: GetComboxWSRRURL('597aac46-2fc7-43e7-81a6-cddf9ba869b8', "", "CT1_KeyID", "CT1_KeyName") + "&XML=" + GetFormJson([{ "name": "txtzt", "value": m_compName }], 'GET') + "&Where=CT1_Code='" + "ITCL" + "'",
        type: 'post',
        editable: false,
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto'
    });

    //初始化--结算币种--下拉框
    $('#cmbPC1_Currency').combobox({
        required: true,
        url: GetComboxWSRRURL('597aac46-2fc7-43e7-81a6-cddf9ba869b8', "", "CT1_KeyID", "CT1_KeyName") + "&XML=" + GetFormJson([{ "name": "txtzt", "value": m_compName }], 'GET') + "&Where=CT1_Code='" + "CUCD" + "'",
        type: 'post',
        editable: false,
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto'
    });

    //初始化--结算方式--下拉框
    $('#cmbPC1_PaymentChannel').combobox({
        required: true,
        url: GetComboxWSRRURL('597aac46-2fc7-43e7-81a6-cddf9ba869b8', "", "CT1_KeyID", "CT1_KeyName") + "&XML=" + GetFormJson([{ "name": "txtzt", "value": m_compName }], 'GET') + "&Where=CT1_Code='" + "PYTP" + "'",
        type: 'post',
        editable: false,
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto'
    });

    //初始化编辑窗口
    $('#winContractEdit')
    .window({
        width: 900,
        height: 400,
        title: '合同编辑',
        top: 80
    }).window('close');

    //初始化关联窗口
    $('#winPoWindow')
    .window({
        width: 900,
        height: 400,
        title: '关联窗口',
        top: 40
    }).window('close');

    //获取登陆名
    htmlobj = $.ajax({
        url: GetWSRRURL('UserName'),
        options: "JSON",
        async: false
    });
    var result = $.parseJSON(htmlobj.responseText);
    if (result.UserName != "") {
        m_RgUser = result.UserName;
    };

    //格式化日期样式:yyyy-mm-dd
    $.fn.datebox.defaults.formatter = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + m + '-' + d;
    };

    //按钮初始化--关联日期
    $('#datPO1_PlanDeliveryDateStart').datebox();
    $('#datPO1_PlanDeliveryDateEnd').datebox();
    
    //查询--清除
    $('#btnCancle')
    .linkbutton({ 
        iconCls: 'icon-undo',
        plain: true
    })
    .click(function (event) {
        $('#getCondition input').val('');
        event.stopPropagation();
    });

    //查询--查询
    $('#btnSearch').linkbutton({
        iconCls: 'icon-search',
        plain: true
    })
    .click(function (event) {
        searchData();
        event.stopPropagation();
    });

    //编辑--上传
    $('#btnUpload').linkbutton({
        iconCls: 'icon-search',
        plain: true
    });

    //编辑--保存
    $('#btnSave').linkbutton({
        iconCls: 'icon-save',
        plain: true
    });

    //编辑--取消
    $('#btnCancel1').linkbutton({
        iconCls: 'icon-undo',
        plain: true
    })
    .click(function (event) {
        $('#formWindow').form('clear');
        $('#winContractEdit').window('close');
        event.stopPropagation();        //防止事件冒泡
    });

    //编辑--开始/结束时间
    $('#datPC1_EffectDate').datebox();
    $('#datPC1_TerminationDate').datebox();
    //关联--查询
    $('#btnCoPoSearch').linkbutton({
        iconCls: 'icon-search',
        plain: true
    })
    .click(function (event) {
        CoPoSearch();
        event.stopPropagation();
    });

    //初始化非Ajax下拉框
    $('select').combobox({
        required: true,
        panelHeight: 'auto',
        editable: false
    });

    //合同采购单关联--取消
    $('#btnCancel2').linkbutton({        
        iconCls: 'icon-undo',
        plain: true
    })
    .click(function (event) {
        $('#fmPoWindow').form('clear');
        $('#datPO1_PlanDeliveryDateStart').datebox({
            required: false
        });
        $('#datPO1_PlanDeliveryDateEnd').datebox({
            required: false
        });
        event.stopPropagation();        //防止事件冒泡
    });

    //合同采购单关联
    $('#btnCoPoLink').linkbutton({
        iconCls: 'icon-arrow-in',
        plain: true
    })
     .click(function (event) {
         CoPoLink("yes");
         event.stopPropagation();
     });

    //取消合同关联
    $('#btnCoPounLink').linkbutton({
        iconCls: 'icon-arrow-out',
        plain: true
    })
    .click(function (event) {
        CoPoLink("no");
        event.stopPropagation();
    });

    //下载合同附件按钮
    $('#btnDownload').linkbutton({
        iconCls: 'icon-save',
        plain: true  
    })
    .click(function () {
        if ($('#txtPC1_FilePath').val() == "") {
            alert("服务器找不到文档,请重新上传");
            return;
        } else {
            //return  "<a href='" + $('#txtPC1_FilePath').val() + "' target='_blank'>下载</a>";
            var m_filepath = $('#txtPC1_FilePath').val();
            window.open(m_filepath, "download", "");
        }
    });

    //文件上传相关-----------------
    var button = $('#btnUpload'), interval;
    new AjaxUpload(button, {
        //action: 'upload-test.php',文件上传服务器端执行的地址
        action: '/Handler_Upload.ashx?filePath=Hawk_Contract',
        name: 'myfile',
        onSubmit: function (file, ext) {
            if (!(ext && /^(txt|doc|docx|pdf|PDF|xps)$/.test(ext))) {
                alert('文本格式不正确,请选择 doc,docx,pdf,xps 格式的文件!', '系统提示');
                return false;
            }
            // change button text, when user selects file
            button.val('文件上传中');
            // If you want to allow uploading only 1 file at time,
            // you can disable upload button
            this.disable();
            // Uploding -> Uploading. -> Uploading...
            interval = window.setInterval(function () {
                var text = button.val();
                if (text.length < 10) {
                    button.val(text + '.');
                } else {
                    button.val('文件上传中');
                }
            }, 200);
        },
        onComplete: function (file, response) {
            //file 本地文件名称，response 服务器端传回的信息
            button.val('上传');

            window.clearInterval(interval);

            // enable upload button
            this.enable();
            var k = response.replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "");

            try {
                var result = eval("[" + k + "]");
                if (result[0].Error) {
                    $.messager.progress('close');

                    $.messager.alert("系统错误", result[0].Error, 'error');
                }
                else if (result[0].rows[0].result == "False") {

                    $.messager.progress('close');

                    $.messager.alert("提示", result[0].rows[0].message, 'error');
                }
                else {
                    $("#txtPC1_FilePath").val(result[0].rows[0].message);
                }
            } catch (ex) {
                $.messager.progress('close');

                $.messager.alert("提示", ex, 'error');
            }
        }
    });
    //文件上传相关-----------------
    var compData = [{ "name": "txtPC1_CONO", "value": "HYFG" }, { "name": "txtPC1_DIVI", "value": m_compName }];

    var url = GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792') + "&XML=" + GetFormJson([], 'Get') + "&where=PC1_CONO='HYFG' AND PC1_DIVI='" + m_compName + "'";
    initGird(url);
});

//初始化DataGrid
function initGird(url) {
    $('#tab_list').datagrid({
        url: url,
        singleSelect: true,
        fit: true,
        selectOnCheck: false, //关闭checkbox单个选择
        checkOnSelect: true, //开启checkbox多个选择
        striped: true,
        columns: [[
        { field: 'ck', checkbox: true },
        { field: 'pc1_id', hidden: true },
        { field: 'pc1_contractcode', title: '合同编号', width: 100 },
        { field: 'pc1_statename', title: '合同状态', width: 60 },
        { field: 'pc1_sp1_suppliercode', title: '供应商编号', width: 100 },
        { field: 'sp1_name', title: '供应商名称', width: 100 },
        { field: 'pc1_regionname', title: '供应商分类', width: 70 },
        { field: 'pc1_potypename', title: '采购类型', width: 80 },
        { field: 'pc1_paymenttypename', title: '付款方式', width: 100 },
        { field: 'pc1_currencyname', title: '结算币种', width: 70 },
        { field: 'pc1_paymentchannelname', title: '结算方式', width: 100 },
        { field: 'pc1_contractcomment', title: '合同说明', width: 150 },
        { field: 'pc1_effectdate', title: '合同开始时间', width: 100 },
        { field: 'pc1_terminationdate', title: '合同截止时间', width: 100 },
        { field: 'pc1_rguser', title: '创建人', width: 100 },
        { field: 'pc1_rgdt', title: '创建时间', width: 150 },
        { field: 'pc1_lmuser', title: '更新人', width: 100 },
        { field: 'pc1_lmdt', title: '更新时间', width: 150 }
        ]],
        pagination: true, //是否开启分页
        pageNumber: 1, //默认索引页
        pageSize: 20, //默认一页数据条数
        onDblClickRow: function (rowIndex, rowData) {
            contractWindow('edit');
        },
        toolbar: [{
            text: '新增',
            iconCls: 'icon-add',
            handler: function () { contractWindow('new'); }
        }, {
            text: '修改',
            iconCls: 'icon-edit',
            handler: function () { contractWindow('edit'); }
        },
    {
        text: '删除',
        iconCls: 'icon-remove',
        handler: function () { deleteRows(); }
    }, '-', {
        text: '审核',
        iconCls: 'icon-ok',
        handler: function () { auditContract("yes"); }
    },
    {
        text: '弃审',
        iconCls: 'icon-cancel',
        handler: function () { auditContract("no"); }
    }, '-', {
        text: '关联采购单',
        iconCls: 'icon-arrow-in',
        handler: function () { CoPoLinkOpen(); }
    }]
    });
};

//window的方法
function contractWindow(type) {
    $('#btnUpload').show();

    if (type == 'new') {

        $("#cmbPC1_PaymentType").combobox();
        $("#cmbPC1_Currency").combobox();
        $("#cmbPC1_PaymentChannel").combobox();


        //初始化供应商下拉框
        $('#formWindow').form('clear'); //清空window值
        $('#cmbPC1_SP1_SupplierCode').combogrid({
            disabled: false,
            panelWidth: 300,
            url: GetWSRRURL('643a8280-09c8-4e52-aaff-1d27440b7d41') + "&XML=" + GetFormJson([{ "name": "txtzt", "value": m_compName }], 'SupplierInfo'),
            idField: 'sp1_suppliercode',
            textField: 'sp1_name',
            required: true,
            mode: 'remote',      //远程取值，local本地取值
            fitColumns: true,
            columns: [[
                    { field: 'sp1_suppliercode', title: '供应商编号', width: 50 },
                    { field: 'sp1_name', title: '供应商简称', width: 60 },
                    { field: 'sp1_regioncode', title: '区域编码', hidden: true, width: 60 },
                    { field: 'sp1_regionname', title: '区域名称', hidden: true, align: 'right', width: 60 }
            ]],
            onClickRow: function (rowIndex, rowData) {
                RegionCode = rowData['sp1_regioncode'];
                RegionName = rowData['sp1_regionname'];
                $('#txtRegionName').val(RegionName);
            }
        });
        $('#txtPC1_POTypeCode').combobox('enable');
        $('#contractStatus').val('编辑中');
        $('#contractCode').val('系统生成');
        $('#contractAmount').val('0');

        $('#datPC1_EffectDate')
        .datebox({ disabled: false })
        .datebox('setValue', getEffectDate());
        $('#datPC1_TerminationDate')
        .datebox({ disabled: false })
        .datebox('setValue', getTerminationDate());
        $('#btnSave').linkbutton('enable');
        $('#txtPC1_ContractComment').attr("disabled", false);
        $('#winContractEdit').window('open');
    } else if (type == 'edit') {
        var selected_Row = $('#tab_list').datagrid('getSelected');
        if (selected_Row != null) {
            if (checkStatus("1")) {
                $('#formWindow').form('clear'); //清空window值
                $('#contractStatus').val('编辑中');
                $('#contractCode').val(selected_Row.pc1_contractcode);

                $('#cmbPC1_SP1_SupplierCode').combobox().combobox('setValue', selected_Row.sp1_name).combobox('disable');

                $('#txtRegionName').val(selected_Row.pc1_regionname);
                $('#txtPC1_POTypeCode')
                .combobox('setValue', selected_Row.pc1_potypename)
                .combobox('disable');
                $('#cmbPC1_PaymentType')
                .combobox('setValue', selected_Row.pc1_paymenttypename)
                .combobox('enable');
                $('#cmbPC1_Currency')
                .combobox('setValue', selected_Row.pc1_currencyname)
                .combobox('enable');
                $('#cmbPC1_PaymentChannel')
                .combobox('setValue', selected_Row.pc1_paymentchannelname)
                .combobox('enable');
                $('#datPC1_EffectDate')
                .datebox({ disabled: false })
                .datebox('setValue', selected_Row.pc1_effectdate);
                $('#datPC1_TerminationDate')
                .datebox({ disabled: false })
                .datebox('setValue', selected_Row.pc1_terminationdate);
                $('#txtPC1_ContractComment').val(selected_Row.pc1_contractcomment.replace("&amp;","&"))
                .attr("disabled", false);
                $('#txtPC1_FilePath').val(selected_Row.pc1_filepath);
                $('#btnSave').linkbutton('enable');
                $('#winContractEdit').window('open');
            }
        } else { alert('请选中一行'); };
    };
};

//获取合同开始日期的方法--//获取合同结束日期的方法
function getEffectDate(){
    var myDate = new Date();
    var YY = myDate.getFullYear();
    var MM = myDate.getMonth() + 1;
    var DD = myDate.getDate();
    var date = YY + "-" + MM + "-" + DD;
    return date;
};
function getTerminationDate(){
    var myDate = new Date();
    var YY=myDate.getFullYear()+1;
    var MM = myDate.getMonth() + 1;
    var DD = myDate.getDate();
    var date = YY + "-" + MM + "-" + DD;
    return date;
};

//保存按钮方法
function contractSave() {
    if ($('#formWindow').form('validate')) {
        if (checkDate("Contract")) {
            var contractCode = $('#contractCode').val();
            var filePath = $('#txtPC1_FilePath').val();
            var potypecode = $('#txtPC1_POTypeCode').combobox('getValue');

            var potypename = $('#txtPC1_POTypeCode').combobox('getText');

            if (contractCode == "系统生成") {
                var data = $('#formWindow').serializeArray();
                //转意特殊符号
                data[7].value.replace('&', '&amp;');
                data[data.length] = { "name": "txtpc1_cono", "value": "HYFG" };
                data[data.length] = { "name": "txtpc1_divi", "value": m_compName };
                data[data.length] = { "name": "txtpc1_Amount", "value": "0" };
                data[data.length] = { "name": "txtpc1_StateCode", "value": "1" };
                data[data.length] = { "name": "txtpc1_StateName", "value": "已保存" };
                data[data.length] = { "name": "txtpc1_POTypeName", "value": potypename };
                data[data.length] = { "name": "txtpc1_RegionCode", "value": RegionCode };
                data[data.length] = { "name": "txtpc1_RegionName", "value": RegionName };
                data[data.length] = { "name": "txtpc1_ID", "value": "" };
                data[data.length] = { "name": "txtpc1_Rguser", "value": "" };
                data[data.length] = { "name": "txtpc1_ContractCode", "value": "" };
                data[data.length] = { "name": "txtPC1_FilePath", "value": filePath };
                XMLData = GetFormJson(data, 'INSERT');
                $.ajax({
                    url: GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792'),
                    type: 'post',
                    async: false, //异步,
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
                                $('#formWindow').form('clear');
                                $('#winContractEdit').window('close');
                                ClearGrid("#tab_list");
                                $('#tab_list').datagrid('reload');
                                //slide(result[0].rows[0].message); //提示信息
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
            } else {
                var selected_Row = $('#tab_list').datagrid('getSelected');
                if (selected_Row.pc1_statecode == "1") {        //1代表已保存状态
                    var data = $('#formWindow').serializeArray();
                    if (data[0]["value"] == selected_Row.pc1_paymenttypename) {
                        data[0]["value"] = selected_Row.pc1_paymenttype;
                    };
                    if (data[1]["value"] == selected_Row.pc1_currencyname) {
                        data[1]["value"] = selected_Row.pc1_currency;
                    };
                    if (data[2]["value"] == selected_Row.pc1_paymentchannelname) {
                        data[2]["value"] = selected_Row.pc1_paymentchannel;
                    };
                    if (data[3]["value"] == "") {
                        data[3]["value"] = $('#datPC1_EffectDate').datebox('getValue');
                    };
                    if (data[4]["value"] == "") {
                        data[4]["value"] = $('#datPC1_TerminationDate').datebox('getValue');
                    };  

                    data[data.length] = { "name": "txtPC1_ID", "value": selected_Row.pc1_id };
                    data[data.length] = { "name": "txtPC1_LmDt", "value": "" };
                    data[data.length] = { "name": "txtPC1_LmUser", "value": "" };
                    data[data.length] = { "name": "txtPC1_FilePath", "value": filePath };
                    XMLData = GetFormJson(data, 'UPDATE');
                    $.ajax({
                        url: GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792'),
                        type: 'post',
                        async: false, //异步,
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
                                    $('#formWindow').form('clear');
                                    $('#winContractEdit').window('close');
                                    ClearGrid("#tab_list");
                                    $('#tab_list').datagrid('reload');
                                    //slide(result[0].rows[0].message); //提示信息
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
                }else{
                    alert('合同状态异常，请检查');
                }
            }
        }
    }
};

//合同时间检查方法
function checkDate(type) {
    if (type == "Contract") {
        var EffectDate = $('#datPC1_EffectDate').datebox('getValue');
        var TerminationDate = $('#datPC1_TerminationDate').datebox('getValue');
        if (EffectDate <= TerminationDate) {
            return true;
        } else {
            alert('请检查合同日期');
            return false;
        };
    } else {
        var EffectDate = $('#datPC1_EffectDate').datebox('getValue');
        var TerminationDate = $('#datPC1_TerminationDate').datebox('getValue');
        if (EffectDate <= TerminationDate) {
            return true;
        } else {
            alert('请检查预计出货日期');
            return false;
        };
    };

};

//删除按钮的方法
function deleteRows() {
    var deleted = $('#tab_list').datagrid('getChecked');
    if (deleted.length == 0) {
        alert('请选择需要删除的行');
    } else {
        $.ajax({
            url: GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792') + "&XML=" + GetEditJsonbyType(deleted, "CheckLink") + "&where=PC1_CONO='HYFG' AND PC1_DIVI='" + m_compName + "'",
            type: 'post',
            async: false, //异步,
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
                    else { //开始删除
                        if (checkStatus("1")) {        //合同状态 true or false;
                            $.messager.confirm('提示框', '确认删除该合同吗？', function (r) {
                                if (r) {
                                    XMLData = GetEditJson(undefined, undefined, deleted);
                                    $.ajax({
                                        url: GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792') + "&XML=" + GetEditJson(undefined, undefined, deleted),
                                        type: 'post',
                                        async: false, //异步,
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
                                                    $('#formWindow').form('clear');
                                                    $('#winContractEdit').window('close');
                                                    ClearGrid("#tab_list");
                                                    $('#tab_list').datagrid('reload');
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
                                };
                            });
                        };
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
   };
};
//检查合同状态的方法：1代表已保存状态，2代表已审核状态
function checkStatus(type) {
    checkdata = $('#tab_list').datagrid('getChecked');
    if (type == "1") {
        for (i = 0; i < checkdata.length; i++) {
            if (checkdata[i].pc1_statecode != "1") {
                alert('请检查合同状态');
                return false;
            } else {
                return true;
            };
        };
    } else {
        for (i = 0; i < checkdata.length; i++) {
            if (checkdata[i].pc1_statecode != "2") {
                alert('请检查合同状态');
                return false;
            } else {
                return true;
            };
        };
    };
};

//审核按钮方法
function auditContract(type) {
    var update = $('#tab_list').datagrid('getChecked');
    if (update.length == 0) {
        alert('请选择需要审批的行');
    } else {

    if (type == "yes") {
        if (checkStatus("1")) {        //true or false;
            for (i = 0; i < update.length; i++) {
                update[i].type = "1";
             }
            $.ajax({
                url: GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792') + "&XML=" + GetEditJsonbyType(update, "Audit") + "&where=PC1_CONO='HYFG' AND PC1_DIVI='" + m_compName + "'",
                type: 'post',
                async: false, //异步,
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
                            $('#formWindow').form('clear');
                            $('#winContractEdit').window('close');
                            ClearGrid("#tab_list");
                            $('#tab_list').datagrid('reload');
                            //slide(result[0].rows[0].message); //提示信息
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
        };
    } else {
        if (checkStatus("2")) {        //true or false;
            for (i = 0; i < update.length; i++) {
                update[i].type = "2";
            }
            $.ajax({
                url: GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792') + "&XML=" + GetEditJsonbyType(update, "Audit") + "&where=PC1_CONO='HYFG' AND PC1_DIVI='" + m_compName + "'",
                type: 'post',
                async: false, //异步,
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
                            $('#formWindow').form('clear');
                            $('#winContractEdit').window('close');
                            ClearGrid("#tab_list");
                            $('#tab_list').datagrid('reload');
                            //slide(result[0].rows[0].message); //提示信息
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
        };
      };
    };
};

//查询过滤的方法           
function searchData() {
    var searchData = $('#getCondition').serializeArray();

    searchData[searchData.length] = { "name": "txtPC1_CONO", "value": "HYFG" };
    searchData[searchData.length] = { "name": "txtPC1_DIVI", "value": m_compName };


    var url = GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792') + "&XML=" + GetFormJson(searchData, 'Search') + "&where=PC1_CONO='HYFG' AND PC1_DIVI='" + m_compName + "'";
   
    ClearGrid("#tab_list");
    initGird(url);

};

//查看合同明细的方法
function getContractDetail() {
    var selected_Row = $('#tab_list').datagrid('getSelected');
    if (selected_Row != null) {
            $('#formWindow').form('clear'); //清空window值
            $('#contractStatus').val(selected_Row.pc1_statename);
            $('#contractCode').val(selected_Row.pc1_contractcode);
            //$('#contractAmount').val(selected_Row.pc1_amount);
            $('#cmbPC1_SP1_SupplierCode')
            .combobox('setValue', selected_Row.sp1_name)
            .combobox('disable');
            $('#txtRegionName').val(selected_Row.pc1_regionname);
            $('#txtPC1_POTypeCode')
            .combobox('setValue', selected_Row.pc1_potypename)
            .combobox('disable');
            $('#cmbPC1_PaymentType')
            .combobox('setValue', selected_Row.pc1_paymenttypename)
            .combobox('disable');
            $('#cmbPC1_Currency')
            .combobox('setValue', selected_Row.pc1_currencyname)
            .combobox('disable');
            $('#cmbPC1_PaymentChannel')
            .combobox('setValue', selected_Row.pc1_paymentchannelname)
            .combobox('disable');
            $('#datPC1_EffectDate')
            .datebox('setValue', selected_Row.pc1_effectdate)
            .datebox({ disabled: true });
            $('#datPC1_TerminationDate')
            .datebox('setValue', selected_Row.pc1_terminationdate)
            .datebox({ disabled: true });
            $('#txtPC1_ContractComment').val(selected_Row.pc1_contractcomment.replace("&amp;", "&"))
            .attr("disabled", "disabled");
            $('#txtPC1_FilePath').val(selected_Row.pc1_filepath);
            $('#btnSave').linkbutton('disable');
            $('#winContractEdit').window('open');
    } else { alert('请选中一行'); };
    };

//合同采购单关联窗口
function CoPoLinkOpen() {
    selected_Row = $('#tab_list').datagrid('getSelected');
    if (selected_Row != null) {
        var suppliercode = selected_Row.pc1_sp1_suppliercode;
        var url = '1=1 ';
        if (suppliercode != "") {
            url += "  AND PO1_PC1_ContractCode = '' AND PO1_SupplierCode = '" + suppliercode + "'"
        };
        $('#tab_link').datagrid({
        url: GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson("", 'GET') + "&WHERE=" + url,
        title: '采购单列表',
        width: '90%',
        singleSelect: true,
        sortOrder: 'desc',
        fit: true,
        selectOnCheck: false, //关闭checkbox单个选择
        checkOnSelect: true, //开启checkbox多个选择
        striped: true,
        columns: [[
        { field: 'ck', checkbox: true },
        { field: 'po1_id', hidden: true },
        { field: 'po1_rgdt',hidden: true},
        { field: 'po1_pocode', title: '采购单编号', width: 100 },
        { field: 'po1_sppocode', title: '供应商采购单编号', width: 100 },
        { field: 'po1_pc1_contractcode', title: '合同编号', width: 100 },
        { field: 'po1_hstate', title: '最低状态', width: 100 },
        { field: 'po1_lstate', title: '最高状态', width: 100 }
    ]],
        pagination: true, //是否开启分页
        pageNumber: 1, //默认索引页
        pageSize: 20 //默认一页数据条数
        });
        $('#winPoWindow').window('open');
    } else {alert('请选中一行！');};      
};

//合同查询采购单按钮
function CoPoSearch() {
    selected_Row = $('#tab_list').datagrid('getSelected');
    var suppliercode = selected_Row.pc1_sp1_suppliercode;
    var po = $('#txtCoPoNo').val();
    var sppo = $('#txtCoPoSSPo').val();
    var rgur = $('#txtCoPoRgur').val();
    var starttime = $('#datPO1_PlanDeliveryDateStart').datebox('getValue');
    var endtime = $('#datPO1_PlanDeliveryDateEnd').datebox('getValue');
    var url = '1=1';
    if (po == "" && sppo == "" && rgur == "" && starttime == "" && endtime == "") {
        url += " AND PO1_SupplierCode = '" + suppliercode + "'";
    } else {
        if (suppliercode != "") {
            url += " AND PO1_SupplierCode = '" + suppliercode + "'";
        };
        if (po != "") {
            url += " AND PO1_POCode = '" + po + "'";
        };
        if (sppo != "") {
            url += " AND PO1_SPPOCode = '" + sppo + "'";
        };
        if (rgur != "") {
            url += " AND PO1_RgUser = '" + rgur + "'";
        };
        if (starttime != "" && endtime != "") {
            url += " AND PO1_PlanDeliveryDate BETWEEN '" + starttime + "' AND '" + endtime + "'";
        };
        
    };
    if (selected_Row != null) {
        $('#tab_link').datagrid({
            url: GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson("", 'GET') + "&WHERE=" + url,
            title: '采购单列表',
            width: '90%',
            singleSelect: true,
            sortOrder: 'desc',
            fit: true,
            selectOnCheck: false, //关闭checkbox单个选择
            checkOnSelect: true, //开启checkbox多个选择
            striped: true,
            columns: [[
        { field: 'ck', checkbox: true },
        { field: 'po1_id', hidden: true },
        { field: 'po1_rgdt', hidden: true },
        { field: 'po1_pocode', title: '采购单编号', width: 100 },
        { field: 'po1_sppocode', title: '供应商采购单编号', width: 100 },
        { field: 'po1_pc1_contractcode', title: '合同编号', width: 100 },
        { field: 'po1_hstate', title: '最低状态', width: 100 },
        { field: 'po1_lstate', title: '最高状态', width: 100 }
    ]],
            pagination: true, //是否开启分页
            pageNumber: 1, //默认索引页
            pageSize: 20 //默认一页数据条数
        });
        $('#winPoWindow').window('open');
    } else { alert('请选中一行！'); };
};

//关联采购单的方法
function CoPoLink(type) {
    var update = $('#tab_link').datagrid('getChecked');
    if (update.length == 0) {
        alert('请在需要关联的采购单前打勾');
    } else {
        if (type == "yes") {
            var selected_Row = $('#tab_list').datagrid('getSelected');
            var contractcode = selected_Row.pc1_contractcode;
            for (i = 0; i <= update.length - 1; i++) {
                update[i]["po1_pc1_contractcode"] = contractcode;
            }
            XMLData = GetEditJsonbyType(update, "UpdatePo");
            for (i = 0; i <= update.length - 1; i++) {
                update[i]["po1_pc1_contractcode"] = contractcode;
            }
            $.ajax({
                url: GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792'),
                type: 'post',
                async: false, //异步,
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
                            $('#fmPoWindow').form('clear');
                            $.messager.alert("提示", result[0].rows[0].message);
                            $('#winPoWindow').window('close');
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
        } else {
            for (i = 0; i <= update.length - 1; i++) {
                update[i]["po1_pc1_contractcode"] = "";
            }
            XMLData = GetEditJsonbyType(update, "UpdatePo");
            $.ajax({
                url: GetWSRRURL('ac31b57a-a197-4e08-8d4e-433b006af792'),
                type: 'post',
                async: false, //异步,
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
                            $('#fmPoWindow').form('clear');
                            $.messager.alert("提示", result[0].rows[0].message);
                            $('#winPoWindow').window('close');
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
        };
    };
};

function clickBox(){
    if ($("#txtcheckbox").attr("checked") == true) {
        selected_Row = $('#tab_list').datagrid('getSelected');
        if (selected_Row != null) {
            var suppliercode = selected_Row.pc1_sp1_suppliercode;
            var url = '1=1';
            if (suppliercode != "") {
                url += " AND PO1_SupplierCode = '" + suppliercode + "'"
            };
            $('#tab_link').datagrid({
                url: GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson("", 'GET') + "&WHERE=" + url,
                title: '采购单列表',
                width: '90%',
                singleSelect: true,
                sortOrder: 'desc',
                fit: true,
                selectOnCheck: false, //关闭checkbox单个选择
                checkOnSelect: true, //开启checkbox多个选择
                striped: true,
                columns: [[
            { field: 'ck', checkbox: true },
            { field: 'po1_id', hidden: true },
            { field: 'po1_rgdt', hidden: true },
            { field: 'po1_pocode', title: '采购单编号', width: 100 },
            { field: 'po1_sppocode', title: '供应商采购单编号', width: 100 },
            { field: 'po1_pc1_contractcode', title: '合同编号', width: 100 },
            { field: 'po1_hstate', title: '最低状态', width: 100 },
            { field: 'po1_lstate', title: '最高状态', width: 100 }
        ]],
                pagination: true, //是否开启分页
                pageNumber: 1, //默认索引页
                pageSize: 20 //默认一页数据条数
            });
            $('#winPoWindow').window('open');
        } else { alert('请选中一行！'); };   
    } else {
        selected_Row = $('#tab_list').datagrid('getSelected');
        if (selected_Row != null) {
            var suppliercode = selected_Row.pc1_sp1_suppliercode;
            var url = '1=1';
            if (suppliercode != "") {
                url += "  AND PO1_PC1_ContractCode = '' AND PO1_SupplierCode = '" + suppliercode + "'"
            };
            $('#tab_link').datagrid({
                url: GetWSRRURL('47a9a2ce-92d8-4bea-800b-fabf87dd7850') + "&XML=" + GetFormJson("", 'GET') + "&WHERE=" + url,
                title: '采购单列表',
                width: '90%',
                singleSelect: true,
                fit: true,
                sortOrder: 'desc',
                selectOnCheck: false, //关闭checkbox单个选择
                checkOnSelect: true, //开启checkbox多个选择
                striped: true,
                columns: [[
            { field: 'ck', checkbox: true },
            { field: 'po1_id', hidden: true },
            { field: 'po1_rgdt', hidden: true },
            { field: 'po1_pocode', title: '采购单编号', width: 100 },
            { field: 'po1_sppocode', title: '供应商采购单编号', width: 100 },
            { field: 'po1_pc1_contractcode', title: '合同编号', width: 100 },
            { field: 'po1_hstate', title: '最低状态', width: 100 },
            { field: 'po1_lstate', title: '最高状态', width: 100 }
        ]],
                pagination: true, //是否开启分页
                pageNumber: 1, //默认索引页
                pageSize: 20 //默认一页数据条数
            });
            $('#winPoWindow').window('open');
        } else { alert('请选中一行！'); };   
    };
};