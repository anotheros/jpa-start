/** 
 * Author:shanjing
 * Time:2015-11-20
**/
define("cont/login", [], function(){
//	var ajaxDataCreate = function(){
//		var userName = $("#userName").val(),
//			password = $("#password").val(),
//			validateCode = $("#validateCode").val(),
//			autoLogin = $("#autoLogin").prop("checked");
//		return {"userName" : userName, "password" : password,  "validateCode" : validateCode, "autoLogin" : autoLogin};
//	};
//	var ajaxSuccessFunc = function(data) {
//		var errorObj = $(".j_errorBox");
//		if( data.result ){ //执行验证通过事件
//			errorObj.html("");
//			window.location.href = data.URL;
//		}else{	//执行验证不通过事件
//			errorObj.html("<span>"+data.error+"</span>");
//		};
//	};
//	if(B.isBuild){
//		var submitURL = "/ajax/login.json";
//	}else{
//		var submitURL = $("#submitURL").val();
//	}
	//提交按钮
	$("#submit").on("click",function(){
		if($("#userName").val() == ""){
			$(".j_errorBox").html("<span>账号不能为空</span>");
			return;
		};
		if($("#password").val() == ""){
			$(".j_errorBox").html("<span>密码不能为空</span>");
			return;
		};
		if($("#validateCode").val() == ""){
			$(".j_errorBox").html("<span>验证码不能为空</span>");
			return;
		};
		if( $("#userName").val() != "" && $("#password").val() != "" && $("#validateCode").val()!= ""){
//			$.ajax({
//				type : "post",
//				url: submitURL,
//				data: $("form").serialize(),
//				success: function (data) {
//					ajaxSuccessFunc(data);
//				}
//			});
			$("form").submit();
		}
	});
});