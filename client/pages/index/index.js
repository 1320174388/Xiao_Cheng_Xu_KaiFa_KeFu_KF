// pages/home/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_banner:[
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/index-banner.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/index-banner2.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/index-banner3.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/index-banner4.jpg"
    ],
      shuiQi:[
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s1.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s2.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s3.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s4.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s5.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s6.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s7.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s8.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s9.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s10.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s11.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s12.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s13.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s14.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s15.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s16.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s17.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/s18.jpg"
      ],
      "yuanMu":[
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y1.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y2.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y3.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y4.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y5.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y6.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y7.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y8.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y9.jpg",
        "https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/y10.jpg"
      ]
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
  
  },
  phone:function(){
    wx.makePhoneCall({
      phoneNumber: '01087633035'
    })
  },
  address:function(){
    wx.openLocation({
      latitude: 39.834625,
      longitude: 116.450551,
      name: '楠枫美林木业工厂店',
      success: function (res) {
        console.log(res);
      }
    });
  },
  blp: function (res) {
    var idn = res.currentTarget.id;
    var img_yulan = this.data.shuiQi[idn];
    
    wx.previewImage({

      urls: [img_yulan]
    })

  },
  blp2: function (res) {
    var idn = res.currentTarget.id;
    var img_yulan = this.data.yuanMu[idn];

    wx.previewImage({

      urls: [img_yulan]
    })

  }
})