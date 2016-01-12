package com.laozapp.util;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;

public class BeanFactoryUtil implements BeanFactoryAware {
	private static BeanFactory	mybeanFactory;

	@Override
	public void setBeanFactory(BeanFactory arg0) throws BeansException {
		mybeanFactory = arg0;
	}

	public static Object getBean(String beanName) {
		return mybeanFactory.getBean(beanName);
	}
}
