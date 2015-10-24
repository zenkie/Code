 var m_DatagridID = '#deptgrid'; //部门选择列表ID
 var m_LastIndex = -1;  //部门选择列表最后一次选中行下标  
 var m_PageSize = 20;  //查询记录数
 var m_dlgID = '#deptdlg'; //部门选择窗ID
 var m_dlgOFlag = 0; //是否首次打开标志
 
 
 //状态下拉选择
 var m_protimesZT = [ {statets:'启用',statevs:'启用'},{statets:'禁用',statevs:'禁用'} ];
 var m_depttree = []; //组织架构树
 
 //用户信息
 var m_UserInfo = parent.m_UserInfo;
 

 
 var m_pers = [];

 //选项组 
 var m_DimissionTypes = [];
 var m_DimissionReasons = [];
 var m_BooleanTypes = [];  

 var m_widths = [153, 150, 120, 100, 70, 243]; 


 var m_task = {};
 var m_perinfo = '';

 /***********************************************************************
  *  初始化
  *  DLY 
  */ 
 $(function () { 
     // 滚动条居顶
     parent.sc();
      
     //用户认证
     if (m_UserInfo == undefined || m_UserInfo.userName == undefined) {
         top.location.href = 'error.html';
         return;
     }

      
     //获取基础数据选项
     getTypeItems();
      
     // 设置相关控件 
     setDatebox('#c_dimissiondate'); 
     setCombobox('#c_dimissiontype', m_widths[0], m_widths[0], m_widths[2], false, false, 'c_code', 'c_name', m_DimissionTypes);
     setCombobox('#c_reason', m_widths[5], m_widths[5], m_widths[0], false, false, 'c_code', 'c_name', m_DimissionReasons);     
     
     // 初始化权限数据控制
     setbillInfoByURL(); 
    
     $('#otherdiv').show();
 }); 
 

/***********************************************************************
  *  初始化权限数据控制
  *  DLY 
  */
 function setbillInfoByURL() {
     var flag = false;
     var type = dataUtil_undefinedOrNull(dataUtil_getUrlParam("v0"), '');
     var type1 = dataUtil_undefinedOrNull(dataUtil_getUrlParam("v1"), '');

     //设置页面顶部标签   
     page_pTopDisplay(type, type1, dataUtil_getUrlParam("l1")
         , dataUtil_getUrlParam("l2"), dataUtil_getUrlParam("l3"));

     controlTools(1); //先隐藏所以按钮  
     if (type == 'old' && type1 == "list") {   // 新建调转
         //获取hr人员信息
         var peroid = dataUtil_undefinedOrNull(dataUtil_getUrlParam("v2"), '');
         var row = { c_oid: peroid };
         per = hr_getPer(row);
         setInfo('new', per);
         controlTools(2); 
     } else if (type == 'old1' || type == 'old2') {   // 待办或查询 
         var taskid = dataUtil_undefinedOrNull(dataUtil_getUrlParam("v3"), '');
         var cons1 = ' AND  HR3_ID= \'' + taskid + '\''; 
         var res1 = hr_getTask(cons1);
         if (res1 == '1') {
             alert('未找到对应待办任务信息，请截全屏图发给系统管理员！');
             return flag;
         } else if (res1.hr3_id != undefined && res1.hr3_id != '') {
             m_task = res1;
         } else {
             alert('待办任务信息获取失败，请截全屏图发给系统管理员！');
             return flag;
         }

         var rid = dataUtil_undefinedOrNull(dataUtil_getUrlParam("v2"), '');
         if (rid == '') {
             alert('记录ID无效，请截全屏图发给系统管理员！');
             return;
         }
         var cons = ' AND  HR8_ID= \'' + rid + '\'';
         var res = hr_getPerDimissRecord(cons);
         if (res == '1') {
             alert('未找到对应人员调转信息，请截全屏图发给系统管理员！');
             return flag;
         } else if (res.hr8_id != undefined && res.hr8_id != '') {
             m_perInfo = res; 
         } else {
             alert('人员调转信息获取失败，请截全屏图发给系统管理员！');
             return flag;
         } 

         //设置值
         setInfo('old', m_perInfo);

         //权限控制 
         if (type == 'old1' && m_task.hr3_actor == '申请人') {  //待办，区分申请人和审核人 
             controlTools(3);
         } else if (type == 'old1' && m_task.hr3_actor == '经理') {
             controlTools(4);
         } else if (type == 'old1' && m_task.hr3_actor == '人资') {
             controlTools(4);
         } else {
             controlFields(1); 
         } 
     }
 }
 
 

