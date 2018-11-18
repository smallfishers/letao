$(function(){
  var currentPage = 1;
  var pageSize =5;
  render();
  function render(){
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // 结合模板引擎渲染
        var htmlStr = template("firstTpl", info );
        $('tbody').html( htmlStr );

        // 分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 给按钮添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  };


  $('#addBtn').click(function(){
    $('#addModal').modal("show");
  });

  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类"
          }
        }
      }
    }
  });


  $('#form').on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success: function(info){
        if (info.success) {
          $('#addModal').modal("hide");
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })


  })




})