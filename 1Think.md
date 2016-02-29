---
layout: page
title: 思：学而不思则罔
slug: Think
---
<div class="prelude">
我思故我在。点滴思考勾勒出生命的迹线，期待与您的相交。
</div>
<hr/>
<div class="posts">
<div class="load">
</div>
</div>
<a id="next">加载更多内容</a>


<script type="text/javascript" src="/public/js/jquery.min.js"></script>
<script type="text/javascript" src="/public/js/whyhow.js"></script>
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

   fetchingContent = false;    
   window.onscroll = yHandler;
   $(document).ready(yHandler);
</script>


