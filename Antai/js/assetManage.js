/**
 * Created by dell on 2017/3/28.
 */
$(function () {

    var inputPlaceHolder;
    $("input").focus(function () {
        inputPlaceHolder = $(this).attr("placeholder")
        $(this).prop("placeholder", "");
    });
    $("input").blur(function () {
        $(this).prop("placeholder", inputPlaceHolder)
    });
    $("#addMan,#addView").click(function () {
        $("#assetAdd input,#assetIndent input").val("");
        $("#addLive input").val("在线");
        $("#addStatus input").val("确认")
    });

    // 资产列表
    var pagenumber = 1;

    function manList(pagenum) {
        Ajax(
            "/smarteye/api/search/devProperty/devPropertyList?ip=&owner=&live=&type=&dep=&status=&page="+pagenum+"&pageSize=10",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var arrResult = eval(result.results);
                var tb = $("#tablee");
                tb.html("");
                var tableTh = '<tr><th>IP</th><th>MAC</th><th>存活状态</th><th>类型</th><th>所有者</th><th>所属部门</th><th>状态</th><th>操作</th></tr>'
                tb.append(tableTh);
                $.each(arrResult, function (i) {
                    var live = "";
                    if (arrResult[i].live == true) {
                        live = "在线"
                    } else {
                        live = "不在线"
                    }
                    ;
                    var status = "";
                    if (arrResult[i].status == 0) {
                        status = "未确认"
                    } else if (arrResult[i].status == 1) {
                        status = "已确认"
                    };
                    var tableCon = '<tr><td>' + arrResult[i].ip + '</td>' +
                        '<td>' + arrResult[i].mac + '</td>' +
                        '<td>' + live + '</td>' +
                        '<td>' + arrResult[i].type + '</td>' +
                        '<td>' + arrResult[i].owner + '</td>' +
                        '<td>' + arrResult[i].dep + '</td>' +
                        '<td>' + status + '</td>' +
                        '<td><button class="trace editMan" data-toggle="modal" data-target="#assetEdit">编辑</button><button class="trace delMan">删除</button><button class="confirm" style="width: 32%;">确认</button></td></tr>'
                    tb.append(tableCon);
                    var height = $(".rightC").height();
                    $(".leftNav").height(height);
                });
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
                            pagenumber = page
                            Ajax(
                                "/smarteye/api/search/devProperty/devPropertyList?ip=&owner=&live=&type=&dep=&status=&page=" + page + "&pageSize=10",
                                "get",
                                "json",
                                "",
                                false,
                                function (result) {
                                    console.log(result);
                                    var arrResult = eval(result.results);
                                    tb.html("");
                                    var tableTh = '<tr><th>IP</th><th>MAC</th><th>存活状态</th><th>类型</th><th>所有者</th><th>所属部门</th><th>状态</th><th>操作</th></tr>'
                                    tb.append(tableTh);
                                    $.each(arrResult, function (i) {
                                        var live = "";
                                        if (arrResult[i].live == true) {
                                            live = "在线"
                                        } else {
                                            live = "不在线"
                                        }
                                        ;
                                        var status = "";
                                        if (arrResult[i].status == 0) {
                                            status = "未确认"
                                        } else if (arrResult[i].status == 1) {
                                            status = "已确认"
                                        }
                                        var tableCon = '<tr><td>' + arrResult[i].ip + '</td>' +
                                            '<td>' + arrResult[i].mac + '</td>' +
                                            '<td>' + live + '</td>' +
                                            '<td>' + arrResult[i].type + '</td>' +
                                            '<td>' + arrResult[i].owner + '</td>' +
                                            '<td>' + arrResult[i].dep + '</td>' +
                                            '<td>' + status + '</td>' +
                                            '<td><button class="trace editMan" data-toggle="modal" data-target="#assetEdit">编辑</button><button class="trace delMan">删除</button><button class="confirm" style="width: 32%;">确认</button></td></tr>'
                                        tb.append(tableCon);
                                    })
                                    confirmBtn()
                                    queren()
                                    tracHover()
                                }
                            )
                        }
                    }
                    $("#yema").bootstrapPaginator(options)
                }
            }
        )
    }

    manList(pagenumber)
    // 查找
    $(".chaxun").click(function () {
        var ip = $("#ip").val(),
            owner = $("#owner").val(),
            type = $("#type").val(),
            dep = $("#dep").val(),
            live = "",
            status = "";
        if ($("#live").val() == "在线") {
            live = true
        } else if ($("#live").val() == "不在线") {
            live = false
        }
        if ($("#status").val() == "已确认") {
            status = 1
        } else if ($("#status").val() == "未确认") {
            status = 0
        }
        Ajax(
            "/smarteye/api/search/devProperty/devPropertyList?ip=" + ip + "&owner=" + owner + "&live=" + live + "&type=" + type + "&dep=" + dep + "&status=" + status + "&page=1&pageSize=10",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var arrResult = eval(result.results);
                var tb = $("#tablee");
                tb.html("");
                var tableTh = '<tr><th>IP</th><th>MAC</th><th>存活状态</th><th>类型</th><th>所有者</th><th>所属部门</th><th>状态</th><th>操作</th></tr>'
                tb.append(tableTh);
                $.each(arrResult, function (i) {
                    var live = "";
                    if (arrResult[i].live == true) {
                        live = "在线"
                    } else {
                        live = "不在线"
                    }
                    ;
                    var status = "";
                    if (arrResult[i].status == 0) {
                        status = "未确认"
                    } else if (arrResult[i].status == 1) {
                        status = "已确认"
                    }
                    var tableCon = '<tr><td>' + arrResult[i].ip + '</td>' +
                        '<td>' + arrResult[i].mac + '</td>' +
                        '<td>' + live + '</td>' +
                        '<td>' + arrResult[i].type + '</td>' +
                        '<td>' + arrResult[i].owner + '</td>' +
                        '<td>' + arrResult[i].dep + '</td>' +
                        '<td>' + status + '</td>' +
                        '<td><button class="trace editMan" data-toggle="modal" data-target="#assetEdit">编辑</button><button class="trace delMan">删除</button><button class="confirm" style="width: 32%;">确认</button></td></tr>'
                    tb.append(tableCon);
                    var height = $(".rightC").height();
                    $(".leftNav").height(height);
                });
                confirmBtn()
                queren()
                tracHover()
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
                           var type = $("#type").val();
                           Ajax(
                               "/smarteye/api/search/devProperty/devPropertyList?ip=" + ip + "&owner=" + owner + "&live=" + live + "&type=" + type + "&dep=" + dep + "&status=" + status + "&page=" + page + "&pageSize=10",
                               "get",
                               "json",
                               "",
                               false,
                               function (result) {
                                   // console.log(result);
                                   var arrResult = eval(result.results);
                                   tb.html("");
                                   var tableTh = '<tr><th>IP</th><th>MAC</th><th>存活状态</th><th>类型</th><th>所有者</th><th>所属部门</th><th>状态</th><th>操作</th></tr>'
                                   tb.append(tableTh);
                                   $.each(arrResult, function (i) {
                                       var live = "";
                                       if (arrResult[i].live == true) {
                                           live = "在线"
                                       } else {
                                           live = "不在线"
                                       }
                                       ;
                                       var status = "";
                                       if (arrResult[i].status == 0) {
                                           status = "未确认"
                                       } else if (arrResult[i].status == 1) {
                                           status = "已确认"
                                       }
                                       var tableCon = '<tr><td>' + arrResult[i].ip + '</td>' +
                                           '<td>' + arrResult[i].mac + '</td>' +
                                           '<td>' + live + '</td>' +
                                           '<td>' + arrResult[i].type + '</td>' +
                                           '<td>' + arrResult[i].owner + '</td>' +
                                           '<td>' + arrResult[i].dep + '</td>' +
                                           '<td>' + status + '</td>' +
                                           '<td><button class="trace editMan" data-toggle="modal" data-target="#assetEdit">编辑</button><button class="trace delMan">删除</button><button class="confirm" style="width: 32%;">确认</button></td></tr>'
                                       tb.append(tableCon);
                                   })
                                   confirmBtn()
                                   queren()
                                   tracHover()
                               }
                           )
                       }
                   }
                   $("#yema").bootstrapPaginator(options)
               }
            }
        )
    });

    // 判断添加资产弹窗中IP MAC地址是否合法
    var addIPReg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/; // IP地址验证
    var addMACReg = /[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/i; // MAC地址验证

    // 添加资产
    function addMan() {
        var addIP = $("#addIP input");
        var addMAC = $("#addMAC input");
        var addTYPE=$("#addType input").val();
        var addOWNER=$("#addOwner input").val();
        var addDEP=$("#addDep input").val();
        // console.log(typeof addTYPE);
        // console.log(addTYPE.indexOf(";"));
        // console.log(addOWNER);
        // console.log(addDEP);
        if (addIP.val() == "") {
            alert("IP地址不能为空")
        } else if (addIPReg.test(addIP.val())) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                 if (addMACReg.test(addMAC.val())||addMAC.val()=="") {
                         var addIp = $("#addIP input").val(),
                             addMac = $("#addMAC input").val(),
                             addLive = $("#addLive input").val(),
                             addType = $("#addType input").val(),
                             addOwner = $("#addOwner input").val(),
                             addDep = $("#addDep input").val(),
                             addStatus = $("#addStatus input").val();
                         var addLivee, addStatuss;
                         if (addLive == "在线") {
                             addLivee = true
                         } else if (addLive == "不在线") {
                             addLivee = false
                         }
                         ;
                         if (addStatus == "确认") {
                             addStatuss = 1
                         } else if (addStatus == "未确认") {
                             addStatuss = 0
                         }
                         Ajax(
                             "/smarteye/api/search/devProperty/addDevProperty?ip=" + addIp + "&mac=" + addMac + "&live=" + addLivee + "&type=" + addType + "&owner=" + addOwner + "&dep=" + addDep + "&status=" + addStatuss + "",
                             "post",
                             "json",
                             "",
                             false,
                             function (result) {
                                 console.log(result);
                                 if (result.status == 0) {
                                     alert("添加成功");
                                 } else {
                                     alert("添加失败")
                                 }
                                 $('#assetAdd').modal('hide');
                                 manList(pagenumber)
                                 confirmBtn()
                                 queren()
                                 tracHover()
                             }
                         )
                }else {
                     alert("MAC地址格式不正确")
                 }
            } else {
                alert("IP地址格式不正确")
            }
        } else {
            alert("IP地址格式不正确")
        }

    };
    $("#addAffirm").click(function () {
        console.log(1);
        addMan()
    });

    // 编辑资产
    function editMan() {
        var editIp = $("#editIp input");
        var editMac = $("#editMac input");
        if (editIp.val() == "") {
            alert("IP地址不能为空")
        } else if (addIPReg.test(editIp.val())) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                 if (addMACReg.test(editMac.val())||editMac.val()=="") {
                     if (addIPReg.test(editIp.val()) && RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                         var newIp = $("#editIp input").val(),
                             newMac = $("#editMac input").val(),
                             newLive,
                             newType = $("#editType input").val(),
                             newDep = $("#editDep input").val(),
                             newOwner = $("#editOwner input").val(),
                             newStatus;
                         if ($("#editLive input").val() == "在线") {
                             newLive = true
                         } else if ($("#editLive input").val() == "不在线") {
                             newLive = false
                         }
                         if ($("#editStatus input").val() == "未确认") {
                             newStatus = 0
                         } else if ($("#editStatus input").val() == "已确认") {
                             newStatus = 1
                         }
                         Ajax(
                             "/smarteye/api/search/devProperty/updateDevProperty?oldIp=" + oldIp + "&oldMac=" + oldMac + "&oldLive=" + oldLivee + "&oldType=" + oldType + "&oldOwner=" + oldOwner + "&oldDep=" + oldDep + "&oldStatus=" + oldStatuss + "&newIp=" + newIp + "&newMac=" + newMac + "&newLive=" + newLive + "&newType=" + newType + "&newOwner=" + newOwner + "&newDep=" + newDep + "&newStatus=" + newStatus + "",
                             "post",
                             "json",
                             "",
                             false,
                             function (result) {
                                 console.log(result);
                                 if (result.status == 0) {
                                     alert("修改成功")
                                 } else {
                                     alert("修改失败")
                                 }
                                 $("#assetEdit").modal("hide")
                                 manList(pagenumber)
                                 confirmBtn()
                                 queren()
                                 tracHover()
                             }
                         )
                     }
                     ;
                }else {
                     alert("MAC地址格式不正确")
                 }
            } else {
                alert("IP地址格式不正确")
            }
        } else {
            alert("IP地址格式不正确")
        }

    };
    $("#editAffirm").click(function () {
        editMan()
    })
    var oldIp, oldMac, oldLive, oldLivee, oldType, oldDep, oldOwner, oldStatus, oldStatuss;
    $("#tablee").delegate("tr .editMan", "click", function () {
        var editTd = $(this).parents("tr").find("td");
        oldIp = editTd.eq(0).html(),
            oldMac = editTd.eq(1).html(),
            oldLive = editTd.eq(2).html(),
            oldType = editTd.eq(3).html(),
            oldOwner = editTd.eq(4).html(),
            oldDep = editTd.eq(5).html(),
            oldStatus = editTd.eq(6).html();
        if (oldLive == "在线") {
            oldLivee = true
        } else if (oldLive == "不在线") {
            oldLivee = false
        }
        if (oldStatus == "未确认") {
            oldStatuss = 0
        } else if (oldStatus == "已确认") {
            oldStatuss = 1
        }
        $("#editIp input").val(oldIp);
        $("#editMac input").val(oldMac);
        $("#editLive input").val(oldLive);
        $("#editType input").val(oldType);
        $("#editDep input").val(oldDep);
        $("#editOwner input").val(oldOwner);
        $("#editStatus input").val(oldStatus);

    })

    // 删除资产
    $("#tablee").delegate("tr .delMan", "click", function () {
        var td = $(this).parents("tr").find("td");
        var editIp = td.eq(0).html(),
            editMac = td.eq(1).html(),
            editLive,
            editType = td.eq(3).html(),
            editDep = td.eq(5).html(),
            editOwner = td.eq(4).html(),
            editStatus;
        if (td.eq(2).html() == "在线") {
            editLive = true
        } else if (td.eq(2).html() == "不在线") {
            editLive = false
        }
        if (td.eq(6).html() == "未确认") {
            editStatus = 0
        } else if (td.eq(6).html() == "已确认") {
            editStatus = 1
        };
        if(confirm('确定要删除吗？')) {
            Ajax(
                "/smarteye/api/search/devProperty/delDevProperty?ip=" + editIp + "&mac=" + editMac + "&live=" + editLive + "&type=" + editType + "&owner=" + editOwner + "&dep=" + editDep + "&status=" + editStatus + "",
                "post",
                "json",
                "",
                false,
                function (result) {
                    console.log(result);
                    if (result.status == 0) {
                        alert("删除成功")
                    } else {
                        alert("删除失败")
                    }
                    manList(pagenumber)
                    confirmBtn()
                    queren()
                    tracHover()
                }
            )
        }else {

        }
    });


    // 已确认未确认
   function tracHover() {
       // $(".confirm").hover(function () {
       //     $(this).css({
       //         background:"#2f7eb3"
       //     })
       // },function () {
       //     $(this).css({
       //         background:"url('../image/zhuiz.png')"
       //     })
       // })
   };
    tracHover()
    // 确认按钮
    function confirmBtn() {
        $(".confirm").click(function () {
            var querr=$(this);
            var quer=$(this).parents("td").prev("td");
            var editTd = $(this).parents("tr").find("td");
            oldIp = editTd.eq(0).html(),
                oldMac = editTd.eq(1).html(),
                oldLive = editTd.eq(2).html(),
                oldType = editTd.eq(3).html(),
                oldOwner = editTd.eq(4).html(),
                oldDep = editTd.eq(5).html(),
                oldStatus = editTd.eq(6).html();
            if (oldLive == "在线") {
                oldLivee = true
            } else if (oldLive == "不在线") {
                oldLivee = false
            }
            Ajax(
                "/smarteye/api/search/devProperty/updateDevProperty?oldIp=" + oldIp + "&oldMac=" + oldMac + "&oldLive=" + oldLivee + "&oldType=" + oldType + "&oldOwner=" + oldOwner + "&oldDep=" + oldDep + "&oldStatus=0&newIp=" + oldIp + "&newMac=" + oldMac + "&newLive=" + oldLivee + "&newType=" + oldType + "&newOwner=" + oldOwner + "&newDep=" + oldDep + "&newStatus=1",
                "post",
                "json",
                "",
                false,
                function (result) {
                    console.log(result);
                    if(result.status==0){
                        quer.html("已确认");
                        querr.attr("disabled", "true").css({"cursor": "default", background: "#ebebeb", color: "#bfbfbf"});
                    }else {

                    }

                }
            )
        })
    };
    confirmBtn()
   function queren() {
       var btn = $(".manTab tr");
       for (var i = 0; i < btn.length; i++) {
           if ($(".manTab tr").eq(i).find("td:last-child").prev("td").html() == "已确认") {
               $(".manTab tr").eq(i).find("td:last-child").find("button:last-child").attr("disabled", "true").css({
                   "cursor": "default",
                   background: "#ebebeb",
                   color:"#bfbfbf"
               });
           }
       }
   }
    queren()
    // 自动识别资产列表
    var pageNum = 1;
    var scanTableTrTdStart=[],scanTableTrTdEnd=[];
    function scanManList(pagenum) {
        Ajax(
            "/smarteye/api/search/devPropertyScan/devPropertyScanList?enable=&startIP=&endIP=&startPort=&endPort=&type=&dep=&status=&page=" + pagenum + "&pageSize=10",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                scanTableTrTdStart=[];scanTableTrTdEnd=[];
                var arrResult = eval(result.results);
                var tb = $("#scanManTab");
                tb.html("");
                var tableTh = '<tr><th>状态</th><th>起始IP</th><th>终止IP</th><th>起始端口</th><th>终止端口</th><th>资产类型</th><th>所属部门</th><th>操作</th></tr>'
                tb.append(tableTh);
                $.each(arrResult, function (i) {
                    scanTableTrTdStart.push(arrResult[i].IPStart);
                    scanTableTrTdEnd.push(arrResult[i].IPEnd);
                    var tableCon = '<tr><td class="qiyong"><span title="启用" class=""></span></td>' +
                        '<td>' + arrResult[i].IPStart + '</td>' +
                        '<td>' + arrResult[i].IPEnd + '</td>' +
                        '<td>' + arrResult[i].PortStart + '</td>' +
                        '<td>' + arrResult[i].PortEnd + '</td>' +
                        '<td>' + arrResult[i].type + '</td>' +
                        '<Td>' + arrResult[i].dep + '</Td>' +
                        '<td><i class="fa fa-edit scanEdit" data-toggle="modal" data-target="#assetEditIndent" style="font-size: 18px;cursor:pointer" title="修改"></i> <i class="fa fa-remove scanDel" style="font-size: 18px;cursor:pointer" title="删除"></i> <span title="启用" class="qiyongSpan"></span> <span title="停用" class="tingyongSpan"></span></td></tr>'
                    tb.append(tableCon);
                    if (arrResult[i].enabled == true) {
                        $("#scanManTab").find("tr").eq(i + 1).find(".qiyong span").addClass("qiyongT")
                    } else if (arrResult[i].enabled == false) {
                        $("#scanManTab").find("tr").eq(i + 1).find(".qiyong span").addClass("qiyongB")
                    }
                });
                qiting()
                var height = $(".rightC").height();
                $(".leftNav").height(height)
                var totalCount = result.count;
                var currentPage = result.curPage;
                var pageCount = result.pageCount;
                var pageSize = 10;
                $(".pagezz span").html(pageCount)
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
                            pageNum = page;
                            scanTableTrTdStart=[];scanTableTrTdEnd=[];
                            Ajax(
                                "/smarteye/api/search/devPropertyScan/devPropertyScanList?enable=&startIP=&endIP=&startPort=&endPort=&type=&dep=&status=&page=" + page + "&pageSize=10",
                                "get",
                                "json",
                                "",
                                false,
                                function (result) {
                                    var arrResult = eval(result.results);
                                    tb.html("");
                                    var tableTh = '<tr><th>状态</th><th>起始IP</th><th>终止IP</th><th>起始端口</th><th>终止端口</th><th>资产类型</th><th>所属部门</th><th>操作</th></tr>'
                                    tb.append(tableTh);
                                    $.each(arrResult, function (i) {
                                        scanTableTrTdStart.push(arrResult[i].IPStart);
                                        scanTableTrTdEnd.push(arrResult[i].IPEnd);
                                        var tableCon = '<tr><td class="qiyong"><span title="启用" class=""></span></td>' +
                                            '<td>' + arrResult[i].IPStart + '</td>' +
                                            '<td>' + arrResult[i].IPEnd + '</td>' +
                                            '<td>' + arrResult[i].PortStart + '</td>' +
                                            '<td>' + arrResult[i].PortEnd + '</td>' +
                                            '<td>' + arrResult[i].type + '</td>' +
                                            '<Td>' + arrResult[i].dep + '</Td>' +
                                            '<td><i class="fa fa-edit scanEdit" data-toggle="modal" data-target="#assetEditIndent" style="font-size: 18px;cursor:pointer" title="修改"></i> <i class="fa fa-remove scanDel" style="font-size: 18px;cursor:pointer" title="删除"></i> <span title="启用" class="qiyongSpan"></span> <span title="停用" class="tingyongSpan"></span></td></tr>'
                                        tb.append(tableCon);
                                        if (arrResult[i].enabled == true) {
                                            $("#scanManTab").find("tr").eq(i + 1).find(".qiyong span").addClass("qiyongT")
                                        } else if (arrResult[i].enabled == false) {
                                            $("#scanManTab").find("tr").eq(i + 1).find(".qiyong span").addClass("qiyongB")
                                        }
                                    })
                                    qiting()
                                    qitingqiehuan()
                                }
                            )
                        }
                    };
                    $("#yemaa").bootstrapPaginator(options)
                }
            }
        )
    };
    scanManList(pageNum);

    var ipNum = 0;
    // IP地址转换成数字
    function ipToNumber(ip) {
        if (ip == "") {
            return ipNum;
        }
        var aNum = ip.split(".");
        if (aNum.length != 4) {
            return ipNum;
        }
        ipNum += parseInt(aNum[0]) << 24;
        ipNum += parseInt(aNum[1]) << 16;
        ipNum += parseInt(aNum[2]) << 8;
        ipNum += parseInt(aNum[3]) << 0;
        ipNum = ipNum >>> 0;
        return ipNum;
    };
    ipToNumber("1.1.1.1")

    // 自动识别 添加资产
    function scanAdd() {
        var port = /^(\d)+$/g;  // 端口验证
        // 判断自动识别资产弹窗中IP 端口是否合法
        var startIP = $("#startIP input").val();
        var endIP = $("#endIP input").val();
        var startPort = $("#startPort input").val();
        var endPort = $("#endPort input").val();
        var scanType = $("#scanType input").val();
        var scanDep = $("#scanDep input").val();
        ipNum = 0;
        ipToNumber(startIP);
        var startIpNum = ipNum;
        ipNum = 0;
        ipToNumber(endIP);
        var endIpNum = ipNum;


      function scanAddMan() {
          var q=true;
          for (var i = 0; i < scanTableTrTdEnd.length; i++) {
              ipNum=0;
              ipToNumber(scanTableTrTdEnd[i])
              var end=ipNum;

              ipNum=0;
              ipToNumber(scanTableTrTdStart[i])
              var start=ipNum;
                  if (!(startIpNum > end || start > endIpNum)) {
                      alert("添加失败:添加IP地址范围与已添加列表中IP地址范围重叠")
                      q=false;
                      break;
                  }else {
                       q=true;
                  }
          }
          if(q){
              Ajax(
                  "/smarteye/api/search/devPropertyScan/addDevPropertyScan?enable=true&startIP=" + startIP + "&endIP=" + endIP + "&startPort=" + startPort + "&endPort=" + endPort + "&type=" + scanType + "&dep=" + scanDep + "&status=",
                  "post",
                  "json",
                  "",
                  false,
                  function (result) {
                      console.log(result);
                      if (result.status == 0) {
                          alert("添加成功")
                          $("#assetIndent").modal("hide")
                      } else {
                          // alert("添加失败")
                      }
                      scanManList(pageNum);
                      qiting();
                      qitingqiehuan()

                  }
              )
          }


      }
        if (startIP == "") {
            alert("起始IP地址不能为空")
        } else if (addIPReg.test(startIP)) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                if (endIP == "") {
                    alert("终止IP地址不能为空")
                } else if (addIPReg.test(endIP)) {
                    if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                        if (startIpNum > endIpNum) {
                            alert("起始IP地址大于终止IP地址")
                        } else if (startPort == "") {
                            alert("起始端口不能为空")
                        } else if (port.test(startPort) && parseInt(startPort) <= 65535 && parseInt(startPort) >= 0) {
                            if (endPort == "") {
                                alert("终止端口不能为空")
                            } else {
                                var port = /^(\d)+$/g;  // 端口验证
                                if (port.test(endPort) && parseInt(endPort) <= 65535 && parseInt(endPort) >= 0) {
                                    if (parseInt(startPort) > parseInt(endPort)) {
                                        alert("起始端口大于终止端口")
                                    } else {
                                        scanAddMan()
                                    }
                                } else {
                                    alert("终止端口填写不正确")
                                }
                            }
                        } else {
                            alert("起始端口填写不正确")
                        }
                    } else {
                        alert("终止IP地址格式不正确")
                    }
                } else {
                    alert("终止IP地址格式不正确")
                }
            } else {
                alert("起始IP地址格式不正确")
            }
        } else {
            alert("起始IP地址格式不正确")
        }


    }

    $("#manageAffirm").click(function () {
        console.log(2);
        scanAdd()
    });

    // 自动识别 删除资产
    $("#scanManTab").delegate("tr .scanDel", "click", function () {
        var scanTd = $(this).parents("tr").find("td");
        var enabled = scanTd.eq(0).find("span"), Enablee,
            startIp = scanTd.eq(1).html(),
            endIp = scanTd.eq(2).html(),
            startPort = scanTd.eq(3).html(),
            endPort = scanTd.eq(4).html(),
            type = scanTd.eq(5).html(),
            dep = scanTd.eq(6).html();
        if (enabled.hasClass("qiyongT")) {
            Enablee = true
        } else if (enabled.hasClass("qiyongB")) {
            Enablee = false
        };
        Ajax(
            "/smarteye/api/search/devPropertyScan/delDevPropertyScan?enable=" + Enablee + "&startIP=" + startIp + "&endIP=" + endIp + "&startPort=" + startPort + "&endPort=" + endPort + "&type=" + type + "&dep=" + dep + "&status=",
            "post",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                if (result.status == 0) {
                    alert("删除成功")
                } else {
                    alert("删除失败")
                }
                ;
                scanManList(pageNum);
                qiting()
                qitingqiehuan()
            }
        )
    })

    // 自动识别 编辑资产

    function scanEditMan() {

        var port = /^(\d)+$/g;  // 端口验证
        // 判断自动识别资产弹窗中IP 端口是否合法
        var startIP = $("#startIPP input").val();
        var endIP = $("#endIPP input").val();
        var startPort = $("#startPortt input").val();
        var endPort = $("#endPortt input").val();
        ipNum = 0;
        ipToNumber(startIP);
        var startIpNum = ipNum; //填入的IP
        ipNum = 0;
        ipToNumber(endIP);
        var endIpNum = ipNum;
        function scanUpdate() {
            for (var i = 0; i < scanTableTrTdEnd.length; i++) {
                ipNum=0;
                ipToNumber(scanTableTrTdEnd[i])
                var end=ipNum;

                ipNum=0;
                ipToNumber(scanTableTrTdStart[i])
                var start=ipNum;

                if(startIpNum == start||end == endIpNum){
                    f=true;
                    break;
                }
                if (!(startIpNum > end || start > endIpNum)) {
                    alert("修改失败:IP地址范围与已添加列表中IP地址范围重叠");
                    var f=false;
                    break;
                }else {
                    f=true;
                }
            }
            if(f){
                Ajax(
                    "/smarteye/api/search/devPropertyScan/updateDevPropertyScan?oldEnable=" + oldEnablee + "&oldStartIP=" + oldStartIp + "&oldEndIP=" + oldEndIp + "&oldStartPort=" + oldStartPort + "&oldEndPort=" + oldEndPort + "&oldType=" + oldScanType + "&oldDep=" + oldScanDep + "&oldStatus=&newEnable=" + oldEnablee + "&newStartIP=" + newStartIP + "&newEndIP=" + newEndIP + "&newStartPort=" + newStartPort + "&newEndPort=" + newEndPort + "&newType=" + scanType + "&newDep=" + scanDep + "&newStatus=",
                    "post",
                    "json",
                    "",
                    false,
                    function (result) {
                        console.log(result);
                        if (result.status ==0) {
                            alert("修改成功")
                            $("#assetEditIndent").modal("hide");
                        } else {
                            // alert("修改失败")
                        }
                        scanManList(pageNum);
                        qiting()
                        qitingqiehuan()
                    }
                )
            }
        }
        if (startIP == "") {
            alert("起始IP地址不能为空")
        } else if (addIPReg.test(startIP)) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                if (endIP == "") {
                    alert("终止IP地址不能为空")
                } else if (addIPReg.test(endIP)) {
                    if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                        if (startIpNum > endIpNum) {
                            alert("起始IP地址大于终止IP地址")
                        } else {
                            if (startPort == "") {
                                alert("起始端口不能为空")
                            } else if (port.test(startPort) && parseInt(startPort) <= 65535 && parseInt(startPort) >= 0) {
                                if (endPort == "") {
                                    alert("终止端口不能为空")
                                } else {
                                    var port = /^(\d)+$/g;  // 端口验证
                                    if (port.test(endPort) && parseInt(endPort) <= 65535 && parseInt(endPort) >= 0) {
                                        if (parseInt(startPort) > parseInt(endPort)) {
                                            alert("起始端口大于终止端口")
                                        } else {
                                            var newStartIP = $("#startIPP input").val(),
                                                newEndIP = $("#endIPP input").val(),
                                                newStartPort = $("#startPortt input").val(),
                                                newEndPort = $("#endPortt input").val(),
                                                scanType = $("#scanTypee input").val(),
                                                scanDep = $("#scanDepp input").val();
                                            scanUpdate()
                                        }
                                    } else {
                                        alert("终止端口填写错误")
                                    }
                                }
                            } else {
                                alert("起始端口填写不正确")
                            }
                        }
                    } else {
                        alert("终止IP地址格式不正确")
                    }
                } else {
                    alert("终止IP地址格式不正确")
                }
            } else {
                alert("起始IP地址格式不正确")
            }
        } else {
            alert("起始IP地址格式不正确")
        }

    }

    $("#scanAffirm").click(function () {
        scanEditMan()
    })
    var oldEnable, oldEnablee, oldStartIp, oldEndIp, oldStartPort, oldEndPort, oldScanType, oldScanDep;
    $("#scanManTab").delegate("tr .scanEdit", "click", function () {
        var scanTd = $(this).parents("tr").find("td");
        oldEnable = scanTd.eq(0).find("span"),
            oldStartIp = scanTd.eq(1).html(),
            oldEndIp = scanTd.eq(2).html(),
            oldStartPort = scanTd.eq(3).html(),
            oldEndPort = scanTd.eq(4).html(),
            oldScanType = scanTd.eq(5).html(),
            oldScanDep = scanTd.eq(6).html();
        if (oldEnable.hasClass("qiyongT")) {
            oldEnablee = true
        } else if (oldEnable.hasClass("qiyongB")) {
            oldEnablee = false
        }
        $("#startIPP input").val(oldStartIp);
        $("#endIPP input").val(oldEndIp);
        $("#startPortt input").val(oldStartPort);
        $("#endPortt input").val(oldEndPort);
        $("#scanTypee input").val(oldScanType);
        $("#scanDepp input").val(oldScanDep);
    })

    qitingqiehuan()

})

