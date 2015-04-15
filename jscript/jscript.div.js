/*定义元素(div等)对象功能的js包
*该包部分功能函数的实现依赖于jscript.math包
*主要功能函数包括：获取对象、对象居中、改变对象的高度/宽度/横向坐标/纵向坐标、
*改变对象的尺寸跟位置、拖拽对象等
*/

if (typeof jscript == 'undefined') {
  jscript = function() { }
}


jscript.div = function() { }

// 根据id获取元素的对象
jscript.div.getElement = function(id){

    return document.getElementById(id);

}  // end getElement()

//对象自动居中
jscript.div.autoCenter = function(elem){
    bodyH = document.documentElement.clientHeight;
    bodyW = document.documentElement.clientWidth;

    elemH = elem.offsetHeight;
    elemW = elem.offsetWidth;

    elem.style.left = (bodyW - elemW) / 2 + 'px';
    elem.style.top = (bodyH - elemH) / 2 + 'px';
}  // end autoCenter

// 对象全屏
jscript.div.fillToBody = function(elem){

    elem.style.width = document.documentElement.clientWidth + 'px';
    elem.style.height = document.documentElement.clientHeight + 'px';

}  //  end fillToBody()


// 定义改变div高度的函数
jscript.div.changeH = function(id, step, divHeight, time){  // success
    /*
    *@un: 改变指定的div框的高度
    *@param: id:div框的id值；step: 高度改变的增量；divHeight: div框的最终高度；time: 整个过程的执行时间
    */
    var aimId = document.getElementById(id);  // 获取移动的对象
    var curH = aimId.offsetHeight;  // 获取当前对象的高度
    if(step > 0){  // 高度是增加的
        if(curH < divHeight){
            curH += step;
            aimId.style.height = curH + 'px';
            setTimeout("jscript.div.changeH('" + id + "', " + step + ", " + divHeight + ", " + time + ")", time);
        }
    } // step > 0
    else{ // 高度是减少的
        if(curH > divHeight){
            curH += step;
            aimId.style.height = curH + 'px';
            setTimeout("jscript.div.changeH('" + id + "', " + step + ", " + divHeight + ", " + time + ")", time);
        }
    } // step < 0
}  // end changeH()

// 定义改变div宽度的函数
jscript.div.changeW = function(id, step, divWidth, time){  // success
    /*
    *@un: 改变指定的div框的高度
    *@param: id:div框的id值；step: 高度改变的增量；divHeight: div框的最终高度；time: 整个过程的执行时间
    */
    var aimId = document.getElementById(id);  // 获取移动的对象
    var curW = aimId.offsetWidth;  // 获取当前对象的高度
    if(step > 0){  // 高度是增加的
        if(curW < divWidth){
            curW += step;
            aimId.style.width = curW + 'px';
            setTimeout("jscript.div.changeW('" + id + "', " + step + ", " + divWidth + ", " + time + ")", time);
        }
    } // step > 0
    else{ // 高度是减少的
        if(curW > divWidth){
            curW += step;
            aimId.style.width = curW + 'px';
            setTimeout("jscript.div.changeW('" + id + "', " + step + ", " + divWidth + ", " + time + ")", time);
        }
    } // step < 0
}  // end changeW()

// 改变元素的横坐标
jscript.div.changeX = function(id, step, divX, time){  // success
    /*
    *@fun: 改变指定的d元素的横坐标
    *@param: id:元素的id值；step: 步增值；srcX:元素的初始横坐标；divX:元素的目标横坐标
    */
    var aimId = document.getElementById(id);  // 获取移动的对象
    var curX = aimId.offsetLeft;  // 实时记录元素的当前横坐标

    if(step > 0){ // 元素向右移动
        if(curX < divX){
            curX += step;
            aimId.style.left = curX + 'px';
            setTimeout("jscript.div.changeX('" + id + "', " + step + ", " + divX + ", " + time + ")", time);
        }
    }
    else{ // 元素向左移动
        if(curX > divX){
            curX += step;
            aimId.style.left = curX + 'px';
            setTimeout("jscript.div.changeX('" + id + "', " + step + ", " + divX + ", " + time + ")", time);
        }
    }
}  // end changeX()

