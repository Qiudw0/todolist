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

//跨浏览器获取Style
function getStyle(element, attr) {
    if (typeof window.getComputedStyle != 'undefined') {//W3C
        return window.getComputedStyle(element, null)[attr];
    } else if (typeof element.currentStyle != 'undeinfed') {//IE
        return element.currentStyle[attr];
    }
}


function rotation(elem, Angle, speed){
    /*
    *@func: 将指定对象旋转至指定角度
    *@param: elem:被旋转的对象; Angle: 最终角度（符号表示方向）; speed: 速度
     */

    var curMatrix = $(elem).css('transform');
    var curSin = curMatrix.split(',')[1]; // 求出当前正弦值
    var curAngle = 180 * Math.asin(curSin) / Math.PI;  // 求出当前角度
    if(Angle >= 0){
        curAngle++;
        if(curAngle < Angle){// 未达到指定角度
            setTimeout("rotation($('#" + elem.attr('id') + "'), " + Angle + ", " + speed + ")", 50);  // 周期性执行
        }else{
            curAngle = Angle;
        }
    }else if(Angle < 0){
        curAngle--;
        if(curAngle > Angle){// 未达到指定角度
            setTimeout("rotation($('#" + elem.attr('id') + "'), " + Angle + ", " + speed + ")", 50);  // 周期性执行
        }else{
            curAngle = Angle;
        }
    }
    
    elem.css({ // 设置旋转角度
        "-moz-transform":"rotate(" + curAngle + "deg)",
        "-webkit-transform":"rotate(" + curAngle + "deg)",
        "-ms-transform": "rotate(" + curAngle + "deg)"
    });
}

function setCookie(inName, inValue, inExpiry){
    /*
    *功能：创建一个cookie并将其保存在客户端
    *参数：inName:cookie的名字；inValue:cookie的值；inExpiry:cookie的有效时间
    */
// console.log('inValue='+inValue);
    if(inExpiry instanceof Date){ // 如果是Date对象，将其转换为GMT日期格式的字符串
        inExpiry = inExpiry.toGMTString(); // 格林威治时间格式
    }
    // escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串(同：decodeURI())
    document.cookie = inName + "=" + escape(inValue) + "; expires=" + inExpiry;
} // end setCookie()


function getCookie(inName){
    /*
    *功能：获取指定的cookie的值
    *参数：inName:传入的cookie名称
    *返回：查找成功返回cookie值；否则返回空
    */

    var docCookies = document.cookie;
    var cIndex = docCookies.indexOf(inName + "="); // 查找
    if(cIndex == -1) return null;
    cIndex = docCookies.indexOf("=",cIndex) + 1; // cookie的值在"="与";"之间
    var endStr = docCookies.indexOf(";", cIndex);
    if(endStr == -1) endStr = docCookies.length;
    // unescape() 函数可对通过 escape() 编码的字符串进行解码（同：decodeURIComponent()）
    return unescape(docCookies.substring(cIndex, endStr));

} // end getCookie()


function deleteCookie(inName){
    /*
    *功能：删除指定的cookie
    *参数：inName:要删除的cookie名
    */

    if(this.getCookie(inName)){
        this.setCookie(inName, null, "Thu, 01-Jan-1970 00:00:01 GMT");
    }
} // end deleteCookie()


function getParameter(inParaName){
    /*
    *功能：使用一个传入页面的参数
    *参数：inParaName:传入的要查找的参数
    */

    var retVal = null;
    var varvals = decodeURI(location.search.substring(1)); // 获取查询字符串的引用方法
    if(varvals){
        var search_array = varvals.split("&"); // 用"&"将字符串varvals分开形成数组
        var temp_array = new Array();
        var i = 0;
        var j = 0;
        for(i = 0; i < search_array.length; i++){
            temp_array = search_array[i].split("="); // 将每一个元素（形式为：name=value）进一步用"="分开
            var pName = temp_array[0];
            var pVal = temp_array[1];
            if(inParaName == null){ // 传入的参数为空，则返回数组
                if(retVal == null) retVal = new Array();
                retVal[j] = pName;
                retVal[j+1] = pVal;
                j += 2;
            }else{
                if (pName == inParaName) {
                    retVal = pVal;
                    break;
                };
            }
        } // for
    } // if
    return retVal;
} // end getParameter()