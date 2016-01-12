/** 
 * Author:shanjing
 * Time:2015-11-19
 * main.js是用来配置js文件路径的文件
**/

/** 
 * requirejs.config主要是对基本路径进行配置，在初期需要在不同的环境进行不同配置
 * @class
 * @static
**/



requirejs.config({
	basicUrl : "/static/js/",
    baseUrl: "/static/js/",
	paths : {
		app : "app",
		data : "data",
		lib : "lib",
		echarts : "lib/echarts",
		cont : "cont"
	}
});

//引用公用js
requirejs([ "app/structure"]);

/**
 * requireWebUniqueIdentity是一个全局变量，主要用来对页面进行标识，但对该对象的定义是在页面里，并非在这里进行定义。
 * @class
 * @static
 * @example
		var requireWebUniqueIdentity = {
			id : 1100,
			name : "test",
			explain : "主要用来进行测试的页面，没什么东东"
		}
	定义规范：
	1、id是唯一的，对应的频道范围为：
		登录 1~10
		注册 11-20
		修改 21-30
		重置 31-40
		
	2、name值主要标注该页面是哪个页面，可以为空，但建议填写。
	3、explain主要是对页面进行进一步说明，可以为空。
**/
(function(){
	var webId = requireWebUniqueIdentity.id,
		host = window.location.host;
	switch(webId){
		case 1 : 	//   登录首页
			requirejs([ "cont/login"]);
			break;
		case 2 : 	//   登录成功
			//requirejs([]);
			break;
		case 11 : 	//   注册
			requirejs([ "cont/common", "cont/register"]);
			break;	
		case 12 : 	//   注册成功
			requirejs(["cont/success"]);
			break;
		case 21 : 	//   修改密码
			requirejs([ "cont/common"]);
			break;
		case 22 : 	//   修改成功
			requirejs(["cont/success"]);
			break;
		case 31 : 	//   重置密码第一步
			requirejs([ "cont/resetStepOne", "cont/common"]);
			break;
		case 32 : 	//   重置密码第二步
			requirejs([ "cont/resetStepTwo", "cont/common"]);
			break;
		case 33 : 	//   重置密码第三步
			requirejs(["cont/common"]);
			break;
		case 34 : 	//   重置密码成功
			requirejs(["cont/success"]);
			break;
	 	default : 
	 		console.err("webId is undefine");
	 		break;
	};
})();