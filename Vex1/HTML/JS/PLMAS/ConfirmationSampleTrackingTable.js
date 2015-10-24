﻿/// JS名：ConfirmationSampleTrackingTable.js
/// 说明：确认样跟踪表
/// 创建人：俞佳伟
/// 创建日期：2014-11-15
var m_DDHComboxData = null; //定义订货会季节下拉
var m_username = ""; //定义登入名
var data1;
var editIndex;
var m_zt;
var brand = "";
var outoperation = ""; //外发工序
var group = ""; //小组
var m_states = ""; //状态数据
var m_index = 0;
var EPData = [{ "id": "EP", "text": "EP" }, { "id": "E.Prosper", "text": "E.Prosper" }, { "id": "Kids", "text": "Kids" }];
var DLData = [{ "id": "DoubleLove", "text": "DoubleLove" }];
var m_object = {};
var m_url = '';

$(function () {
    document.onkeydown = check;
    function check(e) {
        var code;
        if (!e) var e = window.event;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        else return;

        if (code == 8) {
            if (
                (event.srcElement.type != "text" &&
                event.srcElement.type != "textarea" &&
                event.srcElement.type != "password") ||
                event.srcElement.readOnly == true) {
                event.keyCode = 0;
                event.returnValue = false;
                return false;
            };
            return true;
        };
    }

    //默认附上时间今天往前面推3个月，开始时间和结束时间
    m_username = $.cookie('m_UserNameC'); //取登入姓名
    m_zt = $.cookie('m_zt')

    
    initBrand();

    initPlanSeason();

    //brand = result.rows;  //获取品牌
    //获取外发工序
    outoperation = $.ajax({
        url: GetWSRRURL('d763e76a-f7e0-4fbc-a2f2-9a9956ecccb9'),
        data: { "XML": GetFormJson([{ "name": "txtzt", "value": m_zt }], 'GETOUTOPERATION') },
        type: 'post',
        async: false
    });
    outoperation = $.parseJSON(outoperation.responseText);


    

    //初始化品类下拉数据
    $('#txtcategory').combobox({
        url: GetComboxWSRRURL('d763e76a-f7e0-4fbc-a2f2-9a9956ecccb9', '', 'category', 'category') + "&XML=" + GetFormJson([{ "name": "txtzt", "value": m_zt }], 'GETCATEGORY'),
        valueField: 'id',
        textField: 'text',
        panelHeight: '200',
        editable: true,
        required: true,
        multiple: true, //多选
        async: true //异步
        //onLoadSuccess: function (data) {
        //    //            data1 = $('#txtcategory').combobox('getData');
        //    $('#txtcategory').combobox('setValue', data[0].text);
        //}
        ////,onSelect: function (rec) { var val = $('#txtcategory').combobox('getValues').join('#'); }
    });




});

//初始化品牌
function initBrand() {

    $("#txtbrand").combobox({
        url: GetComboxWSRRURL('d763e76a-f7e0-4fbc-a2f2-9a9956ecccb9', "", "cbstky", "cbstky") + "&XML=" + GetFormJson([{ "name": "txtzt", "value": m_zt }], 'GetBrand'),
        valueField: 'id',
        textField: 'text',
        width: '100',
        panelHeight: 'auto',
        editable: false,
        required: true,
        async: false,//同步
        onSelect: function (record) {
            getSampleWorker(record.text);
            ChangeDHHJJ();
        }
    });

    //初始化默认品牌
    var xmlData = GetFormJson([{ "name": "txtzt", "value": m_zt }], 'GetOwnedBrand');
    htmlobj = $.ajax({
        url: GetWSRRURL('d763e76a-f7e0-4fbc-a2f2-9a9956ecccb9'),
        data: { "XML": xmlData },
        type: 'post',
        async: false
    });
    var result = $.parseJSON(htmlobj.responseText),
        brand = result.rows[0].message,  //默认获取品牌
        brandType = typeof brand;
    if (brandType != "undefined") {
        $("#txtbrand").combobox("setValue", brand);
        getSampleWorker();
    }
};

