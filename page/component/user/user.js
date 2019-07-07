// page/component/new-pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    iconList: [{
       'imgUrl': '/image/user/Obligations.png',
        'title': '待付款',
        'route': 'Obligations'
      },{
        'imgUrl': '/image/user/shipment.png',
        'title': '待发货',
        'route': 'shipment'
      },{
        'imgUrl': '/image/user/takeDelivery.png',
        'title': '待收货',
        'route': 'takeDelivery'
      },{
        'imgUrl': '/image/user/evaluate.png',
        'title': '评价',
        'route': 'evaluate'
      },{
        'imgUrl': '/image/user/refund.png',
        'title': '退款/售后',
        'route': 'refund'
      }
    ],

    secondList: [{
      'imgUrl': '/image/user/Grouping.png',
        'title': '我的拼团',
        'route': 'Grouping'
      },{
        'imgUrl': '/image/user/Coupon.png',
        'title': '优惠券',
        'route': 'Coupon'
      },{
        'imgUrl': '/image/user/Commodity.png',
        'title': '商品收藏',
        'route': 'Commodity'
      },{
        'imgUrl': '/image/user/Shop.png',
        'title': '店铺收藏',
        'route': 'Shop'
      },{
        'imgUrl': '/image/user/history.png',
        'title': '历史浏览',
        'route': 'history'
      }
    ],

    otherSingleList: [{
      'imgUrl': '/image/user/adress.png',
        'title': '收货地址',
        'route': 'adress'
      },{
        'imgUrl': '/image/user/customer.png',
        'title': '官方客服',
        'route': 'customer'
      },{
        'imgUrl': '/image/user/member.png',
        'title': '会员中心',
        'route': 'member'
      },{
        'imgUrl': '/image/user/us.png',
        'title': '关于我们',
        'route': 'us'
      },{
        'imgUrl': '/image/user/install.png',
        'title': '设置',
        'route': 'install'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = wx.getStorageSync("userInfo");

    console.log(userInfo)
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync("userInfo", app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})