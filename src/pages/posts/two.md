---
layout: '../../layouts/MarkdownPost.astro'
title: '[源码研究] Golang 标准库 net/http 和 HTTP 服务 (Serve) '
pubDate: 2022-06-25
description: '很多Go web框架都通过封装 net/http 来实现核心功能，因此学习 net/http 是研究 Gin等框架的基础。'
author: 'Austin'
image:
    url: 'https://lookcos.cn/usr/uploads/2022/04/2067928922.png'
    square: 'https://lookcos.cn/usr/uploads/2022/04/2067928922.png'
    alt: 'cover'
tags: ["特写", "标准库", "golang", "gin"]
theme: 'dark'
---

![在印度马哈拉施特拉邦，Apple 与 Applied Environmental Research Foundation 展开合作，对红树林进行保护与培育。这一海岸森林生态系统可以吸收和存储大气中的二氧化碳。](https://www.apple.com.cn/newsroom/images/values/environment/Apple-Earth-Day-India-mangrove-Alibaug-canoe_Full-Bleed-Image.jpg.large_2x.jpg)

在马哈拉施特拉邦繁华的滨海城市孟买以南仅约 96 公里的地方，出现了一个截然不同的世界。繁华都市的摩天大厦、餐厅、酒店、购物区、不计其数的“嘟嘟车”与现代汽车逐渐消失，未铺装的道路、棕榈树、山羊、拉车的牛、小型露天市场和路边餐馆出现在视野里。

Raigad 县的 Alibaug 连接了孟买与通向阿拉伯海的河网。海岸地区长有 21000 公顷红树林。红树林是地球最为天然的守护者之一，能够抵御气候变化带来的种种影响，包括突如其来的暴雨、海潮上升、热带气旋或飓风，甚至海啸。同时，红树林还能起到碳汇的作用，吸收大气中的二氧化碳，并将其存储在土壤、植物和其他沉积物中，这一机制被称为“蓝碳”。

Applied Environmental Research Foundation（AERF）在 2021 年获得了 Apple 的资助。该组织正在这一地区进行探索，计划通过在当地社区中创设可持续的替代行业，来培育红树林生态系统的生物多样性与适应能力并从中受益，从而保护红树林的未来。保护协议将向当地村民提供持续性支持，以换取对土地的保护，并促进当地经济转型，使之有赖于保持红树林的完好与健康。 


![在印度马哈拉施特拉邦 Raigad 县，当地村庄的渔民以捕捞红树林内及海岸的小虾、泥蟹等水产为生。](https://www.apple.com.cn/newsroom/images/values/environment/Apple-Earth-Day-India-mangrove-fisherman-with-net_big_carousel.jpg.large_2x.jpg)


AERF 还将从保护国际基金会（Conservation International）2018 年启动的哥伦比亚 Cispatá 试行蓝碳项目获得的经验应用到印度的红树林。

“对抗气候变化，是在为全球各地受这场危机影响最严重的社区而奋斗。从哥伦比亚到肯尼亚，再到菲律宾，人们的生活和生计饱受气候变化的威胁，这也正是我们工作的重点。”Apple 环境、政策与社会事务副总裁 Lisa Jackson 表示，“我们在印度的新的合作项目延续了这一努力，帮助当地社区从红树林的保育中收获经济利益，并抵御气候变化的恶劣影响。”

AERF 主席 Archana Godbole 从小就热爱大自然。“植物代表了年龄与时间，”她表示，“而树木则代表了耐心。它们是时间的无声观众——我越是研究树木、了解树木，就越在它们面前感到渺小。我的经历让我逐渐意识到，我想为保护和拯救树木与森林而工作。”

![Applied Environmental Research Foundation 主席 Archana Godbole 是一位植物分类学家，她在过去三十年间一直致力于以社区为基础的环保工作。](https://www.apple.com.cn/newsroom/images/values/environment/Apple-Earth-Day-India-mangrove-Archana-Godbole_big.jpg.large_2x.jpg)
