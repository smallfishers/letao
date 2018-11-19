$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info){
        var htmlStr = template("secondTpl",info);
        $("tbody").html(htmlStr);

        //进行分页初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil( info.total / info.size ),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            currentPage = page;

            render();
          }
        })
      }
    })
  }



  //点击添加按钮，显示添加模态框
  $('#addBtn').click(function(){
    $('#addModal').modal("show");

    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function(info){
        var htmlStr = template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }
    })

  });

  
  $('.dropdown-menu').on("click","a",function(){
    //alert(11)
    var txt = $(this).text();
    $("#dropdownText").text(txt);
    var id = $(this).data("id");
    $('[name=categoryId]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")

  });



  $('#fileupload').fileupload({
    dataType:"json",
    done: function(e,data){
      var result = data.result;
      var picUrl = result.picAddr;
      $('#imgBox img').attr("src", picUrl );
      $('[name="brandLogo"]').val( picUrl );
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      
    }
  });


  $('#form').bootstrapValidator({

    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },

      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },

      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  })


  $("#form").on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#form').serialize(),
      success:function(info){
        if (info.success) {
          $('#addModal').modal('hide');
          currentPage = 1;
          render();

          $('#form').data("bootstrapValidator").resetForm(true);
          $('#dropdownText').text("请选择一级分类");
          $('#imgBox img').attr("src","./images/none.png")
        }
      }
    })
  })


})
 
