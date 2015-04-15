//构建jscript.array包,
//该array包中包含的功能函数有：复制数组、查找数组元素以及求数组平均值

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.array = function() { }

jscript.array.copyArray = function(inSrcArray, inDerstArray){
	/*
	*功能：将一个数组的内容复制到另一个数组
	*参数：inSrcArray:待复制数组；inDestArray:复制所在数组
	*返回：被复制的数组
	*/
	var i;
	for(i = 0; i < inSrcArray.length; i++){
		inDerstArray.push(inSrcArray[i]);
	}
	return inDerstArray;
} //end copyArray()

jscript.array.findInArray = function(inArray, inValue){
	/*
	*功能：在数组中查找指定值
	*参数：inArray:查找数组；inValue:查找值
	*返回：查找成功返回该值位置，否则返回-1
	*/
	var i;
	for(i = 0; i < inArray.length; i++){
		if(inArray[i] == inValue){
			return i;
		}
	}
	return -1;
} //end findInArray()

jscript.array.arrayAverage = function(inArray){
	/*
	*功能：计算某个数值数组中所有元素的平均值
	*参数：待求平均值的数组
	*返回：返回元素的平均值
	*/
	var accumulator = 0;
	var i;
	for(i = 0; i < inArray.length; i++){
		accumulator += inArray[i];
	}
	return accumulator / inArray.length;
}