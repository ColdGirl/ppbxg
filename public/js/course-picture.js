define(['jquery','template','util','uploadify'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/course/add');

	//获取课程id
	var csId = util.queryString('cs_id');
	//根据id查询课程的封面信息
	$.ajax({
		type: 'get',
		url: '/api/course/picture',
		data: {cs_id:csId},
		dataType: 'json',
		success: function(data){
			var html = template('pictureTpl',data.result);
			$('#pictureInfo').html(html);
			//处理封面上传
			$('#upfile').uploadify({
				width: 80,
				height: 'auto',
				buttonText: '选择好图',
				itemTemplate: '<span></span>',
				buttonClass: 'btn btn-success btn-sm',
				swf: '/public/assets/uploadify/uploadify.swf',
				uploader: '/api/uploader/cover',
				fileObjName: 'cs_cover_original',//上传的是文件的内容 大 不单单是字符串
				formData: {cs_id: csId},//额外的参数 纯数据 字符串
				onUploadSuccess: function(f,data){
					data = JSON.parse(data);
					$('.preview img').attr('src',data.result.path);
				}
			})
		}
	});
});