/**
 * 该类表示任务集中的一项任务
 */
function TaskItem() {


  /**
   * The title of the item.
   */
  var title = "";


  /**
   * The deadline of the item in the task.
   */
  var deadLine = "";

  /**
   * The content of the item in the task.
   */
  var content = "";

  /**
   * Setter.
   *
   * @param inTitle New value.
   */
  this.setTitle = function(inTitle) {

    title = inTitle;

  } // End setTitle().


  /**
   * Getter.
   *
   * @return The current value of the title.
   */
  this.getTitle = function() {

    return title;

  } // End getTitle().


  this.setDeadLine = function(inDeadLine) {

    deadLine = inDeadLine;

  } // End setDeadLine().

  this.getDeadLine = function() {

    return deadLine;

  } // End getDeadLine().


  this.setContent = function(inContent){
    content = inContent;
  } // End setContent()

  this.getContent = function(){
    return content;
  } // End getContent()

  /**
   * 返回一条用于存入Cookie的任务记录字符串
   * 形式为：title~deadLine~content
   */
  this.serialize = function() {

    return title + "~" + deadLine + "~" + content;
  } // End serialize().


  /**
   * 重写toString()方法
   *
   * @return A meaningful string representation of the object.
   */
  this.toString = function() {

    return "TaskItem : [ " +
      "title='" + title + "', " +
      "deadLine='" + deadLine + "'," +
      "content='" + content + "' ]";

  } // End toString().


} // End TaskItem class.
