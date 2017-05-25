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
    //
    $(".ipC ul li").eq(0).find("span").html(getQueryString('attkIP'));
    $(".ipC ul li").eq(1).find("span").html(getQueryString('country'));
    var attkStartTime=getQueryString("attkStartTime");
    var attkEndTime=getQueryString("attkStartTime");
    var eventTypes=getQueryString("types");
    var protos=getQueryString("protos");
    var attkIP=getQueryString("attkIP");
    var level=getQueryString("level");
    // console.log(level);
    $(".attkStartTime").val(attkStartTime);
    $(".attkEndTime").val(attkEndTime);
    // $(".servIP").val(getQueryString("attkIP"));
    $(".evenTypes").val(eventTypes);
    $(".protos").val(protos);
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
    $(".level").val(levell);

    // 表格数据
    Ajax(
        "http://172.16.10.121:8080/smarteye/api/search/security/eventDetails?startTime="+attkStartTime+"&endTime="+attkEndTime+"&attkIP="+attkIP+"&servIP=&attkType="+eventTypes+"&proto="+protos+"&level="+level+"&page=1&pageSize=12",
        "get",
        "json",
        "",
        false,
        function (result) {
            // console.log(result);
            var arrResult = eval(result.eventDetailsList);
            // console.log(arrResult);
            var tb = $("#tablee");

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
                    var tableCon = '<td>' + arrResult[i].attkTime + '</td>' +
                        '<td>' + arrResult[i].servIP + '</td>' +
                        '<td></td>' +
                        '<td>' + arrResult[i].attkType + '</td>' +
                        '<td>' + levell + '</td>' +
                        '<td> <a href="JavaScript:" class="trace">查看攻击过程</a></td>';
                    var tr = document.createElement("tr");
                    tr.innerHTML = (tableCon);
                    tb.append(tr)
                var height = $(".rightC").height();
                $(".leftNav").height(height)
            });
            // 点击查看攻击过程
            $(".table").delegate("tr .trace", "click", function () {

                var index = $(this).parents("tr").index() - 1;
                // console.log(index);
                var attkTime = arrResult[index].attkTime;
                var servIP = arrResult[index].servIP;
                var levell = arrResult[index].level;
                var attkTypes = arrResult[index].attkType;
                var attkIP=$(".ipC ul li").eq(0).find("span").html()
                // console.log(attkIP);
                var esID=arrResult[index].esID;
                var indexL=arrResult[index].index;
                var type=arrResult[index].type;
                // console.log(esID);
                window.open("attack.html?esID="+esID+"&indexL="+indexL+"&type="+type+"&attkTime=" + attkTime + "&servIP=" + servIP + "&level=" + levell + "&attkTypes=" + attkTypes + "&attkIP="+attkIP+"", "_self")
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
                        "http://172.16.10.121:8080/smarteye/api/search/security/eventDetails?startTime="+attkStartTime+"&endTime="+attkEndTime+"&attkIP="+attkIP+"&servIP=&attkType="+eventTypes+"&proto="+protos+"&level="+level+"&page="+page+"&pageSize=12",
                        "get",
                        "json",
                        "",
                        false,
                        function (result) {
                            var arrResult = eval(result.eventDetailsList);
                            // console.log(arrResult);
                            tb.html("");
                            var tableTh = '<th>攻击时间</th><th>服务器IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>深度分析</th>';
                            var trr = document.createElement("tr");
                            trr.innerHTML = (tableTh);
                            tb.append(trr);

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
                                    var tableCon = '<td>' + arrResult[i].attkTime + '</td>' +
                                        '<td>' + arrResult[i].servIP + '</td>' +
                                        '<td></td>' +
                                        '<td>' + arrResult[i].attkType + '</td>' +
                                        '<td>' + levell + '</td>' +
                                        '<td> <a href="JavaScript:" class="trace">查看攻击过程</a></td>';
                                    var tr = document.createElement("tr");
                                    tr.innerHTML = (tableCon);
                                    tb.append(tr)
                            });
                            // 点击查看攻击过程
                            $(".table").delegate("tr .trace", "click", function () {

                                var index = $(this).parents("tr").index() - 1;
                                // console.log(index);
                                var attkTime = arrResult[index].attkTime;
                                var servIP = arrResult[index].servIP;
                                var levell = arrResult[index].level;
                                var attkTypes = arrResult[index].attkType;
                                var attkIP=$(".ipC ul li").eq(0).find("span").html()
                                // console.log(attkIP);
                                var esID=arrResult[index].esID;
                                var indexL=arrResult[index].index;
                                var type=arrResult[index].type;
                                // console.log(esID);
                                window.open("attack.html?esID="+esID+"&indexL="+indexL+"&type="+type+"&attkTime=" + attkTime + "&servIP=" + servIP + "&level=" + levell + "&attkTypes=" + attkTypes + "&attkIP="+attkIP+"", "_self")
                            })
                        }
                    )
                }, onPageChanged: function (event, old, newPage) {

                }
            };
            $("#yema").bootstrapPaginator(options)
        }
    )
    // 查询筛选项
    $(".chaxun").click(function () {
        var attkStartTime = $(".attkStartTime").val();
        var attkEndTime = $(".attkEndTime").val();
        // var servIP = $(".servIP").val();
        var evenTypes = $(".evenTypes").val();
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
        // console.log(level);
        Ajax(
            "http://172.16.10.121:8080/smarteye/api/search/security/eventDetails?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP="+attkIP+"&servIP=&attkType=" + evenTypes + "&proto=" + protos + "&level=" + level + "&page=1&pageSize=12",
            "get",
            "json",
            "",
            false,
            function (result) {
                // console.log(result);
                var arrResult = eval(result.eventDetailsList)
                var tb = $("#tablee");

                tb.html("");
                var tableTh = '<th>攻击时间</th><th>服务器IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>深度分析</th>';
                var trr = document.createElement("tr");
                trr.innerHTML = (tableTh);
                tb.append(trr);
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
                        var tableCon = '<td>' + arrResult[i].attkTime + '</td>' +
                            '<td>' + arrResult[i].servIP + '</td>' +
                            '<td></td>' +
                            '<td>' + arrResult[i].attkType + '</td>' +
                            '<td>' + levell + '</td>' +
                            '<td> <a href="JavaScript:" class="trace">查看攻击过程</a></td>';
                        var tr = document.createElement("tr");
                        tr.innerHTML = (tableCon);
                        tb.append(tr)
                    var height = $(".rightC").height();
                    $(".leftNav").height(height)
                });
                // 点击查看攻击过程
                $(".table").delegate("tr .trace", "click", function () {

                    var index = $(this).parents("tr").index() - 1;
                    // console.log(index);
                    var attkTime = arrResult[index].attkTime;
                    var servIP = arrResult[index].servIP;
                    var levell = arrResult[index].level;
                    var attkTypes = arrResult[index].attkType;
                    var attkIP=$(".ipC ul li").eq(0).find("span").html()
                    // console.log(attkIP);
                    var esID=arrResult[index].esID;
                    var indexL=arrResult[index].index;
                    var type=arrResult[index].type;
                    // console.log(esID);
                    window.open("attack.html?esID="+esID+"&indexL="+indexL+"&type="+type+"&attkTime=" + attkTime + "&servIP=" + servIP + "&level=" + levell + "&attkTypes=" + attkTypes + "&attkIP="+attkIP+"", "_self")
                })
                var totalCount = result.count; // 总条数
                var currentPage = result.curPage; // 当前页
                var pageSize =12;  // 每页条数
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
                        Ajax(
                            "http://172.16.10.121:8080/smarteye/api/search/security/eventDetails?startTime=" + attkStartTime + "&endTime=" + attkEndTime + "&attkIP="+attkIP+"&servIP=&attkType=" + evenTypes + "&proto=" + protos + "&level=" + level + "&page=" + page + "&pageSize=12",
                            "get",
                            "json",
                            "",
                            false,
                            function (result) {
                                // console.log(2);
                                var arrResult = eval(result.eventDetailsList)
                                tb.html("");
                                var tableTh = '<th>攻击时间</th><th>服务器IP</th><th>利用协议</th><th>事件类型</th><th>危险级别</th><th>深度分析</th>';
                                var trr = document.createElement("tr");
                                trr.innerHTML = (tableTh);
                                tb.append(trr);

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
                                    var tableCon = '<td>' + arrResult[i].attkTime + '</td>' +
                                        '<td>' + arrResult[i].servIP + '</td>' +
                                        '<td></td>' +
                                        '<td>' + arrResult[i].attkType + '</td>' +
                                        '<td>' + levell + '</td>' +
                                        '<td> <a href="JavaScript:" class="trace">查看攻击过程</a></td>';
                                    var tr = document.createElement("tr");
                                    tr.innerHTML = (tableCon);
                                    tb.append(tr)
                                });
                                // 点击查看攻击过程
                                $(".table").delegate("tr .trace", "click", function () {

                                    var index = $(this).parents("tr").index() - 1;
                                    // console.log(index);
                                    var attkTime = arrResult[index].attkTime;
                                    var servIP = arrResult[index].servIP;
                                    var levell = arrResult[index].level;
                                    var attkTypes = arrResult[index].attkType;
                                    var attkIP=$(".ipC ul li").eq(0).find("span").html()
                                    // console.log(attkIP);
                                    var esID=arrResult[index].esID;
                                    var indexL=arrResult[index].index;
                                    var type=arrResult[index].type;
                                    // console.log(esID);
                                    window.open("attack.html?esID="+esID+"&indexL="+indexL+"&type="+type+"&attkTime=" + attkTime + "&servIP=" + servIP + "&level=" + levell + "&attkTypes=" + attkTypes + "&attkIP="+attkIP+"", "_self")
                                })
                            }
                        )
                    }, onPageChanged: function (event, old, newPage) {

                    }
                };
                $("#yema").bootstrapPaginator(options)
            }
        )

    })

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
            text: 'ECharts例子个数统计',
        },
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
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
                name: 'ECharts例子个数统计',
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
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: [12, 21, 10, 4],
                markPoint: {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0)',
                        formatter: function (params) {
                            return '<img src="'
                                + params.data.symbol.replace('image://', '')
                                + '"/>';
                        }
                    },
                    data: [
                        {xAxis: 0, y: 350, name: 'Line', symbolSize: 20, symbol: 'image://../asset/ico/折线图.png'},
                        {xAxis: 1, y: 350, name: 'Bar', symbolSize: 20, symbol: 'image://../asset/ico/柱状图.png'},
                        {xAxis: 2, y: 350, name: 'Scatter', symbolSize: 20, symbol: 'image://../asset/ico/散点图.png'},
                        {xAxis: 3, y: 350, name: 'K', symbolSize: 20, symbol: 'image://../asset/ico/K线图.png'},

                    ]
                }
            }
        ]
    };
    var option2 = {
        title: {
            x: 'center',
            y: 'bottom',
            text: 'ECharts例子个数统计',

        },
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
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
                name: 'ECharts例子个数统计',
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
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: [12, 21, 12, 25, 23, 7],
                markPoint: {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0)',
                        formatter: function (params) {
                            return '<img src="'
                                + params.data.symbol.replace('image://', '')
                                + '"/>';
                        }
                    },
                    data: [
                        {xAxis: 0, y: 350, name: 'Line', symbolSize: 20, symbol: 'image://../asset/ico/折线图.png'},
                        {xAxis: 1, y: 350, name: 'Bar', symbolSize: 20, symbol: 'image://../asset/ico/柱状图.png'},
                        {xAxis: 2, y: 350, name: 'Scatter', symbolSize: 20, symbol: 'image://../asset/ico/散点图.png'},
                        {xAxis: 3, y: 350, name: 'K', symbolSize: 20, symbol: 'image://../asset/ico/K线图.png'},
                        {xAxis: 4, y: 350, name: 'Pie', symbolSize: 20, symbol: 'image://../asset/ico/饼状图.png'},
                        {xAxis: 5, y: 350, name: 'Radar', symbolSize: 20, symbol: 'image://../asset/ico/雷达图.png'},

                    ]
                }
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
        toolbox: {
            show: false,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
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
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
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
        toolbox: {
            show: false,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
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













