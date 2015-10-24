
var m_wxno = "";

$(document).ready(function () {

	//初始化插件
	initPlugins();

	//隐秘元素

	invisibleTag();
})


function initPlugins(){
	initSearchBox();		//搜索框
	initTextBox();			//初步判定
	initCombobox();			//问题现象
	initIsCheck();			//次要原因
	initDepartment();		//责任部门
	initDegrade();			//产品退仓
	initMaintainway();		//维修方式
	initSubmit();			//保存按钮
	initPay();				//是否付费
	initAcc();				//原因选择
	initRst();				//判定结果
}

function invisibleTag(){
	$("#wxpd").hide();
	$("#secondary").hide();
	$("#cptc").hide();//产品退仓
	$("#kywx").hide();//可以维修
	$("#degrade").combobox({
	required: false
	});
	$("#maintainway").combobox({
	required: false
	});
}
function initCombobox(){
	$("#qstComb").combobox({
		required:true,
        editable:false
	});
	$("#phenomenon").combobox({
		required:true,
        editable:false
	});
	$("#supplier").combobox({
		required:true,
        editable:false
	});
}
function initSearchBox() {
	$("#schWXno").textbox({
		width: 260,
		height: 35,
		type: 'text',
		prompt: '请输入维修单号',
		buttonIcon:'icon-search',
		buttonText:'搜索',
		onClickButton:function(){
			var wxno 
				= $("#schWXno").textbox('getValue');
			searchWX(wxno);
		}
	}).textbox('setValue',"");


	//enter event
	$("#schWXno").textbox('textbox')
		.bind('keydown', function(e){
			if (e.keyCode == 13){
				var wxno 
					= $("#schWXno").textbox('getValue');
				searchWX(wxno);
			}
		});
}

function initTextBox(){
	$("#describe").textbox({
		required:true,
		width:350,
		height:60,
		multiline:true,
		type:'text',
		prompt:'请输入描述信息'
	}).textbox('setValue',"");
}

function initDepartment(){
	$("#department").combobox({
		width:200,
		required: true,
		url: GetComboxWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750',
		"", "value", "name") + "&XML=" + GetFormJson([],'getDepartment'), 
		type: 'post',
		editable: false,
		valueField: 'id',
		textField: 'text',
		panelHeight: 'auto'
	})
}

function initDegrade(){

	$("#degrade").combobox({
		width:200,
		required: false,
		url: GetComboxWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750',
		"", "value", "name") + "&XML=" + GetFormJson([],'getDegrade'), 
		type: 'post',
		editable: false,
		valueField: 'id',
		textField: 'text',
		panelHeight: 'auto'
	})
}

function initMaintainway(){
	$("#maintainway").combobox({
		width:200,
		required: false,
		url: GetComboxWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750',
		"", "value", "name") + "&XML=" + GetFormJson([],'getMaintainway'), 
		type: 'post',
		editable: false,
		valueField: 'id',
		textField: 'text',
		panelHeight: 'auto'
	})
}

function initPay(){
	$("#pay").combobox({
		width:200,
		required: true,
		url: GetComboxWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750',
		"", "value", "name") + "&XML=" + GetFormJson([],'getPay'), 
		type: 'post',
		editable: false,
		valueField: 'id',
		textField: 'text',
		panelHeight: 'auto'
	})
}

function initSubmit(){
	$("#submit").linkbutton({
		width:100,
		iconAlign:'left',
		iconCls: 'icon-save',
		text: '保存',
		onClick:function(){
			submit();
		}
	})
}

