/**
 * Created by juancarlos on 7/11/2017.
 * Since the cobalt header is generated automatically,
 * this function enables us to post-insert jscript and/or css files
 * Please do not modify.
 */
var include_resource=function(t,fn,id){var f;var x;if(t=='js'){x=document.getElementById(id);if(x!==null) document.body.removeChild(x);
    f=document.createElement('script');f.setAttribute('type','text/javascript');f.setAttribute('src',fn);f.setAttribute('id',id);
    document.getElementsByTagName('head')[0].appendChild(f);}else{x=document.getElementById(id);if(x!==null) document.body.removeChild(x);f=document.createElement('link');
    f.setAttribute('rel','stylesheet');f.setAttribute('href',fn);f.setAttribute('id',id);document.getElementsByTagName('head')[0].appendChild(f);}};
var $my=function(n){m=n.slice(1);
    switch(n.charAt(0)){
        case "#":return document.getElementById(m);break;
        case ".":return document.getElementsByName(m);break;
        case "*":return document.getElementsByClassName(m);break;}};
var get_url=function(page,args){url=page+".php";if(args){url+="?";ctr=0;for(r in args){if(ctr>0) url+="&";url=url+r+"="+args[r];ctr++;}}console.log(url);return url;};
var access=function(page,args){window.open(get_url(page,args));};
var ctp=function(){ x=window.XMLHttpRequest ? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"); return x;};
var tp=function(f,page){var c=ctp(); c.onreadystatechange=function(){if(this.readyState==4 && this.status==200){r={response:this.responseText};f.call(r);}};c.open("GET",page,true);c.send();};
var mytp=function(f,page,args){tp(f,get_url(page,args));};

var get_student_img = function(id){
    if($("#photo").length) {
        $.post({
            url: Config.domain + Config.get_directory("api") + 'request_image.php',
            data: {id_number: id},
            success: function (data, status, xhr) {
                if (data != '') {
                    var xx = JSON.parse(data);
                    var mime_type = decodeURI(xx.mime_type);
                    var img_data = decodeURI(xx.data);

                    $('#photo').attr('src', 'data:' + mime_type + ';base64,' + img_data);
                } else {
                    $('#photo').attr('src', Config.get_directory("images") + 'nuis/no-picture.jpg');
                }
            },
            error:function(){
                $('#photo').attr('src', Config.get_directory("images") + 'nuis/no-picture.jpg');
            }
        });
    }
};

function submitenter(myfield,e)
{
    var keypressed = (e.keyCode ? e.keyCode : e.which);

    if (keypressed == 13)
    {
        show_loading_div();
        myfield.form.submit();
        e.preventDefault();
    }
}

function date_control(i){
    var input = i.toString();
    var d = new Date();
    var min_year = d.getFullYear() - 90;
    var max_year = d.getFullYear() + 10;
    $(input).datepicker({
        changeYear:true,
        changeMonth:true,
        yearRange: min_year + ":" + max_year
    });
}

function require_field(i){
    var input = i.toString();
    var allow = true;
    var first_input;
    $(i).each(function(){
        if($(this).prop("required")){
            var parent = $(this).parent();
            if($(parent).hasClass("input-group")){
                parent = $(parent).parent();
            }
            var remarks_slot = $(parent).find("span.required-remarks").html("");
            if($(this).val().trim() === "" && $(this).is(":not(:disabled)") && $(this).prop("readonly",false)){
                if($(remarks_slot).length){
                    $(remarks_slot).html("This field is required.");
                }else{
                    $(parent).append("<span class='text-danger small required-remarks'>This field is required.</span>");
                }
                $(this).addClass("required");
                if(!first_input){
                    first_input = $(this);
                }
                allow = false;
            }
        }
    });

    if(first_input) {
        $(first_input).focus();
    }
    return allow;
}

function set_selectize_value(select, value) {
    let a = $(select).selectize();
    let b = a[0].selectize;
    b.setValue(value);
}