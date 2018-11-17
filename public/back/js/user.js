$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
  render();

  function render(){
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page:currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template("tmp", info);
        $("tbody").html(htmlStr);
  
  
        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    });
  }


  $('tbody').on('click','.btn',function(){
    //alert(111);
    $('#userModal').modal("show");
    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
      
  });

  
    $('#confirmBtn').click(function() {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 修改成功
          // 关闭模态框
          $('#userModal').modal("hide");
          // 页面重新渲染
          render();
        }
      }
    })
  })

})