function initPlanSeason() {
    ////初始化订货会下拉数据
    $('#txtcmbdhhjj').combobox({
        url: GetComboxWSRRURL('bd4c0ca6-42c7-4e5c-a432-515b63f5cc16', "", "orderseason", "orderseason") + "&DIVI=" + m_zt,
        valueField: 'id',
        textField: 'text',
        panelHeight: '200',
        editable: true,
        required: true,
        async: true, //异步
        onLoadSuccess: function (data) {
            if (m_DDHComboxData == null) {
                m_DDHComboxData = data;
                ChangeDHHJJ(); //按照品牌控制季节下拉
            }
            data1 = $('#txtcmbdhhjj').combobox('getData');
            $('#txtcmbdhhjj').combobox('setValue', data1[data1.length - 1].text);
            var zt = $('#txtcmbdhhjj').combobox('getText').toString().replaceAll(" ", "").split("-")[1];

            //initGird();
            //获取状态数据
            //var zt = $('#txtcmbdhhjj').combobox('getText').toString().replaceAll(" ", "").split("-")[1];
            var stateData = [];
            stateData[stateData.length] = { "name": "txt操作类型", "value": "CONFIRMSAMPLE_STAT_LIST" };
            stateData[stateData.length] = { "name": "txt实体", "value": "GETEFFECT" };
            stateData[stateData.length] = { "name": "txt品牌", "value": zt };
            var xmlData = GetDBFrameAML(stateData);
            var result = $.ajax({
                url: GetWSRRURL('9e30352a-4456-4287-9034-86a09926d8d5') + xmlData,
                type: 'post',
                async: false
            });
            m_states = $.parseJSON(result.responseText);

            //初始化当前状态下拉数据
            $('#txtstate').combobox({
                data: m_states.rows,
                panelHeight: '200',
                valueField: 'cbstid',
                textField: 'cbtx40',
                multiple: true  //多选
            });
        },
        onSelect: function (data) {
            var zt = data.text.replaceAll(" ", "").split("-")[1];
            //获取小组
            if (zt == 'EP') {
                group = $.ajax({
                    url: GetWSRRURL('d763e76a-f7e0-4fbc-a2f2-9a9956ecccb9'),
                    data: { "XML": GetFormJson([{ "name": "txtzt", "value": zt }], 'GETSAMPLEGROUP') },
                    type: 'post',
                    async: false
                });
                group = $.parseJSON(group.responseText);
            }
            if (zt == 'E.Prosper') {
                var data = [];
                data[data.length] = { "name": "txt操作类型", "value": "SAMPLEMAKER_LIST" };
                data[data.length] = { "name": "txt实体", "value": "GETEFFECT" };
                data[data.length] = { "name": "txt品牌", "value": zt };
                var xmlData = GetDBFrameAML(data);
                group = $.ajax({
                    url: GetWSRRURL('9e30352a-4456-4287-9034-86a09926d8d5') + xmlData,
                    type: 'post',
                    async: false
                });
                group = $.parseJSON(group.responseText);
                //m_object = { panelHeight: "auto", valueField: "cbstky", textField: "cbstky", data: group.rows }
            }
            if (zt == 'E.Prosper') {
                m_object = { panelHeight: "auto", valueField: "cbstky", textField: "cbstky", data: group.rows };
            }
            else {
                m_object = { panelHeight: "auto", valueField: "cbtx40", textField: "cbtx40", data: group.rows };
            }

            ////初始化版师下拉数据
            //$('#txtdivision').combobox({
            //    url: GetComboxWSRRURL('d763e76a-f7e0-4fbc-a2f2-9a9956ecccb9', '', 'ownedcode', 'usernamec') + "&XML=" + GetFormJson([{ "name": "txtzt", "value": m_zt }, { "name": "txtOwnedBrand", "value": zt }], 'GetPattern'),
            //    valueField: 'id',
            //    textField: 'text',
            //    panelHeight: '200',
            //    editable: true,
            //    required: true,
            //    multiple: true, //多选
            //    async: true //异步
            //});
            //加载确认样状态
            var stateData = [];
            stateData[stateData.length] = { "name": "txt操作类型", "value": "CONFIRMSAMPLE_STAT_LIST" };
            stateData[stateData.length] = { "name": "txt实体", "value": "GETEFFECT" };
            stateData[stateData.length] = { "name": "txt品牌", "value": zt };
            var xmlData = GetDBFrameAML(stateData);
            var result = $.ajax({
                url: GetWSRRURL('9e30352a-4456-4287-9034-86a09926d8d5') + xmlData,
                type: 'post',
                async: false
            });
            m_states = $.parseJSON(result.responseText);
            $('#txtstate').combobox({
                data: m_states.rows,
                panelHeight: '200',
                valueField: 'cbstid',
                textField: 'cbtx40',
                multiple: true  //多选
            });
        }
    });
}
function getSampleWorker() {
    var brand = $("#txtbrand").combobox("getValue");
    //初始化版师下拉数据
    $('#txtdivision').combobox({
        url: GetComboxWSRRURL('d763e76a-f7e0-4fbc-a2f2-9a9956ecccb9', '', 'ownedcode', 'usernamec') + "&XML=" + GetFormJson([{ "name": "txtzt", "value": m_zt }, { "name": "txtBrand", "value": brand }], 'GetPattern'),
        valueField: 'id',
        textField: 'text',
        width: 100,
        panelHeight: '200',
        editable: true,
        required: true,
        multiple: true, //多选
        async: true //异步
    });
}
//按照品牌控制季节下拉数据
function ChangeDHHJJ() {
    var brand = $('#txtbrand').combobox("getValue");
    if (m_DDHComboxData == null) {
        return;
    }
    var data = m_DDHComboxData;
    var data1 = [];
    //for (var j = 0; j < brand.length; j++) {
        //if (brand[j].ownedbrand.substr(0, 2) == "EP") {
        //    brand[j].ownedbrand = "EP"
        //}
        //else if (brand[j].ownedbrand.substr(0, 2) == "E.P") {
        //    brand[j].ownedbrand = "E.Prospe"
        //}
        //else if (brand[j].ownedbrand.substr(0, 2) == "Do") {
        //    brand[j].ownedbrand = "Do"
        //}
        //else if (brand[j].ownedbrand.substr(0, 2) == "Ki") {
        //    brand[j].ownedbrand = "Kids"
        //}
    for (var i = 0; i < data.length; i++) {
        if (data[i].id.toString().indexOf(brand) > 0) {
            data1.push(data[i]);
        }
    }
    $('#txtcmbdhhjj').combobox("loadData", data1);//重加载季节下拉数据

}