/***********************************************************************
 *  设置日期控件
 *  DLY 
 */
function setDatebox(field) { 
    $(field).datebox({
        width: m_widths[0],
        closeText: '关闭',
        editable: false,
        formatter: function (date) { 
            return dateUtil_dateFomaterB(date, '-');
        },
        parser: function (s) {
            var t = Date.parse(s);
            if (!isNaN(t)) {
                return new Date(t);
            } else {
                return new Date();
            }
        },
        onChange: function (newValue, oldValue) {
            if (newValue != oldValue) { 
            }
        }
    });
}


/***********************************************************************
 *  设置下拉控件
 *  DLY 
 */
function setCombobox(field, width, pwidth, pheight, edit, multi, vfield, tfield, data) {
    $(field).combobox({
        width: width,
        panelWidth: pwidth,
        panelHeight: pheight,
        editable: edit,
        multiple: multi,
        valueField: vfield,
        textField: tfield,
        data: data
    });
}
 

/***********************************************************************
 *  设置员工信息
 *  DLY 
 */
function setInfo(type, per) {
    if (type == 'new') { 
        $('#hr8_name').html(per.c_name);
        $('#hr8_code').html(per.c_code);
        $('#hr8_unitname').html(per.c_unitname);
        $('#hr8_jobname').html(per.c_jobname);
        $('#c_dimissiondate').datebox('setValue', '');
        $('#c_dimissiontype').combobox('setValue', '');
        $('#c_reason').combobox('setValue', ''); 
        $('#c_protocol').val('');
        $('#c_dimissalinterview').val('');
        $('#c_payment').val('');
        $('#c_documentno').val('');
        $('#c_approach').val(''); 
        $('#c_remark').val('');

        $('#c_oid_dimission').val('');
        $('#c_empoid').val(per.c_oid);

    } else if (type == 'old') { 
        $('#hr8_name').html(per.hr8_name);
        $('#hr8_code').html(per.hr8_code);
        $('#hr8_unitname').html(per.hr8_unitname);
        $('#hr8_jobname').html(per.hr8_jobname);
        $('#c_dimissiondate').datebox('setValue', per.c_dimissiondate);
        $('#c_dimissiontype').combobox('setValue', per.c_dimissiontype);
        $('#c_reason').combobox('setValue', per.c_reason);
        $('#c_protocol').val(per.c_protocol);
        $('#c_dimissalinterview').val(per.c_dimissalinterview);
        $('#c_payment').val(per.c_payment);
        $('#c_documentno').val(per.c_documentno);
        $('#c_approach').val(per.c_approach);
        $('#c_remark').val(per.c_remark);

        $('#c_oid_dimission').val(per.c_oid_dimission);
        $('#c_empoid').val(per.c_empoid); 
        
    }
}


/***********************************************************************
*  工具条及按钮控制
*  DLY 
*/
function controlTools(type) {
    if (type == 1) {    //全不可见  
        $('#bcbtn').hide();
        $('#deptbtn').hide();
        $('#tjbtn').hide();
        $('#shbtn').hide();
        $('#bhbtn').hide(); 
        $('#qxbtn').hide(); 
    } else if (type == 2) { //申请人 - 新建
        $('#bcbtn').show();
        $('#deptbtn').show();
        $('#tjbtn').hide();
        $('#shbtn').hide();
        $('#bhbtn').hide(); 
        $('#qxbtn').hide(); 
    } else if (type == 3) { //申请人 - 待办 
        $('#bcbtn').show();
        $('#deptbtn').show();
        $('#tjbtn').show();
        $('#shbtn').hide();
        $('#bhbtn').hide();
        $('#qxbtn').show(); 
    } else if (type == 4) {  //审批人 - 待办 
        $('#bcbtn').show();
        $('#deptbtn').show();
        $('#tjbtn').hide();
        $('#shbtn').show();
        $('#bhbtn').show();
        $('#qxbtn').show(); 
    }
}


