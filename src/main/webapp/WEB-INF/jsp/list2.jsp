<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<% String contextPath = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>列表页</title>
</head>

<DIV >---------------------------</DIV>
<body>
<c:forEach items="${articles}" var="a">
					<a href="<%=contextPath %>/article/del?id=${a.articleId }">删除</a>|${a.articleId }	 |	${a.title } |2</br>
<DIV >---------------------------</DIV>
</c:forEach>
</body>
</html>