---
layout: page
title: 读：行有余力，则以学文
slug: Read
---
<div class="prelude">
世事洞明皆学问，人情练达即文章。读文章，知百态。乙回庐的剪报集，奇文共欣赏，疑义相与析。
</div>
<a id="getlist" href="/indexes/bycategories/5">载入本类文章列表</a>
<div id="indexcontainer"></div><hr/>
<div class="posts">
<div class="load">
</div>
</div>
<a id="next">加载更多内容中，请稍候……</a>


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
   fetchingContent = false;    
   window.onscroll = yHandler;
   $(document).ready(function(){
    yHandler();
    getIndex();
   });
</script>


