$(function(){



    v = getCookieValue("secondsremained");//获取cookie值
    // alert("v is:"+v);
    if(v>0){
        settime($("#second"));//开始倒计时
    }




    /*$('#switcher_qlogin a').click(function(){
        $("#switcher_qlogin").attr('class',"active");
        $("#switcher_alogin").attr('class'," ");
        $("#account_login").attr('class',"hide");
        $("#qr_id_login").attr('class'," ");
        $("#switch_bottom").animate({width:$("#switcher_qlogin").outerWidth()+"px",marginLeft:($("#switcher_qlogin").offset().left-$("#switcher_qlogin").parent().offset().left)+"px"});
    } );
    $('#switcher_alogin a').click(function(){
        $("#switcher_qlogin").attr('class',"");
        $("#switcher_alogin").attr('class'," active");
        $("#account_login").attr('class',"");
        $("#qr_id_login").attr('class'," hide");
        $("#switch_bottom").animate({width:$("#switcher_alogin").outerWidth()+"px",marginLeft:($("#switcher_alogin").offset().left-$("#switcher_alogin").parent().offset().left)+"px"});
    } );
    $("#qr_code").mouseover(function(){
        $("#qr_tips").animate({opacity: 100,zIndex:10});
    });
    $("#qr_code").mouseout(function(){
        $("#qr_tips").animate({opacity: 0,zIndex:-10});
    });
    displayImg();
    $(".intranetLogin .down").click(function(){
        $(".shadeFamily").show();
    })
    $(".closeShade").click(function(){
        $(".shadeFamily").hide();
    })*/



    if($('#msg').length>0){
        $('#switcher_alogin a').click();
    }
    // displayImg();
})




function displayImg(){
    $.ajax({
        type:'POST',
        url:getImgUrl,
        async: true,
        data:{ticket:qrTicket},
        dataType:'json',
        success:function(data){
            if(data.code==200){
                /* $('#qr_code').css("width","120px").css("height","120px");*/
                $('#pUserQrScan').addClass("hide");
                $('#pSec').addClass('hide');
                $('#pScranSuccess').removeClass("hide");
                $('#pScanBack').removeClass("hide");
                $('#imgUser').attr("src",disPlayImgUrl+"?ticket="+qrTicket);
                /* $('#img_span_info').attr("class","img_cover_avt");
                 $('#h2_login_phone').show();
                 $('#a_login_phone').show();*/
                verifyMess();
            }else if(data.code==404){
                $('#divLose').addClass('show');
            }else{
                displayImg();
            }
        }})
}


function verifyMess(){
    $.ajax({
        type:'POST',
        url:urlStr,
        async: true,
        data:{ticket:qrTicket},
        dataType:'json',
        //beforeSend:function(xhr){alert(str);xhr.setRequestHeader('arr',str);}
        //beforeSend:function(xhr){xhr.setRequestHeader('str',str);},
        success:function(data){
            if(data.code==200){
                /*  $("#img_span_info").css("display","inline-block");*/
                $('#divSuccess').addClass('show');
                //window.location.href=authurl;
                //alert(mi_service)
                if(flag4Service){
                    $.post(authurlPost, { _eventId: "submit", execution: flowExecutionKey,username:data.data,password:qrTicket,rememberMe:"on",option:option,qr_login:"on"} )
                    /* $("#img_span_info").css("display","inline-block");
 */
                    setTimeout(function(){
                        window.location.href=window.location.href;
                    },1000);
                }else{
                    formSubmit(data.data,data.message);
                }
            }else{
                verifyMess();
            }
        }});
}

function refreash(){
    window.location.reload();
}





function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


function formSubmit(username) {
    var turnForm = document.createElement("form");
    document.body.appendChild(turnForm);
    turnForm.method = 'post';
    turnForm.action = postUrl;/*?'+'service='+GetQueryString("service")*/;
    //创建隐藏表单
    var newElement = document.createElement("input");
    newElement.setAttribute("name","username");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value",username);
    turnForm.appendChild(newElement);

    var newElement = document.createElement("input");
    newElement.setAttribute("name","_eventId");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value","submit");
    turnForm.appendChild(newElement);

    var newElement = document.createElement("input");
    newElement.setAttribute("name","execution");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value",flowExecutionKey);
    turnForm.appendChild(newElement);

    var newElement = document.createElement("input");
    newElement.setAttribute("name","password");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value",qrTicket);
    turnForm.appendChild(newElement);

    var newElement = document.createElement("input");
    newElement.setAttribute("name","rememberMe");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value","on");
    turnForm.appendChild(newElement);

    var newElement = document.createElement("input");
    newElement.setAttribute("name","option");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value",option);
    turnForm.appendChild(newElement);

    var newElement = document.createElement("input");
    newElement.setAttribute("name","qr_login");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value","on");
    turnForm.appendChild(newElement);

    turnForm.submit();
}



