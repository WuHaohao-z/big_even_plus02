$(function(){
    // 判断token是否存在
  var mytoken = sessionStorage.getItem('mytoken')
  if (!mytoken) {
    // 表示token不存在，跳转到登录页面
    location.href = './login.html'
  }
  // 绑定退出按钮的点击事件
  $('#logout-btn').click(function (e) {
    e.preventDefault()
    layer.confirm('确认要退出吗?', {icon: 3, title:'提示'}, function(index){
      // 实现退出的功能：清除token,跳转到登录页面
      localStorage.removeItem('mytoken')
      // 关闭弹窗
      layer.close(index)
      // 跳转到登录页面
      location.href = '/login.html'
    });
  })
})
