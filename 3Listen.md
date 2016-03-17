---
layout: page
title: 听：敏而好学
slug: Listen
---
<div class="prelude">
风应四时，起于八方。树随风动，树动风改。听风辨声，集叶知秋。
</div>
<a id="getlist" href="/indexes/bycategories/3">载入本类文章列表</a>

<div id="indexcontainer"></div><hr/>
<div class="posts">
<div class="load">
</div>
</div>
<a id="next">加载更多内容中，请稍候……</a>

<script>
    var urls=new Array();
    {% for post in site.categories['听']  %}    {% if post.url %}    urls[urls.length]="{{ post.url }}";    {% endif %}
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


