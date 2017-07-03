/**
 * Created by dell on 2017/3/22.
 */
$(function () {
    var height=$(".rightC").height();
    $(".leftNav").height(height);

    var mail=getQueryString("mail");
    console.log(mail);
    // 邮件通信追踪
    Ajax(
        "/smarteye/api/search/mail/relativeStat?mail="+mail+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            // console.log(result);
            $(".mailTotal").html(result.total);
            $(".mailSend").html(result.send);
            $(".mailRecieve").html(result.recieve);
            $(".mailAttack").html(result.attack);
        }
    )
    // 邮件通信列表
    Ajax(
        "/smarteye/api/search/mail/relative?mail="+mail+"&page=1&pageSize=10",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            var arrResult=eval(result.mails);
            // console.log(arrResult);
            var tb=$("#mailTraceTable");
            tb.html("");
            var tableTh='<tr><th style="width:10%;">通信时间</th><th style="width:10%;">源IP</th><th style="width:10%;">目的IP</th><th style="width:20%;">通信对象</th><th style="width:30%;">通信主题</th><th style="width:6%;">通信方式</th><th style="width:6%;">事件类型</th><th style="width:8%;">深度分析</th></tr>';
            tb.append(tableTh);
            $.each(arrResult,function (i) {
                var tableCon='<tr><td>'+arrResult[i].time+'</td>' +
                    '<td>'+arrResult[i].srcIP+'</td>' +
                    '<td>'+arrResult[i].dstIP+'</td>' +
                    '<td>'+arrResult[i].mails+'</td>' +
                    '<td>'+arrResult[i].title+'</td>' +
                    '<td>'+arrResult[i].comType+'</td>' +
                    '<td>'+arrResult[i].eventType+'</td>' +
                    '<td><button class="trace">查看详情</button></td></tr>';
                tb.append(tableCon);
            });
            //点击查看详情
            $(".table").delegate("tr .trace","click",function () {

                var index=$(this).parents("tr").index()-1;
                // console.log(index);
                var esID=arrResult[index].esID;
                var indexL=arrResult[index].index;
                var type=arrResult[index].type;
                // console.log(esID);
                window.open("emailDetail.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
            })
            var totalCount=result.count;
            var currentPage=result.curPage;
            var pageCount=result.pageCount;
            var pageSize=10;
            $(".pagez span").html(pageCount);
            if(pageCount>=1){
                var options={
                    bootstrapMajorVersion:2,
                    currentPage:currentPage,
                    totalPages:pageCount,
                    numberOfPages:5,
                    itemTexts:function (type,page,current) {
                        switch (type){
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },onPageClicked:function (event,originaEnent,type,page) {
                        Ajax(
                            "/smarteye/api/search/mail/relative?mail="+mail+"&page="+page+"&pageSize=10",
                            "get",
                            "json",
                            "",
                            false,
                            function (result) {
                                var arrResult=eval(result.mails);
                                console.log(arrResult);
                                var tb=$("#mailTraceTable");
                                tb.html("");
                                var tableTh='<tr><th>通信时间</th><th>源IP</th><th>目的IP</th><th>通信对象</th><th>通信主题</th><th>通信方式</th><th>事件类型</th><th>深度分析</th></tr>';
                                tb.append(tableTh);
                                $.each(arrResult,function (i) {
                                    var tableCon='<tr><td>'+arrResult[i].time+'</td>' +
                                        '<td>'+arrResult[i].srcIP+'</td>' +
                                        '<td>'+arrResult[i].dstIP+'</td>' +
                                        '<td>'+arrResult[i].mails+'</td>' +
                                        '<td>'+arrResult[i].title+'</td>' +
                                        '<td>'+arrResult[i].comType+'</td>' +
                                        '<td>'+arrResult[i].eventType+'</td>' +
                                        '<td><button class="trace">查看详情</button></td></tr>';
                                    tb.append(tableCon);
                                });
                                //点击查看详情
                                $(".table").delegate("tr .trace","click",function () {

                                    var index=$(this).parents("tr").index()-1;
                                    // console.log(index);
                                    var esID=arrResult[index].esID;
                                    var indexL=arrResult[index].index;
                                    var type=arrResult[index].type;
                                    // console.log(esID);
                                    window.open("emailDetail.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
                                })
                            }
                        )
                    }
                };
                $("#yema").bootstrapPaginator(options)
            }
        }
    )
})