// 停用启用状态
function qiting() {
    for (var i = 0; i < $(".tablee tr").length; i++) {
        if ($(".tablee tr").eq(i).find(".qiyong span").hasClass("qiyongB")) {
            $(".tablee tr").eq(i).find(".qiyong span").attr("title","停用")
            $(".qiyongB").parents("tr").find(".tingyongSpan").addClass("qitingyong").css({cursor: "default"})
        } else {
            $(".tablee tr").eq(i).find(".qiyongSpan").addClass("qitingyong").css({cursor: "default"})
        }
    }
}

function qitingqiehuan() {
    $(".tingyongSpan").click(function () {
        console.log(2);
        $(this).parents("tr").find(".qiyong span").removeClass().addClass("qiyongB").attr("title","停用");
        $(this).prev("span").removeClass("qitingyong").css({cursor: "pointer"})
        $(this).addClass("qitingyong").css({cursor: "default"});
        var scanTd = $(this).parents("tr").find("td");
        var oldEnable, oldStartIp, oldEndIp, oldStartPort, oldEndPort, oldScanType, oldScanDep;
        oldEnable = scanTd.eq(0).find("span"),
            oldStartIp = scanTd.eq(1).html(),
            oldEndIp = scanTd.eq(2).html(),
            oldStartPort = scanTd.eq(3).html(),
            oldEndPort = scanTd.eq(4).html(),
            oldScanType = scanTd.eq(5).html(),
            oldScanDep = scanTd.eq(6).html();
        Ajax(
            "/smarteye/api/search/devPropertyScan/updateDevPropertyScan?oldEnable=true&oldStartIP=" + oldStartIp + "&oldEndIP=" + oldEndIp + "&oldStartPort=" + oldStartPort + "&oldEndPort=" + oldEndPort + "&oldType=" + oldScanType + "&oldDep=" + oldScanDep + "&oldStatus=&newEnable=false&newStartIP=" + oldStartIp + "&newEndIP=" + oldEndIp + "&newStartPort=" + oldStartPort + "&newEndPort=" + oldEndPort + "&newType=" + oldScanType + "&newDep=" + oldScanDep + "&newStatus=",
            "post",
            "json",
            "",
            false,
            function (result) {
                console.log(result);

            }
        )
    })
    $(".qiyongSpan").click(function () {
        console.log(5);
        $(this).parents("tr").find(".qiyong span").removeClass().addClass("qiyongT").attr("title","启用");
        $(this).next("span").removeClass("qitingyong").css({cursor: "pointer"})
        $(this).addClass("qitingyong").css({cursor: "default"});
        var scanTd = $(this).parents("tr").find("td");
        var oldEnable, oldStartIp, oldEndIp, oldStartPort, oldEndPort, oldScanType, oldScanDep;
        oldEnable = scanTd.eq(0).find("span"),
            oldStartIp = scanTd.eq(1).html(),
            oldEndIp = scanTd.eq(2).html(),
            oldStartPort = scanTd.eq(3).html(),
            oldEndPort = scanTd.eq(4).html(),
            oldScanType = scanTd.eq(5).html(),
            oldScanDep = scanTd.eq(6).html();
        Ajax(
            "/smarteye/api/search/devPropertyScan/updateDevPropertyScan?oldEnable=false&oldStartIP=" + oldStartIp + "&oldEndIP=" + oldEndIp + "&oldStartPort=" + oldStartPort + "&oldEndPort=" + oldEndPort + "&oldType=" + oldScanType + "&oldDep=" + oldScanDep + "&oldStatus=&newEnable=true&newStartIP=" + oldStartIp + "&newEndIP=" + oldEndIp + "&newStartPort=" + oldStartPort + "&newEndPort=" + oldEndPort + "&newType=" + oldScanType + "&newDep=" + oldScanDep + "&newStatus=",
            "post",
            "json",
            "",
            false,
            function (result) {
                console.log(result);

            }
        )
    })
}