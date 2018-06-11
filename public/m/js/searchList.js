var letao;
$(function () {
    // 实例化构造函数letao
    letao = new Letao();
    letao.initScroll();
    letao.initPullRefresh();
})

// 创建一个构造函数letao
var Letao = function () {

}
// 在这个构造函数的原型上添加内容
Letao.prototype = {

    // 初始化区域滚动
    initScroll: function () {
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },

    initPullRefresh:function () {
        mui.init({
          pullRefresh: {
            container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
              height: 50, //可选,默认50.触发下拉刷新拖动距离,
              auto: true, //可选,默认false.首次加载自动下拉刷新一次
              contentdown: "你确定要刷新吗", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
              contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
              contentrefresh: "正在刷新...请稍等", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
              callback: function() {
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                //  mui('.mui-scroll-wrapper').pullRefresh().endPulldown();
                //   mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              }
            }
          }
        });
    }
};

