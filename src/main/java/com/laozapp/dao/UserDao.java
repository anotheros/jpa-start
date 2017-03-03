package com.laozapp.dao;

import com.laozapp.po.UserEntity;


public interface UserDao  extends BaseDao<UserEntity, Long> {

	UserEntity getUserByUserName(String userName);
	UserEntity findByUserName(String userName);

	UserEntity getUserByEmail(String email);

	UserEntity getUserByCode(String code);

}
