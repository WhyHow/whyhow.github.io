---
author: YiZi
comments: true
date: 2016-03-07 13:32:09 +0800
layout: post
slug: lightboxhowto
title: 添加Lightbox的图片
categories: [行]
tags:
- Lightbox
- 教程
---
<a href="/public/images/gallery/TwoBears.jpg" data-lightbox="Lightbox1" data-title="两只熊">
<img src="/public/images/gallery/TwoBears.pv.jpg"></a>
往网站安装[Lightbox.js](http://lokeshdhakar.com/projects/lightbox2/)插件并不困难，8k的大小也比较能够忍受。安装时唯一需要注意的是Lightbox的Javascript脚本要放到页面底部加载，而且Jquery必须在之前先加载。否则Lightbox没有机会处理HTML里相关的图片。这个是给那些想往自己网站加Lightbox的读者的一点提示，对于单单的Lightbox的用户，你只需要下面的内容。下面是如何插入带Lightbox效果的图片（基本引用自文档）：

一. 单张图片

{% highlight xml %}
{% raw %}<a href="images/image-1.jpg" data-lightbox="image-1" data-title="My caption">Image #1</a>{% endraw %}
{% endhighlight %}

基本概念是构造一个链接，链接的属性是Lightbox打开后显示的图片， `data-lightbox`里写的是这个图片属于的序列，必须出现该属性，不然Lightbox不会认为这个图片需要处理。`data-title`是图片的名字，可写可不写，写了之后会显示在Lightbox的左下角。`Image #1`可以替换为任意可用于链接的HTML代码，诸如文字、图片等等。本文开头的那个图片的插入代码为：

{% highlight xml %}
<a href="/public/images/gallery/TwoBears.jpg" data-lightbox="Lightbox1" data-title="两只熊"><img src="/public/images/gallery/TwoBears.pv.jpg"></a>
{% endhighlight %}

注意到中间的`Image #1`我用`<img src="/public/images/gallery/TwoBears.pv.jpg">`替换了，这样就实现了缩略图查看，点击看大图的效果。

二. 多张图片

多张图片和单张图片的基本方法是一样的，除了多张图片需要将 `data-lightbox`设置为相同的值，这样Lightbox就会将这些图片整合成一个序列。做法如下：

{% highlight xml %}
<a href="images/image-2.jpg" data-lightbox="roadtrip">Image #2</a>
<a href="images/image-3.jpg" data-lightbox="roadtrip">Image #3</a>
<a href="images/image-4.jpg" data-lightbox="roadtrip">Image #4</a>
{% endhighlight %}

中间的文字可以用预览图替换，诸如 [这篇文章]({% post_url  2016-03-03-productphoto %})，点击任何一个图片都是开始Lightbox的循环播放。当然，还有一种方案是只显示第一张缩略图，点开之后显示整个序列，诸如 [这篇文章]({% post_url  2016-03-04-bythebay2 %})，点击图片之后就会开始掩饰整个序列。这个效果的实现是这样的：

{% highlight xml %}
<a href="/public/images/gallery/bythebay/8.jpg" data-lightbox="LightTree" data-title="紫色的树">
<img src="/public/images/gallery/bythebay/8.jpg"></a>
<a href="/public/images/gallery/bythebay/3.jpg" data-lightbox="LightTree" data-title="看什么"></a>
<a href="/public/images/gallery/bythebay/4.jpg" data-lightbox="LightTree" data-title="给我消失"></a>
<a href="/public/images/gallery/bythebay/7.jpg" data-lightbox="LightTree" data-title="橘黄的树"></a>
{% endhighlight %}

也即，除了第一张图片显示预览图以外，后面只生成链接，而不设链接的点击对象。
