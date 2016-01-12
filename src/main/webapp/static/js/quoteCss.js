/** 
 * Author:shanjing
 * Time:2015-11-17
 * quoteCss.js主要是识别页面引用不同样式表
**/

(function(){
	/** 
	 * quoteCss函数生成一个css的link，引入样式
	 * @class
	 * @static
	**/
	window.BASICCSSPATH = "/static/css/";
	window.FIELDCSSPATH = "/static/css/";
	//公用样式引用
	quoteCss(["base", "structure", "btn", "icon", "plug", "login"], true);
	quoteCss(["color", "common"]);
	//获取页面id
	var webId = requireWebUniqueIdentity.id;
	/** 
	 * 根据页面id识别页面，引入不同样式
	 * 层级关系最多三层，即最多引用：quoteCss(["job/jobManage/jobManageList"]);
	 * @class
	 * @static
	**/
	switch(webId){
		case 1 : 	//   首页
			//quoteCss([]);
			break;
		case 2 : 	//   登录
			//quoteCss([]);
			break;
		case 11 : 	//   注册
			//quoteCss([]);
			break;
		case 12 : 	//   注册成功
			//quoteCss([]);
			break;
		case 21 : 	//   修改密码
			//quoteCss([]);
			break;
		case 22 : 	//   修改成功
			//quoteCss([]);
			break;
		case 31 : 	//   重置密码第一步
			//quoteCss([]);
			break;
		case 32 : 	//   重置密码第二步
			//quoteCss([]);
			break;
		case 33 : 	//   重置密码第三步
			//quoteCss([]);
			break;
		case 34 : 	//   重置密码成功
			//quoteCss([]);
			break;
		default : 
			console.err("webId is undefine");
	 		break;
	}
})();