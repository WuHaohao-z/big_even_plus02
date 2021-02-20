$(function() {
    // 获取lunbotu
    var layer = layui.layer
    lbt()
    function lbt() {
        console.log(11);
        // 发送ajax
        $.ajax({
            method:'GET',
            url:'http://localhost:8888/api/swipers',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                  // 使用模板引擎
                  var htmlStr = template('tpl-lbt', res)
                  // 渲染到页面
                  $('.kr_banner .lbt').html(htmlStr)
            }
        })
    }
})