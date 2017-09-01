define(['jquery'],function($){
	//工具函数 方法 一个职责一个功能 给别的功能使用
	return {
		//设置导航菜单选中
		setMenu : function(path){
			//根据参数的地址通过选择器和href地址匹配 添加类
			$('.navs a[href="'+path+'"]').addClass('active');
			//筛选出当前点的是那个按钮
		},
		queryString: function(key){
			//url后面的问号后面的参数值 带问号 location是bom对象
			var param = location.search.substring(1);
			var result = null;
			console.log(param);//uname=lisi&age=18
			if(param){
				var kvs = param.split('&');
				console.log(kvs);//数组  ["uname=lisi", "age=18"]
			    kvs.forEach(function(item){//item是其中的一项数据
                 var kv = item.split('=');
                 console.log(kv);// ["uname", "lisi"] ["age", "18"]
                 if(key == kv[0]){
                 	result = kv[1];//获取属性值
                 	return false;
                 }
			})
			}
			return result;
		}	
	}
})