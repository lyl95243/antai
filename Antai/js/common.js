/**
 * Created by dell on 2017/4/10.
 */
$(function () {
    // if(navigator.userAgent.indexOf("MSIE 6.0")>0||navigator.userAgent.indexOf("MSIE 7.0")>0){
    //     alert("对不起，您的浏览器版本太低，可能会导致您的体验不佳，建议你先升级")
    // }
    // 快速点击页面禁止变蓝
    // document.onselectstart=new Function("return false");

    // 左侧下拉
    var height=$(".rightC").height();
    $(".leftNav").height(height)
    $(".even").click(function () {
        $(this).next(".evenXl").slideToggle()
        $(this).parents().siblings().find(".evenXl").slideUp()
    })
    // 左侧导航收起展开
    var i=1
    $(".menu").click(function () {
        i++;
        if(i%2==0){
            $(".leftNav").addClass("hideNav").removeClass("showNav")
            $(".rightC").addClass("showRight").removeClass("hideRight")
        }else{
            $(".rightC").removeClass("showRight").addClass("hideRight")
            $(".leftNav").removeClass("hideNav").addClass("showNav")
        }
    })
    $(".dropdown-menu").delegate("li a","click",function () {
        var text=$(this).text()
        $(this).parents(".threatAnalList,.threatAnalListt").find("input").val(text);
        $(this).parents(".addManC").find("input").val(text)

    })


})

function Ajax(url, type, datatype, param,async, callbackSuccess, callbackErr) {
    $.ajax({
        url: url,
        type: type,
        dataType: datatype,
        data: param,
        async:async,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        // beforeSend: function () {
        //
        // },
        success: callbackSuccess,
        error: callbackErr,
    });
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var l = decodeURI(window.location.search);
    var r = l.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
