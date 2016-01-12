<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" scope="session"/>
<!DOCTYPE HTML>
<html>
<head>
<title>修改密码</title>
<script type="text/javascript">
//requireWebUniqueIdentity是页面标识对象，每个页面有且只有一个，具体定义规范在main.js里面有说明
var requireWebUniqueIdentity = {
			id : 21,
			name : "修改密码",
			explain : "修改密码"
		}
</script>
<!--#include virtual="/common/head.shtml" -->
    <jsp:directive.include file="../common/head.jsp" />
</head>
<body>
	<div class="wrap">
		<!--	* 导航 开始 *		-->
        <div class="nav adminNav clearfix">
            <div class="navLogo l"></div>
            <img src="static/img/yumiLogo.png" width="89" height="17" alt="" class="l mt30" />
            <div class="navright r">
            	<span>${email}</span>
                <a href="${ctx}/logout">退出</a>
            </div>
        </div>
        <!--	* 导航 结束 *		-->
        <div class="main" id="main">
        	<div class="midBox">
                <h3 class="passportTit">修改密码</h3>
                <div class="passportBox">
                	<form action="${ctx}/changePassword" method="post">
                    	<ul class="passportList">
                        	<li class="pb20">
                                <label class="dib">注册邮箱：</label>
                                <span class="pl10 emailText">${email}</span>
                            </li>
                            <li class="pb20">
                                <label class="dib">旧密码：</label>
                                <input type="password" name="oldPassword"  error="旧密码不能为空" rule="{&quot;must&quot;:true}" placeholder="旧密码" />
                                <div class="tipBox j_tipBox" style="display:none"><i class="icon icon_tip"></i><span></span></div>
                                <div class="errorBox j_errorBox" style="display:none"><i class="icon icon_error"></i><span></span></div>
                            </li>
                            <li class="pb20">
                                <label class="dib">新密码：</label>
                                <input type="password" name="password" data-type="password" tip="密码由8-32位字符组成,不允许有空格" error="密码不能为空" rule="{&quot;must&quot;:true}" placeholder="新密码" />
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
                                <a href="javascript:void(0)" url="${ctx}/changePasswordSuccess" class="btn_b" id="submit">保存</a>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
        <!--#include virtual="/common/footer.shtml" -->
        <jsp:directive.include file="../common/footer.jsp" />
	</div>
    <input type="hidden" value="${ctx}/oldPassword" title="请求旧密码URL"  />
    <input type="hidden" id="languageID" value="1" /><!--	语言版本1为中文	-->
</body>
</html>
