<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" scope="session"/>

<!DOCTYPE HTML>
<html>
<head>
<title>注册</title>
<script type="text/javascript">
//requireWebUniqueIdentity是页面标识对象，每个页面有且只有一个，具体定义规范在main.js里面有说明
var requireWebUniqueIdentity = {
			id : 11,
			name : "注册",
			explain : "注册"
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
                <h3 class="passportTit">注册玉米通行证</h3>
                <div class="passportBox">
                	<form action="${ctx}/register" method="post">
                    	<ul class="passportList">
                        	<li class="pb20">
                                <label class="dib">注册邮箱：</label>
                                <input type="text" name="email" data-type="account" error="账号不能为空" maxlength="100" rule="{&quot;must&quot;:true,&quot;max&quot;:100}" placeholder="请输入邮箱" />
                                <div class="tipBox j_tipBox" style="display:none"><i class="icon icon_tip"></i><span></span></div>
                                <div class="errorBox j_errorBox" style="display:none"><i class="icon icon_error"></i><span></span></div>
                            </li>
                            <li class="pb20">
                                <label class="dib">密码：</label>
                                <input type="password" name="passWord" data-type="password" tip="密码由8-32位字符组成,不允许有空格" error="密码不能为空" rule="{&quot;must&quot;:true}" placeholder="密码" />
                                <div class="tipBox j_tipBox" style="display:none"><i class="icon icon_tip"></i><span></span></div>
                                <div class="errorBox j_errorBox" style="display:none"><i class="icon icon_error"></i><span></span></div>
                            </li>
                            <li class="pb20">
                                <label class="dib">确认密码：</label>
                                <input type="password" name="confirmPassword" error="确认密码不能为空" rule="{&quot;must&quot;:true}" placeholder="确认密码" class="confirmPassword"/>
                                <div class="tipBox j_tipBox" style="display:none"><i class="icon icon_tip"></i><span></span></div>
                                <div class="errorBox j_errorBox" style="display:none"><i class="icon icon_error"></i><span></span></div>
                            </li>
                            <li class="pt20">
                            	<label class="dib"></label>
                                <a href="javascript:void(0)" url="${ctx}/registerSuccess" class="btn_b" id="submit">注册</a>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
        <!--#include virtual="/common/footer.shtml" -->
        <jsp:directive.include file="../common/footer.jsp" />
	</div>
    <input type="hidden" id="languageID" value="1" /><!--	语言版本1为中文	-->
    <input type="hidden" id="accountURL" value="${ctx}/checkEmail" title="账号请求URL" />
    <input type="hidden" id="loginURL" value="${ctx}/index" title="登录页面URL" />
</body>
</html>
