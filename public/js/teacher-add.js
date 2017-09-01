define(['jquery','template','util'],function($,template,util){
	//设置菜单选中
	util.setMenu('/teacher/list');	
	//获取编辑的id
	var tcId = util.queryString('tc_id');
    console.log(tcId);
    //有id是在编辑 没有是在添加
    if(tcId){
    	//编辑 从数据库获取 调取接口
    	$.ajax({
    		type: 'get',
    		url: '/api/teacher/edit',
    		data: {tc_id : tcId},
    		dataType: 'json',
    		success: function(data){
    			console.log(data);
    			data.result.operate = "编辑讲师";
    			//解析数据 传染页面
    			var html = template('teacherTpl',data.result);
    			$('#teacherInfo').html(html);
    		}
    	})
    }else{
       //添加
       var html = template('teacherTpl',{operate: '添加讲师',tc_gender:1});
       $('#teacherInfo').html(html);
    }
})