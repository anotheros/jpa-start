<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" scope="session"/>

<!DOCTYPE HTML>
<html>
<head>
<title>登录成功</title>
<script type="text/javascript">
//requireWebUniqueIdentity是页面标识对象，每个页面有且只有一个，具体定义规范在main.js里面有说明
var requireWebUniqueIdentity = {
			id : 2,
			name : "登录成功",
			explain : "登录成功"
		}
</script>
<!--#include virtual="/common/head.shtml" -->
    <jsp:directive.include file="common/head.jsp" />
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
                <h3 class="passportTit"></h3>
                <div class="passportBox">
                	<div class="passportSucBox loginSucBox">
                    	<div class="sucTop tac"><i class="icon icon_suc mr10 vat"></i><span class="dib vat">登录成功</span></div>
                        <div class="sucMid tac lh20">我的账号：${email}<a href="${ctx}/changePassword" class="ml10">修改密码</a></div>
                        <div class="tac f14 pt10 pb15 lh24"><strong>请选择进入平台</strong></div>
                        <ul class="platformList clearfix">
                        	<li>
                            	<a href="javascript:void(0)" class="developer">
                            		<span class="icon icon_dev"></span>
                                    <span class="tac pt15 lh24">开发者</span>
                                </a>
                            </li>
                            <li>
                            	<a href="javascript:void(0)" class="advertisers">
                            		<span class="icon icon_advertisers"></span>
                                    <span class="tac pt15 lh24">广告主</span>
                                </a>
                            </li>
                            <li>
                            	<a href="javascript:void(0)" class="polymerization">
                            		<span class="icon icon_juhe"></span>
                                    <span class="tac pt15 lh24">聚合平台</span>
                                </a>
                            </li>
                            <li>
                            	<a href="javascript:void(0)" class="adxdsp">
                            		<span class="icon icon_dsp"></span>
                                    <span class="tac pt15 lh24">ADX DSP</span>
                                </a>
                            </li>
                            <li>
                            	<a href="javascript:void(0)" class="adxpmp">
                            		<span class="icon icon_pmp"></span>
                                    <span class="tac pt15 lh24">ADX PMP</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--#include virtual="/common/footer.shtml" -->
         <jsp:directive.include file="common/footer.jsp" />
	</div>
</body>
</html>
