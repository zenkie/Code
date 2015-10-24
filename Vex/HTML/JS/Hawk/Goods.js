﻿/// JS名：Goods.js
/// 说明：商品
/// 创建人：俞佳伟 
/// 创建日期：2014-11-28

var m_state = [{ "id": "20", "text": "正常", "selected": true }, { "id": "99", "text": "禁用" }];
var m_st1_grade = [{ "id": "合格品", "text": "合格品", "selected": true }, { "id": "降级品", "text": "降级品" }];
var m_st2_upload = [{ "id": "未导入", "text": "未导入" }, { "id": "执行成功", "text": "执行成功" }, { "id": "失败", "text": "失败" }, { "id": "全部", "text": "全部", "selected": true }];
var m_allSelectOption = ""//定义select控件所有数据
var m_nMaxId = 1;//定义图片开始ID
var zt = "";//帐套
var m_data = [];
var editIndex;
var m_userName = "";
$(function () {
    //获取登录帐套    
    zt = $.cookie("compName");

    //获取登录名
    m_userName = window.m_UserID;
    //初始化查询界面
    if (zt == "GL") {
        $(".lx").hide();
    }
    else {
        $(".gl").hide();
    }
    //$("#txtst1_brandid").val(zt);
    m_data[m_data.length] = { "name": "txtzt", "value": zt };
    //文件上传相关-----------------
    var button = $('#btnUp'), interval;
    $('#formGoods').find("input").blur(function () {
        if (this.id == "txtst1_supperierstyle" || this.id == "txtst2_supperiercolor") {
            var st1_SupperierStyle = $('#formGoods').find("#txtst1_supperierstyle").val()//取供应商款号
            var st2_SupperierColor = $('#formGoods').find("#txtst2_supperiercolor").val()//取供应商颜色
            //如果如果款号和颜色有一个为空不进行操作，返回
            if (st1_SupperierStyle == "" || st2_SupperierColor == "") {
                return;
            }
            else {
                $('#formGoods').find("#txtst2_supperierskc").val(st1_SupperierStyle + st2_SupperierColor)
            }
        }
        else if (zt == "GL" && this.id == "txtst2_purchaseprice") {
            var st2_PurchasePrice = $('#formGoods').find("#txtst2_purchaseprice").numberbox('getValue')//取采购价计算参考价格
            if (st2_PurchasePrice == "") {
                return;
            }
            $('#formGoods').find("#txtst2_refsaleprice").val(st2_PurchasePrice * 1 * (1 + 0.17) * (1 + 0.16) * (1 + 0.05) * 3);
        }
        else {
            if ($('#formGoods').find("#txtst2_skccode").val() == "") {
                return;
            }
            else {
                updateFile(button, $('#formGoods').find("#txtst2_skccode").val() + "_" + m_nMaxId)
            }
        }
    });
    //加载供应商品牌
    $('#formGoods #txtst1_br1_brandcode').combogrid({
        url: GetWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124') + "&XML=" + GetFormJson('', 'GETBRAND') + "&Where=BR1_State='20'",
        panelWidth: 160,
        idField: 'br1_brandcode',
        textField: 'br1_name',
        mode: 'remote',
        required: true,
        columns: [[
                { field: 'br1_brandcode', title: '品牌编码', width: 55 },
                { field: 'br1_name', title: '品牌名称', width: 80 }
        ]]
    });

    ////加载供应商下拉
    $('#formGoods #txtst1_suppliercode').combogrid({
        panelWidth: 200,
        url: GetWSRRURL('ffda947c-e49f-4106-982a-dbda0664b282') + "&XML=" + GetFormJson('', 'SupplierInfo') + "&Where=SP1_State='20'",
        idField: 'sp1_suppliercode',
        textField: 'sp1_name',
        mode: 'remote',
        required: true,
        columns: [[
                { field: 'sp1_suppliercode', title: '供应商编号', width: 80 },
                { field: 'sp1_name', title: '供应商简称', width: 80 }
        ]]
    });

    ////加载年份combobox下拉
    $('#formGoods #txtst1_years').combobox({
        url: GetComboxWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124', "", "CT1_OptionsValues", "CT1_Options") + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "YEAR" + "' AND CT1_State='20' AND LEN(CT1_OptionsValues)=4",
        panelHeight: 50,
        editable: false,
        valueField: 'id',
        textField: 'text',
        required: true,
        onSelect: function () { autoSKC(); }
    });

    ////加载季节combobox下拉93837c9f-7fba-49a6-abc2-5fc950d26ff0
    if (zt == 'GL') {
        $('#formGoods #txtst1_season').attr("disabled", false);
        $('#formGoods #txtst1_season').combobox({
            url: GetComboxWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124', "", "CT1_OptionsValues", "CT1_Options") + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "SSON" + "' AND CT1_State='20'",
            panelHeight: '120',
            editable: false,
            valueField: 'id',
            textField: 'text',
            required: true,
            onSelect: function () { autoSKC() }
        });
    }
    else {
        $('#formGoods #txtst1_season').attr("disabled", true);
    }

    ////加载执行标准txtst1_standard下拉
    $('#formGoods #txtst1_standard').combobox({
        url: GetComboxWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124', "", "CT1_OptionsValues", "CT1_Options") + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "STRD" + "' AND CT1_State='20'",
        panelHeight: 120,
        editable: false,
        valueField: 'id',
        textField: 'text'
    });

    ////加载安全技术类别txtst1_safetechnology下拉
    $('#formGoods #txtst1_safetechnology').combobox({
        url: GetComboxWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124', "", "CT1_OptionsValues", "CT1_Options") + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "STCL" + "' AND CT1_State='20'",
        panelHeight: 120,
        editable: false,
        valueField: 'id',
        textField: 'text'
    });

    ////导入状态下拉
    $('#formselect #txtst2_upload').combobox({
        data: m_st2_upload,
        panelHeight: '90',
        editable: true,
        valueField: 'id',
        textField: 'text'
    });

    ////加载单位下拉
    $('#formGoods #txtst1_unit').combogrid({
        panelWidth: 100,
        url: GetWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124') + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "UNIT" + "' AND CT1_State='20'",
        idField: 'ct1_optionsvalues',
        textField: 'ct1_options',
        mode: 'remote',
        required: true,
        columns: [[
            { field: 'ct1_options', title: '单位', width: 80 },
        ]]
    });

    ////初始化小类大类combobox
    $('#formGoods #txtst1_smallclass').combobox({ required: true });
    $('#formGoods #txtst1_largeclass').combobox({ required: true });

    ////加载品类combobox下拉
    $('#formGoods #txtst1_category').combobox({
        url: GetComboxALLColumnWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124', "", "CT1_KeyID", "CT1_KeyName") + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "ITCL" + "' AND CT1_State='20'",
        panelHeight: '120',
        editable: false,
        valueField: 'id',
        textField: 'text',
        required: true,
        async: false,//同步,
        onSelect: function (data) {
            autoSKC();
            //加载大类combobox下拉
            $('#formGoods #txtst1_largeclass').combobox({
                url: GetComboxALLColumnWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124') + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "ITGR" + "' and CT1_FatherID='" + data.CT1_ID + "' AND CT1_State='20'",
                panelHeight: '120',
                editable: false,
                valueField: 'id',
                textField: 'text',
                required: true,
                async: false,//同步,
                onSelect: function (data) {
                    //加载小类combobox下拉
                    var data = $.ajax({
                        url: GetComboxALLColumnWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124') + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "ITGL" + "' and CT1_FatherID='" + data.CT1_ID + "' AND CT1_State='20'",
                        type: 'post',
                        async: false//同步,
                    });

                    var data1 = $.parseJSON(data.responseText)
                    $('#formGoods #txtst1_smallclass').combobox({
                        data: data1,
                        valueField: 'id',
                        textField: 'text',
                        panelHeight: 'auto',
                        editable: false
                    });

                    if (data1.length == 0 || data1[0].id == "") {
                        $('#formGoods #txtst1_smallclass').combobox({ required: false })
                        $('#formGoods #txtst1_smallclass').combobox('disable')
                    }
                    else {
                        $('#formGoods #txtst1_smallclass').combobox({ required: true })
                        $('#formGoods #txtst1_smallclass').combobox('enable')
                    }
                    autoSKC();
                }
            });
        }

    });

    ////加载颜色combobox下拉
    $('#formGoods #txtst2_color').combobox({
        url: GetComboxWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124', "", "CT1_OptionsValues", "CT1_Options") + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "COLO" + "' AND CT1_State='20'",
        panelHeight: '120',
        editable: false,
        valueField: 'id',
        textField: 'text',
        required: true,
        onSelect: function () { autoSKC1(); }
    });

    ////GL 选择面料 更改款号
    if (zt == 'GL') {
        $('#formGoods #sltmaterial').combobox({
            onSelect: function () { autoSKC(); }
        });
    }

    //加载等级combobox下拉
    $('#formGoods #txtst1_grade').combobox({
        valueField: 'id',
        textField: 'text',
        data: m_st1_grade,
        panelHeight: 'auto',
        editable: false,
        required: true
    });

    //加载币种combobox下拉
    $('#formGoods #txtst1_currency').combobox({
        url: GetComboxWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124', "", "CT1_OptionsValues", "CT1_Options") + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "CUCD" + "' AND CT1_State='20'",
        panelHeight: '120',
        editable: false,
        valueField: 'id',
        textField: 'text',
        required: true,
        onSelect: function () {
            var bzUnit = $("#txtst1_currency").combobox('getValue'); //根据币种值联动采购价中的价格单位
            $("#txtst2_purchaseprice_unit").val(bzUnit);
        }

    });

    ////加载尺码组combobox下拉
    $('#formGoods #txtst2_sizegroup').combobox({
        url: GetComboxWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124', "", "CT1_OptionsValues", "CT1_Options") + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "SDGP" + "' AND CT1_State='20'",
        panelHeight: 100,
        editable: false,
        valueField: 'id',
        textField: 'text',
        required: true
    });

    $('#formGoods #txtst1_provenance').combogrid({
        panelWidth: 100,
        url: GetWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124') + "&pagerows=20000&XML=" + GetFormJson('', 'GET') + "&Where=CT1_Code='" + "COTY" + "' AND CT1_State='20'",
        idField: 'ct1_optionsvalues',
        textField: 'ct1_options',
        mode: 'remote',
        required: false,
        sortName: 'ct1_options', //排序字段
        columns: [[
            { field: 'ct1_options', title: '国家', width: 80 },
        ]]
    });

    ////加载状态combobox下拉
    $('#formGoods #txtst1_state').combobox({
        valueField: 'id',
        textField: 'text',
        data: m_state,
        panelHeight: 'auto',
        editable: false,
        required: true
    });


    ////日期格式转换
    $('#txtst1_productdate').datebox({
        formatter: timeFormatter
        //parser: timeParser
    });

    ////初始化div关闭
    $('#DivGoods').window({}).window('close');

    ////初始化上传按钮隐藏
    $("#btnUp").hide();

    ////初始化加载商品数据
    var cols = [];
    cols[0] = [{ field: 'st2_imagepath', title: '款图' },
                { field: 'st1_suppliercode', title: '供应商编号', width: 70, search: true, sortable: true },
                { field: 'br1_brandname', title: '品牌名称', width: 60, search: true, sortable: true },
                { field: 'st1_supperierstyle', title: '供应商款号', width: 70, search: true, sortable: true },
                { field: 'st2_supperiercolor', title: '供应商颜色/简', width: 85, search: true, sortable: true },
                { field: 'st2_supperierskc', title: '供应商SKC', width: 70, search: true, sortable: true },
                { field: 'st2_st1_stylecode', title: '款号', width: 80, search: true, sortable: true },
                { field: 'st2_color', title: '颜色/简', width: 50, search: true, sortable: true },
                { field: 'st2_skccode', title: 'SKC', width: 90, search: true, sortable: true },
                { field: 'st1_years', title: '年份', width: 40, search: true, sortable: true }];
    if (zt == "GL") {//雅斓特有的
        cols[0][cols[0].length] = { field: 'st1_season', title: '季节', width: 40, search: true, sortable: true };
    }
    cols[0][cols[0].length] = { field: 'st1_category', title: '品类', width: 40, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st1_largeclass', title: '大类', width: 40, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st1_smallclass', title: '小类', width: 40, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st1_commodity', title: '品名', width: 40, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st1_unitname', title: '单位', width: 30, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st2_purchaseprice', title: '采购价', width: 50, search: true, sortable: true, formatter: Formater.Account };
    cols[0][cols[0].length] = { field: 'st2_saleprice', title: '吊牌价', width: 50, search: true, sortable: true, formatter: Formater.Account };
    if (zt == "GL") {//雅斓特有的
        cols[0][cols[0].length] = { field: 'st2_refsaleprice', title: '参考吊牌价', width: 70, search: true, sortable: true, formatter: Formater.Account };
    }
    cols[0][cols[0].length] = { field: 'st1_series', title: '系列', width: 40, search: true, sortable: true };//字段改成ST1_Series
    cols[0][cols[0].length] = { field: 'st1_styleline', title: '风格线', width: 50, search: true, sortable: true }; //字段改成ST1_StyleLine
    cols[0][cols[0].length] = { field: 'st1_provenance', title: '产地', width: 40, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st2_ingredients', title: '成分', width: 40, search: true, sortable: true };
    if (zt == "LX" || zt == "RS") {//斓绣特有的
        cols[0][cols[0].length] = { field: 'st1_usedmethod', title: '使用方法', width: 60, search: true, sortable: true };//使用方法
        cols[0][cols[0].length] = { field: 'st1_permitno', title: '批准文号', width: 60, search: true, sortable: true };  //批准文号
        cols[0][cols[0].length] = { field: 'st1_attention', title: '注意事项', width: 60, search: true, sortable: true }; //注意事项
        cols[0][cols[0].length] = { field: 'st1_fragrance', title: '香味', width: 40, search: true, sortable: true };       //香味
        cols[0][cols[0].length] = { field: 'st1_netweight', title: '净含量', width: 45, search: true, sortable: true };      //净含量
        cols[0][cols[0].length] = { field: 'st1_productdate', title: '生产日期', width: 100, search: true, sortable: true };   //生产日期
        cols[0][cols[0].length] = { field: 'st1_expiration', title: '保质期', width: 50, search: true, sortable: true };   //新增保质期
    }

    cols[0][cols[0].length] = { field: 'st1_grade', title: '等级', width: 50, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st1_standard', title: '执行标准', width: 70, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st1_safetechnology', title: '安全技术类别', width: 70, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st2_state', title: '状态', width: 40, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st2_rgdt', title: 'SKC创建时间', width: 80, search: true, sortable: true, formatter: Formater.Date };
    cols[0][cols[0].length] = { field: 'st2_rguser', title: '创建人', width: 60, search: true, sortable: true };
    cols[0][cols[0].length] = { field: 'st2_upload', title: '导入状态', width: 60, search: true, sortable: true };

    var url = GetWSRRURL('03eb4ea1-8706-4ec3-b50a-5f9bf0d92846') + "&XML=" + GetFormJson('', 'GoodsInfoForPageList');
    initGird(url, cols);

})
//加载数据
function initGird(url, cols) {
    $('#tab_list').datagrid(
        {
            title: '商品', //表格标题
            url: url,
            sortName: 'st2_lmdt', //排序字段st2_rgdt
            idField: 'st2_id', //标识字段,主键
            width: '90%', //宽度
            height: $(document).height() - 100, //高度
            nowrap: false, //是否换行，True 就会把数据显示在一行里
            remoteSort: true, //定义是否从服务器给数据排序
            collapsible: false, //可折叠
            sortOrder: 'desc', //排序类型
            sortable: true,
            striped: true, //True 奇偶行使用不同背景色
            singleSelect: true, //单行选择
            fit: true,
            pagination: true, //是否开启分页
            pageSize: 20, //默认一页数据条数 
            rownumbers: true,//行号
            columns: cols,
            toolbar: [
                {
                    id: 'btn_Add',
                    text: '新增',
                    iconCls: 'icon-add',
                    handler: function () {
                        addGoods();
                    }
                },
                '-',
                {
                    id: 'btn_Edit',
                    text: '修改',
                    iconCls: 'icon-edit',
                    handler: function () {
                        editGoods();
                    }
                }
            ]
        });
    var $dg = $('#tab_list');
    var col = undefined;
    col = $dg.datagrid('getColumnOption', 'st2_imagepath');
    if (col != null) {
        col.formatter = function (value) {
            var strs = new Array(); //定义一数组 
            strs = value.split(","); //字符分割 
            var date = "<a href='" + strs[0] + "' target='_blank'><img  src='" + strs[0] + "' style='height:60px'/></a>";
            this.formatDataType = "Pic";
            return date;
        }
    }
    var col = undefined;
    col = $dg.datagrid('getColumnOption', 'st2_state');
    if (col != null) {
        col.formatter = function (value) {
            return GetCommboboxText(m_state, value);
        }
    }
    $dg.datagrid();
}
//新增商品
function addGoods() {
    $('#DivGoods').window({
        title: "商品新增",
        top: 20,
        width: 1100,
        height: 800,
        modal: true,
        maximized: true
    });
    $('#DivGoods').tabs('select', 0);
    $('#DivGoods').tabs('disableTab', 1);
    $('#formGoods').form('clear');
    $('#formGoods #txtst1_state').combobox('setValue', "20");
    $('#formGoods #txtst1_grade').combobox('setValue', "合格品");


    $('#formGoods #txtst1_years').combobox('enable');
    $('#formGoods #txtst1_suppliercode').combogrid('enable');
    $('#formGoods #txtst1_br1_brandcode').combogrid('enable');
    //$('#formGoods #txtst1_supperierstyle').removeAttr('disabled');
    //$('#formGoods #txtst2_supperiercolor').removeAttr('disabled');
    $('#formGoods #txtst1_category').combobox('enable');
    $('#formGoods #txtst1_largeclass').combobox('enable');
    $('#formGoods #txtst1_smallclass').combobox('enable');
    $('#formGoods #txtst2_sizegroup').combobox('enable');

    if (zt == 'GL') {
        $('#formGoods #txtst1_unit').combogrid('setValue', "PCS"); //雅斓默认件
        $('#formGoods #sltmaterial').combobox('enable');
        $('#formGoods #sltmaterial').combobox('setValue', 'A');
        $('#formGoods #txtst1_season').combobox('enable');
        $('#txtst1_styleline').validatebox({ 'required': true });  //雅斓风格线 为必填
    }
    else {
        $('#formGoods #txtst1_unit').combogrid('setValue', "EA"); //雅斓默认 个/件/只/粒
        $('#txtst1_styleline').validatebox({ 'required': false });
    }
    $('#txtst2_saleprice').numberbox('setValue', 0);
    $('#txtst2_purchaseprice').numberbox('setValue', 0);
    $('#txtst2_refsaleprice').val(0);
    $("#btnUp").hide();
    $("#Select").empty();//清空Select
    $('#txtimgupload').html("");
    $('#formGoods').form('validate');
}

//修改
function editGoods() {
    var selectGoods = $('#tab_list').datagrid('getSelected')
    if (!selectGoods) {
        alert('请选择一行');
        return;
    }
    $('#DivGoods').window({
        title: "商品修改",
        top: 20,
        width: 1100,
        height: 800,
        modal: true,
        maximized: true

    });
    $('#DivGoods').tabs('select', 0);
    $('#DivGoods').tabs('enableTab', 1);
    $("#Select").empty(); //清空Select
    var selectSt2_Imagepath = selectGoods.st2_imagepath;
    var strs = new Array(); //定义一数组 
    strs = selectSt2_Imagepath.split(","); //字符分割 
    //循环数组添加到select
    for (i = 0; i < strs.length; i++) {
        if (strs[i] != "") {
            col_add(strs[i]);
        }
    }

    $('#formGoods #txtst1_smallclass').combobox({ required: false });
    $('#formGoods #txtst1_largeclass').combobox({ required: false });
    $('#formGoods #txtst2_imagepath').val(selectGoods.st2_imagepath); //图片
    $('#formGoods #txtst2_id').val(selectGoods.st2_id); //SKCGUID
    $('#formGoods #txtst1_id').val(selectGoods.st1_id); //SKCGUID
    $('#formGoods #txtst1_suppliercode').combogrid('setValue', selectGoods.st1_suppliercode); //供应商编号
    //$('#formGoods #txtbr1_brandname').combobox('setValue', selectGoods.br1_brandname); //品牌名
    $('#formGoods #txtst1_br1_brandcode').combogrid('setValue', selectGoods.st1_br1_brandcode); //品牌编号
    $('#formGoods #txtst1_supperierstyle').val(selectGoods.st1_supperierstyle); //供应商款号
    $('#formGoods #txtst2_supperiercolor').val(selectGoods.st2_supperiercolor); //供应商颜色
    $('#formGoods #txtst2_supperierskc').val(selectGoods.st2_supperierskc); //供应商SKC
    $('#formGoods #txtst1_years').combobox('setValue', selectGoods.st1_years); //年
    if (zt == 'GL') {
        $('#formGoods #txtst1_season').combobox('setValue', selectGoods.st1_season);//季节
    }
    $('#formGoods #txtst1_commodity').val(selectGoods.st1_commodity); //品名
    $('#formGoods #txtst1_unit').combogrid('setValue', selectGoods.st1_unit); //单位
    $('#formGoods #txtst1_category').combobox('select', selectGoods.st1_category); //款式品类
    $('#formGoods #txtst1_largeclass').combobox('select', selectGoods.st1_largeclass); //款式大类
    $('#formGoods #txtst1_smallclass').combobox('select', selectGoods.st1_smallclass); //款式小类
    if (zt == 'GL') {
        $('#formGoods #sltmaterial').combobox('setValue', selectGoods.st2_st1_stylecode.substr(10, 1)); //从款号中截取面料       
    }
    $('#formGoods #txtst1_series').val(selectGoods.st1_series); //产品线  字段改成ST1_Series
    $('#formGoods #txtst1_styleline').val(selectGoods.st1_styleline); //产品线  字段改成ST1_StyleLine
    $('#formGoods #txtst2_color').combobox('setValue', selectGoods.st2_color); //颜色/简
    $('#formGoods #txtst2_st1_stylecode').val(selectGoods.st2_st1_stylecode); //款号
    $('#formGoods #txtst2_skccode').val(selectGoods.st2_skccode); //SKC
    $('#formGoods #txtst1_grade').combobox('setValue', selectGoods.st1_grade); //等级
    $('#formGoods #txtst1_currency').combobox('setValue', selectGoods.st1_currency); //币种
    $('#formGoods #txtst2_sizegroup').combobox('setValue', selectGoods.st2_sizegroup); //尺码组
    $('#formGoods #txtst1_provenance').combogrid('setValue', selectGoods.st1_provenance); //产地
    $('#formGoods #txtst2_ingredients').val(selectGoods.st2_ingredients); //成分
    $('#formGoods #txtst1_standard').combobox('setValue', selectGoods.st1_standard); //执行标准修改
    $('#formGoods #txtst1_safetechnology').combobox('setValue', selectGoods.st1_safetechnology); //执行标准修改
    $('#formGoods #txtst2_saleprice').numberbox('setValue', selectGoods.st2_saleprice); //吊牌价
    $('#formGoods #txtst2_purchaseprice_unit').val(selectGoods.st1_currency); //采购价 单位
    $('#formGoods #txtst2_purchaseprice').numberbox('setValue', selectGoods.st2_purchaseprice); //采购价
    $('#formGoods #txtst1_state').combobox('setValue', selectGoods.st1_state); //状态
    $('#formGoods #txtst1_usedmethod').val(selectGoods.st1_usedmethod);   //使用方法   
    $('#formGoods #txtst1_attention').val(selectGoods.st1_attention);     //注意事项
    $('#formGoods #txtst1_permitno').val(selectGoods.st1_permitno);       //批准文号
    $('#formGoods #txtst1_fragrance').val(selectGoods.st1_fragrance);     //香味
    $('#formGoods #txtst1_netweight').val(selectGoods.st1_netweight);     //净含量
    $('#formGoods #txtst1_productdate').datebox('setValue', timeParser(selectGoods.st1_productdate)); //生产日期
    $('#formGoods #txtst1_expiration').val(selectGoods.st1_expiration);   //保质期
    $('#formGoods #txtst1_lmuser').val(selectGoods.st1_lmuser); //更新人
    $('#formGoods #txtst1_lmdt').val(selectGoods.st1_lmdt); //更新时间

    $('#formGoods #txtst2_purchaseprice').focus();//定位光标
    $('#formGoods #txtst2_saleprice').focus();//定位光标

    $('#formGoods').form('validate');
    $('#formGoods #txtst1_years').combobox('disable');
    if (zt == 'GL') {
        $('#formGoods #txtst1_season').combobox('disable');
    }
    $('#formGoods #sltmaterial').combobox('disable');
    $('#formGoods #txtst1_suppliercode').combogrid('disable');
    $('#formGoods #txtst1_br1_brandcode').combogrid('disable');
    //$('#formGoods #txtst1_supperierstyle').attr('disabled', 'disabled');
    //$('#formGoods #txtst2_supperiercolor').attr('disabled', 'disabled');
    $('#formGoods #txtst1_category').combobox('disable');
    $('#formGoods #txtst1_largeclass').combobox('disable');
    $('#formGoods #txtst1_smallclass').combobox('disable');
    $('#formGoods').form('validate');
    $("#btnUp").show(); //上传按钮显示
    var button = $('#btnUp');
    updateFile(button, $('#formGoods').find("#txtst2_skccode").val() + "_" + m_nMaxId);//重写按钮文件名称
    $('#formGoods').find("#txtst2_purchaseprice").focus();//定位光标，未修改，定义价格

    btnAddSize();

}

//关闭新增修改窗口
function cancel(type) {
    if (type == "取消") {
        $('#DivGoods').window('close');
    }
}

//自动生成SKC
function autoSKC() {
    var st1_Years = $('#formGoods').find("#txtst1_years").combobox('getValue'); //取年份
    var material = "";
    if (st1_Years != "") {
        st1_Years = st1_Years.substr(2, 2);
    }
    else {
        return;
    }
    if (zt == 'GL') { //雅斓编码
        if (st1_Years == '14') {
            st1_Years = "AD";
        }
        else if (st1_Years == '15') {
            st1_Years = "AE";
        }
        else if (st1_Years == '16') {
            st1_Years = "AF";
        }
        else if (st1_Years == '17') {
            st1_Years = "AG";
        }
        else if (st1_Years == '18') {
            st1_Years = "AH";
        }
        else if (st1_Years == '19') {
            st1_Years = "AF";
        }
        var st1_Season = $('#formGoods').find("#txtst1_season").combobox('getValue');//取季节
        if (st1_Season == "") {
            return;
        }
    }
    var st1_Category = $('#formGoods').find("#txtst1_category").combobox('getValue'); //取品类
    var st1_Largeclass = $('#formGoods').find("#txtst1_largeclass").combobox('getValue'); //取大类
    if (zt == 'GL') {
        material = $('#formGoods').find("#sltmaterial").combobox('getValue'); //面料
    }
    var st2_Color = $('#formGoods').find("#txtst2_color").combobox('getValue'); //取SKC颜色
    //如果品类，大类为空返回   
    if (st1_Years == "" || st1_Category == "" || st1_Largeclass == "") {
        return;
    }
    else {
        //Ajax取最大值
        var data = [];
        data[data.length] = { "name": "txtzt", "value": zt };
        data[data.length] = { "name": "txtst1_years", "value": st1_Years };
        if (zt == 'GL') {
            data[data.length] = { "name": "txtst1_season", "value": st1_Season };
            data[data.length] = { "name": "txtmaterial", "value": material };
        }
        data[data.length] = { "name": "txtst1_category", "value": st1_Category };
        data[data.length] = { "name": "txtst1_largeclass", "value": st1_Largeclass };
        data[data.length] = m_data[0];
        var xmlData = GetFormJson(data, 'GETMAXSKC');
        htmlobj = $.ajax({
            url: GetWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124'),
            data: { "XML": xmlData },
            type: 'post',
            async: false
        });
        var result = $.parseJSON(htmlobj.responseText);
        if (result.rows[0]['maxskc'] == "") {

        }
        else {
            $('#formGoods').find("#txtst2_st1_stylecode").val(result.rows[0]['maxskc']);  //加上颜色
        }


        //如果颜色为空返回，不生成SKC如果有自动生成SKC
        if (st2_Color == "") {
            return;
        }
        else {
            $('#formGoods').find("#txtst2_skccode").val($('#formGoods').find("#txtst2_st1_stylecode").val() + st2_Color);
        }
    }
}
//需求更改，单独颜色联动剥离出来。
function autoSKC1() {
    var st1_Years = $('#formGoods').find("#txtst1_years").combobox('getValue'); //取年份
    var st1_Category = $('#formGoods').find("#txtst1_category").combobox('getValue'); //取品类
    var st1_Largeclass = $('#formGoods').find("#txtst1_largeclass").combobox('getValue'); //取大类
    var st2_Color = $('#formGoods').find("#txtst2_color").combobox('getValue'); //取SKC颜色
    //如果季节，品类，大类为空返回
    if (st1_Years == "" || st1_Category == "" || st1_Largeclass == "") {
        return;
    }
    if (st2_Color == "") {
        return;
    }
    else {
        $('#formGoods').find("#txtst2_skccode").val($('#formGoods').find("#txtst2_st1_stylecode").val() + st2_Color);
    }
}

//新增修改保存操作
function formGoodsSubmit(type) {
    $('#formGoods').form('submit', {
        onSubmit: function (e) {
            $('#formGoods').form('validate')
            if ($('#formGoods').form('validate') == false) {
                $.messager.alert("提示", "请把必填项填完！", 'error');
                return false;
            }

            if ($('#formGoods').find("#txtst2_st1_stylecode").val() == "" || $('#formGoods').find("#txtst2_skccode").val() == "") {
                $.messager.alert("提示", "数据异常请联系信息管理部！", 'error');
                return false;
            }
            var data = [];
            //考虑到多种控制，直接每次保存都获取更新或者新增
            data[data.length] = { "name": "txtst1_id", "value": $('#formGoods').find("#txtst1_id").val() };
            data[data.length] = { "name": "txtst2_id", "value": $('#formGoods').find("#txtst2_id").val() };
            data[data.length] = { "name": "txtst1_suppliercode", "value": $('#formGoods').find("#txtst1_suppliercode").combogrid('getValue') };
            data[data.length] = { "name": "txtst1_br1_brandcode", "value": $('#formGoods').find("#txtst1_br1_brandcode").combogrid('getValue') };
            data[data.length] = { "name": "txtst2_imagepath", "value": $('#formGoods').find("#txtst2_imagepath").val() };
            data[data.length] = { "name": "txtst1_supperierstyle", "value": $('#formGoods').find("#txtst1_supperierstyle").val() };
            data[data.length] = { "name": "txtst2_supperiercolor", "value": $('#formGoods').find("#txtst2_supperiercolor").val() };
            data[data.length] = { "name": "txtst2_supperierskc", "value": $('#formGoods').find("#txtst2_supperierskc").val() };
            data[data.length] = { "name": "txtst1_years", "value": $('#formGoods').find("#txtst1_years").combobox('getValue') };
            data[data.length] = { "name": "txtst1_commodity", "value": $('#formGoods').find("#txtst1_commodity").val() };
            data[data.length] = { "name": "txtst1_unit", "value": $('#formGoods').find("#txtst1_unit").combogrid('getValue') };
            data[data.length] = { "name": "txtst1_category", "value": $('#formGoods').find("#txtst1_category").combobox('getValue') };
            data[data.length] = { "name": "txtst1_largeclass", "value": $('#formGoods').find("#txtst1_largeclass").combobox('getValue') };
            data[data.length] = { "name": "txtst1_smallclass", "value": $('#formGoods').find("#txtst1_smallclass").combobox('getText') };
            data[data.length] = { "name": "txtst1_series", "value": $('#formGoods').find("#txtst1_series").val() }; //系列
            data[data.length] = { "name": "txtst1_styleline", "value": $('#formGoods').find("#txtst1_styleline").val() }; //风格线
            data[data.length] = { "name": "txtst2_color", "value": $('#formGoods').find("#txtst2_color").combogrid('getValue') };
            data[data.length] = { "name": "txtst2_st1_stylecode", "value": $('#formGoods').find("#txtst2_st1_stylecode").val() };
            data[data.length] = { "name": "txtst2_skccode", "value": $('#formGoods').find("#txtst2_skccode").val() };
            data[data.length] = { "name": "txtst1_grade", "value": $('#formGoods').find("#txtst1_grade").combobox('getText') };
            data[data.length] = { "name": "txtst1_currency", "value": $('#formGoods').find("#txtst1_currency").combobox('getValue') };
            data[data.length] = { "name": "txtst2_sizegroup", "value": $('#formGoods').find("#txtst2_sizegroup").combobox('getValue') };
            data[data.length] = { "name": "txtst1_provenance", "value": $('#formGoods').find("#txtst1_provenance").combobox('getText') };
            data[data.length] = { "name": "txtst2_ingredients", "value": $('#formGoods').find("#txtst2_ingredients").val() };
            data[data.length] = { "name": "txtst1_standard", "value": $('#formGoods').find("#txtst1_standard").combobox('getValue') };
            data[data.length] = { "name": "txtst1_safetechnology", "value": $('#formGoods').find("#txtst1_safetechnology").combobox('getValue') };
            data[data.length] = { "name": "txtst2_saleprice", "value": $('#formGoods').find("#txtst2_saleprice").numberbox('getValue') };
            data[data.length] = { "name": "txtst2_purchaseprice", "value": $('#formGoods').find("#txtst2_purchaseprice").numberbox('getValue') };
            data[data.length] = { "name": "txtst1_state", "value": $('#formGoods').find("#txtst1_state").combobox('getValue') };

            //data[data.length] = { "name": "#txtst1_brandid", "value": $('#formGoods').find("#txtst1_st1_brandid").val() };
            if (zt == "GL") {
                data[data.length] = { "name": "txtst1_season", "value": $('#formGoods').find("#txtst1_season").combobox('getValue') };
                data[data.length] = { "name": "txtst2_refsaleprice", "value": $('#formGoods').find("#txtst2_refsaleprice").val() };
            }
            if (zt == "LX" || zt == "RS") {
                data[data.length] = { "name": "txtst1_usedmethod", "value": $('#formGoods').find("#txtst1_usedmethod").val() };     //使用方法
                data[data.length] = { "name": "txtst1_attention", "value": $('#formGoods').find("#txtst1_attention").val() };       //注意事项
                data[data.length] = { "name": "txtst1_permitno", "value": $('#formGoods').find("#txtst1_permitno").val() };         //批准文号
                data[data.length] = { "name": "txtst1_fragrance", "value": $('#formGoods').find("#txtst1_fragrance").val() };       //香味
                data[data.length] = { "name": "txtst1_netweight", "value": $('#formGoods').find("#txtst1_netweight").val() };       //净含量
                data[data.length] = { "name": "txtst1_productdate", "value": $('#formGoods').find("#txtst1_productdate").datebox('getValue') };   //生产日期
                data[data.length] = { "name": "txtst1_expiration", "value": $('#formGoods').find("#txtst1_expiration").val() };     //保质期
            }
            data[data.length] = m_data[0];

            var xmlData = GetFormJson(data, 'EDITGoods');
            $.messager.progress({ title: '请稍后', msg: '处理中' });
            $.ajax({
                url: GetWSRRURL('03eb4ea1-8706-4ec3-b50a-5f9bf0d92846'),
                type: 'post',
                async: false, //同步,
                data: { "XML": xmlData },
                success: function (result) {
                    try {
                        var result = eval("[" + result + "]");
                        if (result[0].Error) {
                            $.messager.progress('close');
                            $.messager.alert("系统错误", result[0].Error, 'error');
                        }
                        else if (result[0].rows[0].result == "False") {
                            $.messager.progress('close');
                            $.messager.alert("提示", result[0].rows[0].message, 'error');
                        }
                        else {
                            $.messager.progress('close');
                            if (type == '保存并继续新建') {
                                addGoods();
                            }
                            else if (type == '保存') {
                                $('#formGoods #txtst1_years').combobox('disable');
                                $('#formGoods #txtst1_category').combobox('disable');
                                $('#formGoods #txtst1_largeclass').combobox('disable');
                                $('#formGoods #txtst1_smallclass').combobox('disable');
                                $("#btnUp").show();
                                $.messager.alert("提示", result[0].rows[0].message);
                                $('#formGoods #txtst1_id').val(result[0].rows[1].message);
                                $('#formGoods #txtst2_id').val(result[0].rows[2].message);
                                $('#DivGoods').tabs('enableTab', 1);
                                ClearGrid('#tabSKU');
                                //$('#DivGoods').window('close');
                            }
                            $('#tab_list').datagrid("unselectAll");
                            $('#tab_list').datagrid("reload");

                            var button = $('#btnUp');
                            updateFile(button, $('#formGoods').find("#txtst2_skccode").val() + "_" + m_nMaxId);
                        }
                    } catch (ex) {
                        $.messager.alert("提示", ex, 'error');
                    }
                },
                error: function () {
                    $.messager.alert("提示", "提交错误了！", 'error');
                }
            });
            return false;
        }
    });
}

//增加选择
function col_add(text) {
    var selObj = $("#Select");
    selObj.append("<option>" + text + "</option>");
}

// 删除  
function col_delete() {
    var selOpt = $("#Select option:selected");
    selOpt.remove();
    viewSelected();
    formGoodsSubmit('保存');
}

//选择
function selectviw() {
    var selOpt = $("#Select option:selected");
    if (selOpt == undefined || selOpt.length == 0) {
        return;
    } else {
        $('#txtimgupload').html("");
        $("<img style='width:80px;height:90px'/>").appendTo($('#txtimgupload')).attr("src", selOpt[0].innerHTML);
    }
}

//文件上传
function updateFile(button, fileName) {
    new AjaxUpload(button, {
        action: '/Handler_Upload.ashx?filePath=HawkGoods&fileName=' + fileName,
        name: 'myfile',
        onSubmit: function (file, ext) {
            if (!(ext && /^(jpg|JPG|BMP|bmp)$/.test(ext))) {
                alert('图片格式不正确,请选择 jpg,bmp 格式的文件!', '系统提示');
                return false;
            }
            button.val('文件上传中');
            this.disable();
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
            button.val('上传');
            window.clearInterval(interval);
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
                    $('#txtimgupload').html("");
                    var value = result[0].rows[0].message;
                    $("<img style='width:80px;height:90px'/>").appendTo($('#txtimgupload')).attr("src", value);
                    col_add(value);
                    viewSelected();
                    formGoodsSubmit('保存');
                    maxImagepath();

                    updateFile(button, $('#formGoods').find("#txtst2_skccode").val() + "_" + m_nMaxId);
                }
            } catch (ex) {
                $.messager.progress('close');

                $.messager.alert("提示", ex, 'error');
            }
        }
    });
    //文件上传相关-----------------
}

