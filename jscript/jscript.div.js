/*定义元素(div等)对象功能的js包
*该包部分功能函数的实现依赖于jscript.math包
*主要功能函数包括：获取对象、对象居中、改变对象的高度/宽度/横向坐标/纵向坐标、
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
    *@param: id:div框的id值；step: 高度改变的增量；divWidth: div框的最终宽度；time: 整个过程的执行时间
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
    *@param: id:元素的id值；step: 步增值；divX:元素的目标横坐标
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
    *@param: id:div的id值；step: 步增值；divY:div的目标纵坐标
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
