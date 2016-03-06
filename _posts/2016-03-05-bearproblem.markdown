---
author: YiZi
comments: true
date: 2016-03-05 11:03:34 +0800
layout: post
slug: bearproblem
title: 喝啤酒的问题
categories: [行]
tags:
- Mathematica
- 教程
---
![](/public/images/Bear/5.png)
昨天同事在朋友圈里问了一个问题，

	10块钱买啤酒，2块钱一瓶，2个空瓶或者4个瓶盖可以再换一瓶，问能买几瓶啤酒？

这个问题其实手算或者用Excel都挺容易的，不过这里用Mathematica来解决这个问题。代码很简单：

{% highlight mma %}

Bear[{钱_, 瓶盖_, 空瓶_, 啤酒总数_}] := 
 Module[{这次买到 = Floor[钱/2] + Floor[瓶盖/4] + Floor[空瓶/2]}, {Mod[钱, 2], 
   Mod[瓶盖, 4] + 这次买到, Mod[空瓶, 2] + 这次买到, 啤酒总数 + 这次买到}]

{% endhighlight %}

基本就是题目的翻版，输进去就能有答案：

{% highlight mma %}
{% raw %}

In[2]:= Bear[{10, 0, 0, 0}]

Out[2]= {0, 5, 5, 5}

{% endraw %}
{% endhighlight %}

明显不对嘛，很简单啊，你这个问题是求不动点问题啊，所以正确的答案应该是

{% highlight mma %}
{% raw %}

In[3]:= FixedPoint[Bear, {10, 0, 0, 0}]

Out[3]= {0, 3, 1, 15}

{% endraw %}
{% endhighlight %}
如果到这就结束了那该多无聊，所以我们就开始研究了。兑换过程是这样的：

{% highlight mma %}
{% raw %}

In[4]:= FixedPointList[Bear, {10, 0, 0, 0}]

Out[4]= {{10, 0, 0, 0}, {0, 5, 5, 5}, {0, 4, 4, 8}, {0, 3, 3, 11}, {0,
   4, 2, 12}, {0, 2, 2, 14}, {0, 3, 1, 15}, {0, 3, 1, 15}}	

{% endraw %}
{% endhighlight %}
如果换成100个，答案是：

{% highlight mma %}
{% raw %}

In[5]:= FixedPointList[Bear, {100, 0, 0, 0}]

Out[5]= {{100, 0, 0, 0}, {0, 50, 50, 50}, {0, 39, 37, 87}, {0, 30, 28,
   114}, {0, 23, 21, 135}, {0, 18, 16, 150}, {0, 14, 12, 162}, {0, 11,
   9, 171}, {0, 9, 7, 177}, {0, 6, 6, 182}, {0, 6, 4, 186}, {0, 5, 3, 
  189}, {0, 3, 3, 191}, {0, 4, 2, 192}, {0, 2, 2, 194}, {0, 3, 1, 
  195}, {0, 3, 1, 195}}

{% endraw %}
{% endhighlight %}
继续扩展，啤酒个数和钱数的关系是咋样的？

假设是30块钱以内：

{% highlight mma %}
{% raw %}

Plot[Last@FixedPoint[Bear, {x, 0, 0, 0}], {x, 0, 30}, 
 PlotPoints -> 200, PlotTheme -> "Web"]

{% endraw %}
{% endhighlight %}
你得到的是如下关系：

![](/public/images/Bear/1.png)


假设到10000块钱，那么将是：

![](/public/images/Bear/2.png)

其实大概你的啤酒数等于两倍的钱数，这个有解析解的啦，有兴趣去推导去，不过我不觉得能得到更多信息。

然后可以来看看你需要计算的次数，对于10块钱以内的情况是这样的：

{% highlight mma %}
{% raw %}

Plot[Length@FixedPointList[Bear, {x, 0, 0, 0}] - 1, {x, 0, 10}, 
 PlotPoints -> 200, PlotTheme -> "Web"]

{% endraw %}
{% endhighlight %}
![](/public/images/Bear/3.png)

增长到10000块的时候，情况是这样的：

![](/public/images/Bear/4.png)

次数显然和钱数大概是一个对数关系，不信你去推解析解啊，真的是近似对数的关系。所以你弄个Excel表格，迭代100次，对于正常的钱数，基本可以保证最后的结果已经收敛。最后祝大家玩得开心啦！

BTW，文章头上的图像是这个代码生成的：

{% highlight mma %}
{% raw %}

Plot[{{Last@FixedPoint[Bear, {x, 0, 0, 0}], 
   Length@FixedPointList[Bear, {x, 0, 0, 0}] - 1}}, {x, 0, 10}, 
 PlotPoints -> 200, PlotTheme -> "Web"]

{% endraw %}
{% endhighlight %}
