package com.laozapp.common;

import java.util.Properties;

import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.laozapp.util.ConfigUtil;
import org.apache.log4j.Logger;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;


@Component("emailUtil")
public class EmailUtil {
	
	private String emailSerder = ConfigUtil.INSTANCE.getProperty("email_from");
	private  Logger logger	= Logger.getLogger(this.getClass());
	@Async
	public void sendMail(JavaMailSender mailSender, ApplicationEmail email) {
		Session session = Session.getDefaultInstance(new Properties());
		MimeMessage mime = new MimeMessage(session);
		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(mime, true, "utf-8");
			helper.setFrom(emailSerder);// 发件人
			helper.setTo(InternetAddress.parse(email.getAddressee()));// 收件人
			helper.setSubject(email.getSubject());// 邮件主题
			helper.setText(email.getContent(), true);// true表示设定html格式
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
		}
		mailSender.send(mime);
	}

}
