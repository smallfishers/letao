$(function(){
  var currentPage = 1;
  var pageSize = 3;
  var picArr = [];
  render();

  function render(){
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType:"json",
      success:function(info){
        var htmlStr = template("productTpl",info);
        $("tbody").html(htmlStr);


        //分页开始
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil( info.total / info.size ),
          currentPage: info.page,
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
    $("#addModal").modal("show");

    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page: 1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        var htmlStr = template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
    
  });

  $(".dropdown-menu").on("click","a",function(){
    var txt = $(this).text();
    $("#dropdownText").text(txt);

    var id = $(this).data("id");
    $('[name="brandId"]').val(id);
    $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID");
  });


  $("#fileupload").fileupload({
    dataType:'json',
    done:function(e,data){
      var picObj = data.result;
      var picUrl = picObj.picAddr;

      picArr.unshift( picObj );
      $("#imgBox").prepend('<img src="'+ picUrl +'" style="height: 100px" alt="">');

      
      if(picArr.length>3){
        picArr.pop();
        $("#imgBox img:last-of-type").remove()
      }
      if(picArr.length===3){
        $("form").data("bootstrapValidator").updateStatus("picStatus", "VALID" );
      }
    }
  });



  $("#form").bootstrapValidator({
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },

      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },

      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },

      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存数量"
          },

          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入非零开头的数字'
          }
        }
      },

      size: {
        validators: {
          notEmpty: {
            message: "请输入尺码"
          },
// xx-xx 的格式,  xx两位数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式,  xx两位数字'
          }
        }
      },

      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },

      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },

      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }

    }
  });

  $('#form').on("success.form.bv", function( e ){
    e.preventDefault();
    var params = $("form").serialize();
    params += "&picName1=" + picArr[0].picName +"&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName +"&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName +"&picAddr3=" + picArr[2].picAddr;

    $.ajax({
      type:'post',
      url: "/product/addProduct",
      data:params,
      dataType:"json",
      success:function(info){
        if(info.success){
          $('#addModal').modal("hide");

          currentPage = 1;
          render();
          $("form").data("bootstrapValidator").resetForm(true);
          $("dropdownText").text("请选择二级分类");
          $("#imgBox img").remove();
          picArr = [];
        }
      }
    })
  })




})