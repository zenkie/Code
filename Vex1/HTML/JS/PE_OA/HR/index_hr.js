/* 全局变量*/
var m_a3bgcolor = 'rgba(255,255,255,0)'; //页面链接a3初始背景rgba(255,255,255,0)
var m_a3bgcolor1 = '#b5c6e2'; //页面链接a3选中背景fcb262
var m_a3fontcolor = '#b0a8a8'; //页面链接a3初始字体颜色
var m_a3fontcolor1 = '#000'; //页面链接a3选中字体颜色

//获取用户名
var m_UserInfo = {};

var loginurl = hr_getServUrl(1);


var m_taskTypes = hr_getBaseItems(3);
var m_states = hr_getBaseItems(2);
var m_actors = hr_getBaseItems(1);


var m_sonfilter = {type: ''};


/***********************************************************************
 *  初始化
 *  DLY 
 */ 
$(function () { 
    //用户认证
    getUserInfo(); 
    $('#userNameSpan').html(m_UserInfo.userName);
    $('#comSpan').html(m_UserInfo.com);
    sc();
    // 非店长隐藏加班申请页
    if (m_UserInfo.actor != 'A') {
        $('#overtimesApplyPage').hide();
    }
    // 非人资隐藏权限配置页
    if (m_UserInfo.actor != 'C') {
        $('#sysconfigPage').hide();
    }
    turnPage('A', 'tasks');
}); 
 


/*********************************************************************** 
 * 滚动条在居顶
 * DLY
 */
function sc() {
    //var e = document.getElementById("body"); 
    //e.scrollTop = -10;
    //alert($('#body').scrollTop());
    //$('#body').scrollTop(0); 
    document.getElementById('topdiv').scrollIntoView(); 
}


/*********************************************************************** 
 * 切换页面
 * DLY
 */
function turnPage(type, page, curl) { 
    var url = 'error.html'; 
    if (type == 'A') {
        if (page == undefined || page == null) {
            page = '';
        }
        //$('.a3').css("background-color", m_a3bgcolor);
        $('.a3').css("color", m_a3fontcolor);
        if (page != '') {
           // $('#' + page + 'Page').css("background-color", m_a3bgcolor1);
            $('#' + page + 'Page').css("color", m_a3fontcolor1);
            url = page + '.html' + '?s=' + new Date().getTime();
        }
    } else if (type == 'B') { 
        if (curl == undefined || curl == null) {
            curl = '';
        }
        $('.a3').css("background-color", m_a3bgcolor);
        $('.a3').css("color", m_a3fontcolor1);
        if (curl != '') {
            //$('#' + page + 'Page').css("background-color", m_a3bgcolor1);
            $('#' + page + 'Page').css("color", m_a3fontcolor1);
            url = curl;
        }
    }
    
    // 非店长切换人员查询页
    if (m_UserInfo.actor != 'A') { 
        url = url.replace('persons.html', 'personsQ.html');
    }
    document.getElementById('openhere').src = url;
    sc();
}
  

/***********************************************************************
 *  获取操作人信息
 *  DLY 
 */
function getUserInfo() {  
    //setCookie(3);  // 测试  
    m_UserInfo.actor = '';
    m_UserInfo.userName = $.cookie('name');
    m_UserInfo.empID = $.cookie('oid');
    m_UserInfo.empCode = $.cookie('code'); 
    m_UserInfo.empCode1 = ''; 
    m_UserInfo.empCode2 = '';
    m_UserInfo.shopids = '0';
    m_UserInfo.shopids1 = '0';
    if (m_UserInfo.empID == null || m_UserInfo.empID == '') {
        alert("会话过期,请重新登陆!");
        top.location.href = loginurl;
        return;
    }

    
    var row = { c_oid: m_UserInfo.empID };
    per = hr_getPer(row); 
    if (per.c_name != m_UserInfo.userName || per.c_code != m_UserInfo.empCode) {
        alert("用户认证失败,请重新登陆!");
        top.location.href = loginurl;
        return;
    } else if ((per.c_jobname == '店长' || per.c_jobname == '见习店长')
        && per.c_employeestatus != '3') {   //店长认证  
        m_UserInfo.actor = 'A'; 
        // 获取大区经理
        var dqjlpercode = hr_getDQJLPer(2, per.c_unitid);
        if (dqjlpercode ==undefined || dqjlpercode == '') {
            alert("您所属公司未配置大区经理, 请通知系统管理员, 避免审批流程出现问题!");
        } 
        m_UserInfo.empCode1 = dqjlpercode;

        // 获取人资负责人
        var hrpercode = hr_getHRPer(2, per.c_orgid);
        if (hrpercode == '') {
            alert("您所属公司未配置人资负责人, 请通知系统管理员, 避免审批流程出现问题!");
        }
        m_UserInfo.empCode2 = hrpercode;
    } else {
        //城市经理认证
        var shopids1 = hr_getUnitidByCSJL('2', per.c_code);  //获取负责店铺id  
        if (shopids1 != '') {
            m_UserInfo.shopids1 = shopids1; 
            m_UserInfo.actor = 'D'; 
        }

        // 人资负责人认证
        var orgid = hr_getHRPer(1, per.c_code);
        //alert(orgid);
        if (orgid != '') {
            m_UserInfo.comID = per.c_orgid;
            m_UserInfo.comIDs = orgid; //多个公司
            m_UserInfo.actor = 'C';
        } else {
            //大区经理认证
            var shopids = hr_getUnitidByDQJL('2', per.c_code);  //获取负责店铺id   
            if (shopids != '') {
                m_UserInfo.actor = 'B';
                m_UserInfo.shopids = shopids;
            } 
        } 
    } 

    // 设置系统公司
    m_UserInfo.selfInfo = per;
    m_UserInfo.com = per.c_orgname;
    m_UserInfo.deptID = per.c_unitid;  
    m_UserInfo.deptCode = per.c_unitcode;
    m_UserInfo.deptName = per.c_unitname;
    if (m_UserInfo.actor == '') {
        alert("您没有权限!");
        top.location.href = loginurl;
        return;
    } 
    return m_UserInfo;
}


/*
* SetCookie 测试用
*/
function setCookie(n) {
    //var Then = new Date();
    //Then.setTime(Then.getTime() + 24 * 60 * 60 * 1000);  
    if (n == 1) {
        //店长
        $.cookie('name', '何亚燕', { expires: 1 });
        $.cookie('oid', '814893', { expires: 1 });
        $.cookie('code', '0741305', { expires: 1 });
    }else if (n == 2) {
        //经理
        $.cookie('name', '邓乐韵', { expires: 1 });
        $.cookie('oid', '109380346', { expires: 1 });
        $.cookie('code', '1112137', { expires: 1 });
    } else if (n == 3) {
        //人资
        $.cookie('name', '谢晔', { expires: 1 });
        $.cookie('oid', '84761703', { expires: 1 });
        $.cookie('code', '1103227', { expires: 1 });
    }

}


/***********************************************************************
 * 退出
 *  DLY 
 */
function layout() {
    $.cookie('userName', null);
    $.cookie('empID', null);
    $.cookie('empCode', null);
    m_UserInfo = {};
    top.location.href = loginurl;
}


/***********************************************************************
 *  设置或获取子页面参数
 *  DLY 
 */
function actsonfilter(type, fil) {
    if (type == 'get') {
        return m_sonfilter;
    } else if (type == 'set') {
        m_sonfilter = fil;
    } else if (type == 'new') {
        m_sonfilter = { type: '' };
    }
} 


 