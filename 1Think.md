---
layout: page
title: 思：学而不思则罔
slug: Think
---
<div class="prelude">
互联网的发展使得信息的获取和查找极为方便，每天我们都会处理大量的信息，这些信息之间结构混杂、观点丰富，因此需要按照孔子的教导不但积极地获取知识，而且要努力地整理和思考获得的信息，从纷乱的输入中形成结构、归纳思想。在这一个版块中，您将看到我们的一些尝试，我们也热切的希望您提出您的看法和观点，还是孔子说的“三人行必有我师也”。
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
{% for post in site.categories['思']  %}
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


