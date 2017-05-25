/**
 * Created by dell on 2017/3/25.
 */
$(function () {

    $(".portset").click(function () {
        $(this).next(".setWrapXl").show()
        $(this).addClass("portsetB")
        $(this).parents(".setWrap").siblings().find(".portset").removeClass("portsetB")
        $(this).parents(".setWrap").siblings().find(".setWrapXl").hide()
    })

    // $(".dropdown-menu li a").click(function () {
    //     var text=$(this).text()
    //     $(this).parents(".threatAnalListt").find("input").val(text)
    // })
})