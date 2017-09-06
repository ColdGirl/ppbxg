define(['jquery','template','util','bootstrap','form'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/course/list');
	//获取课程id
	var csId = util.queryString('cs_id');
	//查询课时数据
	$.ajax({
		type: 'get',
		url: '/api/course/lesson',
		data: {cs_id: csId},
		dataType: 'json',
		success: function(data){
			var html = template('lessonTpl',data.result);
			$('#lessonInfo').html(html);
		}
	})

})