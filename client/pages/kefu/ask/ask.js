// pages/kefu/ask/ask.js
var app = getApp();
var config = require('../../../config.js');
// 控制客服信息内对话框的数量
var index = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      talkImgOthers:"",
      //  当前时间
      time:"", 
      //  底部按钮的文字 
      footBtnText: ['客服信息', '其他问题','历史提问'],
      // 点击时增加的次数  
      footBtnClick:[],
      //  历史提问
      myAsk:[] ,
    //   客服信息
      kefuInfo:[],
    //   对话框内容
      talkContent:[],
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
      } else if (res.target.id==0){
          wx.request({
              url: config.service.host+'/v1/talk_module/replys_list/',
              method:'GET',
              success:function(res){
                console.log(res.data);
                  that.setData({
                      kefuInfo: res.data.retMsg
                  })
              }
          })
      }
    var footBtnClick = this.data.footBtnClick;
    var footBtnClickObj = {
        id: res.target.id,
        index:'',
    }
    footBtnClick.push(footBtnClickObj);
    this.setData({
        footBtnClick: footBtnClick
    })
    this.onLoad();
  },
//   发起提问
  ask:function(res){
      console.log(res.detail)
    var title = res.detail.value.title;
    var content = res.detail.value.textContent;
    wx.getUserInfo({
        success:function(e){
            app.post(config.service.host +'/v1/talk_module/info_post',{
                "peopleIndex":wx.getStorageSync('token'),
                "peopleFormid":res.detail.formId,
                "peopleName":e.userInfo.nickName,
                "peopleSex": e.userInfo.gender,
                "leavingTitle": title,
                "messageCont": content
            },function(res){
                console.log(res.data);
                wx.showToast({
                    title: '提交成功',
                })
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
      if(M<10){
          M = '0'+M;
      }
      var week = ["日", "一", "二", "三", "四", "五", "六"];
      this.setData({
          time: "星期" + week[X] + "" + H + ":" + M
      })
  },
//   客服信息点击
    kefuReply:function(res){
        var footBtnClick = this.data.footBtnClick;
        var kefuInfo = this.data.kefuInfo;
        console.log(res.target.id);
        var talkContentArray = this.data.talkContent;
        index++;
        var footBtnClickObj = {
            id:'3',
            index: index
        }
        var talkContent = {
            content: kefuInfo[res.target.id].session_content,
            index: index
        };
        footBtnClick.push(footBtnClickObj);
        talkContentArray.push(talkContent);
        this.setData({
            footBtnClick: footBtnClick,
            talkContent: talkContentArray
        });
        this.pageScrollToBottom();
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