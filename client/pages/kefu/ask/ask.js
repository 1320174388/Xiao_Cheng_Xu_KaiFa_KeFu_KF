// pages/kefu/ask/ask.js
var app = getApp();
var config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      talkImgOthers:"",
      //  当前时间
      time:"", 
      //  底部按钮的文字 
      footBtnText: ['客服信息', '发起提问','我的提问'],
      // 点击时增加的次数  
      footBtnClick:['3'],
      //  我的提问
      myAsk:[] ,
  },

  // 获取容器高度，使页面滚动到容器底部
  pageScrollToBottom: function () {
      wx.createSelectorQuery().select('#wrap').boundingClientRect(function (rect) {
          // 使页面滚动到底部
          wx.pageScrollTo({
              scrollTop: rect.height 
          })
      }).exec()
  },
  //   点击底部按钮添加弹出框
  askClick:function(res){
      var that = this;
      if (res.target.id==2){
          wx.request({
              url: config.service.host +'/v1/talk_module/leaving_route',
              method:'GET',
              data:{
                  'peopleIndex':wx.getStorageSync('token')
              },
              success:function(e){
                var myAsk = that.data.myAsk;
                
                for(var i=0;i<e.data.retData.length;i++){
                    myAsk.push(e.data.retData[i].leaving_title);
                };
                if (myAsk.length <4){
                    that.setData({
                        myAsk: myAsk
                    })
                }else{
                    myAsk.splice(0, myAsk.length - 4);
                    that.setData({
                        myAsk: myAsk
                    })
                }
                
                
                
              }
          })
      }
    var footBtnClick = this.data.footBtnClick;
    footBtnClick.push(res.target.id);
    this.setData({
        footBtnClick: footBtnClick
    })
    this.onLoad();
  },
//   发起提问
  ask:function(res){
    var title = res.detail.value.title;
    var content = res.detail.value.text-content;
    wx.getUserInfo({
        success:function(e){
            app.post(config.service.host +'/v1/talk_module/problem_value',{
                "peopleIndex":wx.getStorageSync('token'),
                "peopleName":e.userInfo.nickName,
                "sessionInfo": e.userInfo.gender,
                "leavingTitle": title,
                "messageContent": content
            },function(res){
                console.log(res.data);
            })
        }
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.pageScrollToBottom();
      var time = new Date();
      var X = time.getDay();
      var H = time.getHours();
      var M = time.getMinutes();
      var week = ["日", "一", "二", "三", "四", "五", "六"];
      this.setData({
          time: "星期" + week[X] + "" + H + ":" + M
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
  
  }
})