define(['jquery','template','util','datepicker','language','validate','form'],function($,template,util){
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
    			//提交编辑表单
				submitForm('/api/teacher/update');
    		}
    	});
    }else{
       //添加
       var html = template('teacherTpl',{operate: '添加讲师',tc_gender:1});
       $('#teacherInfo').html(html);
       //提交添加讲师表单
       submitForm('/api/teacher/add');
    }
    //提交表单公共方法
    function submitForm(url){
        $('#teacherForm').validate({
            sendForm : false,
            valid: function(){
                console.log("ok");
                //提交表单这里
                $(this).ajaxSubmit({
                    type: "post",
                    url : url,
                    dataType: 'json',
                    success: function(data){
                        if(data.code == 200){
                            location.href = '/teacher/list';
                        }
                    }

                });
            },
            //所有的验证通过
            /*提示信息 和参数的配置*/
            description :  {
                tc_nameee : {
                    required: "请输入用户名",
                    valid : "用户名可以使用"
                },
                tc_passss: {
                    required: "请输入密码",
                    pattern: "密码必须是6位数字",
                    valid: "密码有效"
                },
                tc_join_dateee :{
                    required: "请输入日期",
                    valid: "日期有效"
                }


            }
        });
    }
 /*   function submitForm(url){
    	$('#teacherBtn').click(function(){
    		$.ajax({
    			type: 'post',
    			url : url,
    			data : $('#teacherForm').serialize(),
    			dataType: 'json',
    			success: function(data){
    				console.log(data);
    				if(data.code == 200){
    					location.href = '/teacher/list';
    				}
    			}
    		})
    	});
    }//end submitForm*/

})//end define