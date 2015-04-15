//构建jscript.browser包
//该browser包中包含的功能函数有：获取当前程序使用的浏览器的标志信息

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.browser = function(){ }

jscript.browser.getBrowserIdentity = function(){
	/*
	*功能：获取当前程序使用的浏览器的标志信息
	*返回：返回浏览器的名称和版本号
	*/
	return navigator.appName + " " + navigator.appVersion;
}