function searchWX(data){
	if(data.length == 0){
		alert("请输入维修单号!");
		$("#schWXno").focus();
		return;
	};
	var dataXML = [{ "name": "txtWxno", "value": data},{"name": "txtStatus", "value": "20" }];
	var url = GetWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750')
        + "&XML=" + GetFormJson(dataXML, 'GetWXInfo') + "&MultiTable=true";

    $.messager.progress({ title: '请稍后', msg: '查询中' });
    
    $.post(url,function(data){
    	$.messager.progress('close');
    	
    	var rst = eval("(" + data + ")");

    	var count = rst.length;

    	var wxInfo, suppInfo;

    	wxInfo = rst[0];

    	if(count >1){
    		
    		suppInfo = rst[1];

    		//供应商加载数据
	    	$("#supplier").combobox({
	    	    data: suppInfo.rows,
	    	    type: 'post',
	    	    editable: false,
	    	    valueField: 'supplierid',
	    	    textField: 'shutname',
	    	    panelHeight: 'auto'
	    	}).combobox('setValue',suppInfo.rows[0].supplierid);
    	};

    	

    	if (wxInfo.Error) {
            
    	    $.messager.alert("系统错误", wxInfo.Error, 'error');
        }
    	else if (wxInfo.rows[0].result == "False") {
          
    	    $.messager.alert("提示", wxInfo.rows[0].message, 'error');
        }
        else {
    	    initWxInfo(wxInfo.rows[0]);
        };
    });
}

function initWxInfo(data){

    if (data.wxno.length != 0) {

        $("#wxpd").show();

        m_wxno = data.wxno;
        $("#wxno").empty()
			.append(data.wxno+"&nbsp;&nbsp;&nbsp;("+data.wxstname+")");

		$("#expressno").empty()
			.append(data.expressno);

		$("#sku").empty().append(data.sku);

		// 颜色尺码
		var size = data.sku.substr(data.sku.length-1,1);
		var color = data.sku.substr(data.sku.length-2,1);

		var regexp = /^[A-Za-z]$/;
		if(!regexp.test(color)){
			color = data.sku.substr(data.sku.length-3,1);
		}

		$("#color").empty().append(color);
		$("#size").empty().append(size);
		$("#selldate").empty().append(data.selldate);
		
		//紧急程度
		var urgentColor = "";
		if(data.urgentlevel == "L0"){
			//高
			urgentColor = "<span style=\"float:left\">紧急程度：</span>"
		    	+"<span style=\"background-color:#CC0033; "
				+ " width:10px; height:10px; float:left;"
				+ " margin:6px 10px;\"></span>" 
				+ "<span>"+data.ulname+"</span>";
		}else if (data.urgentlevel == "L1"){
			//中
			urgentColor = "<span style=\"float:left\">紧急程度：</span>"
		    	+"<span style=\"background-color:#FFCC33; "
				+ " width:10px; height:10px; float:left;"
				+ " margin:6px 10px;\"></span>"
				+ "<span>"+data.ulname+"</span>";
		}else if (data.urgentlevel == "L2"){
			//低
		    urgentColor = "<span style=\"float:left\">紧急程度：</span>"
		    	+"<span style=\"background-color:#00CC33; "
				+ " width:10px; height:10px; float:left;"
				+ " margin:6px 10px;\"></span>"
				+ "<span>"+data.ulname+"</span>";
		}
		$("#urgentlevel").empty().append(urgentColor);
		$("#question").empty().append(data.question);

		$("#depot").empty()
			.append(data.depotarea+"|"+data.depotname);
		$("#resp").empty()
			.append(data.respname+"|"+data.respphone);
		$("#staff").empty()
			.append(data.staffname+"|"+data.staffphone);

		if(data.vipid.length == 0){
			$("#vipInfo").hide();
			$("#vipname").empty();
			$("#vipphone").empty();
			$("#collect").empty();
		}
		else{
			$("#vipInfo").show();

			$("#vipname").empty().append(data.vipname);
			$("#vipphone").empty().append(data.vipphone);

			if(data.collect == "no"){
				$("#collect").empty()
					.append("不同意付费维修");
			}else{
				$("#collect").empty()
					.append("愿意付费维修");
			};
		};

		$("#remark").empty().append(data.remark);
	}
	else{
		$("#wxpd").hide();
		alert("初判无此维修单号！");
		return;
	};
}

