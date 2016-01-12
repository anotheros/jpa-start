<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" scope="session"/>
<div class="nav adminNav clearfix">
	<div class="navLogo l"></div>
    <img src="static/img/yumiLogo.png" width="89" height="17" alt="" class="l mt30" />
	<div class="navright r">
        <a href="${ctx}/index">登录</a>
    </div>
</div>