function LoadDataClick() {
    var dhhjj = $('#txtcmbdhhjj').combobox("getText").toString().replaceAll(" ", "").split("-");
    var m_dhhjj = dhhjj[1] + dhhjj[0] + dhhjj[2];
    var category = $('#txtcategory').combobox('setText', $('#txtcategory').combobox("getText")).combobox('getValues');
    var cat = '';
    if (category.length > 0) {
        cat = '#' + category[0].substr(0, 1) + '#';
        for (var i = 1; i < category.length; i++) {
            cat = cat + ',#' + category[i].substr(0, 1) + '#';
        }
        cat = '(' + cat + ')';
    }
    var divisions = $('#txtdivision').combobox('setText', $('#txtdivision').combobox('getText')).combobox('getValues'); //获取版师
    var designer = '';
    if (divisions.length > 0) {
        designer = '#' + divisions[0] + '#';
        for (var i = 1; i < divisions.length; i++) {
            designer = designer + ',#' + divisions[i] + '#';
        }
        designer = '(' + designer + ')';
    }
    var beginDate = $('#beginDate').datebox('getText'); //获取上货开始时间
    var endDate = $('#endDate').datebox('getText');   //获取上货结束事件
    var stateArrs = $('#txtstate').combobox('getValues');      //获取状态
    var state = '';  //转换格式为#...#
    if (stateArrs.length > 0) {
        state = '#' + stateArrs[0] + '#';
        for (var j = 1; j < stateArrs.length; j++) {
            state = state + ',#' + stateArrs[j] + '#';
        }
        state = '(' + state + ')';
    }

    var data = [];
    data[data.length] = { "name": "txtMethod", "value": "GetProductOttList" };
    data[data.length] = { "name": "txtOrderSeason", "value": m_dhhjj }; // $('#txtcmbdhhjj').combobox("getValue")
    data[data.length] = { "name": "txt用户", "value": m_username };
    data[data.length] = { "name": "txt品类", "value": cat, specialCharset: true };
    data[data.length] = { "name": "txt版师", "value": designer, specialCharset: true }; //版师
    data[data.length] = { "name": "txt上货日期1", "value": beginDate.replace(/-/g, '') };
    data[data.length] = { "name": "txt上货日期2", "value": endDate.replace(/-/g, '') };
    data[data.length] = { "name": "txt当前状态", "value": state, specialCharset: true };
    initGird(data);
}

