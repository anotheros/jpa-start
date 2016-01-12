/**
 * Author: chenyajie
 * Time: 2015-11-03
 **/

define('app/seacher', ["app/select", "app/timeArea"], function() {
	$.fn.seacher = function(options) {
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
				"width" : 100
			},
			"timeAreaOpts" : {
				"defaultStarDate" : $("#starDate"),
				"defaultEndDate" : $("#endDate"),
				"forSearch" : true,
				"width" : 260,
				"top" : 32
			},
			"seach" : null,
			"init" : null
		}

		$.extend(true, opts, options);

		var map = {
			"selectDoom" : el.find(".j_select"),
			"timeDoom" : el.find("#timeValue"),
			"seachBtn" : el.find("#searchBtn")
		};

		var utils = {
			init : function(){
				map.selectDoom.select(opts.selectOpts);
				map.timeDoom.timeArea(opts.timeAreaOpts);
				utils.eventBind();
				if(opts.init){
					opts.init.call(el);
				}
			},
			eventBind : function(){
				map.seachBtn.on("click", function(){
					if(opts.seach){
						opts.seach.call(el);
					}
				});
			}
		};
		utils.init();
	}
});