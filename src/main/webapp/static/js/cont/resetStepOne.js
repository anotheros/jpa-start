/** 
 * Author:shanjing
 * Time:2015-11-20
**/
define("cont/resetStepOne", ["app/validate","app/form"], function(validate,formUtils){
	window.accountCheck = function(num,lid,errBox,errMsg){
		if(!formUtils.excitAccount(num)){
		   if (lid == 1) {
				errMsg.html("该账号尚未注册，<a href='"+$("#registerURL").val()+"'>请先注册</a>");
			}else {
				errMsg.html("the e-mail does not exist.Please <a href='"+$("#registerURL").val()+"'>register</a>");
			}
			errBox.show(); 
		}
	};
});