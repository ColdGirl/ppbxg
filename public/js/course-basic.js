define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR){
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
			//处理二级联动分类
			$('#firstType').change(function(){
				//alert(12); 
				//获取当前点击的一击分类id
				var fId = $(this).val();
				console.log(fId);
				//根据id查询接口调用二级分类
				$.ajax({
					type: 'get',
					url: '/api/category/child',
					dataType: 'json',
					data: {cg_id: fId},
					success: function(data){
						//console.log(data)
						var tpl = '<option value="">请选择二级分类...<option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}<option>{{/each}}';
						var html = template.render(tpl,{list: data.result});
						$('#secondType').html(html);
					}
				});
			});

			//处理附文本
			CKEDITOR.replace('ckeditor')
			//处理表单提交
			$('#basicForm').validate({
				sendForm: false,
				valid: function(){
					//同步数据信息 处理附文本的提交
					for (var instance in CKEDITOR.instances){
						CKEDITOR.instances[instance].updateElement();
					}
					//提交表单
					$(this).ajaxSubmit({
						type: 'post',
						url: '/api/course/update/basic',
						data: {cs_id: csId},//不需要加隐藏域了
						dataType: 'json',
						success: function(data){
							if(data.code == 200){
								location.href = '/course/picture?cs_id=' + data.result.cs_id;
							}
						}
					});
				}
			})

		}
	});
});