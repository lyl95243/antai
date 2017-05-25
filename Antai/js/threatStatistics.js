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
    // 威胁攻击事件统计
    Ajax(
        "http://172.16.10.121:8080/smarteye/api/search/security/pagestats",
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

    // 威胁事件分析表格
    Ajax(
        "http://172.16.10.121:8080/smarteye/api/search/security/events?startTime=&endTime=&attkIP=&attkType=&proto=&level=-1&page=1&pageSize=12",
        "get",
        "json",
        "",
        false,
        function (result) {
            // console.log(result);
            var arrResult = eval(result.results)
            var tb = $("#tablee");

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
                var tableCon = '<td>' + arrResult[i].attkStartTime + '</td>' +
                    '<td>' + arrResult[i].attkEndTime + '</td>' +
                    '<td class="tdImg"><img src="' + imgSrc + '">' + arrResult[i].country + '</td>' +
                    '<td>' + arrResult[i].attkIP + '</td>' +
                    '<td>' + arrResult[i].protos + '</td>' +
                    '<td>' + arrResult[i].types[0] + '</td>' +
                    '<td>' + levell + '</td>' +
                    '<td>' + arrResult[i].attkNum + '</td>' +
                    '<td> <a href="JavaScript:" class="trace">追踪</button></td>';
                var tr = document.createElement("tr");
                tr.innerHTML = (tableCon);
                tb.append(tr);

                var height = $(".rightC").height();
                $(".leftNav").height(height)
            });
            // 点击追踪
            $(".table").delegate("tr .trace", "click", function () {

                var index = $(this).parents("tr").index() - 1;

                var attkStartTime = arrResult[index].attkStartTime;
                var attkEndTime = arrResult[index].attkEndTime;
                var attkIP = arrResult[index].attkIP;
                var country=arrResult[index].country;
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
                window.open("hackersTrack.html?attkStartTime=" + attkStartTime + "&attkEndTime=" + attkEndTime + "&attkIP=" + attkIP + "&level=" + level + "&types=" + types + "&protos=" + protos + "&country="+country+"", "_self")
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
                    Ajax(
                        "http://172.16.10.121:8080/smarteye/api/search/security/events?startTime=&endTime=&attkIP=&attkType=&proto=&level=-1&page=" + page + "&pageSize=" + pageSize + "",
                        "get",
                        "json",
                        "",
                        false,
                        function (result) {
                            var arrResult = eval(result.results)
                            tb.html("");
                            var tableTh = '<th>最早攻击时间</th><th>最近攻击时间</th><th>黑客国家信息</th><th>攻击IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>攻击次数</th><th>深度分析</th>';
                            var trr = document.createElement("tr");
                            trr.innerHTML = (tableTh);
                            // $(".table tr:first-child").addClass("trr");
                            tb.append(trr);

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
                                var tableCon = '<td>' + arrResult[i].attkStartTime + '</td>' +
                                    '<td>' + arrResult[i].attkEndTime + '</td>' +
                                    '<td class="tdImg"><img src="' + imgSrc + '">' + arrResult[i].country + '</td>' +
                                    '<td>' + arrResult[i].attkIP + '</td>' +
                                    '<td>' + arrResult[i].protos + '</td>' +
                                    '<td>' + arrResult[i].types[0] + '</td>' +
                                    '<td>' + levell + '</td>' +
                                    '<td>' + arrResult[i].attkNum + '</td>' +
                                    '<td> <a href="JavaScript:" class="trace">追踪</button></td>';

                                var tr = document.createElement("tr");
                                tr.innerHTML = (tableCon);
                                tb.append(tr)

                            });
                            // 点击追踪
                            $(".table").delegate("tr .trace", "click", function () {

                                var index = $(this).parents("tr").index() - 1;

                                var attkStartTime = arrResult[index].attkStartTime;
                                var attkEndTime = arrResult[index].attkEndTime;
                                var attkIP = arrResult[index].attkIP;
                                var country=arrResult[index].country;
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
                                window.open("hackersTrack.html?attkStartTime=" + attkStartTime + "&attkEndTime=" + attkEndTime + "&attkIP=" + attkIP + "&level=" + level + "&types=" + types + "&protos=" + protos + "&country="+country+"", "_self")
                            })
                        }
                    )
                }, onPageChanged: function (event, old, newPage) {

                }
            }
            $("#yema").bootstrapPaginator(options)
        }
    )
    // 查询筛选项
    $(".chaxun").click(function () {
        var attkStartTime = $(".attkStartTime").val();
        var attkEndTime = $(".attkEndTime").val();
        var attkIP = $(".attkIP").val();
        console.log(attkIP);
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
        }
        // console.log(level);
        Ajax(
            "http://172.16.10.121:8080/smarteye/api/search/security/events?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP=" + attkIP + "&attkType=" + evenTypes + "&proto=" + protos + "&level=" + level + "&page=1&pageSize=12",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var arrResult = eval(result.results)
                var tb = $("#tablee");
                tb.html("");
                var tableTh = '<th>最早攻击时间</th><th>最近攻击时间</th><th>黑客国家信息</th><th>攻击IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>攻击次数</th><th>深度分析</th>';
                var trr = document.createElement("tr");
                trr.innerHTML = (tableTh);
                // $(".table tr:first-child").addClass("trr");
                tb.append(trr);

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
                        var tableCon = '<td>' + arrResult[i].attkStartTime + '</td>' +
                            '<td>' + arrResult[i].attkEndTime + '</td>' +
                            '<td class="tdImg"><img src="' + imgSrc + '">' + arrResult[i].country + '</td>' +
                            '<td>' + arrResult[i].attkIP + '</td>' +
                            '<td>' + arrResult[i].protos + '</td>' +
                            '<td>' + arrResult[i].types[0] + '</td>' +
                            '<td>' + levell + '</td>' +
                            '<td>' + arrResult[i].attkNum + '</td>' +
                            '<td> <a href="JavaScript:" class="trace">追踪</button></td>';

                        var tr = document.createElement("tr");
                        tr.innerHTML = (tableCon);
                        tb.append(tr)
                });
                // 点击追踪
                $(".table").delegate("tr .trace", "click", function () {

                    var index = $(this).parents("tr").index() - 1;

                    var attkStartTime = arrResult[index].attkStartTime;
                    var attkEndTime = arrResult[index].attkEndTime;
                    var attkIP = arrResult[index].attkIP;
                    var country=arrResult[index].country;
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
                    window.open("hackersTrack.html?attkStartTime=" + attkStartTime + "&attkEndTime=" + attkEndTime + "&attkIP=" + attkIP + "&level=" + level + "&types=" + types + "&protos=" + protos + "&country="+country+"", "_self")
                })
                var totalCount = result.count;
                var currentPage = result.curPage;
                var pageCount = result.pageCount;
                var pageSize = 12;
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
                            "http://172.16.10.121:8080/smarteye/api/search/security/events?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP=" + attkIP + "&attkType=" + evenTypes + "&proto=" + protos + "&level=" + level + "&page=" + page + "&pageSize=12",
                            "get",
                            "json",
                            "",
                            false,
                            function (result) {
                                // console.log(1);
                                var arrResult = eval(result.results)
                                tb.html("");
                                var tableTh = '<th>最早攻击时间</th><th>最近攻击时间</th><th>黑客国家信息</th><th>攻击IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>攻击次数</th><th>深度分析</th>';
                                var trr = document.createElement("tr");
                                trr.innerHTML = (tableTh);
                                // $(".table tr:first-child").addClass("trr");
                                tb.append(trr);
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
                                    var tableCon = '<td>' + arrResult[i].attkStartTime + '</td>' +
                                        '<td>' + arrResult[i].attkEndTime + '</td>' +
                                        '<td class="tdImg"><img src="' + imgSrc + '">' + arrResult[i].country + '</td>' +
                                        '<td>' + arrResult[i].attkIP + '</td>' +
                                        '<td>' + arrResult[i].protos + '</td>' +
                                        '<td>' + arrResult[i].types[0] + '</td>' +
                                        '<td>' + levell + '</td>' +
                                        '<td>' + arrResult[i].attkNum + '</td>' +
                                        '<td> <a href="JavaScript:" class="trace">追踪</button></td>';

                                    var tr = document.createElement("tr");
                                    tr.innerHTML = (tableCon);
                                    tb.append(tr)
                                });
                                // 点击追踪
                                $(".table").delegate("tr .trace", "click", function () {

                                    var index = $(this).parents("tr").index() - 1;

                                    var attkStartTime = arrResult[index].attkStartTime;
                                    var attkEndTime = arrResult[index].attkEndTime;
                                    var attkIP = arrResult[index].attkIP;
                                    var country=arrResult[index].country;
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
                                    window.open("hackersTrack.html?attkStartTime=" + attkStartTime + "&attkEndTime=" + attkEndTime + "&attkIP=" + attkIP + "&level=" + level + "&types=" + types + "&protos=" + protos + "&country="+country+"", "_self")
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