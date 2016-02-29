---
layout: page
title: 说：其言也讱
slug: Speak
---
<div class="prelude">
有事长、无事短。虎啸虫鸣，皆为心声。此乃乙回庐之树洞也。
</div>
<hr/>
<div class="posts">
<div class="load">
</div>
</div>
<a id="next">加载更多内容</a>


<script type="text/javascript" src="/public/js/jquery.min.js"></script>
<script>
var urls=new Array();
{% for post in site.categories['说']  %}
 {% if post.url %}
	urls[urls.length]="{{ post.url }}";
 {% endif %}
{% endfor %}
var index = 0;
if(urls.length>0){
	$('#next').attr('href',urls[0]);
}else{
	$('#next').html('未发现更多内容');
}

    var fetchingContent = false;

    function yHandler() {
        var wrap = $('.posts')[0];
        var contentHeight = wrap.offsetHeight;
        var yOffset = window.pageYOffset;
        var y = yOffset + window.innerHeight;

        if (y >= contentHeight && !fetchingContent) {
            // set to TRUE before AJAX request
            fetchingContent = true;
            $(".load:last").load(urls[index] + " div.post");
            index += 1;
            if (index >= urls.length) {
                fetchingContent = true;
                $('#next').removeAttr('href');
                $('#next').html('未发现更多内容');
            } else {
                fetchingContent = false;
                $('.posts').append('<div class="load"/>');
                $('#next').attr('href', urls[index]);
            }
        }
    }

    window.onscroll = yHandler;

    $( document ).ready(function(){
    var wrap = $('.posts')[0];
    var contentHeight = wrap.offsetHeight;
    for (var url in urls) {
        contentHeight = wrap.offsetHeight;
        if (window.innerHeight >= contentHeight && !fetchingContent) {
            // set to TRUE before AJAX request
            fetchingContent = true;
            $(".load:last").load(urls[index] + " div.post");
            index += 1;
            if (index >= urls.length) {
                fetchingContent = true;
                $('#next').removeAttr('href');
                $('#next').html('未发现更多内容');
            } else {
                fetchingContent = false;
                $('.posts').append('<div class="load"/>');
                $('#next').attr('href', urls[index]);
            }
            $.delay(1000);
        } else {
            break;
        }
    }
});
</script>


