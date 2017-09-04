define(['jquery','template','util','uploadify'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/main/index');
	//调用后台接口填充数据
	$.ajax({
		type : 'get',
		url : '/api/teacher/profile',
		dataType : 'json',
		success : function(data){
			//console.log(data);解析数据 渲染页面
			var html = template('settingsTpl',data.result);
			$('#settingsInfo').html(html);
			//处理头像上传
			$('#upfile').uploadify({
				swf: '/public/assets/uploadify/uploadify.swf',//绝对路径
				uploader: '/api/uploader/avatar', 
				fileObjName: 'tc_avatar',
				width: 120,
				height:120,
				buttonText: '',
				itemTemplate: '<span></span>',
				onUploadSuccess: function(f,data){
					var data = JSON.parse(data);
					console.log(data);
					//拿到数据里面图片的url替换html里面的图片
					//重置头像的背景图片地址
					$('.preview img').attr('src',data.result.path);

				}

			})

		}

	});
});