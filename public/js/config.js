require.config({
	baseUrl : '/public/assets',
	paths : {
		jquery : 'jquery/jquery',
		cookie : 'jquery-cookie/jquery.cookie',
		template : 'artTemplate/template-web',
		bootstrap : 'bootstrap/js/bootstrap.min',
		common : '../js/common',
		login : '../js/login',
		index : '../js/index',
		teacherlist: '../js/teacher-list',
		util: '../js/util',
		teacheradd: '../js/teacher-add',
		datepicker : 'bootstrap-datepicker/js/bootstrap-datepicker',
		language : 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		validate : 'validate/jquery-validate.min',
		form: 'jquery-form/jquery.form',
		settings : '../js/settings',
		uploadify: 'uploadify/jquery.uploadify.min',
		region : 'jquery-region/jquery.region',
		ckeditor: 'ckeditor/ckeditor',
		nprogress: 'nprogress/nprogress',
		state: '../js/state',
		courselist: '../js/course-list',
		courseadd: '../js/course-add',
		coursebasic: '../js/course-basic'
	},
	/*bootstrap不是标准的模块 需要转化成标准的模块*/
	shim :{
		bootstrap : {
			//depends 依赖
			deps : ['jquery']
		},
		language : {
			deps : ['jquery','datepicker']
		},
		validate : {
			deps : ['jquery']
		},
		uploadify : {
			deps : ['jquery']
		},
		ckeditor : {
			/*导出成员 源代码中CKEDITOR被加到了window中*/
			exports : 'CKEDITOR'

		}
	}
});