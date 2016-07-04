package com.laozapp.po;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "user")
public class UserEntity {

	@Id
	@Column(name = "userid")
	@GeneratedValue(strategy = GenerationType.AUTO)
 	private Long userId;
	@Column(name = "userName")
	private String userName;
	@Column(name = "password")
	private String passWord;
	@Column(name = "createTime")
	private Date createTime;
	@Column(name = "lastUpdate")
	private Date lastUpdate;
	@Column(name = "email")
	private String email;
	@Column(name = "code")
	private String code;
	/**
	 * 0:未激活,1:激活
	 */
	@Column(name = "status")
	private int status;
	@Column(name = "expiredTime")
	private Date expiredTime;


	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getLastUpdate() {
		return lastUpdate;
	}
	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}

	public Date getExpiredTime() {
		return expiredTime;
	}

	public void setExpiredTime(Date expiredTime) {
		this.expiredTime = expiredTime;
	}
}
