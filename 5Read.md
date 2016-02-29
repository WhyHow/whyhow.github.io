---
layout: page
title: 读：行有余力，则以学文
slug: Read
---
<div class="prelude">
世事洞明皆学问，人情练达即文章。读文章，知百态。乙回庐的剪报集，奇文共欣赏，疑义相与析。
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
{% for post in site.categories['读']  %}
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