function initIsCheck() {
	//JS
	document.getElementById("secondaryChk").checked=false;


	$("#secondaryChk").unbind('change')
		.bind('change',function(e){
			var isCheck 
				= $("#secondaryChk").prop("checked");
			
			if(isCheck){
				$("#secondary").show();
				$("#secqstComb").combobox({
					required:true,
        			editable:false
				});
				$("#secphenomenon").combobox({
					required:true,
			        editable:false
				});
			}else{
				$("#secondary").hide();
				
				changeStyle("secQuestion","");

				$("#secqstComb").combobox({
					required:false,
        			editable:false
				});
				$("#secphenomenon").combobox({
					required:false,
			        editable:false
				});
			};

		});

}

/*
逻辑：这里有三块。
0：
1：传值给取数据的方法
2：改变样式，使其他的a标签处于初始样式
*/
function initAcc(){
	$("#main0").unbind('click')
		.bind('click',function(e){
			getQuestion("mainQuestion","accClient");
			changeStyle("mainQuestion","main0");
			$("#day").empty();
			$("#money").empty();
		});
	$("#main1").unbind('click')
		.bind('click',function(){
			getQuestion("mainQuestion","accOutSide");
			changeStyle("mainQuestion","main1");
			$("#day").empty();
			$("#money").empty();
		});
	$("#main2").unbind('click')
		.bind('click',function(){
			getQuestion("mainQuestion","accInSide");
			changeStyle("mainQuestion","main2");
			$("#day").empty();
			$("#money").empty();
		});

	$("#secon0").unbind('click')
		.bind('click',function(){
			getQuestion("secQuestion","accClient");
			changeStyle("secQuestion","secon0");
		});
	$("#secon1").unbind('click')
	.bind('click',function(){
		getQuestion("secQuestion","accOutSide");
		changeStyle("secQuestion","secon1");
	});
	$("#secon2").unbind('click')
	.bind('click',function(){
		getQuestion("secQuestion","accInSide");
		changeStyle("secQuestion","secon2");
	});
}

/*
逻辑：
1.改变样式
2.改变判断选项
*/
function initRst(){
	$("#dec0").unbind('click')
		.bind('click',function(){
			decideRst("dec0")
			changeStyle("rst","dec0");

	});
	$("#dec1").unbind('click')
		.bind('click',function(){
			decideRst("dec1");
			changeStyle("rst","dec1");

	});
	$("#dec2").unbind('click')
		.bind('click',function(){
			decideRst("dec2");
			changeStyle("rst","dec2");
	});
}
// 获取问题下拉值
function getQuestion(area,value){

	if(area == "mainQuestion"){
		$('#qstComb').combobox({
	        required: true,
	        url: GetComboxWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750',
	        	"", "value", "name") + "&XML=" 
	        	+ GetFormJson([{"name":"txtFartherVal","value":value}],'getQuestion'), 
	        type: 'post',
	        editable: false,
	        valueField: 'id',
	        textField: 'text',
	        panelHeight: 'auto',
	        onLoadSuccess:function(){
	        	$("#phenomenon").combobox('disable');
				$("#day").empty();
				$("#money").empty();
	        },
	        onSelect:function(record){
	        	var url = GetComboxWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750',"", "value", "name") 
	        			+ "&XML=" + GetFormJson([{"name":"txtFartherVal","value":record.id}],'getQuestion');
	        	$("#phenomenon").combobox({
			        required: true,
			        url: url,
			        type: 'post',
			        editable: false,
			        valueField: 'id',
			        textField: 'text',
			        panelHeight: 'auto',
			        onLoadSuccess:function(){
			        	$("#phenomenon").combobox('enable');
			        	$("#day").empty();
						$("#money").empty();
			        },
			        onSelect:function(record){
			        	getDayMoney(record.id);
			        }
			    });
			}
		});
	}else{
		$('#secqstComb').combobox({
	        required: true,
	        url: GetComboxWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750',"", "value", "name") 
	        	+ "&XML=" + GetFormJson([{"name":"txtFartherVal","value":value}],'getQuestion'), 
	        type: 'post',
	        editable: false,
	        valueField: 'id',
	        textField: 'text',
	        panelHeight: 'auto',
	        onSelect:function(record){
	        	var url = GetComboxWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750',"", "value", "name") 
	        			+ "&XML=" + GetFormJson([{"name":"txtFartherVal","value":record.id}],'getQuestion');
	        	$("#secphenomenon").combobox({
			        required: true,
			        url: url,
			        type: 'post',
			        editable: false,
			        valueField: 'id',
			        textField: 'text',
			        panelHeight: 'auto',
			        onLoadSuccess:function(){
			        	$("#secphenomenon").combobox('clear').combobox('enable');
			        }
			    });
			}
		});
	};
}

