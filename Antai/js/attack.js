/**
 * Created by dell on 2017/3/20.
 */
$(function () {
    //
    // 偏移时间增减
var inputValue=$(".pianYi input").val()
    $(".up").click(function () {
        inputValue++
        $(".pianYi input").val(inputValue)
    })
    $(".down").click(function () {
        inputValue--
        if(inputValue<=0){
            inputValue=0
        }
        $(".pianYi input").val(inputValue)
    })


})