/**
 * Created by dell on 2017/3/20.
 */

$(function () {

    // 起始结束时间
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
    laydatee(3)
    laydatee(4)

    // 事件威胁下拉选项
    var oAjax = new XMLHttpRequest();
    oAjax.open("GET", "RuleTypes.txt", true);
    oAjax.send(null);
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status == 200) {
                var text = oAjax.responseText
                var arrText = text.split("\n");
                for (var i = 0; i < arrText.length; i++) {
                    var leixing = arrText[i].split(",")[0];
                    var oLi = document.createElement("li");
                    var oA = document.createElement("a");
                    var oevenL = document.getElementById("evenL");
                    oA.href = "javascript:";
                    oA.innerHTML = leixing
                    oLi.appendChild(oA);
                    oevenL.appendChild(oLi);
                }
            } else {
                console.log("请求失败");
            }
        }
    }

    var inputPlaceHolder;
    $("input").focus(function () {
        // console.log(1);
        inputPlaceHolder = $(this).attr("placeholder")
        $(this).prop("placeholder", "");
        // $(this).val("")
    })
    $("input").blur(function () {
        $(this).prop("placeholder", inputPlaceHolder)
    })
// 事件列表tab下内容
    $(".ipC ul li").eq(0).find("span").html(getQueryString('attkIP'));
    $(".ipC ul li").eq(1).find("span").html(getQueryString('country'));
    var attkStartTime = getQueryString("attkStartTime");
    var attkEndTime = getQueryString("attkStartTime");
    var attkIP = getQueryString("attkIP");
    var eventTypes = getQueryString("types");
    var protos = getQueryString("protos");
    var level = getQueryString("level");
    // console.log(level);
    $(".attkStartTime").val(attkStartTime);
    $(".attkEndTime").val(attkEndTime);
    // $(".servIP").val(getQueryString("attkIP"));
    if (eventTypes == "") {
        $(".evenTypes").val() == $(".evenTypes").attr("placeholder");
    } else {
        $(".evenTypes").val(eventTypes);
    }
    ;
    if (protos == "") {
        $(".protos").val() == $(".protos").attr("placeholder");
    } else {
        $(".protos").val(protos);
    }
    ;
    var levell = "";
    // console.log(getQueryString("level"));
    if (getQueryString("level") == 1) {
        levell = "低级威胁"
    } else if (getQueryString("level") == 2) {
        levell = "中级威胁"
    } else if (getQueryString("level") == 3) {
        levell = "高级威胁"
    } else {
        levell = ""
    }
    ;
    if (level == -1) {
        $(".level").val() == $(".level").attr("placeholder");
    } else {
        $(".level").val(levell);
    }
    // 表格数据
    function tableCon() {
        Ajax(
            "/smarteye/api/search/security/eventDetails?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP=" + attkIP + "&servIP=&attkType=" + eventTypes + "&proto=" + protos + "&level=" + level + "&page=1&pageSize=12",
            "get",
            "json",
            "",
            false,
            function (result) {
                // console.log(result);
                var arrResult = eval(result.eventDetailsList);
                // console.log(arrResult);
                var tb = $("#tablee");
                tb.html("");
                var tableTh = '<tr><th>攻击时间</th><th>服务器IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>深度分析</th></tr>';
                // var trr = document.createElement("tr");
                // trr.innerHTML = (tableTh);
                tb.append(tableTh);
                $.each(arrResult, function (i) {

                    var levell = "";
                    if (arrResult[i].level == 1) {
                        levell = "低级威胁"
                    } else if (arrResult[i].level == 2) {
                        levell = "中级威胁"
                    } else if (arrResult[i].level == 3) {
                        levell = "高级威胁"
                    } else {
                        levell = ""
                    }
                    var tableCon = '<tr><td>' + arrResult[i].attkTime + '</td>' +
                        '<td>' + arrResult[i].servIP + '</td>' +
                        '<td>' + arrResult[i].protocol + '</td>' +
                        '<td>' + arrResult[i].attkType + '</td>' +
                        '<td>' + levell + '</td>' +
                        '<td> <a href="JavaScript:" class="trace" style="background:url(\'../image/zhuiz.png\');">查看攻击过程</a></td></tr>';
                    // var tr = document.createElement("tr");
                    // tr.innerHTML = tableCon;
                    tb.append(tableCon);
                    var tbb = $("#tablee");
                    tbb.replaceAll(tb);

                });
                tracHover()
                var height = $(".rightC").height();
                $(".leftNav").height(height)
                // 点击查看攻击过程
                $("#tablee").delegate("tr .trace", "click", function () {

                    var index = $(this).parents("tr").index() - 1;
                    // console.log(index);
                    var attkTime = arrResult[index].attkTime;
                    var servIP = arrResult[index].servIP;
                    var levell = arrResult[index].level;
                    var attkTypes = arrResult[index].attkType;
                    var protos = arrResult[index].protocol;
                    var attkIP = $(".ipC ul li").eq(0).find("span").html()
                    // console.log(attkIP);
                    var esID = arrResult[index].esID;
                    var indexL = arrResult[index].index;
                    var type = arrResult[index].type;
                    // console.log(esID);
                    window.open("attack.html?esID=" + esID + "&indexL=" + indexL + "&type=" + type + "&attkTime=" + attkTime + "&servIP=" + servIP + "&level=" + levell + "&attkTypes=" + attkTypes + "&attkIP=" + attkIP + "&protos=" + protos + "", "_self")
                })
                var totalCount = result.count; // 总条数
                var currentPage = result.curPage; // 当前页
                var pageCount = result.pageCount;
                var pageSize = 12;  // 每页条数
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
                        function tablePage() {
                            Ajax(
                                "/smarteye/api/search/security/eventDetails?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP=" + attkIP + "&servIP=&attkType=" + eventTypes + "&proto=" + protos + "&level=" + level + "&page=" + page + "&pageSize=12",
                                "get",
                                "json",
                                "",
                                false,
                                function (result) {
                                    var arrResult = eval(result.eventDetailsList);
                                    // console.log(arrResult);
                                    tb.html("");
                                    var tableTh = '<tr><th>攻击时间</th><th>服务器IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>深度分析</th></tr>';
                                    // var trr = document.createElement("tr");
                                    // trr.innerHTML = (tableTh);
                                    tb.append(tableTh);

                                    $.each(arrResult, function (i) {
                                        var levell = "";
                                        if (arrResult[i].level == 1) {
                                            levell = "低级威胁"
                                        } else if (arrResult[i].level == 2) {
                                            levell = "中级威胁"
                                        } else if (arrResult[i].level == 3) {
                                            levell = "高级威胁"
                                        } else {
                                            levell = ""
                                        }
                                        var tableCon = '<tr><td>' + arrResult[i].attkTime + '</td>' +
                                            '<td>' + arrResult[i].servIP + '</td>' +
                                            '<td>' + arrResult[i].protocol + '</td>' +
                                            '<td>' + arrResult[i].attkType + '</td>' +
                                            '<td>' + levell + '</td>' +
                                            '<td> <a href="JavaScript:" class="trace" style="background:url(\'../image/zhuiz.png\');">查看攻击过程</a></td></tr>';
                                        // var tr = document.createElement("tr");
                                        // tr.innerHTML = tableCon;
                                        tb.append(tableCon);
                                        var tbb = $("#tablee");
                                        tbb.replaceAll(tb);
                                    });
                                    tracHover()
                                    // 点击查看攻击过程
                                    $("#tablee").delegate("tr .trace", "click", function () {

                                        var index = $(this).parents("tr").index() - 1;
                                        // console.log(index);
                                        var attkTime = arrResult[index].attkTime;
                                        var servIP = arrResult[index].servIP;
                                        var levell = arrResult[index].level;
                                        var attkTypes = arrResult[index].attkType;
                                        var protos = arrResult[index].protocol;
                                        var attkIP = $(".ipC ul li").eq(0).find("span").html()
                                        // console.log(attkIP);
                                        var esID = arrResult[index].esID;
                                        var indexL = arrResult[index].index;
                                        var type = arrResult[index].type;
                                        // console.log(esID);
                                        window.open("attack.html?esID=" + esID + "&indexL=" + indexL + "&type=" + type + "&attkTime=" + attkTime + "&servIP=" + servIP + "&level=" + levell + "&attkTypes=" + attkTypes + "&attkIP=" + attkIP + "&protos=" + protos + "", "_self")
                                    })
                                }
                            )
                        };
                        tablePage();
                    }
                };
                $("#yema").bootstrapPaginator(options)
            }
        )
    }

    tableCon();
    // 查询筛选项
    $("#hackChaX").click(function () {
        var attkStartTime = $(".attkStartTime").val();
        var attkEndTime = $(".attkEndTime").val();
        // var servIP = $(".servIP").val();
        var evenTypes, protos, level;
        if ($(".evenTypes").val() == $(".evenTypes").attr("placeholder")) {
            evenTypes = ""
        } else {
            evenTypes = $(".evenTypes").val();
        }
        if ($(".protos").val() == $(".protos").attr("placeholder")) {
            protos = ""
        } else {
            protos = $(".protos").val();
        }
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
        // console.log(level);
        function chaxunCon() {
            Ajax(
                "/smarteye/api/search/security/eventDetails?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP=" + attkIP + "&servIP=&attkType=" + evenTypes + "&proto=" + protos + "&level=" + level + "&page=1&pageSize=12",
                "get",
                "json",
                "",
                false,
                function (result) {
                    console.log(result);
                    var arrResult = eval(result.eventDetailsList)
                    var tb = $("#tablee");
                    tb.html("");

                    var tableTh = '<tr><th>攻击时间</th><th>服务器IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>深度分析</th></tr>';
                    // var trr = document.createElement("tr");
                    // trr.innerHTML =tableTh;
                    tb.append(tableTh);
                    $.each(arrResult, function (i) {
                        var levell = "";
                        if (arrResult[i].level == 1) {
                            levell = "低级威胁"
                        } else if (arrResult[i].level == 2) {
                            levell = "中级威胁"
                        } else if (arrResult[i].level == 3) {
                            levell = "高级威胁"
                        } else {
                            levell = ""
                        }
                        ;
                        var tableCon = '<tr><td>' + arrResult[i].attkTime + '</td>' +
                            '<td>' + arrResult[i].servIP + '</td>' +
                            '<td>' + arrResult[i].protocol + '</td>' +
                            '<td>' + arrResult[i].attkType + '</td>' +
                            '<td>' + levell + '</td>' +
                            '<td> <a href="JavaScript:" class="trace" style="background:url(\'../image/zhuiz.png\');">查看攻击过程</a></td></tr>';
                        // var tr = document.createElement("tr");
                        // tr.innerHTML = tableCon;
                        tb.append(tableCon);
                        var tbb = $("#tablee");
                        tbb.replaceAll(tb);

                    });
                    tracHover()
                    var height = $(".rightC").height();
                    $(".leftNav").height(height)
                    // 点击查看攻击过程
                    $("#tablee").delegate("tr .trace", "click", function () {

                        var index = $(this).parents("tr").index() - 1;
                        // console.log(index);
                        var attkTime = arrResult[index].attkTime;
                        var servIP = arrResult[index].servIP;
                        var levell = arrResult[index].level;
                        var attkTypes = arrResult[index].attkType;
                        var protos = arrResult[index].protocol;
                        var attkIP = $(".ipC ul li").eq(0).find("span").html()
                        // console.log(attkIP);
                        var esID = arrResult[index].esID;
                        var indexL = arrResult[index].index;
                        var type = arrResult[index].type;
                        // console.log(esID);
                        window.open("attack.html?esID=" + esID + "&indexL=" + indexL + "&type=" + type + "&attkTime=" + attkTime + "&servIP=" + servIP + "&level=" + levell + "&attkTypes=" + attkTypes + "&attkIP=" + attkIP + "&protos=" + protos + "", "_self")
                    })
                    var totalCount = result.count; // 总条数
                    var currentPage = result.curPage; // 当前页
                    var pageSize = 12;  // 每页条数
                    var pageCount = result.pageCount;
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
                            function chaxunPage() {
                                Ajax(
                                    "/smarteye/api/search/security/eventDetails?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP=" + attkIP + "&servIP=&attkType=" + evenTypes + "&proto=" + protos + "&level=" + level + "&page=" + page + "&pageSize=12",
                                    "get",
                                    "json",
                                    "",
                                    false,
                                    function (result) {
                                        // console.log(2);
                                        var arrResult = eval(result.eventDetailsList)
                                        tb.html("");
                                        var tableTh = '<tr><th>攻击时间</th><th>服务器IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>深度分析</th></tr>';
                                        // var trr = document.createElement("tr");
                                        // trr.innerHTML = tableTh;
                                        tb.append(tableTh);

                                        $.each(arrResult, function (i) {
                                            var levell = "";
                                            if (arrResult[i].level == 1) {
                                                levell = "低级威胁"
                                            } else if (arrResult[i].level == 2) {
                                                levell = "中级威胁"
                                            } else if (arrResult[i].level == 3) {
                                                levell = "高级威胁"
                                            } else {
                                                levell = ""
                                            }
                                            var tableCon = '<tr><td>' + arrResult[i].attkTime + '</td>' +
                                                '<td>' + arrResult[i].servIP + '</td>' +
                                                '<td>' + arrResult[i].protocol + '</td>' +
                                                '<td>' + arrResult[i].attkType + '</td>' +
                                                '<td>' + levell + '</td>' +
                                                '<td> <a href="JavaScript:" class="trace" style="background:url(\'../image/zhuiz.png\');">查看攻击过程</a></td></tr>';
                                            // var tr = document.createElement("tr");
                                            // tr.innerHTML = tableCon;
                                            tb.append(tableCon);
                                            var tbb = $("#tablee");
                                            tbb.replaceAll(tb);
                                        });
                                        tracHover()
                                        // 点击查看攻击过程
                                        $("#tablee").delegate("tr .trace", "click", function () {

                                            var index = $(this).parents("tr").index() - 1;
                                            // console.log(index);
                                            var attkTime = arrResult[index].attkTime;
                                            var servIP = arrResult[index].servIP;
                                            var levell = arrResult[index].level;
                                            var attkTypes = arrResult[index].attkType;
                                            var protos = arrResult[index].protocol;
                                            var attkIP = $(".ipC ul li").eq(0).find("span").html()
                                            // console.log(attkIP);
                                            var esID = arrResult[index].esID;
                                            var indexL = arrResult[index].index;
                                            var type = arrResult[index].type;
                                            // console.log(esID);
                                            window.open("attack.html?esID=" + esID + "&indexL=" + indexL + "&type=" + type + "&attkTime=" + attkTime + "&servIP=" + servIP + "&level=" + levell + "&attkTypes=" + attkTypes + "&attkIP=" + attkIP + "&protos=" + protos + "", "_self")
                                        })
                                    }
                                )
                            };
                            chaxunPage();
                        }
                    };
                    $("#yema").bootstrapPaginator(options)
                }
            )
        }

        chaxunCon();
    })
