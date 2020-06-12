// pages/mainpage/mainpage.js
const APP = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    totalQuantity: 0,
    totalPrice: 0,
    itemTypeList: APP.globalData.itemTypeList,
    orderList: APP.globalData.orderList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hostPage = this

    wx.request({
      url: 'http://localhost:28590/api/type',
      method: "GET",
      success: function(typeRespond)
      {
        wx.request({
          url: 'http://localhost:28590/api/item',
          method: "GET",
          success: function(itemRespond)
          {
            APP.globalData.itemTypeList.listContent = typeRespond.data
            APP.globalData.itemList = itemRespond.data

            // console.log(respond)
            let totalPrice = 0
            let totalQuantity = 0
            for(let itemIndex in itemRespond.data)
            {
              totalPrice += itemRespond.data[itemIndex].eprice * itemRespond.data[itemIndex].quantity;
              totalQuantity += itemRespond.data[itemIndex].quantity;
            }
    
            hostPage.setData(
              {
                itemList: itemRespond.data,
                itemTypeList: APP.globalData.itemTypeList,
                totalPrice: totalPrice,
                totalQuantity: totalQuantity
              }
            )
          }
        })
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
  changePage: function(event)
  {
    if(event.currentTarget.dataset.action == 'edit')
    {
      APP.globalData.itemTypeList = this.data.itemTypeList
      APP.globalData.itemList = this.data.itemList
      wx.navigateTo({
        url: '../itemPage/itemPage?targetId=' + event.currentTarget.dataset.targetid + "&targetIndex=" + event.currentTarget.dataset.targetIndex,
      })
    }
    else
    {
      wx.navigateTo({
        url: '../itemPage/itemPage',
      })
    }
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