/** 
 * Author:shanjing
 * Time:2015-11-16
 * 通用alert类弹出框显现方法
 * @param {hintContent} string 弹框显示的内容
 * @param {init} 初始化函数,可修改默认alert弹出框html结构
 * @param {onSure} 回调函数，执行确认事件函数
 * @param {onClosed} 关闭弹框事件
 * @param {onBefore} 弹框显示事件
 * @example1
		$.popAlert({hintContent:'确认删除吗',onSure: function() {
			//绑定确认按钮事件
    	}});
 * @example2
 		此调用方法最多只能传两个参数，第一个参数为弹框显示的内容，第二个参数为确认事件函数
		$.popAlert('确认删除吗', function() {
			//绑定确认按钮事件
    	});

**/
define("app/popAlert",[], function(){
	$.popAlert = function(options){
		if(!options) options = {} ;
		var opts = {
			"popId" : "pop_alert",
			"hintContent" : "",
			"init" : null,
			"onSure" : null,
			"onBefore" : null,
			"onClosed" : null
		};
		$.extend(true, opts, options);
		if(typeof arguments[0] == "string"){
			opts.hintContent = arguments[0];
			if( arguments[1] ){
				if(typeof arguments[1] == "function"){
					opts.onSure = arguments[1];
				};
			};
		};
		var map = {
			"pop" : $("#" + opts.popId),
			"cover" : $("#popCover")
		};
		var utils = {
			init : function(){
				if($("#popCover").length == 0){
					$("body").append('<div class="pop_cover" id="popCover" style="display:none"></div>');
					map.cover = $("#popCover");
				};
				if( $("#" + opts.popId).length == 0 ){
					var popAlertHtml = '';
						popAlertHtml += '<div class="pop_wrap ssPop" id='+opts.popId+'>';
						popAlertHtml += '<div class="pop_main">';
						popAlertHtml += '<div class="pop_titleBox clearfix">';
						popAlertHtml += '<p class="l pop_title">提示</p>';
						popAlertHtml += '<a class="r icon_close icon j_popClosed" href="javascript:void(0)"></a>';
						popAlertHtml += '</div>';
						popAlertHtml += '<div class="pop_content">';
						popAlertHtml += '<div class="tac p30 f14 pop_alertCon j_pop_alertCon"></div>';
						popAlertHtml += '</div>';
						popAlertHtml += '<div class="tac pb20">';
						popAlertHtml += '<a href="javascript:void(0)" class="btn_b j_popSureBtn">确认</a>';
						popAlertHtml += '</div>';
						popAlertHtml += '</div>';
						popAlertHtml += '</div>';
					$("body").append(popAlertHtml);
					map.pop = $("#" + opts.popId);
					map.pop.find(".j_popSureBtn").on("click", function(){
						if(opts.onSure) var flag = opts.onSure();
						if(!(flag && flag == -1)) utils.popHide();
					});
					map.pop.find(".j_popCancelBtn").on("click", function(){
						utils.popHide();
					});
					map.pop.find(".j_popClosed").off("click").on("click", function(){
						utils.popHide();
					});
				};
				if(opts.init){
                    opts.init();
                };
			},
			popShow : function(){
				if(opts.onBefore) opts.onBefore();
				$(".j_pop_alertCon").text(opts.hintContent);
                map.pop.show();
                map.pop.css("height", map.pop.children().height() + "px");
                map.pop.css("visibility", "visible");
                map.cover.show();
			},
			popHide : function(){
				if(opts.onClosed) opts.onClosed();
                map.pop.css("visibility", "hidden").hide();
                map.cover.hide();
				
			}
		};
		utils.init();
		utils.popShow();
	};
});