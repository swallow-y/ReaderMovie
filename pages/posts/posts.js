// 只能用相对路径，不能用绝对路径，否则出错
var posts_Data =  require("../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_list: []

  },


  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?Id='+postId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({ post_list: posts_Data.post_list });
    console.log("onLoad");
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