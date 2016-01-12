
<% if(request.getSession().getAttribute("user")!=null){
	response.sendRedirect("welcome");
}


%>
<!DOCTYPE html PUBliC "-//W3C//dtD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/dtD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />



<script type="text/javascript">
<!--
	
//-->
</script>
<style>
<!--
input {
	width: 200px;
	display: block;
}
-->
</style>
</head>
<body>
未登录的首页
</body>
</html>