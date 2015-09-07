/**
 * 该类代表一个任务
 */

function Task() {


  /**
   * 当前的任务列表集
   */
  var taskItems = new Array();

  var delTaskItems = new Array();  // 存储被删除的任务


  /**
   * 用于标记是否为ie浏览器
   */
  var isIE = window.ActiveXObject ? true : false;


  /**
   * 获取所有的任务项
   */
  var taskCookie = getCookie("task");
  if (taskCookie) {
    var itemsInTask = taskCookie.split("~~");
    for (var i = 0; i < itemsInTask.length; i++) {// 遍历任务集
      var nextItem = itemsInTask[i];
      var nextItemTitle = nextItem.split("~")[0]; // 获取标题
      var nextItemDeadLine = nextItem.split("~")[1]; // 获取截止时间
      var nextItemContent = nextItem.split("~")[2]; // 获取内容
      var taskItem = new TaskItem();
      taskItem.setTitle(nextItemTitle);
      taskItem.setDeadLine(nextItemDeadLine);
      taskItem.setContent(nextItemContent);
      taskItems.push(taskItem); // 存储至任务集合中
    }
  }

  /**
   * 获取所有的被删除的任务项
   */
  var delTaskCookie = getCookie("complete");
  if (delTaskCookie) {
    var itemsInDelTask = delTaskCookie.split("~~");
    for (var i = 0; i < itemsInDelTask.length; i++) {// 遍历任务集
      var del_nextItem = itemsInDelTask[i];
      var del_nextItemTitle = del_nextItem.split("~")[0]; // 获取标题
      var del_nextItemDeadLine = del_nextItem.split("~")[1]; // 获取截止时间
      var del_nextItemContent = del_nextItem.split("~")[2]; // 获取内容
      var del_taskItem = new TaskItem();
      del_taskItem.setTitle(del_nextItemTitle);
      del_taskItem.setDeadLine(del_nextItemDeadLine);
      del_taskItem.setContent(del_nextItemContent);
      delTaskItems.push(del_taskItem); // 存储至任务集合中
    }
  }


  /**
   * 获取任务列表集合
   *
   * @return An array of CartItem objects.
   */
  this.gettaskItems = function() {
    return taskItems;

  } // End gettaskItems().

  this.getdelTaskItems = function() {
    return delTaskItems;

  } // End getdelTaskItems().


  /**
   * 向任务列表集合中添加一条任务项
   *
   * @param inItemToAdd The TaskItem to add.(参数类型是TaskItem)
   */
  this.addItem = function(inItemToAdd) {
    taskItems.push(inItemToAdd);
    saveTask();
    //saveTaskItem(taskItems[taskItems.length-1]);

  } // End gettaskItems().


  /**
   * 在任务列表集合中删除指定的任务项
   *
   * @param inItemIndex:被移除任务项的位置.
   */
  this.deleteItem = function(inItemIndex) {
    var delItem = taskItems.splice(inItemIndex, 1); //移除数量为1,返回的是一个数组
    this.saveDelItemTask(delItem[0]);
    saveTask();

  } // End deleteItem().

  this.delTaskCompletely = function(inIndex){
    delTaskItems.splice(inIndex, 1); //移除数量为1,返回的是一个数组
    saveDelTask();
  }


  /**
   * 修改任务标题.
   *
   * @param inItemIndex   The index in the taskItems array to remove.
   * @param inNewQuantity The new quantity of the item.
   */
  this.updateTitle = function(inItemIndex, inNewTitle) {

    var taskItem = taskItems[inItemIndex];
    taskItem.setTitle(inNewTitle);
    saveTask();

  } // End updateTitle().

  /**
   * 修改截止时间
   */
  this.updateDeadline = function(inItemIndex, inNewDeadline) {

    var taskItem = taskItems[inItemIndex];
    taskItem.setDeadline(inNewDeadline);
    saveTask();

  } // End updateTitle().

  /**
   * 修改内容
   */
  this.updateContent = function(inItemIndex, inNewContent) {

    var taskItem = taskItems[inItemIndex];
    taskItem.setContent(inNewContent);
    saveTask();

  } // End updateTitle().

  this.saveDelItemTask = function(indelItem){
    delTaskItems.push(indelItem);
    saveDelTask();
  }


  /**
   * Saves the task as a cookie.
   */
 var saveTask = function() {
    var cookieTask = "";
    for (var i = 0; i < taskItems.length; i++) {
      nextItem = taskItems[i];
      if (cookieTask != "") {
        cookieTask += "~~";
      }
      cookieTask += nextItem.serialize(); // serialize()方法用于构成一条特定形式的字符串

    }
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate()+7)
    // 存储到cookie
    setCookie("task", cookieTask, expireDate);

  } // End saveTask().

  var saveDelTask = function() {
    // 将被删除的任务集存储到cookie
    var cookieTask = "";
    for (var i = 0; i < delTaskItems.length; i++) {
      nextItem = delTaskItems[i];
      if (cookieTask != "") {
        cookieTask += "~~";
      }
      cookieTask += nextItem.serialize(); // serialize()方法用于构成一条特定形式的字符串

      //setCookie("task_"+ i, nextItem.serialize(), expireDate);
    }
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate()+7)
    // 存储到cookie
    setCookie("complete", cookieTask, expireDate);

  } // End saveTask().


  /**
   * Saves the taskItem as a cookie.
   */
 var saveTaskItem = function(inTaskItem) {

    var cookieTask = inTaskItem.serialize(); // serialize();
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate()+7);
    // 存储到cookie
    setCookie("task_"+ taskItems.length, cookieTask, expireDate);
  } // End saveTask().



} // End Cart class.


// 实例化一个task对象
var task = new Task();