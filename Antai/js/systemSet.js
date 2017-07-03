/**
 * Created by dell on 2017/3/24.
 */
$(function () {

    // 接口信息表格
    Ajax(
        "/smarteye/api/system/systemSetting/systemInterfaceList?page=1&pageSize=10",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            var arrResult=eval(result.results);
            var tb=$("#portTable");
            var tableTh='<tr><th>名称</th><th>地址</th><th>掩码</th><th>状态</th><th>操作</th></tr>'
            tb.append(tableTh);
            $.each(arrResult,function (i) {
                var tableCon='<tr><td>'+arrResult[i].name+'</td>' +
                    '<td>'+arrResult[i].address+'</td>' +
                    '<td>'+arrResult[i].netmask+'</td>' +
                    '<td>'+arrResult[i].status+'</td>' +
                    '<td><button class="trace">编辑</button></td></tr>'
                tb.append(tableCon);
                if(arrResult[i].status=="up"){
                    // $(".inter div").eq(arrResult[i].row-1).find("img").eq(arrResult[i].column-1).attr("src","image/portSetUp.png");
                    $(".inter>div").eq(arrResult[i].row-1).find("span").eq(arrResult[i].column-1).addClass("interUp");
                }else if(arrResult[i].status=="down"){
                    // $(".inter div").eq(arrResult[i].row-1).find("img").eq(arrResult[i].column-1).attr("src","image/portSetDown.png");
                    $(".inter>div").eq(arrResult[i].row-1).find("span").eq(arrResult[i].column-1).addClass("interDown");
                }
            });
            $("#portTable tr").click(function () {
                $(this).addClass("trClick").siblings().removeClass()
                var index=$(this).index()-1;
                var row=arrResult[index].row-1;  //行
                var column=arrResult[index].column-1;
                $(".inter>div span").removeClass("interHightL");
                $(".inter div").eq(row).find("span").eq(column).addClass("interHightL");
                // $(".inter div img").attr("src","image/portSet01.png")
                // $(".inter div").eq(row).find("img").eq(column).attr("src","image/portSet03.png");
            });
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
                    numebrOfPages:5,
                    itemTexts:function (type,page,current) {
                        switch(type){
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
                    },onPageClicked:function (event,originaEvent,type,page) {
                        Ajax(
                            "/smarteye/api/system/systemSetting/systemInterfaceList?page="+page+"&pageSize=10",
                            "get",
                            "json",
                            "",
                            false,
                            function (result) {
                                var arrResult=eval(result.results);
                                tb.html("");
                                var tableTh='<tr><th>名称</th><th>地址</th><th>掩码</th><th>状态</th><th>操作</th></tr>'
                                tb.append(tableTh);
                                $.each(arrResult,function (i) {
                                    var tableCon='<tr><td>'+arrResult[i].name+'</td>' +
                                        '<td>'+arrResult[i].address+'</td>' +
                                        '<td>'+arrResult[i].netmask+'</td>' +
                                        '<td>'+arrResult[i].status+'</td>' +
                                        '<td><button class="trace">编辑</button></td></tr>'
                                    tb.append(tableCon);
                                });
                                $("#portTable tr").click(function () {
                                    $(this).addClass("trClick").siblings().removeClass()
                                    var index=$(this).index()-1;
                                    var row=arrResult[index].row-1;  //行
                                    var column=arrResult[index].column-1;
                                    $(".inter div img").attr("src","image/portSet01.png")
                                    $(".inter div").eq(row).find("img").eq(column).attr("src","image/portSet03.png");
                                })
                            }
                        )
                    }
                }
                $("#yema").bootstrapPaginator(options)
            }
        }
    );
    
    // 关机
    $(".guanji").click(function () {
        Ajax(
            "/smarteye/api/system/systemSetting/shutdown",
            "get",
            "json",
            "",
            false,
            function (result) {
                // console.log(result);
                if(result.status==0){
                    alert("关机成功")
                }else {
                    alert("关机失败")
                }

            }
        )
    })
    // 重新启动
    $(".chongqi").click(function () {
        Ajax(
            "/smarteye/api/system/systemSetting/reboot",
            "get",
            "json",
            "",
            false,
            function (result) {
                // console.log(result);
                if(result.status==0){
                    alert("重新启动成功")
                }else {
                    alert("重新启动失败")
                }

            }
        )
    })
})