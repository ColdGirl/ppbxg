define(['jquery','util','state'],function($,util){
	/*//根据参数的地址通过选择器和href地址匹配 添加类
	$('.navs a[href=" '+location.pathname +'"]').addClass('active');*/
	//console.log(location.pathname)///main/index
	util.setMenu(location.pathname);
})