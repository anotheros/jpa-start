/** 
 * Author:weishuheng
 * Time:2015-07-07
 * select.js是控件js文件
 * @class
 * @static
 * @param {Object} 传递参数
        {
            "trigger" : "click",            //触发事件类型
            "popId" : null,                 //弹出框id
            "path" : "",                    //弹出框html代码地址
            "data" : "",                    //ajax请求所传递参数
            "async" : false,                //是否同步执行
            "onData" : null,                //对请求回来的html代码进行处理函数
            "onSure" : null,                //确定按钮点击事件（除关闭），若有返回值且返回值为-1，不对弹出框进行关闭
            "onClosed" : null,              //关闭弹框事件
            "onBefore" : null               //弹框显示事件

        }
 * @example
    
**/
define("app/pop", [], function(){
	$.fn.onPop = function(options){
        var el = $(this);
        if(!options) options = {} ;
        if(!options.popId || el.length == 0) return;
        var opts = {
                "trigger" : "click",            //触发事件类型
                "popId" : null,                 //弹出框id
                "url" : "",                     //弹出框html代码地址
                "html" : null,                  //向body里面插入的弹出框代码（默认为空，走ajax请求）
                "ajax" : null,                  //替代ajax方法
                "ajaxOpts" : null,              //ajax请求参数
                "ajaxData" : "",                //ajax请求所传递参数
                "async" : false,                //是否同步执行
                "init" : null,                  //初始化函数
                "onData" : null,                //对请求回来的html代码进行处理函数
                "onSure" : null,                //确定按钮点击事件（除关闭），若有返回值且返回值为-1，不对弹出框进行关闭
                "onClosed" : null,              //关闭弹框事件
                "onBefore" : null               //弹框显示事件
            };
        $.extend(true, opts, options);

        var map = {
            "pop" : null,                       //弹出框
            "cover" : $("#popCover")            //覆盖层
        };

        var utils = {
            init : function(){
                if($("#popCover").length == 0){
                    $("body").append('<div class="pop_cover" id="popCover" style="display:none"></div>');
                    map.cover = $("#popCover");
                }
                if($("#" + opts.popId).length == 0){
                    if(opts.html){
                         $("body").append(opts.html);
                         utils.reset();
                    }else{
                        if(opts.ajax){
                            opts.ajax();
                        }else{
                            if(B.isFunction(opts.url)){
                                var ajaxURL = opts.url.call(el);
                            }else{
                                var ajaxURL = opts.url;
                            }
                            var ajaxOpt = {
                                url : ajaxURL,
                                data : opts.ajaxData,
                                async : opts.async,
                                success : function(data){
                                    if(opts.onData){
                                        $("body").append(opts.onData(data));
                                    }else{
                                        $("body").append(data);
                                    }
                                    utils.reset();
                                }
                            };
                            if(opts.ajaxOpts){
                                $.extend(opts.ajaxOpts, ajaxOpt);
                            }
                            $.ajax(ajaxOpt);
                        }
                    }
                }
                if(opts.init){
                    opts.init.call(el);
                }
            },
            reset : function(){
                map.pop = $("#" + opts.popId);
                map.pop.css("visibility","hidden").show();
                map.pop.find(".j_popSureBtn").on("click", function(){
                    if(opts.onSure) var flag = opts.onSure();
                    if(!(flag && flag == -1)) utils.popHide();
                });
                map.pop.find(".j_popCancelBtn").on("click", function(){
                    utils.popHide();
                });
                map.pop.find(".j_popClosed").on("click", function(){
                    utils.popHide();
                });
            },
            popShow : function(){
                if(opts.onBefore) opts.onBefore.call(el);
                map.pop.show();
                map.pop.css("height", map.pop.children().height() + "px");
                map.pop.css("visibility", "visible");
                map.cover.show();
            },
            popHide : function(){
                if(opts.onClosed) opts.onClosed.call(el);
                map.pop.css("visibility", "hidden").hide();
                map.cover.hide();
            }
        }
        utils.init.call(el);
        $(document).on(opts.trigger, this.selector, function(){
            el = $(this);
            utils.popShow();
        });

	};
}); 