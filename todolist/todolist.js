
// 定义show任务区的动画
function showForDate(elem){

  var anim = new Animation(elem, 1000); // 调用封装的对象

  anim.onProgress = function(p){
    var curMatrix = $(this.target).css('transform');
    var curOpac = parseFloat($(this.target).css('opacity'));

    var curSin = curMatrix.split(',')[1]; // 求出当前正弦值
    var curAngle = 180 * Math.asin(curSin) / Math.PI;  // 求出当前角度

    var nextAngle = curAngle + p / 3;
    var nextOpac = curOpac + 0.02 * p;

    if(nextAngle > 0) nextScale = 0;
    if(nextOpac > 1) nextOpac = 1;

    $(this.target).css('transform', "rotate(" + nextAngle + "deg)");
    $(this.target).css('opacity', nextOpac);

  } 
  anim.easing = function(p){
    return p;
  }
  anim.onFinished = function(){
    $(this.target).css('transform', "rotate(0deg)");
    $(this.target).css('opacity', 1);
  }
  
  anim.start();
}

// 定义show各任务的动画
function showForTask(elem){

  var anim = new Animation(elem, 1000); // 调用封装的对象

  anim.onProgress = function(p){
    var curMatrix = $(this.target).css('transform');
    var curOpac = parseFloat($(this.target).css('opacity'));

    // 获取当前在x轴方向的缩放值
    //var curScaleX = curMatrix.split(',')[0].slice(-1);
    //var curScaleY = curMatrix.split(',')[3]; // 获取当前在y轴方向的缩放值
    var nextScale = p;
    var nextOpac = curOpac + 0.02 * p;

    if(nextScale > 1) nextScale = 1;
    if(nextOpac > 1) nextOpac = 1;
    $(this.target).css('transform', "scale(" + nextScale + ")");
    $(this.target).css('opacity', nextOpac);

  } 
  anim.easing = function(p){
    return p;
  }
  anim.onFinished = function(){
    $(this.target).css('transform', "scale(1)");
    $(this.target).css('opacity', 1);
  }
  
  anim.start();
}

// 定义hide各任务的动画
function hideForTask(elem){

  var anim = new Animation(elem, 300); // 调用封装的对象

  anim.onProgress = function(p){
    var curMatrix = $(this.target).css('transform');
    var curOpac = parseFloat($(this.target).css('opacity'));

    // 获取当前在x轴方向的缩放值
    //var curScaleX = curMatrix.split(',')[0].slice(-1);
    var curScaleY = curMatrix.split(',')[3]; // 获取当前在y轴方向的缩放值
    var nextScale = curScaleY - p;
    var nextOpac = curOpac - 0.02 * p;
    
    if(nextScale < 0) nextScale = 0;
    if(nextOpac < 0) nextOpac = 0;
    $(this.target).css('transform', "scale(" + nextScale + ")");
    $(this.target).css('opacity', nextOpac);

  } 
  anim.easing = function(p){
    return p;
  }
  anim.onFinished = function(){
    $(this.target).css('transform', "scale(0)");
    $(this.target).css('opacity', 0);
    $(this.target).addClass('dn');
  }
  
  anim.start();
}

