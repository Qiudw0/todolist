/********************************************************************/
    /*                   author: qdw                             */
    /*                   time: 2015 - 05 - 14                    */
/********************************************************************/

function addLoadEvent(func){
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

function hasClass(elem, className){
    /*
    *@fun: 为对象添加class属性;
    *@param: elem: 需添加属性的对象；className: class名
    *return: 如果该对象存在这个class属性，返回true；否则返回false
    */
    var format = new RegExp('(\\s|^)' + className + '(\\s|$)');  // 定义正则表达式匹配className
    return !!elem.className.match(format);
} // end hasClass()

function addClass(elem, className){
    /*
    *@fun: 为对象添加class属性;
    *@param: elem: 需添加属性的对象；className: class名
    */
    if(!this.hasClass(elem, className)){ // 当前对象不存在该class
        elem.className += ' ' + className;
    }
} // end addClass()

function removeClass(elem, className){
    /*
    *@fun: 移除对象中的某个class属性
    *@param: elem: 待处理的对象；className: 待移除的class名
    */
    var format = new RegExp('(\\s|^)' + className + '(\\s|$)');  // 定义正则表达式匹配className
    if (this.hasClass(elem, className)) { // 先判断是否存在该clas属性
        elem.className = elem.className.replace(format, ' ');  // 以空格取代匹配到的class属性
    };
} // end removeClass()

function autoCenter(elem,sElem){
    /*
    *@func:设置元素对象相对于父对象自动居中
    *@param: elem: 要居中的对象；sElem: 父对象
     */
    // 获取窗口尺寸（根元素html）
    sElemH = sElem.clientHeight;
    sElemW = sElem.clientWidth;

    elemH = elem.offsetHeight;
    elemW = elem.offsetWidth;

    elem.style.left = (sElemW - elemW) / 2 + 'px';
    elem.style.top = (sElemH - elemH) / 2 + 'px';
}  // end autoCenter

/*************************for:图片缩放**********************/
// 设置放置图片的div和img居中
function setCenter(){
    var box = document.getElementById('img_box');
    var img = document.getElementById('pic');
    autoCenter(box, document.documentElement);
    autoCenter(img, box);
}

// 根据传入的id改变该对象的尺寸
function changeSize(elem,sWidth,sHeight, flag){
    /*
    *@func:根据传入的id改变该对象的尺寸
    *@param: elem: 需要改变尺寸的对象；sWidth: 该对象的初始宽度; sHeight: 初始高度
    *        flag: 改变的方向(true:放大；false:缩小)
     */
    
    var k = sWidth / sHeight;  // 记录宽高的比例
    var idHeight = elem.offsetHeight;
    if(flag){
        idHeight += 20;
    }else if(idHeight > 100){
        idHeight -= 20;
    }else{
        return;
    }
    elem.style.height = idHeight + 'px';
    elem.style.width = k * idHeight + 'px';
    autoCenter(elem, document.getElementById('img_box'));
}

function scrollFunc(e){
    var evn = e || window.event;  // 获取触发的事件对象
    var type = evn.type;
    var direct = 0;

    var mouseX = evn.clientX;  // 鼠标的当前位置
    var mouseY = evn.clientY;

    var box = document.getElementById('img_box'); // 获取盒子对象
    var boxX = box.offsetLeft;  // 获取box的坐标
    var boxY = box.offsetTop;
    var boxH = box.offsetHeight;  // 获取对象的尺寸
    var boxW = box.offsetWidth;

    var posX = boxX + boxW;  // 计算鼠标触发滚动时间的移动范围
    var posY = boxY + boxH;

    var judgeX = (mouseX > boxX) && (mouseX < posX); // 判断横向位置
    var judgeY = (mouseY > boxY) && (mouseY < posY); // 判断纵向位置

    if(!(judgeX && judgeY)) return;

    // firefox向下滚动的时候，detail值为3，向上滚动的时候为-3；
    // 其他浏览器向下滚动时候wheelDelta值为-120，向上滚动的时候为120
    if(type === 'mousewheel'){ // 非firefox
        direct = evn.wheelDelta;
    }else{
        direct = -evn.detail;
    }

    var aimId = document.getElementById('pic');
    var picW = aimId.offsetWidth;
    var picH = aimId.offsetHeight;
    if(direct < 0){ // 向下滚动
        changeSize(aimId,picW,picH,false);
    }else{
        changeSize(aimId,picW,picH,true);
    }
    moveImg();  // 每一次滚动事件触发后都时时监测图片的尺寸是否大于盒子尺寸
}

function scrollSize(){
    if(document.addEventListener){  // 兼容Firefox
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }
    document.onmousewheel = scrollFunc;
}


/*************************for:图片拖拽**********************/

function moveImg(){
    var pic = document.getElementById('pic');
    var box = document.getElementById('img_box');
    var picW = pic.offsetWidth;
    var picH = pic.offsetHeight;
    // 仅当图片尺寸大于盒子尺寸时才能移动图片
    var drag = new DragAndDrop('pic','img_box',box);  // 实例化拖拽对象
    if(picW > box.offsetWidth || picH > box.offsetHeight){
        addClass(pic, 'mouse_shap');    
    }else{
        this.removeClass(pic, 'mouse_shap');
        // 移除监听事件，撤销拖拽功能
        pic.removeEventListener('mousedown',drag.mouseDownEvent); 
        return;
    }
}


/**************************for: 图片加载********************/
function loadFunc(){
    setCenter();
    scrollSize();
    
}

addLoadEvent(loadFunc);