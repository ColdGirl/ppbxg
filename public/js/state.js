define(['jquery'],function($){
	//监听整个页面 ajax发送的两个状态 一个strate 和stop
	$(document).ajaxStart(function(){
		//控制遮罩显示
		$('.overlay').show();
	});
	$(document).ajaxStop(function(){
		//隐藏的时候慢一点 延迟一会
		setTimeout(function(){
			$('.overlay').hide();
		},500);
		//控制遮罩的消失 隐藏 overlay遮罩样式 在index.css 图片居中显示
		//$('.overlay').hide();
	});
});
/*状态在哪里引入 不能再common里面引入   
common是在sript里面引入的  也是异步的 require['common']
所以在其他特免发送ajax请求的时候与 common有没有执行是不知道 的
已经执行过的status状态是出不来的
那个页面需要在哪个页面添加
js没有sleep（php的） 只能用定时函数
*/
