// pages/ProductPresentation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture:[
      'https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/WechatIMG38.jpeg',
      'https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/WechatIMG39.jpeg',
      'https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/WechatIMG30.jpeg',
      'https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/WechatIMG34.jpeg',
      'https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/WechatIMG32.jpeg',
      'https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/WechatIMG31.jpeg'
    ],
    onload_hidden: true,
    IsAdmin_hidden: true,
    NoAdmin_hidden: false,
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
    }, 500);
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
    wx.makePhoneCall({
      phoneNumber: '01087633035'
    })
  },
  address: function () {
    wx.openLocation({
      latitude: 39.834625,
      longitude: 116.450551,
      name: '楠枫美林木业工厂店',
      success: function (res) {
        console.log(res);
      }
    });
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
  }
})