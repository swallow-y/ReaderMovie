var posts_Data = require("../../../data/posts-data.js");
var postId;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globaData = app.globalData;
    this.setData({ isPlayMusic: globaData.g_isPlayMusic});
     postId = options.Id;
     this.setData({ currentPostId: postId});

    var postData = posts_Data.post_list[postId];
    // this.data.postData = postData;
    // 当出现异步时用setData方法进行数据绑定
    this.setData({ postData : postData});

    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected){
      var postCollected =  postsCollected[postId];
      this.setData({ collected: postCollected });
    }
    else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected)
    }
    // 加入缓存
    // var collection = wx.getStorageSync("collection"+postId);
    // this.setData({ collection : collection});
    // var like = wx.getStorageSync("like"+postId);
    // this.setData({ like:like});
  
  },
onMusicTap:function(event){
  var isPlayMusic = this.data.isPlayMusic;
  if (isPlayMusic){
    wx.pauseBackgroundAudio();
    this.setData({isPlayMusic:false});
    app.globalData.g_isPlayMusic=false;
    app.globalData.g_currentMusicPostId = null;
  }
  else {

  wx.playBackgroundAudio({
    dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46',
    title: '年少的你-钟易轩', 
    coverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003xgEVi3FvCb9.jpg?max_age=2592000'
  });
  this.setData({ isPlayMusic: true });
  app.globalData.g_isPlayMusic = true;
  app.globalData.g_currentMusicPostId = this.data.currentPostId;
  }
}, 

  startAudio: function (event) {
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '汪峰'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
  },
  // 收藏方法
  onCollectionTap: function (event) {
  
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.postId];
    // 收藏变成未收藏，为收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.postId] = postCollected;
    // 更新文章收藏状态
    wx.setStorageSync("posts_collected", postsCollected);
    this.setData({ collected: postCollected});
   
    // wx.showToast({
    //   title: postCollected?'收藏成功':'取消成功',
    //   icon: 'success',
    //   duration: 2000
    // })

    wx.showModal({
      title:"收藏",
      content:"是否收藏该文章",
      showCancle:"true",
      cancleContent:"不收藏",
      cancleColor:"#333",
      confirmText:"收藏",
      confirmColor:"405f80",
    })
    console.log(postId);
  },
  showModal:function(postsCollection,postCollected){
     var that = this;

     wx.showModal({
       title: "收藏",
       content: "是否收藏该文章",
       showCancle: "true",
       cancleContent: "不收藏",
       cancleColor: "#333",
       confirmText: "收藏",
       confirmColor: "405f80",
       success:function(res){
         if(res.confirm){
           wx.setStorageSync('posts_collected',postsCollected);
           that.setData({

             collected:postCollected
           })
         }
       }
     })
  },
  // 加入喜欢方法
  onShareTap: function (event) {
    var itemList= ['分享到朋友圈', '分享给微信好友', '分享到QQ空间', '分享给QQ好友'] 

    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        // res.cancle 用户是否点击了取消
        // res.tapIndex 用户点击了第几个，从0开始
        wx.showModal({
          title: '您已' + itemList[res.tapIndex],
          content: '小程序只是提供服务，目前还不支持分享。公众号具有媒体性质，可以分享',
        })
        console.log(res.tapIndex)
      },
      
      fail: function (res) {
        console.log(res.errMsg)
      }
    })


    // 清除缓存，只要不清除，缓存一直在
    wx.setStorageSync("like" + postId, true);
    var like = wx.getStorageSync("like" + postId);
    this.setData({ like: like });
   
    // wx.removeStorageSync("like");
    // wx.clearStorageSync();
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