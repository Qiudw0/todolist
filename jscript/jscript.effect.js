// jascript.effect包用于存储动画效果
// 其中功能函数包括：对象元素放大冒出、对象元素缩小隐藏、拖拽对象

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.effect = function(){ }


// 动画描述：将一个元素对象由小放大到指定的尺寸，同时从指定的位置移动到浏览器中央

jscript.effect.largeSizeAndPosition = function(id, left, top, divHeight, divWidth, step, time){
    /*
    *@fun: 改变div框的大小及位置
    *@param: id:div的id值；left,top: div的最终坐标；divHeight,divWidth: div的最终高宽；
    *  step: 整个变化过程所需的步数；time: 整个过程的所需时间
    */
    if(typeof id != 'string' || typeof left != 'number' || typeof top != 'number' || typeof divHeight != 'number'
        || typeof divWidth != 'number' || typeof step != 'number' || typeof time != 'number' || step == 0){
        alert('参数出错');
        return;
    }
    var aimId = jscript.div.getElement(id);  // 获取移动的对象
    var posX = aimId.offsetLeft;  // 获取对象的横向坐标
    var posY = aimId.offsetTop;  // 获取对象的纵向坐标
    var curH = aimId.offsetHeight;  // 当前高度
    var curW = aimId.offsetWidth;  // 当前宽度

    var lenH = divHeight - curH;  // 高度差距
    var lenW = divWidth - curW;  // 宽度差距

    var stepH = lenH / step;  // 高度步增值
    var stepW = lenW / step;  // 宽度步增值

    var stepTime = time / step;  // 每一步的执行时间


    var lenX = left - posX;  // 求出横向坐标的距离
    var lenY = top - posY;  // 求出纵向坐标的距离
    var stepX = lenX / step;  // 横向坐标的步增值
    var stepY = lenY / step;  // 纵向坐标的步增值
// alert(stepX);
    jscript.div.changeX(id, stepX, left, stepTime);
    jscript.div.changeY(id, stepY, top, stepTime);
    jscript.div.changeH(id, stepH, divHeight, stepTime);
    jscript.div.changeW(id, stepW, divWidth, stepTime);

}  // end sizeAndPosition()


// 动画描述：将一个元素对象由大放小至尺寸为0，同时从初始位置往指定位置方向移动

jscript.effect.smallSizeAndPosition = function(id, step, time){
    /*
    *@fun: 改变div框的大小及位置
    *@param: id:div的id值；step: 整个变化过程所需的步数；time: 整个过程的所需时间
    */
    if(typeof id != 'string' || typeof step != 'number' || typeof time != 'number' || step == 0){
        alert('参数出错');
        return;
    }

    var left = 0;  // 存储对象的最终位置
    var top = 0;

    // 获取浏览器窗口的宽高值
    var browserW = 0;  // 记录浏览器宽度
    var browserH = 0;  // 记录浏览器高度
    if(window.innerWidth){
        browserW = window.innerWidth;
        browserH = window.innerHeight;
    }else{
        browserW = document.body.clientWidth;
        browserH = document.body.clientHeight;
    }

    var aimId = jscript.div.getElement(id);  // 获取移动的对象
    var posX = aimId.offsetLeft;  // 获取对象的横向坐标
    var posY = aimId.offsetTop;  // 获取对象的纵向坐标
    var elemH = aimId.offsetHeight;  // 对象的当前高度
    var elemW = aimId.offsetWidth;  // 对象的当前宽度

    var stepH = (0 - elemH) / step;  // 高度步增值
    var stepW = (0 - elemW) / step;  // 宽度步增值

    var stepTime = time / step;  // 每一步的执行时间

    var whichCorner = jscript.math.genRandomNumber(1, 4)  // 对象框飞入的角落
    switch(whichCorner){  // 根据不同角落设置div的初始位置值
        case 1:
            left = 0;
            top = 0;
            break;
        case 2:
            left = browserW;
            top = 0;
            break;
        case 3:
            left = browserW;
            top = browserH;
            break;
        case 4:
            left = 0;
            top = browserH;
            break;
    } // switch

    var lenX = left - posX;  // 求出横向坐标的距离
    var lenY = top - posY;  // 求出纵向坐标的距离
    var stepX = lenX / step;  // 横向坐标的步增值
    var stepY = lenY / step;  // 纵向坐标的步增值

    jscript.div.changeX(id, stepX, left, stepTime);
    jscript.div.changeY(id, stepY, top, stepTime);
    jscript.div.changeH(id, stepH, 0, stepTime);
    jscript.div.changeW(id, stepW, 0, stepTime);

}  // end sizeAndPosition()


// 动画描述：定义一个可被拖拽和可放置拖拽元素的对象，实现元素对象的拖拽效果

jscript.effect.dragAndDrop = function(id1, id2){
    /*
    *@fun: 实现用鼠标拖拽一个对象
    *@param: elem1: 传入的可以触发拖拽事件的对象：elem2: 传入的被拖拽的对象
    */
    if(typeof id1 != 'string' || typeof id2 != 'string'){
        alert('参数出错');
        return;
    }
    var elem1 = jscript.div.getElement(id1);
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
