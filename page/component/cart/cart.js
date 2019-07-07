// page/component/new-pages/cart/cart.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
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
    // 提取本地缓存的商品信息
    let totalInfo = wx.getStorageSync("totalInfo")
    this.setData({
      hasList: true,
      carts: totalInfo
    });
    this.getTotalPrice();
  },

  /**
    * 当前商品选中事件
    */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    var selected = carts[index].selected;
    carts[index].selected = !selected;

    let totalInfo = wx.getStorageSync("totalInfo");

    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let totalInfo = wx.getStorageSync("totalInfo");
    totalInfo.splice(index, 1);

    this.setData({
      carts: totalInfo
    });
    wx.setStorageSync("totalInfo", totalInfo)
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let totalInfo = wx.getStorageSync("totalInfo");
    let num = totalInfo[index].num;
    num = num + 1;
    totalInfo[index].num = num;
    this.setData({
      carts: totalInfo
    });
    wx.setStorageSync("totalInfo", totalInfo)
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let totalInfo = wx.getStorageSync("totalInfo");
    let num = totalInfo[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    totalInfo[index].num = num;
    this.setData({
      carts: totalInfo
    });
    wx.setStorageSync("totalInfo", totalInfo)
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].speace;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  /**
   *   【去结算】按钮，跳转到结算页面-orders.wxml
   */
  oders() {
    wx.navigateTo({
      url: '/page/component/orders/orders',
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