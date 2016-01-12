package com.laozapp.controller;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.jasig.cas.client.authentication.AttributePrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {
	private  Logger logger = Logger.getLogger(this.getClass());

	@RequestMapping(value = { "/index", "/login" }, method = RequestMethod.GET)
	public String welcome(HttpSession session, HttpServletRequest request) throws UnsupportedEncodingException {
		// User user = (User) session.getAttribute("user");
		// if (user != null) {
		System.out.println(request.getCookies());
		System.out.println(request.getQueryString());
		AttributePrincipal principal = (AttributePrincipal) request.getUserPrincipal();
		String email = principal.getName();
		if (StringUtils.isEmpty(email)) {
			return "forward:index";
		}
		session.setAttribute("email", principal.getName());

		return "loginSuccess";

	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user != null) {

		return "index";
		// } else {
		// return "redirect:/";
		// }
	}

	@RequestMapping(value = "/loginSuccess", method = RequestMethod.GET)
	public String loginSuccess(HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user != null) {

		return "loginSuccess";
		// } else {
		// return "redirect:/";
		// }
	}
}