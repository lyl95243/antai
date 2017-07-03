/**
 * Created by dell on 2017/3/22.
 */
$(function () {
    var esID=getQueryString("esID");
    var index=getQueryString("indexL");
    var type=getQueryString("type");
    Ajax(
        "/smarteye/api/search/security/mailDetails?esID="+esID+"&index="+index+"&type="+type+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            $(".title p").html(result.title);
            $(".date p").html(result.date);
            $(".mailForm p").html(result.mailFrom);
            $(".mailTo p").html(result.mailTo);
            var mailCC=eval(result.mailCC);  // 抄送
            $.each(mailCC,function(i){
                var mailCCLi=document.createElement("li");
                var mailCCLiCon='<p>'+mailCC[i]+'</p><div class="traceNew">跟踪通信信息</div>'
                mailCCLi.append(mailCCLiCon);
                $(".mailCC>ul").html(mailCCLi);
            })
            var attachments=eval(result.attachments);  //附件
            $(".attachments p span").html(attachments.length+"个");
            if(attachments.length!=0){
                $(".attachments p a").html("("+attachments[0].fname+"、"+attachments[1].fname+")等");
                $.each(attachments,function(i){
                    var attachmentsLiCon='<li><span>'+attachments[i].fname+'</span><a href="/smarteye/api/search/security/download?path='+attachments[i].path+'&fname='+attachments[i].fname+'">下载</a></li>';
                    $(".rightConB>ul").append(attachmentsLiCon)
                })
            }

            var content=eval(result.content);
            var mailContent2=return2Br(content.mailContent);
            var mailContent3=return3Br(mailContent2);
            var mailContent=returnBr(mailContent3);
            if(content.type=="text"){
                $(".rightConM").html(mailContent)
            }else if(content.type=="html"){
                $(".rightConM").html(content.mailContent)
            }
            function returnBr(str) {
                return str.replace(/\n/g,"<br/><br/>");
            }
            function return2Br(str) {
                return str.replace(/\</g,"&lt");
            }
            function return3Br(str) {
                return str.replace(/\>/g,"&gt");
            }
        }
    );
    $(".mailForm>.traceNew").click(function () {
        var mailAd=$(this).prev("p").html();
        window.open("emailTrace.html?mail="+mailAd+"","_self")
    });
    $(".mailTo>.traceNew").click(function () {
        var mailAd=$(this).prev("p").html();
        window.open("emailTrace.html?mail="+mailAd+"","_self")
    });
    $(".mailCC ul").delegate("li .traceNew").click(function () {
        var mailAd=$(this).prev("p").html();
        window.open("emailTrace.html?mail="+mailAd+"","_self")
    })

    var height = $(".rightC").height();
    $(".leftNav").height(height);
})
