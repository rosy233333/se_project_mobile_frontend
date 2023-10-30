// pages/signature.js
const app = getApp()
Page({
  data: {
    canvas: '',
    ctx: '',
    pr:0,
    width: 0,
    height: 0,
    first:true,
  },
  start(e) {
    if(this.data.first){
      this.clearClick();
      this.setData({first:false})
    }
    this.data.ctx.beginPath(); // 开始创建一个路径，如果不调用该方法，最后无法清除画布
    this.data.ctx.moveTo(e.changedTouches[0].x, e.changedTouches[0].y) // 把路径移动到画布中的指定点，不创建线条。用 stroke 方法来画线条
  },
  move(e) {
    this.data.ctx.lineTo(e.changedTouches[0].x, e.changedTouches[0].y) // 增加一个新点，然后创建一条从上次指定点到目标点的线。用 stroke 方法来画线条
    this.data.ctx.stroke()
  },
  error: function (e) {
    console.log("画布触摸错误" + e);
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function () {
    this.getSystemInfo()
    this.createCanvas()
  },
  /**
   * 初始化
   */
  createCanvas() {
    const pr = this.data.pr; // 像素比
    const query = wx.createSelectorQuery();
    query.select('#canvas').fields({ node: true, size: true }).exec((res) => {
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      canvas.width = this.data.width*pr; // 画布宽度
      canvas.height = this.data.height*pr; // 画布高度
      ctx.scale(pr,pr); // 缩放比
      ctx.lineGap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 4; // 字体粗细
      ctx.font = '40px Arial'; // 字体大小，
      ctx.fillStyle = '#ecf0ef'; // 填充颜色
      ctx.fillText('手写区', res[0].width / 2 - 60, res[0].height / 2)
      this.setData({ ctx, canvas })
    })
  },
  // 获取系统信息
  getSystemInfo() {
    let that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          pr:res.pixelRatio,
          width: res.windowWidth,
          height: res.windowHeight - 75,
        })
      }
    })
  },
  //重签
  clearClick: function () {
    //清除画布
    this.data.first = true;
    this.data.ctx.clearRect(0, 0, this.data.width, this.data.height);
  },
  //保存图片
  saveClick: function () {
    //console.log(this.data.first); //画板是否有编辑 true 未编辑 false 已编辑
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.data.width,
      height: this.data.height,
      destWidth:this.data.width*this.data.pr,
      destHeight: this.data.height*this.data.pr,
      canvasId: 'canvas',
      canvas: this.data.canvas,
      fileType: 'png',
      success(res) {
      //图片上传
        /*wx.uploadFile({
            url:'/api/Common/UploadImages', //接受图片的接口地址
            filePath: res.tempFilePath,
            name: 'file',
            formData: {
                'user': 'test'
            },
            success (res){
                console.log(res);
                const data = res.data
                //do something
            }
        })*/
        //保存图片到相册
        console.log(res.tempFilePath);
         wx.saveImageToPhotosAlbum({
           filePath: res.tempFilePath,
           success(res) {
             wx.showToast({
               title: '保存成功',
               icon: 'success'
             })
           }
         })
      }
    })
  },next_calculator(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})