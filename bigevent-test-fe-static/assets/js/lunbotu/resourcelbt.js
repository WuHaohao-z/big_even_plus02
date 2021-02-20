// 入口函数
$(function () {
    var layer = layui.layer
    // 获取轮播图的数据
    lbt()
    function lbt() {
        // 发送ajax

        $.ajax({
            method: 'GET',
            url: 'admin/swipers',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                // 使用模板引擎
                var htmlStr = template('tpl-cate', res)
                // 渲染到页面
                $('.layui-table tbody').html(htmlStr)
            }
        })

    }

    // 状态切换
    $('.layui-table tbody').on('click', '.layui-badge', function (e) {
        let status = $(e.target).data('status')
        let id = $(e.target).data('id')
        console.log(11);
        $.ajax({
            type: 'put',
            url: 'admin/swipers/' + id,
            data: {
              status: status
            },
            success: function (res) {
              if (res.status === 0) {
                // 切换成功
                layer.msg(res.message)
                lbt()
              }
            }
          })
    })


    // 给上传图片按钮添加点击事件
    $('#btnpic').on('click', function () {
        $('#swit').click()
    })


    // 监听文件选中事件
    $('#swit').on('change', function (e) {
        let files = e.target.files
        // formDate 属性
        var fd = new FormData()
        // 遍历 files 添加
        $.each(files, function (index, item) {
            fd.append('swipers', item)
        })
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: 'admin/swipers',
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg('上传成功')
                    // 重新渲染页面
                    lbt()
                }
               
            }
        })
    })


    // 删除操作
    $('.layui-table tbody').on('click', '.delete', function (e) {
        var id = $(e.target).data('id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 发送ajax
            $.ajax({
                method: 'DELETE',
                url: 'admin/swipers/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    // 删除成功
                    layer.msg(res.message)
                    lbt()
                    // 关闭
                    layer.close(index);
                }

            })

        });
    })
})