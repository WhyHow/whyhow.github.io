---
author: YiZi
comments: true
date: 2016-04-13 21:25:40 +0800
layout: post
slug: taylor0413
title: 多元泰勒展开
categories: [行]
tags:
- 数学
- 数值分析
- Mathematica
- 教程
- 符号运算
---

今天翻了下上数值分析课的时候的笔记，发现一个多元泰勒展开的实现比较有意思。这里共享出来大家玩玩。

不知道大家知不知道多元函数的泰勒展开的定义是这样的：

>函数f(x,y)的泰勒展开是F(t)=f(x+h t, y+k t)的一元函数当t=1时的一元函数泰勒展开。

所以，实现起来就很简单了：

Mathematica里的实现是这样的：

{% raw %}
Normal[Series[f[x + h t, y + k t], {t, 0, 2}]] /. t -> 1
{% endraw %}

$$
\frac{1}{2} \left(h^2 f^{(2,0)}(x,y)+2 h k
   f^{(1,1)}(x,y)+k^2 f^{(0,2)}(x,y)\right)+h
   f^{(1,0)}(x,y)+k f^{(0,1)}(x,y)+f(x,y)
$$

不过遗憾的是没有O的结果了，这个目前并没有找到解决方案。略微Show一下功能：

{% raw %}
Normal[Series[Sin[(x + h t) (y + k t)], {t, 0, 4}]] /. t -> 1
{% endraw %}

$$
-\frac{1}{2} h^2 k^2 \sin (x y)+\frac{1}{24} \sin (x
   y) (h y+k x)^4-\frac{1}{2} \sin (x y) (h y+k
   x)^2-h k \sin (x y) (h y+k x)-\frac{1}{6} \cos (x
   y) (h y+k x)^3-\frac{1}{2} h k \cos (x y) (h y+k
   x)^2+\cos (x y) (h y+k x)+h k \cos (x y)+\sin (x
   y)
$$

Sympy的级数展开还相当弱，各种不能展开，就不提Python下这个功能的实现了。



