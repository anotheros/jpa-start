<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" scope="session"/>
<!DOCTYPE HTML>
<html>
<head>
<title>修改成功</title>
<script type="text/javascript">
//requireWebUniqueIdentity是页面标识对象，每个页面有且只有一个，具体定义规范在main.js里面有说明
var requireWebUniqueIdentity = {
			id : 22,
			name : "修改成功",
			explain : "修改成功"
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
                    	<div class="sucTop tac"><i class="icon icon_suc mr10 vat"></i><span class="dib vat">修改密码成功</span></div>
                        <div class="sucMid tac lh20">您可以用新密码登录玉米平台</div>
                        <div class="sucBom tac lh20"><span>系统将在<span class="j_countDown">5</span>S后返回登录页面，</span> <a href="${ctx}/logout">立即登录</a></div>
                    </div>
                </div>
            </div>
        </div>
        <!--#include virtual="/common/footer.shtml" -->
		<jsp:directive.include file="../common/footer.jsp" />
	</div>
	<input type="hidden" id="loginURL" value="${ctx}/logout" title="登录页面URL" />
</body>
</html>
