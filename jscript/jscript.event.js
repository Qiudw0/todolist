//构建 jscript.event包用于协助event事件的操作
// 包括的功能函数有：

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.event = function() { }


jscript.event.addLoadEvent = function(func){
    /*
    *@func: 定义加载页面时调用positionMessage()函数的函数
    *@param: func: 要加载的函数
    */

    var oldonload=window.onload;
    if(typeof window.onload!='function'){//判断是否已经有函数已经附加在onload事件中
        window.onload=func;
    }
    else{
        window.onload=function(){
                oldonload();// 存在即运行
                func();//运行传进来的函数
            }
        }
}


jscript.event.addScript = function(sPath){
    /*
    *@frunc: 动态添加script标签的函数
    *@param: spath: 添加的javascript文件的路径
    */

    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = sPath;
    document.body.appendChild(oScript);
}


jscript.event.addEvent = function(obj, type, fn) {
    /*
    *@func: 跨浏览器添加事件
    *@param: obj: 需要添加事件的对象; type: 添加的事件的类型，如click等; fn: 附件到事件上的函数
    */

    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + type, fn);
    }
}


jscript.event.removeEvent = function(obj, type, fn) {
    /*
    *@func: 跨浏览器移除事件
    *@param: obj: 需要移除事件的对象; type: y移除的事件的类型，如click等; fn: 附件到事件上的函数
    */

    if (obj.removeEventListener) {
        obj.removeEventListener(type, fn, false);
    } else if (obj.detachEvent) {
        obj.detachEvent('on' + type, fn);
    }
}


jscript.event.getTarget = function(evt) {
    /*
    *@func: 跨浏览器获取目标对象
    */
    if (evt.target) {       //W3C
        return evt.target;
    } else if (window.event.srcElement) {       //IE
        return window.event.srcElement;
    }
}


jscript.event.preventDefaultAction = function(evt) {
    /*
    *@fun: 阻止浏览器的默认行为，如：a标签的链接跳转、鼠标右键跳出的菜单等
    *@param: evt: 浏览器默认传入的事件对象
    */
    var e = evt || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}
