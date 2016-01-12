/**
 * Author: chenyajie
 * Time: 2015-10-30
 * chart.js是数据图表的文件
 * @example
 * 	$("#chartWrap").chart({
		data : [         // 数据 这个一个二维数组且里面必需位数字
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[...]
		]
	});
 **/

define('app/chart', ["lib/echartsAll"], function() {
	$.fn.chart = function(options) {
		var el = $(this);
		if (el.length == 0) {
			return;
		}
		if (el.length > 1) {
			for (var i = 0; i < el.length; i++) {
				el.eq(i).chart(options);
			}
			return;
		}
		if (!options) {
			options = {}
		};
		

		var opts = {
			data : null,
			selectedData : [0],
			xAxisData : null,
			color: ["#90BAFE", "#70D875", "#FFBF6D", "#F953BA", "#60E8CC", "#00fa9a", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#FAEBB4", "#ffd700"],
			legend: { //图例
				show: false,
				selectedMode: 'single',
				data: null,
				selected: null
			},
			tooltip: { //提示框
				trigger: 'axis',
				axisPointer: {
					type: 'none'
				},
				padding: 7,
				formatter: function(params, ticket, callback) {
					var res = '<div style="margin-bottom:2px;">' + params[0].name + '</div>';
					for (var i = 0, l = params.length; i < l; i++) {
						res += '<i style="display:inline-block;width:10px;height:10px; margin-right:10px;background:' + opts.color[params[i].seriesIndex] + ';"></i>' + params[i].seriesName + ' : ' + params[i].value + '<br/>';
					}
					return res;
				}
			},
			toolbox: { //工具箱-右上角
				show: false
			},
			calculable : false, //是否启用拖拽重计算特性
			xAxis: [{
				type: 'category',
				position: 'bottom',
				min: 0,
				max: 30,
				splitNumber: 7,
				axisTick: {
					lineStyle : {
						color : "#ccc"
					}
				},
				axisLine: {
					show: false
				},
				splitLine: {
					show: false,
					onGap: null
				},
				boundaryGap: false,
				data: null
			}],
			yAxis: [{
				type: 'value',
				name: '',
				axisLine: {
					show: false
				},
				splitNumber: 4
			}],
			axis: {
				show: false
			}
			
		}

		$.extend(true, opts, options);

		var map = {
			"myChart" : null,
			"chartTable": el.find(".j_chartTable"),		//chart数据表格
			"chartCell": el.find(".j_chartCell"),		//每一列
			"chartTitle": el.find('.j_chartTitle'),		
			"chart": el.find(".j_chart")				//chart图表
		};

		var utils = {
			setData: function(){
				// series 数据
				var arr = [];
				for (var i = 0; i < opts.data.length; i++) {
					var itemData = {
						name: opts.legend.data[i],
						type: 'line',
						data: opts.data[i],
						symbol: 'circle',
						markPoint: {
							data: [{
								type: 'max',
								name: '最大值'
							}, {
								type: 'min',
								name: '最小值'
							}]
						}

					};
					arr.push(itemData);
				}
				opts.series = arr;
				
				//xAis[0].data
				if(opts.xAxisData){
					opts.xAxis[0].data = opts.xAxisData;
				}
			},
			init: function(flag) {
				utils.dataReset();
				map.myChart = echarts.init(map.chart[0]);
				window.onresize = map.myChart.resize;
				utils.eventBind();
				utils.setData(opts.data);
				map.myChart.setOption(opts);
				for(var i = 0; i < opts.selectedData.length; i++){
					map.chartCell.eq(opts.selectedData[i]).addClass("active");
				};
				map.chartCell.each(function(i){
					$(this).find(".j_cellColor").css("border-bottom-color", opts.color[i])
				});
				$.chartChange = function(data,xAxisData){
					opts.data = data;
					opts.xAxisData = xAxisData;
					map.chartCell.removeClass('active');
					for(var i = 0; i < opts.selectedData.length; i++){
						map.chartCell.eq(opts.selectedData[i]).addClass("active");
						map.myChart.component.legend.setSelected(opts.legend.data[opts.selectedData[i]], true);
					}
					utils.setData();
					map.myChart = echarts.init(map.chart[0]);
					window.onresize = map.myChart.resize;
					map.myChart.setOption(opts);
				};
				
			},
			dataReset : function(){
				if(!opts.legend.data){
					opts.legend.data = (function(){
						var arr = [];
						map.chartTitle.each(function(i, ele) {
							arr.push($(ele).text());
						});
						return arr;
					})();
				};
				opts.legend.selected = (function(){
					var json1 = {};
					for (var i = 0; i < opts.legend.data.length; i++) {
						if(opts.selectedData && B.contains(opts.selectedData, i)){
							json1[opts.legend.data[i]] = true;
						}else{
							json1[opts.legend.data[i]] = false;
						}
					}
					return json1;
				})();
			},
			eventBind: function() {
				//给chart绑定事件
				map.chartCell.on('click', function() {
					var thisObj = $(this),
						isSelectNum = map.chartTable.find('.j_chartCell.active').length,
						index = thisObj.index(),
						dataName = opts.legend.data[index],
						isSelected = map.myChart.component.legend.isSelected(dataName);
					if(opts.legend.selectedMode == "single"){
						if (isSelected && isSelectNum == 1 || thisObj.hasClass('active')) {
							return;
						}
						map.chartCell.removeClass('active');
						thisObj.addClass('active');
					}else{
						if (isSelected && isSelectNum == 1) {
							return;
						}
						if(thisObj.hasClass("active")){
							thisObj.removeClass('active');
						}else{
							thisObj.addClass('active');
						}
					}
					map.myChart.component.legend.setSelected(dataName, !isSelected);
				});

			}
		};
		utils.init(true);
	}
});