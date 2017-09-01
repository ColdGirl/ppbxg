define(['jquery','template','util','bootstrap'],function($,template,util){
	var ret = util.queryString('uname');
	console.log(ret)
	//根据地址栏的地址和跳转的url匹配 设置左边导航菜单选中
	//根据参数的地址通过选择器和href地址匹配 添加类
	//$('.navs a[href=" '+location.pathname +'"]').addClass('active');
	util.setMenu(location.pathname);
	
	//console.log(111111111)
	//调用后台接口获取列表数据
	$.ajax({
		type: 'get',
		url : '/api/teacher',
		dataType: 'json',
		success: function(data){
			console.log(data)
			//解析数据渲染页面
			var html = template('teacherTpl',{list: data.result});
			$('#teacherInfo').html(html);
		
		//绑定预览单击事件
		$('.preview').click(function(){
			//绑定预览单机事件 closest 离a标签最近的parent
			var td = $(this).closest('td');
			//获取当前点击的id
			var tcId = td.attr('data-tcId');
			console.log(tcId)
	        //根据id查询数据
	        $.ajax({
	        	type : 'get',
	        	url : '/api/teacher/view',
	        	data : {tc_id : tcId},
	        	dataType : 'json',
	        	success : function(data){
	        		//解析数据 渲染页面
	        		var html = template('modalTpl',data.result);
	        		$('#modalInfo').html(html);
	        		$('#teacherModal').modal();
	        	}
	        });
		})
		//控制启用和注销
		$('.eod').click(function(){
			var td = $(this).closest('td');
			var tcId = td.attr('data-tcId');
			var tcStatus = td.attr('data-status');
			var that = this;
			//调用接口
			$.ajax({
				type : 'post',
				url : '/api/teacher/handle',
				data : {tc_id : tcId , tc_status : tcStatus},
				dataType : 'json',
				success :function(data){
					// console.log(data)
					if(data.code == 200){
						//修改状态
						td.attr('data-status',data.result.tc_status);
						//修改文字
						if(data.result.tc_status == 0){
							$(that).html('注 销');
						}else{
							$(that).html('启 用');
						}
					}
				}
			});
		});
	}
 });
});