/***********************************************************************
*  控件控制
*  DLY 
*/
function controlFields(type) {
    if (type == 1) {    //全只读 
        $('form').find('input, textarea').prop("disabled", "disabled");  
        $(':checkbox').attr("disabled", true);
        $(':radio').attr("disabled", true); 
        // 设置相关控件 
        $('#c_recordtime').datebox('disable');
        $('#syqEndDate').datebox('disable'); 
        $('#syqMonth').combobox('disable');
        $('#c_type').combobox('disable');
        $('#c_changetype').combobox('disable'); 
        $('#c_newjobname').combobox('disable');   
    }  
}


/***********************************************************************
 *  获取基础选项
 *  DLY 
 */
function getTypeItems() {
    var type14 = hr_getCodeType(14);//离职类别 
    var type18 = hr_getCodeType(18);//离职原因  
     
    var types = '\'0\',' + '\'' + type14 + '\','
              + '\'' + type18 + '\'';
    var row = { c_typecode: types };
    var codeitems = hr_getCodeItems(row);
     
    for (var i = 0; i < codeitems.length; i++) {
        var t1 = codeitems[i].c_typecode.toUpperCase();
        if (t1 == type14.toUpperCase()) {
            m_DimissionTypes.push(codeitems[i]);
        } else if (t1 == type18.toUpperCase()) {
            m_DimissionReasons.push(codeitems[i]);
        }  
    }  
}
 

/***********************************************************************
 *  保存
 *  DLY 
 */
function actSave() {
    var resFlag = false;
    //alert(jsonUtil_form2json('#ryxxForm'));
    //保存校验 并获取记录信息 
    var perInfo = saveCheck();
    if (perInfo == '') {
        return resFlag;
    }
    var flag2 = dataUtil_undefinedOrNull(dataUtil_getUrlParam("v0"), '');
    //alert(jsonUtil_jsonToStr(perInfo[0]));

    //新建申请
    if (flag2 == 'old') { 
        //生成任务行
        var atype = '人员离职'; 

        //保存主表 
        perInfo[0].hr8_id = dataUtil_NewGuid();
        flag1 = hr_savePerDimiss('N', perInfo[0], m_UserInfo.userName);
        if (!flag1) {
            alert('保存人员调转记录失败！')
            return resFlag;
        } 

        var zrow = perInfo[0]; 
        
        var arow = {};
        arow.hr3_id = dataUtil_NewGuid();
        arow.hr3_rid = zrow.hr8_id;
        arow.hr3_type = atype;
        arow.hr3_subject = m_UserInfo.deptName + ' - ' + atype + ' - ' + $('#hr8_name').html();
        arow.hr3_state = '未提交';
        arow.hr3_rguser = m_UserInfo.userName;
        arow.hr3_actor = '申请人';
        arow.hr3_perid = m_UserInfo.deptID;
        //arow.hr3_perid1 = m_UserInfo.empCode1; // 无需大区经理审批
        if (hr_FlowComFlag(m_UserInfo.selfInfo.c_orgid) == '1') { //雅莹特殊控制
            arow.hr3_perid2 = m_UserInfo.empCode1; // 分公司人资 
            arow.hr3_perid1 = m_UserInfo.empCode2; // 便于总部人资查看
        } else {
            arow.hr3_perid1 = m_UserInfo.empCode1; // 分公司人资 
            arow.hr3_perid2 = m_UserInfo.empCode2; // 总部人资
        } 
        arow.hr3_rgdt = dateUtil_dateFomaterA(new Date(), '-');
        arow.hr3_uptno = 0;
        arow.hr3_com = m_UserInfo.selfInfo.c_orgid;
        flag1 = hr_saveTask('N', arow, m_UserInfo.userName);
        if (!flag1) {
            alert('生成待办任务失败！')
            return resFlag;
        }   
        alert('保存成功！');
        
        // 跳转到任务页
        var curlo = 'perDimiss.html?' + 'v0=old1&v1=task&v2=' + zrow.hr8_id
                     + '&v3=' + arow.hr3_id
                     + '&s=' + new Date().getTime();
        parent.menus_turnPage('B', 'tasksPage', curlo);
    } else if (flag2 == 'old1') { 
        var rid = dataUtil_undefinedOrNull(dataUtil_getUrlParam("v2"), '');
        perInfo[0].hr8_id = rid;
        flag1 = hr_savePerDimiss('U', perInfo[0], m_UserInfo.userName);
        if (!flag1) {
            alert('保存人员信息失败！')
            return resFlag;
        }  
        alert('保存成功！');
    } 
    resFlag = true;
    return resFlag;
}


