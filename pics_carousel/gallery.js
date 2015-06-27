/****************************************************/
/*     author:qdw       time: 2015-627              */
/****************************************************/
/**
 * 轮播显示图片库
 * @param {string} galleryId [存放图片的容器的id]
 * @param {[string]} imgId     [展示目标图片的容器的id]
 */
function GalleryShow(galleryId,imgId){
    this.gallery = document.getElementById(galleryId);
    this.img = document.getElementById(imgId);
    this.pics = this.gallery.getElementsByTagName('img');
    this.num = this.pics.length;
    this.dur = 2000;
}

GalleryShow.prototype.mouseHover = function(which){
    this.img.setAttribute('src',which.src);
    this.img.setAttribute('alt',which.getAttribute('alt'))
}

// 触发轮播功能
GalleryShow.prototype.start = function(){
    this.p = 0;
    this.startTime = Date.now();
    this.flag = true;

    var self = this;   

    requestAnimationFrame(function f(){
        self.p = parseInt((Date.now() - self.startTime) / self.dur);
        for(var i = 0; i < self.num; i++){
            self.pics[i].onmouseover = function(){
                self.flag = false; // 轮播的开关
                return self.mouseHover(this);
            }
            self.pics[i].onmouseout = function(){
                self.flag = true;
            }
        }
        if(self.flag){
            if(self.p == self.num){
                self.start();
            }else{
                self.mouseHover(self.pics[self.p]);
            }
        }
        requestAnimationFrame(f);
    });
}