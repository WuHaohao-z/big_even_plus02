$(function(){
    function loadLinkList () {
        $.ajax({
          type: 'get',
          url: 'http://localhost:8888/api/links',
          success: function (res) {
            if (res.status === 0) {
              var arr = ['<dt>合作伙伴</dt>']
              res.data.forEach(function (item) {
                arr.push(`
                  <dd>
                    <a href="javascript:;">
                      <img src="${'http://localhost:8888/uploads/' + item.linkicon}" alt="${item.linkname}">
                    </a>
                  </dd>
                `)
              })
              $('.kr_collaborator').html(arr.join(''))
            }
          }
        })
      }
  
      loadLinkList()
  
})