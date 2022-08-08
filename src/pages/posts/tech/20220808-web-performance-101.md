---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import Tooltip from '@comps/Tooltip.astro'
  import img0 from '@assets/blog/tech/20220808-web-performance-101/0.png'
  import Image from '@comps/Image.astro'
title: Web Performance 101
publishDate: August 08, 2022
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220808-web-performance-101/0.png
postImageAlt: Web Performance 101
postImageWidth: 1280
postImageHeight: 720
keywords:
  - "Web Performance"
  - "Web Performance 101"
  - "How to Impove Site Speed ?"
  - "How to Improve Web Performance? "
  
permalink: https://frenchtechlead.com/posts/tech/20220808-web-performance-101/
description: "A complete guide to web performance. Learn how to improve your site speed and web performance by applying the best practices."
draft: true
---

<h2>What Does Web Performance Mean ? 🏎️</h2>

Web performance is the speed at which a website loads and how quickly it responds to user interactions. It is a critical factor in the success of a website. A slow website will have a **high bounce rate** and **low conversion rate <Tooltip txt='A conversion is the general term for a visitor completing a site goal, like subscibing or buying a product ...' />**. A fast website will have a **high conversion rate** and **low bounce rate <Tooltip txt='Bounce Rate is defined as the percentage of visitors that leave a webpage without taking any action' />**.

<Separator/>



<h2>Why Is Web Performance Important ? 🤔</h2>
There are many reasons why web performance is important. Here are the most important ones:
- **User Experience.** A fast website will provide a better user experience. A slow website will provide a bad user experience, stats shows that **53% of users will abandon a website if it takes more than 3 seconds to load.** (Source : [thinkwithgoogle.com](https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/))
- **Search Engine Optimization.** Google has introduced web vitals <Tooltip txt='Web vitals are a set of metrics that measure the user experience of a website'/> and is considering page speed as a ranking factor. A fast website will rank higher in search engines, stats show that the first result in Google gets **34%** of the clicks and the second result gets **17%** of the clicks (Source: [pollthepeople.app](https://pollthepeople.app/the-value-of-google-result-positioning-3/)).
- **Conversion Rate.** A fast website will have a higher conversion rate. A slow website will have a lower conversion rate.
- **Bounce Rate.** A fast website will have a lower bounce rate. A slow website will have a higher bounce rate.
- **Cost.** The hosting of a fast website more likely to cost less than the hosting of a slow website mostly because of the **bandwidth** and **CPU** usage of your hosting service.
> A good user expirience will lead to less stress and more productivity for your users, and will lead to less support tickets and more efficiency for your support team.

<Separator/>

<h2>What are the Top Web Performance Killers ? 💀</h2>

- Too many font/back network calls.
- Too many database queries.
- High reponse time of the backend.
- High response time of the database.
- Unoptimized backend computations.
- Unoptimized frontend computations.

<Separator/>

## How to Improve Web Performance ? 🚀

* **Profiling** : tbib ya7taj diagnostique avant traitement. ma takder dir walou avant de diagnostiquer al wa9t win raw yro7. installe les outils de Profiling li lazam. Ida rak Django chouf m3a : Django debug toolbar, Django silk. CProfile. Snakeviz, Pyroscope, Pghero, Network tab te3 Chrome dev tools. Performance tab te3 chrome dev tools. Lighthouse tab te3 chrome dev tools, etc.
* **Front caching **: Ida dert network call avec get. Khabi la réponse fel cache te3 front pour que les autres pages en profitent au lieu tab9a totlab la même donné à chaque fois. 
* **Back caching** : Ida 3labalak la response li raja3ha back n'a pas changé, ça sert à rien t3awad tahsabha. Khabiha f RAM m3a redis w 3awad récupiriha ki ta7taj'ha.
* **Asanah yotlab** : il faut pas charger une donnée user mazal ma tlab'hach. Asana yotlab'ha mba3ed sahal. Pagination c'est un exemple classique te3 point heda.
* **Optimistic writing** : fel post w patch w put w delete, Ida makach validation kbira fel back y a pas besoin tasanah yrepondi 200. Update UI instantanément. astuce simple hadi mais ça fait une différence énorme.
* **Change Detection**: change detection te3 frameworks ya9der ya3mi les perf koun ma ta3rflouch. Angular par ex donne la main de l'activer/désactiver Wella tbadal change detection strategy par component wella virtual-scroll. By the way hadi checklist Bahia te3 perf angular https://github.com/mgechev/angular-performance-checklist
* **Computation** : Ida kaia computation pense à optimiser comment tes algo sont écrits w khaiar bien tes structures de données. dict par ex permet un accès immédiat sans parcourir une liste.
* **GraphQL vs REST **: sa9si rohak Ida REST wella GraphQL raho plus pertinent pour ton produit pour éviter les problèmes te3 "under-fetching" w "over-fetching"
* **DB tuning** : al3ab avec les paramètres te3 SGBD en fonction de la charge et Les ressources te3 server. pgtune ya9der y3awnek Ida rak postgres https://pgtune.leopard.in.ua/#/
* **DB queries **: Ida une couche te3 back jabatt info men database vaut mieux tpassiha vers la couche suivante au lieu de refaire la même db query à chaque fois dans la même http request. 
* **Indexes **: dir le bon indexe en fonction des critères de filtre w taba3 query execution plan si ça fait bien "Index Scan" au lieu de "Seq Scan".
* **Partitionning :** Si tu arrives à segmenter les queries li yasraw f une large table. Pense a partitionner la table pour chaque segment.
* **Denormalization** : parfois, pour des besoins de perf on est obligé de dé-normaliser la BDD en sauvegardant des données redondants calculables pour éviter de les calculer on the fly.
* **Parallel programming** : Traitement li ma yahtajech séquentialité dirou en parallèle. Khaiar bien le bon schéma de parallélisme en fonction du besoin : multi-threading, multi-processing, task queue, etc.
* **DevOps** : li hdarnah hatta dorka kamal dev. Mais DevOps 3ndo impact aussi. Bien paramétrer gunicorn, nginx, docker. Build front (Tree-shaking, minification, bundling, AOT compilation, etc.). Choisir les services cloud les plus pertinents, etc.