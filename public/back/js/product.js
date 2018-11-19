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

  $(".dropdowm-menu").on("click","a",function(){
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


    }
  })




})