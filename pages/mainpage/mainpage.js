// pages/mainpage/mainpage.js
const APP = getApp()
const Utill = require("../../utils/util")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    copyItemList: null,
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
      url: Utill.serverURL + 'type',
      method: "GET",
      success: function(typeRespond)
      {
        let tempTypeList = [
          {
            typeId: -1,
            typeName: "- - - - - -"
          }
        ]

        for (let index in typeRespond.data)
        {
          tempTypeList.push(typeRespond.data[index])
        }

        APP.globalData.itemTypeList.listContent = tempTypeList

        hostPage.setData(
          {
            itemTypeList: APP.globalData.itemTypeList
          }
        )
      }
    })
  },
  changeFilter: function(event)
  {
    let tempTypeObj = this.data.itemTypeList
    tempTypeObj.selected = event.detail.value

    this.setData(
      {
        itemTypeList: tempTypeObj
      }
    )

    let orderTarget = "name"

    if(this.data.orderList.selected == 1)
    {
      orderTarget = "quantity"
    }
    
    let hostPage = this

    if(event.detail.value == 0)
    {
      //获取新的物品列表
      wx.request({
        url: Utill.serverURL + 'item/' + orderTarget,
        method: "GET",
        success(respond)
        {
          hostPage.setData(
            {
              itemList: respond.data
            }
          )
        }
      })
    }
    else
    {
      //获取新的物品列表
      wx.request({
        url: Utill.serverURL + 'item/' + this.data.itemTypeList.listContent[this.data.itemTypeList.selected].typeId + '/' + orderTarget,
        method: "GET",
        success(respond)
        {
          hostPage.setData(
            {
              itemList: respond.data
            }
          )
        }
      })
    }
  },
  changeOrder: function(event)
  {
    let tempOrderObj = this.data.orderList
    tempOrderObj.selected = event.detail.value

    this.setData(
      {
        orderList: tempOrderObj
      }
    )

    let orderTarget = "name"

    if(this.data.orderList.selected == 1)
    {
      orderTarget = "quantity"
    }
    
    let hostPage = this

    if(this.data.itemTypeList.selected == 0)
    {
      //获取新的物品列表
      wx.request({
        url: Utill.serverURL + 'item/' + orderTarget,
        method: "GET",
        success(respond)
        {
          hostPage.setData(
            {
              itemList: respond.data
            }
          )
        }
      })
    }
    else
    {
      //获取新的物品列表
      wx.request({
        url: Utill.serverURL + 'item/' + this.data.itemTypeList.listContent[this.data.itemTypeList.selected].typeId + '/' + orderTarget,
        method: "GET",
        success(respond)
        {
          hostPage.setData(
            {
              itemList: respond.data
            }
          )
        }
      })
    }
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

  searchFunction: function(event)
  {
    if(this.data.copyItemList == null)
    {
      this.setData(
        {
          copyItemList: this.data.itemList
        }
      )
    }

    if(event.detail.value == "")
    {
      this.setData(
        {
          itemList: this.data.copyItemList,
          copyItemList: null
        }
      )
    }
    else
    {
      let newList = []

      for (let index in this.data.copyItemList)
      {
        if(this.data.copyItemList[index].name.includes(event.detail.value))
        {
          newList.push(this.data.copyItemList[index])
        }
      }

      this.setData(
        {
          itemList: newList
        }
      )
    }
  },

  changeOneQuantity: function(event)
  {
    let amount = 0
    if (event.currentTarget.dataset.action == "add")
    {
      amount = 1
    }
    else
    {
      amount = -1
    }

    if(this.data.itemList[event.currentTarget.dataset.targetIndex].quantity + amount < 0)
    {
      wx.showToast({
        title: 'Quantity is already 0',
        icon: "none",
        duration: 2000
      })
    }
    else
    {
      let hostPage = this

      wx.request({
        url: Utill.serverURL + 'item/changeOne/' + event.currentTarget.dataset.targetId + "/" + amount,
        method: "PUT",
        success(respond)
        {
          APP.globalData.itemList[event.currentTarget.dataset.targetIndex].quantity += amount

          hostPage.setData(
            {
              itemList: APP.globalData.itemList,
              totalPrice: hostPage.data.totalPrice += (amount * APP.globalData.itemList[event.currentTarget.dataset.targetIndex].eprice),
              totalQuantity: hostPage.data.totalQuantity += amount
            }
          )
        }
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
    var hostPage = this

    wx.request({
      url: Utill.serverURL + 'item',
      method: "GET",
      success: function(itemRespond)
      {
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
            itemList: APP.globalData.itemList,
            totalPrice: totalPrice,
            totalQuantity: totalQuantity
          }
        )
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