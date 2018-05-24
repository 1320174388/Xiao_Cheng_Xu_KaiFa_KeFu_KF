//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var app = getApp();

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
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