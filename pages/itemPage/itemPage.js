// pages/itemPage/itemPage.js
const APP = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        targetItem: {},
        itemTypeList: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        if(options.targetId)
        {
            let tempTypeList = APP.globalData.itemTypeList
            for(let index  in tempTypeList.listContent)
            {
                if(tempTypeList.listContent[index].typeId == APP.globalData.itemList[options.targetIndex].type)
                {
                    tempTypeList.selected = index
                    break
                }
            }

            this.setData(
                {
                    targetItem: APP.globalData.itemList[options.targetIndex],
                    itemTypeList: tempTypeList
                }
            )
        }
        else
        {
            let tempTypeList = APP.globalData.itemTypeList
            tempTypeList.selected = 0
            
            this.setData(
                {
                    targetItem: {
                        itemId: -1,
                        imageString: "",
                        name: "",
                        quantity: 0,
                        type: tempTypeList.listContent[0].typeId,
                        eprice: 0,
                        bprice: 0
                    },
                    itemTypeList: tempTypeList
                }
            )
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