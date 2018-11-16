// NProgress.start();
$.ajax()



$(document).ajaxStart(function(){
  NProgress.start();
});

$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },300);
})

$(function(){
  //功能1：导航点击切换
  $('.lt_aside .category').click(function(){
    $(this).next().stop().slideToggle();
  });


  //功能2: 左侧菜单点击切换
  $(".lt_topbar .icon_left").click(function(){
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
  })


  //功能3：退出功能
  $(".lt_topbar .icon_right").click(function(){
    $('#logoutModal').modal("show");
  });

  $("#logoutBtn").click(function(){
    $.ajax({
      type: "get",
      dataType: 'json',
      url: "/employee/employeeLogout",
      success: function(info){
        if (info.success) {
          location.href = "login.html";
        }
      }
    })
  });




})