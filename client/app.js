//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    /**
     * 封装功能：弹框提示
     * 页面引入：var app = getApp();
     * 调用方法：app.point('提示信息','提示内容：success/none/loading','秒数');
     * 调用实例：app.point('添加成功','success',2000); // 秒数默认200
     */
    point: function (title_info, icon_info, time = 2000) {
      // 弹框
      wx.showToast({
        title: title_info,
        icon: icon_info,
        duration: time
      });
    },
    // wx.request() 封装函数
    post: function (urls, datas, func) {
      wx.request({
        url: urls,
        data: datas,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success: func
      });
    },
    // 弹框提示
    point: function (title_info, icon_info, time = 2000) {
      // 弹框
      wx.showToast({
        title: title_info,
        icon: icon_info,
        duration: time
      });
    },
    // 用户登录
    login_user:function()
    {
        setTimeout(function (res) {
            wx.removeStorageSync('token');
        }, 36000);
        wx.login({
            success: function (res) {
                wx.request({
                    url: config.service.cheshiUrl + res.code,
                    method: "post",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      wx.setStorageSync("token", res.data.retData.token);
                      console.log(res.data);
                    }
                })
            }
        })
    },
    // 用户登录检测
    login_add:function (number = 1) {
      var This = this;
      if (number == 1) {
        wx.removeStorageSync('token');
        number++;
      }
      This.login_user();
      setInterval(function () {
        if (wx.getStorageSync('token')) {
          return false;
        }
        This.login_user();
      }, 1000);
    },
})

// 用户登录信息
getApp().login_add();

