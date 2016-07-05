package com.laozapp.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;



/**
 * 用户中心的拦截器
 * 
 * @author Taven
 *
 */
public class UAuthorizeInterceptor implements HandlerInterceptor {

	private static Logger	logger	= LoggerFactory.getLogger(UAuthorizeInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		// 你可以在这里做一些拦截处理，当然你也可以什么都不做，如果您只关注 Spring Security，可以不关注
		// HandlerInterceptor 接口
		String method = request.getMethod();
		String path = request.getContextPath();
		String servletPath = request.getServletPath();
		// response.sendRedirect(path + "/index");
		if (isDologin(servletPath)) {
			return true;
		}
		HttpSession session = request.getSession();
		String user = (String) session.getAttribute("email");

		if (StringUtils.isEmpty(user)) {
			response.setHeader("Content-Type", "text/html");
			response.setStatus(401);
			response.setCharacterEncoding("UTF-8");
			response.sendRedirect("/");
			return false;
		} else {
			return true;
		}
	}

	private boolean isDologin(String servletPath) {
		/*return servletPath.endsWith("/doLogin") || servletPath.indexOf("dologin") > -1 || servletPath.endsWith("index.jsp") || servletPath.startsWith("/index")   || servletPath.startsWith("/login") || servletPath.startsWith("/logout")  || servletPath.startsWith("/check") || servletPath.endsWith("robot.txt")
				|| servletPath.indexOf("help/test") > -1 || servletPath.indexOf("404.html") > -1 || servletPath.indexOf("500.html") > -1
				|| servletPath.startsWith("/register") || servletPath.startsWith("/reset") || servletPath.equals("/") || servletPath.indexOf("article")>-1;*/
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

	}

}
