define(['jquery','util'],function($,util){
	/*//根据参数的地址通过选择器和href地址匹配 添加类
	$('.navs a[href=" '+location.pathname +'"]').addClass('active');*/
	util.setMenu(location.pathname);
})