// 流量分析tab下内容
    $("#flowf").click(function () {

        $(".leftNav").height("1490px")
    })
    Ajax(
        "/smarteye/api/search/analysis/streamStat?ip=" + attkIP + "",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            $(".liulfx ul li").eq(0).find("span").html(result.startTime);
            $(".liulfx ul li").eq(1).find("span").html(result.lastTime);
            $(".liulfx ul li").eq(2).find("span").html(result.upBytes);
            $(".liulfx ul li").eq(3).find("span").html(result.downBytes);
            $(".liulfx ul li").eq(4).find("span").html(result.tcpSessions);
            $(".liulfx ul li").eq(5).find("span").html(result.udpSessions);
        }
    )
//     表格数据
    Ajax(
        "/smarteye/api/search/analysis/streams?startTime=&endTime=&ip=" + attkIP + "&port=0&pairIP=&pairPort=0&proto=&page=1&pageSize=10",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            var arrResult = eval(result.results);
            // console.log(arrResult);
            var tb = $("#flowTab");
            tb.html("");
            var tableTh = '<tr><th>会话时间</th><th>端口</th><th>对端IP</th><th>对端端口</th><th>传输协议</th><th>上行流量</th><th>下行流量</th><th>包含攻击数</th><th>深度分析</th></tr>';
            // var trr = document.createElement("tr");
            // trr.innerHTML = (tableTh);
            tb.append(tableTh);
            $.each(arrResult, function (i) {

                var tableCon = '<tr><td>' + arrResult[i].startTime + ' — ' + arrResult[i].lastTime + '</td>' +
                    '<td>' + arrResult[i].port + '</td>' +
                    '<td>' + arrResult[i].pairIP + '</td>' +
                    '<td>' + arrResult[i].pairPort + '</td>' +
                    '<td>' + arrResult[i].protocol + '</td>' +
                    '<td>' + arrResult[i].reqBytes + '</td>' +
                    '<td>' + arrResult[i].resBytes + '</td><td>' + arrResult[i].attackNum + '</td>' +
                    '<td> <a href="JavaScript:" class="trace" style="background:url(\'../image/zhuiz.png\');">查看详情</a></td></tr>';
                // var tr = document.createElement("tr");
                // tr.innerHTML = tableCon;
                tb.append(tableCon);
                var tbb = $("#flowTab");
                tbb.replaceAll(tb);
            });
            tracHover()
            // var height = $(".rightC").height();
            // $(".leftNav").height(height);
            // 点击查看攻击过程
            $("#flowTab").delegate("tr .trace", "click", function () {
                window.open("flowDetail.html", "_self")
            })
            var totalCount = result.count; // 总条数
            var currentPage = result.curPage; // 当前页
            var pageCount = result.pageCount;
            var pageSize = 10;  // 每页条数
            $(".pagezz span").html(pageCount)
            var options = {
                bootstrapMajorVersion: 2,
                currentPage: currentPage,
                totalPages: pageCount,
                numberOfPages: 5,
                itemTexts: function (type, page, current) {
                    // console.log(type);
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
                        "/smarteye/api/search/analysis/streams?startTime=&endTime=&ip=" + attkIP + "&port=0&pairIP=&pairPort=0&proto=&page=" + page + "&pageSize=10",
                        "get",
                        "json",
                        "",
                        false,
                        function (result) {
                            console.log(result);
                            var arrResult = eval(result.results);
                            // console.log(arrResult);
                            tb.html("");
                            var tableTh = '<tr><th>会话时间</th><th>端口</th><th>对端IP</th><th>对端端口</th><th>传输协议</th><th>上行流量</th><th>下行流量</th><th>包含攻击数</th><th>深度分析</th></tr>';
                            // var trr = document.createElement("tr");
                            // trr.innerHTML = (tableTh);
                            tb.append(tableTh);

                            $.each(arrResult, function (i) {
                                var tableCon = '<tr><td>' + arrResult[i].startTime + ' — ' + arrResult[i].lastTime + '</td>' +
                                    '<td>' + arrResult[i].port + '</td>' +
                                    '<td>' + arrResult[i].pairIP + '</td>' +
                                    '<td>' + arrResult[i].pairPort + '</td>' +
                                    '<td>' + arrResult[i].protocol + '</td>' +
                                    '<td>' + arrResult[i].reqBytes + '</td>' +
                                    '<td>' + arrResult[i].resBytes + '</td><td>' + arrResult[i].attackNum + '</td>' +
                                    '<td> <a href="JavaScript:" class="trace" style="background:url(\'../image/zhuiz.png\');">查看详情</a></td></tr>';
                                // var tr = document.createElement("tr");
                                // tr.innerHTML = tableCon;
                                tb.append(tableCon);
                                var tbb = $("#flowTab");
                                tbb.replaceAll(tb);
                            });
                            tracHover()
                            // 点击查看攻击过程
                            $("#flowTab").delegate("tr .trace", "click", function () {

                            })
                        }
                    )
                }
            };
            $("#yemaa").bootstrapPaginator(options)
        }
    )
    // 查询
    $("#flowChaX").click(function () {
        var flowStartTime = $(".flowStartTime").val(),
            flowLastTime = $(".flowLastTime").val(),
            flowPort = $(".flowPort").val(),
            flowPairIP = $(".flowPairIP").val(),
            flowPairPort = $(".flowPairPort").val(),
            flowProto = $(".flowProto").val();
        if(flowPort==""){
            flowPort=0
        };
        if(flowPairPort==""){
            flowPairPort=0
        }
        Ajax(
            "/smarteye/api/search/analysis/streams?startTime=" + flowStartTime + "&endTime=" + flowLastTime + "&ip=" + attkIP + "&port=" + flowPort + "&pairIP=" + flowPairIP + "&pairPort=" + flowPairPort + "&proto=" + flowProto + "&page=1&pageSize=10",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var arrResult = eval(result.results);
                // console.log(arrResult);
                var tb = $("#flowTab");
                tb.html("");
                var tableTh = '<tr><th>会话时间</th><th>端口</th><th>对端IP</th><th>对端端口</th><th>传输协议</th><th>上行流量</th><th>下行流量</th><th>包含攻击数</th><th>深度分析</th></tr>';
                // var trr = document.createElement("tr");
                // trr.innerHTML = (tableTh);
                tb.append(tableTh);
                $.each(arrResult, function (i) {

                    var tableCon = '<tr><td>' + arrResult[i].startTime + ' — ' + arrResult[i].lastTime + '</td>' +
                        '<td>' + arrResult[i].port + '</td>' +
                        '<td>' + arrResult[i].pairIP + '</td>' +
                        '<td>' + arrResult[i].pairPort + '</td>' +
                        '<td>' + arrResult[i].protocol + '</td>' +
                        '<td>' + arrResult[i].reqBytes + '</td>' +
                        '<td>' + arrResult[i].resBytes + '</td><td>' + arrResult[i].attackNum + '</td>' +
                        '<td> <a href="JavaScript:" class="trace" style="background:url(\'../image/zhuiz.png\');">查看详情</a></td></tr>';
                    // var tr = document.createElement("tr");
                    // tr.innerHTML = tableCon;
                    tb.append(tableCon);
                    var tbb = $("#flowTab");
                    tbb.replaceAll(tb);

                });
                tracHover()
                // var height = $(".rightC").height();
                // $(".leftNav").height(height)
                // 点击查看攻击过程
                $("#flowTab").delegate("tr .trace", "click", function () {
                    window.open("flowDetail.html", "_self")
                })
                var totalCount = result.count; // 总条数
                var currentPage = result.curPage; // 当前页
                var pageCount = result.pageCount;
                var pageSize = 10;  // 每页条数
                $(".pagezz span").html(pageCount);
                var options = {
                    bootstrapMajorVersion: 2,
                    currentPage: currentPage,
                    totalPages: pageCount,
                    numberOfPages: 5,
                    itemTexts: function (type, page, current) {
                        console.log(type);
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
                        var flowStartTime = $(".flowStartTime").val(),
                            flowLastTime = $(".flowLastTime").val(),
                            flowPort = $(".flowPort").val(),
                            flowPairIP = $(".flowPairIP").val(),
                            flowPairPort = $(".flowPairPort").val(),
                            flowProto = $(".flowProto").val();
                        if(flowPort==""){
                            flowPort=0
                        };
                        if(flowPairPort==""){
                            flowPairPort=0
                        }
                        Ajax(
                            "/smarteye/api/search/analysis/streams?startTime=" + flowStartTime + "&endTime=" + flowLastTime + "&ip=" + attkIP + "&port=" + flowPort + "&pairIP=" + flowPairIP + "&pairPort=" + flowPairPort + "&proto=" + flowProto + "&page="+page+"&pageSize=10",
                            "get",
                            "json",
                            "",
                            false,
                            function (result) {
                                console.log(result);
                                var arrResult = eval(result.results);
                                // console.log(arrResult);
                                tb.html("");
                                var tableTh = '<tr><th>会话时间</th><th>端口</th><th>对端IP</th><th>对端端口</th><th>传输协议</th><th>上行流量</th><th>下行流量</th><th>包含攻击数</th><th>深度分析</th></tr>';
                                // var trr = document.createElement("tr");
                                // trr.innerHTML = (tableTh);
                                tb.append(tableTh);

                                $.each(arrResult, function (i) {
                                    var tableCon = '<tr><td>' + arrResult[i].startTime + ' — ' + arrResult[i].lastTime + '</td>' +
                                        '<td>' + arrResult[i].port + '</td>' +
                                        '<td>' + arrResult[i].pairIP + '</td>' +
                                        '<td>' + arrResult[i].pairPort + '</td>' +
                                        '<td>' + arrResult[i].protocol + '</td>' +
                                        '<td>' + arrResult[i].reqBytes + '</td>' +
                                        '<td>' + arrResult[i].resBytes + '</td><td>' + arrResult[i].attackNum + '</td>' +
                                        '<td> <a href="JavaScript:" class="trace" style="background:url(\'../image/zhuiz.png\');">查看详情</a></td></tr>';
                                    // var tr = document.createElement("tr");
                                    // tr.innerHTML = tableCon;
                                    tb.append(tableCon);
                                    var tbb = $("#flowTab");
                                    tbb.replaceAll(tb);
                                });
                                tracHover()
                                // 点击查看攻击过程
                                $("#flowTab").delegate("tr .trace", "click", function () {
                                    window.open("flowDetail.html", "_self")
                                })
                            }
                        )
                    }
                };
                $("#yemaa").bootstrapPaginator(options)
            }
        )
    })
    function tracHover() {
        $(".trace").hover(function () {
            $(this).css({
                background:"#3a8cc3"
            })
        },function () {
            $(this).css({
                background:"url('../image/zhuiz.png')"
            })
        })
    };
    tracHover()
    // 图表
    var chart01 = echarts.init(document.getElementById('chart01'));
    var chart02 = echarts.init(document.getElementById('chart02'));
    var chart03 = echarts.init(document.getElementById('chart03'));
    var chart04 = echarts.init(document.getElementById('chart04'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            x: 'center',
            y: 'bottom',
            text: '黑客统计分析',
        },
        tooltip: {
            trigger: 'axis'
        },

        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['Line', 'Bar', 'Scatter', 'Funnel']
            }
        ],
        yAxis: [
            {
                type: 'value',
            }
        ],
        series: [
            {
                name: '黑客统计分析',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B'
                            ];
                            return colorList[params.dataIndex]
                        },
                        // label: {
                        //     show: true,
                        //     position: 'top',
                        //     formatter: '{b}\n{c}'
                        // }
                    }
                },
                data: [12, 21, 10, 4],
            }
        ]
    };
    var option2 = {
        title: {
            x: 'center',
            y: 'bottom',
            text: '黑客统计分析',

        },
        tooltip: {
            trigger: 'item'
        },
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['Radar', 'Chord', 'Force', 'Map', 'Gauge', 'Funnel']
            }
        ],
        yAxis: [
            {
                type: 'value',
            }
        ],
        series: [
            {
                name: '黑客统计分析',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63',
                            ];
                            return colorList[params.dataIndex]
                        },
                        // label: {
                        //     show: true,
                        //     position: 'top',
                        //     formatter: '{b}\n{c}'
                        // }
                    }
                },
                data: [12, 21, 12, 25, 23, 7],
            }
        ]
    };
    var option3 = {
        title: {
            x: 'center',
            text: '攻击趋势图',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'right',
            data: ['TCP通讯流量', 'UDP通讯流量']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name: 'TCP通讯流量',
                type: 'line',
                data: [400, 1100, 500, 1200, 1500, 700, 1000],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name: 'UDP通讯流量',
                type: 'line',
                data: [600, 800, 750, 1111, 890, 560, 950],
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    };
    var option4 = {
        title: {
            x: 'center',
            text: '流量走势图',
        },
        legend: {
            x: 'left',
            data: ['流量(兆)']
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name: 'TCP通讯流量',
                type: 'line',
                data: [400, 1100, 500, 1200, 1500, 700, 1000],
            },
            {
                name: 'UDP通讯流量',
                type: 'line',
                data: [600, 800, 750, 1111, 890, 560, 950],
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    chart01.setOption(option);
    chart02.setOption(option2);
    chart03.setOption(option3);
    chart04.setOption(option4);
    window.onresize = function () {
        chart01.resize()
        chart02.resize()
        chart03.resize()
        chart04.resize()
    }

})














