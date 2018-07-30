// pages/about/about.js
var config = require('../../config.js');
var navigateTo_type = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config_imgUrl: config.imgUrl,
    onload_hidden: true,
    IsAdmin_hidden: true,
    NoAdmin_hidden: false,
    new_number: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 聊天跳转
  costom: function (res) {
      var response = res;
      // 查看是否授权
      wx.getSetting({
          success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                  getApp().post(config.service.host + '/v1/login_module/login_admin/' + wx.getStorageSync('token'), {},
                      function (res) {
                          if (res.data.retData) {
                              getApp().post(config.service.host + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
                                  adminFormid: response.detail.formId
                              }, function (res) {
                                  console.log(res);
                              });
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
    wx.previewImage({
      urls: [config.imgUrl +'764844130884085437.jpg'] 
    })
  },
  // 地老天荒logo和热线
  phone_dlth: function () {
    wx.makePhoneCall({
      phoneNumber: '01086220269'
    })
  }
})