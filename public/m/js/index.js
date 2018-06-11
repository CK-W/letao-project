$(function () {
  // 实例化构造函数letao
  var letao =new Letao();
  // 调用乐淘对象的属性
  letao.initSlide();
  letao.initScroll();
})

// 创建一个构造函数letao
var Letao = function () {
  
}
// 在这个构造函数的原型上添加内容
Letao.prototype = {
  // 初始化轮播图
  initSlide: function() {
    var gallery = mui(".mui-slider");
    gallery.slider({
      interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
  },

  // 初始化区域滚动
  initScroll: function() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};

