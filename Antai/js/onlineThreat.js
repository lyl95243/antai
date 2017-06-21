/**
 * Created by dell on 2017/3/23.
 */
$(function () {

    //时间
    function laydatee(i) {
        laydate({
            elem: '#hello'+i,
            format: 'YYYY/MM/DD hh:mm:ss', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            choose: function(datas){ //选择日期完毕的回调
                console.log(datas);
            }
        })
    }
    laydatee(1)
    laydatee(2)

    // $(".dropdown-menu li a").click(function () {
    //     var text=$(this).text()
    //     $(this).parents(".threatAnalListt").find("input").val(text)
    // })
// 图表
  var chart01=echarts.init(document.getElementById('chart01'));
  var chart02=echarts.init(document.getElementById('chart02'));
    var option = {
        title: {
            x: 'center',
            y:'bottom',
            text: '上网IP排名',
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

            }
        ]
    };
    var option2 = {
        title: {
            x: 'center',
            y:'bottom',
            text: '事件类型排名',

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

            }
        ]
    };
    chart01.setOption(option)
    chart02.setOption(option2)
    window.onresize=function () {
        chart01.resize()
        chart02.resize()
    }



})