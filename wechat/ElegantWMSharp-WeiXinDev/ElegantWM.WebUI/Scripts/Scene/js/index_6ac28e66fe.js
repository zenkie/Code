"use strict";!function(){function o(){clearTimeout(s),t.addClass("done")}var t=$(".js-tpl-weixin-list-item"),n=$(".js-tpl-weixin-bg");if(!(n.length<=0)){var e=n[0],s=setTimeout(function(){o()},2e3);e.onload=e.onerror=e.onabort=o,e.complete&&o()}}(),function(){var o=0;$(".js-tpl-fbb").find(".swiper-slide").each(function(){o+=100;var t=$(this);setTimeout(function(){t.addClass("done")},o)}),$.fn.swiper&&$(".js-tpl-fbb").swiper({mode:"horizontal",slidesPerView:"auto"})}(),function(){var o=$(".js-tpl-shop"),t="/v2/showcase/homepage/goodscount.json";o.length&&$.ajax({url:t,type:"GET",dataType:"json"}).done(function(t){if(0===+t.code){var n=o.find(".js-all-goods"),e=o.find(".js-new-goods"),s=o.find(".js-order"),a=t.data,l="";l=(a.all_goods.count+"").length,n.find("a").attr("href",a.all_goods.url),n.find(".count").html(a.all_goods.count).addClass("l-"+l),l=(a.new_goods.count+"").length,e.find("a").attr("href",a.new_goods.url),e.find(".count").html(a.new_goods.count).addClass("l-"+l),s.find("a").attr("href",a.order.url)}})}(),function(){var o=$(".js-custom-level"),t=$(".js-custom-point"),n=$(".js-custom-level-title-section");if(!(_global.fans_id<=0)){var e=window._global.url.wap+"/showcase/component/fans.jsonp?"+$.param({kdt_id:window._global.kdt_id});(o.length>0||t.length>0)&&$.ajax({dataType:"jsonp",type:"GET",url:e,success:function(e){0===+e.code&&(o.html(e.data.level||"会员"),t.html(e.data.point||"暂无数据"),n.removeClass("hide"))}})}}();