//计算select控件里面所有值，加付给图片路径
function viewSelected() {
    var m_allSelectOption = ""
    var select = document.getElementById('Select')
    for (i = 0; i < select.length; i++) {
        if (i == select.length - 1) {
            m_allSelectOption += select.options[i].text;
        } else {
            m_allSelectOption += select.options[i].text + ",";
        }
    }
    $('#formGoods #txtst2_imagepath').val(m_allSelectOption);
}

//计算图片最大值
function maxImagepath() {
    m_nMaxId = 0;
    var select = document.getElementById('Select')
    for (var i = 0; i < select.length; i++) {
        if (parseInt(select.options[i].text.substr(32, 1)) > m_nMaxId) {
            m_nMaxId = parseInt(select.options[i].text.substr(32, 1));
        }
    }
    m_nMaxId++;
}

//主页查询
function initGird_GoodsSelect() {
    var st1_smallclass = "";
    var st1_largeclass = "";
    var st1_reason = "";
    var st1_Years = $('#formselect #txtst1_years_srh').val().trim();
    var st2_St1_Stylecode = $('#formselect #txtst2_st1_stylecode_srh').val().trim();
    var st1_Supperierstyle = $('#formselect #txtst1_supperierstyle_srh').val().trim();
    var br1_Brandname = $('#formselect #txtbr1_brandname_srh').val().trim();
    var sp1_Bame = $('#formselect #txtsp1_name_srh').val().trim();
    //var st2_upload = $('#formselect #txtst2_upload').combobox('getValue').trim()   //导入状态
    if (zt == "LX" || zt == "RS") {
        st1_smallclass = $('#formselect #txtst1_smallclass_srh').val().trim();
        st1_largeclass = $('#formselect #txtst1_largeclass_srh').val().trim();
    }
    else if (zt == "GL") {
        st1_reason = $('#formselect #txtst1_season_srh').val().trim();
    }

    var url = "1=1";
    if (st1_Years != "") {
        url += " and st1_years like '%" + st1_Years + "%'";
    }
    if (sp1_Bame != "") {
        url += " and st1_suppliercode like '%" + sp1_Bame + "%'";
    }
    if (br1_Brandname != "") {
        url += " and br1_brandname like '%" + br1_Brandname + "%'";
    }
    if (st2_St1_Stylecode != "") {
        url += " and st2_st1_stylecode like '%" + st2_St1_Stylecode + "%'";
    }
    if (st1_Supperierstyle != "") {
        url += " and st1_supperierstyle like '%" + st1_Supperierstyle + "%'";
    }
    if (st1_reason != "" && zt == "GL") {
        url += " and st1_reason like '%" + st1_reason + "%'";
    }
    if (zt == "LX" || zt == "RS") {
        if (st1_smallclass != "") {
            url += " and st1_smallclass like '%" + st1_smallclass + "%'";
        }
        if (st1_largeclass != "") {
            url += " and st1_largeclass like '%" + st1_largeclass + "%'";
        }
    }
    //if (st2_upload == "全部" || st2_upload == "") {
    //    url = url;
    //}
    //else {
    //    url += " and st2_upload like '%" + st2_upload + "%'";
    //}
    url = GetWSRRURL('03eb4ea1-8706-4ec3-b50a-5f9bf0d92846') + "&XML=" + GetFormJson('', 'GoodsInfoForPageList') + "&WHERE=" + escape(url);
    initGird(url);
}

