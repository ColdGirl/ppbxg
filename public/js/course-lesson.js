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

			//表单提交公用功能
			function submitForm(url,ctId){
				var param = {ct_cs_id: csId}; 
				if(ctId){
					param.ct_id = ctId;
				}
				$('#submitBtn').click(function(){
					$('#modalForm').ajaxSubmit({
						type: 'post',
						url: url,
						data: param,
						dataType: 'json',
						success: function(data){
							if( data.code == 200){
								location.reload();
							}
						}
					})
				})
			}
			//处理添加功能
			$('#addBtn').click(function(){
				//渲染模板
				var html = template('modalTpl',{operate: '添加课时'});
				$('#modalInfo').html(html);
				//直接弹窗
				$('#chapterModal').modal();
				//添加提交表单
				submitForm('/api/course/chapter/add');
			});


			//处理编辑功能
			$('.editLesson').click(function(){
				//先查询数据
				var ctId = $(this).attr('data-ctId');
				console.log(ctId);
				$.ajax({
					type: 'get',
					url: '/api/course/chapter/edit',
					data: {ct_id: ctId},
					dataType: 'json',
					success: function(data){
						data.result.operate = '编辑课时';
						console.log(data)
						//渲染模板
						var html = template('modalTpl',data.result);
						$('#modalInfo').html(html);
						//显示模态框
						$('#chapterModal').modal();
						//编辑课时提交
						submitForm('/api/course/chapter/modify',ctId);
					}
				});
			});
		}
	})

})
