/**
 * Created by dell on 2017/3/24.
 */
$(function () {
   // 系统版本
    Ajax(
        "/smarteye//api/system/sysOverview/sysVersion",
        "get",
        "json",
        "",
        false,
        function (result) {
            $("#sysVersion").html(result.sysVersion)
            $("#ruleVersion").html(result.ruleVersion)
        }
    )
    // 系统状态
    var mem=[],disk=[],CPU=[];
    Ajax(
        "/smarteye/api/system/sysOverview/sysStatus",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            mem.push(result.memUsage);
            disk.push(result.diskUsage)
            CPU.push(result.cpuUsage)
        }
    )
    var chart01 = echarts.init(document.getElementById('chart01'));
    var chart02 = echarts.init(document.getElementById('chart02'));
    var chart03 = echarts.init(document.getElementById('chart03'));
    var option01 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series : [
            {
                name:'内存利用率',
                type:'gauge',

                axisTick: {            // 坐标轴小标记
                    splitNumber: 5,   // 每份split细分多少段
                    length :9,        // 属性length控制线长
                },

                pointer: {
                    width:10,
                    length: '90%',
                    color:'#333'
                },
                detail : {
                    show : true,
                    formatter:'{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize : 15
                    }
                },
                data:mem
            }
        ]
    };
    var option02 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series : [
            {
                name:'CPU利用率',
                type:'gauge',

                axisTick: {            // 坐标轴小标记
                    splitNumber: 5,   // 每份split细分多少段
                    length :9,        // 属性length控制线长
                },

                pointer: {
                    width:10,
                    length: '90%',
                    color:'#333'
                },
                detail : {
                    show : true,
                    formatter:'{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize : 15
                    }
                },
                data:CPU
            }
        ]
    };
    var option03 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series : [
            {
                name:'硬盘利用率',
                type:'gauge',

                axisTick: {            // 坐标轴小标记
                    splitNumber: 5,   // 每份split细分多少段
                    length :9,        // 属性length控制线长
                },

                pointer: {
                    width:10,
                    length: '90%',
                    color:'#333'
                },
                detail : {
                    show : true,
                    formatter:'{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize : 15
                    }
                },
                data:disk
            }
        ]
    };

    chart01.setOption(option01);
    chart02.setOption(option02);
    chart03.setOption(option03);

})