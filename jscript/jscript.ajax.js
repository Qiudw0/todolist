//构建jscript.ajax包,
//该ajax包中包含的功能函数有：

if (typeof jscript == 'undefined') {
  jscript = function() { }
}

jscript.ajax = function() { }

jscript.ajax.createXHR = function(){
    /*
    *@func: 跨浏览器创建XMLHttpRequest对象
    *@return: 返回一个XMLHttpRequest对象
    */
    if (typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != 'undefined') {  // IE6.0-
        var version = [
            'MSXML2.XMLHttp.6.0',
            'MSXML2.XMLHttp.3.0',
            'MSXML2.XMLHttp'
        ];

        for(var i = 0; i < version.length; i++){
            try{
                return new ActiveXObject(version[i]);
            }catch(e){
                // 跳过
            }
        }  // for
    }else{
        throw new Error('您的系统或浏览器不支持XHR对象！');
    }
} // end createXRH()

jscript.ajax.encodeNameAndValue = function(sName, sValue){
    /*
    *@func: 对于get请求或post请求组装的数据进行编码转换以避免丢失数据
    *@param: sName: 传送的数据名称；sValue: 数据值
    *@param: 返回一个组装(两个参数之间的组装)并且编码转换后的字符串
    */
    var  sParam = encodeURIComponent(sName);
    sParam += "=";
    sParam += encodeURIComponent(sValue);
    return sParam;
}