function getOtpNum() {

    if($('#input-phone').val()==''||$('#input-phone').val()==''){
        $('#input-phone').addClass('err');
        $('#idp').html('必须输入手机号').css('display','block');
    }else{
        //发送相应的信息到后端进行验证
        doPostBack();
        addCookie("secondsremained",60,60);//添加cookie记录,有效时间60s
        var obj = $("#second");
        settime(obj);//开始倒计时
    }
}

function getOtpNumPhone() {

    if($('#input-phone').val()==''||$('#input-phone').val()==''){
        $('#input-phone').addClass('err');
        $('#idp').html('必须输入手机号').css('display','block');
    }else{
        //发送相应的信息到后端进行验证
        doPostBack();
        addCookie("secondsremained",60,60);//添加cookie记录,有效时间60s
        var obj = $("#second");
        settime(obj);//开始倒计时
    }
}



/****
 * 进行发送相应验证码的信息
 * @param url
 * @param queryParam
 */
function doPostBack() {
    //var username = $('#miniLogin_username').val();
    var phone = $('#input-phone').val();
    var queryParam = {"phone":phone};
    $.ajax({
        async : false,
        cache : false,
        type : 'POST',
        url : getOtpUrl,// 请求的action路径
        data:queryParam,
        error : function() {// 请求失败处理函数
            $('#msg1').html('获取失败');
        },
        success : function(){

        }
    });
}


/****
 * 修改相应的cookie信息
 * @param name
 * @param value
 * @param expiresHours
 */
function addCookie(name,value,expiresHours){
    var cookieString=name+"="+escape(value);
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if(expiresHours>0){
        var date=new Date();
        date.setTime(date.getTime()+expiresHours*1000);
        cookieString=cookieString+";expires=" + date.toUTCString();
    }
    document.cookie=cookieString;

}
//修改cookie的值
function editCookie(name,value,expiresHours){
    var cookieString=name+"="+escape(value);
    if(expiresHours>0){
        var date=new Date();
        date.setTime(date.getTime()+expiresHours*1000); //单位是毫秒
        cookieString=cookieString+";expires=" + date.toGMTString();
    }
    document.cookie=cookieString;
}
//根据名字获取cookie的值
function getCookieValue(name){
    var value =  $.cookie(name);

    if(isNaN(value)){
        if(value=="NaN"){
            return "";
        }
        return value;
    }else{
        return value;
    }
}


/****
 * 进行展示剩余时间的显示
 */
var countdown;
function settime(obj) {

    countdown=getCookieValue("secondsremained");
    if (countdown == 0) {
        obj.html('');
        //obj.removeAttr("disabled");
        obj.html("获取验证码");
        return;
    } else {
        //obj.attr("disabled", true);
        obj.html('');
        obj.html( countdown + "s");
        countdown--;
        editCookie("secondsremained",countdown,countdown+1);
    }
    setTimeout(function() { settime(obj) },1000) //每1000毫秒执行一次
}







function settimeOTP(obj) {
    countdown=getCookieValue("secondsremained1");
    if(typeof(countdown)== "undefined"||countdown == 0) {
        obj.text('');
        obj.css('color','#FF6633');
        //obj.removeAttr("disabled");
        //obj.attr("onclick","getOtp()");
        obj.bind('click', function () {
            getOtp();
        });
        obj.text(refreash);
        return;
    }else{
        obj.unbind("click");
        //obj.attr("disabled", true);
        obj.text('');
        obj.css('color','#999');
        obj.text( countdown + secondsStr);
        countdown--;

        editCookie("secondsremained1",countdown,countdown+1);
    }
    setTimeout(function() { settimeOTP(obj) },1000) //每1000毫秒执行一次
}