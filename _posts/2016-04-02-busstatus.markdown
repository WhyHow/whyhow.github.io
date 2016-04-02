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
用LTA的api做了一个无聊的网页，托管在GAE上。基本就是直接把API里的所有信息显示出来，交给大家嗨喽！（没有任何交互和容错）国内的用户直接忽略，GAE貌似大陆不明原因不能访问，而且这个BUS只是新加坡可用的。

这个是图书馆对面的Bus信息：

<iframe src="//bt201501.appspot.com/html?stop=27219" width="100%" height="500px" scrolling="yes" marginheight="0" frameborder="0"></iframe>

这个是图书馆的Bus信息：27211

<iframe src="//bt201501.appspot.com/html?stop=27211" width="100%" height="500px" scrolling="yes" marginheight="0" frameborder="0"></iframe>

来个Bug的BoonLay的公交信息吧：22009

<iframe src="//bt201501.appspot.com/html?stop=22009" width="100%" height="800px" scrolling="yes" marginheight="0" frameborder="0"></iframe>

不说太多了吧，大家自己去玩吧，https://bt201501.appspot.com/html?stop=[公交站台号], https://bt201501.appspot.com/html?stop=[公交站台号]&bus=[公交车号]。

以下是NTU内所有车站的列表：

- [图书馆](https://bt201501.appspot.com/html?stop=27211)
- [图书馆对面](https://bt201501.appspot.com/html?stop=27219)
- [School of CEE](https://bt201501.appspot.com/html?stop=27221)
- [Sch Of Comm And Info](https://bt201501.appspot.com/html?stop=27231)
- [Hall 7](https://bt201501.appspot.com/html?stop=27241)
- [Innovation Ctr](https://bt201501.appspot.com/html?stop=27251)
- [Hall 4](https://bt201501.appspot.com/html?stop=27261)
- [Hall 1](https://bt201501.appspot.com/html?stop=27281)
- [Opp Hall 6](https://bt201501.appspot.com/html?stop=27291)
- [Hall 2](https://bt201501.appspot.com/html?stop=27311)
- [Opp ADM](https://bt201501.appspot.com/html?stop=27069)
- [Canteen 9](https://bt201501.appspot.com/html?stop=27209)
- [Hall 11](https://bt201501.appspot.com/html?stop=27199)
- [Graduate Hall](https://bt201501.appspot.com/html?stop=27011)
- [Hall 15](https://bt201501.appspot.com/html?stop=27021)
- [NIE CP Y](https://bt201501.appspot.com/html?stop=27041)
- [NIE 图书馆](https://bt201501.appspot.com/html?stop=27051)
- [PUB Sub-Stn](https://bt201501.appspot.com/html?stop=27181)
- [Opp PUB Sub-Stn](https://bt201501.appspot.com/html?stop=27189)
- [Clean Tech One](https://bt201501.appspot.com/html?stop=27171)
- [Opp Clean Tech One](https://bt201501.appspot.com/html?stop=27179)
