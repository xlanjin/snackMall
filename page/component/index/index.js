var indexData = require("../../../data/indexData.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/image/swiper1.jpg',
      '/image/swiper2.jpg',
      '/image/swiper3.jpg',
      '/image/swiper4.jpg',
      '/image/swiper5.jpg',
      '/image/swiper6.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    // 最近新品数据
    indexsList: [],
    currentId: 0,

    // 登陆时的状态属性
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      indexsList: indexData.indexData,
    })
  },

  /**
   * 进入搜索页面-search.wxml
   */
  searchs:function(){
    wx.navigateTo({
      url: '/page/component/search/search',
    })
  },
  /**
   *  进入商品详情页-details.wxml
   */
  toListInfo(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/page/component/details/details?id=" + id
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