/**
 * Created by dell on 2017/3/15.
 */

$(function () {
    $(".user input").focus(function () {
        $(this).parents(".user").addClass("hqjd");
        })
    $(".user input").blur(function () {
        $(this).parents(".user").removeClass("hqjd")
    })
      var i=0;
    setInterval(function () {
        i++
        if(i>11){
            i=0
        }
        $(".left div").eq(i).addClass("shanD").siblings().removeClass("shanD")
    },900)

    $(".loginBtn").click(function () {
        var userName=$("#userName").val();
        var passWord=$("#pwd").val();

        if(userName==""||passWord==""){
            if(userName==""){
                alert("用户名不能为空");
                return false
            }
            if(passWord==""){
                alert("密码不能为空")
                return false
            }
        }else{
            $("#form1").submit()
        }

    })
})