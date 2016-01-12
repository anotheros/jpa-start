/** 
 * Author:weishuheng
 * Time:2015-10-23
 **/
define("app/timeArea", ["lib/jquery-ui-1.10.4"], function(){
    $.fn.timeArea = function(options){
        if($(this).length == 0) return;
        if(!options) options = {};
        var opts = {
            "trigger" : "click",
            "html" : null,
            "lid" : 1,
            "left" : 0,
            "top" : 30,
            "width" : 310,
            "defaultNumber" : 2,
            "minDate" : "-5y",
            "maxDate" : 0,
            "datePickerOpts" : null,
            "yearLen" : 1,
            "starAllDate" : null,
            "defaultStarDate" : null,
            "defaultEndDate" : null,
            "forSearch" : false,
            "init" : null,
            "change" : null,
            "onBefore" : null,
            "onClose" : null
        };
        $.extend(true, opts, options);
        var $this = this;
        var map = {
            "el" : $this,
            "tipBox" : null,
            "pop" : null,
            "btnBox" : null,
            "list" : null,
            "starDate" : null,
            "endDate" : null,
            "tip" : null,
            "datePickerOpts" : null,
            "saveBtn" : null,
            "cancelBtn" : null,
            "prevDateData" : ""
        };
        var utils = {
            init : function(){
                utils.language();
                if($("#timeArea").length == 0) $("body").append(utils.html());
                utils.mapReset();
                map.datePickerOpts.onSelect = function(){ map.btnBox.show(); };
                utils.bindEvent();
                if(opts.defaultStarDate && opts.defaultEndDate && opts.defaultStarDate.val() && opts.defaultEndDate.val()){
                    utils.popHide({
                        "starDate": opts.defaultStarDate.val().replace(/-/g,"/"),
                        "endDate": opts.defaultEndDate.val().replace(/-/g,"/"),
                        "txt": map.tip.customDate
                    });
                    map.starDate.val(opts.defaultStarDate.val().replace(/\//g,"-"));
                    map.endDate.val(opts.defaultEndDate.val().replace(/\//g,"-"));
				
                }else{
                    map.list.find("li").eq(opts.defaultNumber).trigger("click");
                }
                if(opts.init) opts.init.call($this);
            },
            mapReset : function(){
                map.pop = $("#timeArea");
                map.tipBox = map.pop.find(".j_timeAreaTip");
                map.btnBox = map.pop.find(".j_timeBtnBox");
                map.list = map.pop.find(".j_timeList");
                map.starDate = map.pop.find(".j_starDate");
                map.endDate = map.pop.find(".j_endDate");
                map.saveBtn = map.btnBox.find(".j_timeSave");
                map.cancelBtn = map.btnBox.find(".j_timeCancel");
            },
            setPos : function(){
                var l = map.el.offset().left,
                    t = map.el.offset().top;
                map.pop.css({
                    "left" : l + opts.left + "px",
                    "top" : t + opts.top + "px"
                });
            },
            checkYearLen : function(star, end){
                var starArr = star.split("/"),
                    endArr = end.split("/"),
                    year = endArr[0] - starArr[0],
                    moon = endArr[1] - starArr[1],
                    date = endArr[2] - starArr[2];
                if(year == 0){
                    return false;
                }else if(year == 1){
                    if(moon > 0){
                        return true;
                    }else if(moon == 0){
                        if(date >= 0){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }
                }else{
                   return true;
                }
            },
            bindEvent : function(){
                map.list.delegate("li", "click", function() {
                    var t = $.trim($(this).text()),
                        d = new Date(),
                        y = d.getFullYear(),
                        m = d.getMonth();
                    switch(t){
                        case map.tip.today :        //今天
                            var starDate = utils.formatDate(d, "yyyy/MM/dd"),
                                endDate = utils.formatDate(d, "yyyy/MM/dd");
                            break;
                        case map.tip.yesterday :    //昨天
                            var starDate = utils.formatDate(d, "yyyy/MM/dd", -1),
                                endDate = utils.formatDate(d, "yyyy/MM/dd", -1);
                            break;
                        case map.tip.lastSeven :    //过去7天
                            var starDate = utils.formatDate(d, "yyyy/MM/dd", -7),
                                endDate = utils.formatDate(d, "yyyy/MM/dd");
                            break;
                        case map.tip.lastThirty :   //过去30天
                            var starDate = utils.formatDate(d, "yyyy/MM/dd", -30),
                                endDate = utils.formatDate(d, "yyyy/MM/dd");
                            break;
                        case map.tip.month:         //本月
                            var thisMonth_starDate = new Date(y + "/" + (m + 1) + "/" + 1),
                                nextMonth_starDate = new Date(y + "/" + (m + 2) + "/" + 1),
                                days = (nextMonth_starDate - thisMonth_starDate) / (1000 * 60 * 60 * 24),
                                starDate = utils.formatDate(new Date(y + "/" + (m + 1) + "/" + 1), "yyyy/MM/dd"),
                                endDate = utils.formatDate(new Date(y + "/" + (m + 1) + "/" + days), "yyyy/MM/dd");
                            break;
                        case map.tip.LastMonth:     //上一月
                            var preMonth_starDate = new Date(y + "/" + m + "/" + 1),
                                thisMonth_starDate = new Date(y + "/" + (m + 1) + "/" + 1),
                                days = (thisMonth_starDate - preMonth_starDate) / (1000 * 60 * 60 * 24),
                                starDate = utils.formatDate(new Date(y + "/" + m + "/" + 1), "yyyy/MM/dd"),
                                endDate = utils.formatDate(new Date(y + "/" + m + "/" + days), "yyyy/MM/dd");
                            break;
                        case map.tip.allDate:       //所有时间
                            var starDate = utils.formatDate(new Date(opts.starAllDate.replace(/-/g,"/")), "yyyy/MM/dd"),
                                endDate = utils.formatDate(d, "yyyy/MM/dd");
                            break;
                        default : 
                            break;
                    }
                    
                    var dateData = {
                        "txt": t,
                        "starDate": starDate,
                        "endDate": endDate
                    };
                    $(this).addClass("cur");
                    $(this).siblings().removeClass("cur");
                    utils.popHide(dateData);
                });
                map.starDate.datepicker(map.datePickerOpts);
                map.endDate.datepicker(map.datePickerOpts);
                map.saveBtn.on("click", function(){
                    var starDate = map.starDate.val().replace(/-/g,"/"),
                        endDate = map.endDate.val().replace(/-/g,"/");
                    if (starDate == "" || endDate == "") {
                        if (starDate == "") {
                            map.starDate.trigger("focus");
                        } else {
                            map.endDate.trigger("focus");
                        }
                    } else {
                        if (starDate > endDate) {
                            map.tipBox.find("p").text(map.tip.starMoreEnd);
                            map.tipBox.slideDown();
                            setTimeout(function(){ map.tipBox.fadeOut(); }, 2000);
                            map.endDate.trigger("focus");
                        } else {
                            if(utils.checkYearLen(starDate, endDate)){
                                map.tipBox.find("p").text(map.tip.yearLen);
                                map.tipBox.slideDown();
                                setTimeout(function(){ map.tipBox.fadeOut(); }, 2000);
                                map.endDate.trigger("focus");
                            }else{
                               map.list.find("li").removeClass("cur");
                                var dateData = {
                                    "txt": map.tip.customDate,
                                    "starDate": starDate,
                                    "endDate": endDate
                                }
                                utils.popHide(dateData); 
                            }
                        }
                    }
                });
                map.cancelBtn.on("click", function(){
                    utils.popHide();
                });
            },
            formatDate : function(d, pattern, dateNum){
                var newDate = '';
                    pattern = pattern || "yyyy/MM/dd";
                    dateNum = dateNum || 0;
                if (dateNum != 0) {
                    newDate = new Date(d.getTime() - Math.abs(dateNum) * 24 * 60 * 60 * 1000);
                } else {
                    newDate = d;
                }
                var y = newDate.getFullYear();
                var o = {
                    "M": newDate.getMonth() + 1, //month
                    "d": newDate.getDate(), //day
                    "h": newDate.getHours(), //hour
                    "m": newDate.getMinutes(), //minute
                    "s": newDate.getSeconds() //second
                }
                pattern = pattern.replace(/(y+)/ig, function(a, b) {
                    var len = Math.min(4, b.length);
                    return (y + "").substr(4 - len);
                });
                for (var i in o) {
                    pattern = pattern.replace(new RegExp("(" + i + "+)", "g"), function(a, b) {
                        return (o[i] < 10) ? "0" + o[i] : o[i];
                    });
                }
                return pattern;
            },
            docClick: function(e){
                if (!($(e.target).closest("#timeArea").length != 0 || $(e.target).closest("#ui-datepicker-div").length != 0 || $(e.target).parent().is("a.ui-corner-all") || $(e.target).closest(".ui-datepicker-header").length != 0)) {
                    utils.popHide()
                };
            },
            popShow : function(){
                utils.setPos();
                map.pop.slideDown();
                setTimeout(function(){
                    $(document).on("click.timeAreaHide", utils.docClick);
                }, 0);
            },
            popHide : function(dateData){
                if (dateData && dateData != map.prevDateData) {
                    if(opts.forSearch){
                        var text = "";
                    }else{
                        var text = dateData.txt + "：";
                    }
                    text += utils.formatDate(new Date(dateData.starDate), "yyyy年M月d日") + " - " + utils.formatDate(new Date(dateData.endDate), "yyyy年M月d日");
                    map.el.val(text);
                    var starDate = dateData.starDate.replace(/\//g,"-"),
                        endDate = dateData.endDate.replace(/\//g,"-");
                    if(opts.defaultStarDate) opts.defaultStarDate.val(starDate);
                    if(opts.defaultEndDate) opts.defaultEndDate.val(endDate);
                    
                    if(map.prevDateData != ""){
                        if(opts.change) opts.change();
                    }
                    map.prevDateData = dateData;
                }else{
                    var dateArr = map.el.val().split("："),
                        dateArr1 = dateArr[1].split("-"),
                        starDate = dateArr1[0],
                        endDate = dateArr1[1],
                        starDate = starDate.replace("年", "-").replace("月", "-").replace("日", ""),
                        endDate = endDate.replace("年", "-").replace("月", "-").replace("日", "");
                }
                map.starDate.val(starDate);
                map.endDate.val(endDate);
                map.pop.slideUp(100);
                map.btnBox.hide();
                $(document).off("click.timeAreaHide");
            },
            language : function(){
                if(opts.lid == 1){
                    map.tip = {
                        today : "今天",
                        yesterday : "昨天",
                        lastSeven : "过去7天",
                        lastThirty : "过去30天",
                        month : "本月",
                        LastMonth : "上月",
                        allDate : "所有时间",
                        customDate : "自定义日期",
                        chooseDate : "请选择日期",
                        save : "保存",
                        cancel : "取消",
                        starMoreEnd : "结束时间不能小于开始时间",
                        yearLen : "选择时间段不能大于" + opts.yearLen + "年"
                    };
                    map.datePickerOpts = {
                        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
                        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                        currentText: "今天",
                        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                        selectOtherMonths: true,
                        dateFormat: "yy-mm-dd",
                        prevText: "上个月",
                        nextText: "下个月",
                        showMonthAfterYear: true,
                        minDate: opts.minDate,
                        maxDate: opts.maxDate,
                        defaultDate: new Date(),
                        yearSuffix: "年",
                        changeYear: true
                    };
                }else{
                    map.tip = {
                        today : "today",
                        yesterday : "yesterday",
                        lastSeven : "the past 7 days",
                        lastThirty : "the past 30 days",
                        month : "this month",
                        LastMonth : "last month",
                        allDate : "all the time",
                        customDate : "custom date range",
                        chooseDate : "please choose a date",
                        save : "save",
                        cancel : "cancel",
                        starMoreEnd : "",
                        yearLen : ""
                    };
                    map.datePickerOpts = {
                        dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        currentText: "Today",
                        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        selectOtherMonths: true,
                        dateFormat: "yy-mm-dd",
                        prevText: "Last month",
                        nextText: "next month",
                        showMonthAfterYear: true,
                        minDate: opts.minDate,
                        maxDate: opts.maxDate,
                        defaultDate: new Date(),
                        yearSuffix: "",
                        changeYear: true
                    };
                }
            },
            html : function(){
                if(opts.html){
                    var html = opts.html;
                }else{
                    var html = '<div class="timeArea" id="timeArea" style="display:none;width:' + opts.width + 'px;">';
                        html += '<ul class="timeCon j_timeList">';
                        html += '<li class="timeItem">' + map.tip.today + '</li>';
                        html += '<li class="timeItem">' + map.tip.yesterday + '</li>';
                        html += '<li class="timeItem">' + map.tip.lastSeven + '</li>';
                        html += '<li class="timeItem">' + map.tip.lastThirty + '</li>';
                        html += '<li class="timeItem">' + map.tip.month + '</li>';
                        html += '<li class="timeItem">' + map.tip.LastMonth + '</li>';
                        if(opts.starAllDate){
                            html += '<li class="timeItem">' + map.tip.allDate + '</li>';
                        }
                        html += '</ul>';
                        html += '<div class="timePlug">';
                        html += '<div class="plugTit">' + map.tip.customDate + '</div>';
                        html += '<div class="por">';
                        html += '<div class="poa dib timeAreaTip j_timeAreaTip" style="display:none">';
                        html += '<i class="icon icon_arrowDownWhite poa"></i>';
                        html += '<p></p>';
                        html += '</div>';
                        html += '<span><input class="date j_starDate" type="text" placeholder="' + map.tip.chooseDate + '"></span>';
                        html += '<span> - </span>';
                        html += '<span><input class="date j_endDate" type="text" placeholder="' + map.tip.chooseDate + '"></span>';
                        html += '</div>';
                        html += '<div class="timeBtn j_timeBtnBox mt20" style="display:none">';
                        html += '<a href="javascript:void(0)" class="btn_b mr20 j_timeSave">' + map.tip.save + '</a>';
                        html += '<a href="javascript:void(0)" class="btn_c j_timeCancel">' + map.tip.cancel + '</a>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                }
                return html;
            }
        };
        utils.init.call($(this));
        $(document).on(opts.trigger, this.selector, function(){
            map.el = $(this);
            utils.popShow();
        });
    };

});