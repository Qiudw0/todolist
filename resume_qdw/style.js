/********************************************************************/
    /*                   author: qdw                             */
    /*                   time: 2015 - 05 - 14                    */
/********************************************************************/

// 设置各div的高度
$(function(){
    $('.info').css({"height":$(document).height()});
    perFunc();
});

// 添加click事件
$(function(){
    $('#navigation .menu span').each(function(){
        $(this).on('click', function(){
            var aimIndex = $(this).index();
            var curIndex;
            var aimId;

            activeSpan(aimIndex);  // 激活导航条

            $('.info').each(function(){ // 移除当前域的active标签
                if($(this).hasClass('active')){
                    curIndex = $(this).index(); // 记录当前域的标号
                    // 获取当前域域的id
                    //var curTarg = $(this).attr('id');  
                    $(this).removeClass('active');
                }
                // 查找目标域id
                if($(this).index() === aimIndex){
                    aimId = $(this).attr('id');
                }
            });  // $('.infop').each

            // 执行动画效果
            effect(aimId, curIndex);

            // 滚动到目标域
            $.scrollTo($('#' + aimId), 800,function(){
                $('#' + aimId).addClass('active');
            });
        }); // $(this).on
    });
});
        

// 激活导航条
function activeSpan(index){
    $('#navigation .menu span').each(function(){
        if($(this).index() == index){
            $(this).addClass('active_span')
        }else if($(this).hasClass('active_span')){
            $(this).removeClass('active_span');
        }
    });
}

// 鼠标滚轮
$(function(){
    var flag = true;
    function scrollFunc(e){
        var evn = e || window.event;  // 获取触发的实践对象
        evn.preventDefault(); // 阻止默认的滚动

        direct = evn.deltaY; // 向下为-1;向上为1
       if(flag){
            var num = 0;
            var target;
            var curTarg;
            $('.info').each(function(){ // 移除active标签
                if($(this).hasClass('active')){
                    num = $(this).index(); // 记录当前域的标号
                    // 获取当前域域的id
                    curTarg = $(this).attr('id');  
                    $(this).removeClass('active');
                }
            });  // $('.infop').each

            if(direct < 0 && num < $('.info').length - 1){  // 向下滚动
                target = $('#' + curTarg).next();  // 目标域在后一个
            }else if(direct > 0 && num > 0){
                target = $('#' + curTarg).prev();  // 目标域在前一个
            }else{
                target = $('#' + curTarg);
            }

            activeSpan(target.index());  // 获取目的域标号以激活导航条
            effect(target.attr('id'), num);

            $.scrollTo(target, 800, function(){ // 滚动到目标域并添加激活标签
                $(target).addClass('active');

                // 在scrollTo事件结束之后就会调用该函数，那么将flag设置为true，滑动鼠标所触发的时间就可以
                // 执行if里面的语句，实现滚动效果。
                flag = true;  // 这里可以阻止多次触发onmousewheel/DOMMouseScroll事件
                
            });//$.scrollTo

    // 用户滑动鼠标滚轮的时候可能会滑动多次，而没滚动移除滑轮就会触发一次onmousewheel事件；
    // 所以在scrollTo事件执行期间应该阻止触发此类事件，所以讲flag置为false。只要scrollTo事
    // 件还在执行，每次触发的鼠标事件都没法执行if语句里面的语句。
            flag = false;

       }// if(t == 1)
    } // scrollFunc

    // 绑定鼠标滚轮事件
    $(document).bind('mousewheel',scrollFunc);
});



