/** 
 * Author:shanjing
 * Time:2015-11-20
**/
define("cont/success", ["cont/common"], function(){
	$(function(){
		countDown($(".j_countDown"),5,$("#loginURL").val())
	});
});