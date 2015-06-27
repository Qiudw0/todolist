/****************************************************/
/*     author:qdw       time: 2015-627              */
/****************************************************/
/**
 * 滚动式轮播效果
 * @param {string} idView [轮播视口容器的id]
 * @param {string} idPic  [存放图片的容器的id]
 */
function Carousel(idView,idPic){
    this.view = document.getElementById(idView);
    this.pics = document.getElementById(idPic);
    this.dur = 2000;

    var picsPar = this.pics.parentNode;

    //创建新的div容器存放图片
    var newPics = document.createElement('div');
    newPics.className = 'pics_area clearfix';
    newPics.innerHTML = this.pics.innerHTML;
    picsPar.appendChild(newPics);
}

Carousel.prototype.onFinished = function(){
    this.start();
}

Carousel.prototype.onProgress = function(){
    if(this.pics.offsetWidth-this.view.scrollLeft<=0){
        this.view.scrollLeft-=this.pics.offsetWidth;
    }
    else{
        this.view.scrollLeft++;
    }
}

Carousel.prototype.start = function() {
    this.p = 0;
    this.startTime = Date.now();

    var self = this;
    requestAnimationFrame(function f(){
        if(self.p > 1){
            self.view.onmouseout = function(){ // 鼠标离开时继续轮播
                self.onFinished();
            }
        }else{
            self.p = (Date.now() - self.startTime) / self.dur;
            if(self.p > 1) self.p = 1.0;
            self.onProgress();
            requestAnimationFrame(f);
        }
    });
    this.view.onmouseover = function(){ // 鼠标悬浮时停止滚动
        self.p = 2;
    }
};  
