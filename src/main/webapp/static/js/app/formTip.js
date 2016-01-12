/** 
 * Author:weishuheng
 * Time:2015-07-07
 * select.js是控件js文件
 * @class
 * @static
 * @param {Object} 传递参数

 * @example
    
**/
define("app/formTip", [], function(){
    var formTip  = function($self){
        $self.nextAll(".j_errorBox").hide();
        if($self.attr("tip")) $self.nextAll(".j_tipBox").show().find("span").html($self.attr("tip"));
    }
    return formTip;
});