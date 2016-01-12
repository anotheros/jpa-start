/**
 * Author: chenyajie
 * Time: 2015-11-03
 **/

define('app/filterAdd', [], function() {
	$.fn.filterAdd = function(options) {
		var el = $(this);
		if (el.length == 0) {
			return;
		}
		if (el.length > 1) {
			for (var i = 0; i < el.length; i++) {
				el.eq(i).filter(options);
			}
			return;
		}
		if (!options) {
			options = {}
		};
		

		var opts = {
			"filterBox" : null,
			"init" : null
		}

		$.extend(true, opts, options);

		var map = {
			"addList" : el.find(".j_filterAddList"),
			"addLi" : el.find(".j_filterAddLi"),
			"filterBox" : opts.filterBox || $(".j_filterBox"),
			"filterList" : []
		};

		var utils = {
			init : function(){
				utils.eventBind();
			},
			resetList : function(){
				map.filterList = [];
				map.filterBox.find(".j_filter:visible").each(function(){
					map.filterList.push($(this).find("select").find("option").eq(0).text());
				});
				map.addLi.each(function(){
					for(var i = 0; i < map.filterList.length; i++){
						if($(this).text() == map.filterList[i]){
							$(this).addClass("dis");
							return;
						}
					}
					$(this).removeClass("dis");
				});
			},
			eventBind : function(){
				el.on("click", function(){
					if(map.addList.is(":hidden")){
						utils.listShow();
					}
				});
				map.addList.delegate(".j_filterAddLi", "click", function(){
					if($(this).hasClass("dis")) return;
					map.filterBox.find(".j_filter").eq($(this).attr("data-close")).show();
					utils.listHide();
				});
			},
			docClick : function(e){
				if (!$(e.target).parents().is(map.addList)){
                    utils.listHide();
                };
			},
			listShow : function(){
				utils.resetList();
				map.addList.slideDown(200);
				setTimeout(function(){
                    $(document).on("click.addListHide", utils.docClick);
                },0);
			},
			listHide : function(){
				$(document).off("click.addListHide");
				map.addList.slideUp(200);
			}
		};
		utils.init();
	}
});