function initGird(data) {
    ClearGrid('#tabList');
    var xmlData = GetDBFrameAML(data);
    m_url = GetWSRRURL('9e30352a-4456-4287-9034-86a09926d8d5') + xmlData;
    $('#tabList').datagrid(
        {
            url: m_url,
            nowrap: true, //是否换行，True 就会把数据显示在一行里
            striped: true, //True 奇偶行使用不同背景色
            collapsible: false, //可折叠
            remoteSort: true, //定义是否从服务器给数据排序
            fit: true,
            rownumbers: true, //行号
            singleSelect: true, //单行选择 
            onDblClickCell: onDblClickCell,//双击事件
            //onDblClickRow: onDblClickRow, //
            onClickRow: onClickRow, //单击事件
            frozenColumns: [[
                { field: 'timeseries', title: '小系列', width: 50 },
                { field: 'listingdate', title: '上货日期', width: 90 },
                { field: 'productname', title: '款号', width: 90 },
                { field: 'measurementsid', title: '样板号', width: 80 },
                { field: 'measurementsid_1', title: '研发样板号', width: 100, editor: { type: 'text' } }
                //{ field: 'patternerid', title: '版师号', width: 60 }
            ]],
            columns: [[
                //{ field: 'designerid', title: '设计师号', width: 60 },
                //{ field: 'marketseries', title: '系列', width: 50 },
                //{ field: 'category', title: '品类', width: 50 },
                //{ field: 'outsuppliers', title: '外包供应商', width: 80, editor: { type: 'text'} },
                { field: 'stylesclass', title: 'AB类', width: 50 },
                //{ field: 'fabricopinion', title: '面辅料意见', width: 80, editor: { type: 'text'} },
                { field: 'plansadjusttime', title: '计划调板进度', width: 80, editor: { type: 'datebox', options: { formatter: DateFormat, parser: DateParser } } },
                { field: 'plansadjustdesp', title: '当前状态', width: 200, editor: { type: 'combobox', options: { panelHeight: "auto", valueField: "cbtx40", textField: "cbtx40", data: m_states.rows } } },
                { field: 'deliverdate', title: '调板进度', width: 80, editor: { type: 'datebox', options: { formatter: DateFormat, parser: DateParser } } },
                //{ field: 'patternerdesp', title: '版师意见', width: 80, editor: { type: 'text'} },
                //{ field: 'samplegrouptime', title: '已发样衣组', width: 80, editor: { type: 'datebox', options: { formatter: DateFormat, parser: DateParser}} },
                //{ field: 'samplegroupdesp', title: '已发样衣组备注', width: 80, editor: { type: 'text' }, formatter: function (value) {
                    //if (value == undefined || value == '1900-01-01') {
                        //return "";
                    //}
                    //else {
                        //return value;
                   // }
                //}
               // },
                //{ field: 'outoperation', title: '外发工序', width: 80, editor: { type: 'combobox', options: { panelHeight: "auto", valueField: "cbtx40", textField: "cbtx40", data: outoperation.rows}} }, //下拉
                { field: 'samplingtime', title: '制作日期', width: 80, editor: { type: 'datebox', options: { formatter: DateFormat, parser: DateParser } } },
                { field: 'samplegroup', title: '小组/样衣工', width: 80, editor: { type: 'combobox', options: m_object } }, //下拉
                { field: 'accessoryopinion', title: '缺面辅料', width: 120, editor: 'text' },
                { field: 'planpsampletime', title: '计划发大货', width: 80, editor: { type: 'datebox', options: { formatter: DateFormat, parser: DateParser } } },
                { field: 'actualpsanpletime', title: '实际发大货', width: 120, editor: { type: 'datebox', options: { formatter: DateFormat, parser: DateParser } } },
                { field: 'generalsampledesp', title: '确认样发放意见', width: 200, editor: 'text' },
                { field: 'sended', title: '已发', width: 50 },
                { field: 'totalparagraph', title: '总款', width: 50 },
                { field: 'delivered', title: '已调', width: 50 },
                //{ field: 'reindex', title: '重做次数', width: 50 },
                //{ field: 'duplicate', title: '同款', width: 50 },
                { field: 'cancel', title: '取消', width: 50, editor: { type: 'combobox', options: { valueField: "value", textField: "id", data: [{ "id": 0, "value": 0 }, { "id": 1, "value": 1 }], panelHeight: "50" } } } //下拉
                //{ field: 'sweater', title: '毛衫', width: 50 },
                //{ field: 'outsourcing', title: '全外包', width: 50, editor: { type: 'combobox', options: { valueField: "value", textField: "id", data: [{ "id": 0, "value": 0 }, { "id": 1, "value": 1 }], panelHeight: "50" } } }//下拉
            ]],
            toolbar: [
            {
                id: 'btnSave',
                text: '保存数据',
                iconCls: 'icon-save',
                handler: function () {
                    //searchBOM();
                    saveData();
                }
            }],
            onLoadSuccess: function (data) {
                if (data.rows.length == 1 && data.rows[0].productname == "") {
                    ClearGrid("#tabList");
                    $.messager.alert("提示", "无相关数据!");
                }

            },
            rowStyler: function (index, row) {
                if (row.cancel == 1) {  //取消显示红色
                    return 'background-color:#d44864;color:#000000;';
                    //return 'background-color: #FF0000;font-weight:bold;';
                }
                if (row.sended == 1) {  //已发显示灰色
                    return 'background-color:#CCCCCC;color:#000000;';
                    //return 'backgroud-color:#CCCCCC;font-weight:bold;';
                }
                if (row.duplicate == 1) { //同款显示深灰
                    return 'background-color:#434343;color:#FFFFFF;';
                    //return 'backgroud-color:#FFFF00;font-weight:bold;';
                }

            }
        }
        );
}

