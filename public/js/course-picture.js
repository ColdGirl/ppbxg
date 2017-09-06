define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
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
			//console.log(data)
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
			//处理图片裁切
			var img = $('.preview img');
			var nowcrop = null;	//保证页面只有一个实例

			//图片裁切功能方法
			function cropImage(){
				img.Jcrop({
					aspectRatio: 2,
					boxWidth: 400
				},function(){
					//销毁之前的实例 
					nowCrop && nowCrop.destroy();//如果不这样 空调用会报错 
					//缓冲当前的实例
					nowcrop = this;
					//设置预览效果
					this.initComponent('Thumbnailer',{
						width: 240,
						height: 120,
						mypos: '.thumb'//修改源代码 类选择器
					});
					//动态创建选取
					//选区坐标计算
					console.log(this)
					var width = this.ui.stage.width;
					var height = this.ui.stage.height;

					var x = 0;
					var y = (height - width/2)/2;
 					var w = width;
 					var h = width/2;
 					//创建选区
 					this.newSelection();
 					this.setSelect([x,y,w,h]);
 					//设置预览区的位置
 					$('.jcrop-thumb').css({
 						top: 0,
 						left: 0
 					})
 					//初始化表单数据
 					var input = $('#cropForm').find('input');
 						input.eq(0).val(x);
 						input.eq(1).val(y);
 						input.eq(2).val(w);
 						input.eq(3).val(h);
 					//处理选取数据 每次触发都要把数据填充到表单里
 					img.closest('div').on('cropstrat cropmove cropend',function(a,b,c){
 						//console.log(c);
 						//利用数据做提交操作
 						var input = $('#cropForm').find('input');
 						input.eq(0).val(c.x);
 						input.eq(1).val(c.y);
 						input.eq(2).val(c.w);
 						input.eq(3).val(c.h);
 					})
 					/*//选取触发
 					img.closest('div').trigger('cropstart');*/
				});
			}
			//处理按钮的点击状态
			$('#cropBtn').click(function(){
				//添加状态位
				var flag = $(this).attr('data-flag');
				if(flag){
					//再次点击，把裁剪好的尺条信息提交给后台寸 得到的数据
					//console.log(2)
					$('#cropForm').ajaxSubmit({
						type: 'post',
						url: '/api/course/update/picture',
						data: {cs_id: csId},//只需要一个参数 其他的四个表单自动提交
						dataType: 'json',
						success: function(data){
							if(data.code == 200){
								location.href="/course/lesson?cs_id=" +data.result.cs_id;
							}
						}
					});

				}else{
					//进行图片裁切
					cropImage();	
					//第一次点击,点击之后修改按钮状态
					$(this).attr('data-flag',1);
					$(this).html('保存图片');
					console.log(1)
				}
			});

		
		}
	});
});