// 构建jscript.dom包
// 辅助操作DOM树
// 功能函数包括：DOM对象水平居中、DOM对象垂直居中、批量获取DOM对象、移除空白结点以及插入结点
// 添加及移除class

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.dom = function(){ }

jscript.dom.layerCenterH = function(inObj){
	/*
	*功能：将任意一个DOM元素水平居中
	*参数：inObj:需水平居中的对象/元素
	*/
	var lca; // 存储浏览器窗口的宽度
	var lcb; // 存储对象inObj的宽度
	var lcx; // 存储对象的水平位置
	var iebody;
	var dsocleft;
	if(window.innerWidth){ // 获取浏览器窗口宽度或者是body的宽度
		lca = window.innerWidth;
	}else{
		lca = document.body.clientWidth;
	}
	lcb = inObj.offsetWidth; // 获取对象的宽度
	// 对象的水平位置(round()方法将某个数舍入为最接近的整数，eg:3.5会被舍入为4)
	lcx = (Math.round(lca / 2) - (Math.round(lcb / 2)));

	// 以下代码是考虑到页面可能存在水平滚动距离
	// 根据ie的不同模式使用不同的元素以获取该水平滚动距离
	iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
	// 通过document.all属性来判断当前使用的浏览器，如果存在该属性，则为ie浏览器，否则为其他浏览器
	dsocleft = document.all ? iebody.scrollLeft : window.pageXOffset; // 存储水平滚动条的距离
	inObj.style.left = lcx + dsocleft + "px"; // 将水平滚动条的距离计算入总宽度中
} // end layerCenterH()


jscript.dom.layerCenterV = function(inObj){
	/*
	*功能：将任意一个DOM元素垂直居中
	*参数：inObj:需垂直居中的对象/元素
	*/
	var lca;
	var lcb;
	var lcy;
	var iebody;
	var dsoctop;
	if(window.innerHeight){
		lca = window.innerHeight;
	}else{
		lca = document.body.clientHeight;
	}
	lcb = inObj.offsetHeight;
	lcy = (Math.round(lca / 2) - (Math.round(lcb / 2))); // 对象的水平位置
	iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
	dsoctop = document.all ? iebody.scrollTop : window.pageYOffset;
	inObj.style.top = lcy + dsoctop + "px";
} // end layerCenterV()


jscript.dom.execScripts = function(inText){
	/*
	*功能：执行Ajax请求返回的内容中包含的<script>端代码
	*参数：inText:Ajax返回的文本
	*/
	var si = 0;
	while(true){
		// 查找开标签：<script>
		var ss = inText.indexOf("<" + "script" + ">", si);
		if(ss == -1) return;
		// 查找闭标签：</script>
		var se = inText.indexOf("<" + "/" + "script" + ">", ss);
		if(se == -1) return;
		si =se + 9; // 移动查找位置在当前的闭标签</script>之后
		var sc = inText.substring(ss + 8, se); //<script>标签之内的代码
		eval(sc); //执行代码片段
	}
} // end execScripts()

jscript.dom.getDOMElements = function(){
	/*
	*功能：引用任意数量的DOM元素
	*返回：结果返回空/DOM对象/包含DOM对象的数组
	*/
	if(arguments.length == 0) return null;
	if(arguments.length == 1) return document.getElementById(arguments[0]);
	var elems = new Array();
	for(i = 0; i < arguments.length; i++){
		elems.push(document.getElementById(arguments[i]));
	}
	return elems;
} // end getDOMElements()


jscript.dom.removeWhiteNodes = function(node){
	/*
	*@fun: 移除空白结点
	*@param: node: 父节点
	*@reuturn: 返回移除了空白结点之后的node
	*/
	for (var i =0; i < node.childNodes.length; i++) {
		if (node.childNodes[i].nodeType === 3 && /^\s+$/.test(node.childNodes[i].nodeValue)) {
			// 结点类型为3（表示文本结点），并且文本为空，则为空白结点
			node.removeChild(node.childNodes[i]);
		};
	};
	return node;
} // end removeChildNodes()

jscript.dom.insertAfter = function(newNode, targetNode){
	/*
	*@fun: 在指定结点之后插入新节点
	*@param: newNode: 被插入的新节点；targetNode: 结点目标位置
	*/
	var parent = this.removeWhiteNodes(targetNode.parentNode);  // 取得移除空白结点之后的父节点
	if(parent.lastChild === targetNode){  // 如果目标结点是其父节点的最后一个结点
		parent.appendChild(newNode);  // 直接插入到父节点的末尾
	}else{
		parent.insertBefore(newNode, targetNode.nextSibling);  // 在目标结点的下一个结点之前插入
	}
} // end insertAfter()

jscript.dom.hasClass = function(elem, className){
	/*
	*@fun: 为对象添加class属性;
	*@param: elem: 需添加属性的对象；className: class名
	*return: 如果该对象存在这个class属性，返回true；否则返回false
	*/
	var format = new RegExp('(\\s|^)' + className + '(\\s|$)');  // 定义正则表达式匹配className
	return !!elem.className.match(format);
} // end hasClass()

jscript.dom.addClass = function(elem, className){
	/*
	*@fun: 为对象添加class属性;
	*@param: elem: 需添加属性的对象；className: class名
	*/
	if(!this.hasClass(elem, className)){ // 当前对象不存在该class
		elem.className += ' ' + className;
	}
} // end addClass()

jscript.dom.removeClass = function(elem, className){
	/*
	*@fun: 移除对象中的某个class属性
	*@param: elem: 待处理的对象；className: 待移除的class名
	*/
	var format = new RegExp('(\\s|^)' + className + '(\\s|$)');  // 定义正则表达式匹配className
	if (this.hasClass(elem, className)) { // 先判断是否存在该clas属性
		elem.className = elem.className.replace(format, ' ');  // 以空格取代匹配到的class属性
	};
} // end removeClass()







