/**
 * Author: chenyajie
 * Time: 2015-11-03
 **/

define('app/filter', ["app/select", "app/filterAdd"], function() {
	$.fn.filter = function(options) {
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
			"selectOpts" : {
				"width" : "auto",
				"optionWidth" : 100,
				"allowSelectId" : false,
				"selectId" : 0,
				"className" : "filterSelect l selectSmall"
			},
			"table" : null,
			"defaultID" : 0,
			"closeHTML" : '<a href="javascript:void(0)" class="filterClosed r j_filterClosed">x</a>',
			"init" : null,
			"search" : null
		}

		$.extend(true, opts, options);

		var map = {
			"table" : opts.table || $("#table"),
			"selectDoom" : el.find(".j_select"),
			"filterBox" : el.find(".j_filterBox"),
			"filter" : el.find(".j_filter"),
			"filterAdd" : el.find(".j_filterAdd"),
			"filterAddLi" : el.find(".j_filterAddLi"),
			"filterBtn" : el.find("#searchBtn")
		};

		var utils = {
			init : function(){
				map.selectDoom.select(opts.selectOpts);
				map.filterAddLi.each(function(){
					if($(this).attr("data-close") != -1){
						map.filter.eq($(this).attr("data-close")).find("select").before(opts.closeHTML);
					}
				});
				utils.eventBind();
				if(opts.init){
					opts.init.call(el);
				}
			},
			eventBind : function(){
				map.filterBox.delegate(".j_filterClosed", "click", function(){
					var thisFilter = $(this).parent(),
						select = thisFilter.find("select"),
						id = opts.defaultID,
						v = select.find("option").eq(0).text();
					thisFilter.find(".j_selectShow p").attr({"data-value" : id, "title" : v}).text(v);
					select.val(0);
					select.find("option").eq(0).attr("selected", true).attr("selected", "selected").siblings().removeAttr("selected");
					thisFilter.hide();
				});
				map.filterBtn.on("click", function(){
					map.filter.each(function(){
						var number = parseInt($(this).attr("data-value"));
						if($(this).is(":hidden")){
							map.table.find("dt").find(".item").eq(number).hide();
							map.table.find("dd").find(".item").eq(number).hide();
							map.table.find(".j_tableTotal").find(".item").eq(number).hide();
						}else{
							if(map.table.find("dt").find(".item").eq(number).is(":hidden")){
								map.table.find("dt").find(".item").eq(number).show();
								map.table.find("dd").find(".item").eq(number).show();
								map.table.find(".j_tableTotal").find(".item").eq(number).show();
							}
						}

					});
					if(opts.search){
						opts.search.call(el);
					}
				});
				map.filterAdd.filterAdd();
			}
		};
		utils.init();
	}
});