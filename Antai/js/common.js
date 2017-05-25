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

    // 事件威胁下拉选项
    var oAjax=new XMLHttpRequest();
    oAjax.open("GET","RuleTypes.txt",true);
    oAjax.send(null);
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            if(oAjax.status==200){
                var text=oAjax.responseText
                var arrText=text.split("\n");
                for(var i=0;i<arrText.length;i++){
                    var leixing=arrText[i].split(",")[0];
                    var oLi=document.createElement("li");
                    var oA=document.createElement("a");
                    var oevenL=document.getElementById("evenL");
                    oA.href="javascript:";
                    oA.innerHTML=leixing
                    oLi.appendChild(oA);
                    oevenL.appendChild(oLi);
                }
            }else{
                console.log("请求失败");
            }
        }
    }

        var inputPlaceHolder;
        $("input").focus(function () {
            // console.log(1);
            inputPlaceHolder=$(this).attr("placeholder")
            $(this).prop("placeholder", "");
            // $(this).val("")
        })
        $("input").blur(function () {
            $(this).prop("placeholder",inputPlaceHolder)
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