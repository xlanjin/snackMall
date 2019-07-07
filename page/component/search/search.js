let timeId = null;
Page({
  data: {
    history: [],
    hot: ['新鲜芹菜', '大红枣', '滋补桂圆干', '水杯', '奶瓶', '韩版开口戒指', '幼猫猫粮', '鸡肉火腿肠'],
    loadingCount: 0,
    scrollH: 0,
    imgWidth: 0,
    images: [],
    col1: [],
    col2: [],
    inputValue: '',//输入的值
    store: '',
    // 【推荐搜索】的显示/隐藏状态，默认为显示
    searchDetail: true,
    // 【下拉搜索框列表】的显示/隐藏状态，默认为隐藏
    showKeys:false,
    // 【商品信息展示区域】的显示/隐藏状态，默认为隐藏
    cateInfo:false,
    // 下拉框列表
    keywordsList:[],

  },
  /**
   *  初始数据
   */
  init:function(){
    var history = wx.getStorageSync('histrySearch');
    var store = this.data.store;
    this.setData({
      history: history,
      inputValue: store
    })
  },


  /**
   * 获取输入框的值
   */
  searchInput: function (e) {
    var listData = [];
    var that = this;
    let value = e.detail.value;
    if(value.length > 0){
      that.setData({
        inputValue: value,
        searchDetail: false,
        showKeys:true
      })
    } else {
      that.setData({
        inputValue: value,
        searchDetail: true,
        showKeys: false
      })
    }
    
    
    /**
    * 发起请求
    */
    wx.request({
      url: 'http://suggest.taobao.com/sug?',
      type: "get",
      dataType: 'jsonp',
      data: {
        q:e.detail.value
      },
      jsonp: "callback",
      jsonpCallback: "cb",
      success: function (res) {
        let data = res.data;    // #此处data是格式化的字符串，并不是对象
        var json = JSON.parse(data);    // #把data转换成对象
        for(var i = 0 ;i < json.result.length; i++){
          that.data.keywordsList.push(json.result[i][0])
        }
        console.log(that.data.keywordsList)
        that.setData({
          keywordsList: that.data.keywordsList
        })
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },

  /**
  *   清空输入框内容
  */
  closeSearch:function(){
    this.setData({
      inputValue:'',
      showKeys:false,
      searchDetail:true
    })
  },

  /**
   *  按起【回车键】进行搜索发起
   */
  setSearchStorage:function(e){
    let store = e.currentTarget.dataset.store
    console.log("发起回车搜索时 store：", store)
    if (store.length > 0){
      let data;
      let localStorageValue = [];
      //设置一个空数组,把每次输入的值存进去
      //判断如果小于等于10就添加进数组, 否则就删除下标为零的值
      var searchData = wx.getStorageSync('histrySearch') || []
      if (searchData.length <= 10) {
        searchData.push(this.data.inputValue)
      } else {
        searchData.splice(0, 1)
        searchData.push(this.data.inputValue)
      }
      wx.setStorageSync('histrySearch', searchData);

      this.setData({
        // 【推荐搜索】的显示/隐藏状态，默认为显示
        searchDetail: false,
        // 【下拉搜索框列表】的显示/隐藏状态，默认为隐藏
        showKeys: false,
        // 【商品信息展示区域】的显示/隐藏状态，默认为隐藏
        cateInfo: true,
      })

      //加载首组图片
      this.loadImages();
    }
  },

  /**
  *   点击【下拉列表框中item】则进行指定商品的 模糊搜索
  */
  keywordHandle:function(res){
    console.log(res.currentTarget.dataset.id, res.currentTarget.dataset.text);

    this.setData({
      inputValue: res.currentTarget.dataset.text,
  
    })
    
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function () {
    // this.init();
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });
      }
    })
  },

  loadImages: function () {
    let images = [
      {
        goodId: 0,
        name: '泊尔崖蜜蜜光面膜（5片盒装）',
        url: 'bill',
        imageurl: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
        newprice: "86",
        oldprice: "88",
        discount: "8.2",
        shop: true,
        hot: false
      },
      {
        goodId: 1,
        name: '透无瑕矿物养护两用粉饼#03',
        url: 'bill',
        imageurl: 'https://a.appsimg.com/upload/brand/upcb/2017/10/26/77/ias_150899004322921_604x290_80.jpg!75.webp',
        newprice: "147.00",
        oldprice: "150.00",
        discount: "6.8",
        shop: false,
        hot: true
      },
      {
        goodId: 2,
        name: '川水水光面膜（5片盒装）',
        url: 'bill',
        imageurl: 'https://a2.vimage1.com/upload/merchandise/pdcvis/2017/08/21/86/7891361fdab348a1bc91aeca31fc77b1-5_218x274_70.jpg',
        newprice: "86.00",
        oldprice: "88.00",
        discount: "9.0",
        shop: false,
        hot: false
      },
      {
        goodId: 3,
        name: '蜜三色渐变咬唇膏3.2g 03蜜橙动心恋',
        url: 'bill',
        imageurl: 'http://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/176/c3b9453a4d7f46c6a8fe78705f77352b-5_218x274_70.jpg',
        newprice: "97.00",
        oldprice: "99.00",
        discount: "7.0",
        shop: true,
        hot: false
      },
      {
        goodId: 4,
        name: '时焕颜亮采套装',
        url: 'bill',
        imageurl: 'https://a2.vimage1.com/upload/merchandise/pdcvis/2017/08/21/93/69a6bc1c11eb4be184b7dffb43b8565b-5_218x274_70.jpg',
        newprice: "398.00",
        oldprice: "459.00",
        discount: "6.5",
        shop: false,
        hot: false
      }
    ];

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        // 比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1.length <= col2.length) {
      col1.push(imageObj);
    } else {
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {

  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    this.init();
  }
})