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
		settings : '../js/settings'
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
		}
	}
});