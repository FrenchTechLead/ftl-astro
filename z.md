The Hardest Production Bug That I Faced During My Software Engineering Career.
==============================================================================

![](https://miro.medium.com/max/1400/1*DoBX7LLi0KKOvKHUOseUsQ.png)The unexpected “Not Modified” screen.

In this article, I’ll describe the weirdest Internet Explorer bug that I faced in my life, how we **diagnosed it,** and the way we managed **to correct it** in my company.

By the time you’re reading this article, IE might not exist anymore since Microsoft has announced its abandonment by [June 15, 2022](https://blogs.windows.com/windowsexperience/2021/05/19/the-future-of-internet-explorer-on-windows-10-is-in-microsoft-edge/), so most companies and individuals should work on moving to another browser in order to stay safe, this is good news for web developers because they know that Internet Explorer has always been a pain-in-the-neck when it comes to web development, mostly because of its various CSS and JavaScript incompatibilities, often we can find some polyfills for these kinds of issues; **The issue I’m going to describe in this article isn’t related to JS or CSS, it’s a very weird behavior from IE when it receives an exotic HTTP response, so for once we can’t really say that its IE’s fault.**

The context 📃
--------------

I work on a B2B project in an insurance company, one of our clients deploys IE as the default browser in all of its IT infrastructure, so we need to make sure that our websites run on IE as perfectly as it does on other browsers, **recently our client has reported us a serious bug affecting one of our websites, this bug was so exotic that I’ve decided to write a blog post about it.**

**Basically, the bug affects the display of our website by adding multiple lines of the “Not Modified” string followed by some HTTP headers at the beginning of the DOM of our website.**

**What makes the bug so exotic** 👽

*   The bug occurs randomly.
*   We couldn’t reproduce the bug more than a few times after thousands of tries.
*   It only happens on IE and on the production environment.
*   No major changes were pushed to prod before the bug report.

Reproducing the Bug 🐛
----------------------

This was a hard task because of the randomness of the bug, even after thousands of refreshes on an identical ecosystem of our client, we didn’t manage to reproduce the bug on our machines, what we end-up doing was creating a Selenium program that refreshes the page for us and checks for the **“Not Modified”** string in the DOM of our page.

![](https://miro.medium.com/max/1400/1*RXCYgmWzgxG4Z_3cK7z4xw.png)Python Script for reproducing the bug

After running this program for some time, we managed to reproduce the bug and export the HTML containing the **“Not Modified”** string.

![](https://miro.medium.com/max/1400/1*DoBX7LLi0KKOvKHUOseUsQ.png)The unexpected “Not Modified” screen.

> Now that we managed to reproduce the bug we need to understand how the heck we end up having this unexpected content at the top of our page.

For this purpose, we had to look at the architecture of the app from an infrastructure perspective:

![](https://miro.medium.com/max/1400/1*D9iJvc3_8KQm3OpBCuJP6A.png)The Infrastructure Architecture of the app.

From the following architecture, we identified some potential guilty components and had some assumptions.

**_What components can edit the HTML rendered pages?_**

1.  The Mashup server is responsible for Server-Side integration, it acts directly on the HTML rendering, it might have a bug when retrieving cached assets from the CMS, so we tried to disable cache on the CMS server but the bug was still there.
2.  Javascript can edit the HTML on the client-side after sending some XHR requests, we analyzed the XHR requests one by one, but none of them had a 304 response code, but **we observed that the “Not Modified” string was not part of the first paint content**, so we had a strong belief that Javascript was responsible for the bug at this point (later we knew that we were wrong ).

Getting Deeper into debugging 🧿
--------------------------------

> At that time, we knew certainly that the issue occurs on the client-side since the “not modified” string is not part of the first paint content.

We had a strong belief that some JS was responsible for printing these weird headers on the screen, we analyzed all the libraries that we use on our legacy JSF app (Application backend), we had many JS libraries to analyze such as [Sarissa JS](https://sarissa.sourceforge.io/howtos.html), Sarissa was easy to point to because it acts as a wrapper for XHR requests, we have reviewed almost all of our JS code just to realize that not a single line of our JS injects these undesired headers on the DOM of our app.

> At this point we knew that the bug occurs on the client-side but Javascript was not responsible for it.

Unlike recent web browsers like Chrome and Firefox, IE doesn’t have some decent debugging capabilities, and the network tab on IE misled us in our investigations, let me explain how :

![](https://miro.medium.com/max/1400/1*lz8kAdNssyDorLGBOXg4xw.png)IE — Network tab

The misleading thing about the network tab here is the fact that an HTTP 304 response is associated with a Body content, there is no indication that the Body is retrieved from the local cache and not from the actual response(that should have no Body content associated to it), so if you don’t really pay attention, you get easily into thinking that the Body has been returned from the server with the 304 response.

We decided to view how a single 304 resource is received from our backend, for that, we used a very interesting program called Fiddler which is a debugging proxy server tool used to log, inspect, and alter HTTP and even HTTPS traffic between a web client and a web server.

![](https://miro.medium.com/max/1400/1*4XuTHDlzXJ4v9i5UemnbhA.png)HTTP 304 response with a Body!

Bingo!
------

We have found a serious lead by using Fiddler, we noticed that our 304 response has a Body content (12 bytes) which is a violation of the HTTP protocol.

> A 304 response [cannot contain a message-body](https://httpstatuses.com/304); it is always terminated by the first empty line after the header fields.

Check out the following article to learn HTTP the right way :)

[

Before Learning Rest / Soap / GraphQL / You Need To Understand HTTP !
---------------------------------------------------------------------

### HTTP stands for Hypertext Transfer Protocol, initially created for web browser/server communication, it has many more…

mecheri-akram.medium.com

](https://mecheri-akram.medium.com/before-learning-rest-soap-graphql-you-need-to-understand-http-9eb80de6cfbf)

**So we know now that our servers are returning some exotic HTTP responses for cached resources, and unlike Chrome and Firefox, IE does not tolerate this protocol violation and acts weirdly by printing the Body of these responses directly onto the DOM.**

So where did the 304 HTTP response got the Body from?
-----------------------------------------------------

When we GET a resource directly from the Mashup Server we receive a 304 response with no Body content (L.1), but when going through the RP we receive a 304 response that has a Body content(L.2).

![](https://miro.medium.com/max/1400/1*hkZWk43fnCKtdWNQz25Pdw.png)Tomcat access log

The RP connects to the Mashup Server through [AJP](https://en.wikipedia.org/wiki/Apache_JServ_Protocol) Protocol, we did some research about the AJP connector of our Tomcat server and it turned out that there is indeed a [problem with this connector](https://bz.apache.org/bugzilla/show_bug.cgi?id=55453).

The bug was fixed on Tomcat version 7.0.43 onwards, so we just had to upgrade the version of our Tomcat server to correct this issue.

Final thoughts,
---------------

I took the time to write about this particular experience for many reasons, Firstly, I hope that people facing similar Bugs would find help here, Then for my fellow web developers, I want to point out the importance of knowing your apps on all of its layers, don’t be an exclusive front-end or back-end developer, otherwise, you won’t be able to diagnose some serious bugs like the one described on this article, Finally, to product managers out there, please stop using/supporting IE :)

**That’s it**, if you find this article interesting don’t hesitate to let me a comment and/or hit the 👏 button below.

References:
-----------

[

304 Not Modified
----------------

### A conditional GET or HEAD request has been received and would have resulted in a 200 OK response if it were not for the…

httpstatuses.com

](https://httpstatuses.com/304)[

55453 - AJP send Body with Status 304
-------------------------------------

### Edit description

bz.apache.org

](https://bz.apache.org/bugzilla/show_bug.cgi?id=55453)[

The future of Internet Explorer on Windows 10 is in Microsoft Edge
------------------------------------------------------------------

### Over the last year, you may have noticed our movement away from Internet Explorer ("IE") support, such as an…

blogs.windows.com

](https://blogs.windows.com/windowsexperience/2021/05/19/the-future-of-internet-explorer-on-windows-10-is-in-microsoft-edge/)