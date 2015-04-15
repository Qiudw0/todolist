// 构建jscript.math包
// 协助实现数学函数功能
// 功能函数包括：获取随机数

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.math = function(){ }

jscript.math.genRandomNumber = function(inMin, inMax){
	/*
	*功能：根据指定的范围生成一个随机数
	*参数：inMin、inMax：指定范围的最小、大值
	*返回：返回一个随机数
	*/
	if(inMin > inMax) return 0;
	return Math.round(inMin + (inMax - inMin) * Math.random()); // random()函数产生的随机数范围：(0,1]
} // end genRandomNumber()