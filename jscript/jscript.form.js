// 构建jscript.form包
// 协助使用HTML表单和表单元素的代码
// 功能函数包括：从一个form表单生成一个XML文本、在<select>选项中查找、选中、全选以及撤销全选

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.form = function(){ }

jscript.form.formToXML = function(inForm,inRootElement){
	/*
	*功能：从一个HTML生成一个XML表单
	*参数：inFOrm:传入的表单；inRootElement:一个字符串，它是要创建的XML文本的根元素
	*返回：返回一个XML文本
	*/
	if(inForm == null){
		return null;
	}
	if(inRootElement == null){
		return null;
	}
	var outXML = "<" + inRootElement + ">"; // XML文本根元素
	var i;
	for(i = 0; i < inForm.length; i++){ // 遍历inForm表单中的各子节点
		var ofe = inForm[i];
		var ofeType = ofe.type.toUpperCase();
		var ofeName = ofe.name;
		var ofeVAlue = ofe.value;
		// 针对各种type类型的<input>进行处理
		if(ofeType == "TEXT" || ofeType == "HIDDEN" || ofeType == "PASSWORD" || ofeType == "SELECT-ONE" || ofeType == "TEXTAREA"){
			outXML += "<" + ofeName + ">" + ofeVAlue + "</" + ofeName + ">";
		}
		if(ofeType == "RADIO" && ofe.checked == true){
			outXML += "<" + ofeName + ">" + ofeVAlue + "</" + ofeName + ">";
		}
		if(ofeType == "CHECKBOX"){
			if(ofe.checked == true){
				cbval = "true";
			}else{
				cbval = "false";
			}
			outXML = outXML + "<" + ofeName + ">" + cbval + "</" + ofeName + ">"
		}
		outXML += "";
	} // for
	outXML += "</" + inRootElement + ">";
	return outXML;
} // end formToXML()


jscript.form.selectLocateOption = function(inSelect, inValue, inJustFind, inCaseInsensitive){
	/*
	*功能：在<select>域里查找并随意地选择一个指定的选项
	*参数：inSelect:传入的<select>域；inValue:要查找的值；inJustFind:布尔类型，是指只是查找而不必选择；
		   inCaseInsensitive:布尔类型，匹配inValue是否忽略大小写
	*返回：查找成功返回true，否则返回false.
	*/
	if(inSelect == null || inValue == null || inValue == "" || inJustFind == null || inCaseInsensitive == null){
		return;
	}
	if(inCaseInsensitive){
		inValue = inValue.toLowerCase(); // 转为小写
	}
	var found = false;
	var i;
	for(i = 0; (i < inSelect.length) && !found; i++){  // ??inSelect.options.length
		var nextVal = inSelect.options[i].value;
		if(inCaseInsensitive){
			nextVal = nextVal.toLowerCase();
		}
		if(nextVal == inValue){
			found = true;
			if(!inJustFind){
				inSelect.options[i].selected = true;
			}
		}
	} // for
	return found;
} // end selectLocateOption()


jscript.form.selectSelectAll = function(inSelect){
	/*
	*功能：在一个<select>域中提供全选功能
	*参数：inSelect:传入的<select>域
	*返回：如果传入的<select>域为空，则返回null；否则全选
	*/
	if(inSelect == null || !inSelect.options || inSelect.options.length == 0){
		return;
	}
	var i;
	for(i = 0; i < inSelect.options.length; i++){
		inSelect.options[i].selected = true;
	}
} // end selectSelectAll()


jscript.form.selectUnselectAll = function(inSelect){
	/*
	*功能：在一个<select>域中提供撤销全选功能
	*参数：inSelect:传入的<select>域
	*/
	if(inSelect == null || !inSelect.options || inSelect.options.length == 0){
		return;
	}
	var i;
	for(i = 0; i < inSelect.options.length; i++){
		inSelect.options[i].selected = false;
	}
} // end selectSelectAll()