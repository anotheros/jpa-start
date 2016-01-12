<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" scope="session"/>
<!DOCTYPE HTML>
<html>
<head>
<title>注册成功</title>
<script type="text/javascript">
//requireWebUniqueIdentity是页面标识对象，每个页面有且只有一个，具体定义规范在main.js里面有说明
var requireWebUniqueIdentity = {
			id : 12,
			name : "注册成功",
			explain : "注册成功"
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
                <h3 class="passportTit"></h3>
                <div class="passportBox">
                	<div class="passportSucBox">
                    	<div class="sucTop tac"><i class="icon icon_suc mr10 vat"></i><span class="dib vat">您已成功注册玉米通行证</span></div>
                        <div class="sucMid tac lh20">您的登录邮箱是：${email}（如果忘记密码或丢失账户，可以通过此邮箱找回）</div>
                        <div class="sucBom tac lh20"><span>系统将在<span class="j_countDown">5</span>S后返回登录页面，如果没有请</span> <a href="${ctx}/index">点击手动连接</a></div>
                    </div>
                </div>
            </div>
        </div>
        <!--#include virtual="/common/footer.shtml" -->
		<jsp:directive.include file="../common/footer.jsp" />
	</div>
	<input type="hidden" id="loginURL" value="${ctx}/index" title="登录页面URL" />
</body>
</html>
