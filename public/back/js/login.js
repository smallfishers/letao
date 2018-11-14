$(function(){
  $("#form").bootstrapValidator({
    feedbackIcons:{
      //配置校验图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
      
      //配置校验字段
      fields:{
        username:{
          validators:{
            notEmpty:{
              message: '用户名不能为空'
            },
            stringLength:{
              min:2,
              max:6,
              message:'用户名长度必须是2~6位'
            },
            callback:{
              message:'用户名不存在'
            }
          }
        },

        password:{
          validators:{
            notEmpty:{
              message:'密码不能为空'
            },
            stringLength:{
              min:6,
              max:12,
              message:'密码长度必须是6-12位'
            },
            callback:{
              message:'密码错误'
            }
          }
        }
      }
  });
  




})