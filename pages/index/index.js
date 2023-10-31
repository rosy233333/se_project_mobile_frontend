// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    imgSrc: ""
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  next_calculator:function()
{
  wx.navigateTo({
    url: '/pages/signature',
  })
}, loadImage() {
  let that = this;
  wx.chooseImage({
    count: 0,
    sizeType: ['original', 'compressed'], //原图 / 压缩
    sourceType: ['album', 'camera'], //相册 / 相机拍照模式
    success(res) {
      that.setData({
        imgSrc: res.tempFilePaths[0]
      });
      //将图片转换为Base64格式
      // wx.getFileSystemManager().readFile({
      //   filePath: res.tempFilePaths[0],
      //   //encoding: 'base64',
      //   success(data) {
      //     let baseData = data.data; //'data:image/png;base64,' + data.data;
      //     that.setData({
      //       baseData: baseData
      //     });
      //   }
      // });
    }
  })
},
identify() {
  let that = this;
  // let requestData = {
  //   'image': that.data.baseData,
  //   'imge_type':BASE64
  // };
  //调用接口
  // wx.request({
  //   url: 'https://localhost:8080/use/image', //动物
  //   method: 'POST',
  //   header: {
  //     'content-type': 'application/x-www-form-urlencoded'
  //   },
  //   data: requestData,
  //   success: function (identify) {
  //     that.setData({
  //       isShowDetail: true,
  //       resultList: identify.data.result
  //     });
  //   }
  // })
  wx.uploadFile({
    url:'http://localhost:8080/use/image', //接受图片的接口地址
    filePath: that.data.imgSrc,
    name: 'file',
    formData: {
        'postfix': '.png'
    },
    success (res){
        console.log(res);
        const data_str = res.data;
        const data = JSON.parse(data_str)
        //do something
         // wx.navigateTo({url: '/pages/identify',})
         wx.navigateTo({url: '/pages/identify?image='+data.file+"&text="+data.text,})
        }
    })
}
})
