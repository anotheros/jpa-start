package com.laozapp.service;

import com.laozapp.po.Article;

public interface ArticleService {
	void save (Article article);
	void del (Long id);
	Iterable<Article> getAll();

}
