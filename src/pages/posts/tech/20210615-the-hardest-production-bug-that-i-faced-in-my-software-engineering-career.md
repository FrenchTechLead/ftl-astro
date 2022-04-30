---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import Image from '@comps/Image.astro'
  import img1 from '@assets/blog/tech/20210615-the-hardest-production-bug/1.avif'
  import img2 from '@assets/blog/tech/20210615-the-hardest-production-bug/2.avif'
  import img3 from '@assets/blog/tech/20210615-the-hardest-production-bug/3.avif'
  import img4 from '@assets/blog/tech/20210615-the-hardest-production-bug/4.avif'
title: The Hardest Production Bug That I Faced During My Software Engineering Career.
metaTitle: The Hardest Production Bug That I Faced During My SE Career
publishDate: June 15, 2021
authorName: '@FrenchTechLead'
authorSocial: 'https://twitter.com/FrenchTechLead'
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20210615-the-hardest-production-bug/0.jpg
postImageAlt: The Hardest Production Bug That I Faced During My Software Engineering Career.
postImageWidth: 800
postImageHeight: 403
keywords:
  - Debugging
  - Web Developmenet
  - IE
  - Internet Explorer
  - Not Modified
  - HTTP 304
permalink: https://frenchtechlead.com/posts/tech/20210615-the-hardest-production-bug-that-i-faced-in-my-software-engineering-career/
description: "In this article, I’ll describe the weirdest Internet Explorer bug that I faced in my life, how we diagnosed it, and correct it in my company."
---

<div style="font-size:200px; text-align:center;">🤯</div>

In this article, I’ll describe the weirdest Internet Explorer bug that I faced in my life, how we **diagnosed it**, and the way we managed to **correct it** in my company.

<Separator/>

