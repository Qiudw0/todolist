var runTasks = [];
var completeTasks = [];
function Clock(){
    var canvas;
    var context;
    var self = this;
    this.start = function(){
        canvas = document.getElementById("clock");
        context = canvas.getContext("2d");
        setInterval(function(){
            self.draw();
        },1000);
    }
    this.draw = function(){
        ///得到当前系统时间的：时、分、秒
        var now_date=new Date();
        var radius = Math.min(canvas.width/2,canvas.height/2),
           sec=now_date.getSeconds(),
           min=now_date.getMinutes(),
           hour=now_date.getHours();
           hour=hour>=12?hour-12:hour;

        //初始化画布
        context.save();
        context.clearRect(0,0,canvas.width,canvas.height);    
        context.translate(canvas.width/2,canvas.height/2);        
        context.scale(0.9,0.9);
        context.rotate(-Math.PI/2);
        context.save();

        //小时刻度
        context.strokeStyle="white";
        // context.fillStyle="white";
        context.lineWidth=2;
        context.lineCap="round";
        context.beginPath();
        for(var i=0;i<12;i++){
            context.rotate(Math.PI/6);
            context.moveTo(radius-30,0);
            context.lineTo(radius-10,0);
        }
        context.stroke();
        context.restore();
        context.save();

        //分钟刻度
        context.strokeStyle="white";
        context.lineWidth=1;
        context.beginPath();
        for(var i=0;i<60;i++){
        if(i%5!=0){
          context.moveTo(radius-15,0);
          context.lineTo(radius-10,0);
        }
        context.rotate(Math.PI/30);
        }
        context.stroke();
        context.restore();
        context.save();

        //画上时针
        context.rotate((Math.PI/6)*hour+(Math.PI/360)*min+(Math.PI/21600)*sec);
        context.strokeStyle="black";
        context.lineWidth=6;
        context.lineCap="butt";
        context.beginPath();
        context.moveTo(-10,0);
        context.lineTo(radius*0.4,0);
        context.stroke();
        context.restore();
        context.save();

        //分针
        context.rotate((Math.PI/30)*min+(Math.PI/1800)*sec);
        context.strokeStyle="#29A8DE";
        context.lineWidth=4;
        context.lineCap="butt";
        context.beginPath();
        context.moveTo(-20,0);
        context.lineTo(radius*0.5,0);
        context.stroke();
        context.restore();
        context.save();

        //秒针
        context.rotate(sec*Math.PI/30);
        context.strokeStyle="red";
        context.lineWidth=2;
        context.lineCap="butt";
        context.beginPath();
        context.moveTo(-30,0);
        context.lineTo(radius*0.9,0);
        context.stroke();
        context.restore();
        context.save();

        ///表框      
        context.lineWidth=2;
        context.strokeStyle="white";
        context.beginPath();
        context.arc(0,0,radius,0,Math.PI*2,true);
        context.stroke();
        context.restore();
        context.restore();
    }
}

function setDate(){
    var now = new Date();
    var date = now.getDate();  // 日
    var month = now.getMonth() +1;  // 月
    var year = now.getFullYear();  // 年
    var day = now.getDay();  // 星期

    $('#year').text(year);
    $('#month').text(month);
    $('#date').text(date);
    switch(day){
        case 0:{
            $('#day').text('星期日');
            break;
        }
        case 1:{
            $('#day').text('星期一');
            break;
        }
        case 2:{
            $('#day').text('星期二');
            break;
        }
        case 3:{
            $('#day').text('星期三');
            break;
        }
        case 4:{
            $('#day').text('星期四');
            break;
        }
        case 5:{
            $('#day').text('星期五');
            break;
        }
        case 6:{
            $('#day').text('星期六');
            break;
        }
        default:$('#day').hide();
    }
}
function createRunTask(){
    var time = $('#input-date').val();
    var text = $('#text-area').val();
    var taskItem =runTasks.length+'|'+text+'|'+time;
    var str = "<div class='new-run-record run-record clearfix'><div class='time-area'><span class='time'>"+time+"</span><span class='star glyphicon glyphicon-star-empty'></span></div><div class='record clearfix'><span class='line'></span><div class='record-text text-justify'>"+text+"</div><span class='icon ok glyphicon glyphicon-ok' title='完成' value='"+runTasks.length+"'></span><span class='icon remove glyphicon glyphicon-remove' title='移除' value='"+runTasks.length+"'></span></div></div>" ;
    $('#new-run-task').append(str);

    $("div[class*='-record']").mouseenter(function(){
        $(this).find('.icon').show();
    });
    $("div[class*='-record']").mouseleave(function(){
        $(this).find('.icon').hide();
    });

    var _this = $('#runTitle');
    $('#runing .time').each(function(){
        if(time >= $(this).text()){
            _this = $(this).parent().parent();
        }
    });
    $('#new-run-task').children().eq(0).insertAfter(_this);
    $('#no-run').hide();
    completeTask();
    removeRunTask();
    runTasks.push(taskItem);
    runTasks.sort(function(a,b){ // 按时间先后排序
        return a.split('|')[2] > b.split('|')[2];
    });
    localStorage.runtodo = runTasks;
    $('#new-run-task').html('');
}

