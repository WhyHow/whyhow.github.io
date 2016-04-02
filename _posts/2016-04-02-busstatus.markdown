---
author: YiZi
comments: true
date: 2016-04-02 15:04:57 +0800
layout: post
slug: busstaus0401
title: 查看公交状态
categories: [行]
tags:
-  新加坡
-  公共交通
-  时间
-  无聊尝试
---
用LTA的api做了一个无聊的网页，托管在GAE上。基本就是直接把API里的所有信息显示出来，交给大家嗨喽！（没有任何交互和容错）

这个是图书馆对面的Bus信息：

<iframe src="//bt201501.appspot.com/html?stop=27219" width="100%" height="620px" scrolling="yes" marginheight="0" frameborder="0"></iframe>

这个是图书馆的Bus信息：27211

<iframe src="//bt201501.appspot.com/html?stop=27211" width="100%" height="620px" scrolling="yes" marginheight="0" frameborder="0"></iframe>

来个Bug的BoonLay的公交信息吧：22009

<iframe src="//bt201501.appspot.com/html?stop=22009" width="100%" height="900px" scrolling="yes" marginheight="0" frameborder="0"></iframe>

不说太多了吧，大家自己去玩吧，https://bt201501.appspot.com/html?stop=[公交站台号], https://bt201501.appspot.com/html?stop=[公交站台号]&bus=[公交车号]。