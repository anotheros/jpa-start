/** 
 * Author:shanjing
 * Time:2015-11-20
**/
define("cont/register", ["app/validate","app/form"], function(validate,formUtils){
	window.accountCheck = function(num,lid,errBox,errMsg){
		if(formUtils.excitAccount(num)){
			if (lid == 1) {
				errMsg.html("该账号已经存在,<a href='"+$("#loginURL").val()+"'>可直接登录</a>");
			}else {
				errMsg.html("the e-mail already exists .Direct <a href='"+$("#loginURL").val()+"'>login</a>");
			}
			errBox.show(); 
		}
	};
});