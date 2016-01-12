/** 
 * Author:shanjing
 * Time:2015-11-20
**/
define("cont/resetStepTwo", ["cont/common"], function(){
	$(function(){
		$(".sendCodeBtn").on("click",function(){
			$.ajax({
				type:"POST",
				url:$("#valitateURL").val()
			});
			var sendBtn = $(this);
			sendBtn.hide();
			$(".j_sendTimeBtn").show();
			countDown($(".j_countDown"),120,function(){
				$(".j_sendTimeBtn").hide();
				sendBtn.text("重新发送").show();
			});
		});
	});
});