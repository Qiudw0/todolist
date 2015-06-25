// 构建jscript.debug包
// 该包助于调试JS
// 该debug包包括的功能函数有：输出对象的信息，记录日志信息

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.debug = function(){ }

jscript.debug.enumProps = function(inObj){
	/*
	*功能：输出对象的所有属性及其所有值
	*参数：inObj:传入的对象
	*返回：输出该对象的属性及属性值
	*/
	var props = "";
	var i;
	for(i in inObj){
		props += i + "=" + inObj[i] + "\n";
	}
	alert(props);
} // end enumProps()


jscript.debug.divLogger = function(){
	/*
	*功能：实现自动记录日志机制，一个基于严重级别来记录日志的日志系统，给它传信息来写日志
	*/

	// 定义常量标志严重级别（6种级别）
	this.LEVEL_TRACE = 1; // 微量的
	this.LEVEL_DEBUG = 2;
	this.LEVEL_INFO = 3;
	this.LEVEL_WARN = 4;
	this.LEVEL_ERROR = 5;
	this.LEVEL_FATAL = 6; // 致命的

	// 为不同级别的日志信息标记颜色
	this.LEVEL_TRACE_COLOR = "a0a000";
	this.LEVEL_DEBUG_COLOR = "64c864";
	this.LEVEL_INFO_COLOR = "000000";
	this.LEVEL_WARN_COLOR = "0000ff";
	this.LEVEL_ERROR_COLOR = "ff8c00";
	this.LEVEL_FATAL_COLOR = "ff0000";

	this.logLevel = 3;  //记录日志的级别范畴，严重级别在3或以上才记录
	this.targetDiv = null; //用于输出日志信息的div

	/**
	*功能：健壮机制。该函数用于设置可记录日志的严重级别，在inLevel或以上级别都可被记录为日志
	*参数：inLevel:可记录的级别边界
	*/
	this.setLevel = function(inLevel){
		this.logLevel = inLevel;
	} // end setLevel

	/**
	*功能：实例化用于显示日志信息的div对象，并清空该div内的原有信息。所有的日志信息都被写在这个div对象中
	*参数：inTargetDiv:用于显示日志的div对象
	*/
	this.setTargetDiv = function(inTargetDiv){
		this.targetDiv = inTargetDiv;
		this.targetDiv.innerHTML = ""; 
	} // end setTargetDiv()

	/**
	*功能：比较严重级别，判断该信息是否该被记录为日志
	*参数：inLevel:当前信息的严重级别
	*/
	this.shouldBeLogged = function(inLevel){
		if(inLevel >= this.logLevel){
			return true;
		}else{
			return false;
		}
	} // end shouldBeLogged()

	/**
	*功能：trace级别的日志信息
	*参数：inMessage:日志信息
	*/
	this.trace = function(inMessage){
		if(this.shouldBeLogged(this.LEVEL_TRACE) && this.targetDiv){
			this.targetDiv.innerHTML += "<div style='color:#" + this.LEVEL_TRACE_COLOR + ";'>" + "[TRACE]" + inMessage + "</div>"; 
		}
	} // end trace()

	/**
	*功能：debug级别的日志信息
	*参数：inMessage:日志信息
	*/
	this.debug = function(inMessage){
		if(this.shouldBeLogged(this.LEVEL_DEBUG) && this.targetDiv){
			this.targetDiv.innerHTML += "<div style='color:#" + this.LEVEL_DEBUG_COLOR + ";'>" + "[DEBUG]" + inMessage + "</div>"; 
		}
	} // end debug()

	/**
	*功能：info级别的日志信息
	*参数：inMessage:日志信息
	*/
	this.info = function(inMessage){
		if(this.shouldBeLogged(this.LEVEL_INFO) && this.targetDiv){
			this.targetDiv.innerHTML += "<div style='color:#" + this.LEVEL_INFO_COLOR + ";'>" + "[INFO]" + inMessage + "</div>"; 
		}
	} // end info()

	/**
	*功能：warn级别的日志信息
	*参数：inMessage:日志信息
	*/
	this.warn = function(inMessage){
		if(this.shouldBeLogged(this.LEVEL_WARN) && this.targetDiv){
			this.targetDiv.innerHTML += "<div style='color:#" + this.LEVEL_WARN_COLOR + ";'>" + "[WARN]" + inMessage + "</div>"; 
		}
	} // end WARN()

	/**
	*功能：error级别的日志信息
	*参数：inMessage:日志信息
	*/
	this.error = function(inMessage){
		if(this.shouldBeLogged(this.LEVEL_ERROR) && this.targetDiv){
			this.targetDiv.innerHTML += "<div style='color:#" + this.LEVEL_ERROR_COLOR + ";'>" + "[ERROR]" + inMessage + "</div>"; 
		}
	} // end error()

	/**
	*功能：fatal级别的日志信息
	*参数：inMessage:日志信息
	*/
	this.fatal = function(inMessage){
		if(this.shouldBeLogged(this.LEVEL_FATAL) && this.targetDiv){
			this.targetDiv.innerHTML += "<div style='color:#" + this.LEVEL_FATAL_COLOR + ";'>" + "[FATAL]" + inMessage + "</div>"; 
		}
	} // end fatal()

} // end divLogger()