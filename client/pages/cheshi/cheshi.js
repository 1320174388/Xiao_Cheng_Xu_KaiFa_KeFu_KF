// pages/cheshi/cheshi.js
var config = require('../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  /**
   * cheshifasong
   */
  cheshifasong:function(){
    app.post(
      config.service.Customer_Service_Request,{
        'token':wx.getStorageSync('token'),
        'content':'测试接口会话信息',
        'session_keys':'0d855238a92633c7e447fe86d4b9ee39'
      },function(res){
        console.log(res.data)
      }
    );
  },
  cheshihuoqu:function(res){
    app.post(
      config.service.Customer_Service_Response, {
        'token': wx.getStorageSync('token'),
        'session_keys': '0d855238a92633c7e447fe86d4b9ee39'
      }, function (res) {
        console.log(res.data)
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})