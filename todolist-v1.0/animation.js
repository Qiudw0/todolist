function Animation(target, dur){
  this.target = target;
  this.dur = dur;
  this.easing = function(p){return p};
}

Animation.prototype.onFinished = function(){
  //add animation you want...
}

Animation.prototype.onProgress = function(p){
  //add animation you want...
}

Animation.prototype.start = function(){
  this.p = 0;
  this.startTime = Date.now();

  var self = this;
  requestAnimationFrame(function f(){
    if(self.p >= 1){
      self.onProgress(self.easing(1.0));
      self.onFinished();
    }else{
      self.p = (Date.now() - self.startTime) / self.dur;
      self.onProgress(self.easing(self.p));
      requestAnimationFrame(f);
    }
  });  
}
