/*定义加载页面时调用positionMessage()函数的函数*/
function addLoadEvent(func){
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