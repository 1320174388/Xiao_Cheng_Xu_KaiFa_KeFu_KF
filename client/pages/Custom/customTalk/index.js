// pages/Custom/customTalk/index.js
var config = require('../../../config.js');
var app = getApp();
var new_nums = 1;
var changeTextareaInput = null;
var setInter;
var app_type = true;
var navigateTo_type = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    send_color:true,
    sends_color: false,
    talkText: false,
    talkImg: true,
    user_avatar:null,
    searchinput:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    app.post(
      config.service.Customer_Service_UserUpdate, {
        'token': wx.getStorageSync('token'),
        'session_keys': wx.getStorageSync('session_keys')
      }, function (res) {
      }
    );
    app.post(
      config.service.Customer_Service_Response, {
        'token': wx.getStorageSync('token'),
        'session_keys': wx.getStorageSync('session_keys')
      }, function (res) {
        if (res.data.retData) {
          var data = res.data.retData;
          new_nums = data[data.length - 1].session_sorts;
          This.setData({
            conversation: res.data.retData,
            user_avatar: wx.getStorageSync('user_avatar')
          });
          setTimeout(This.scroll_def,500);
          setInter = setInterval(function () {
            app.post(
              config.service.Customer_Service_newResponse, {
                'token': wx.getStorageSync('token'),
                'session_keys': wx.getStorageSync('session_keys'),
                'session_nums': new_nums
              }, function (res) {
                if (res.data.retData){
                  var conversation = This.data.conversation;
                  for (var i in res.data.retData){
                    conversation[conversation.length] = res.data.retData[i]
                  }
                  new_nums = conversation[conversation.length - 1].session_sorts;
                  This.setData({
                    conversation: conversation,
                  });
                  This.scroll_def();
                }
              }
            );
          },5000);
        }
      }
    );
  },
  /**
   * 发送消息时显示最下方
   */
  scroll_def:function(){
    wx.createSelectorQuery().select('#page').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.height
      })
    }).exec()
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
    clearInterval(setInter);
    setInter = null;
    app.post(
      config.service.Customer_Service_UserUpdate, {
        'token': wx.getStorageSync('token'),
        'session_keys': wx.getStorageSync('session_keys'),
      }, function (res) {
        
      }
    );
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
  /**
   * 文本修改时获取值
   */
  changeTextarea:function(e){
    changeTextareaInput = e.detail.value;
    if (e.detail.value==''){
      this.setData({
        send_color: true,
        sends_color: false
      })
    }else{
      this.setData({
        send_color: false,
        sends_color: true 
      })
    }
  },
  /**
   * 发送信息
   */
  input_add:function(res){
    var This = this;
    if (!app_type){
      return false;
    }
    app.point('发送中。。。','loading',20000);
    app_type = false;
    app.post(
      config.service.Customer_Service_Request, {
        'token': wx.getStorageSync('token'),
        'content': changeTextareaInput,
        'session_keys': wx.getStorageSync('session_keys')
      }, function (res) {
        This.setData({
          searchinput: '',
          send_color: true,
          sends_color: false
        }) 
        app_type = true;
        clearInterval(setInter);
        setInter = null;
        app.post(
          config.service.Customer_Service_newResponse, {
            'token': wx.getStorageSync('token'),
            'session_keys': wx.getStorageSync('session_keys'),
            'session_nums': new_nums
          }, function (res) {
            if (res.data.retData) {
              var conversation = This.data.conversation;
              for (var i in res.data.retData) {
                conversation[conversation.length] = res.data.retData[i]
              }
              new_nums = conversation[conversation.length - 1].session_sorts;
              This.setData({
                conversation: conversation,
              });
              app.point('发送成功', 'success', 1000);
              This.scroll_def();
            }
          }
        );
      }
    );
  },
})