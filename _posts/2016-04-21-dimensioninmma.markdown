---
author: YiZi
comments: true
date: 2016-04-21 01:26:06 +0800
layout: post
slug: dimensionmma
title: Mathematica的量纲和单位模块
categories: [行]
tags:
- 数学
- 量纲
- Mathematica
- 教程
---

Mathematica 从10.0 引入了单位模块，一直觉得挺鸡肋的所以并没有仔细了解。最近几天了解了一下发现设计还是比较不错的，需要做量纲和单位相关的读者不妨了解一下。

## 单位相关内容

单位相关的内容其实意思不是很大，主要的优势在于Mathematica可以带着单位进行计算，诸如微分啊，积分啊，解方程啊，绘图啊。定义带单位的量用Quantity函数：

Quantity[magnitude,unit]  

和定义带单位的变量的函数

QuantityVariable[var,"pq"] 

例如：

	Quantity[8, "Meters"]

还算直观，不过关键问题是你怎么知道后面那个单位的全称，部分缩写是支持的。随意输入一个缩写的话，如果可以访问网络，那么会从Wolfram上基于自然语言猜测单位，不然的话就会返回错误。

下面应该是单位相关的主要函数：

**UnitConvert[quantity,targetunit]**（推荐使用）  或者 UnitConvert[quantity,unitsystem] 用来转换单位，例如：

	UnitConvert[Quantity[60, "Pounds"], "g"]

	Quantity[136077711/5000, "Grams"]

	UnitConvert[Quantity[60, "Pounds"]] 自动到SI单位制

	Quantity[136077711/5000000, "Kilograms"]

CommonUnits[{Subscript[quantity, 1],Subscript[quantity, 2],\[Ellipsis],Subscript[quantity, n]}] 想法不错，不过不是很好用。不如自己用UnitConvert好控制。

{% raw %}
	CommonUnits[{Quantity[10, "Feet"], Quantity[300, "Inches"], Quantity[4.25, "Meters"]}]

	{Quantity[120, "Inches"], Quantity[300, "Inches"], Quantity[167.323, "Inches"]}
{% endraw %}

UnitSimplify[quantity] 山寨功能，并不好用。

	UnitSimplify[Quantity[3/4, "Pascals" "Meters"^4/"Newtons"]]

	Quantity[3/4, ("Meters")^2]

也可以自定义单位，参见 IndependentUnit。其他函数意思不大，就不介绍了。

## 量纲相关内容
量纲的内容还是不错的，提供了以下几个函数：

**UnitDimensions[quantity]** （推荐使用） 返回量纲在基本量纲的表示，例如：

{% raw %}
	UnitDimensions["Pa"]

	{{"LengthUnit", -1}, {"MassUnit", 1}, {"TimeUnit", -2}}
{% endraw %}

**DimensionalCombinations[{Subscript[pq, 1],Subscript[pq, 2],\[Ellipsis]},dim]** （推荐使用） 返回到特定物理量的单位组合，dim为空时返回无量纲组合。

例如：

{% raw %}
	DimensionalCombinations[{"Pressure", "Force", "Length"}]

	{(QuantityVariable["Length","Length"]^2 QuantityVariable["Pressure","Pressure"])/QuantityVariable["Force","Force"]}
{% endraw %}


关于量纲分析相关的内容可以参见QuantityVariableDimensions的例子，里面给出了一个原子弹爆炸量纲分析的经典例子。

关于这个Package好像就有那么多内容，并没有太多值得介绍的东西。总得来讲，Mathmatica的这个物理量计算实现还算可以，虽然使用并不算很方便，不过整个系统中的支持还是不错的，从绘图到各类运算都比较支持（如果发现支持问题不用惊讶，这个库比较是2014年才引入的，并没有长期的测试过）。个人觉得除非要做单位换算，或者量纲分析，没有必要使用物理量作为计算中间环节的量，除了浪费时间和空间，降低程序稳定性好像没有看到什么明显的优势。
