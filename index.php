<?php 
	//include('./views/main/login.html');
	//根据url地址的不同访问页面
	//得到url的路径$_SERVER
	//var_dump($_SERVER);  是个数组
	//判断数组是否包含制定的属性

	/*if(array_key_exists('PATH_INFO',$_SERVER)){
		//存在的话就获取
		$path = $_SERVER['PATH_INFO'];
		echo $path;
	}
	include('./views/'.$path.'.html');
*/

	/*
	'PATH_INFO' => string '/' (length=1)  
	http://mybxg.com/index.php/
	拼接就会多一行
	*/


	/*$path = $_SERVER['PATH_INFO'];
	echo $path;*/


	/*
	http://mybxg.com/index.php/sdfsfds
	/sdfsfds
	index.php后面啥都没有就报错
	*/

	/*
	这个php扮演的角色是页面的分发
	这种职责成为路由 导航 从而返回不同的页面
	index.php的作用就是根据请求url的不同 导航到不同的页面
	这是后端的路由
	学到arglar vue 是后端的路由
	*/


	/*为了将目录与页面分开处理
	把路径与文件名单独的分开处理*/
	//准备默认的路径为dir
	$dir = 'main';//默认路径 目录名称
	$filename = 'index';//默认文件名称
	if(array_key_exists('PATH_INFO',$_SERVER)){
		//存在的话就获取url中的路径
		$path = $_SERVER['PATH_INFO'];
		//echo $path;///main/login
		//去掉路径中的第一个斜杠
		$str = substr($path,1);//main/index
		//分割路径和文件名称
		$arr = explode('/',$str);
		if(count($arr) == 2){
			$dir = $arr[0];//覆盖目录名称
			$filename = $arr[1];
		}else {
			//如果不是两层路径 就跳到登录页面
			$filename = 'login';
		}
		
	}
	include('./views/'.$dir.'/'.$filename.'.html');
?>