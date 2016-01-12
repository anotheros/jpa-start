/** 
 * Author:weishuheng
 * Time:2015-10-14
 * form.js是判断文本输入格式是否正确的js文件
 * @class
 * @static
 * @example
        //false or true
        var a = formUtils.ContainsExpChar(v);
        console.log(a)
    
**/
define("app/form", [], function(){
    var formUtils = {
        ContainsExpChar : function(val){     //是否包含特殊符号
            var patrn = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]");
            if (!patrn.test(val)) return true;
            return false;
        },
        inName : function(str) {      //判断姓名格式
            var pattan = /^[a-zA-Z\u4e00-\u9fa5]+$/g;
            if (!pattan.test(str))
                return true;
            return false;
        },
		isPassword : function(str){			//验证密码
			var patn = /^[\S^\u4e00-\u9fa5]{8,32}$/g
			//var patn = /^[a-zA-Z][\S^\u4e00-\u9fa5]{5,15}$/
			if (patn.test(str)) {
                return true;
            } else {
                return false;
            };
		},
        isWebsite : function(str){			//验证网址
			var part = /--/g
			if( !part.test(str) ){
				var patn = /^((http(s)?:\/\/)?www.?[0-9a-zA-Z\u4e00-\u9fa5])([0-9a-zA-Z\u4e00-\u9fa5\.-])+([^-][\.][a-z\u4e00-\u9fa5]+[\/]?)+$/
				if (patn.test(str)) {
					return true;
				} else {
					return false;
				}
			}else{
				return false
			};
        },
        isMobilephone: function(number) {            //验证手机格式
            var patn = /^1\d{10}$/;
            if (patn.test(number)) {
                return true;
            } else {
                return false;
            };
        },
        isTelephone : function(num) {             //验证电话号码
            var patn = /^([\d-+]*)$/;
            if (patn.test(num)) {
                return true;
            } else {
                return false;
            };
        },
        isEmail : function(num){               //验证邮箱格式
            var patn = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/;
            if (patn.test(num)) {
                return true;
            } else {
                return false;
            };
        },
        excitEmail : function(num){                //验证邮箱是否存在
            if(B.isBuild){
                return false;
            }else{
                //判断邮箱是否存在函数，存在返回true，否则返回false
                
            }
        },
		isAccount : function(num){
			var patn = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/;
            if (patn.test(num)) {
                return true;
            } else {
                return false;
            };
		},
		excitAccount : function(num){
			if(B.isBuild){
                var accountURL = "/ajax/account.json";
            }else{
				var accountURL = $("#accountURL").val(); //请求帐户URL
            };
			var result;
			$.ajax({
				type : "POST",
				url: accountURL,
				async:false,
				data:{"account" : num},
				success: function (data) {
					result = data.result;
				}
			});
			return result;
		},
        isIdCard : function(num) {          //校验身份证合法性
            num = num.toUpperCase();
            var aCity = {
                11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ",
                31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ",
                43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ",
                61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "
            };

            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
            if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
                return false;
            }

            //校验地区
            if (aCity[parseInt(num.substr(0, 2))] == null) {
                // 非法地区
                return false;
            }

            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
            //下面分别分析出生日期和校验位 
            var len, re;
            len = num.length;
            if (len == 15) {
                re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                var arrSplit = num.match(re);

                //检查生日日期是否正确 
                var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    //输入的身份证号里出生日期不对！
                    return false;
                }
                else {
                    //将15位身份证转成18位 
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    num += arrCh[nTemp % 11];
                    //返回18位的结果
                    //return num;
                    return true;
                }
            }
            if (len == 18) {
                re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                var arrSplit = num.match(re);

                //检查生日日期是否正确 
                var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    //输入的身份证号里出生日期不对！
                    return false;
                }
                else {
                    //检验18位身份证的校验码是否正确。 
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
                    var valnum;
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[nTemp % 11];
                    if (valnum != num.substr(17, 1)) {
                        //18位身份证的校验码不正确！应该是 valnum 的值
                        return false;
                    }
                    //返回18位的结果
                    //return num;
                    return true;
                }
            }
            return false;
        }
    };
    return formUtils;
});