//变更样式
function changeStyle(area,id){
	var tag = area + " a";

	$("#"+tag).each(function(){
		if(this.id == id){
			$("#" + this.id).attr("class","marginR30 isNature");
		}
		else{
			$("#" + this.id).attr("class","marginR30 nature");
		};
	});
}

//判断结果选项
function decideRst(id){

	if (id=="dec0"){//产品退仓

		$("#cptc").show();//产品退仓
		$("#kywx").hide();//可以维修
		$("#degrade").combobox({
			required: true
		});
		$("#maintainway").combobox({
			required: false
		});
		$("#pay").combobox({
			required: false
		});

	}
	else if (id=="dec1"){//不能维修

		$("#cptc").hide();//产品退仓
		$("#kywx").hide();//可以维修
		$("#degrade").combobox({
			required: false
		});
		$("#maintainway").combobox({
			required: false
		});
		$("#pay").combobox({
			required: false
		});

	}
	else{//可以维修

		$("#cptc").hide();//产品退仓
		$("#kywx").show();//可以维修
		$("#degrade").combobox({
			required: false
		});
		$("#maintainway").combobox({
			required: true
		});
		$("#pay").combobox({
			required: true
		});
		
	}
}



function submit(){

	var data = [];

	data.push({"name":"txtWXNo","value":m_wxno});
	
	var len = data.length;
		eachCss(data,"mainQuestion");
	var newLen = data.length;

    if (len == newLen){
    	$.messager.alert("警告","请选择破损原因","warning");
    	return;
    };

    //检验主要问题必填项
	if (!isVaild("formMainQst", "主要问题")) {
	   return;
	};

	data.push({"name":"txtFirstQust","value":$("#qstComb").combobox('getValue')});
	data.push({"name":"txtFirstPhen","value":$("#phenomenon").combobox('getValue')});
	data.push({"name":"txtFirstDecide","value":$("#describe").textbox('getValue')});
	data.push({"name":"txtSupplierId","value":$("#supplier").combobox('getValue')});
	data.push({"name":"txtSupplierName","value":$("#supplier").combobox('getText')});
	//次要问题
	var isTrue = $("#secondaryChk").is(':checked');

	if (isTrue) {
		if (!isVaild("formSecQst","次要问题信息")) {
	   		return;
		};

		var len = data.length;
			eachCss(data,"secQuestion");
		var newLen = data.length;

		if (len == newLen){
			$.messager.alert("警告","请选择次要原因","warning");
    		return;
		};

		data.push({"name":"txtSecondQust","value":$("#secqstComb").combobox('getValue')});
		data.push({ "name": "txtSecondPhen", "value": $("#secphenomenon").combobox('getValue') });

		var len = data.length;
		    eachCss(data, "secQuestion");
		var newLen = data.length;

		if (len == newLen) {
		    $.messager.alert("警告", "请选择次要原因", "warning");
		    return;
		};
	};



	var len = data.length;
	    eachCss(data, "rst");
	var newLen = data.length;

	if (len == newLen) {
	    $.messager.alert("警告", "请选择结果", "warning");
	    return;
	};
	//判定结果
    if(!isVaild("formRst","判定结果信息")){
    	return;
    };
    //责任部门
    data.push({"name":"txtDepartment","value":$("#department").combobox('getValue')});
    data.push({"name":"txtFixNeedTime","value":$("#day").text()});
    data.push({"name":"txtFixNeedMoney","value":$("#money").text()});

    var wxTrue = $("#kywx").is(":hidden");
    if (!wxTrue) {
        data.push({ "name": "txtFixType", "value": $("#maintainway").combobox('getValue') });
        data.push({ "name": "txtCost", "value": $("#pay").combobox('getValue') });
    };

	var tcTrue = $("#cptc").is(":hidden");
	if(!tcTrue){
		data.push({ "name": "txtWarehouse", "value": $("#degrade").combobox('getValue') });
	};

	var url = GetWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750')
        + "&XML=" + escape(GetFormJson(data, 'newFixJudge'));

    $.messager.progress({ title: '请稍后', msg: '保存中' });
    
    $.post(url,function(data){
    	$.messager.progress('close');
    	
    	var rst = eval("("+data+")");

        if (rst.Error) {
            
            $.messager.alert("系统错误", rst.Error, 'error');
        }
        else if (rst.rows[0].result == "False") {
          
            $.messager.alert("错误", rst.rows[0].message, 'error');
        }
        else {
            $.messager.alert("提示",rst.rows[0].message, 'ok');
           	//初始化插件
			initPlugins();
			//隐秘元素
			invisibleTag();
        };
    });
}


