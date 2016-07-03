package com.laozapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.laozapp.dao.ArticleDao;
import com.laozapp.po.Article;
import com.laozapp.service.ArticleService;

@Service("articleService")
public class ArticleServiceImpl implements ArticleService {

	@Autowired
	private ArticleDao articleDao;
	@Override
	@Transactional
	public void save(Article article) {
		articleDao.save(article);

	}

	@Override
	public Iterable<Article> getAll() {
		return  articleDao.findAll();
	}

	@Override
	@Transactional
	public void del(Long id) {
		if(id==null){
			return;
		}
		articleDao.delete(id);
	}

}
