const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const getDateStr = (AddDayCount, date) => {
  var dd = date ? date : new Date();
  dd.setDate(dd.getDate() + AddDayCount);
  const year = dd.getFullYear()
  const month = dd.getMonth() + 1
  const day = dd.getDate()

  return [year, month, day].map(formatNumber).join('-')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getUrlValue = url => {
  var index = url.indexOf("?");
  var newStr = url.substr(index + 1)
  var strs = newStr.split("&");
  var element = {};
  for (var i = 0; i < strs.length; i++) {
    let item = strs[i].split("=");
    element[item[0]] = item[1];
  }
  return element;
}

const host = 'https://points.xinongtech.com/integ'    // 请求地址的域名前缀
  //请求封装
  request = (uri, method, data, header, func, showBusy, onError, useHost) => {
    if (showBusy) {
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.request({
      url: useHost == true ? uri : host + uri,
      data: data,
      header: header ? {
        'X-ACCESS-TOKEN': header,
        'content-type': 'application/json' // 默认值
      } : {
          'content-type': 'application/json' // 默认值
        },
      method: method,
      success: function (res) {
        if (showBusy) {
          wx.hideLoading({})
        }
        if (res.statusCode == "401") {
          /*var token = wx.getStorageSync('header')
          console.log("token", token)
          if (token){
            //获取新的X-ACCESS-TOKEN
            wx.request({
              url: host + '/auth/refresh_token',
              header: {
                'X-ACCESS-TOKEN': token,
                'content-type': 'application/json'
              },
              success(res) {
                console.log(res.data)
                wx.setStorageSync('header', res.header['X-ACCESS-TOKEN'])
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '登录超时，请重新登录！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/login/login',
                  })
                }
  
              }
            })
          }*/
          wx.showModal({
            title: '提示',
            content: '登录超时，请重新登录！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            }
          })
        }
        if (res.status == "404") {
          wx.showModal({
            title: '提示',
            content: '网络连接错误，请稍后再试！',
            showCancel: false
          })
          if (onError) onError();
        } else {
          var r = res;
          switch (r.data.retcode) {
            case 1:
              if (func) func(r);
              break;
            case 0:
              if (!(r.data.msg)) {
                r.i = '网络连接错误，请稍后再试！';
              } else {
                r.i = r.data.msg;
              }
              if (onError) {
                onError(r.i);
                wx.showModal({
                  title: '提示',
                  content: r.i,
                  showCancel: false
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: r.i,
                  showCancel: false
                })
              }
              break;
            case 2:
              wx.showModal({
                title: '提示',
                content: '服务器错误，请联系客服！',
                showCancel: false
              })
              break;
          }
        }

      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: res.msg,
          showCancel: false,
          success: function (res) {
            if (res.confirm && res.msg == '登录超时，请重新登录') {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }
          }
        })
      },
      complete: function () {
        //wx.hideLoading();
        // complete
        //wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  }




module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getDateStr: getDateStr,
  request: request,
  getUrlValue: getUrlValue
}
