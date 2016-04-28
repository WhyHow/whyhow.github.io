---
author: YiZi
comments: true
date: 2016-04-29 01:10:28 +0800
layout: post
slug: rime0429
title: RIME输入法在Finder中自动切换成英文
categories: [行]
tags:
- 软件
- 输入法
- 个人观点
- Squirrel
---
RIME可以在一些制定的程序中切换为英文输入，这个功能还不错。不过我发现好像即便是按照各种说明里的设置了

{% highlight yaml %}
{% raw %}
  app_options:
    com.apple.Finder:
      ascii_mode: true
      no_inline: true
{% endraw %}
{% endhighlight %}

你一样会在Finder里看到输入框，我先怀疑是我装了XtraFinder的原因，所以把XtraFinder也加入到了配置文件当中，但是并没有什么用。

最后，发现新版的Mac系统中的Finder的识别名字已经不是`com.apple.Finder`了，而是`com.apple.finder`，把这个名字输入进去之后好像一切就正常了。当然对于大多数程序可能更多的需要默认是英文输入，所以就在默认输入法的位置直接将默认的输入法状态改成了英文：

{% highlight yaml %}
{% raw %}
  switches:
    - name: ascii_mode
      reset: 1
      states: ["中文", "西文"]
{% endraw %}
{% endhighlight %}

昨天说的中英混输的问题部分上也算解决了，不过还是很不好用，大概做法是在输入法的transtlator底部加上你的英文字典，同时把英文字典载入进来：

{% highlight yaml %}
{% raw %}
  engine:
    translators:
      - table_translator@easy_en
  easy_en:
    dictionary: easy_en
{% endraw %}
{% endhighlight %}

emoji的问题基本上可以类似的解决。

总的来说，基本上还是昨天说的那两个问题，**自动补全**和**误码率**问题。怎么我总是感觉这个输入法是不是没有用HMM，输入长一点的词汇就会出现分词错误，各种误码。比如刚才的句子照理来说，“输入长一点”的默认选词是“输入长一点”，那么输入“输入长一点的句子”的默认选词应该就是“输入长一点的句子”，但是好像首次输入的时候返回的默认候选想（候选项）却是“输入倡议点的句子”。你看刚才的“候选项”也是这个问题。照理来说现在的分词和词库技术应该是可以正确的给出这样词汇的候选项了，不知道这个是怎么回事。今天导入了尝试导入了网上的一个搜狗词库，发现误码率变得更高，所以就直接删除了。看来不是专门针对这个输入法制作的词库并不会给这个输入法带来太多的好处。自动补全的问题，比如导入了是词库（诗词库）之后，打长江后浪之后应该可以补全出长江后浪推前浪在第二个或者靠后一点的候选项啊。完全不知道是怎么回事。一个奇怪的bug是，比如我打啊哈哈哈的双拼，照理来说是oahahahaha，但是这个微软双拼方案会将o断开，如果不打完oahahahaha，那么返回的可能是哦昂昂昂昂，明显ooahahah，多一个h少一个h使用两种差别那么大的输出是不是有点奇怪。都说了是双拼了，这种容错完全没意义啊！？


那最后还得提一下中英混输的问题，一些词汇是会形成英文单词的，比如那么name，就是英文单词的name，如果使用easy_en默认的字典，基本上你敲可以容忍的次数，返回的都是name是第一个首选词，这个时候只有直接曲盖（直接去改）name在字典中的权重，让那么出现在name的前面。不过不知道这样是不是破坏了easy_en字典的权重方案。我把name的权重从
name	name	638000000
改成了
name	name	38000000
还是不好用
所以索性改成了
name	name	10
基本上等于name这个词将低于其他大部分英语词汇的出现频率。无论如何，这些非官方的字典的匹配程度还真是不怎么啊！