function rotation(elem, Angle, speed){
    /*
    *@func: 将指定对象旋转至指定角度
    *@param: elem:被旋转的对象; Angle: 最终角度（符号表示方向）; speed: 速度
     */

    var curMatrix = elem.css('transform');
    var curSin = elem.css('transform').split(',')[1]; // 求出当前正弦值
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


function slideH(elem, type, initL, len, speed){
    /*
    *@func: 在指定时间内将指定对象横向移动指定距离
    *@param: elem: 被移动对象; type: left/marginLeft initL: 初始type值; 
    *len: 被移动距离; speed: 速度
     */
    var pos = initL + len; // 最终type值
    var curL = parseInt(elem.css(type));  // 获取当前的type值
    var step = len / speed;  // 计算步增值
    curL += step;
    if(step > 0){
        if(curL < pos){
            setTimeout("slideH($('#" + elem.attr('id') + "'), '" + type + "', " + initL + ", " + len +", " + speed + ")", 10);
        }else{
            curL = pos;
        }
    }else if(step < 0){
        if(curL > pos){
            setTimeout("slideH($('#" + elem.attr('id') + "'), '" + type + "', " + initL + ", " + len +", " + speed + ")", 10);
        }else{
            curL = pos;
        }
    }
    
    elem.css(type, curL);
}

function slideV(elem, type, initT, len, speed){
    /*
    *@func: 在指定时间内将指定对象纵向移动指定距离
    *@param: elem: 被移动对象; type:top/marginTop initT: 初始的type值; 
    *len: 被移动距离; speed: 速度
     */
    var pos = initT + len; // 最终type值
    var curT = parseInt(elem.css(type));  // 获取当前的type值
    var step = len / speed;
    curT += step;
    if(step > 0){
        if(curT < pos){
            setTimeout("slideV($('#" + elem.attr('id') + "'), '" + type + "', " + initT + ", " + len +", " + speed + ")", 10);
        }else{
            curT = pos;
        }
    }else{
        if(curT > pos){
            setTimeout("slideV($('#" + elem.attr('id') + "'), '" + type + "', " + initT + ", " + len +", " + speed + ")", 10);
        }else{
            curT = pos;
        }
    } 
    elem.css(type, curT);
}

function changeOpacity(elem, speed){
    /*
    *@func: 设置透明
    *@param: elem: 设置对象; speed: 动画速度:为正表示由透明转向不透明，为负责相反。
     */
    var curOpa = parseFloat(elem.css('opacity'));
    var step = (new Number(1 / speed)).toFixed(3);  // 取三位小数,该方法返回的是字符串
    curOpa += parseFloat(step); // 转化为浮点型数据
    
    if(step > 0){
        if(curOpa < 1){
            setTimeout("changeOpacity($('#" + elem.attr('id') + "'), " + speed + ")", 10);
        }else{
            curOpa = 1;
        }
    }else{
        if(curOpa > 0){
            setTimeout("changeOpacity($('#" + elem.attr('id') + "'), " + speed + ")", 10);
        }else{
            curOpa = 0;
        }
    }
//console.log('step=' + step + 'curOpa=' + curOpa);
    elem.css('opacity', parseFloat(curOpa.toFixed(3)));
}


// person域的动画效果
function perFunc(){
    $('#per_con').show(600);
    $('#per_p1').show(600); // 历时600ms
    window.setTimeout("$('#per_p2').show(600);",300); // 延迟300ms
    window.setTimeout("$('#per_p3').show(600);",700);
    rotation($('#per_con'), 18, 100);
}

// 恢复person域的初始状态
function resetPerFunc(){
    $('#per_con').hide(600);// 历时600ms
    $('#per_p1').hide(600); 
    $('#per_p2').hide(600);
    $('#per_p3').hide(600);
    $('#person #per_con').css({
        "-moz-transform":"rotate(0deg)",
        "-webkit-transform":"rotate(0deg)",
        "-ms-transform": "rotate(0deg)"
    });
}


// education
function eduFunc(){
    changeOpacity($('#edu_con'), 60);
    slideV($('#edu_con'), 'marginTop', -30, 120, 50);
    slideH($('#edu_p1'), 'marginLeft', 385, -110, 60);
    slideH($('#edu_p3'), 'marginLeft', 385, -60, 60);
    slideH($('#edu_p2'), 'marginLeft', -100, 150, 60);
    slideH($('#edu_p4'), 'marginLeft', -100, 150, 60);
}

function resetEduFunc(){
    changeOpacity($('#edu_con'), -30);
    slideV($('#edu_con'), 'marginTop', 90, -120, 20);
    slideH($('#edu_p1'), 'marginLeft', 275, 110, 30);
    slideH($('#edu_p3'), 'marginLeft', 325, 60, 30);
    slideH($('#edu_p2'), 'marginLeft', 50, -150, 30);
    slideH($('#edu_p4'), 'marginLeft', 50, -150, 30);
}


//program_experience
function expFunc(){
    $('#exp_p1').slideDown(1500);
    $('#exp_p2').slideDown(1500);
    $('#exp_img1').show(2000);
    rotation($('#exp_con'),-16, 100);
    changeOpacity($('#exp_con'),70);
}

function resetExpFunc(){
    $('#exp_p1').slideUp(800);
    $('#exp_p2').slideUp(800);
    $('#exp_img1').hide(800);
    $('#program_experience #exp_con').css({
        "-moz-transform":"rotate(0deg)",
        "-webkit-transform":"rotate(0deg)",
        "-ms-transform": "rotate(0deg)"
    });


    changeOpacity($('#exp_con'),-50);
}

//school_experience
function schFunc(){
    slideH($('#sch_con'), 'marginLeft', -100, 270, 80);
    changeOpacity($('#sch_con'), 100);
    $('#sch_img1').show(1000);
}

function resetSchFunc(){
    slideH($('#sch_con'), 'marginLeft', 170, -270, 30);
    changeOpacity($('#sch_con'), -20);
    $('#sch_img1').hide(800);
}

// skill_honor
function skiFunc(){
    slideH($('#ski_p1'), 'marginLeft', -100, 100, 300);
    slideH($('#ski_p2'), 'marginLeft', -60, 100, 100);
    changeOpacity($('#ski_img1'), 200);
    slideV($('#ski_con'), 'marginTop', 180, -120, 100);
    changeOpacity($('#ski_con'), 80);
}

function resetSkiFunc(){
    slideH($('#ski_p1'), 'marginLeft', 0, -100, 30);
    slideH($('#ski_p2'), 'marginLeft', 40, -100, 20);
    changeOpacity($('#ski_img1'), -20);
    slideV($('#ski_con'), 'marginTop', 60, 120, 20);
    changeOpacity($('#ski_con'), -30);
}


function effect(sFunc, index){
    /*
    *@func:为相关域设置效果
    *@param: sFunc: 目的域的id; index: 当前域序号
     */
     // 将当前域恢复为初始状态
     switch(index){
        case 0:{
            resetPerFunc();
            break;
        }
        case 1:{
            resetEduFunc();
            break;
        }
        case 2:{
            resetExpFunc();
            break;
        }
        case 3:{
            resetSchFunc();
            break;
        }
        case 4:{
            resetSkiFunc();
            break;
        }
        default: return;
     }
    // 设置目标域效果
    switch(sFunc){
        case 'person':{
            perFunc();
            break;
        }
        case 'education':{
            eduFunc();
            break;
        }
        case 'program_experience':{
            expFunc();
            break;
        }
        case 'school_experience':{
            schFunc();
            break;
        } 
        case 'skill_honor':{
            skiFunc();
            break;
        }
        default: return;
    }
}
