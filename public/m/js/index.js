//获得slider插件对象
var gallery = mui(".mui-slider");
gallery.slider({
  interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
});

var sildes = document.querySelectorAll(".mui-indicator");
for(var i =0;i<sildes.length;i++){
    sildes[i].style.width = 15+"px";
    sildes[i].style.height = 15+"px";
}
