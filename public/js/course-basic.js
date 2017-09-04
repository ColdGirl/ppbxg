define(['jquery','template','util'],function($,template,util){
	//设置导航选中
	util.setMenu('/course/course_add');
	//课程添加和查看是同一个页面 都需要将id带过去
	//获取课程id
	var csId = util.queryString('cs_id');
	//console.log(csId);
	//面包屑导航设置 获取添加和编辑的标识位
	var flag = util.queryString('flag');
	//根据id调用接口查询课程详细信息
	$.ajax({
		type: 'get',
		url: '/api/course/basic',
		data: {cs_id: csId},
		dataType: 'json',
		success: function(data){
			console.log(data);
			//解析数据 渲染页面
			if(flag){
				data.result.operate = '课程编辑';
			}else {
				data.result.operate = '课程添加';
			}
			var html = template('coursebasicTpl',data.result);
			$('#coursebasicInfo').html(html);
		}
	});
});