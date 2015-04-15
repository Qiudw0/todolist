// 构建jscript.storage包
// 协助实现客户端存储
// 功能函数包括：创建cookie、查询cookie及删除cookie


if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.storage = function(){ }

jscript.storage.setCookie = function(inName, inValue, inExpiry){
	/*
	*功能：创建一个cookie并将其保存在客户端
	*参数：inName:cookie的名字；inValue:cookie的值；inExpiry:cookie的有效时间
	*/

	if(typeof inExpiry == "Date"){ // 如果是Date对象，将其转换为GMT日期格式的字符串
		inExpiry = inExpiry.toGMTString(); // 格林威治时间格式
	}
	// escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串(同：decodeURI())
	document.cookie = inName + "=" + escape(inValue) + "; expires=" + inExpiry;
} // end setCookie()


jscript.storage.getCookie = function(inName){
	/*
	*功能：获取指定的cookie的值
	*参数：inName:传入的cookie名称
	*返回：查找成功返回cookie值；否则返回空
	*/

	var docCookies = document.cookie;
	var cIndex = docCookies.indexOf(inName + "="); // 查找
	if(cIndex == -1) return null;
	cIndex = docCookies.indexOf("=",cIndex) + 1; // cookie的值在"="与";"之间
	var endStr = docCookies.indexOf(";", cIndex);
	if(endStr == -1) endStr = docCookies.length;
	// unescape() 函数可对通过 escape() 编码的字符串进行解码（同：decodeURIComponent()）
	return unescape(docCookies.substring(cIndex, endStr));

} // end getCookie()


jscript.storage.deleteCookie = function(inName){
	/*
	*功能：删除指定的cookie
	*参数：inName:要删除的cookie名
	*/

	if(this.getCookie(inName)){
		this.setCookie(inName, null, "Thu, 01-Jan-1970 00:00:01 GMT");
	}
} // end deleteCookie()