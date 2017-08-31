define(['jquery','cookie'],function($){
	//实现登录功能
	 $('#login').click(function(){
            //console.log(124)
            $.ajax({
                type: "post",
                url: '/api/login',
                //后台配置了反向代理  /api 就是代替了api.study.com域名
                data: $('#loginForm').serialize(),
                //serialize 
               /* 获取表单中所有的inout的数据要求是必须有naem的属性
                得到的是类似url的参数的格式 jquery内部已经处理了*/
                dataType: 'json',
                success: function(data){
                    console.log(data)
                    if(data.code == 200){
                        //先保存cookie 加斜杠设置到根路径所有的页面都可以访问 
                        $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'})
                        //登录成功 跳主页面
                        location.href = '/main/index';
                    }else {
                        alert('用户名或密码错误');
                    }
                }

            })
            return false;//阻止默认行为
        })
})