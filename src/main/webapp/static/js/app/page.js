/**
 * Author:weishuheng
 * Time:2015-10-29
 **/
define("app/page", ["app/select"], function(){
    $.fn.page = function(options){
        if($(this).length == 0) return;
        if(!options) options = {};
        var opts = {
            "url" : null,
            "table" : null,
            "ajax" : null,
            "ajaxSuccess" : null,
            "ajaxData" : null,
            "defaultNumber" : 10,
            "numberList" : [
                {
                    "id" : 10,
                    "value" : 10
                }, {
                    "id" : 30,
                    "value" : 30
                }, {
                    "id" : 50,
                    "value" : 50
                }
            ],
            "init" : null,
            "change" : null,
            "pageChange" : null,
            "prevClick" : null,
            "nextClick" : null
        };
        $.extend(true, opts, options);
        var $this = $(this);
        var map = {
            "pageNum" : $this.find("#pageNum"),
            "liNum" : $this.find(".j_selectShow p"),
            "pageCur" : $this.find(".j_pageCur"),
            "pageAll" : $this.find(".j_pageAll"),
            "nextBtn" : $this.find(".j_nextPage"),
            "prevBtn" : $this.find(".j_prevPage"),
            "ajaxData" : {}
        };
        var utils = {
            init : function(){
                if(map.pageAll.text() == 1){
                    map.nextBtn.addClass("dis");
                }else{
                    map.nextBtn.removeClass("dis");
                };
                utils.bindEvent();
                if(opts.init) opts.init.call($this);
            },
            bindEvent : function(){
                map.pageNum.select({
                    width : 54,
                    hasSelect: false,
                    allowSelectId: false,
                    selectId: opts.defaultNumber,
                    data: opts.numberList,
                    change : function(){
                        if(opts.ajax) {
                            opts.ajax().call($this);
                        }else{
                            utils.ajax(1);
                            map.prevBtn.addClass("dis");
                        }
                        if(opts.pageChange) opts.pageChange.call($this);
                    }
                });
                map.prevBtn.on("click", function(){
                    if(map.prevBtn.hasClass("dis")) return;
                    map.nextBtn.removeClass("dis");
                    var number = Number(map.pageCur.text()) - 1;
                    if(number == 1){
                        map.prevBtn.addClass("dis");
                    }
                    if(opts.ajax) {
                        opts.ajax().call($this);
                    }else{
                        utils.ajax(number);
                    }
                    if(opts.prevClick) opts.prevClick.call($this);
                });
                map.nextBtn.on("click", function(){
                    if(map.nextBtn.hasClass("dis")) return;
                    map.prevBtn.removeClass("dis");
                    var number = Number(map.pageCur.text()) + 1,
                        all = Number(map.pageAll.text());
                    if(number > all){
                        map.nextBtn.addClass("dis");
                        return;
                    }
                    if(opts.ajax) {
                        opts.ajax().call($this);
                    }else{
                        utils.ajax(number);
                    }
                    if(opts.nextClick) opts.nextClick.call($this);
                });
            },
            ajax : function(cur){
                if(opts.ajaxData){
                    if(B.isFunction(opts.ajaxData)){
                        var ajaxData = opts.ajaxData();
                    }else{
                        var ajaxData = opts.ajaxData;
                    }
                    for(var k in ajaxData){
                        map.ajaxData[k] = ajaxData[k];
                    }
                }
                map.ajaxData["pageNum"] = map.liNum.text();
                map.ajaxData["pageCur"] = cur;
                $.ajax({
                    url: opts.url,
                    data: map.ajaxData,
                    success: function (data) {
                        if(opts.ajaxSuccess){
                            data["pageCur"] = cur;
                            opts.ajaxSuccess(data);
                        }else{
                            var table = opts.table,
                                all = data.pageAll,
                                dataList = data.tableList,
                                list = '',
                                dd = $('<div></div>').append(table.find(".j_tableDd").eq(0).html());
                            dd.find("div").html("");
                            if(dataList.length == 0){
                                dd.find("div").text("-");
                                list += '<dd class="clearfix j_tableDd">';
                                list += dd.html();
                                list += '</dd>';
                            }else{
                                for (var i = 0; i < dataList.length; i++) {
                                    list += '<dd class="clearfix j_tableDd">';
                                    for (var j = 0; j < dataList[i].length; j++) {
                                        dd.find("div").eq(j).attr("title",dataList[i][j]).text(dataList[i][j]);
                                    }
                                    list += dd.html();
                                    list += '</dd>';
                                }
                            }
                            table.find("dd").remove();
                            table.find("dl").append(list);
                            if( all == 1){
                                map.nextBtn.addClass("dis");
                            }else{
                                map.nextBtn.removeClass("dis");
                            }
                            map.pageAll.text(all);
                            map.pageCur.text(cur);
                            if(opts.change) opts.change.call($this);
                        }
                    }
                });
            }
        };
        utils.init.call($(this));
    };
});