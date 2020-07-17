// pages/itemPage/itemPage.js
const APP = getApp()
const Utill = require("../../utils/util")

const MAX_FILE_SIZE = 2 * 1024 * 1024;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        targetItem: {},
        itemTypeList: {},
        errorMessage: "",
        checkValue: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let tempTypeList = {
            selected: 0,
            listContent: []
        }

        for(let index = 1; index < APP.globalData.itemTypeList.listContent.length; index ++)
        {
            tempTypeList.listContent.push(APP.globalData.itemTypeList.listContent[index])
        }


        if(options.targetId)//edit item
        {
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
                    itemTypeList: tempTypeList,
                    checkValue: APP.globalData.itemList[options.targetIndex].name != ""
                }
            )
        }
        else//add item
        {
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
                    itemTypeList: tempTypeList,
                    checkValue: false
                }
            )
        }
    },
    changeType: function(event)
    {
        let tempTypeObj = this.data.itemTypeList
        tempTypeObj.selected = event.detail.value

        let tempTargetItem = this.data.targetItem
        tempTargetItem.type = this.data.itemTypeList.listContent[event.detail.value].typeId

        this.setData(
            {
                itemTypeList: tempTypeObj,
                targetItem: tempTargetItem
            }
        )
    },
    changeTextBox: function(event)
    {
        let tempTargetObj = this.data.targetItem
        let checkResult = true;
        let message = "";

        if(event.target.dataset.field == "name")// name
        {
            if (event.detail.value == "")
            {
                checkResult = false;
                message = "物品名称不能为空";
            }
            tempTargetObj.name = event.detail.value;
        }
        else if (event.target.dataset.field == "quantity")// Quantity
        {
            if(event.detail.value == "")
            {
                tempTargetObj.quantity = 0;
            }
            else if (isNaN(event.detail.value) == false)
            {
                tempTargetObj.quantity = parseInt(event.detail.value);
            }
            
        }
        else if (event.target.dataset.field == "eprice")// E price
        {
            if(event.detail.value == "")
            {
                tempTargetObj.eprice = 0;
            }
            else if (isNaN(event.detail.value) == false)
            {
                tempTargetObj.eprice = parseInt(event.detail.value)
            }
            
        }
        else// B price
        {
            if(event.detail.value == "")
            {
                tempTargetObj.bprice = 0;
            }
            else if (isNaN(event.detail.value) == false)
            {
                tempTargetObj.bprice = parseInt(event.detail.value)
            }
        }

        this.setData(
            {
                targetItem: tempTargetObj,
                errorMessage: message,
                checkValue: checkResult
            }
        )
    }, 

    chooseImage: function()
    {
        let hostPage = this
        let tempTarget = this.data.targetItem

        wx.chooseImage({
            count: 1,
            success: (res) => {
                if (res.tempFiles[0].size > MAX_FILE_SIZE)
                {
                    hostPage.setData(
                        {
                            errorMessage: "图片必须小于 2M"
                        }
                    )
                }
                else
                {
                    //tempFilePaths  图片的本地临时文件路径列表
                    let path = res.tempFiles[0].path

                    wx.getFileSystemManager().readFile(
                        {
                        filePath: path,
                        encoding: "base64",
                        success: function(data)
                        {
                            tempTarget.imageString = data.data
                            hostPage.setData(
                                {
                                    targetItem: tempTarget,
                                    errorMessage: ""
                                }
                            )
                        }
                        }
                    )
                }
            },
          })
    },

    takeImage: function()
    {
        console.log("Take Image")

        let hostPage = this
        let tempTarget = this.data.targetItem

        wx.createCameraContext().takePhoto({
            quality: 'high',
            success()
            {
                tempTarget.imageString = wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64")
                hostPage.setData(
                    {
                        targetItem: tempTarget
                    }
                )
                
            }
        })
    },

    deleteFunction: function(event)
    {
        wx.request({
            url: Utill.serverURL + "item/remove/" + this.data.targetItem.itemId,
            method: "DELETE",
            success (respond)
            {
              wx.navigateBack({
                complete: (res) => {
  
                },
              })
            },
            fail(exception)
            {
              console.log(exception)
            }
          })
    },
    saveFunction: function(event)
    {
        if(this.data.checkValue == true)
        {
            if(this.data.targetItem.itemId == -1)//Add item
            {
                wx.request({
                    url: Utill.serverURL + "item/new",
                    method: "POST",
                    data: this.data.targetItem,
                    success (respond)
                    {
                    wx.navigateBack({
                        complete: (res) => {
                        },
                    })
                    },
                    fail(exception)
                    {
                    console.log(exception)
                    }
                })
            }
            else//Save edit
            {
                wx.request({
                    url: Utill.serverURL + "item/one",
                    method: "PUT",
                    data: this.data.targetItem,
                    success (respond)
                    {
                    wx.navigateBack({
                        complete: (res) => {
        
                        },
                    })
                    },
                    fail(exception)
                    {
                    console.log(exception)
                    }
                })
            }
        }
        else
        {
            this.setData(
                {
                    errorMessage: "请检查输入的数据"
                }
            );
        }
    },
    cancleFunction: function(event)
    {
        wx.navigateBack({
          complete: (res) => {

          },
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