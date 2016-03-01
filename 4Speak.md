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
<a id="next">加载更多内容中，请稍候……</a>


<script type="text/javascript" src="/public/js/jquery.min.js"></script>
<script type="text/javascript" src="/public/js/whyhow.js"></script>
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

   fetchingContent = false;    
   window.onscroll = yHandler;
   $(document).ready(yHandler);
</script>


