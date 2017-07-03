/**
 * Created by dell on 2017/3/20.
 */
function chakan() {
    // console.log(1);
}
$(function () {
    var attkTime = getQueryString("attkTime");
    var attkIP = getQueryString("attkIP");
    var servIP = getQueryString("servIP");
    var attkTypes = getQueryString("attkTypes");
    var protos=getQueryString("protos");
    var esID=getQueryString("esID");
    var type=getQueryString("type");
    var indexL=getQueryString("indexL");
    // console.log(esID);
    $(".tracee").click(function(){
        if(protos=="SMTP"||protos=="POP3"||protos=="IMAP"){
            window.open("emailDetail.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
        }else {
            window.open("webDetails.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
        }

    })
    $(".tt td").eq(0).html(attkTime);
    $(".tt td").eq(1).html(attkIP);
    $(".tt td").eq(2).html(servIP);
    $(".tt td").eq(3).html(protos);
    $(".tt td").eq(4).html(attkTypes);
    var levell = "";
    if (getQueryString("level") == 1) {
        levell = "低级威胁"
    } else if (getQueryString("level") == 2) {
        levell = "中级威胁"
    } else if (getQueryString("level")==3) {
        levell = "高级威胁"
    } else {
        levell = ""
    }
    $(".tt td").eq(5).html(levell);
    // 偏移时间增减
    var inputValue = $(".pianYi input").val();
    $('.pianYi input').bind('input propertychange', function () {
        inputValue = $(".pianYi input").val()
        // console.log(inputValue);
    });
    $(".up").click(function () {
        inputValue++
        $(".pianYi input").val(inputValue)
    })
    $(".down").click(function () {
        inputValue--
        if (inputValue <= 0) {
            inputValue = 0
        }
        $(".pianYi input").val(inputValue)
    })
    // 攻击点前后日志
    var attkAB=0;
    $(".attkBeP,.attkAfP").click(function () {
        $("this input").attr("checked", "checked");
        $(this).siblings().find("input").attr("checked", false);
        if($(".attkBe").is(':checked')){
            attkAB=1;
        }else if($(".attkAf").is(':checked')){
            attkAB=2;
        }else {
            attkAB=0;
        }
    })

       // 表格数据
       Ajax(
           "/smarteye/api/search/security/relativeLogs?eventTime=" + attkTime + "&attkIP=" + attkIP + "&servIP=" + servIP + "&proto="+protos+"&type=0&interval=3&page=1&pageSize=12",
           "get",
           "json",
           "",
           false,
           function (result) {
               console.log(result);
               var arrResult = eval(result.logs);
               // console.log(arrResult);
               var tb = $("#tablee");
               tb.html("");
               var tableTh = '<tr><th>访问时间</th><th>服务器IP</th><th>利用协议</th><th>是否攻击</th><th>深度分析</th></tr>';
               // var trr = document.createElement("tr");
               // trr.innerHTML = tableTh;
               tb.append(tableTh);
               $.each(arrResult, function (i) {
                   var isAttk="";
                   if(arrResult[i].isAttack==true){
                       isAttk="是";
                   }else{
                       isAttk="否"
                   }
                   var tableCon = '<tr><td>' + arrResult[i].accessTime + '</td>' +
                       '<td>' + arrResult[i].servIP + '</td>' +
                       '<td>'+arrResult[i].protocol+'</td><td>'+isAttk+'</td>' +
                       '<td><a href="JavaScript:" class="trace">查看详情</a></td></tr>'
                   // var tr = document.createElement('tr');
                   // tr.innerHTML = tableCon;
                   tb.append(tableCon);
                   var height = $(".rightC").height();
                   $(".leftNav").height(height);
                   // console.log(esID);
                   // console.log(arrResult[i].esID);
                   if(arrResult[i].esID==esID){
                       $("#tablee tbody tr").eq(i+1).css({background:"#8c2b2b",color:"white"});
                       $("#tablee tbody tr").eq(i+1).find("td a").css({color:"white"});
                   };
                   if(arrResult[i].isAttack==true&&arrResult[i].esID!=esID){
                       // console.log(i);
                       $("#tablee tbody tr").eq(i+1).css({background:"#85A919",color:"white"});
                       $("#tablee tbody tr").eq(i+1).find("td a").css({color:"white"});
                   }

               });
               // 点击查看详情
               $(".table").delegate("tr .trace","click",function () {

                   var index=$(this).parents("tr").index()-1;
                   // console.log(index);
                   var esID=arrResult[index].esID;
                   var indexL=arrResult[index].index;
                   var type=arrResult[index].type;
                   // console.log(esID);
                   if(protos=="SMTP"||protos=="POP3"||protos=="IMAP"){
                       window.open("emailDetail.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
                   }else{
                       window.open("webDetails.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
                   }
               })
               var totalCount = result.count;
               var currentPage = result.curPage;
               var pageSize = 12;
               var pageCount = result.pageCount;
               $(".pagez span").html(pageCount);
               var options = {
                   bootstrapMajorVersion: 2,
                   currentPage: currentPage,
                   totalPages: pageCount,
                   numberOfPages: 5,
                   itemTexts: function (type, page, current) {
                       switch (type) {
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
                   }, onPageClicked: function (event, originaEvent, type, page) {
                       // /* 当前页*/        $(".paged span").html(page)
                       Ajax(
                           "/smarteye/api/search/security/relativeLogs?eventTime=" + attkTime + "&attkIP=" + attkIP + "&servIP=" + servIP + "&proto=&type=0&interval=3&page="+page+"&pageSize=12",
                           "get",
                           "json",
                           "",
                           false,
                           function (result) {
                               var arrResult = eval(result.logs);
                               // console.log(arrResult);
                               var tb = $("#tablee");
                               tb.html("");
                               var tableTh = '<tr><th>访问时间</th><th>服务器IP</th><th>利用协议</th><th>是否攻击</th><th>深度分析</th></tr>';
                               // var trr = document.createElement("tr");
                               // trr.innerHTML = tableTh;
                               tb.append(tableTh);
                               $.each(arrResult, function (i) {
                                   var isAttk="";
                                   if(arrResult[i].isAttack==true){
                                       isAttk="是";
                                   }else{
                                       isAttk="否"
                                   }
                                   var tableCon = '<tr><td>' + arrResult[i].accessTime + '</td>' +
                                       '<td>' + arrResult[i].servIP + '</td>' +
                                       '<td>'+arrResult[i].protocol+'</td><td>'+isAttk+'</td>' +
                                       '<td><a href="JavaScript:" class="trace">查看详情</a></td></tr>'
                                   // var tr = document.createElement('tr');
                                   // tr.innerHTML = tableCon;
                                   tb.append(tableCon);
                                   if(arrResult[i].esID==esID){
                                       $("#tablee tbody tr").eq(i+1).css({background:"#8c2b2b",color:"white"});
                                       $("#tablee tbody tr").eq(i+1).find("td a").css({color:"white"});
                                   };
                                   if(arrResult[i].isAttack==true&&arrResult[i].esID!=esID){
                                       // console.log(i);
                                       $("#tablee tbody tr").eq(i+1).css({background:"#85A919",color:"white"});
                                       $("#tablee tbody tr").eq(i+1).find("td a").css({color:"white"});
                                   }
                               });
                               // 点击查看详情
                               $(".table").delegate("tr .trace","click",function () {
                                   var index=$(this).parents("tr").index()-1;
                                   var esID=arrResult[index].esID;
                                   var indexL=arrResult[index].index;
                                   var type=arrResult[index].type;
                                   if(protos=="SMTP"||protos=="POP3"||protos=="IMAP"){
                                       window.open("emailDetail.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
                                   }else{
                                       window.open("webDetails.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
                                   }
                               })
                           }
                       )

                   }
               };
               $("#yema").bootstrapPaginator(options)
           }
       )
       // 点击筛选
       $(".chaxun").click(function () {
           Ajax(
               "/smarteye/api/search/security/relativeLogs?eventTime=" + attkTime + "&attkIP=" + attkIP + "&servIP=" + servIP + "&proto=&type="+attkAB+"&interval="+inputValue+"&page=1&pageSize=12",
               "get",
               "json",
               "",
               false,
               function (result) {
                   // console.log(result);
                   var arrResult=eval(result.logs);
                   var tb = $("#tablee");
                   tb.html("");
                   var tableTh = '<tr><th>访问时间</th><th>服务器IP</th><th>利用协议</th><th>是否攻击</th><th>深度分析</th></tr>';
                   // var trr = document.createElement("tr");
                   // trr.innerHTML = tableTh;
                   tb.append(tableTh);
                   $.each(arrResult, function (i) {
                       var isAttk="";
                       if(arrResult[i].isAttack==true){
                           isAttk="是";
                       }else{
                           isAttk="否"
                       }
                       var tableCon = '<tr><td>' + arrResult[i].accessTime + '</td>' +
                           '<td>' + arrResult[i].servIP + '</td>' +
                           '<td>'+arrResult[i].protocol+'</td><td>'+isAttk+'</td>' +
                           '<td><a href="JavaScript:" class="trace">查看详情</a></td></tr>'
                       // var tr = document.createElement('tr');
                       // tr.innerHTML = tableCon;
                       tb.append(tableCon);
                       if(arrResult[i].esID==esID){
                           $("#tablee tbody tr").eq(i+1).css({background:"#8c2b2b",color:"white"});
                           $("#tablee tbody tr").eq(i+1).find("td a").css({color:"white"});
                       };
                       if(arrResult[i].isAttack==true&&arrResult[i].esID!=esID){
                           console.log(i);
                           $("#tablee tbody tr").eq(i+1).css({background:"#85A919",color:"white"});
                           $("#tablee tbody tr").eq(i+1).find("td a").css({color:"white"});
                       }
                   });
                   // 点击查看详情
                   $(".table").delegate("tr .trace","click",function () {
                       // console.log(2);
                       var index=$(this).parents("tr").index()-1;
                       var esID=arrResult[index].esID;
                       var indexL=arrResult[index].index;
                       var type=arrResult[index].type;
                       if(protos=="SMTP"||protos=="POP3"||protos=="IMAP"){
                           window.open("emailDetail.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
                       }else{
                           window.open("webDetails.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
                       }
                   })
                   var totalCount = result.count;
                   var currentPage = result.curPage;
                   var pageSize = 12;
                   var pageCount = result.pageCount;
                   $(".pagez span").html(pageCount);
                   var options = {
                       bootstrapMajorVersion: 2,
                       currentPage: currentPage,
                       totalPages: pageCount,
                       numberOfPages: 5,
                       itemTexts: function (type, page, current) {
                           switch (type) {
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
                       }, onPageClicked: function (event, originaEvent, type, page) {
                           Ajax(
                               "/smarteye/api/search/security/relativeLogs?eventTime=" + attkTime + "&attkIP=" + attkIP + "&servIP=" + servIP + "&proto=&type="+attkAB+"&interval="+inputValue+"&page="+page+"&pageSize=12",
                               "get",
                               "json",
                               "",
                               false,
                               function (result) {
                                   // console.log(result);
                                   var arrResult = eval(result.logs);
                                   // console.log(arrResult);
                                   var tb = $("#tablee");
                                   tb.html("");
                                   var tableTh = '<tr><th>访问时间</th><th>服务器IP</th><th>利用协议</th><th>是否攻击</th><th>深度分析</th></tr>'
                                   // var trr = document.createElement("tr");
                                   // trr.innerHTML = tableTh;
                                   tb.append(tableTh);
                                   $.each(arrResult, function (i) {
                                       var isAttk="";
                                       if(arrResult[i].isAttack==true){
                                           isAttk="是";
                                       }else{
                                           isAttk="否"
                                       }
                                       var tableCon = '<tr><td>' + arrResult[i].accessTime + '</td>' +
                                           '<td>' + arrResult[i].servIP + '</td>' +
                                           '<td>'+arrResult[i].protocol+'</td><td>'+isAttk+'</td>' +
                                           '<td><a href="JavaScript:" class="trace">查看详情</a></td></tr>'
                                       // var tr = document.createElement('tr');
                                       // tr.innerHTML = tableCon;
                                       tb.append(tableCon);
                                       if(arrResult[i].esID==esID){
                                           $("#tablee tbody tr").eq(i+1).css({background:"#8c2b2b",color:"white"});
                                           $("#tablee tbody tr").eq(i+1).find("td a").css({color:"white"});
                                       };
                                       if(arrResult[i].isAttack==true&&arrResult[i].esID!=esID){
                                           console.log(i);
                                           $("#tablee tbody tr").eq(i+1).css({background:"#85A919",color:"white"});
                                           $("#tablee tbody tr").eq(i+1).find("td a").css({color:"white"});
                                       }
                                   });
                                   // 点击查看详情
                                   $(".table").delegate("tr .trace","click",function () {
                                       var index=$(this).parents("tr").index()-1;
                                       var esID=arrResult[index].esID;
                                       var indexL=arrResult[index].index;
                                       var type=arrResult[index].type;
                                       if(protos=="SMTP"||protos=="POP3"||protos=="IMAP"){
                                           window.open("emailDetail.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
                                       }else{
                                           window.open("webDetails.html?esID="+esID+"&indexL="+indexL+"&type="+type+"","_self")
                                       }
                                   })
                               }
                           )

                       }
                   };
                   $("#yema").bootstrapPaginator(options)
               }
           )
       })



})