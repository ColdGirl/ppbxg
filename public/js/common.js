define(['jquery','template','cookie'],function($,template){
	// NProgress.start();
	// NProgress.done();
	//控制左侧菜单的折叠和展开 切换
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	//退出功能
	$('#logoutBtn').click(function(){
		console.log(123)
		$.ajax({
			type: 'post',
			url: '/api/logout',
			dataType: 'json',
			success: function(data){
				//console.log(data);
				if(data.code == 200){
					location.href = '/main/login';
				}
			}
		})
	})
	//验证是否登录
	var sessionID = $.cookie('PHPSESSID');
	// console.log(sessionID);
	if(!sessionID && location.pathname != '/main/login'){
		//sessionid 不存在 跳到登录页面
		location.href = '/main/login';
		//一直在刷新 没有跳进去 没有跳进去 死循环
	}
	//获取tc_name tavator 登录信息
	var loginInfo = $.cookie('loginInfo');
	//console.log(loginInfo);
	//{"tc_name":"admin","tc_avatar":"http://static.botue.com/images/avatar/596832a258e15.png"}
	//是字符创 cookie里面存的就是字符串
	var info = loginInfo?JSON.parse(loginInfo):{};


	// /*动态渲染头像框部分*/
	var tplstr = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
	var html = template.render(tplstr,info);
	$('.aside .profile').html(html);
	// $('.aside .profile img').attr('src',info.tc_avatar);
	// $('.aside .profile h4').html(info.tc_name);

});
	


	