/***********************************************************************
*  保存校验 返回记录信息
*  DLY 
*/
function saveCheck() {
    var res = '';
    var perInfo = eval('[{' + jsonUtil_form2json('#ryxxForm') + '}]'); //获取单据主信息json
    perInfo[0].c_remark = $('#c_remark').val();
    perInfo[0].hr8_code = $('#hr8_code').html();
    perInfo[0].hr8_name = $('#hr8_name').html();
    perInfo[0].hr8_unitname = $('#hr8_unitname').html();
    perInfo[0].hr8_jobname = $('#hr8_jobname').html();

    if (perInfo[0].c_dimissiondate == ''
        || perInfo[0].c_dimissiontype == '') {
        alert( "带 *  的字段都必填!"); 
        return res;
    }  
    res = perInfo;
    return res;
}


/***********************************************************************
*  流程  店长——人资
*  DLY 
*/
function actApprove(type) {
    var flag = false;
    //数据修改校验 
    //$(m_DatagridID).datagrid('endEdit', m_LastIndex);
    //if ($(m_DatagridID).datagrid('getChanges').length > 0) {
    //    alert('数据已修改，请先保存！');
    //    return;
    //}

    var flowType = '';
    //审批操作
    if (hr_FlowComFlag(m_UserInfo.selfInfo.c_orgid) == '3') { //卓莱雅等经过分公司经理环节
        flowType = 'Flow02';
    } else { //其他公司不经过分公司经理环节
        flowType = 'Flow01';
    }

    //流程控制 
    var taskid = dataUtil_undefinedOrNull(dataUtil_getUrlParam("v3"), '');
    var result = hr_flowControl(flowType, type, taskid, m_UserInfo.userName, m_task.hr3_state);
    if (!result.flag) {
        return flag;
    }
    var res = result.res;

    //alert(jsonUtil_jsonToStr(res));
    $.messager.confirm('确认框', '确认' + result.actinfo + '该人员信息吗？', function (r) {
        if (r) {
            //同步到EHR
            if (res.hr3_state == '已完结') {
                var row = { type: "emp", taskid: res.hr3_id, actorid: m_UserInfo.empID };
                var ressjtb = hr_ActDataSync(row);
                if (ressjtb == undefined || ressjtb == "") {
                    alert('EHR数据同步失败！');
                    return flag;
                } else if (ressjtb.flag == '0') {
                    alert('EHR数据同步错误： ' + ressjtb.message);
                    return flag;
                }
            }
            //修改任务信息  
            var flag1 = hr_saveTask('U', res, m_UserInfo.userName);
            if (!flag1) {
                alert(result.actinfo + '失败，请截全屏图发给系统管理员！')
                return flag;
            } 
            alert(result.actinfo + '成功！');
            parent.menus_turnPage('A', 'tasks');
        }
    });
}


/***********************************************************************
 *  关闭
 *  DLY 
 */
function actClose() {
    var type = 'back' //返回上一次记录的链接
    parent.menus_back(type, '', '');
    /* 
    //特殊控制跳转
    var type = dataUtil_undefinedOrNull(dataUtil_getUrlParam("v1"), '');
    var label2 = $('#pTopLabel2').text();  
    if (type == 'task') {
        parent.menus_back(type, label2, 'persons');
    } else {
        parent.menus_itemOnClick('item03_r05', 'rylz');
    }
    */
}

  