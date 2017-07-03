/**
 * Created by dell on 2017/3/25.
 */
$(function () {

    $(".leftNav").height(738);
    // 当前版本
    Ajax(
        "/smarteye//api/system/sysOverview/sysVersion",
        "get",
        "json",
        "",
        false,
        function (result) {
            $(".gujianNow span").html(result.sysVersion)
            $(".guizeNow span").html(result.ruleVersion)
        }
    )
    // 系统固件升级
    $('#form').on('submit', function (e) {
        e.preventDefault(); //阻止浏览器执行与事件关联的默认动作
        Ajax(
            "/smarteye/api/system/systemUpgrade/imageUpgrade",
            "post",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                if (result.status == 0) {
                    alert("升级成功")
                }
            }
        )
    })

    // 系统升级历史记录
    Ajax(
        "/smarteye/api/system/systemUpgrade/getImageUpgradeList?page=1&pageSize=10",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            var arrResult = eval(result.results);
            var tb = $("#gujianTab");
            tb.html("");
            var tableTh = '<tr><th style="width: 35%;">时间</th><th style="width: 35%;">版本</th><th>结果</th></tr>';
            tb.append(tableTh);
            $.each(arrResult, function (i) {
                var res = "";
                if (arrResult[i].result == 0) {
                    res = "成功"
                } else {
                    res = "失败"
                }
                ;
                var tableCon = '<tr><td>' + arrResult[i].time + '</td>' +
                    '<td>' + arrResult[i].version + '</td>' +
                    '<td>' + res + '</td></tr>';
                tb.append(tableCon);
            });
            var totalCount = result.count;
            var currentPage = result.curPage;
            var pageCount = result.pageCount;
            var pageSize = 10;
            $(".pagez span").html(pageCount);
            var options = {
                bootstrapMajorVersion: 2,
                currentPage: currentPage,
                totalPages: pageCount,
                numberOfPages: 5,
                itemTexts: function (type, page, curent) {
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
                        "/smarteye/api/system/systemUpgrade/getImageUpgradeList?page=" + page + "&pageSize=10",
                        "get",
                        "json",
                        "",
                        false,
                        function (result) {
                            var arrResult = eval(result.results);
                            var tb = $("#gujianTab");
                            tb.html("");
                            var tableTh = '<tr><th style="width: 35%;">时间</th><th style="width: 35%;">版本</th><th>结果</th></tr>';
                            tb.append(tableTh);
                            $.each(arrResult, function (i) {
                                var res = "";
                                if (arrResult[i].result == 0) {
                                    res = "成功"
                                } else {
                                    res = "失败"
                                }
                                ;
                                var tableCon = '<tr><td>' + arrResult[i].time + '</td>' +
                                    '<td>' + arrResult[i].version + '</td>' +
                                    '<td>' + res + '</td></tr>';
                                tb.append(tableCon);
                            });
                        }
                    )
                }
            };
            $("#yema").bootstrapPaginator(options)
        }
    )
    // 规则库升级
    $('#formGZK').on('submit', function (e) {
        e.preventDefault(); //阻止浏览器执行与事件关联的默认动作
        Ajax(
            "/smarteye/api/system/systemUpgrade/ruleUpgrade",
            "post",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                if (result.status == 0) {
                    alert("升级成功")
                }
            }
        )
    })

    // 规则库升级列表
    Ajax(
        "/smarteye/api/system/systemUpgrade/getRuleUpgradeList?page=1&pageSize=10",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            var arrResult = eval(result.results);
            var tb = $("#guizekTab");
            tb.html("");
            var tableTh = '<tr><th style="width: 35%;">时间</th><th style="width: 35%;">版本</th><th>结果</th></tr>';
            tb.append(tableTh);
            $.each(arrResult, function (i) {
                var res = "";
                if (arrResult[i].result == 0) {
                    res = "成功"
                } else {
                    res = "失败"
                }
                ;
                var tableCon = '<tr><td>' + arrResult[i].time + '</td>' +
                    '<td>' + arrResult[i].version + '</td>' +
                    '<td>' + res + '</td></tr>';
                tb.append(tableCon);
            });
            var totalCount = result.count;
            var currentPage = result.curPage;
            var pageCount = result.pageCount;
            var pageSize = 10;
            $(".pagezz span").html(pageCount);
            var options = {
                bootstrapMajorVersion: 2,
                currentPage: currentPage,
                totalPages: pageCount,
                numberOfPages: 5,
                itemTexts: function (type, page, curent) {
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
                        "/smarteye/api/system/systemUpgrade/getRuleUpgradeList?page=" + page + "&pageSize=10",
                        "get",
                        "json",
                        "",
                        false,
                        function (result) {
                            var arrResult = eval(result.results);
                            var tb = $("#guizekTab");
                            tb.html("");
                            var tableTh = '<tr><th style="width: 35%;">时间</th><th style="width: 35%;">版本</th><th>结果</th></tr>';
                            tb.append(tableTh);
                            $.each(arrResult, function (i) {
                                var res = "";
                                if (arrResult[i].result == 0) {
                                    res = "成功"
                                } else {
                                    res = "失败"
                                }
                                ;
                                var tableCon = '<tr><td>' + arrResult[i].time + '</td>' +
                                    '<td>' + arrResult[i].version + '</td>' +
                                    '<td>' + res + '</td></tr>';
                                tb.append(tableCon);
                            });
                        }
                    )
                }
            };
            $("#yemaa").bootstrapPaginator(options)
        }
    )
})