function isVaild(formName, msg) {

    var isVaild 
        = $('#'+ formName).form('validate');

    if (!isVaild) {
        alert("请将" + msg + "填写完整");
        return false;
    } else {
        return true;
    };

}


function eachJson(data, jsonObj) {

    for (var o in jsonObj) {
        data.push(
            {"name":jsonObj[o].name
            ,"value":jsonObj[o].value}
        );
    };
    return data;
}

function eachCss(data,idName){
		//根据css的变化来取值
    var cause = $("#"+idName).children();
    $.each(cause, function () {
    	if($.trim(this.className) == "marginR30 isNature"){
    		var id = this.id;
    		switch(id){
    			case "main0":
    				data.push({"name":"txtFirstOrigin","value":"accClient"});
    				break;
    			case "main1":
    				data.push({"name":"txtFirstOrigin","value":"accOutSide"});
    				break;
    			case "main2":
    				data.push({"name":"txtFirstOrigin","value":"accInSide"});
    				break;
    			case "secon0":
    				data.push({"name":"txtSecondOrigin","value":"accClient"});
    				break;
    			case "secon1":
    				data.push({"name":"txtSecondOrigin","value":"accOutSide"});
    				break;
    			case "secon2":
    				data.push({"name":"txtSecondOrigin","value":"accInSide"});
    				break;
    			case "dec0":
    				data.push({"name":"txtDecideRst","value":"rst0"});
    				break;
    			case "dec1":
    				data.push({"name":"txtDecideRst","value":"rst1"});
    				break;
    			case "dec2":
    				data.push({"name":"txtDecideRst","value":"rst2"});
    				break;
    		};
    	};
    });
}


function getDayMoney(secph){

	var dataXML = [{"name":"txtSecph","value":secph}];

	var url = GetWSRRURL('3a9cf88e-fc42-485d-9dff-96c35a8a1750')
        + "&XML=" + GetFormJson(dataXML, 'GetDayMoney');

	$.post(url, function (data) {
	    var rst = eval("(" + data + ")");

	    if (rst.rows[0].day.length > 0) {
	        $("#day").empty().append("需要" + rst.rows[0].day + "天维修,");
	        $("#money").empty().append("费用区间为" + rst.rows[0].money + "元");
	    };
	});


		
}