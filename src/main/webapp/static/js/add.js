/** 
 * Author:shanjing
 * Time:2015-11-20
 * add.js是用来判断是否是前端本地开发环境
**/
(function(){
	/**
	 * 判断是否是前端本地开发环境
	 * @method
	 * @static
	 * @return {Boolean}
	 */

	B.isBuild = (function(){
		if("passport.zplay.cn".indexOf(window.location.host.toString()) > -1){
			return true;
		}else{
			return false;
		}
	})();

})();
