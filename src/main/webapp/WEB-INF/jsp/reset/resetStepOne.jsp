<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" scope="session"/>

<!DOCTYPE HTML>
<html>
<head>
<title>重置密码</title>
<script type="text/javascript">
//requireWebUniqueIdentity是页面标识对象，每个页面有且只有一个，具体定义规范在main.js里面有说明
var requireWebUniqueIdentity = {
			id : 31,
			name : "重置密码",
			explain : "重置密码"
		}
</script>
<!--#include virtual="/common/head.shtml" -->
<jsp:directive.include file="../common/head.jsp" />
</head>
<body>
	<div class="wrap">
		<!--	* 导航 开始 *		-->
        <!--#include virtual="/common/nav.shtml" -->
        <jsp:directive.include file="../common/nav.jsp" />
        <!--	* 导航 结束 *		-->
        <div class="main" id="main">
        	<div class="midBox">
                <h3 class="passportTit">重置密码</h3>
                <img src="static/img/step1.png" width="744" height="44" alt="" class="mb10" />
                <div class="passportBox resetBox">
                	<form action="${ctx}/resetPassword">
                    	<ul class="resetList">
                        	<li class="pb20">
                                <label class="dib">输入邮箱：</label>
                                <input type="text" name="email" data-type="account" error="账号不能为空" maxlength="100" rule="{&quot;must&quot;:true,&quot;max&quot;:100}" placeholder="请输入邮箱" />
                                <div class="tipBox j_tipBox" style="display:none"><i class="icon icon_tip"></i><span></span></div>
                                <div class="errorBox j_errorBox" style="display:none"><i class="icon icon_error"></i><span></span></div>
                            </li>
                            <li class="pb20 code">
                                <label class="dib vat">验证码：</label>
                                <div class="dib vat">
                                    <input type="text" name="validateCode" class="l" error="验证码不能为空" rule="{&quot;must&quot;:true}" placeholder="验证码" />
                                    <div class="ml10 codeImgBox l" >
                                        <img src="captcha.jpg" id="captchaImg" width="70" height="30" alt="" onClick="this.src='captcha.jpg?time'+Math.random();"/>
                                    </div>
                                    <a href="javascript:document.getElementById('captchaImg').setAttribute('src','captcha.jpg?'+Math.random())" class="icon icon_refresh ml10 l"></a>
                                    <div class="tipBox j_tipBox" style="display:none"><i class="icon icon_tip"></i><span></span></div>
                                	<div class="errorBox j_errorBox" style="display:none"><i class="icon icon_error"></i><span></span></div>
                                </div>
                                
                            </li>
                            <li class="pt20">
                            	<label class="dib"></label>
                                <a href="javascript:void(0)" url="${ctx}/resetPasswordTwo" class="btn_b" id="submit">下一步</a>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
        <!--#include virtual="/common/footer.shtml" -->
        <jsp:directive.include file="../common/footer.jsp" />
	</div>
	    <input type="hidden" id="registerURL" value="${ctx}/register" title="注册页面URL" />
	    <input type="hidden" id="accountURL" value="${ctx}/checkEmail" title="账号请求URL" />
</body>
</html>
