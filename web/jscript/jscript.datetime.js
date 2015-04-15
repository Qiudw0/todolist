// 构建datetime包
// 该datetime包中包含的功能函数有：计算给定年份和月份的该月天数、闰年判断

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.datetime = function(){ }

jscript.datetime.getNumberDaysInMonth = function(inMonth, inYear){
	/*
	*功能：计算某年中某个月的天数
	*参数：inMonth:输入月份；inYear:输入年份；
	*返回：返回指定年月的天数
	*/
	inMonth = inMonth - 1;
	var leap_year = this.isLeapYear(inYear); //闰年判断
	if(leap_year){ // 闰年
		leap_year = 1;
	}
	else{
		leap_year = 0;
	}

	if(inMonth == 3 || inMonth == 5 || inMonth == 8 || inMonth == 10){ //4、6、9、11月只有30天
		return 30;
	}else if(inMonth == 1){ //2月
		return 28 + leap_year;
	}else{
		return 31;
	}
} // end getnumberDaysInMonth()

jscript.datetime.isLeapYear = function(inYear){
	/*
	*功能：判断闰年
	*参数：inYear:指定年份
	*返回：闰年：true;否则：false;
	*/
	if(((inYear % 4 == 0) && !(inYear % 100 == 0)) || (inYear % 400 == 0)){
		return true;
	}
	return false;
} // end isLeapYear()