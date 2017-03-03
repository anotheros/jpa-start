package com.laozapp.service;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.laozapp.common.Utils;
import com.laozapp.dao.UserDao;
import com.laozapp.po.UserEntity;

@Service
public class UserService {

	private Logger logger = LoggerFactory.getLogger(this.getClass());


	

	@Autowired
	private UserDao userDao;

	public void out() {
		System.out.println("UserService");
	}

	public UserEntity getUserByUserName(String userName) {
		UserEntity ue = this.userDao.findByUserName(userName);
		return ue;
	}

	public UserEntity getUser(Long id) {
		return this.userDao.findOne(id);
	}

	public boolean saveUser(UserEntity userEntity) {
		
		return true;
	}

	

}
