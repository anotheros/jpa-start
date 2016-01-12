package com.laozapp.service;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.laozapp.common.Utils;
import com.laozapp.util.UUIDUtil;
import com.laozapp.common.ApplicationEmail;
import com.laozapp.dao.UserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.laozapp.common.EmailUtil;
import com.laozapp.common.ValidatorUtil;
import com.laozapp.po.UserEntity;
import org.springframework.util.StringUtils;

@Service
public class UserService {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private EmailUtil eu;

	@Autowired
	private UserDao userDao;

	public void out() {
		System.out.println("UserService");
	}

	public UserEntity getUserByUserName(String userName) {
		UserEntity ue = this.userDao.getUserByUserName(userName);
		return ue;
	}

	public UserEntity getUser(Long id) {
		return this.userDao.findOne(id);
	}

	public boolean saveUser(UserEntity userEntity) {
		Long id = userEntity.getUserId();
		String userName = userEntity.getUserName();
		String passWord = userEntity.getPassWord();

		if (id != null) {
			UserEntity updateEntity = this.userDao.findOne(id);

			updateEntity.setUserName(userName);
			updateEntity.setLastUpdate(new Date());

			if (!StringUtils.isEmpty(passWord)) {
				updateEntity.setPassWord(Utils.getMD5Encoding(passWord));
			}

			try {
				this.userDao.save(updateEntity);
			} catch (Exception e) {
				logger.error(e.getMessage());
				return false;
			}
		} else {
			// 新增
			if (userDao.getUserByUserName(userName) != null) {
				return false;
			}

			if (StringUtils.isEmpty(passWord)) {
				// 新增用户，如果用户没有输入密码，则设置默认的密码
				passWord = "123456";
			}
			userEntity.setCreateTime(new Date());
			userEntity.setLastUpdate(new Date());
			userEntity.setPassWord(Utils.getMD5Encoding(passWord));

			try {
				this.userDao.save(userEntity);
			} catch (Exception e) {
				logger.error(e.getMessage());
				return false;
			}

		}

		return true;
	}

	public boolean checkUserNameIsExist(String userName) {
		return userDao.getUserByUserName(userName) != null ? true : false;
	}

	public boolean checkEmailIsExist(String email) {
		return userDao.getUserByEmail(email) != null ? true : false;
	}

	public void sendPwdGetBackEmail(String email) {
		String code = generatorCodeAndSave(email);
		/*
		 * eu.setAction("verifyCode"); eu.setMessage("密码找回");
		 * eu.sendEmailTo(email, code);
		 */
		// EmailUtil eu=new EmailUtil();
		ApplicationEmail ae = new ApplicationEmail();
		SimpleDateFormat sFormat = new SimpleDateFormat("yyyy年MM月dd日");
		ae.setSubject("玉米广告平台通行证验证消息");
		String s = "<p>亲爱的用户：</p>" + "<br><p>您好！感谢您使用掌游天下玉米广告平台，您正在进行邮箱验证，本次请求的验证码为：</p>" + code + "<p>(为了保障您帐号的安全性，请在1小时内完成验证。)</p>" + "玉米广告平台团队 <br> "
				+ sFormat.format(new Date());
		ae.setContent(s);
		ae.setAddressee(email);
		eu.sendMail(mailSender, ae);
	}

	private String generatorCodeAndSave(String email) {
		UserEntity ue = this.userDao.getUserByEmail(email);
		long currentTime = System.currentTimeMillis() + 60 * 60 * 1000;
		Date date = new Date(currentTime);
		ue.setExpiredTime(date);
		String code = UUIDUtil.getUUID();
		ue.setCode(code);
		try {
			userDao.save(ue);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return code;
	}

	public boolean checkCode(String email, String code) {
		// check code
		UserEntity ue = this.userDao.getUserByEmail(email);
		if (ue == null || StringUtils.isEmpty(code) || ue.getExpiredTime() == null) {
			return false;
		}
		if (code.equals(ue.getCode()) && ue.getExpiredTime().getTime() > System.currentTimeMillis()) {
			return true;
		}
		return false;
	}

	public String regist(UserEntity userDto) {
		String status = "ok";
		String userName = userDto.getUserName();
		String email = userDto.getEmail();
		/*
		 * if (userName == null || userName.isEmpty()) { status =
		 * "userName用户名不能为空！"; } if (userDao.getUserByUserName(userName) !=
		 * null) { status = "userName用户名已存在！"; }
		 */
		if (email == null || email.isEmpty()) {
			status = "email邮箱不能为空！";
		} else {
			boolean isEmail = ValidatorUtil.isEMail(email);
			if (!isEmail) {
				status = "email邮箱格式不正确！";
			}
			if (userDao.getUserByEmail(userName) != null) {
				status = "email邮箱已存在！";
			}
		}
		if (!status.equals("ok")) {
			return status;
		}

		// 过滤非法字符
		// userName = ValidatorUtil.filterUnSafeChar(userName);
		// 去空格
		// userName = userName.trim();
		email = email.trim();
		UserEntity userEntity = new UserEntity();
		// userEntity.setUserName(userName);
		userEntity.setEmail(email);
		userEntity.setStatus(0);
		userEntity.setCreateTime(new Date());
		userEntity.setLastUpdate(new Date());
		// TODO 加密方式需要修改
		userEntity.setPassWord(Utils.getMD5Encoding(userDto.getPassWord()));
		userDao.save(userEntity);
		return status;
	}

	public UserEntity getUserByEmail(String email) {
		try {
			return this.userDao.getUserByEmail(email);
		} catch (Exception e) {
			logger.error("查用户 " + email + " 数据出错");
		}
		return null;
	}

	public JavaMailSender getMailSender() {
		return mailSender;
	}

	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	public EmailUtil getEu() {
		return eu;
	}

	public void setEu(EmailUtil eu) {
		this.eu = eu;
	}

}
