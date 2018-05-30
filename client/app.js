//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');
var app = getApp();

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
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
    }
})

login_add();
// 用户登录信息
function login_add(number = 1) {
  if (number == 1) {
    wx.removeStorageSync('token');
    number++;
  }
  setInterval(function () {
    var userName = '未授权昵称';
    var avatarUrl = '';
    if (wx.getStorageSync('token')) {
      return false;
    }
    setTimeout(function (res) {
      wx.removeStorageSync('token');
    }, 3600000);
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          // 查看是否授权
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res) {
                    userName = res.userInfo.nickName;
                    avatarUrl = res.userInfo.avatarUrl;
                    wx.request({
                      url: config.service.cheshiUrl,
                      data: {
                        code: code,
                        userName: userName,
                        avatarUrl: avatarUrl
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      method: 'post',
                      success: function (res) {
                        if (res.data.errNum == 0) {
                          console.log(res.data);
                          wx.setStorageSync('token', res.data.retData.token);
                          wx.request({
                            url: config.service.IsAdmin,
                            data: {
                              'token': wx.getStorageSync('token')
                            },
                            header: {
                              'content-type': 'application/x-www-form-urlencoded'
                            },
                            method: 'post',
                            success: function (res) {
                              if (res.data.errNum == 0) {
                                wx.setStorageSync('IsAdmin', res.data.retMsg);
                              }
                            }
                          });
                        } else {
                          console.log(res.data);
                        }
                      }
                    });
                  }
                })
              }
            }
          })
        } else {
          console.log('登录失败' + res.errMsg);
        };
      }
    });
  }, 1000);
};