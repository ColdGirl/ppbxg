define(['jquery'],function($){
	//工具函数 方法 一个职责一个功能 给别的功能使用
	return {
		setMenu : function(path){
			//根据参数的地址通过选择器和href地址匹配 添加类
			$('.navs a[href="'+path+'"]').addClass('active');
		}
	}
})