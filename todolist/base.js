/********************************************************************/
    /*                   author: qdw                             */
    /*                   time: 2015 - 05 - 14                    */
/********************************************************************/


//前台调用
var $ = function (_this) {
    return new Base(_this);
}

//基础库
function Base(_this) {
    //创建一个数组，来保存获取的节点和节点数组
    this.elements = [];
    if (_this != undefined) {    //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
        this.elements[0] = _this;
    }
}

/*Base.prototype.getElems = function(){
    return this.elements;
}*/

//获取ID节点
Base.prototype.getId = function (id) {
    this.elements.push(document.getElementById(id));
    return this;
};

//获取元素节点数组
Base.prototype.getTagName = function (tag) {
    var tags = document.getElementsByTagName(tag);
    for (var i = 0; i < tags.length; i ++) {
        this.elements.push(tags[i]);
    }
    return this;
};

//获取CLASS节点数组
Base.prototype.getClass = function (className, idName) {
    var node = null;
    if (arguments.length == 2) {
        node = document.getElementById(idName);
    } else {
        node = document;
    }
    var all = node.getElementsByTagName('*');
    for (var i = 0; i < all.length; i ++) {
        if (all[i].className == className) {
            this.elements.push(all[i]);
        }
    }
    return this;
}

//获取某一个节点
Base.prototype.getElement = function (num) {    
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
};

//设置CSS
Base.prototype.css = function (attr, value) {
    for (var i = 0; i < this.elements.length; i ++) {
        if (arguments.length == 1) { //只传入attr一个参数时
            return getStyle(this.elements[i], attr); // 返回属性值
        }
        this.elements[i].style[attr] = value; // 设置对应属性值
    }
    return this;
}

/*
*@fun: 为对象添加class属性;
*@param: elem: 需添加属性的对象；className: class名
*/
Base.prototype.addClass = function (className) {
    for (var i = 0; i < this.elements.length; i ++) {
        if (!hasClass(this.elements[i], className)) { // 当前对象不存在该class
            this.elements[i].className += ' ' + className;
        }
    }
    return this;
}

/*
*@fun: 移除对象中的某个class属性
*@param: elem: 待处理的对象；className: 待移除的class名
*/
Base.prototype.removeClass = function (className) {
    // 定义正则表达式匹配className
    var format = new RegExp('(\\s|^)' + className + '(\\s|$)');  
    for (var i = 0; i < this.elements.length; i ++) {
        if (hasClass(this.elements[i], className)) {// 先判断是否存在该clas属性
            // 以空格取代匹配到的class属性
            this.elements[i].className = this.elements[i].className.replace(format, ' ');
        }
    }
    return this;
}

//触发点击事件
Base.prototype.click = function (fn) {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i].onclick = fn;
    }
    return this;
}

//对每个对象执行触发事件
Base.prototype.each = function(type,fn){
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i]['on' + type]= fn;
    }
    return this;
}