// 定义函数显示任务项
function viewTask(){
  var taskItems = task.gettaskItems();
  var delTaskItems = task.getdelTaskItems();
  var items = document.querySelectorAll('.items');
  var delItems = document.getElementById('delItems');

  for(var i = 0; i < taskItems.length; i++){

    var oDiv = document.createElement('div');
    $(oDiv).addClass('item');
    oDiv.setAttribute('value',i)

    // 标题
    var label_title = document.createElement('label');
    // $(label_title).addClass('titleitem');
    label_title.className = 'titleitem';
    var title = document.createTextNode(taskItems[i].getTitle());
    label_title.appendChild(title);

    // 时间
    var label_time = document.createElement('label');
    var deadLine = taskItems[i].getDeadLine();
    var day = new Date(deadLine).getDay();  // 获取星期
    label_time.className = 'time';
    var time = document.createTextNode(deadLine);
    label_time.appendChild(time);

    // 修改
    var label_modi = document.createElement('label');
    // $(label_modi).addClass('modi');
    label_modi.className = 'modi';
    var modi = document.createTextNode("修改");
    label_modi.appendChild(modi);

    // 删除
    var label_del = document.createElement('label');
    // $(label_del).addClass('del');
    label_del.className = 'del';
    var del = document.createTextNode("删除");
    label_del.appendChild(del);

    // 描述
    var desc = document.createElement('p');
    // $(desc).addClass('dn');
    desc.className = 'dn';
    // 内容
    var content = document.createTextNode(taskItems[i].getContent());
    desc.appendChild(content);

    oDiv.appendChild(label_title);
    oDiv.appendChild(label_time);
    oDiv.appendChild(label_del);
    oDiv.appendChild(label_modi);
    oDiv.appendChild(desc);
    
    for(var j = 0; j < items.length; j++){
      if(items[j].getAttribute('value') == day) break;
    }

    items[j].appendChild(oDiv);    
  }

  for(var i = 0; i < delTaskItems.length; i++){
      var li = document.createElement('li');
      var input = document.createElement('input');
      input.setAttribute('type','checkbox');
      input.setAttribute('checked','checked');
      var del_title = document.createTextNode(delTaskItems[i].getTitle());
      var span = document.createElement('span');
      var delspan = document.createTextNode('删除'); 

      span.appendChild(delspan);
      li.appendChild(input);
      li.appendChild(del_title);
      li.appendChild(span);

      delItems.appendChild(li);      
  }
} // viewTask()

// 删除已完成的任务
function delFinisedTask(){
  var ulObj = document.getElementById('delItems');
  var spanObj = ulObj.getElementsByTagName('span');
  for(var i = 0; i < spanObj.length; i++){
    $(spanObj[i]).click(function(){
      var index=null;
      var parent = this.parentNode;
      var lists = ulObj.getElementsByTagName('li');
      for(var j = 0; j < lists.length; j++){
        if(lists[j] === parent){
          index = j;
          break;
        }
      }
      if(index != null){
        task.delTaskCompletely(index);
        window.location = "todolist.html";
      }
    });
  } 
  
}

function init(){
  viewTask();
  delFinisedTask();

  // 任务添加区域的效果
  $().getId('add').click(function(){
      var addTask = document.getElementById('edit_task');
      addTask.classList.toggle('show_content');
  });
  $().getClass('modi').each('click',function(){
      var addTask = document.getElementById('edit_task');
      addTask.classList.toggle('show_content');
  });

  // 任务显示区域的效果
  $().getClass('dateitem').each('click',function(){
      var oDiv = this.nextSibling.nextSibling;
      if(hasClass(oDiv, 'dn')){ // 当前任务条目收起状态
          // 找到其下的显示三角图标的div结点（前一个结点）,改变三角形符号
          $(this.previousSibling).removeClass('r_sanjiao_icon').addClass('d_sanjiao_icon');
          
          // 找到其下的显示任务项目的div结点
          $(oDiv).removeClass('dn');

          showForDate(oDiv);
      }else{ // 当前任务条目展开状态
          $(this.previousSibling).removeClass('d_sanjiao_icon').addClass('r_sanjiao_icon'); // 改变三角形符号
          $(oDiv).addClass('dn');
          //还原-10度和透明的状态
          $(oDiv).css('transform','rotate(-10deg)');
          $(oDiv).css('opacity',0);
      }
      
  });

  // 每个任务的显示效果
  $().getClass('titleitem').each('click',function(){
      var oDiv = this.parentNode.getElementsByTagName('p')[0];
      if(hasClass(oDiv, 'dn')){ // 当前任务收起状态
          $(oDiv).removeClass('dn');
          showForTask(oDiv);
      }else{ // 当前任务展开状态
          hideForTask(oDiv);
      }
  });

  //删除功能
  $().getClass('del').each('click',function(){
    $(this.parentNode).css('display','none');
    var index = this.parentNode.getAttribute('value');  // 删除的任务标号
    task.deleteItem(index); // 保存cookie
    window.location = "todolist.html";
  });
    
}

addLoadEvent(init);