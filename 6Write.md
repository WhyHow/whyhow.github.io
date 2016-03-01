---
layout: page
title: 写：贫而乐
slug: Write
---
<div class="prelude">
手拙不能画，也能以照片留住心头感动。乙回庐之画廊，不为专业，只为感恩这世界的温柔。
</div>
<a id="getlist" href="/indexes/bycategories/6">载入本类文章列表</a>
<div id="indexcontainer"> </div><hr/>
<div class="posts">
<div class="load">
</div>
</div>
<a id="next">加载更多内容中，请稍候……</a>


<script type="text/javascript" src="/public/js/jquery.min.js"></script>
<script type="text/javascript" src="/public/js/whyhow.js"></script>
<script>
    var urls=new Array();
    {% for post in site.categories['写']  %}
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
    $('#getlist').on('click', function(e){
      e.preventDefault();
      $('#indexcontainer').load($(this).attr('href'));
    })
   });
</script>


