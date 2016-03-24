---
layout: default
title: 索引
slug: Archive
search_omit: true
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


