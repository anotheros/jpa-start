package com.laozapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.laozapp.po.Article;
import com.laozapp.service.ArticleService;

@Controller
@RequestMapping("/article")
public class ArticleController {
	@Autowired
	private ArticleService articleService;
	@RequestMapping(value = "/get")
	public String index(Article article){
		System.out.println("2222222222");
		return "redirect:list";
		
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(Article article){
		articleService.save(article);
		return "redirect:list";
		
	}
	@RequestMapping(value = "/list")
	public ModelAndView list(){
		ModelAndView mv =new ModelAndView("list");
		Iterable<Article> articles=articleService.getAll();
		mv.addObject("articles",articles);
		return mv;
	}
}
