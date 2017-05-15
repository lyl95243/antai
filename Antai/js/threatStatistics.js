/**
 * Created by dell on 2017/3/16.
 */
$(function () {

    function laydatee(i) {
        laydate({
            elem: '#hello'+i,
            format: 'YYYY.MM.DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            choose: function(datas){ //选择日期完毕的回调
                console.log(datas);
            }
        })
    }
    laydatee(1)
    laydatee(2)
    // $(".dropdown-menu li a").click(function () {
    //     var text=$(this).text()
    //     $(this).parents(".threatAnalListt").find("input").val(text)
    // })


})