function setRunTask(){
    var str = '';
    if(runTasks.length > 0){
        for(var i = 0; i < runTasks.length; i++){
            var taskItem = runTasks[i].split('|');
            str += "<div class='run-record clearfix'><div class='time-area'><span class='time'>"+taskItem[2]+"</span><span class='star glyphicon glyphicon-star-empty'></span></div><div class='record clearfix'><span class='line'></span><div class='record-text text-justify'>"+taskItem[1]+"</div><span class='icon ok glyphicon glyphicon-ok' title='完成' value='"+taskItem[0]+"'></span><span class='icon remove glyphicon glyphicon-remove' title='移除' value='"+taskItem[0]+"'></span></div></div>";
        }
    }else{
        str = "<p id='no-run' class='text-center' style='padding:10px'>您还有任务(⊙o⊙)哦，赶紧添加吧~</p>";
    }
    $('#runing').append(str);

    $("div[class*='-record']").mouseenter(function(){
        $(this).find('.icon').show();
    });
    $("div[class*='-record']").mouseleave(function(){
        $(this).find('.icon').hide();
    });
    removeRunTask();
}

function removeRunTask(){
    $("span[class*='remove']").click(function(){
        var id = $(this).attr('value');
        var _this = $(this).parent().parent();
        var flag = confirm("主公，斩首否？");
        if(flag){
            for(var i = 0; i < runTasks.length; i++){
                if(runTasks[i].split('|')[0]==id){
                    runTasks.splice(i,1);
                    break;
                }
            }
            localStorage.runtodo = runTasks;
            _this.addClass('remove-run-record');
            setTimeout(function(){
                _this.remove();
                if($("#runing").children().length == 1){
                    $('#runing').append("<p id='no-run' class='text-center' style='padding:10px'>您还有任务(⊙o⊙)哦，赶紧添加吧~</p>");
                }
            },2000);
        }
    });
}

function completeTask(){
    $("span[class*='ok']").click(function(){
        var _that = $(this);
        var id = $(this).attr('value');
        var time = $(this).parent().parent().find('.time').text();
        var text = $(this).parent().find("div[class^='record-text']").text();
        var completeTaskItem = text+'|'+time;
        $(this).parent().parent().animate({
            opacity:0,
            height:'0'
        },1000,function(){
            _that.parent().parent().hide();
            createCompleteTask(id,text);
        });
        for(var i = 0; i < runTasks.length; i++){
            if(runTasks[i].split('|')[0]==id){
                runTasks.splice(i,1);
                break;
            }
        }
        localStorage.runtodo = runTasks;
    });
}

