/********************************************************************/
    /*                   author: qdw                             */
    /*                   time: 2015 - 05 - 14                    */
/********************************************************************/

function DragAndDrop(id1, id2, sElem){
    /*
    *@fun: 实现用鼠标拖拽一个对象
    *@param: ；id1: 传入的被拖拽的对象的id值；id2: 表示被拖拽对象的放入位置的id值；
      sElem: 相对于被拖拽对象的父对象(用于限制限制拖动的范围，一般是根元素对象document.documentElement)
    */
    if(typeof id1 != 'string' || typeof id2 != 'string'){
        alert('dragAndDrop函数参数（拖拽对象）出错');
        return;
    }
    var elem1 = document.getElementById(id1);
    var elem2 = document.getElementById(id2);
    var LEFT = elem1.offsetLeft;  // 记录id1的初始位置
    var TOP = elem1.offsetTop;
    var mouseOffsetX = 0;  // 鼠标的偏移值
    var mouseOffsetY = 0;
    var isDraging = false;  // 是否可被拖拽

    // 添加监听事件——鼠标的按下事件
    this.mouseDownEvent = function(e){
        var e = e || window.event;  // e表示鼠标对象
        e.preventDefault(); // 阻值mousedown的默认事件
        // 计算偏移值(鼠标对象与被拖动对象之间的偏移值)，要将父对象的坐标计算在内
        mouseOffsetX = e.clientX - sElem.offsetLeft - elem1.offsetLeft;  
        mouseOffsetY = e.clientY - sElem.offsetTop - elem1.offsetTop;
        isDraging = true;
    }
    elem1.addEventListener('mousedown', this.mouseDownEvent);
   
    // 鼠标移动的事件

    var moveX = 0;  // 被拖动对象的最终位置
    var moveY = 0;
    document.onmousemove = function(e){
        var e = e || window.event;

        var mouseX = e.clientX - sElem.offsetLeft;  // 鼠标相对于父对象的当前位置
        var mouseY = e.clientY - sElem.offsetTop;

        if (isDraging === true) {
            moveX = mouseX - mouseOffsetX; // 计算出对象移动后的位置
            moveY = mouseY - mouseOffsetY;
            // 限定移动范围
            if((elem1.offsetWidth > elem2.offsetWidth) || (elem1.offsetHeight > elem2.offsetHeight)){ //被拖动对象的尺寸大于其父对象
                if(moveX > 0){ // 左边框在父对象左边框的右侧
                    moveX = 0; // 定位在父对象的左边框处
                }else if(moveX < (sElem.offsetWidth - elem1.offsetWidth)){ 
                // 右边框在父对象右边框的左侧
                    // 定位在父对象的右边框处
                    moveX = sElem.offsetWidth - elem1.offsetWidth; 
                }

                if(moveY > 0){ // 上边框在父对象上边框的下侧
                    moveY = 0; // 定位在父对象的上边框处
                }else if(moveY < (sElem.offsetHeight - elem1.offsetHeight)){ 
                // 右边框在父对象右边框的左侧
                    // 定位在父对象的右边框处
                    moveY = sElem.offsetHeight - elem1.offsetHeight; 
                }

            }

            elem1.style.left = moveX + 'px';
            elem1.style.top = moveY + 'px';
        }
    } // end onmousemove

    document.onmouseup = function(){

        isDraging = false;

    } // end onmouseup

}  // end dragAndDrop()