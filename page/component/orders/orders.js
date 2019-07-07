// page/component/orders/orders.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let totalInfo = wx.getStorageSync("totalInfo");
    this.setData({
      orders: totalInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTotalPrice();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const self = this;
    wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },
  /**
    * 计算总价
    */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].speace;
    }
    this.setData({
      total: total
    })
  },
  /**
   * 去支付
   */
  toPay() {
    wx.showModal({
      title: '提示',
      content: '本系统只做演示，支付系统已屏蔽',
      text: 'center',
      complete() {
        wx.switchTab({
          url: '/page/component/user/user'
        })
      }
    })
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