function createCompleteTask(id,text){
    var now = new Date();
    var date = now.getDate().toString();  // 日
    date = date.length > 1 ? date : '0'+date;
    var month = (now.getMonth() +1).toString();  // 月
    month = month.length > 1 ? month : '0'+month;
    var year = now.getFullYear();  // 年
    var time = year+'/'+month+'/'+date;
    var comTaskItem = id+'|'+text+'|'+time;

    var str = "<div class='new-com-record run-record clearfix'><div class='time-area'><span class='time'>"+time+"</span><span class='star glyphicon glyphicon-star-empty'></span></div><div class='record clearfix'><span class='line'></span><div class='record-text text-justify'>"+text+"</div><span class='icon delete glyphicon glyphicon-trash' title='删除' value='"+id+"'></span></div></div>" ;
    $('#new-com-task').append(str);

    var _this = $('#completeTitle');
    $('#new-com-task').children().eq(0).insertAfter(_this);
    $('#no-com').hide();
    deleteCompleteTask();

    $("div[class*='-record']").mouseenter(function(){
        $(this).find('.icon').show();
    });
    $("div[class*='-record']").mouseleave(function(){
        $(this).find('.icon').hide();
    });

    completeTasks.push(comTaskItem);
    localStorage.comtodo = completeTasks;
}

function deleteCompleteTask(){
    $("span[class*='delete']").click(function(){
        var id = $(this).attr('value');
        var _this = $(this).parent().parent();
        var flag = confirm("主公，斩首否？");
        if(flag){
            for(var i = 0; i < completeTasks.length; i++){
                if(completeTasks[i].split('|')[0]==id){
                    completeTasks.splice(i,1);
                    break;
                }
            }
            localStorage.comtodo = completeTasks;
            _this.addClass('remove-com-record');
            setTimeout(function(){
                _this.remove();
                if($("#completed").children().length == 1){
                    $('#completed').append("<p id='no-com' class='text-center' style='padding:10px'>您还有完成的任务(⊙o⊙)哦，加油吧~</p>");
                }
            },2000);
        }
    });
}

function setCompleteTask(){
    var str = '';
    if(completeTasks.length > 0){
        for(var i = 0; i < completeTasks.length; i++){
            var comTaskItem = completeTasks[i].split('|');
            str += "<div class='com-record clearfix'><div class='time-area'><span class='time'>"+comTaskItem[2]+"</span><span class='star glyphicon glyphicon-star'></span></div><div class='record clearfix'><span class='line'></span><div class='record-text text-justify'>"+comTaskItem[1]+"</div><span class='icon delete glyphicon glyphicon-trash' title='删除' value='"+comTaskItem[0]+"'></span></div></div>";
        }
    }else{
        str = "<p id='no-com' class='text-center' style='padding:10px'>您还有完成的任务(⊙o⊙)哦，加油吧~</p>"
    }
    $('#completed').append(str);
    $("div[class*='-record']").mouseenter(function(){
        $(this).find('.icon').show();
    });
    $("div[class*='-record']").mouseleave(function(){
        $(this).find('.icon').hide();
    });
    deleteCompleteTask();
}

function init(){
    $('#text-area').val("Why not write something...").select().focus();
    var now = new Date();
    var date = now.getDate().toString();  // 日
    date = date.length > 1 ? date : '0'+date;
    var month = (now.getMonth() +1).toString();  // 月
    month = month.length > 1 ? month : '0'+month;
    var year = now.getFullYear();  // 年
    var dateStr = year+'-'+month+'-'+date;
    $('#input-date').val(dateStr);

    // 初始化任务数组
    if(localStorage.runtodo != undefined && localStorage.runtodo !=''){
        var tasks = localStorage.runtodo.split(',');
        for(var i = 0; i < tasks.length; i++){
            var taskItem = tasks[i].split('|');
            runTasks.push(taskItem[0]+'|'+taskItem[1]+'|'+taskItem[2]);
        }
    }
    if(localStorage.comtodo != undefined && localStorage.comtodo !=''){
        var comTasks = localStorage.comtodo.split(',');
        for(var i = 0; i < comTasks.length; i++){
            var comTaskItem = comTasks[i].split('|');
            completeTasks.push(comTaskItem[0]+'|'+comTaskItem[1]+'|'+comTaskItem[2]);
        }
    } 
}

$(function(){
    init();
    setDate();
    setRunTask();
    setCompleteTask();
    var clock = new Clock();
    clock.start();

    $('#text-area').keyup(function(event){
        var evt = event || window.event;
        if(evt.keyCode == 13){
            var flag = confirm("确定输入完毕？");
            if(flag){
                createRunTask();
            }
        }
    });

    completeTask();
})