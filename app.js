//app.js
App({
  onLaunch: function () 
  {
  },
  globalData: {
    itemList: [],
    itemTypeList:{
      selected: 0,
      listContent: []
    },
    orderList: {
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
  }
})