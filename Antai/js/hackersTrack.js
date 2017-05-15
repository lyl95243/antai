/**
 * Created by dell on 2017/3/20.
 */
$(function () {
    //
    // 起始结束时间
    function laydatee(i) {
        laydate({
            elem: '#hello'+i,
            format: 'YYYY.MM.DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            choose: function(datas){ //选择日期完毕的回调
                console.log(datas);
            }
        })
    }
   laydatee(1)
   laydatee(2)
   laydatee(3)
   laydatee(4)
    // 查询筛选项
    $(".dropdown-menu li a").click(function () {
        var text=$(this).text()
        $(this).parents(".threatAnalListt").find("input").val(text)
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
            y:'bottom',
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
                data: ['Line', 'Bar', 'Scatter',  'Funnel']
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
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B'
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
                data: [12,21,10,4],
                markPoint: {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0)',
                        formatter: function(params){
                            return '<img src="'
                                + params.data.symbol.replace('image://', '')
                                + '"/>';
                        }
                    },
                    data: [
                        {xAxis:0, y: 350, name:'Line', symbolSize:20, symbol: 'image://../asset/ico/折线图.png'},
                        {xAxis:1, y: 350, name:'Bar', symbolSize:20, symbol: 'image://../asset/ico/柱状图.png'},
                        {xAxis:2, y: 350, name:'Scatter', symbolSize:20, symbol: 'image://../asset/ico/散点图.png'},
                        {xAxis:3, y: 350, name:'K', symbolSize:20, symbol: 'image://../asset/ico/K线图.png'},

                    ]
                }
            }
        ]
    };
    var option2 = {
        title: {
            x: 'center',
            y:'bottom',
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
                data: [ 'Radar', 'Chord', 'Force', 'Map', 'Gauge', 'Funnel']
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
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63',
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
                data: [12,21,12,25,23,7],
                markPoint: {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0)',
                        formatter: function(params){
                            return '<img src="'
                                + params.data.symbol.replace('image://', '')
                                + '"/>';
                        }
                    },
                    data: [
                        {xAxis:0, y: 350, name:'Line', symbolSize:20, symbol: 'image://../asset/ico/折线图.png'},
                        {xAxis:1, y: 350, name:'Bar', symbolSize:20, symbol: 'image://../asset/ico/柱状图.png'},
                        {xAxis:2, y: 350, name:'Scatter', symbolSize:20, symbol: 'image://../asset/ico/散点图.png'},
                        {xAxis:3, y: 350, name:'K', symbolSize:20, symbol: 'image://../asset/ico/K线图.png'},
                        {xAxis:4, y: 350, name:'Pie', symbolSize:20, symbol: 'image://../asset/ico/饼状图.png'},
                        {xAxis:5, y: 350, name:'Radar', symbolSize:20, symbol: 'image://../asset/ico/雷达图.png'},

                    ]
                }
            }
        ]
    };
    var option3 = {
        title: {
            x:'center',
            text: '攻击趋势图',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x:'right',
            data:['TCP通讯流量','UDP通讯流量']
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
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['S','M','T','W','T','F','S']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:'TCP通讯流量',
                type:'line',
                data:[400, 1100, 500, 1200,1500,700, 1000],
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
                name:'UDP通讯流量',
                type:'line',
                data:[600, 800,750,1111,890, 560, 950],
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
            x:'center',
            text: '流量走势图',
        },
        legend: {
            x:'left',
            data:['流量(兆)']
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
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['S','M','T','W','T','F','S']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:'TCP通讯流量',
                type:'line',
                data:[400, 1100, 500, 1200,1500,700, 1000],
            },
            {
                name:'UDP通讯流量',
                type:'line',
                data:[600, 800,750,1111,890, 560, 950],
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    chart01.setOption(option);
    chart02.setOption(option2);
    chart03.setOption(option3);
    chart04.setOption(option4);
    window.onresize=function () {
        chart01.resize()
        chart02.resize()
        chart03.resize()
        chart04.resize()
    }
})















