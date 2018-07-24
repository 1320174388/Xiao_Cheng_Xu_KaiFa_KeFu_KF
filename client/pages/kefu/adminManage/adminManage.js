var config = require('../../../config.js');
var app = getApp();
// 获取时间日期
var time = new Date();
var M = time.getMonth() + 1;
var D = time.getDate();
var X = time.getDay();
var week = ["日", "一", "二", "三", "四", "五", "六"]
var strTime = M + '月' + D + '日' + ' 星期' + week[X];
Page({

  /**
   * 页面的初始数据
   */
  data: {
      talkImgOwn:"",
      talkImgOthers:"",
      time: strTime,
      idCardShow: 0,
      idCardColorAsk: 1,
      idCardColorReply: 0.5,
      userList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
          url: config.service.host +'/v1/talk_module/people_route/'+token,
          method: 'GET',
          success:function(res){
              console.log(res.data.retData);
            that.setData({
                userList:res.data.retData
            })
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
  //   点击用户提问切换用户提问模块
  idCardAsk: function () {
      this.setData({
          idCardColorAsk: 1,
          idCardColorReply: 0.5,
          idCardShow: 0
      })
  },
  //   点击自动回复切换自动回复模块
  idCardReply: function () {
      this.setData({
          idCardColorAsk: 0.5,
          idCardColorReply: 1,
          idCardShow: 3
      })
  },
  //点击查看用户名下所有问题
  askLook: function () {
      this.setData({
          idCardShow: 1
      })
  },
  //点击查看问题详细内容
  askContentLook: function () {
      this.setData({
          idCardShow: 2
      })
  }
})