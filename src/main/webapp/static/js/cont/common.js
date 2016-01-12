/** 
 * Author:shanjing
 * Time:2015-11-20
**/
define("cont/common", ["app/validate", "app/formTip"], function(validate,formTip){
	$(function(){
		//表单验证
		var form = $("form");
		//输入框绑定blur验证事件
		form.find("input[type='text']:visible").each(function(){
			$(this).on({
				blur : function(){
					validate($(this), 1);
				},
				focus : function(){
					formTip($(this));
				}
			});
		});
		//密码框绑定blur验证事件
		form.find("input[type='password']:visible").each(function(){
			$(this).on({
				blur : function(){
					validate($(this), 1);
					if($(this).hasClass("confirmPassword")){
						if($(this).parent().prev().find("input").val() !=""){
							var password = $(this).parent().prev().find("input").val();
							if($(this).val() != password){
								$(this).siblings(".j_errorBox").show();
								if( $("#languageID").val() == 1 || $("#languageID").val() == undefined){
									$(this).siblings(".j_errorBox").find("span").html("两次输入密码不一致，请重新输入");
								}else
								{
									$(this).siblings(".j_errorBox").find("span").html("Two times the input password is not consistent, please re-enter")
								};
							};
						};
					};
				},
				focus : function(){
					formTip($(this));
				}
			});
		});
		//提交按钮
		$("#submit").on("click", function(){
			form.find("input:visible").trigger("blur");
//			if( $(".oldPassword").length > 0 ){
//				var thisObj = $(".oldPassword");
//				var errBox = thisObj.siblings(".j_errorBox");
//				var errMsg = errBox.find("span");
//				if( thisObj.val() != "" ){
//					if(B.isBuild){
//						var modifyURL = "/ajax/modify.json";
//					}else{
//						var modifyURL = $("#modifyURL").val(); //请求旧密码URL
//					};
//					var ajaxDataCreate = function(){
//						//var account = $(".account").val();
//						var oldPassword = $(".oldPassword").val();
//						return { "oldPassword" :oldPassword }
//					};
//					$.ajax({
//						type:"POST" ,
//						url: modifyURL,
//						async:false,
//						data: ajaxDataCreate(),
//						success: function (data) {
//							if(!data.result){
//								if ( $("#languageID").val() == 1 || $("#languageID").val() == undefined) {
//									errMsg.html("旧密码错误");
//								}else {
//									errMsg.text("Old password error, please re-enter");
//								}
//								errBox.show(); 
//							};
//						}
//					});
//				};
//			};
			if(form.find(".j_errorBox:visible").length == 0){
				var newURL =$(this).attr("url")
				$.post(form.attr("action"), form.serialize(), function(data){
					if(data.result){
						window.open(newURL,"_self");
					}else{
						var errBox = $("input[name= "+data.name+"]").siblings(".j_errorBox");
						errBox.find("span").html(data.error);
						errBox.show(); 
					}
				});
			}
		});
	});
});
function countDown(obj,num,url){
	obj.text(num);
	var flag = typeof arguments[2]
	var timer = setInterval(function(){
	if(num > 1){
		num--;
		obj.text(num);
	}else{
		clearInterval(timer);
		if( flag == "function"){
			url();
		}else{
			window.open(url,"_self")
		}
	}
	},1000)
};