// pages/ProductPresentation/index.js
var config = require('../../config.js');
var navigateTo_type = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config_imgUrl: config.imgUrl,
    picture:[
      config.imgUrl +'WechatIMG38.jpeg',
      config.imgUrl +'WechatIMG39.jpeg',
      config.imgUrl +'WechatIMG30.jpeg',
      config.imgUrl +'WechatIMG34.jpeg',
      config.imgUrl +'WechatIMG32.jpeg',
      config.imgUrl +'WechatIMG31.jpeg'
    ],
    onload_hidden: true,
    IsAdmin_hidden: true,
    NoAdmin_hidden: false,
    new_number: null,
  },
  // 聊天跳转
  costom: function () {
      // 查看是否授权
      wx.getSetting({
          success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                  getApp().post(config.service.host + '/v1/login_module/login_admin/' + wx.getStorageSync('token'), {},
                      function (res) {
                          if (!res.data.retData) {
                              wx.navigateTo({
                                  url: '../kefu/adminManage/adminManage',
                              })
                          } else {
                              wx.navigateTo({
                                  url: '../kefu/ask/ask',
                              })
                          }
                      })
              } else {
                  return false;
              }
          }
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          This.setData({
            onload_hidden: true
          });
          if (wx.getStorageSync('IsAdmin')) {
            This.setData({
              IsAdmin_hidden: false,
              NoAdmin_hidden: true,
            });
          } else {
            This.setData({
              IsAdmin_hidden: true,
              NoAdmin_hidden: false,
            });
          }
        } else {
          This.setData({
            onload_hidden: false
          });
        }
      }
    });
    setInterval(function (res) {
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            This.setData({
              onload_hidden: true
            });
            if (wx.getStorageSync('IsAdmin')) {
              This.setData({
                IsAdmin_hidden: false,
                NoAdmin_hidden: true,
              });
            } else {
              This.setData({
                IsAdmin_hidden: true,
                NoAdmin_hidden: false,
              });
            }
          } else {
            This.setData({
              onload_hidden: false
            });
          }
        }
      })
    }, 1000);
    setInterval(function (res) {
      if (wx.getStorageSync('session_new_number') == 'none') {
        This.setData({
          new_number: null,
        })
      } else {
        This.setData({
          new_number: wx.getStorageSync('session_new_number'),
        })
      }
    }, 1000);
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  phone: function () {
    if (navigateTo_type == 0) {
      navigateTo_type = 1;
    }
    wx.makePhoneCall({
      phoneNumber: '13801222752'
    });
    navigateTo_type = 0;
  },
  address: function () {
    if (navigateTo_type == 0) {
      navigateTo_type = 1;
    }
    wx.openLocation({
      latitude: 39.834625,
      longitude: 116.450551,
      name: '城外城家居广场 - 楠枫美林',
      success: function (res) {
        console.log(res);
      }
    });
    navigateTo_type = 0;
  },
  blp:function(res){
    var idn = res.currentTarget.id;
    var img_url_arr = this.data.picture;
    var img_yulan = this.data.picture[idn];

    wx.previewImage({
      current: img_yulan,
      urls: img_url_arr
    })
  },
  web_jump:function(){
    wx.navigateTo({
      url: './webView/webView'
    })
  },
  // 地老天荒logo和热线
  phone_dlth: function () {
    wx.makePhoneCall({
      phoneNumber: '01086220269'
    })
  }
})