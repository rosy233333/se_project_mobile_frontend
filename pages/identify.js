// pages/identify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:'',
    text:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /*onLoad(options) {

  },*/
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      image:options.image,
      text:options.text
    })
       var users=[];
       var that = this;
       var arrayBuffer=wx.base64ToArrayBuffer(that.data.image);
       var base64=wx.arrayBufferToBase64(arrayBuffer);
       console.log(base64);
       that.setData({ identifyImage: 'data:image/jpg;base64,' + base64});
        wx.request({
          url: 'http://localhost:8080/getUser',
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res.data+ "你是从后台来的ma?");
            that.setData({
              users:res.data
            })
          },
          fail: function (res) {
            console.log('submit fail');
          },
          complete: function (res) {
            console.log('submit complete');
          },
        })
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  feedback(){
    wx.showModal({
      //editable:true,//显示输入框
      title: '提示',
      content:'此次识别结果是否正确?',
      //placeholderText:'请输入您认为的结果',//显示输入框提示信息
      confirmText: '正确',
      cancelText:'错误',
      success: res => {
        if (res.confirm) { //点击了确认
          console.log(res.content)//用户输入的值
          wx.request({
            url: 'http://localhost:8080/use/feedback', //仅为示例，并非真实的接口地址
            method:'post',
            data: {
              feedback: 'right'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success (res) {
              console.log(res.data)
            }
          })
        } else {
          console.log('用户点击了取消')
          wx.request({
            url: '', //仅为示例，并非真实的接口地址
            method:'post',
            data: {
              feedback: 'wrong'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success (res) {
              console.log(res.data)
            }
          })
        }
      }
    })

  }, 
      next_calculator(){
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
})