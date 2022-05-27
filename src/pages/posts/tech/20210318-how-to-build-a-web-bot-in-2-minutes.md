---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img1 from '@assets/blog/tech/20210318-how-to-build-a-web-bot-in-2-minutes/1.gif'
  import Image from '@comps/Image.astro'
title: How To Build a Web Bot in 2 minutes
publishDate: March 26, 2021
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20210318-how-to-build-a-web-bot-in-2-minutes/0.jpg
postImageLocal: /assets/blog/tech/20210318-how-to-build-a-web-bot-in-2-minutes/0.avif
postImageAlt: How To Build a Web Bot in 2 minutes
postImageWidth: 842
postImageHeight: 462
keywords:
  - Java
  - Java Interview Questions
  - Weirdest Java Interview Questions
permalink: https://frenchtechlead.com/posts/tech/20210318-how-to-build-a-web-bot-in-2-minutes/
description: "There is a ton of repetitive tasks that we can automate thanks to bots, in this article I’ll show you the easiest and the fastest way to build a bot using Python and Selenium 🚀🚀🚀."
draft: false
---

There is a ton of repetitive tasks that we can automate thanks to bots, in this article I’ll show you the easiest and the fastest way to build a bot using Python and Selenium 🚀🚀🚀.


<Separator/>

1 . Download the Chrome Web Driver 🔨 :
---------------------------------------

Chrome web driver makes it possible to manage the browser using any programming language, here we will use Python.

*   First, [download the webDriver.](https://chromedriver.chromium.org/downloads)
*   Second, unzip the chromedriver.zip file and copy the webDriver to a specified location: `cp chromeDriver /Library/webdrivers/chromeDriver`
*   Third, add the location of the webDriver to the `PATH` env variable :

```
export PATH="$PATH:/Library/webdrivers/"
```

<Separator/>

2\. Install the Selenium package for Python 📦 :
------------------------------------------------

```
pip install selenium
```

<Separator/>

3\. The Python code 🐍 :
------------------------

To execute the Python code and run the bot use the following command:

```
python simple-selenium-bot.py
```

The usage of the `sleep()`method is very common in these types of bots, it allows you to wait for a request to be sent or for the UI to be refreshed before continuing the execution of the program.

<Image w="1280" h="800" src={img1} t="The Selenium Bot in Action" solo="true" />

This is a simple bot program that shows you how Selenium works, there is a lot of real-world use cases out there to implement in order to gain time or productivity using Selenium, here are some bot ideas I worked on previously :

*   Checking the availability in a booking system.
*   Checking out the availability of a high demanding article in a marketplace.
*   End-to-end tests of a web application.
*   ….

<Separator/>

**That’s it**, if you find this article interesting don’t hesitate to let me a comment or hit the 👏 button below.