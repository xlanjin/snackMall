// page/component/details/details.js
var itemIdList = require("../../../data/indexData.js");
Page({
  data:{
    goods: {
      id: 1,
      image: '/image/goods1.png',
      title: '新鲜梨花带雨',
      price: 0.01,
      stock: '有货',
      detail: '这里是梨花带雨详情。',
      parameter: '125g/个',
      service: '不支持退货'
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    scaleCart: false,


    itemIdList:[],
    currentId: 0,
    goodsTable: ["商品详情", "产品参数","售后保障"]
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options){
    this.setData({
      itemIdList: itemIdList.indexData[options.id],
      currentId: options.id
    })
    //查找相对应的id；
    console.log(this.data.itemIdList);
  },
  // 增加商品数量
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },
  // 减少商品数量
  minusCount(){
    let num = this.data.num;
    num--;
    if(num<1){
      num = 1;
    }
    this.setData({
      num: num
    })
  },
  // 加入购物车
  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
    var totalInfo = wx.getStorageSync('totalInfo') || [];  
    //将加入购物车的商品缓存到本地
    this.data.itemIdList.num = this.data.num;
   
    totalInfo.push(this.data.itemIdList)
    wx.setStorageSync("totalInfo", totalInfo)
    console.log("新数据：", this.data.itemIdList)

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})