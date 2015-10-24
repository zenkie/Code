

 
function compareDate(DateOne,DateTwo)
{ 
var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ("-"));
var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ("-")+1);
var OneYear = DateOne.substring(0,DateOne.indexOf ("-"));

var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ("-"));
var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ("-")+1);
var TwoYear = DateTwo.substring(0,DateTwo.indexOf ("-"));

if (Date.parse(OneMonth+"/"+OneDay+"/"+OneYear) >
Date.parse(TwoMonth+"/"+TwoDay+"/"+TwoYear))
{
return true;
}
else
{
return false;
}

}

 var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
     function dpPrint() {
            LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
            LODOP.SET_LICENSES("浙江雅莹服装有限公司", "853717765858688748719056235623", "", "");
            LODOP.PRINT_INIT("店铺维修单");
            LODOP.PRINT_INITA(3,0,400,700,"店铺维修单");
            //$("#pp").value("OUTLET");
            $("#wxdh1").text(document.getElementById("wxdh").value);
            $("#pdpmc").text(document.getElementById("dpmc").value);
		    $("#pdzxm").text(document.getElementById("dzxm").value);
            $("#pgkxm").text(document.getElementById("gkxm").value);
            $("#pgkdh").text(document.getElementById("gklxdh").value);
            $("#pwxcbm").text(document.getElementById("wxcbm").value);
            $("#pVIPKH").text(document.getElementById("vipkh").value);
            $("#psldg").text(document.getElementById("sldg").value);
           // $("#psftyffwx").value(document.getElementById("isffwx").value);
            var kh = document.getElementById("kh").value;
	       $("#khp").text(kh);
	       $("#ysp").text(kh.substr(kh.length-2,1));
	       $("#msp").text(kh.substr(kh.length-1,1));
	       $("#scsjp").text(document.getElementById("scsj").value);
	       $("#wtmsp").text(document.getElementById("wtms").value);
	       $("#wlgsp").text($('#ysgs').combogrid('getValue'));
	       $("#wldhp").text(document.getElementById("ydh").value);
	       $("#dpdzp").text(document.getElementById("fhdz").value);

	       $("#thrqp").text($('#thrq').datebox('getValue'));
       
            LODOP.ADD_PRINT_HTM(0, 0, "95%", "95%", document.getElementById("print").innerHTML);
            LODOP.PREVIEW();
        }; 

        //快递单
        function kddPrint() {
        	
            LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
            LODOP.SET_LICENSES("浙江雅莹服装有限公司", "853717765858688748719056235623", "", "");
            LODOP.PRINT_INIT("快递");
            LODOP.PRINT_INITA(3,0,400,700,"快递单");
            LODOP.PRINT_INIT("快递单");
            LODOP.ADD_PRINT_TEXT(64,87,130,20,document.getElementById("zbfh_bzr").value);
            LODOP.ADD_PRINT_TEXT(90,427,100,20,document.getElementById("zbfh_shr").value);
            LODOP.ADD_PRINT_TEXT(92,598,100,20,document.getElementById("zbfh_shrdh").value);
            LODOP.ADD_PRINT_TEXT(135,133,100,20,"浙江雅莹服装有限公司");
            LODOP.ADD_PRINT_TEXT(137,427,100,20,document.getElementById("dpmc").value);
            LODOP.ADD_PRINT_TEXT(213,120,178,20,document.getElementById("zbfh_shdz").value);
            LODOP.ADD_PRINT_TEXT(212,426,100,20,document.getElementById("zbfh_fhdz").value);
            LODOP.ADD_PRINT_TEXT(241,120,179,20,document.getElementById("shrlxdh").value);
       
            LODOP.PREVIEW();
        };
        
         //总部打印
        

        function zbPrint() {
        	
        	var jg = $('#pdclfs').combobox('getValue');
        	
        	var jg1 ='<table width="700px" border="0" rules="all" style= "text-align: left; font-family: verdana,arial,sans-serif;  font-size:10pt; color:#000000; border-width: 1px;border-color: #666666; border-collapse: collapse; width: 100%; "><tr><td colspan="2"><input id="cptc" type="checkbox"  checked="checked">产品退仓</input></td><td colspan="2"><input id="wfwx" type="checkbox">已经维修完成</input></td></tr>'+
		        '<tr><td colspan="2"><input id="cptct" type="checkbox">产品退仓(特)</input></td><td colspan="2"><input type="checkbox">已经维修完成(特)</input></td></tr>'+
		        '<tr><td colspan="2"><input type="checkbox">无法维修，寄回店铺</input></td><td colspan="2"></td></tr></table>';

        	var jg2 ='<table width="700px" border="0" rules="all" style= "text-align: left; font-family: verdana,arial,sans-serif;  font-size:10pt; color:#000000; border-width: 1px;border-color: #666666; border-collapse: collapse; width: 100%; "><tr><td colspan="2"><input type="checkbox" >产品退仓</input></td><td colspan="2"><input type="checkbox">已经维修完成</input></td></tr>'+
		        '<tr><td colspan="2"><input type="checkbox">产品退仓(特)</input></td><td colspan="2"><input type="checkbox">已经维修完成(特)</input></td></tr>'+
		        '<tr><td colspan="2"><input type="checkbox">无法维修，寄回店铺</input></td><td colspan="2"></td></tr></table>';

        	var jg3 ='<table width="700px" border="0" rules="all" style= "text-align: left; font-family: verdana,arial,sans-serif;  font-size:10pt; color:#000000; border-width: 1px;border-color: #666666; border-collapse: collapse; width: 100%; "><tr><td colspan="2"><input  type="checkbox" >产品退仓</input></td><td colspan="2"><input type="checkbox"  checked="checked">已经维修完成</input></td></tr>'+
		        '<tr><td colspan="2"><input type="checkbox">产品退仓(特)</input></td><td colspan="2"><input type="checkbox">已经维修完成(特)</input></td></tr>'+
		        '<tr><td colspan="2"><input type="checkbox"  checked="checked">无法维修，寄回店铺</input></td><td colspan="2"></td></tr></table>';
			
			if(jg=='1'){
					document.getElementById('cljg').innerHTML = jg1;
				}else if(jg=='2'){
					document.getElementById('cljg').innerHTML = jg2;
				}else if(jg=='3'){
					document.getElementById('cljg').innerHTML = jg3;
				};  
				
            LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
            LODOP.SET_LICENSES("浙江雅莹服装有限公司", "853717765858688748719056235623", "", "");
            LODOP.PRINT_INIT("产品售后发货单");
            LODOP.PRINT_INITA(3,0,400,700,"产品售后发货单");
          
            $("#thrq2").text($('#thrq').datebox('getValue'));
       
            LODOP.ADD_PRINT_HTM(0, 0, "95%", "95%", document.getElementById("zbprint").innerHTML);
            LODOP.PREVIEW();
        };
     //-------------------------------------------
      //详细页面 根据url参数 初始化页面 
      function getDetail(guid,zt){
      	//var guid='<%out.print(request.getParameter("guid"));%>';
      	 $.post(	'rest/getDetail/S2',
      			{'guid':guid},function(detail) {
      					var e = eval("(" + detail + ")");
      					if(""==e){
      					}else{
      						
          					
      				//店铺维修单 打印数据
          					var ep = '<input id="EP" type="checkbox" checked="checked" />EP '+	
          				        		'<input id="EM" type="checkbox" /> EM'+		
          				        		'<input id="TBF" type="checkbox" /> TBF'+		
          				        		'<input id="OUTLET" type="checkbox" /> OUTLET';
          					var em = '<input id="EP" type="checkbox" />EP '+	
				        		'<input id="EM" type="checkbox"  checked="checked"/> EM'+		
				        		'<input id="TBF" type="checkbox" /> TBF'+		
				        		'<input id="OUTLET" type="checkbox" /> OUTLET';
          					var tbf = '<input id="EP" type="checkbox" />EP '+	
				        		'<input id="EM" type="checkbox" /> EM'+		
				        		'<input id="TBF" type="checkbox"  checked="checked"/> TBF'+		
				        		'<input id="OUTLET" type="checkbox" /> OUTLET';
          					var outlet = '<input id="EP" type="checkbox"/>EP '+	
				        		'<input id="EM" type="checkbox" /> EM'+		
				        		'<input id="TBF" type="checkbox" /> TBF'+		
				        		'<input id="OUTLET" type="checkbox"  checked="checked"/> OUTLET';
          					if(e[0].pp=="E"){
          						document.getElementById('pp').innerHTML = ep;
          					}else if(e[0].pp=="M"){
          						document.getElementById('pp').innerHTML = em;
          					}else if(e[0].pp=="T"){
          						document.getElementById('pp').innerHTML = tbf;
          					}else if(e[0].pp=="B"){
          						document.getElementById('pp').innerHTML = outlet;
          					}
          					
          					//总部发货单 打印数据
          					var shtml0 ='<input id="SFFGKWX" type="checkbox" value="1" />',
          						shtml1 ='<input id="SFFGKWX" type="checkbox" value="1" checked="checked"/>';
          					if(e[0].sffgkwx==1){
          						document.getElementById("isgkwx").checked=true;
          						document.getElementById('gkwxp').innerHTML = shtml1;
          						document.getElementById('dpwxp').innerHTML = shtml0;
          					}else{
          						document.getElementById('gkwxp').innerHTML = shtml0;
          						document.getElementById('dpwxp').innerHTML = shtml1;
          						document.getElementById("isgkwx").checked=false;
          					}          					
          					
          					
          					//是否同意付费维修
          					var shtml0 ='<input  type="checkbox" />',
          						shtml1 ='<input  type="checkbox" checked="checked"/>';
          					if(e[0].sftyffwx=='1'){
          						document.getElementById('s').innerHTML = shtml1;
          						document.getElementById('f').innerHTML = shtml0;
          						document.getElementById("isffwx").checked=true;
          					}else{
          						document.getElementById('s').innerHTML = shtml0;
          						document.getElementById('f').innerHTML = shtml1;
          						document.getElementById("isffwx").checked=false;
          					};    
          					
          			//产品售后发货单 打印数据
          					//document.getElementById("pp2").value=e[0].pp;
          					$("#pp2").text(e[0].pp);//jquery  赋值方法
          					$("#wxdh2").text(e[0].dh);
          					$("#dpmc2").text(e[0].dpmc);
          					$("#kh2").text(e[0].kh);
          					$("#thrq2").text(e[0].thrq);
          					$("#dz2").text(e[0].dzxm);
          					$("#dpdh2").text(e[0].dzlxdh);
          					$("#hjdz2").text(e[0].shdz);
          					$("#jcyy2").text(e[0].jcyy);
          					
          					$("#pdr2").text(e[0].pjpdr);
          					$("#pdrq2").text(e[0].pjpdsj);
          					
          					$("#bz2").text(e[0].bzxx);
          					
          		// 总部发货   快递单数据
          					if(null!=e[0].zbfh_bzr){document.getElementById("zbfh_bzr").value=e[0].zbfh_bzr;};
          					if(null!=e[0].zbfh_shr){document.getElementById("zbfh_shr").value=e[0].zbfh_shr;};
          					if(null!=e[0].zbfh_shrdh){document.getElementById("zbfh_shrdh").value=e[0].zbfh_shrdh;};
          					if(null!=e[0].zbfh_fhdz){document.getElementById("zbfh_fhdz").value=e[0].zbfh_fhdz;};
          					if(null!=e[0].zbfh_shdz){document.getElementById("zbfh_shdz").value=e[0].zbfh_shdz;};
          					if(null!=e[0].shrlxdh){document.getElementById("shrlxdh").value=e[0].shrlxdh;};
          					
          		//总部发货    弹出框数据
          					if(null!=e[0].dpbm){document.getElementById("dpbmz").value=e[0].dpbm;};
          					if(null!=e[0].dpmc){document.getElementById("dpmcz").value=e[0].dpmc;};
          					if(null!=e[0].fhdz){document.getElementById("zbfh_shdz2").value=e[0].fhdz;};
          					if(null!=e[0].shdz){document.getElementById("zbfh_fhdz2").value=e[0].shdz;};
          					if(null!=e[0].dzxm){document.getElementById("zbfh_shr2").value=e[0].dzxm;};
          					if(null!=e[0].dzlxdh){document.getElementById("zbfh_shrdh2").value=e[0].dzlxdh;};
          		//详细表单数据
          					if(null!=e[0].dh){document.getElementById("wxdh").value=e[0].dh;};
          					if(null!=e[0].dpbm){$('#dpbm').combogrid('setValue',e[0].dpbm);};
          					if(null!=e[0].dpmc){document.getElementById("dpmc").value=e[0].dpmc;};
          					
          					if(null!=e[0].dplx){document.getElementById("dplx").value=e[0].dplx;};
          					if(null!=e[0].dzxm){document.getElementById("dzxm").value=e[0].dzxm;};
          					if(null!=e[0].dzlxdh){document.getElementById("dzlxdh").value=e[0].dzlxdh;};
          					
          					if(null!=e[0].wxcbm){document.getElementById("wxcbm").value=e[0].wxcbm;};
          					if(null!=e[0].wxcmc){document.getElementById("wxcmc").value=e[0].wxcmc;};
          					if(null!=e[0].sldg){$('#sldg').combogrid('setValue',e[0].sldg); };
          					if(null!=e[0].dglxdh){document.getElementById("dglxdh").value=e[0].dglxdh;};
          					
          					
          					if(null!=e[0].gkxm){document.getElementById("gkxm").value=e[0].gkxm;};
          					if(null!=e[0].gklxdh){document.getElementById("gklxdh").value=e[0].gklxdh;};
          					if(null!=e[0].scsj){$('#scsj').datebox('setValue',e[0].scsj)};
          					if(null!=e[0].isffwx){document.getElementById("isffwx").value=e[0].sftyffwx;};
          					
          					if(null!=e[0].jjcd){document.getElementById("jjcd").value=e[0].jjcd;};
          					if(null!=e[0].kh){document.getElementById("kh").value=e[0].kh;}; 
          					if(null!=e[0].thrq){$('#thrq').datebox('setValue',e[0].thrq)};
          					if(null!=e[0].wtms){document.getElementById("wtms").value=e[0].wtms;}; 
          					if(null!=e[0].ysgs){$('#ysgs').combogrid('setValue',e[0].ysgs);};
          					//if(null!=e[0].ysgs){document.getElementById("ysgs").value=e[0].ysgs;};
          					if(null!=e[0].ydh){document.getElementById("ydh").value=e[0].ydh;}; 
          					if(null!=e[0].fhdz){document.getElementById("fhdz").value=e[0].fhdz;};
          					if(null!=e[0].shdz){document.getElementById("shdz").value=e[0].shdz;}; 
          					if(null!=e[0].shr){document.getElementById("shr").value=e[0].shr;};
          					if(null!=e[0].shrlxdh){document.getElementById("shrlxdh").value=e[0].shrlxdh;};
          					if(null!=e[0].bzxx){document.getElementById("bzxx").value=e[0].bzxx;};
          					//问题主因
          					if(null!=e[0].wxxz1){$('#wxxz1').combobox('setValue',e[0].wxxz1)};
          				//	if(null!=e[0].wxxz1){document.getElementById("wxxz1").value=e[0].wxxz1;};
          					if(null!=e[0].wtd1){$('#wtd1').combogrid('setValue',e[0].wtd1)};
          					if(null!=e[0].qy1){$('#qy1').combogrid('setValue',e[0].qy1)};
          					if(null!=e[0].xxd1){$('#xxd1').combogrid('setValue',e[0].xxd1)};
          					
          					if(null!=e[0].wxxz2){$('#wxxz2').combobox('setValue',e[0].wxxz2)};
          					if(null!=e[0].wtd2){$('#wtd2').combogrid('setValue',e[0].wtd2)};
          					if(null!=e[0].qy2){$('#qy2').combogrid('setValue',e[0].qy2)};
          					if(null!=e[0].xxd2){$('#xxd2').combogrid('setValue',e[0].xxd2)};
          					
          					//if(null!=e[0].pdclfs){document.getElementById("pdclfs").value=e[0].pdclfs;};
          					if(null!=e[0].pdclfs){$('#pdclfs').combobox('setValue',e[0].pdclfs)};
          					
          					//if(null!=e[0].tccljg){document.getElementById("tccljg").value=e[0].tccljg;};
          					if(null!=e[0].tccljg){$('#tccljg').combogrid('setValue',e[0].tccljg)};
          					
          					//if(null!=e[0].zrbm){document.getElementById("zrbm").value=e[0].zrbm;};
          					if(null!=e[0].zrbm){$('#zrbm').combogrid('setValue',e[0].zrbm)};
          					
          					if(null!=e[0].thdh){document.getElementById("thdh").value=e[0].thdh;}; 
          					if(null!=e[0].jcyy){document.getElementById("jcyy").value=e[0].jcyy;};
          					//alert(e[0].nx);
          					if(null!=e[0].nx){$('#nx').combobox('setValue',e[0].nx)};
          					//if(null!=e[0].jhwxts){document.getElementById("jhwxts").value=e[0].jhwxts;};
          					if(null!=e[0].jhwxts){$('#jhwxts').combogrid('setValue',e[0].jhwxts)};
          					
          					if(null!=e[0].sfsf){$('#sfsf').combobox('setValue',e[0].sfsf)};
          					if(null!=e[0].sfje){document.getElementById("sfje").value=e[0].sfje;};
          					if(null!=e[0].sfnr){document.getElementById("sfnr").value=e[0].sfnr;};
          					if(null!=e[0].pjpdbz){document.getElementById("pjpdbz").value=e[0].pjpdbz;};
          					if(null!=e[0].wxr){document.getElementById("wxr").value=e[0].wxr;};
          					if(null!=e[0].wxsj){document.getElementById("wxsj").value=e[0].wxsj;};
          					
          					
          					if(null!=e[0].djr){document.getElementById("djr").value=e[0].djr;};
          					if(null!=e[0].djsj){document.getElementById("djsj").value=e[0].djsj;};
          					if(null!=e[0].pjpdr){document.getElementById("pjpdr").value=e[0].pjpdr;};
          					if(null!=e[0].pjpdsj){document.getElementById("pjpdsj").value=e[0].pjpdsj;};
          					
          					if(null!=e[0].ttspr){document.getElementById("ttspr").value=e[0].ttspr;};
          					if(null!=e[0].txspsj){document.getElementById("spsj").value=e[0].txspsj;};
          					if(null!=e[0].wxqrr){document.getElementById("wxqrr").value=e[0].wxqrr;};
          					if(null!=e[0].wxqrsj){document.getElementById("qrsj").value=e[0].wxqrsj;};
          					
      					}
      					
      					
      					}, 'text').error(function() {
      				$.messager.alert("提示", "信息读取失败");
      			});	

      	
      	 $.post(	'rest/getFilterzt/'+zt,
      	 {'zt':zt},function(zt) {
      			var e = eval("(" + zt + ")");
      			if(null!=e[0].mc){document.getElementById("zt").value=e[0].mc;};
      		})
      	 
      		$('#dpbm').combogrid({
      			panelWidth:430,
      	 		mode:'remote',
      			idField:'depotid',
      			textField:'depotid',
      			url:'rest/getFilterdp/S2',
      			method:'post',
      			onChange:function (idField){  
      				getdpvalue(idField); // 店铺信息
      			 },
      			columns:[[
      				{field:'depotid',title:'店铺编号',width:90},
      				{field:'dname',title:'店铺名称',width:160},
      				{field:'address',title:'地址',width:160}
      			]]
      		});
      	} 

      	
      //保存维修信息
      function saveMaintain(id,zt){
    	 // alert(zt);return;
      	 var 
      	 //维修登记
      	 ztold,
      	 guid,wxdh,dpbm,dpmc,dplx,	dzxm,dzlxdh,	wxcbm,wxcmc	,sldg,dglxdh,isgkwx,		
      	 vipkh,gkxm,	gklxdh,scsj,	isffwx,jjcd,
      	 kh,thrq,wtms,
      	 ysgs,ydh,fhdz,shdz,shr,shrlxdh,bzxx,
      	 //品检  判定
      	 wxxz1,wtd1,qy1,xxd1,   wxxz2,wtd2,qy2,xxd2,   
      	 pdclfs,tccljg,zrbm,thdh,jcyy,
      	 nx,jhwxts,sfsf,sfje,sfnr,pjpdbz,
      	 wxr,wxsj,
      	 zbfh_ysgs ,zbfh_ysdh ,zbfh_shdz ,
     	zbfh_fhdz ,zbfh_shr ,zbfh_shrdh ,zbfh_bz ;
      	 
      	 
      	 guid=document.getElementById("guid").value;
      	 ztold=document.getElementById("zt").value;
      	 //alert(ztold);
      	 sldg = $('#sldg').combogrid('getText');
      	 dglxdh = document.getElementById("dglxdh").value;
      	 gkxm = document.getElementById("gkxm").value;
      	 scsj =  $('#scsj').datebox('getValue');
      	 kh = document.getElementById("kh").value;
      	 wtms = document.getElementById("wtms").value;	
      	 ysgs = $('#ysgs').combogrid('getText');	
      	
      	 dpbm = $('#dpbm').combogrid('getText');
      	 dpmc = document.getElementById("dpmc").value;
      	if("自营"==document.getElementById("dplx").value)
      		 {    	dplx=1; 	 }    	 else{    	dplx=2    	 }

      	// dplx = document.getElementById("dplx").value;
      	 dzxm = document.getElementById("dzxm").value;
      	 dzlxdh = document.getElementById("dzlxdh").value;
      	 wxcbm = document.getElementById("wxcbm").value;
      	 wxcmc = document.getElementById("wxcmc").value;
      	 wxdh=document.getElementById("wxdh").value;
      	 //是否顾客维修
      	 if(document.getElementById("isgkwx").checked)
      	 	{   isgkwx = 1;     }
      	 else{	isgkwx = 0;		};

      	 vipkh = document.getElementById("vipkh").value;
      	 gklxdh = document.getElementById("gklxdh").value;
      	 //是否付费维修
      	 if(document.getElementById("isffwx").checked)
      	 	{		isffwx = 1;		}
      	 else{		isffwx =0;		};

      	 scsj =  $('#scsj').datebox('getValue'); 
      	 jjcd = document.getElementById("jjcd").value;
      	 thrq =  $('#thrq').datebox('getValue'); 
      	 
      	 ydh = document.getElementById("ydh").value;
      	 fhdz = document.getElementById("fhdz").value;
      	 shdz = document.getElementById("shdz").value;
      	 shr = document.getElementById("shr").value;
      	 shrlxdh = document.getElementById("shrlxdh").value;
      	 bzxx = document.getElementById("bzxx").value;
      	 //问题描述
      	 wxxz1 = $('#wxxz1').combobox('getValue');
      	 wtd1 = $('#wtd1').combogrid('getValue');//document.getElementById("wtd1").value;
      	 qy1 = $('#qy1').combogrid('getValue');
      	 xxd1 = $('#xxd1').combogrid('getValue');
      	 
      	 wxxz2 = $('#wxxz2').combobox('getValue');
      	 wtd2 = $('#wtd2').combogrid('getValue');
      	 qy2 = $('#qy2').combogrid('getValue');
      	 xxd2 = $('#xxd2').combogrid('getValue');
      	 pdclfs = $('#pdclfs').combobox('getValue');
      	 tccljg = $('#tccljg').combogrid('getValue');
      	 zrbm = $('#zrbm').combogrid('getValue');
      	 thdh = document.getElementById("thdh").value; 
      	 jcyy = document.getElementById("jcyy").value;
      	 nx = document.getElementById("nx").value;
      	 jhwxts = $('#jhwxts').combogrid('getValue');
      	 sfsf = document.getElementById("sfsf").value;
      	 sfje = document.getElementById("sfje").value;
      	 sfnr = document.getElementById("sfnr").value;
      	 pjpdbz = document.getElementById("pjpdbz").value;
      	// alert(ztold+"ssss"+zt);return;
      	
      	//登记     品检    维修完成    重判     发货  数据保存必填项提示
       	 if(id=="save0123456")
       		{
       	//品鉴判断
				if(zt==1){
					zt=3;//产品退仓
				}else if(zt==2){
					zt=4;//不可以维修
				}else if(zt==3){
					zt=5;//可以维修
				}
       		 
       		 //登记
       		 if(""==dpbm){
       			 $.messager.alert("提示", "店铺编码必选");return;
       		 }else	 if(""==sldg){
       			 $.messager.alert("提示", "受理导购必填");return;
       		 }else if(""==dglxdh){
       			 $.messager.alert("提示", "导购联系电话必填");return;
       		 }
       		 else if(document.getElementById("isgkwx").checked == true)
  			 { 
		       	  if(""==gkxm){
		       			 $.messager.alert("提示", "顾客姓名必填");return;
		       		 }
		       		 else if(""==scsj){
		       			 $.messager.alert("提示", "售出时间必填");return;
		       		 } 
  			 }
       		 else if(""==thrq){
       			 $.messager.alert("提示", "退回时间必填");return;
       		 } else if(compareDate($('#scsj').datebox('getValue'),$('#thrq').datebox('getValue'))){
        		 $.messager.alert("提示", "请检查售出时间必在退回日期之前");return;
        	 }else if(""==kh){
       			 $.messager.alert("提示", "款号必填");return;
       		 }else if(kh.length<5){
       			 $.messager.alert("提示", "款号太短");return;
       		 }
       		 else if(""==wtms){
       			 $.messager.alert("提示", "问题描述必填");return;
       		 }
       		/* else if(""==ysgs){
       			 $.messager.alert("提示", "运输公司必填");return;
       		 }*/
       		 else if((""==wxxz1&&wxxz1!=0)||(""==wtd1&&wtd1==0)||(""==qy1&&qy1==0)||(""==xxd1&&xxd1==0)){
       			$.messager.alert("提示", "问题描述主因必填");return;
       		}else if(zt==0||zt==""){
      			$.messager.alert("提示", "请选择判定处理方式");return;
      		}
       			
       		}else   if(id=="save00") //登记     品检    维修完成    重判     发货  数据保存必填项提示
      		{//登记
	      		 if(""==dpbm){
	      			 $.messager.alert("提示", "店铺编码必选");return;
	      		 }else	 if(""==sldg){
	      			 $.messager.alert("提示", "受理导购必填");return;
	      		 }else if(""==dglxdh){
	      			 $.messager.alert("提示", "导购联系电话必填");return;
	      		 }
	      		 else if(document.getElementById("isgkwx").checked == true)
	      			 {
		      			if(""==gkxm){
			      			 $.messager.alert("提示", "顾客姓名必填");return;
			      		 }
			      		 else if(""==scsj){
			      			 $.messager.alert("提示", "售出时间必填");return;
			      		 }
	      			 }
	      		else if(""==thrq){
	       			 $.messager.alert("提示", "退回时间必填");return;
	       		 } else if(compareDate($('#scsj').datebox('getValue'),$('#thrq').datebox('getValue'))){
	        		 $.messager.alert("提示", "请检查售出时间必在退回日期之前");return;
	        	 }else if(""==kh){
	      			 $.messager.alert("提示", "款号必填");return;
	      		 }
	      		 else if(""==wtms){
	      			 $.messager.alert("提示", "问题描述必填");return;
	      		 }
	      		 else if(""==ysgs){
	      			 $.messager.alert("提示", "运输公司必填");return;
	      		 }
      		
      		}else if(id=="save10"){
      			//发到总部
      			if(ztold!="登记"){
      				$.messager.alert("提示", "当前状态不能发到总部");return;
      			}
      			
      		}else if(id=="save20"){
      			//品鉴判断
      			if(ztold!="已发总部"){
      				$.messager.alert("提示", "当前状态不能品鉴判定");return;
      			}
      			
      			if(zt==0||zt==""){
      				$.messager.alert("提示", "请选择判定处理方式");return;
      			}else{
      				if(zt==1){
      					zt=3;//产品退仓
      				}else if(zt==2){
      					zt=4;//不可以维修
      				}else if(zt==3){
      					zt=5;//可以维修
      				}
      			}
      			
      			if((""!=wxxz1&&wxxz1!=0)&&(""!=wtd1&&wtd1!=0)&&(""!=qy1&&qy1!=0)&&(""!=xxd1&&xxd1!=0)){
      				
      			}else{
      				$.messager.alert("提示", "问题描述主因必填");return;
      			}
      			
      		}else if(id=="save020"){
      			//从新判定
      			if(ztold=="产品退仓"||ztold=="不可维修待退店铺"||ztold=="维修中"){
      			}else{
      				$.messager.alert("提示", "当前状态不能重新判定");return;
      			}
      			
      		}else if(id=="save07"){
      			//维修完成
      			if(ztold!="维修中"){
      				$.messager.alert("提示", "当前状态不能确认");return;
      			}
      			
      			if($('#gys').combogrid('getText')!=""){
      				wxr = $('#gys').combogrid('getText');
      			}else if($('#wxr2').combogrid('getText')!=""){
      				wxr = $('#wxr2').combogrid('getText');
      			}else{wxr="";}
      			 
      			if($('#wxsj2').datebox('getValue')!=""){
      				wxsj = $('#wxsj2').datebox('getValue');
      			}else if($('#wxsj_gys').datebox('getValue')!=""){
      				wxsj = $('#wxsj_gys').datebox('getValue');
      			}else{wxsj="";}
      			
      			if(""==wxr){
      			$.messager.alert("提示", "维修人必填");return;
      			}
      			if(""==wxsj){
          			$.messager.alert("提示", "维修时间必填");return;
          			}
      			$('#wxwc').window('close');
      			
      		}else if(id=="save08"){
      			//总部发货
      			if(ztold=="维修完成"||ztold=="不可维修待退店铺"||ztold=="维修未完成"){
      				
      			}else{
      				$.messager.alert("提示", "当前状态不能发到店铺");return;
      			}
      	     	//总部发货数据
      	     	zbfh_ysgs = $('#zbfh_ysgs').combogrid('getText');
      	     	zbfh_ysdh = document.getElementById("zbfh_ysdh").value;
      	     	zbfh_shdz = document.getElementById("zbfh_shdz2").value;
      	     	zbfh_fhdz = document.getElementById("zbfh_fhdz2").value;
      	     	zbfh_shr = document.getElementById("zbfh_shr2").value;
      	     	zbfh_shrdh = document.getElementById("zbfh_shrdh2").value;
      	     	zbfh_bz = document.getElementById("zbfh_bz").value;
      			if(""==zbfh_ysgs){
         			 $.messager.alert("提示", "运输公司必填");return;
         		 }else if(""==zbfh_ysdh){
         			 $.messager.alert("提示", "运输单号必填");return;
         		 }
      			$('#win').window('close');
      		}
      	 
      	 //生成维修单号  exec GenerateCYWXDJBDH
      	
      	 if((""==wxdh||"null"==wxdh)){
      		 $.post(	'rest/getWxdh/'+dpbm,
             function(wxdh1){
			     wxdh = wxdh1;
			     document.getElementById("wxdh").value=wxdh;
      		 	},'text'
             );
      	};
      		 
      			var params={'id':id,'guid':guid,'wxdh':wxdh,'zt':zt,'dpbm':dpbm,'dpmc':dpmc,'dplx':dplx,	'dzxm':dzxm,'dzlxdh':dzlxdh,	'wxcbm':wxcbm,'wxcmc':wxcmc	,'sldg':sldg,'dglxdh':dglxdh,'isgkwx':isgkwx,		
         	    	 'vipkh':vipkh,'gkxm':gkxm,	'gklxdh':gklxdh,'scsj':scsj,	'isffwx':isffwx,'jjcd':jjcd,
         	    	 'kh':kh,'thrq':thrq,'wtms':wtms,
         	    	 'ysgs':ysgs,'ydh':ydh,'fhdz':fhdz,'shdz':shdz,'shr':shr,'shrlxdh':shrlxdh,'bzxx':bzxx,
      			'wxxz1':wxxz1,'wtd1':wtd1,'qy1':qy1,'xxd1':xxd1,   'wxxz2':wxxz2,'wtd2':wtd2,'qy2':qy2,'xxd2':xxd2,   
      			'pdclfs':pdclfs,'tccljg':tccljg,'zrbm':zrbm,'thdh':thdh,'jcyy':jcyy,
      			'nx':nx,'jhwxts':jhwxts,'sfsf':sfsf,'sfje':sfje,'sfnr':sfnr,'pjpdbz':pjpdbz,
      			'wxr':wxr,'wxsj':wxsj,'zbfh_ysgs':zbfh_ysgs ,'zbfh_ysdh':zbfh_ysdh ,'zbfh_shdz':zbfh_shdz ,
      	     	'zbfh_fhdz':zbfh_fhdz ,'zbfh_shr':zbfh_shr ,'zbfh_shrdh':zbfh_shrdh ,'zbfh_bz':zbfh_bz
      	     	};
      			
      			$.post(	'rest/saveRegister/save',
             		params,
             		function(reinfo){
      				var e = eval("(" + reinfo + ")");
      				if(e[0].uuid!="uuid"){document.getElementById("guid").value=e[0].uuid;}
      				$.messager.alert("提示", e[0].tcjginfo);
      				
      				
      				if("save0123456"==id||"save00"==id){
      				}else{
      					if("save07"==id||"save08"==id){
          					$('#wxwc').window('close');
          					$('#wxwc_gys').window('close');
          					$('#zbfh').window('close');
          				}
      					//保存成功    列表 数据是否刷新？  
      					//window.parent.frames.getLib();
      					getDetail(guid,zt)
      					
      				}
      				//$('#mian').tabs('select','列表');
         	 },
             		 'text'
             		 ).error(function() {
      					$.messager.alert("提示", "保存失败");
      		});	

      }
    
      
          //获取店铺信息
          function getdpvalue(depotid)
          {
         	 var ldplx,pp;
         	 $('#sldg').combogrid({
       			panelWidth:290,
       	 		mode:'remote',
       			idField:'telephone',
       			textField:'names',  	
       			
       			url:'rest/getSldg/'+depotid,
       			method:'post',
       			onChange:function (idField){  
       				//alert(idField);
       				//getdpvalue(idField); // 
       				// var sldgs = eval("(" + sldgs + ")");
       				document.getElementById("dglxdh").value=idField;
       				
       			 },
       			columns:[[
       				{field:'employeeid',title:'员工编码',width:90},
       				{field:'names',title:'姓名',width:90},
       				{field:'telephone',title:'电话',width:90}
       			]]
       		});
         	 
      		$.post(	'rest/getFilterdp/S2',
      				{'depotid':depotid},function(queryfilter) {
      					var shops = eval("(" + queryfilter + ")");
      					alert(shops[0].address);
      					if(null!=shops[0].dname){document.getElementById("dpmc").value=shops[0].dname;};
      					if(null!=shops[0].address){document.getElementById("fhdz").value=shops[0].address;};
      					if(null!=shops[0].r_name){document.getElementById("dzxm").value=shops[0].r_name;};
      					
      					if(null!=shops[0].Tel){document.getElementById("dzlxdh").value=shops[0].Tel;};
      				    
      					if(null!=shops[0].m_type){document.getElementById("dplx").value=shops[0].m_type;};
      				    if (shops[0].m_type == "11")    
      				    {ldplx = "1";document.getElementById("dplx").value = "自营";}  
      				    else{ ldplx = "2";document.getElementById("dplx").value = "加盟";}
      				     pp=shops[0].brandid;
      					
      					 
      								 
      				//维修仓 对应 店铺
      				     $.post(	'rest/getWxcdp/S2',
      								{'pp':pp,'ldplx':ldplx},function(wxc) {
      									var wxcs = eval("(" + wxc + ")");
      									if(null!=wxcs[0].wxcbm){document.getElementById("wxcbm").value=wxcs[0].wxcbm;};
      									if(null!=wxcs[0].wxcmc){document.getElementById("wxcmc").value=wxcs[0].wxcmc;};
      									
      									$.post(	'rest/getFilterdp/S2',
      											{'depotid':wxcs[0].wxcbm},function(queryfilter) {
      											
      												var shops = eval("(" + queryfilter + ")");
      											
      												if(null!=shops[0].address){document.getElementById("shdz").value=shops[0].address;};
      												if(null!=shops[0].r_name){document.getElementById("shr").value=shops[0].r_name;};
      												if(null!=shops[0].Tel){document.getElementById("shrlxdh").value=shops[0].Tel;};
      												
      												}, 'text').error(function() {
      											$.messager.alert("提示", "信息获取失败");
      										});	      
      								}, 'text').error(function() {
      							$.messager.alert("提示", "信息获取失败");
      						});
      					    
      				}, 'text').error(function() {
      			$.messager.alert("提示", "信息获取失败");
      		});
      	    
      	}    
     

  
     //---------------------------------------------

        function checkKh(value){
      	  if(""==value){
      		  $.messager.alert("提示", "款号必填");
      	  }else 
      	  if(value.length<5){
      		$.messager.alert("提示", "款号太短");
      	  }else { 
      		  $.post(	'rest/checkKh/'+value,
          		 {'params':value},
          		 function(newkh){	
          			 
          			 if("wu"==newkh){
          				 $.messager.alert("提示","系统没有检测到这个款号","warning",function(){
          					
  	        				// var oInput = document.getElementById("kh");
  			          	    //	oInput.focus();
          				 });  
  			              	
          			 }else{
          			 document.getElementById("kh").value=newkh;
          			 }
          		 },
          		 'text'
          		 );	
      	  }
      	
         }
        
        
      //顾客维修改变子框的权限输入
		function isGkwx() {
			if (document.getElementById("isgkwx").checked == true) {

				document.getElementById("vipkh").disabled = false;
				document.getElementById("gkxm").disabled = false;
				document.getElementById("gklxdh").disabled = false;
				$("#scsj").combogrid('enable');
				document.getElementById("isffwx").disabled = false;
			} else {
				document.getElementById("vipkh").disabled = true;
				document.getElementById("gkxm").disabled = true;
				document.getElementById("gklxdh").disabled = true;
				$("#scsj").combogrid('disable');
				document.getElementById("isffwx").disabled = true;
			}

		}
		
		
        
        //获取店铺信息
        function getdpvalue(depotid)
        {
       	 var ldplx,pp;
       	 $('#sldg').combogrid({
     			panelWidth:290,
     	 		mode:'remote',
     			idField:'telephone',
     			textField:'names',  	
     			
     			url:'rest/getSldg/'+depotid,
     			method:'post',
     			onChange:function (idField){  
     				//alert(idField);
     				//getdpvalue(idField); // 
     				// var sldgs = eval("(" + sldgs + ")");
     				document.getElementById("dglxdh").value=idField;
     				
     			 },
     			columns:[[
     				{field:'employeeid',title:'员工编码',width:90},
     				{field:'names',title:'姓名',width:90},
     				{field:'telephone',title:'电话',width:90}
     			]]
     		});
       	 
    		$.post(	'rest/getFilterdp/S2',
    				{'depotid':depotid},function(queryfilter) {
    					var shops = eval("(" + queryfilter + ")");
    					if(null!=shops[0].dname){document.getElementById("dpmc").value=shops[0].dname;};
    					if(null!=shops[0].address){document.getElementById("fhdz").value=shops[0].address;};
    					if(null!=shops[0].r_name){document.getElementById("dzxm").value=shops[0].r_name;};
    					
    					if(null!=shops[0].Tel){document.getElementById("dzlxdh").value=shops[0].Tel;};
    				    
    					if(null!=shops[0].m_type){document.getElementById("dplx").value=shops[0].m_type;};
    				    if (shops[0].m_type == "11")    
    				    {ldplx = "1";document.getElementById("dplx").value = "自营";}  
    				    else{ ldplx = "2";document.getElementById("dplx").value = "加盟";}
    				     pp=shops[0].brandid;
    				//     alert(pp+ldplx);
    					
    					 
    								 
    				//维修仓 对应 店铺
    				     $.post(	'rest/getWxcdp/S2',
    								{'pp':pp,'ldplx':ldplx},function(wxc) {
    									var wxcs = eval("(" + wxc + ")");
    									if(null!=wxcs[0].wxcbm){document.getElementById("wxcbm").value=wxcs[0].wxcbm;};
    									if(null!=wxcs[0].wxcmc){document.getElementById("wxcmc").value=wxcs[0].wxcmc;};
    									
    									$.post(	'rest/getFilterdp/S2',
    											{'depotid':wxcs[0].wxcbm},function(queryfilter) {
    											
    												var shops = eval("(" + queryfilter + ")");
    											
    												if(null!=shops[0].address){document.getElementById("shdz").value=shops[0].address;};
    												if(null!=shops[0].r_name){document.getElementById("shr").value=shops[0].r_name;};
    												if(null!=shops[0].Tel){document.getElementById("shrlxdh").value=shops[0].Tel;};
    												
    												}, 'text').error(function() {
    											$.messager.alert("提示", "信息获取失败");
    										});	      
    								}, 'text').error(function() {
    							$.messager.alert("提示", "信息获取失败");
    						});
    					    
    				}, 'text').error(function() {
    			$.messager.alert("提示", "信息获取失败");
    		});
    	    
    	}    