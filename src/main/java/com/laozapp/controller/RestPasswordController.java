package com.laozapp.controller;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ivan.zhang.CaptchaServiceSingleton;

import com.laozapp.po.Result;
import com.laozapp.po.UserEntity;
import com.laozapp.service.UserService;

@Controller
public class RestPasswordController {
	private Logger logger = Logger.getLogger(this.getClass());
	
	@Autowired
	private UserService userService;

	@RequestMapping(value = { "/resetPassword" }, method = RequestMethod.POST)
	@ResponseBody
	public Result resetPasswordOne(@RequestParam(value = "email") String email, @RequestParam(value = "validateCode") String captcha, HttpServletRequest request)
			throws UnsupportedEncodingException {
		Result result = new Result();
		result.setResult(true);
		HttpSession session = request.getSession();
		String captchaId = session.getId();
		boolean isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, captcha);
		if (!isResponseCorrect) {
			
			result.setResult(false);
			result.setName("validateCode");
			result.setError("验证码不正确");
			return result;
		}
		boolean b =	userService.checkEmailIsExist(email);
		if(!b){
			result.setResult(false);
			result.setName("validateCode");
			result.setError("账号不存在");
			return result;
		}
		session.setAttribute("emailTmp", email);
		return result;

	}

	
	@RequestMapping(value = { "/resetSendEmail" }, method = RequestMethod.POST)
	@ResponseBody
	public Result resetSendEmail(HttpServletRequest request){
		Result result = new Result();
		result.setResult(true);
		HttpSession session = request.getSession();
		String email = (String) session.getAttribute("emailTmp");
		// 发邮件
		userService.sendPwdGetBackEmail(email);
		return result;
	
	}
	
	@RequestMapping(value = { "/resetPassword" }, method = RequestMethod.GET)
	public String goResetPassword(){
		
		return "reset/resetStepOne";
	
	}
	@RequestMapping(value = { "/resetPasswordTwo" }, method = RequestMethod.GET)
	public String goResetPasswordTwo(){
		
		return "reset/resetStepTwo";
		
	}
	@RequestMapping(value = { "/resetPasswordSuccess" }, method = RequestMethod.GET)
	public String goResetPasswordSuccess(){
		
		return "reset/success";
		
	}
	@RequestMapping(value = { "/changePasswordReset" }, method = RequestMethod.GET)
	public String goResetPasswordThree(){
		
		return "reset/resetStepThree";
		
	}
	@RequestMapping(value = { "/changePasswordReset" }, method = RequestMethod.POST)
	@ResponseBody
	public Result resetPasswordThree(HttpServletRequest request){
		Result result = new Result();
		HttpSession session = request.getSession();
		String email = (String) session.getAttribute("email");
		UserEntity userFromDb = userService.getUserByEmail(email);
		result.setResult(false);
		if (userFromDb == null) {
			return result;
		}
		String password = request.getParameter("password");
		String password2 = request.getParameter("confirmPassword");

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
	@RequestMapping(value = { "/resetcheckCode" }, method = RequestMethod.POST)
	@ResponseBody
	public Result checkCode(@RequestParam("valitateCode") String valitateCode ,HttpServletRequest request) {
		Result result = new Result();
		HttpSession session = request.getSession();
		String email = (String) session.getAttribute("emailTmp");
		boolean b = userService.checkCode(email,valitateCode);
		result.setResult(b);
		if(!b){
			result.setError("校验码不正确");
			result.setName("valitateCode");
		}else {
			session.setAttribute("email", email);
		}
		return result;
	}

}