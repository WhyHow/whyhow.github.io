---
layout: default
title: 索引
slug: Archive
---
# 时间线
下面是按照时间归档的文章索引，方便大家查找需要的文章。

<ul class="postList archive">
 {% for post in site.posts %}

 {% if post.next %}    
 {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
 {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
 {% capture month %}{{ post.date | date: '%m' }}{% endcapture %}
 {% capture nmonth %}{{ post.next.date | date: '%m' }}{% endcapture %}
 {% endif %}

 {% if forloop.first %}        
 <!-- year -->
 <li class="listhead"><h1 id="{{ post.date | date: '%Y' }}">{{ post.date | date: '%Y' }}年</h1>     
  <ul>
   <!-- month -->
   <li><h2 id="{{ post.date | date: '%Y-%m' }}">{{ post.date | date: '%m' }}月</h2>        
    <ul>      
     {% else %}
     <!-- all other posts -->                
     {% if year != nyear %}  
  </ul>
</li>           
<!-- /month --> 
</ul>
</li>
<!-- /year -->
<!-- year -->
<li class="listhead"><h1 id="{{ post.date | date: '%Y' }}">{{ post.date | date: '%Y' }}年</h1>   
  <ul>
   <!-- month -->
   <li><h2 id="{{ post.date | date: '%Y-%m' }}">{{ post.date | date: '%m' }}月</h2>            
    <ul>    
     {% elsif month != nmonth %}
  </ul>
</li>           
<!-- /month --> 
<!-- month -->
<li><h2 id="{{ post.date | date: '%Y-%m' }}">{{ post.date | date: '%m' }}月</h2>            
 <ul>                        
  {% endif %}         
  {% endif %}  
  <li class="postitem {{ post.categories }}"><a href="{{ post.url }}">{{ post.title }}</a></li>

  {% if forloop.last %}
</ul>
</li>           
<!-- /month --> 
</ul>
</li>
<!-- /year -->    
{% endif %}                
{% endfor %}                            
</ul>   

同时，本站使用了访问跟踪技术，这是本站的访问统计（Clicky提供的数据）。

<script src="//widgets.clicky.com/tally/?site_id=100929068&sitekey=ab30555daa51fb2d450385dd0a97b3c7&width=175&height=250&title=&hide_title=1&hide_branding=1" type="text/javascript"></script>
