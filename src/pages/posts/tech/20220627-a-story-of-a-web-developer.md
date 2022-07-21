---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img0 from '@assets/blog/tech/20220627-a-story-of-a-web-developer/0.png'
  import Image from '@comps/Image.astro'
title: A Story of a Web Developer, Part 1
publishDate: June 27, 2022
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220627-a-story-of-a-web-developer/0.png
postImageAlt: A Story of a Web Developer, Part 1
postImageWidth: 842
postImageHeight: 468
keywords:
  - "A Story of a Web Developer"
  - "Thoughts about web development"
  - "How to choose the right web development framework"
permalink: https://frenchtechlead.com/posts/tech/20220627-a-story-of-a-web-developer/
description: "Some thoughts about web developmeent and the right framework to use."
draft: false
---

### Just some random Thoughts 👨‍💻
I started JavaScript in 2010 when I graduated from high school.
Before that, I used to create HTML pages without any JavaScript but I was still able to make dynamic sites in Php/MySQL (the newbie stack at the time).

After my baccalaureate I discovered the world of JavaScript and JQuery, I was impressed by the fact of being able to exchange data with my backend server without refreshing the page (AKA Ajax), and the possibility of making animations with JavaScript seemed revolutionary to me (it was well before CSS3 and the support of animations in pure CSS).
At that time I was multiplying freelance missions while being a student, I made websites for my acquaintances for a few pennies.

During my studies I mostly focused on Java SE, between studies at the University and my full-time job in Parisian hotels, I didn't have much time to devote to web development.

In December 2016 I got really sick and was hospitalized for a period of three weeks, This was an opportunity for me to learn new technos, React was making a lot of noise at the time, so I learned the library from the official docs, and I followed up with Redux by taking the "official" course of Dan Abramov on EggHead 🥚
I capitalized on the training by applying it to my various university projects, which were far beyond the expectations of my professors 😊

After I got my masters in 2017, I was still making sites and even npm libraries for React Js, but at work I was mostly doing Angular, at first I wasn't very supportive of using the Angular Framework instead of ReactJs while the perfs benchmarks were more favorable to React, but I didn't have the power to make decisions on these subjects, (I was only the new kid out of school), but later I learned that the choice of a Framework in a company is not only based on its performance.

While learning Angular, I noticed how much junior and even less junior developers could have difficulties to understand its principles (ex: many developers apply their previous knowledge on an Angular project without further consideration, e.g.: interaction with the DOM directly with `document.getElementByID`).

So despite all the rules imposed by the Angular Framework, many devs still make anti-patterns seeing no problem "as long as it works".
At that time I learned that the choice of Angular in a large structure where the turnover is important and where the level of the devs is not always homogeneous, is rather a good idea.

As for me, I learned to use Angular by taking advantage of its strong default typing, routing, modularity, lazy loading, observability by default ...

Today for the majority of my web projects I have a preference for the Spring/Angular stack.