/** 
 * Author:weishuheng
 * Time:2015-10-14
 * validate.js是验证表单元素的js文件
 * @class
 * @static
 * @example
    validate($("input"), 1)
**/
define("app/validate", ["app/form"], function(formUtils){
    var validate  = function($self, lid){
        //关闭提示语
        $self.nextAll(".j_tipBox").hide();
        if($self.is("input[type='radio']") || $self.is("input[type='checkbox']") || $self.attr("rule") == undefined){
            return;
        }
        var errBox = $self.nextAll(".j_errorBox"),
            errMsg = errBox.find("span"),
            rule = JSON.parse($self.attr("rule"));
        // if($self.is(":file")){          //file
        //     errBox = $self.closest(".j_fileBox").nextAll(".j_errorWrap").find(".j_errorMain");
        //     errMsg = errBox.find("p");
        //     if(rule.must == true && $.trim($self.val()) == "" && !$self.attr("data-value")){
        //         if (lid == 1) {
        //             errMsg.html($self.attr("error") || "此项为必填项");
        //         }else{
        //             errMsg.html($self.attr("error") || "this option is required");
        //         }
        //         errBox.show();
        //     }else{
        //         errBox.hide();
        //     }
        //     return;
        // }
        if($self.is("select") || $self.hasClass("j_selectBox")){
            if(($self.is("select") && $self.val() == -1) || ($self.hasClass("j_selectBox") && $self.find(".j_selectShow p").attr("data-value") == -1)){
                if (lid == 1) {
                    errMsg.html($self.attr("error") || "此项为必填项");
                }else{
                    errMsg.html($self.attr("error") || "this option is required");
                }
                errBox.show();
            }
            return;
        }

        if($self.hasClass("j_checkBoxWrap")){           //复选框
            if(rule.must == true){
                var len = 0;
                $self.find(":checkbox").each(function(){
                    if($(this).is(":checked")){
                        len++;
                    }
                });
                if(len == 0){
                    if (lid == 1) {
                        errMsg.html($self.attr("error") || "此项为必填项");
                    }else{
                        errMsg.html($self.attr("error") || "this option is required");
                    }
                    errBox.show();
                }else{
                    if(len > rule.max){
                        if (lid == 1) {
                            errMsg.html("最多只能选" + rule.max + "项。");
                        }else{
                            errMsg.html(rule.max + "items max");
                        }
                        errBox.show();
                    }else{
                        errBox.hide();
                    }
                }
            }
            return;
        }

        if($self.hasClass("j_radioBox")){           //单选框

            if(rule.must == true){
                var len = 0;
                $self.find(":radio").each(function(){
                    if($(this).is(":checked")){
                        len++;
                    }
                });

                if(len == 0){
                    if (lid == 1) {
                        errMsg.html($self.attr("error") || "此项为必填项");
                    }else{
                        errMsg.html($self.attr("error") || "this option is required");
                    }
                    errBox.show();
                }else{
                    errBox.hide();
                };
            }
            return;
        };
        if (rule.must == true) {    //必填项验证

            //必填项没有填写
            if(($.trim($self.val()) == "" || $self.val().length == 0 || $self.val() == "-1" || $self.val() == $self.attr("data-value"))){
                if($self.is("input[type='text']") || $self.is("textarea")){
                    if (lid == 1) {
                        errMsg.html($self.attr("error") || "此项为必填项");
                    }else{
                        errMsg.html($self.attr("error") || "this option is required");
                    }
                }else{
                    errMsg.html($self.attr("error"));
                }
                errBox.show();
                return;
            }
            //超出最大字符数
            if($self.val().length > rule.max){
                if($self.is("input[type='text']") || $self.is("textarea")){
                    if (lid == 1) {
                        errMsg.html("最多能填写" + rule.max + "个字符");
                    }else{
                        errMsg.html(rule.max + "characters can be input");
                    }
                    errBox.show();
                    return;
                }
            }
            //不够最小字符数
            if($self.val().length < rule.min){
                if($self.is("input[type='text']") || $self.is("textarea")){
                    if (lid == 1) {
                        errMsg.html("填写字符不能少与" + rule.max + "个");
                    }else{
                        errMsg.html(rule.max + "characters can be input");
                    }
                    errBox.show();
                    return;
                }
            }
        }
		//input密码输入框格式验证
		if( $self.is("input[type='password']") ){
			if(rule.must == false && !$self.val()) return;
			if( $self.attr("data-type") == "password" ){
				if( !formUtils.isPassword($self.val()) ){
					if (lid == 1) {
						errMsg.html("密码格式错误");
					} else {
						errMsg.html("Password format error");
					}
					errBox.show();
				}
			};
		}
        //input输入框格式验证
        if($self.is("input[type='text']")){
            if(rule.must == false && !$self.val()) return;
            switch ($self.attr("data-type")) {
                case 'name': //验证姓名
                    if (!formUtils.ContainsExpChar($self.val())) {
                        if (lid == 1) {
                            errMsg.html("不能包含特殊字符");
                        }else {
                            errMsg.html("Special characters can not be used");
                        }
                        errBox.show();
                    }else{
                        if (formUtils.inName($self.val())) {
                            if (lid == 1) {
                                errMsg.html("姓名格式输入不正确");
                            }else {
                                errMsg.html("Please input your effective name");
                            }
                            errBox.show();
                        }
                    }
                    break;
                case 'idCard': //验证身份证号
                    if (!formUtils.isIdCard($self.val())) {
                        if (lid == 1) {
                            errMsg.html("身份证号码填写有误。");
                        } else {
                            errMsg.html("Please fill in your ID Card correctly.");
                        }
                        errBox.show();
                    }
                    break;
                case 'postcode': //邮政编码
                    if (isNaN($self.val())) {
                        if (lid == 1) {
                            errMsg.html("邮政编码只能填写数字。");
                        } else {
                            errMsg.html("Only code can be used");
                        }
                        errBox.show();
                    };
                    break;
                case 'number' : //数字
                    if (isNaN($self.val())) {
                        if (lid == 1) {
                            errMsg.html("只能填写数字。");
                        } else {
                            errMsg.html("Only code can be used");
                        }
                        errBox.show();
                    };
                    break;
                case 'telephone': //电话号码
                    if (!formUtils.isTelephone($self.val())) {
                        if (lid == 1) {
                            errMsg.text("请填写正确的联系方式。(如：021-88888888、021-88888888-888)");
                        }
                        else {
                            errMsg.text("Please fill in your contact exactly.(Example：13588888888、021-88888888、021-88888888-888).");
                        }
                        errBox.show();
                    }
                    break;
                case 'website': //网址
                    if (!formUtils.isWebsite($self.val())) {
                        if (lid == 1) {
                            errMsg.text("请填写正确的网络地址");
                        }
                        else {
                            errMsg.text("Please fill in the correct website.");
                        }
                        errBox.show();
                    }
                    break;
                case 'mobilephone': //手机号码
                    if (!formUtils.isMobilephone($self.val())) {
                        if (lid == 1) {
                            errMsg.html("请填写有效的手机号码");
                        } else {
                            errMsg.text("Please fill in your contact exactly.");
                        }
                        errBox.show();
                    }
                    break;
                case 'email': //电子邮箱
                    if (!formUtils.isEmail($self.val())) {
                        if (lid == 1) {
                            errMsg.html("电子邮箱格式填写错误");
                        }else {
                            errMsg.text("Wrong e-mail address .");
                        }
                        errBox.show();
                    }else{
                        if(formUtils.excitEmail($self.val())){
                           if (lid == 1) {
                                errMsg.html("该邮箱已经存在");
                            }else {
                                errMsg.text("the e-mail already exists .");
                            }
                            errBox.show(); 
                        }
                        
                    };
                    break;
				case 'account': //帐号
                    if (!formUtils.isAccount($self.val())) {
                        if (lid == 1) {
                            errMsg.html("账号邮箱格式错误");
                        }else {
                            errMsg.text("Wrong e-mail address .");
                        }
                        errBox.show();
                    }else{
						errBox.hide();
						if(accountCheck){
							accountCheck($self.val(),1,errBox,errMsg);
						};
                    };
                    break;
                default: break;
            }
        }
         //英文模板文本框不能输入汉字
        if (lid == 2) {
            if ($self.val() && $self.is("input") || $self.is("textarea")) {
                var reg = /.*[\u4e00-\u9fa5]+.*$/;
                if (reg.test($self.val())) {
                    errMsg.html("Please don't input Chiness");
                    errBox.show();
                    return;
                }
            }
        }
    };
    return validate;
});