// 改变元素的纵坐标
jscript.div.changeY = function(id, step, divY, time){  // success
    /*
    *@fun: 改变指定的div的纵坐标
    *@param: id:div的id值；step: 步增值；srcX:div的初始纵坐标；divY:div的目标纵坐标
    */
    var aimId = document.getElementById(id);  // 获取移动的对象
    var curY = aimId.offsetTop;  // 实时记录div的当前纵坐标

    if(step > 0){ // div向右移动
        if(curY < divY){
            curY += step;
            aimId.style.top = curY + 'px';
            setTimeout("jscript.div.changeY('" + id + "', " + step + ", " + divY + ", " + time + ")", time);
        }
    }
    else{ // div向左移动
        if(curY > divY){
            curY += step;
            aimId.style.top = curY + 'px';
            setTimeout("jscript.div.changeY('" + id + "', " + step + ", " + divY + ", " + time + ")", time);
        }
    }
}  // end changeY()

// 函数
jscript.div.sizeAndPosition = function(id, left, top, divHeight, divWidth, step, time){
    /*
    *@fun: 改变div框的大小及位置
    *@param: id:div的id值；left,top: div的最终坐标；divHeight,divWidth: div的最终高宽；
    *  step: 整个变化过程所需的步数；time: 整个过程的所需时间
    */
    var aimId = document.getElementById(id);  // 获取移动的对象
    var posX = aimId.offsetLeft;  // 获取对象的横向坐标
    var posY = aimId.offsetTop;  // 获取对象的纵向坐标
    var curH = aimId.offsetHeight;  // 当前高度
    var curW = aimId.offsetWidth;  // 当前宽度

    var lenH = divHeight - curH;  // 高度差距
    var lenW = divWidth - curW;  // 宽度差距
    var stepH = lenH / step;  // 高度步增值
    var stepW = lenW / step;  // 宽度步增值
// alert(stepH);

    var stepTime = time / step;  // 每一步的执行时间

    var lenX = left - posX;  // 求出横向坐标的距离
    var lenY = top - posY;  // 求出纵向坐标的距离
    var stepX = lenX / step;  // 横向坐标的步增值
    var stepY = lenY / step;  // 纵向坐标的步增值
// alert(stepX);
    this.changeX(id, stepX, left, stepTime);
    this.changeY(id, stepY, top, stepTime);
    this.changeH(id, stepH, divHeight, stepTime);
    this.changeW(id, stepW, divWidth, stepTime);

}  // end sizeAndPosition()


// 定义鼠标拖拽元素的功能
jscript.div.dragAndDrop = function(id1, id2){
    /*
    *@fun: 实现用鼠标拖拽一个对象
    @param: elem1: 传入的可以触发拖拽事件的对象：elem2: 传入的被拖拽的对象
    */
    var elem1 = this.getElement(id1);
    var mouseOffsetX = 0;  // 鼠标的偏移值
    var mouseOffsetY = 0;
    var isDraging = false;  // 是否可被拖拽

    // 添加监听事件——鼠标的按下事件
    elem1.addEventListener('mousedown', function(e){
        var e = e || window.event;  // e表示鼠标对象
        var elem2 = jscript.div.getElement(id2);
        mouseOffsetX = e.pageX - elem2.offsetLeft;  // 计算偏移值
        mouseOffsetY = e.pageY - elem2.offsetTop;
        isDraging = true;
    });

    // 鼠标移动的事件
    document.onmousemove = function(e){
        var e = e || window.event;
        var elem2 = jscript.div.getElement(id2);

        var mouseX = e.pageX;  // 鼠标的当前位置
        var mouseY = e.pageY;

        var moveX = 0;  // 被拖动对象的最终位置
        var moveY = 0;

        if (isDraging === true) {
            moveX = mouseX - mouseOffsetX;
            moveY = mouseY - mouseOffsetY;

            // 限定移动范围
            if(moveX < 0){
                moveX = 0;
            }else if(moveX > (document.documentElement.clientWidth - elem2.offsetWidth)){
                moveX = document.documentElement.clientWidth - elem2.offsetWidth;
            }

            if(moveY < 0){
                moveY = 0;
            }else if (moveY > (document.documentElement.clientHeight - elem2.offsetHeight)) {
                moveY = document.documentElement.clientHeight - elem2.offsetHeight;
            }

            elem2.style.left = moveX + 'px';
            elem2.style.top = moveY + 'px';
        }
    } // end onmousemove

    // 定义鼠标松开事件
    document.onmouseup = function(){
        isDraging = false;
    } // end onmouseup

}  // end dragAndDrop()

