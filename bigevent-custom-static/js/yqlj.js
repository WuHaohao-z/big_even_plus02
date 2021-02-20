$(function(){
    getLink()
    function getLink(){
        $.ajax({
            method: "GET",
            url: "admin/links",
            success: function (res) {
                if(res.status === 0){
                    console.log(res);
                    var str = template("tpl-links",res)
                    $(".kr_collaborator").html(str)
                }
            }
        });
    }
})