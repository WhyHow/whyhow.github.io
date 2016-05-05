---
layout: default
title: 索引
slug: tags
search_omit: true
---
# 标签索引
下面是按照标签归档的文章索引，可读性不强，供需要的大家参考。
<ul>
{% for category in site.tags %}
  <li class="listhead"><a name="{{ category | first }}">{{ category | first }}</a>
    <ul>
    {% for posts in category %}
      {% for post in posts %}
      	{% if post.url %}
        <li class="postitem {{ post.categories }}"><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endif %}
      {% endfor %}
    {% endfor %}
    </ul>
  </li>
{% endfor %}
</ul>

