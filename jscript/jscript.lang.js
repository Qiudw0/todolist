// 构建jscript.lang包
// 它包含一些在基础的语言水平上帮助我们使用JS代码
// 功能函数包括：两个对象之间复制属性

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.lang = function(){ }

jscript.lang.copyProperties = function(inSrcObj, inDestObj, inOverride){
	/*
	*功能：复制对象的属性给另一个对象
	*参数：inSrcObj:要被复制的对象；inDestObj:接收复制属性的对象；inOverride:布尔类型，是否覆盖已存在的属性        在的相同属性.
	*返回：返回复制之后的对象（增加了属性的对象）
	*/
	var prop;
	for(prop in inSrcObj){
		if(inOverride || !inDestObj[prop]){
			inDestObj[prop] = inSrcObj[prop];
		}
	}
	return inDestObj;
} // end copyProperties()
