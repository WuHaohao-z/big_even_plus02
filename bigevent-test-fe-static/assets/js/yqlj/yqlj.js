$(function(){
    var layer = layui.layer

    
    // 获取友情连接列表
    loadLinksInfo()
    function loadLinksInfo(){
      $.ajax({
        method: "GET",
        url: "admin/links",
        success: function (res) {
          if(res.status !== 0){
            return layer.msg(res.message)
          }
          var tags = template('table-tpl', res)
          $('.layui-table tbody').html(tags)
          console.log(res.total);
        }
      });
    }
    
    // 添加
    $('#add-link').click(function () {
      var index = layer.open({
        type: 1,
        title: '添加友情链接',
        content: $('#add-form-tpl').html(),
        area: ['500px', '350px']
      })
      // 文件上传按钮点击事件
      $('#urlIcon').click(function () {
        $('#linkFile').click()
      })
      // 文件选中
      $('#linkFile').change(function (e) {
        const objectURL = URL.createObjectURL(e.target.files[0])
        $('#preIcon').attr('src', objectURL)
      })
      // 添加提交
      $('#add-form').submit(function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        $.ajax({
          type: 'post',
          url: 'admin/links',
          data: fd,
          processData: false,
          contentType: false,
          success: function (res) {
            if (res.status === 0) {
              // 关闭窗口
              layer.close(index)
              // 刷新列表
              loadLinksInfo()
            }
          }
        })
      })
    })

    // 删除
    $('.layui-table tbody').on('click', '.delete', function (e) { 
      var id = $(e.target).data('id')
      layer.confirm('确实要删除吗？', function (index) {
        $.ajax({
          type: 'delete',
          url: 'admin/links/' + id,
          success: function (res) {
            if (res.status === 0) {
              // 删除成功
              layer.close(index)
              loadLinksInfo()
            }
          }
        })
      })
    })

    // 编辑
    $('.layui-table tbody').on('click', '.edit', function (e) {
      var id = $(e.target).data('id')
      // 获取数据
      $.ajax({
        type: 'get',
        url: 'admin/links/' + id,
        success: function (res) {
          var index = layer.open({
            type: 1,
            title: '编辑友情链接',
            content: $('#edit-form-tpl').html(),
            area: ['500px', '350px']
          })
          // 设置预览图片效果
          $('#preIcon').attr('src', 'http://localhost:8888/uploads/' + res.data.linkicon)
          // 初始化表单数据
          loadLinksInfo()
          
          // 文件上传按钮点击
          $('#urlIcon').click(function () {
            $('#linkFile').click()
          })
          // 文件选中
          let file = null
          $('#linkFile').change(function (e) {
            const objectURL = URL.createObjectURL(e.target.files[0])
            file = e.target.files[0]
            $('#preIcon').attr('src', objectURL)
          })

          // 表单提交
          $('#edit-form').submit(function (e) {
            e.preventDefault()
            var fd = new FormData(this)
            if (file) {
              fd.append('linkicon', file)
            }
            $.ajax({
              type: 'put',
              url: 'admin/links/' + id,
              data: fd,
              processData: false,
              contentType: false,
              success: function (res) {
                if (res.status === 0) {
                  // 编辑成功
                  layer.close(index)
                  loadLinksInfo()
                }
              }
            })
          })
        }
      })
    })


})