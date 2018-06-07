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
    login_add:function (number = 1) {
      var This = this;
      if (number == 1) {
        wx.removeStorageSync('token');
        number++;
      }
      setInterval(function () {
        var userName = '未授权用户';
        var avatarUrl = '';
        if (wx.getStorageSync('token')) {
          return false;
        }
        setTimeout(function (res) {
          wx.removeStorageSync('token');
        }, 36000);
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
                                    wx.setStorageSync('IsAdmin', 'true');
                                  } else {
                                    wx.removeStorageSync('IsAdmin');
                                  }
                                }
                              });
                            }
                          }
                        });
                      }
                    })
                  } else {
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
                                wx.setStorageSync('IsAdmin', 'true');
                              } else {
                                wx.removeStorageSync('IsAdmin');
                              }
                            }
                          });
                        }
                      }
                    });
                  }
                }
              })
            } else {
              console.log('登录失败' + res.errMsg);
            };
          }
        });
      }, 1000);
    },
})

// 用户登录信息
getApp().login_add();

setInterval(new_number, 2000);
// 获取最新消息数量
function new_number() {
  if (!wx.getStorageSync('token')) {
    return false;
  }
  wx.request({
    url: config.service.Service_Session_Number,
    data: {
      'token': wx.getStorageSync('token')
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function (res) {
      if (res.data.errNum == 0) {
        wx.setStorageSync('session_new_number', res.data.retData);
      }
    }
  });
}
