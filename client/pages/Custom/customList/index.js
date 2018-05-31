var config = require('../../../config.js');
var app = getApp();
var new_nums = 1;
var setInter = null;
var post_type = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['已经接入', '等待接入'],
    currentTab: 0,
    talkListOver: [],
    talkListWait: [],
    startX: 0, //开始坐标
    startY: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    app.post(
      config.service.Customer_Service_UserResponse, {
        'token': wx.getStorageSync('token'),
      }, function (res) {
        if (res.data.retData) {
          var data = res.data.retData;
          var talkListOver = [];
          var talkListWait = [];
          for (var i in data) {
            if (data[i].session_status == 1) {
              talkListOver[talkListOver.length] = data[i];
            }
            if (data[i].session_status == 0) {
              talkListWait[talkListWait.length] = data[i];
            }
          }
          This.setData({
            talkListOver: talkListOver,
            talkListWait: talkListWait
          });
        }
      }
    );
    setInter = setInterval(function () {
      app.post(
        config.service.Customer_Service_UserResponse, {
          'token': wx.getStorageSync('token'),
        }, function (res) {
          if (res.data.retData) {
            var data = res.data.retData;
            var talkListOver = [];
            var talkListWait = [];
            for (var i in data) {
              if (data[i].session_status == 1) {
                talkListOver[talkListOver.length] = data[i];
              }
              if (data[i].session_status == 0) {
                talkListWait[talkListWait.length] = data[i];
              }
            }
            if (JSON.stringify(This.data.talkListOver) != JSON.stringify(talkListOver)) {
              This.setData({
                talkListOver: talkListOver,
              });
            }
            if (JSON.stringify(This.data.talkListWait) != JSON.stringify(talkListWait)) {
              console.log(talkListWait, This.data.talkListWait)
              This.setData({
                talkListWait: talkListWait
              });
            }
          }
        }
      );
    }, 1000);
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.talkListOver.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    });
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      talkListOver: this.data.talkListOver,
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstarts: function (e) {
    //开始触摸时 重置所有删除
    this.data.talkListWait.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    });
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      talkListWait: this.data.talkListWait,
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.talkListOver.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      };
    });
    //更新数据
    that.setData({
      talkListOver: that.data.talkListOver,
    })
  },
  //滑动事件处理
  touchmoves: function (e) {
    var that = this,
      indexs = e.currentTarget.dataset.indexs,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.talkListWait.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == indexs) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      };
    });
    //更新数据
    that.setData({
      talkListOver: that.data.talkListOver,
      talkListWait: that.data.talkListWait,
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    this.data.talkListOver.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      talkListOver: this.data.talkListOver,
    })
  },
  //删除事件
  dels: function (e) {
    this.data.talkListWait.splice(e.currentTarget.dataset.indexs, 1);
    this.setData({
      talkListWait: this.data.talkListWait,
    })
  },
  costomTalk: function (res) {
    if(post_type){
      post_type = false;
    }
    var session_keys = res.currentTarget.dataset.session_keys;
    if (res.currentTarget.dataset.user_avatar){
      var user_avatar = res.currentTarget.dataset.user_avatar;
    }else{
      var user_avatar = 'https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/avatar_default.png';
    }
    app.post(
      config.service.Customer_Service_UserUpdate, {
        'token': wx.getStorageSync('token'),
        'session_keys': session_keys
      }, function (res) {
        if (res.data.retData){
          wx.setStorageSync('session_keys', session_keys);
          wx.setStorageSync('user_avatar', user_avatar);
          post_type = true;
          wx.navigateTo({
            url: '/pages/Custom/customTalk/index',
          });
        }
      }
    );
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