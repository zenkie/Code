﻿$().ready(function(){getClassify();getGoods();$("#addCar").click(function(){checkLogin()})});function getClassify(){$.post(GetWSRRURL("b7b1c571-24b0-4005-a7cc-a95c68707a67")+"&XML="+GetFormJson([],"Classify"),function(result){var result=eval("["+result+"]");var htmlCode='<dt class="left">商品分类：</dt>';htmlCode+='<dd class="left active"><a href="#" onclick="getGoods()">全部</a></dd>';for(var i=0;i<result[0].rows.length;i++){htmlCode+='<dd class="left" style="margin-left: 10px;"><a href="#" onclick="getGoods(\''+result[0].rows[i].code+"')\">"+result[0].rows[i].name+"</a></dd>"}$("#classify").html("").html(htmlCode);chgClass()})}function getGoods(){var XMLData="";if(arguments.length==0){XMLData=GetFormJson([],"GetGoods")}else{var data=[{"name":"txtCode","value":arguments[0]}];XMLData=GetFormJson(data,"GetClassifyGoods")}$.post(GetWSRRURL("b7b1c571-24b0-4005-a7cc-a95c68707a67")+"&XML="+XMLData,function(result){var result=eval("["+result+"]");var htmlCode="";for(var i=0;i<result[0].rows.length;i++){var picPath=result[0].rows[i].picpath;var picArray=picPath.split(",");htmlCode+='<li class="goods-list">';htmlCode+='<div class="row"><div class="span3">';htmlCode+='<img src="http://172.16.205.35:90'+picArray[0]+'" /></div>';htmlCode+='<div class="span7"><h3 class="goods-name">';htmlCode+='<a href="GoodsInfo.HTML?GoodsNo='+result[0].rows[i].goodsno+'">'+result[0].rows[i].name+"</a>";htmlCode+="</h3>";htmlCode+="<p>"+result[0].rows[i].description+"</p>";htmlCode+="</div>";htmlCode+='<div class="span3 goods-price"><span>'+result[0].rows[i].retailprice+"积分</span></div>";htmlCode+='<div class="span3 goods-active-div">';htmlCode+='<a class="goods-active-a goods-active-img-info" href="GoodsInfo.HTML?GoodsNo='+result[0].rows[i].goodsno+'">';htmlCode+='<span class="goods-active-span">查看明细</span></a>';htmlCode+="<a onclick=\"addShoppingCar('"+result[0].rows[i].goodsno+'\')" class="goods-active-a goods-active-img-car">';htmlCode+='<span class="goods-active-span">加入购物车</span></a>';htmlCode+="</div></div></li>"}$("#GoodsList").html("").html(htmlCode)})}function addShoppingCar(){if(checkLogin()){var data=[{"name":"txtGoodsNo","value":arguments[0]}];var XMLData=GetFormJson(data,"saveCart");$.post(GetWSRRURL("603d9fc5-cd4a-4d8b-80bc-020a906c5041")+"&XML="+XMLData,function(result){var result=eval("["+result+"]");getUserInfo();alert("加入成功,结算请点购物车！")})}}function chgClass(){var a=$("dd a");a.click(function(){var b=$(this).parent();$("#classify dd").removeClass("active");b.addClass("active")})};