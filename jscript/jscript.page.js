// 构建jscript.page包
// 该包包含把当前页面当成一个整体来处理的代码
// 功能函数有：打印当前页面、使用传入的参数、打破框架

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.page = function(){ }


jscript.page.printPage = function(){
	/*
	*功能：用程序启动对当前页面的打印
	*/
	if(parseInt(navigator.appVersion) >= 4){ // 检查浏览器版本确定是否支持window.print()调用
		window.print();
	}
} // end printPage()


jscript.page.getParameter = function(inParaName){
	/*
	*功能：使用一个传入页面的参数
	*参数：inParaName:传入的要查找的参数
	*/

	var retVal = null;
	var varvals = unescape(location.search.substring(1)); // 获取查询字符串的引用方法
	if(varvals){
		var search_array = varvals.split("&"); // 用"&"将字符串varvals分开形成数组
		var temp_array = new Array();
		var i = 0;
		var j = 0;
		for(i = 0; i < search_array.length; i++){
			temp_array = search_array[i].split("="); // 将每一个元素（形式为：name=value）进一步用"="分开
			var pName = temp_array[0];
			var pVal = temp_array[1];
			if(inParaName == null){ // 传入的参数为空，则返回数组
				if(retVal == null) retVal = new Array();
				retVal[j] = pName;
				retVal[j+1] = pVal;
				j += 2;
			}else{
				if (pName == inParaName) {
					retVal = pVal;
					break;
				};
			}
		} // for
	} // if
	return retVal;
} // end getParameter()


jscript.page.breakOutOfFrames = function(){
	/*
	*功能：使用js打破一个框架。个人理解它的意思是当进入另一个页面的时候，该页面脱离原先的框架而存在。
	*/

	if(self != top){ // 确保浏览器中的文档在顶部，这通常引发任何的框架被新文档（服务器返回的结果）重写
		top.location = self.location;
	}
} // end breakOutOfFrames()