/** 
 * Author:weishuheng
 * Time:2015-09-22
 * common.js是公共模块所使用的js
**/

define("app/structure", [], function () {
	$(function(){
		var webID = requireWebUniqueIdentity.id,
			minID, maxID;
		//导航栏
		$("#navList").find("li").each(function(){
			minID = $(this).attr("data-min");
			maxID = $(this).attr("data-max"); 
			if(minID <= webID && webID <= maxID){
				$(this).addClass("cur");
				return false;
			}
		});
		var navAccountAreaShow = function(obj){
			obj.slideDown();
			setTimeout(function(){
                $(document).on("click.navAccountAreaHide", docClick_navAccount);
            }, 0);
		};
		var navAccountAreaHide = function(obj){
			obj.slideUp();
			$(document).off("click.navAccountAreaHide");
		};
		var docClick_navAccount = function(e){
			if (!($(e.target).closest("#navAccountArea").length != 0 || $(e.target).is($("#navAccount")) )) {
                navAccountAreaHide($("#navAccountArea"));
            };
		};
		$("#navAccount").on("click", function(){
			var navAccountArea = $("#navAccountArea");
			if(navAccountArea.is(":hidden")){
				navAccountAreaShow(navAccountArea);
			}else{
				navAccountAreaHide(navAccountArea);
			}
		});

		//左侧导航JS效果
		var sidebar = $('#sidebar');
		
		sidebar.find("a").each(function(){
			if($(this).attr("data-id") == webID){
				if( $(this).parents(".j_sidebarMidBox").length > 0 ){
					var box = $(this).closest(".j_sidebarBox");
					var curMidBox = $(this).parents(".j_sidebarMidBox");
					curMidBox.siblings(".j_sidebarBoxName").addClass("on");
					curMidBox.find(".j_sidebarMidName").addClass("on");
					$(this).parent().addClass("cur");
					box.find(".j_sidebarMidBox").slideDown();
					setTimeout(function(){
						curMidBox.find("ul").slideDown();
					},350)
					return false;
				}else{
					var box = $(this).closest(".j_sidebarBox");
					$(this).parent().addClass("cur");
					box.find(".j_sidebarBoxName").addClass("on");
					box.find("ul").slideDown();
					return false;
				};
			};
		});
		
		sidebar.delegate(".j_sidebarBoxName", "click", function(){
			if($(this).siblings(".j_sidebarMidBox").length > 0){
				var midBox = $(this).siblings(".j_sidebarMidBox");
				if( midBox.is(":hidden") ){
					$(this).addClass("on");
					midBox.slideDown();
				}else{
					$(this).removeClass("on");
					midBox.slideUp();
				}
			}else{
				var ul = $(this).siblings("ul");
				if(ul.is(":hidden")){
					$(this).addClass("on");
					ul.slideDown();
				}else{
					$(this).removeClass("on");
					ul.slideUp();
				}
			}
		});
		sidebar.delegate(".j_sidebarMidName", "click", function(){
				var ul = $(this).siblings("ul");
				if(ul.is(":hidden")){
					$(this).addClass("on");
					ul.slideDown();
				}else{
					$(this).removeClass("on");
					ul.slideUp();
				};
		});
		if($("body").height() < $(window).height()){
			var hh = 58,		//导航栏高度
				bh = 80,		//底部占用高度
				mh = $(window).height() - hh - bh;		//main高度
			$("#main").css("min-height", mh + "px");
			sidebar.css("max-height", mh + bh + "px");
		}
		
	});
});
