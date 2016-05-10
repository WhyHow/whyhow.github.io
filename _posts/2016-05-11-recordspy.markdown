---
author: YiZi
comments: true
date: 2016-05-11 01:00:55 +0800
layout: post
slug: recordspy
title: 人性化使用SQL
categories: [行]
tags:
-  推荐
-  Python
-  教程
---

作数据库查询最烦的一点就是把最后的数据转换成想要的格式，一般自带的功能真是弱得可以。Records是一个很简单，但是挺方便的Python函数库，可以完成各种各样的SQL查询结果的格式的转换。

目前Records支持 Postgres, MySQL, SQLite, Oracle, and MS-SQL。下面是其主要功能的介绍：

我用新加坡公交车站的数据库作演示啦！

打开数据库，做一个无聊的查询，查看经纬度满足如下要求，名字结尾是int的公交站信息：

{% highlight python %}
import records
c = records.Database('sqlite:///bus-stops.db')

sql = '''select * from busstop where lat >1.2 and
lng <103.9 and 
name like '%int';'''
q = c.query(sql)
{% endhighlight %}

然后就是Records提供的功能了：

{% highlight python %}
# 提取一个记录
>>> q[0]
 <Record {"lat":1.2821015595,"lng":103.8172248026,"id":"10009","name":"Bt Merah Int"}>

# 访问其中的属性
>>> q[0].name
 u'Bt Merah Int'

# 访问另一个元素
>>> q[5].id
 u'23019'

# 记录仅仅查询到请求的最后一个元素，之前的结果会缓存
>>> q
 <RecordCollection size=6 pending=True>

# 支持的格式（可以直接导出Latex，JSON，XLSX，XLS，ODS什么的，佷方便的样子）
>>> q.dataset.get
q.dataset.get_col    q.dataset.get_json   q.dataset.get_xls
q.dataset.get_csv    q.dataset.get_latex  q.dataset.get_xlsx
q.dataset.get_dbf    q.dataset.get_ods    q.dataset.get_yaml
q.dataset.get_html   q.dataset.get_tsv
# 可以用Export直接导出想要儿格式
>>> q.export?
Signature: q.export(format, **kwargs)
Docstring: Export the RecordCollection to a given format (courtesy of Tablib).
Type:      instancemethod

# 比如CSV
>>> print q.export('csv')
id,lat,lng,name
10009,1.28210155945393,103.81722480263163,Bt Merah Int
11521,1.2885710102662,103.80543003047167,Anchorpoint
14009,1.26703502614245,103.81901469907409,HarbourFront Int
17009,1.31491572870629,103.76412225438476,Clementi Int
22009,1.33932334709184,103.70545701843297,Boon Lay Int
23019,1.32302099996901,103.69256700002227,Nippon Paint
24009,1.32697254709069,103.67839791240787,Joo Koon Int
28009,1.3334081875974,103.74154249246223,Jurong East Temp Int
28061,1.33596390763107,103.74254813709638,Jurong East Stn/Int
43009,1.34999354306126,103.75106190953444,Bt Batok Int
44009,1.38551052071341,103.74407583750003,Choa Chu Kang Int
46008,1.4375,103.78645,Woodlands Temp Int
46009,1.4375,103.78645,Woodlands Temp Int
52009,1.33202083385749,103.84692763524869,Toa Payoh Int
53009,1.35045541249544,103.84988083722291,Bishan Int
54009,1.36968769913339,103.84856716193268,Ang Mo Kio Int
55509,1.38113241525166,103.8455558816965,Yio Chu Kang Int
58009,1.44748179252514,103.81941391689068,Sembawang Int
59009,1.42997370944851,103.83743448975132,Yishun Temp Int
64009,1.37060695394614,103.89266808874676,Hougang Ctrl Int
64541,1.37122666703205,103.89261000001046,Hougang Ctrl Int
64549,1.37139998302648,103.89170972978319,Opp Hougang Ctrl Int
66009,1.35046610176969,103.87168992264617,Serangoon Int
66389,1.35092163758707,103.8710690514159,Bef Serangoon Int
67009,1.39178060381601,103.89588499436073,Sengkang Int

# 或者可以直接访问dataset的内容
>>> print q.dataset.json
[{"lat":1.2821015595,"lng":103.8172248026,"id":"10009","name":"Bt Merah Int"},{"lat":1.2885710103,"lng":103.8054300305,"id":"11521","name":"Anchorpoint"},{"lat":1.2670350261,"lng":103.8190146991,"id":"14009","name":"HarbourFront Int"},{"lat":1.3149157287,"lng":103.7641222544,"id":"17009","name":"Clementi Int"},{"lat":1.3393233471,"lng":103.7054570184,"id":"22009","name":"Boon Lay Int"},{"lat":1.323021,"lng":103.692567,"id":"23019","name":"Nippon Paint"},{"lat":1.3269725471,"lng":103.6783979124,"id":"24009","name":"Joo Koon Int"},{"lat":1.3334081876,"lng":103.7415424925,"id":"28009","name":"Jurong East Temp Int"},{"lat":1.3359639076,"lng":103.7425481371,"id":"28061","name":"Jurong East Stn\/Int"},{"lat":1.3499935431,"lng":103.7510619095,"id":"43009","name":"Bt Batok Int"},{"lat":1.3855105207,"lng":103.7440758375,"id":"44009","name":"Choa Chu Kang Int"},{"lat":1.4375,"lng":103.78645,"id":"46008","name":"Woodlands Temp Int"},{"lat":1.4375,"lng":103.78645,"id":"46009","name":"Woodlands Temp Int"},{"lat":1.3320208339,"lng":103.8469276352,"id":"52009","name":"Toa Payoh Int"},{"lat":1.3504554125,"lng":103.8498808372,"id":"53009","name":"Bishan Int"},{"lat":1.3696876991,"lng":103.8485671619,"id":"54009","name":"Ang Mo Kio Int"},{"lat":1.3811324153,"lng":103.8455558817,"id":"55509","name":"Yio Chu Kang Int"},{"lat":1.4474817925,"lng":103.8194139169,"id":"58009","name":"Sembawang Int"},{"lat":1.4299737094,"lng":103.8374344898,"id":"59009","name":"Yishun Temp Int"},{"lat":1.3706069539,"lng":103.8926680887,"id":"64009","name":"Hougang Ctrl Int"},{"lat":1.371226667,"lng":103.89261,"id":"64541","name":"Hougang Ctrl Int"},{"lat":1.371399983,"lng":103.8917097298,"id":"64549","name":"Opp Hougang Ctrl Int"},{"lat":1.3504661018,"lng":103.8716899226,"id":"66009","name":"Serangoon Int"},{"lat":1.3509216376,"lng":103.8710690514,"id":"66389","name":"Bef Serangoon Int"},{"lat":1.3917806038,"lng":103.8958849944,"id":"67009","name":"Sengkang Int"}]
{% endhighlight %}

功能列表如下，其他相关内容请到[官网查看](https://github.com/kennethreitz/records)：

- Iterated rows are cached for future reference.
- ``$DATABASE_URL`` environment variable support.
- Convenience ``Database.get_table_names`` method.
- Command-line `records` tool for exporting queries.
- Safe parameterization: ``Database.query('life=:everything', everything=42)``
- Queries can be passed as strings or filenames, parameters supported.




