// jscript.mouse包用于存储与鼠标相关的功能函数


if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.mouse = function() { }

jscript.mouse.getMouseX = function(){
    /*
    *@fun: 获取鼠标的横向坐标
    */
}


jscript.mouse.getMouseY = function(){
    /*
    *@fun: 获取鼠标的纵向坐标
    */
}


jscript.mouse.getMouseTarget = function(evt) {
    /*
    *@fun: 获取鼠标移入的对象名称/鼠标移出的对象名称（从哪个对象移除）
    *@param: evt: 浏览器默认传入的事件对象
    *@return: 对象名称
    */
    var e = evt || window.event;
    if (e.srcElement) { //IE
        if (e.type == 'mouseover') {
            return e.fromElement.tagName;
        } else if (e.type == 'mouseout') {
            return e.toElement.tagName;
        }
    } else if (e.relatedTarget) {   //W3C
        return e.relatedTarget;
    }
}


jscript.mouse.mouseScrollDirection = function(evt) {
    /*
    *@fun: 兼容chrome和firefox的鼠标滚动的方向
    *@param: evt: 浏览器默认传入的事件对象
    *@return: 返回浏览器各自的滚动距离值，但数值保持上负下正
    */
    var e = evt || window.event;
    if (e.wheelDelta) {
        return e.wheelDelta;
    } else if (evt.detail) {
        return -evt.detail;
    }
}
