// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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

    wx.previewImage({
      
      urls: ['https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/764844130884085437.jpg'] 
    })

  }
  
})