By the time you’re reading this article, IE might not exist anymore since Microsoft has announced its abandonment by [June 15, 2022](https://blogs.windows.com/windowsexperience/2021/05/19/the-future-of-internet-explorer-on-windows-10-is-in-microsoft-edge/), so most companies and individuals should work on moving to another browser in order to stay safe, this is good news for web developers because they know that Internet Explorer has always been a pain-in-the-neck when it comes to web development, mostly because of its various CSS and JavaScript incompatibilities, often we can find some polyfills for these kinds of issues; **The issue I’m going to describe in this article isn’t related to JS or CSS, it’s a very weird behavior from IE when it receives an exotic HTTP response, so for once we can’t really say that its IE’s fault.**

<Separator/>

## The context 📃


I used to work on a B2B project in an insurance company, one of our clients deploys IE as the default browser in all of its IT infrastructure, so we need to make sure that our websites run on IE as perfectly as it does on other browsers, **recently our client has reported us a serious bug affecting one of our websites, this bug was so exotic that I’ve decided to write a blog post about it.**

Basically, the bug affects the display of our website by adding multiple lines of the **Not Modified** string followed by some HTTP headers at the beginning of the DOM of our website.

What makes the bug so exotic 🥝
-----------------------------

*   The bug occurs randomly.
*   We couldn’t reproduce the bug more than a few times after thousands of tries.
*   It only happens on IE and on the production environment.
*   No major changes were pushed to prod before the bug report.

<Separator/>

## Reproducing the Bug 🐛

This was a hard task because of the randomness of the bug, even after thousands of refreshes on an identical ecosystem of our client, we didn’t manage to reproduce the bug on our machines, what we end-up doing was creating a Selenium program that refreshes the page for us and checks for the **Not Modified** string in the DOM of our page.

```python
from selenium import webdriver
import time

siteUrl="https://example.com/"
webDriverLocation="C:\\Users\\FrenchTechLead\\Downloads\\IEDriverServer.exe"

driver=webdriver.Ie(executablepath=webDriverLocation)
driver.maximize window()
driver.get(siteUrl)

shouldContinue=True

while shouldContinue:
  html=driver.page_source
  if "Not Modified" in html:
    print(html, file=open( 'ModifiedNot.html', 'w'))
    driver.close()
    shouldContinue=False
  else:
    driver.refresh()
    time.sleep(2)
```

After running this program for some time, we managed to reproduce the bug and export the HTML containing the **Not Modified** string.

<Image w="883" h="661" src={img1} t="Not Modified" />


> Now that we managed to reproduce the bug we need to understand how the heck we end up having this unexpected content at the top of our page.

For this purpose, we had to look at the architecture of the app from an infrastructure perspective:

<Image w="883" h="661" src={img2} t="Not Modified" />

> From the following architecture, we identified some potential guilty components and had some assumptions.

**_What components can edit the HTML rendered pages?_**

1.  The Mashup server is responsible for Server-Side integration, it acts directly on the HTML rendering, it might have a bug when retrieving cached assets from the CMS, so we tried to disable cache on the CMS server but the bug was still there.
2.  Javascript can edit the HTML on the client-side after sending some XHR requests, we analyzed the XHR requests one by one, but none of them had a 304 response code, but we observed that the **Not Modified** string was not part of the **first paint content**, so we had a strong belief that Javascript was responsible for the bug at this point (later we knew that we were wrong ).

Getting Deeper into debugging 🧿
--------------------------------

> At that time, we knew certainly that the issue occurs on the client-side since the “not modified” string is not part of the first paint content.

We had a strong belief that some JS was responsible for printing these weird headers on the screen, we analyzed all the libraries that we use on our legacy JSF app (Application backend), we had many JS libraries to analyze such as [Sarissa JS](https://sarissa.sourceforge.io/howtos.html), Sarissa was easy to point to because it acts as a wrapper for XHR requests, we have reviewed almost all of our JS code just to realize that not a single line of our JS injects these undesired headers on the DOM of our app.

> At this point we knew that the bug occurs on the client-side but Javascript was not responsible for it.

Unlike recent web browsers like Chrome and Firefox, IE doesn’t have some decent debugging capabilities, and the network tab on IE misled us in our investigations, let me explain how :

<Image w="1400" h="392" src={img3} t="Chrome's Network Tab" />

The misleading thing about the network tab here is the fact that an **HTTP 304** response is associated with a Body content, there is no indication that the Body is retrieved from the local cache and not from the actual response(that should have no Body content associated to it), so if you don’t really pay attention, you get easily into thinking that the Body has been returned from the server with the **304** response.

We decided to view how a single **304** resource is received from our backend, for that, we used a very interesting program called **Fiddler** which is a **debugging proxy server** tool used to log, inspect, and alter **HTTP** and even **HTTPS** traffic between a web client and a web server.

<Image w="1400" h="392" src={img4} t="HTTP response in Fiddler" />

Bingo  🎉
-------

We have found a serious lead by using **Fiddler**, we noticed that our **304** response has a Body content **(12 bytes)** which is a violation of the **HTTP protocol**.

> A 304 response [cannot contain a message-body](https://httpstatuses.com/304); it is always terminated by the first empty line after the header fields.

<Separator/>

> Check out the following article to learn HTTP the right way ✅
> [Before Learning Rest / Soap / GraphQL / You Need To Understand HTTP !](https://mecheri-akram.medium.com/before-learning-rest-soap-graphql-you-need-to-understand-http-9eb80de6cfbf)

<Separator/>




> So we know now that our servers are returning some exotic HTTP responses for cached resources, and unlike Chrome and Firefox, IE does not tolerate this protocol violation and acts weirdly by printing the Body of these responses directly onto the DOM.

So where did the 304 HTTP response got her Body from? 🍑
-----------------------------------------------------

When we **GET** a resource directly from the Mashup Server we receive a **304** response with no Body content **(L.1)**, but when going through the **RP** we receive a **304** response that has a **12 bytes** Body content **(L.2)**.
``` sh
~ tail -F /usr/tomcat/logs/localhost access. log
  [05/03/21:12:23:39] "GET /files/live/modules/eep-templates/1.0/templates/files/themes/eep-theme/images/trame.png HTTP/1.1" 304 -
  [05/03/21:12:23:53] "GET /files/live/modules/eep-templates/1.0/templates/files/themes/eep-theme/images/trame.png HTTP/1.1" 304 12
```


The RP connects to the Mashup Server through [AJP](https://en.wikipedia.org/wiki/Apache_JServ_Protocol) Protocol, we did some research about the AJP connector of our Tomcat server and it turned out that there is indeed a [problem with this connector](https://bz.apache.org/bugzilla/show_bug.cgi?id=55453).

The bug was fixed on Tomcat version 7.0.43 onwards, so we just had to upgrade the version of our Tomcat server to correct this issue.

Final thoughts:
---------------

I took the time to write about this particular experience for many reasons, Firstly, I hope that people facing similar Bugs would find help here, Then for my fellow web developers, I want to point out the importance of knowing your apps on all of its layers, don’t be an exclusive front-end or back-end developer, otherwise, you won’t be able to diagnose some serious bugs like the one described on this article, Finally, to product managers out there, please stop using/supporting IE :)

**That’s it**, if you find this article interesting don’t hesitate to let me a comment and/or hit the 👏 button below.