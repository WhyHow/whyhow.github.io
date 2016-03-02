---
author: YiZi
comments: true
date: 2016-03-02 13:34:49 +0800
layout: post
slug: Yunyingshang
title: 国内运营商劫持替换流量问题
categories: [听]
tags:
-  新浪微博
---
<div class="quote"> <blockquote>
    	来自<a href="http://weibo.com/ttarticle/p/show?id=2309403947881995354308">新浪微博</a>的消息提到
    </blockquote>
</div>

## 今天，你被运营商 “上” 了么？

<div class="WB_editor_iframe" node-type="contentBody" style="opacity: 1; zoom: 1;">
<p>抱歉今天用这个粗俗的标题，因为谈起这个话题，我相信很多人的心中只有愤怒与无奈。</p><p><i>据《</i>中国互联网络发展状况统计报告<i>》统计称，截止2015年12月，中国互联网用户数已达</i><b>6.88 亿，</b><i>互联网普及率为</i><b>50.3 %</b><i>；同时显示，我国手机网民规模达</i><b>6.20亿</b><i>，有</i><b>90.1%</b><i>的网民通过手机上网</i><b>。</b>这是什么概念？相当于每两个中国人中，就有一个人给宽带运营商付费并使用其提供的上网服务，而且几乎每人都使用移动终端。</p><p>巨大的商机下暗流涌动，怎可能收个宽带费就满足？！所以，网络流量劫持也成了中国互联网成长过程中撇不清的话题。如利用DNS污染、JS投毒、特定请求重定向等手段对搜索结果、广告、网页内容甚至下载文件进行劫持。轻则对正常网络体验造成影响，重则对网络信息真实性甚至我们账号安全造成泄露风险（一会儿在看这个： <a href="http://zone.wooyun.org/content/2507" target="_blank">你们以为运营商只是HTTP插点广告而已么，图森破啊</a> ）</p><p><p img-box="img-box" class="picbox"><img src="http://ww3.sinaimg.cn/large/761d2801gw1f1g8s1fb14j211y0lcjxd.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p>电脑端的流量劫持已屡见不鲜。但随着移动互联网的崛起，一双双的黑手也伸向了移动终端用户，体现比如明明在官方可信渠道（商城）下载的手机软件，结果安装后发现竟然是其他毫不相干的APP！</p><p><p img-box="img-box" class="picbox"><img src="http://ww3.sinaimg.cn/large/761d2801gw1f1g8tzu5h6j20ir068jrv.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p><p img-box="img-box" class="picbox"><img src="http://ww3.sinaimg.cn/large/761d2801gw1f1g8u7ptitj20j503p74o.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p>这种抱怨简直不能太多，有位白帽子的朋友被劫持，然后他亲自帮朋友调查了下这个过程，报告到了乌云  <a href="http://www.wooyun.org/bugs/wooyun-2016-0168329" target="_blank">疑似某基于运营商流量的APK劫持推广系统存漏洞（每天高达百万计的劫持数据统计）</a> &nbsp;，今天就是解读这位白帽中其中所发现的细节。</p><p><p img-box="img-box" class="picbox"><img src="http://ww1.sinaimg.cn/large/761d2801gw1f1g8tnwnnoj20p80hpgmf.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p>事件起源是白帽子某位唐山的兄弟说自己下载小米商店应用，无论是手机端还是 PC 端，下载到本地都会变成了 『UCBrowserV10.9.0.703XXX_(Build151211143335).apk』-- UC 浏览器，如上图。</p><p><p img-box="img-box" class="picbox"><img src="http://ww3.sinaimg.cn/large/761d2801gw1f1g8v8nw07j20hv0c6gmo.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p>白帽通过抓包发现在该运营商网络下，所有的apk请求（Android软件安装包）都会被重定向到一个神秘的系统，然后下载地址就被悄悄的替换掉了。</p><p><p img-box="img-box" class="picbox"><img src="http://ww4.sinaimg.cn/large/761d2801gw1f1g8vodlpzj20zs0j9myh.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p>不管怎样这个系统就是问题的关键，白帽打开这个IP后看到了一个『安装分发平台』。乌云君曾想象做这种流量劫持苟且之事的系统都是非常隐秘并且简陋的，这个系统这么高调并且似乎已经成熟化了，简直不能理解。<b>这个互联网太没有安全感。</b></p><p><p img-box="img-box" class="picbox"><img src="http://ww1.sinaimg.cn/large/761d2801gw1f1g91k3bp1j207j06raai.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p>可惜，信息安全上还没那么成熟（存在明显的SQL注射漏洞），这系统上所做的事情和记录都是可以轻易访问到。白帽子发现这个系统对每天对用户的劫持行为都进行了详细的记录。记录包括：来源地区、用户关键字、用户下载的apk、被替换的apk、用户IP、劫持时间等，这个应该是用来做费用结算的。</p><p><p img-box="img-box" class="picbox"><img src="http://ww1.sinaimg.cn/large/761d2801gw1f1g8waz594j20uj0fatai.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p><p img-box="img-box" class="picbox"><img src="http://ww4.sinaimg.cn/large/761d2801gw1f1g8wryfrtj20yl07sq42.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p>上图是一些下载小米商店和爱奇艺客户端的用户，都被悄悄的替换为UC浏览器安装包了。通过这系统自己的统计得知，每日的成功劫持数量少则六七十万、多则一百多万的劫持量，这只是一个准二线城市的量级。</p><p><p img-box="img-box" class="picbox"><img src="http://ww3.sinaimg.cn/large/761d2801gw1f1g8xncpgfj20b808eq3g.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p>社区里的白帽子还提供过更大的运营商劫持记录，百万其实也算少的，如果这种系统被黑客通过漏洞控制，批量下发恶意手机木马，那会是谁的责任？</p><p><p img-box="img-box" class="picbox"><img src="http://tc.sinaimg.cn/maxwidth.800/tc.service.weibo.com/pic3_zhimg_com/9526fa820f56f2e02203a0b5d07f3d23.jpg" data-origin-src="https://pic3.zhimg.com/9610edc1ba28e038ea884bb3f83a2962_b.jpg" alt=""><span class="picinfo" style="display: none;"></span></p></p><p>好说这么多，这到底是哪家运营商做的劫持？CNCERT对该漏洞的通报与反馈来看，你们说是哪家？</p><blockquote>已经转由CNCERT向中国电信集团公司、中国移动集团公司、中国联合网络通信集团有限公司通报，根据反馈情况，已经由中国电信进行后续处置。</blockquote>                  
</div>

<hr/>
<div class="commentsonquote">
<div class="yizi">网络运营商作为互联网的基本架构提供商，用户已经支付了网络服务费用。在用户不知情的情况下插入广告如果可以理解的话，那么直接替换可执行文件无疑对于用户计算机和移动设备存在危害（我觉得这里不能说是潜在危害了）。这应该认为是对用户个人资产的损害，也是对从业公司职业操守的践踏。<br/>
另外，我好奇UC浏览器出了多少钱？
</div>
</div>