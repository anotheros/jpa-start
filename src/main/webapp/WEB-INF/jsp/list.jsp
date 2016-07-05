<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<% String contextPath = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>列表页</title>
</head>
<body>




ID| 标题</br>
<DIV >---------------------------</DIV>
<c:forEach items="${articles}" var="a">

${a.articleId }	 |	${a.title } </br>

<DIV >---------------------------</DIV>
</c:forEach>


<FORM id="form1" action="<%=contextPath %>/article/save" method="post">
				
					<SPAN class="left">内容</SPAN>
							<DIV class="rg"><INPUT name="title" type="text"> <button type="submit">确 定</button></DIV>
</FORM>
	</br>		
--------------------</br>
</body>
</html>