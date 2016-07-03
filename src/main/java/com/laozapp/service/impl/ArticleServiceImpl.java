package com.laozapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laozapp.dao.ArticleDao;
import com.laozapp.po.Article;
import com.laozapp.service.ArticleService;

@Service("articleService")
public class ArticleServiceImpl implements ArticleService {

	@Autowired
	private ArticleDao articleDao;
	@Override
	public void save(Article article) {
		articleDao.save(article);

	}

	@Override
	public Iterable<Article> getAll() {
		return  articleDao.findAll();
	}

}
