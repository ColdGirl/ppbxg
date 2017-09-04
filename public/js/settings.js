define(['jquery','template','util','ckeditor','uploadify','datepicker','language','region','validate','form'],
	function($,template,util,CKEDITOR){
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
			});
			//处理省市县三级联动
			 $('#pcd').region({
        		url : '/public/assets/jquery-region/region.json'
     		 });
     		 //处理附文本 replace 是内部的一个方法 api
     		 CKEDITOR.replace('ckeditor',{
     		 	toolbarGroups :   [
				{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
				{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
				{ name: 'links', groups: [ 'links' ] },
				{ name: 'insert', groups: [ 'insert' ] },
				{ name: 'forms', groups: [ 'forms' ] },
				{ name: 'tools', groups: [ 'tools' ] },
				{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] }
     		 ]
     		});

     		 //处理表单提交
     		 $('#settingsForm').validate({
     		 	sendForm: false, 
     		 	//所有的验证都通过 提交表单
     		 	valid: function(){
     		 		//把富文本的数据同步到表单域中 实例 一个页面中可能有多个文本框
     		 		for(var instance in CKEDITOR.instances){
     		 		//取出来其中一实例 后面是对象 前面是属性 通过对象取得属性 在属性复制的时候讲过
     		 		//内部提供的方法 目的是更新属性
     		 		CKEDITOR.instances[instance].updateElement();
     		 		}
     		 		//获取家乡数据
	     		 	var p = $('#p options:selected').text();
	     		 	var c = $('#c options:selected').text();
	     		 	var d = $('#d options:selected').text();
	     		 	var hometown = p + '|' + c + '|' + d; 
     		 		$(this).ajaxSubmit({
     		 			type: 'post',
     		 			url: '/api/teacher/modify',//更新个人资料
     		 			data: {tc_hometown : hometown},
     		 			dataType: 'json',
     		 			success: function(data){
     		 				if(data.code == 200){
     		 				//刷新页面
     		 					location.reload();
     		 				}
     		 			}
     		 	
     		 		})
     		 	}
     		 })

     		 //附文本插件的内容是在iframe子页面里面 应该在textarea里面 
     		 //他里面还是原来默认的数据 把iframe子页面里面的数据同步到texterea中
		}

	});
});