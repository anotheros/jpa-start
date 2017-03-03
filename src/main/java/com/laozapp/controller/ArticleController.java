package com.laozapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.laozapp.po.Article;
import com.laozapp.service.ArticleService;
import com.laozapp.service.UserService;

@Controller
@RequestMapping("/article")
public class ArticleController {
	@Autowired
	private ArticleService articleService;
	@Autowired
	private UserService userService;
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
	@RequestMapping(value = "/del", method = RequestMethod.GET)
	public String save(Long id){
		articleService.del(id);;
		return "redirect:listPath";
		
	}
	@RequestMapping(value = "/listPath")
	public ModelAndView list(){
		ModelAndView mv =new ModelAndView("list2");
		Iterable<Article> articles=articleService.getAll();
		mv.addObject("articles",articles);
		return mv;
	}
	@RequestMapping(value = "/list")
	public ModelAndView list3333(){
		ModelAndView mv =new ModelAndView("list");
		Iterable<Article> articles=articleService.getAll();
		mv.addObject("articles",articles);
		return mv;
	}
	@RequestMapping(value = "/help/test/{a}", method = RequestMethod.GET)
	@ResponseBody
	// 乱码问题没有解决掉。
	public ResponseEntity<?> test(@PathVariable("a") String a) {
		userService.getUserByUserName(a);
		HttpHeaders headers = new HttpHeaders();
			ResponseEntity<Object> re = new ResponseEntity<Object>(a, headers, HttpStatus.OK);
			return re;
	}
}