//取消首页筛选
function cancelSelectParam() {
    $('#formselect #txtst1_years').val("");
    $('#formselect #txtst2_st1_stylecode').val("");
    $('#formselect #txtst1_supperierstyle').val("");
    $('#formselect #txtbr1_brandname').val("");
    $('#formselect #txtsp1_name').val("");
}

//日期格式转换
function timeFormatter(date) {
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
function timeParser(date) {
    //var newDate = date.replace("年", "/").replace("月", "/").replace("日", "");
    return date;
}

//生成SKC后,新增尺码
function btnAddSize() {
    var skc = $('#formGoods #txtst2_skccode').val(); //获取skc
    var data = [];
    data[data.length] = { "name": "txtst3_st2_skccode", "value": skc };
    data[data.length] = m_data[0];
    var url = GetWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124') + "&XML=" + GetFormJson(data, 'GETSKULIST');
    $('#tabSKU').datagrid({
        url: url,
        striped: true, //True 奇偶行使用不同背景色
        singleSelect: false,
        onClickCell: onClickCell,
        //onClickRow: onClickRow, //单击事件
        rownumbers: true,
        columns: [[
            { checkbox: true },
            { field: 'st3_st2_skccode', title: 'SKC', width: 100, search: true, sortable: true },
            { field: 'st3_size', title: '尺码', width: 60, search: true, sortable: true },
            { field: 'ct1_keyid', title: '号型', width: 60 },
            { field: 'st3_supperiersize', title: '供应商尺码', width: 70, search: true, sortable: true, editor: 'text' },
            { field: 'st3_skucode', title: 'SKU', width: 120, search: true, sortable: true },
            { field: 'st3_spec', title: '规格', width: 120, search: true, sortable: true, editor: 'text' }
        ]],
        onLoadSuccess: function (data) {
            if (data.rows.length == 1 && data.rows[0].st3_id == "") {
                ClearGrid("#tabSKU");
                $('#formGoods #txtst2_sizegroup').combobox('enable');
            }
            else {
                $('#formGoods #txtst2_sizegroup').combobox('disable');
            }
        }
    });



}
function addSKU() {
    var sizeGroup = $('#formGoods #txtst2_sizegroup').combobox('getValue');  //获取尺码组
    var skc = $('#formGoods #txtst2_skccode').val(); //获取skc
    var data1 = [];
    data1[data1.length] = { "name": "txtct1_optionsvalues", "value": sizeGroup };
    data1[data1.length] = { "name": "txtst3_st2_skccode", "value": skc };
    data1[data1.length] = m_data[0];
    var xmlData = GetFormJson(data1, 'GETSIZE');
    var htmlobj = $.ajax({
        url: GetWSRRURL('7ea4d40d-02fa-43cf-ae3c-8231943f8124'),
        data: { "XML": xmlData },
        type: 'post',
        async: false
    });
    var result = $.parseJSON(htmlobj.responseText);
    if (result.rows.length >= 1 && result.rows[0].ct1_id != "") {
        var griddata = $('#tabSKU').datagrid('getRows');
        var count = 0;
        for (var i = 0; i < result.rows.length; i++) {
            count = 0;
            for (var j = 0; j < griddata.length; j++) {
                if (result.rows[i].ct1_optionsvalues == griddata[j].st3_size) {
                    count++;
                }
            }
            if (count < 1) {
                $('#tabSKU').datagrid('appendRow',
                    {
                        st3_st2_skccode: skc,
                        st3_size: result.rows[i].ct1_optionsvalues,
                        ct1_keyid: result.rows[i].ct1_keyid
                        //st3_skucode: skc + result.rows[i].ct1_keyid
                    });
            }
        }


    }
}

function onClickCell(index, field) {
    if (endEditing()) {
        $('#tabSKU').datagrid('selectRow', index).datagrid('editCell', { index: index, field: field });
        editIndex = index;
    }
}

function endEditing() {
    if (editIndex == undefined) { return true }
    if ($('#tabSKU').datagrid('validateRow', editIndex)) {
        $('#tabSKU').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickRow(rowIndex) {
    if (rowIndex != editIndex) {
        endEditing();
    }
}

function saveSKU() {
    //保存SKU
    endEditing();
    if ($('#tabSKU').datagrid('getChanges').length) {
        var updatedRows = $('#tabSKU').datagrid('getChanges', 'updated');
        var insertedRows = $('#tabSKU').datagrid('getChanges', 'inserted');
        var data = [];
        var xmlData = "";
        for (var i = 0; i < updatedRows.length; i++) {
            data = [];
            data[data.length] = { "name": "txtzt", "value": zt };
            data[data.length] = { "name": "txtst3_id", "value": updatedRows[i].st3_id };
            data[data.length] = { "name": "txtst3_st2_skccode", "value": updatedRows[i].st3_st2_skccode };
            data[data.length] = { "name": "txtst3_size", "value": updatedRows[i].st3_size };
            data[data.length] = { "name": "txtst3_supperiersize", "value": updatedRows[i].st3_supperiersize };
            data[data.length] = { "name": "txtst3_spec", "value": updatedRows[i].st3_spec };
            data[data.length] = { "name": "txtst3_lmuser", "value": m_userName };
            xmlData += MyGetFormJson(data);
        }
        for (var j = 0; j < insertedRows.length; j++) {
            if (insertedRows[j].st3_supperiersize != undefined && insertedRows[j].st3_supperiersize != "") {
                data = [];
                data[data.length] = { "name": "txtst3_id", "value": "" };
                data[data.length] = { "name": "txtst3_st1_stylecode", "value": $('#txtst2_st1_stylecode').val() }
                data[data.length] = { "name": "txtst3_st2_skccode", "value": insertedRows[j].st3_st2_skccode };
                data[data.length] = { "name": "txtst3_size", "value": insertedRows[j].st3_size };
                data[data.length] = { "name": "txtst3_supperiersize", "value": insertedRows[j].st3_supperiersize };
                data[data.length] = { "name": "txtst3_state", "value": 20 };
                data[data.length] = { "name": "txtst3_rguser", "value": m_userName };
                data[data.length] = { "name": "txtst2_supperierskc", "value": $('#txtst2_supperierskc').val() };
                //data[data.length] = { "name": "txtst2_supperierskc", "value": $('#txtst2_supperierskc').val() };
                if (insertedRows[j].st3_spec == undefined) {
                    insertedRows[j].st3_spec = "";
                }
                data[data.length] = { "name": "txtst3_spec", "value": insertedRows[j].st3_spec };
                xmlData += MyGetFormJson(data);
            }

        }
        xmlData = '<ROOT><OPTYPE>AddSKU</OPTYPE><LIST>' + xmlData + '</LIST></ROOT>';
        $.messager.progress({ title: '请稍后', msg: '处理中' });
        $.ajax({
            url: GetWSRRURL('03eb4ea1-8706-4ec3-b50a-5f9bf0d92846'),
            data: { 'XML': xmlData },
            type: 'post',
            async: false,
            success: function (result) {
                try {
                    var result = eval("[" + result + "]");
                    if (result[0].Error) {
                        $.messager.progress('close');
                        if (result[0].Error.indexOf('违反了 UNIQUE KEY 约束') > 0) {
                            result[0].Error = '同一个SKC,供应商尺码不能重复';
                        }
                        $.messager.alert("系统错误", result[0].Error, 'error');
                    }
                    else if (result[0].rows[0].result == "False") {
                        $.messager.progress('close');
                        $.messager.alert("提示", result[0].rows[0].message, 'error');
                    }
                    else {
                        $.messager.progress('close');
                        //保存成功之后,在前台datagrid表中显示SKU
                        ClearGrid("#tabSKU");
                        btnAddSize();
                    }

                } catch (ex) {
                    $.messager.alert("提示", ex, 'error');
                }
            }
        });
    }
}

function daleteSKU() {
    //删除SKU
    //获取选中行
    var checkedItems = $('#tabSKU').datagrid('getChecked');
    var data = [];
    var dltXMLData = "";
    for (var i = 0; i < checkedItems.length; i++) {
        //where = where + "'"+checkedItems.st3_id+"'";
        if (checkedItems[i].st3_id == undefined || checkedItems[i].st3_id == "") {
            var index = $('#tabSKU').datagrid('getRowIndex', checkedItems[i]);
            $('#tabSKU').datagrid('deleteRow', index);
        }
        else {
            data[0] = { "name": "txtst3_id", "value": checkedItems[i].st3_id };
            data[data.length] = { "name": "txtzt", "value": zt };
            data[data.length] = { "name": "txtst3_skucode", "value": checkedItems[i].st3_skucode };
            dltXMLData += MyGetFormJson(data);
        }
    }
    if (dltXMLData != '') { //没有数据时,不进入后台删除
        dltXMLData = '<ROOT><OPTYPE>deleteSKU</OPTYPE><LIST>' + dltXMLData + '</LIST></ROOT>';
        $.messager.progress({ title: '请稍后', msg: '处理中' });
        $.ajax({
            url: GetWSRRURL('03eb4ea1-8706-4ec3-b50a-5f9bf0d92846'),
            data: { 'XML': dltXMLData },
            type: 'post',
            async: false,
            success: function (result) {
                try {
                    var result = eval("[" + result + "]");
                    if (result[0].Error) {
                        $.messager.progress('close');
                        $.messager.alert("系统错误", result[0].Error, 'error');
                    }
                    else if (result[0].rows[0].result == "False") {
                        $.messager.progress('close');
                        $.messager.alert("提示", result[0].rows[0].message, 'error');
                    }
                    else {
                        $.messager.progress('close');
                        for (var j = 0; j < checkedItems.length; j++) {
                            var indexd = $('#tabSKU').datagrid('getRowIndex', checkedItems[j]);
                            $('#tabSKU').datagrid('deleteRow', indexd);
                        }
                    }

                } catch (ex) {
                    $.messager.alert("提示", ex, 'error');
                }
            }
        });
    }
}

function MyGetFormJson(data) {
    var updatedData = '<Rows>'
    if (data != null && data != "") {
        for (var key in data) {
            if (key) {
                if (data[key].specialCharset == true) {
                    updatedData += '<' + data[key].name.substring(3) + '>' + (data[key].value) + '</' + data[key].name.substring(3) + '>';
                }
                else {
                    updatedData += '<' + data[key].name.substring(3) + '>' + ReplaceSpecialXMLString(data[key].value) + '</' + data[key].name.substring(3) + '>';
                }
            }
        }
    }

    updatedData += '</Rows>'
    return updatedData;
}