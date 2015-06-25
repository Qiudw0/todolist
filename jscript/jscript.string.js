// 构建jscript.string包
// 协助使用字符串
// 功能包括：计算字串出现的次数、删除/保留指定的字符（串）、测试字符串中的合法或非法字符、取代字符串中出
// 现的所有某个字串、删除字符串中开头/末尾/两边的空格、切割字符串。

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.string = function(){ }


jscript.string.substrCount = function(inStr, inSearchStr){
	/*
	*功能：计算子串在字符串中出现的次数
	*参数：inStr:待查询的字符；inSearchStr:被查找的子字符串
	*返回：inSearchStr出现的次数
	*/

	if(inStr == null || inStr == "" || inSearchStr == null || inSearchStr == ""){
		return 0;
	}
	var splitChars = inStr.split(inSearchStr); // 根据inSearchStr切割inStr
	return splitChars.length - 1; // inSearchStr出现的次数比被切割后得到的片数少1

} // end substrCount()


jscript.string.stripChars = function(inStr, inStripOrAllow, inCharList){
	/*
	*功能：从一个字符串中删除或保留（即除指定字母之外删除其他字母）指定字母
	*参数；inStr:源字符串；inStripOrAllow:允许或删除；inCharList:指定的字母列表
	*返回：返回源字符串inStr中被允许的字符
	*/

	if(inStr == null || inStr == "" || inCharList == null || inCharList == "" || inStripOrAllow == null || inStripOrAllow == ""){
		return "";
	}
	inStripOrAllow = inStripOrAllow.toLowerCase(); //值为:allow或strip
	var outStr = "";
	var i;
	var j;
	var nextChar;
	var keepChar;
	for(i = 0; i < inStr.length; i++){ // 在源字符串中扫描
		nextChar = inStr.substring(i, i + 1); // 与substr(i, 1)等价
		//alert(nextChar);
		if(inStripOrAllow == "allow"){ // 检查被允许的字符
			keepChar = false;  // 首先假设字符不被允许
		}else{  // 检查要被删除的字符
			keepChar = true;  // 首先假设字符允许保留
		}

		for(j = 0; j < inCharList.length; j++){
			checkChar = inCharList.substr(j, 1);
			if(inStripOrAllow == "allow" && nextChar == checkChar){ // 在字母允许列表中找到
				keepChar = true;  // 则该字符被允许
			}
			if(inStripOrAllow == "strip" && nextChar == checkChar){  // 在字母删除列表中找到
				keepChar =false; // 则该字符不被允许
			}
		} // 内层for
		if(keepChar == true){
			outStr = outStr + nextChar;  // 记录被允许的字符
		}
	} // 外层for
	return outStr;
} // end stripChars()


jscript.string.strContentValid = function(inString, inCharList, inFromExcept){
	/*
	*功能：测试字符串中是否只包含合法字符或是只包含非法字符
	*参数：inString:源字符串；inCharList:合法/非法字符列表；inFromExcept:inString中的字符是否来自inCharList
	*/

	if(inString == null || inCharList == null || inFromExcept == null || inString == "" || inCharList == ""){
		return false;
	}
	inFromExcept = inFromExcept.toLowerCase();
	var i;
	if(inFromExcept == "from_list"){ // 此时inString中字符应该在inCharList中出现，没有出现则返回false
		for(i = 0; i < inString.length; i++){
			if(inCharList.indexOf(inString.charAt(i)) == -1){ // charAt(i)取出inString字符串中i位置的字符
				return false;
			}
		} // for
		return true;
	}
	if(inFromExcept == "not_from_list"){ // 此时inString中的字符不应该出现在inCharList中，出现则返回false
		for(i = 0; i < inString.length; i++){
			if(inCharList.indexOf(inString.charAt(i)) != -1){
				return false;
			}
		} // for
		return true;
	}
} // end strContentValid()


jscript.string.replace = function(inSrc, inOld, inNew){
	/*
	*功能：替换字符串中出现的所有某个字串
	*参数：inSrc:源字符串；inOld:被替换的字串；inNew:替换后的字串*/
	if(inSrc == null || inSrc == "" || inOld == null || inOld == "" || inNew == null || inNew == ""){
		return "";
	}
	while(inSrc.indexOf(inOld) > -1){ // 替换所有的出现的inOld
		inSrc = inSrc.replace(inOld, inNew);
	}
	return inSrc;
} // end replace()


jscript.string.leftTrim = function(inStr){
	/*
	*功能：删除字符串开头处的空格
	*参数：inStr:传入的字符串
	*返回：被删除开头处空格的字符串
	*/

	if(inStr == null || inStr == ""){
		return null;
	}
	var j;
	for(j = 0; inStr.charAt(j) == " "; j++){} // 找到字符串中的第一个空白字符
	return inStr.substring(j, inStr.length);
} // end leftTrim()


jscript.string.rightTrim = function(inStr){
	/*
	*功能：删除字符串中末尾处的空格
	*参数：inStr:传入的字符串
	*返回：被删除末尾空格之后的字符串
	*/

	if(inStr == null || inStr == "") return null;
	var j;
	for(j = inStr.length - 1; inStr.charAt(j) == " "; j--){} // 从末尾开始找出第一个空白字符
	return inStr.substring(0, j + 1);
} // end rightTrim()


jscript.string.fullTrim = function(inStr){
	/*
	*功能：删除字符串中两边的空格
	*参数：inStr:传入的字符串
	*返回：删除两别空格之后的字符串
	*/

	if(inStr == null || inStr == " ") return null;
	inStr = this.leftTrim(inStr); // 删除开头出出现的空格
	inStr = this.rightTrim(inStr); // 删除末尾处出现的空格
	return inStr;
} // end fullTrim()


jscript.string.breakLine = function(inText, inSize){
	/*
	*功能：将字符串分割成指定长度的片段，但要保持单个词的完整性（比如被切割的位置刚好遇到某个单词的某个字母*处，那么采取向前切的原则保证单词的完整性）
	*参数：inText:被分割的字符串；inSize:片段长度
	*返回：如果输入合法，返回片段数组；否则返回源字符串
	*/

	if(inText == null || inText == "" || inSize < 0){
		return inText
	}
	if(inText.length <= inSize){
		return inText;
	}
	var outArray = new Array();
	var str = inText;
	while(str.length > inSize){
		var x = str.substring(0,inSize);
		// 找出x中“ ”以及“\n”最后出现的位置
		var y = x.lastIndexOf(" "); //lastIndexOf()返回指定字符在字符串中最后出现的位置，从后向前搜索
		var z = x.lastIndexOf("\n");
		if(z != -1){
			y = z;
		}
		if(y == -1){
			y = inSize;
		}
		outArray.push(str.substring(0, y));
		str = str.substring(y); // 取出str中从y位置开始的字符串
	}
	outArray.push(str);
	return outArray;
} // end breakLine()