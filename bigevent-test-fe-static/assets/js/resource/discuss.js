$(function () {
    var layer = layui.layer
    getDiscuss()
    // 封装ajax函数
    function getDiscuss() {
        $.ajax({
            type: "GET",
            url: "admin/comments",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取评论列表失败！')
                }
                // 调用template函数渲染模板引擎
                var htmlStr = template('discuss_list', res)
                // 渲染到页面
                $('tbody').html(htmlStr)

            }

        });
    }

    // 定义补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (data) {
        var dt = new Date(data)
        var y = padZero(dt.getFullYear());
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }

    // 用事件委托的方式给删除按钮绑定点击事件
    $('body').on('click', '.btn_delete', function () {
        // 获取对应的id值
        var id = $(this).attr('data-id')
        // 弹出询问框
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            // 发送ajax
            $.ajax({
                type: "DELETE",
                url: "admin/comments/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除评论失败！')
                    }
                    layer.msg('删除评论成功！')
                    // 重新渲染页面
                    getDiscuss()
                    // 关闭询问框
                    layer.close(index);
                }

            });

        });


    })
})

