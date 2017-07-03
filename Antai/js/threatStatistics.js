/**
 * Created by dell on 2017/3/16.
 */
$(function () {

    function laydatee(i) {
        laydate({
            elem: '#hello' + i,
            format: 'YYYY.MM.DD hh:mm:ss', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            choose: function (datas) { //选择日期完毕的回调
                // console.log(datas);
            }
        })
    }

    laydatee(1)
    laydatee(2)
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

    // 威胁攻击事件统计
    function attEvT() {
        Ajax(
            "/smarteye/api/search/security/pagestats",
            "get",
            "json",
            "",
            false,
            function (result) {
                $(".threatWrap .threatList").eq(0).find(".num").html(result.attks)
                $(".threatWrap .threatList").eq(1).find(".num").html(result.servs)
                $(".threatWrap .threatList").eq(2).find(".num").html(result.attkTypes)
                $(".threatWrap .threatList").eq(3).find(".num").html(result.protocols)
            }
        )
    }
    attEvT()
    // setInterval(function () {
    //     attEvT()
    // },1000)
    // 威胁事件分析表格
    var evenPageTimer,chaxunPageTimer,chaxunTimer,evenTimer;  //定时器
    function evenTab() {
        Ajax(
            "/smarteye/api/search/security/events?startTime=&endTime=&attkIP=&attkType=&proto=&level=-1&page=1&pageSize=10",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var arrResult = eval(result.results);
                // console.log(arrResult);
                var tb = $("#tablee");
                tb.html("");
                var tableTh = '<tr><th>最早攻击时间</th><th>最近攻击时间</th><th>黑客国家信息</th><th>攻击IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>攻击次数</th><th>深度分析</th></tr>';
                // var trr = document.createElement("tr");
                // trr.innerHTML = (tableTh);
                tb.append(tableTh);
                $.each(arrResult, function (i) {
                    var levell = "";
                    if (arrResult[i].level == 1) {
                        levell = "低级威胁"
                    } else if (arrResult[i].level == 2) {
                        levell = "中级威胁"
                    } else {
                        levell = "高级威胁"
                    }
                    var imgSrc = "";
                    if (arrResult[i].location == "") {
                        imgSrc = "image/flags/CN.png"
                    } else {
                        imgSrc = "image/flags/" + arrResult[i].location + ".png"
                    }
                    var tableCon = '<tr><td>' + arrResult[i].attkStartTime + '</td>' +
                        '<td>' + arrResult[i].attkEndTime + '</td>' +
                        '<td class="tdImg"><img src="' + imgSrc + '">' + arrResult[i].country + '</td>' +
                        '<td>' + arrResult[i].attkIP + '</td>' +
                        '<td>' + arrResult[i].protos + '</td>' +
                        '<td>' + arrResult[i].types + '</td>' +
                        '<td>' + levell + '</td>' +
                        '<td>' + arrResult[i].attkNum + '</td>' +
                        '<td> <a href="JavaScript:" class="trace">追踪</a></td></tr>';
                    // var tr = document.createElement("tr");
                    // tr.innerHTML = tableCon;
                    // console.log(tr);
                    tb.append(tableCon);
                    var tbb = $("#tablee");
                    tbb.replaceAll(tb);
                    var height = $(".rightC").height();
                    $(".leftNav").height(height)
                });
                // 点击追踪
                $(".table").delegate("tr .trace", "click", function () {

                    var index = $(this).parents("tr").index() - 1;

                    var attkStartTime = arrResult[index].attkStartTime;
                    var attkEndTime = arrResult[index].attkEndTime;
                    var attkIP = arrResult[index].attkIP;
                    var country = arrResult[index].country;
                    var types = $(".evenTypes").val();
                    var protos = $(".protos").val();
                    if($(".evenTypes").val()==$(".evenTypes").attr("placeholder")){
                        types=""
                    };
                    if($(".protos").val()==$(".protos").attr("placeholder")){
                        protos=""
                    }
                    var level;
                    // console.log($(".level").val());
                    if ($(".level").val() == "低级威胁") {
                        level = 1
                    } else if ($(".level").val() == "中级威胁") {
                        level = 2
                    } else if ($(".level").val() == "高级威胁") {
                        level = 3
                    } else {
                        level = -1
                    }
                    window.open("hackersTrack.html?attkStartTime=" + attkStartTime + "&attkEndTime=" + attkEndTime + "&attkIP=" + attkIP + "&level=" + level + "&types=" + types + "&protos=" + protos + "&country=" + country + "", "_self")
                })
                var totalCount = result.count; // 总条数
                var currentPage = result.curPage; // 当前页
                var pageCount = result.pageCount;
                var pageSize = 10;  // 每页条数
                $(".pagez span").html(pageCount)
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
                           clearInterval(evenPageTimer)
                           function evenTabPage() {
                               Ajax(
                                   "/smarteye/api/search/security/events?startTime=&endTime=&attkIP=&attkType=&proto=&level=-1&page=" + page + "&pageSize=" + pageSize + "",
                                   "get",
                                   "json",
                                   "",
                                   false,
                                   function (result) {
                                       var arrResult = eval(result.results)
                                       tb.html("");
                                       var tableTh = '<tr><th>最早攻击时间</th><th>最近攻击时间</th><th>黑客国家信息</th><th>攻击IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>攻击次数</th><th>深度分析</th></tr>';
                                       // var trr = document.createElement("tr");
                                       // trr.innerHTML = (tableTh);
                                       // $(".table tr:first-child").addClass("trr");
                                       tb.append(tableTh);

                                       $.each(arrResult, function (i) {
                                           var levell = "";
                                           if (arrResult[i].level == 1) {
                                               levell = "低级威胁"
                                           } else if (arrResult[i].level == 2) {
                                               levell = "中级威胁"
                                           } else {
                                               levell = "高级威胁"
                                           }
                                           var imgSrc = "";
                                           if (arrResult[i].location == "") {
                                               imgSrc = "image/flags/CN.png"
                                           } else {
                                               imgSrc = "image/flags/" + arrResult[i].location + ".png"
                                           }
                                           var tableCon = '<tr><td>' + arrResult[i].attkStartTime + '</td>' +
                                               '<td>' + arrResult[i].attkEndTime + '</td>' +
                                               '<td class="tdImg"><img src="' + imgSrc + '">' + arrResult[i].country + '</td>' +
                                               '<td>' + arrResult[i].attkIP + '</td>' +
                                               '<td>' + arrResult[i].protos + '</td>' +
                                               '<td>' + arrResult[i].types + '</td>' +
                                               '<td>' + levell + '</td>' +
                                               '<td>' + arrResult[i].attkNum + '</td>' +
                                               '<td> <a href="JavaScript:" class="trace">追踪</a></td></tr>';

                                           // var tr = document.createElement("tr");
                                           // tr.innerHTML = tableCon;
                                           tb.append(tableCon);
                                           var tbb = $("#tablee");
                                           tbb.replaceAll(tb);
                                       });
                                       tracHover()
                                       // 点击追踪
                                       $(".table").delegate("tr .trace", "click", function () {

                                           var index = $(this).parents("tr").index() - 1;

                                           var attkStartTime = arrResult[index].attkStartTime;
                                           var attkEndTime = arrResult[index].attkEndTime;
                                           var attkIP = arrResult[index].attkIP;
                                           var country = arrResult[index].country;
                                           var types = $(".evenTypes").val();
                                           var protos = $(".protos").val();
                                           var level;
                                           // console.log($(".level").val());
                                           if ($(".level").val() == "低级威胁") {
                                               level = 1
                                           } else if ($(".level").val() == "中级威胁") {
                                               level = 2
                                           } else if ($(".level").val() == "高级威胁") {
                                               level = 3
                                           } else {
                                               level = -1
                                           }
                                           window.open("hackersTrack.html?attkStartTime=" + attkStartTime + "&attkEndTime=" + attkEndTime + "&attkIP=" + attkIP + "&level=" + level + "&types=" + types + "&protos=" + protos + "&country=" + country + "", "_self")
                                       })
                                   }
                               )
                           }
                           evenTabPage();
                           clearInterval(evenTimer);clearInterval(chaxunPageTimer);clearInterval(chaxunTimer)
                           // evenPageTimer=setInterval(evenTabPage,1000)
                       }
                   }
                   $("#yema").bootstrapPaginator(options)
            }
        )
    }
    evenTab();
    // evenTimer =setInterval(evenTab,1000)
        // 查询筛选项
        $(".chaxun").click(function () {
            var attkStartTime = $(".attkStartTime").val();
            var attkEndTime = $(".attkEndTime").val();
            var attkIP = $(".attkIP").val();
            // console.log(attkIP);
            var evenTypes = $(".evenTypes").val();
            var protos = $(".protos").val();
            var level;
            if ($(".level").val() == "低级威胁") {
                level = 1
            } else if ($(".level").val() == "中级威胁") {
                level = 2
            } else if ($(".level").val() == "高级威胁") {
                level = 3
            } else {
                level = -1
            };
            // console.log(level);
            function chaxunTab() {
                Ajax(
                    "/smarteye/api/search/security/events?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP=" + attkIP + "&attkType=" + evenTypes + "&proto=" + protos + "&level=" + level + "&page=1&pageSize=10",
                    "get",
                    "json",
                    "",
                    false,
                    function (result) {
                        // console.log(result);
                        var arrResult = eval(result.results)
                        var tb = $("#tablee");
                        tb.html("");
                        var tableTh = '<tr><th>最早攻击时间</th><th>最近攻击时间</th><th>黑客国家信息</th><th>攻击IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>攻击次数</th><th>深度分析</th></tr>';
                        // var trr = document.createElement("tr");
                        // trr.innerHTML = tableTh;
                        // $(".table tr:first-child").addClass("trr");
                        tb.append(tableTh);
                        $.each(arrResult, function (i) {
                            var levell = "";
                            if (arrResult[i].level == 1) {
                                levell = "低级威胁"
                            } else if (arrResult[i].level == 2) {
                                levell = "中级威胁"
                            } else {
                                levell = "高级威胁"
                            }
                            var imgSrc = "";
                            if (arrResult[i].location == "") {
                                imgSrc = "image/flags/CN.png"
                            } else {
                                imgSrc = "image/flags/" + arrResult[i].location + ".png"
                            }
                            var tableCon = '<tr><td>' + arrResult[i].attkStartTime + '</td>' +
                                '<td>' + arrResult[i].attkEndTime + '</td>' +
                                '<td class="tdImg"><img src="' + imgSrc + '">' + arrResult[i].country + '</td>' +
                                '<td>' + arrResult[i].attkIP + '</td>' +
                                '<td>' + arrResult[i].protos + '</td>' +
                                '<td>' + arrResult[i].types + '</td>' +
                                '<td>' + levell + '</td>' +
                                '<td>' + arrResult[i].attkNum + '</td>' +
                                '<td> <a href="JavaScript:" class="trace">追踪</a></td></tr>';
                            // var tr = document.createElement("tr");
                            // tr.innerHTML = tableCon;
                            tb.append(tableCon);
                            var tbb = $("#tablee");
                            tbb.replaceAll(tb);
                        });
                        tracHover()
                        // 点击追踪
                        $(".table").delegate("tr .trace", "click", function () {

                            var index = $(this).parents("tr").index() - 1;

                            var attkStartTime = arrResult[index].attkStartTime;
                            var attkEndTime = arrResult[index].attkEndTime;
                            var attkIP = arrResult[index].attkIP;
                            var country = arrResult[index].country;
                            var types = $(".evenTypes").val();
                            var protos = $(".protos").val();
                            var level;
                            // console.log($(".level").val());
                            if ($(".level").val() == "低级威胁") {
                                level = 1
                            } else if ($(".level").val() == "中级威胁") {
                                level = 2
                            } else if ($(".level").val() == "高级威胁") {
                                level = 3
                            } else {
                                level = -1
                            }
                            window.open("hackersTrack.html?attkStartTime=" + attkStartTime + "&attkEndTime=" + attkEndTime + "&attkIP=" + attkIP + "&level=" + level + "&types=" + types + "&protos=" + protos + "&country=" + country + "", "_self")
                        })
                        var totalCount = result.count;
                        var currentPage = result.curPage;
                        var pageCount = result.pageCount;
                        var pageSize = 10;
                        $(".pagez span").html(pageCount);
                        if(pageCount>=1){
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
                                    clearInterval(chaxunPageTimer)
                                    function chaxunPage() {
                                        Ajax(
                                            "/smarteye/api/search/security/events?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP=" + attkIP + "&attkType=" + evenTypes + "&proto=" + protos + "&level=" + level + "&page=" + page + "&pageSize=10",
                                            "get",
                                            "json",
                                            "",
                                            false,
                                            function (result) {
                                                // console.log(1);
                                                var arrResult = eval(result.results)
                                                tb.html("");
                                                var tableTh = '<tr><th>最早攻击时间</th><th>最近攻击时间</th><th>黑客国家信息</th><th>攻击IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>攻击次数</th><th>深度分析</th></tr>';
                                                // var trr = document.createElement("tr");
                                                // trr.innerHTML = (tableTh);
                                                // $(".table tr:first-child").addClass("trr");
                                                tb.append(tableTh);
                                                $.each(arrResult, function (i) {
                                                    var levell = "";
                                                    if (arrResult[i].level == 1) {
                                                        levell = "低级威胁"
                                                    } else if (arrResult[i].level == 2) {
                                                        levell = "中级威胁"
                                                    } else {
                                                        levell = "高级威胁"
                                                    }
                                                    var imgSrc = "";
                                                    if (arrResult[i].location == "") {
                                                        imgSrc = "image/flags/CN.png"
                                                    } else {
                                                        imgSrc = "image/flags/" + arrResult[i].location + ".png"
                                                    }
                                                    var tableCon = '<tr><td>' + arrResult[i].attkStartTime + '</td>' +
                                                        '<td>' + arrResult[i].attkEndTime + '</td>' +
                                                        '<td class="tdImg"><img src="' + imgSrc + '">' + arrResult[i].country + '</td>' +
                                                        '<td>' + arrResult[i].attkIP + '</td>' +
                                                        '<td>' + arrResult[i].protos + '</td>' +
                                                        '<td>' + arrResult[i].types + '</td>' +
                                                        '<td>' + levell + '</td>' +
                                                        '<td>' + arrResult[i].attkNum + '</td>' +
                                                        '<td> <a href="JavaScript:" class="trace">追踪</a></td></tr>';

                                                    // var tr = document.createElement("tr");
                                                    // tr.innerHTML = tableCon;
                                                    tb.append(tableCon);
                                                    var tbb = $("#tablee");
                                                    tbb.replaceAll(tb);
                                                });
                                                tracHover()
                                                // 点击追踪
                                                $(".table").delegate("tr .trace", "click", function () {

                                                    var index = $(this).parents("tr").index() - 1;

                                                    var attkStartTime = arrResult[index].attkStartTime;
                                                    var attkEndTime = arrResult[index].attkEndTime;
                                                    var attkIP = arrResult[index].attkIP;
                                                    var country = arrResult[index].country;
                                                    var types = $(".evenTypes").val();
                                                    var protos = $(".protos").val();
                                                    var level;
                                                    // console.log($(".level").val());
                                                    if ($(".level").val() == "低级威胁") {
                                                        level = 1
                                                    } else if ($(".level").val() == "中级威胁") {
                                                        level = 2
                                                    } else if ($(".level").val() == "高级威胁") {
                                                        level = 3
                                                    } else {
                                                        level = -1
                                                    }
                                                    window.open("hackersTrack.html?attkStartTime=" + attkStartTime + "&attkEndTime=" + attkEndTime + "&attkIP=" + attkIP + "&level=" + level + "&types=" + types + "&protos=" + protos + "&country=" + country + "", "_self")
                                                })
                                            }
                                        )
                                    };
                                    chaxunPage();
                                    clearInterval(chaxunTimer);clearInterval(evenPageTimer);clearInterval(evenTimer)
                                    // chaxunPageTimer=setInterval(chaxunPage,1000)
                                }
                            };
                            $("#yema").bootstrapPaginator(options)
                        }
                    }
                )
            }
            chaxunTab();
             clearInterval(evenTimer)
            // if(attkStartTime==""&&attkEndTime==""&&attkIP==""&&evenTypes==""&&protos==""&&$(".level").val()==""){
            //     clearInterval(evenPageTimer);clearInterval(chaxunPageTimer);clearInterval(chaxunTimer);
            //     evenTimer =setInterval(evenTab,1000)
            // }else {
            //     clearInterval(evenTimer);clearInterval(evenPageTimer);clearInterval(chaxunPageTimer);
            //     chaxunTimer=setInterval(chaxunTab,1000)
            // }
        })
    function tracHover() {
        // $(".trace").hover(function () {
        //     $(this).css({
        //         background:"#3a8cc3"
        //     })
        // },function () {
        //     $(this).css({
        //         background:"url('image/traceBg.png')"
        //     })
        // })
    };
    tracHover()
})

