// pages/mainpage/mainpage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    totalQuantity: 0,
    totalPrice: 0,
    itemTypeList:
    {
      selected: 0,
      listContent: [
        {
          typeId: 1,
          typeName: "Type 1"
        },
        {
          typeId: 2,
          typeName: "Type 2"
        },
        {
          typeId: 3,
          typeName: "Type 3"
        },
        {
          typeId: 4,
          typeName: "Type 4"
        },
      ]
    },
    orderList: 
    {
      selected: 0,
      listContent: [
        {
          orderId: 1,
          orderName: "Name"
        },
        {
          orderId: 2,
          orderName: "Quantity"
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hostPage = this
    wx.request({
      url: 'http://localhost:28590/api/item',
      method: "GET",
      success: function(respond)
      {
        // console.log(respond)
        let totalPrice = 0
        let totalQuantity = 0
        for(let itemIndex in respond.data)
        {
          totalPrice += respond.data[itemIndex].eprice * respond.data[itemIndex].quantity;
          totalQuantity += respond.data[itemIndex].quantity;
        }

        hostPage.setData(
          {
            itemList: respond.data,
            totalPrice: totalPrice,
            totalQuantity: totalQuantity
          }
        )
      }
    })
  },
  changeFilter: function(event)
  {
    console.log(event)
    let tempTypeObj = this.data.itemTypeList
    tempTypeObj.selected = event.detail.value

    this.setData(
      {
        itemTypeList: tempTypeObj
      }
    )
  },
  changeOrder: function(event)
  {
    console.log(event)
    let tempOrderObj = this.data.orderList
    tempOrderObj.selected = event.detail.value

    this.setData(
      {
        orderList: tempOrderObj
      }
    )
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