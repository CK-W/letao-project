var letao;
$(function () {
    // 实例化乐淘对象
    letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.clearHistory();
    letao.deleteHistory();
    
});
// 创建Letao的构造函数
var Letao = function () {

}
Letao.prototype = {
  //添加历史记录========================
  addHistory: function() {
    $(".btn-search").on("click", function() {
      //   1、获取搜索框里面的值
      var search = $(".sh-search input").val();
      // console.log(search);
      // 1、判断搜索框里的值是否为空
      if (!search.trim()) {
        // trim(),去除字符串的空格
        //进入这里，说明为空
        alert("请输入要搜索的商品");
        return;
      }
      //   2、获取本地已经存储的值
      var arr = window.localStorage.getItem("searchData");
      // 声明id（为单个删除做准备）
      var id = 0;
      // 判断单前的值是否有值
      if (arr && JSON.parse(arr).length > 0) {
        //  3、把json字符串转成数组JSON.parse(); 为什么要转成数组呢？
        // 判断字符串是否有值并且转换成数组之后的长度是否大于0（因为空数组是不为0的）
        //有值，转成数组
        arr = JSON.parse(arr);
        // id为arr数组的最后一个值(对象点)
        id = arr[arr.length - 1].id + 1;
      } else {
        arr = [];
        id = 0;
      }

      var flag = false;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].search == search) {
          flag = true;
        }
      }
      if (flag == false) {
        // 把文本框里面的值添加到本地存储中
        arr.push({
          search: search,
          id: id
        });
      }
      //   4、数组转为json字符串存储到本地中JSON.stringify
      window.localStorage.setItem("searchData", JSON.stringify(arr));

      letao.queryHistory();
    });
  },

  // 本地保存到此结束，接下来是渲染数据

  // 渲染本地保存的数据=================================
  queryHistory: function() {
    // 1、获取本地存储的数据
    var arr = window.localStorage.getItem("searchData");
    
    // 判断一个arr的值是否为空
    if (arr && JSON.parse(arr).length > 0) {
      // arr 不为空
      // 转成数组
      arr = JSON.parse(arr);
      // 最后一个值的id
      id = arr[arr.length - 1].id + 1;
    } else {
      // arr为空
      arr = [];
      id = 0;
    }
    //点到数组的顺序
    arr = arr.reverse(); 
    // 2、调用模板生成的数据渲染到页面上
    var html = template("searchListTmp", { rows: arr });
    // console.log(html);
    // 渲染到页面上
    $(".bottom").html(html);
  },

 

  // 清空本地记录
  clearHistory: function() {
    $(".sh-history .top a").click(function() {
      // 把本地存储设置为空
      window.localStorage.setItem("searchData", "");
      // 调用渲染
      letao.queryHistory();
    });
  },

  // 单个删除
  deleteHistory: function () {
    // 注册点击事件
    $(".sh-history .bottom").on("click", ".btn-delete", function () {
      // 1、获取单前按钮的id
      // var id = $(this).data('id');
      var id = $(this).data("id");
      // console.log(id);

      // 2、获取本地存储的值
      var arr = window.localStorage.getItem('searchData');
      // 这个判断似乎是必须的
      if (arr && JSON.parse(arr).length > 0) {
        // 有值 就把值通过JSON.parse(arr)把JSON字符串转成数组
        arr = JSON.parse(arr);
      } else {
        //如果没有值就赋值为空数组
        arr = [];
      }

      // 3、遍历本地存储的值，判断值的id是否与单前的id相等，
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
          // 4、相等就删除就删除项目 splice();
          arr.splice(i, 1);
        }
      }
      // 5、重新设置一下arr的值
      window.localStorage.setItem('searchData', JSON.stringify(arr));
      // // 5、调用方法重新渲染数据
      letao.queryHistory();
    });
  },

};