//单击选中行，并去掉编辑模式
function onClickRow(rowIndex) {
    if (rowIndex != editIndex) {
        endEditing();
    }
}

function endEditing() {
    if (editIndex == undefined) { return true }
    if ($('#tabList').datagrid('validateRow', editIndex)) {
        $('#tabList').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
function onDblClickCell(index, field) {
    if (endEditing()) {
        $('#tabList').datagrid('selectRow', index)
                        .datagrid('editCell', { index: index, field: field });
        editIndex = index;
    }
}

//保存修改数据
function saveData() {
    endEditing();
    if ($('#tabList').datagrid('getChanges').length) {
        var updatedRow = $('#tabList').datagrid('getChanges', "updated");
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var strxml1 = '';
        var strxml2 = '';
        var strxml3 = '';
        for (var p = 0; p < updatedRow.length; p++) {
            data1 = [];
            data2 = [];
            data3 = [];
            data1[data1.length] = { "name": "txtProductName", "value": updatedRow[p].productname };
            data1[data1.length] = { "name": "txtStylesClass", "value": updatedRow[p].stylesclass };
            data1[data1.length] = { "name": "txtPatternerId", "value": updatedRow[p].patternerid };
            data1[data1.length] = { "name": "txtMeasurementsId_1", "value": updatedRow[p].measurementsid_1 };
            data1[data1.length] = { "name": "txtOutsourcing", "value": updatedRow[p].outsourcing };
            data1[data1.length] = { "name": "txtCancel", "value": updatedRow[p].cancel };
            data1[data1.length] = { "name": "txtTimeSeries", "value": updatedRow[p].timeseries };
            data1[data1.length] = { "name": "txtListingDate", "value": updatedRow[p].listingdate };
            data1[data1.length] = { "name": "txtOutsuppliers", "value": updatedRow[p].outsuppliers };

            data2[data2.length] = { "name": "txtProductName", "value": updatedRow[p].productname };
            data2[data2.length] = { "name": "txtPlanPSampleTime", "value": updatedRow[p].planpsampletime };
            data2[data2.length] = { "name": "txtActualPSanpleTime", "value": updatedRow[p].actualpsanpletime };
            data2[data2.length] = { "name": "txtSamplingTime", "value": updatedRow[p].samplingtime };
            data2[data2.length] = { "name": "txtSampleGroupTime", "value": updatedRow[p].samplegrouptime };
            data2[data2.length] = { "name": "txtPlansAdjustTime", "value": updatedRow[p].plansadjusttime };
            data2[data2.length] = { "name": "txtDeliverDate", "value": updatedRow[p].deliverdate };

            data3[data3.length] = { "name": "txtProductName", "value": updatedRow[p].productname };
            data3[data3.length] = { "name": "txtGeneralSampleDesp", "value": updatedRow[p].generalsampledesp };
            data3[data3.length] = { "name": "txtSampleGroupTime", "value": updatedRow[p].samplegrouptime };
            data3[data3.length] = { "name": "txtPatternerDesp", "value": updatedRow[p].patternerdesp };
            data3[data3.length] = { "name": "txtAccessoryOpinion", "value": updatedRow[p].accessoryopinion };
            data3[data3.length] = { "name": "txtFabricOpinion", "value": updatedRow[p].fabricopinion };
            data3[data3.length] = { "name": "txtPlansAdjustDesp", "value": updatedRow[p].plansadjustdesp };
            data3[data3.length] = { "name": "txtSampleGroup", "value": updatedRow[p].samplegroup };
            data3[data3.length] = { "name": "txtOutOperation", "value": updatedRow[p].outoperation };
            // 将ob对象转换成xml
            strxml1 += MyGetFormJson(data1);
            strxml2 += MyGetFormJson(data2);
            strxml3 += MyGetFormJson(data3);
        }

        strxml1 = '<ROOT><LIST>' + strxml1 + '</LIST></ROOT>';
        strxml2 = '<ROOT><LIST>' + strxml2 + '</LIST></ROOT>';
        strxml3 = '<ROOT><LIST>' + strxml3 + '</LIST></ROOT>';

        var data = [];
        data[data.length] = { "name": "txtMethod", "value": "UpdateList" };
        data[data.length] = { "name": "txtProductInfoList", "value": strxml1, specialCharset: true };
        data[data.length] = { "name": "txtProductOttInfoList", "value": strxml2, specialCharset: true };
        data[data.length] = { "name": "txtProductOttTextList", "value": strxml3, specialCharset: true };
        data[data.length] = { "name": "txt用户", "value": m_username };


        //            var kkkk = GetDBFrameAML(data);
        $.ajax({
            url: GetWSRRURL('9e30352a-4456-4287-9034-86a09926d8d5'),
            type: 'post',
            data: GetDBFrameAMLPost(data),
            async: false, //异步,
            success: function (m) {
                $('#tabList').datagrid("reload");
                $.messager.alert("提示", "成功!");
            },
            error: function (er) {
                $.messager.alert("警告", "失败!");
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

//日期格式转换2014-11-11
function DateFormat(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + "-" + (m < 10 ? ("0" + m) : m) + "-" + (d < 10 ? ("0" + d) : d);
}

//日期控件DateBox的解释器
function DateParser(s) {
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}

//点击状态维护、样衣师维护按钮  弹出各自的维护界面
function btnShowEditWindow(which) {
    if (which == 'state') {
        $('#StateWin').window('open');
        //初始化品牌

        $('#txtbrand1').combobox({
            panelHeight: 'auto',
            editable: false,
            valueField: 'id',
            textField: 'text',
            required: true
        });

        if (m_zt == "EP") {
            $('#txtbrand1').combobox('loadData', EPData);
        }
        else if (m_zt == "DL") {
            $('#txtbrand1').combobox('loadData', DLData);
        }
    }
    else {
        $('#DivisionWin').window('open');
        //初始化品牌
        $('#txtbrand2').combobox({
            panelHeight: 'auto',
            editable: false,
            valueField: 'id',
            textField: 'text',
            required: true
        });
        if (m_zt == "EP") {
            $('#txtbrand2').combobox('loadData', EPData);
        }
        else if (m_zt == "DL") {
            $('#txtbrand2').combobox('loadData', DLData);
        }
        //初始化当前状态下拉数据
        //$('#txtstate2').combobox({
        //    data: m_states.rows,
        //    panelHeight: '200',
        //    valueField: 'cbstid',
        //    textField: 'cbtx40'
        //});      
    }
}

//确认样状态维护、样衣师维护 界面 查询按钮事件
function btnSearch(which) {
    var url = '';
    var data = [];

    if (which == 'state') {
        data[data.length] = { "name": "txt操作类型", "value": "CONFIRMSAMPLE_STAT_LIST" };
        data[data.length] = { "name": "txt实体", "value": "GETALL" };
        data[data.length] = { "name": "txt品牌", "value": $('#txtbrand1').combobox('getValue') };
        url = GetWSRRURL('9e30352a-4456-4287-9034-86a09926d8d5') + GetDBFrameAML(data);
        InitGrid_StateList(url);
    }
    else {
        data[data.length] = { "name": "txt操作类型", "value": "SAMPLEMAKER_LIST" };
        data[data.length] = { "name": "txt实体", "value": "GETALL" };
        data[data.length] = { "name": "txt品牌", "value": $('#txtbrand2').combobox('getValue') };
        url = GetWSRRURL('9e30352a-4456-4287-9034-86a09926d8d5') + GetDBFrameAML(data);
        InitGrid_DivisionList(url);
    }
}

//确认样状态维护界面  表数量加载
function InitGrid_StateList(url) {
    $('#tabStateList').datagrid({
        url: url,
        striped: true, //True 奇偶行使用不同背景色
        rownumbers: true, //行号
        singleSelect: true,
        fit: true,
        onSelect: onSelect_State,
        columns: [[
            { field: "cbstid", title: "序号", editor: { type: 'validatebox', options: { required: true } } },
            { field: "cbtx40", title: "状态名", editor: { type: 'validatebox', options: { required: true } } },
            { field: "cbstky", title: "归属品牌", editor: { type: 'validatebox', options: { required: true } } },
            {
                field: "cbstat", title: "当前状态",
                editor: {
                    type: 'combobox',
                    options: { panelHeight: 'auto', valueField: 'id', textField: 'name', data: [{ id: '0', name: '0' }, { id: '1', name: '1' }], required: true }
                }
            }
        ]],
        onLoadSuccess: function (data) {
            if (data.rows.length == 1 && data.rows[0].cbstid == "") {
                ClearGrid("#tabStateList");
            }
        }
    });
}

//确认样状态维护界面  表数量加载
function InitGrid_DivisionList(url) {
    $('#tabDivisionList').datagrid({
        url: url,
        striped: true, //True 奇偶行使用不同背景色
        rownumbers: true, //行号
        singleSelect: true,
        onSelect: onSelect_Division,
        fit: true,
        columns: [[
            //{ field: "cbstid", title: "序号", editor: { type: 'validatebox', options: { required: true } } },
            { field: "cbstky", title: "样衣师姓名", editor: { type: 'validatebox', options: { required: true } } },
            { field: "cbtx40", title: "归属品牌", editor: { type: 'validatebox', options: { required: true } } },
            {
                field: "cbtx15", title: "生产类型", editor: {
                    type: 'combobox', options: { panelHeight: 'auto', valueField: 'id', textField: 'name', data: [{ id: '自产', name: '自产' }, { id: '外包', name: '外包' }], required: true }
                }
            },
            {
                field: "cbstat", title: "当前状态", editor: {
                    type: 'combobox',
                    options: { panelHeight: 'auto', valueField: 'id', textField: 'name', data: [{ id: '0', name: '0' }, { id: '1', name: '1' }], required: true }
                }
            }
        ]],
        onLoadSuccess: function (data) {
            if (data.rows.length == 1 && data.rows[0].cbstky == "") {
                ClearGrid("#tabDivisionList");
            }
        }
    });
}

//确认样状态维护界面、样衣师维护界面 新增
function btnNewAddData(which) {
    if (!$('#' + which).datagrid('validateRow', m_index)) {
        return false;
    }
    $('#' + which).datagrid('appendRow', {
        cbstid: '',
        cbstky: '',
        cbtx40: '',
        cbtx15: '',
        cbstat: ''
    });
    $('#' + which).datagrid('endEdit', m_index);
    m_index = $('#' + which).datagrid('getRows').length - 1;
    $('#' + which).datagrid('beginEdit', m_index);
}

//确认样状态维护界面、样衣师维护界面 变更事件
function btnEdit(which) {
    var getEditRow = $('#' + which).datagrid('getSelected');
    if (getEditRow.cbstid != '' || getEditRow.cbstid != undefined) {
        var index = $('#' + which).datagrid('getRowIndex', getEditRow);
        $('#' + which).datagrid('beginEdit', index);
    }
    else {
        alert('请选择需要变更的数据');
    }
}

//确认样状态维护界面、样衣师维护界面 保存事件
function btnSave(which) {
    if (!$('#' + which).datagrid('validateRow', m_index)) {
        alert('不能为空');
        return false;
    }
    $('#' + which).datagrid('endEdit', m_index);
    var insertRow = $('#' + which).datagrid('getChanges', 'inserted');
    var updateRow = $('#' + which).datagrid('getChanges', 'updated');
    var data = [];
    if (which == 'tabStateList') {
        data[data.length] = { "name": "txt操作类型", "value": "CONFIRMSAMPLE_STAT_LIST" };
    }
    else {
        data[data.length] = { "name": "txt操作类型", "value": "SAMPLEMAKER_LIST" };
    }
    data[data.length] = { "name": "txt实体", "value": "SAVE" };
    data[data.length] = { "name": "txtINSERT", "value": GetEditJsonbyType(insertRow).toUpperCase(), specialCharset: true };
    data[data.length] = { "name": "txtUPDATE", "value": GetEditJsonbyType(updateRow).toUpperCase(), specialCharset: true };

    //return;
    $.ajax({
        url: GetWSRRURL('9e30352a-4456-4287-9034-86a09926d8d5'),
        type: 'post',
        async: false, //异步,
        data: GetDBFrameAMLPost(data),
        success: function (result) {
            try {
                var result = eval("[" + result + "]");
                if (result[0].Error) {
                    $.messager.alert("提示", "提交错误了！", 'error');
                }
                else if (result[0].rows[0].result == "False") {
                    $.messager.alert("提示", "提交错误了！", 'error');
                }
                else {
                    $('#' + which).datagrid("reload");
                    $.messager.alert("提示", "成功!");
                }
            }
            catch (ex) {
                $.messager.alert("提示", ex, 'error');
            }

        },
        error: function () {
            $.messager.alert("提示", "提交错误了！", 'error');
        }
    });
}

//确认样状态维护界面表数据 单击选择时触发事件
function onSelect_State(index, row) {
    if (!$('#tabStateList').datagrid('validateRow', m_index)) {
        if (($('#tabStateList').datagrid('getRows').length - 1) == m_index) {
            $('#tabStateList').datagrid('deleteRow', m_index);
        }
        else {
            alert('不能为空');
            return false;
        }
    }
    if (index != m_index) {
        $('#tabStateList').datagrid('endEdit', m_index);
        m_index = index;
    }
}

//样衣师维护界面表数据 单击选择时触发事件
function onSelect_Division(index, row) {
    if (!$('#tabDivisionList').datagrid('validateRow', m_index)) {
        if (($('#tabDivisionList').datagrid('getRows').length - 1) == m_index) {
            $('#tabDivisionList').datagrid('deleteRow', m_index);
        }
        else {
            alert('不能为空');
            return false;
        }
    }
    if (index != m_index) {
        $('#tabDivisionList').datagrid('endEdit', m_index);
        m_index = index;
    }
}


//导出
function excelExport() {

    var listData = $('#tabList').datagrid('getRows')

    if (listData.length <= 1 || listData == undefined) {
        alert("请先加载数据");
        return;
    }

    EasyUI_DataGrid_ExcelExport1($('#tabList'), $('#tabList'));
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
    //if (btnExcel == null) {
    //    return;
    //}

    var dataOptions = pgrid.datagrid("options");


    var strUrl = m_url;

    //var strUrl = dataOptions.url;
    var dataColumns = dataOptions.columns;
    var dataColumnsFrozen = dataOptions.frozenColumns;
    var dataParam = dataOptions.queryParams;
    var pageSize = dataOptions.pageSize;
    var pageNumber = dataOptions.pageNumber;
    //var title = dataOptions.title;
    var title = "确认样跟踪表";

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

            //if (dataColumns[0][i].align) {
            //    strXMLCol += "<align>" + dataColumns[0][i].align + "</align>";
            //}
            //else {
            //    strXMLCol += "<align>left</align>";
            //} 


            //if (dataColumns[0][i].halign) {
            //    strXMLCol += "<halign>" + dataColumns[0][i].halign + "</halign>";
            //}
            //else {
            //    strXMLCol += "<halign>center</halign>";
            //}
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
        }
    });
}