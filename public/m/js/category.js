$(function () {
    // 实例化乐淘对象
    var letao = new Letao();
    letao.initScroll();
    letao.getCategoryLeft();
    letao.getCategoryRight();
});
// 创建Letao的构造函数
var Letao = function () {
    
}
Letao.prototype = {
    // 初始化区域滚动
    initScroll: function () {
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    // 左侧ajax请求
  getCategoryLeft:function () { 
    //   ajax请求
    $.ajax({
        url: "/category/queryTopCategory",
        success:function (backdata) {
            // console.log(backdata);
            
            var html = template("categoryLeftTmp", backdata);
            // 渲染
            $('.left ul').html(html);
        }
    });
  },
    //右侧ajax请求
    getCategoryRight:function () {
        //一开始进来的时候未点击事件，所以直接把他的id设为1,让他有值
        getRightData(1); //调用
        $('.left ul').on('click','a',function (e) {
            $(e.target.parentNode).addClass('active').siblings().removeClass('active');
            //获取到点击的目标的id
            var id = e.target.dataset['id'];
            getRightData(id)
        });

        // 封装右侧数据
        function getRightData(id) {
            $.ajax({
                url: '/category/querySecondCategory',
                data:{id:id},
                success:function (backdata) {
                    // console.log(backdata);
                    var html = template("categoryRightTmp", backdata);
                    if (html) {
                        $('.right .mui-row').html(html);
                    }else{
                        $('.right .mui-row').html('<h6>再下实在给不更多了</h6>');
                    }
                }
            });
        }
    }

  
};