var config = require('../../../config.js');
var app = getApp();
// 获取时间日期
var time = new Date();
var Y = time.getFullYear();
var M = time.getMonth() + 1;
var D = time.getDate();
var X = time.getDay();
var H = time.getHours();
var m = time.getMinutes();
if (m < 10) {
    m = '0' + m
}
var week = ["日", "一", "二", "三", "四", "五", "六"]
var strTime = M + '月' + D + '日' + ' 星期' + week[X];
var askTime = Y + '年' + M + '月' + D + '日 ' + H + ':' + m
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //   顶部时间
      time: strTime,
  },
  // 问题详情
  askContentLook:function(res){
      app.post(config.service.host + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
          adminFormid: res.detail.formId
      }, function (res) {

      });
      wx.navigateTo({
          url: '../questionDetail/questionDetail',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
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