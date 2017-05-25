/**
 * Created by dell on 2017/3/20.
 */
$(function () {
    //


    var esID=getQueryString("esID");
    var indexL=getQueryString("indexL");
    var type=getQueryString("type");
    // console.log(esID);

    // 请求头、头部信信息
    Ajax(
        "http://172.16.10.121:8080/smarteye//api/search/security/httpDetails?esID="+esID+"&index="+indexL+"&type="+type+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            // console.log(result);
            $(".webXq li").eq(0).find("span").html(result.method);
            $(".webXq li").eq(1).find("span").html(result.uri);
            $(".webXq li").eq(2).find("span").html(result.version);
            $(".webXq li").eq(3).find("span").html(result.status);
            var reqHeaders=eval(result.reqHeaders);
            var resHeaders=eval(result.resHeaders);
            // console.log(reqHeaders);
            // console.log(resHeaders);
            $.each(reqHeaders,function(key){
                // console.log(key);
                // console.log(reqHeaders[key]);
                var reqTable=$(".reqTable");
                var reqTableCon="<th style='width: 22%'>"+key+"</th><td>"+reqHeaders[key]+"</td>";
                var tr=document.createElement("tr");
                tr.innerHTML=(reqTableCon);
                reqTable.append(tr);
            });
            $.each(resHeaders,function(key){
                var resTable=$(".resTable");
                var resTableCon="<th style='width: 22%'>"+key+"</th><td>"+resHeaders[key]+"</td>";
                var tr=document.createElement("tr");
                tr.innerHTML=(resTableCon);
                resTable.append(tr);
            });
            var height=$(".rightC").height();
            $(".leftNav").height(height)
        }
    );
    // 请求体
    Ajax(
        "http://172.16.10.121:8080/smarteye/api/search/security/httpReqBody?esID="+esID+"&index="+indexL+"&type="+type+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            // console.log(result);
            if(result.contentType==0){
                $(".reqBody").html(result.content)
            }else if(result.contentType==1){
                var divv=document.createElement("div");
                var aa=document.createElement("a")
                divv.innerHTML="请点击下载: ";
                aa.href="http://172.16.10.121:8080"+result.content;
                aa.innerHTML="下载请求体";
                aa.style="color:#fff;padding:5px;background:#008052;border-radius:3px;";
                divv.append(aa);
                $(".reqBody").append(divv)
            }
        }
    )
    // 相应体
    Ajax(
        "http://172.16.10.121:8080/smarteye/api/search/security/httpResBody?esID="+esID+"&index="+indexL+"&type="+type+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            // console.log(result);
            if(result.contentType==0){
                var resultCon=result.content;
                console.log(resultCon);
                var regex=/<style type=\"text\/css\">[\s\S]*?<\/style>/ig;
                var contentt=resultCon.replace(regex,"");
                // console.log(contentt);
                $(".resBody pre").html(contentt);
                $("#settingss .textWrap").html(contentt)
            }else if(result.contentType==1){
                $(".resBody pre").remove();
                var divv=document.createElement("div");
                var aa=document.createElement("a")
                divv.innerHTML="请点击下载: ";
                aa.href="http://172.16.10.121:8080"+result.content;
                aa.innerHTML="下载相应体";
                aa.style="color:#fff;padding:5px;background:#008052;border-radius:3px;"
                divv.append(aa);
                $(".resBody").append(divv)
            }
        }
    )

})
