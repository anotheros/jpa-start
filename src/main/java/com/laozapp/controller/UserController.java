package com.laozapp.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.laozapp.common.Utils;
import com.laozapp.service.UserService;
import com.laozapp.util.ConfigUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.laozapp.po.Result;
import com.laozapp.po.UserEntity;

/**
 * Created by Administrator on 2015/11/13.
 */
@Controller
public class UserController {

	@Autowired
	private UserService userService;
	
	String casServerLogoutUrl = ConfigUtil.INSTANCE.getProperty("casServerLogoutUrl");

	@RequestMapping(value = { "/aaa" })
	public String login() {

		System.out.println("aaaaa");
		userService.out();
		userService.getUser(1L);
		System.out.println(userService.getUser(1L).getEmail());
		return "login";

	}
	
	@RequestMapping(value = { "/logout" })
	public String logout(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.invalidate();
		return "redirect:" + casServerLogoutUrl;

	}

	@RequestMapping(value = { "/register" }, method = RequestMethod.GET)
	public String reg() {
		return "register/register";
	}

	@RequestMapping(value = { "/registerSuccess" }, method = RequestMethod.GET)
	public String regSuccess() {
		return "register/success";
	}

	@RequestMapping(value = { "/register" }, method = RequestMethod.POST)
	@ResponseBody
	public Result reg(@RequestParam(value = "email") String email, @RequestParam(value = "passWord") String passWord, HttpServletRequest request) {
		UserEntity user = new UserEntity();
		user.setEmail(email);
		user.setPassWord(passWord);
		String status = userService.regist(user);
		Result result = new Result();
		if (!status.equals("ok")) {
			result.setResult(false);
		}
		HttpSession session = request.getSession();
		session.setAttribute("email", user.getEmail());
		result.setResult(true);
		return result;
	}



	@RequestMapping(value = { "/changePassword" }, method = RequestMethod.GET)
	public String goChangePassword() {

		return "modify/modify";
	}

	@RequestMapping(value = { "/changePasswordSuccess" }, method = RequestMethod.GET)
	public String goChangePasswordSuccess() {

		return "modify/success";
	}
	
	@RequestMapping(value = { "/changePassword" }, method = RequestMethod.POST)
	@ResponseBody
	public Result changePassword(HttpServletRequest request) {
		Result result = new Result();
		HttpSession session = request.getSession();
		String email = (String) session.getAttribute("email");
		UserEntity userFromDb = userService.getUserByEmail(email);
		result.setResult(false);
		if (userFromDb == null) {
			return result;
		}
		String oldPassword = request.getParameter("oldPassword");
		String password = request.getParameter("password");
		String password2 = request.getParameter("confirmPassword");


		if (oldPassword == null || "".equals(oldPassword) || !userFromDb.getPassWord().equals(Utils.getMD5Encoding(oldPassword))) {
			result.setError("原密码不正确");
			result.setName("oldPassword");
			return result;
		}
		if (password == null || "".equals(password)) {
			result.setError("新密码不能为空");
			result.setName("password");
			return result;
		}
		if (!password.equals(password2)) {
			result.setName("confirmPassword");
			result.setError("密码不一致");
			return result;
		}
		userFromDb.setPassWord(password);
		userService.saveUser(userFromDb);
		result.setResult(true);
		return result;
	}

	// 通过配合@ResponseBody来将内容或者对象作为HTTP响应正文返回（适合做即时校验）；
	@RequestMapping(value = "/checkEmail")
	@ResponseBody
	public Result valid(@RequestParam(value = "account") String email) {
		Result result = new Result();
		if (email == null || "".equals(email)) {
			result.setResult(false);
		}
		boolean b = userService.checkEmailIsExist(email);
		result.setResult(b);
		return result;
	}


	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
