---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import Image from '@comps/Image.astro'
  import img2 from '@assets/blog/tech/20220430-svg-as-angular-template/0.avif'
title: Use SVG as Angular Template
publishDate: April 30, 2022
authorName: '@FrenchTechLead'
authorSocial: 'https://twitter.com/FrenchTechLead'
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220430-svg-as-angular-template/0.jpg
postImageLocal: /assets/blog/tech/20220430-svg-as-angular-template/0.avif
postImageAlt: Use SVG as Angular Template
postImageWidth: 600
postImageHeight: 327
keywords:
  - Angular
  - Templates
  - SVG
  - Figma
permalink: https://frenchtechlead.com/posts/tech/20211027-java-memory-management/
description: 'This article explains how to use SVGs as Template for Angular Components'
draft: true
---

One of the least known features of **Angular** is its capability to handle **SVGs** as **Templates**, most people use **HTML** as the templating language for their components, but do you know that you can use **SVG** as well? I didn't ! until I came across a situation where I had to represent a very complicated and dynamic **network diagram** the same way it was drawn on the Figma Mockup.

<Separator/>



