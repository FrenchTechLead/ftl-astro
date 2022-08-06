---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img0 from '@assets/blog/tech/20220804-http-snitch-the-byte-size-http-request-debugger/0.png'
  import img1 from '@assets/blog/tech/20220804-http-snitch-the-byte-size-http-request-debugger/1.png'
  import Image from '@comps/Image.astro'
title: HTTP Snitch - The Byte Size HTTP Request Debugger
publishDate: August 03, 2022
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220804-http-snitch-the-byte-size-http-request-debugger/0.png
postImageAlt: HTTP Snitch - The Byte Size HTTP Request Debugger
postImageWidth: 842
postImageHeight: 468
keywords:
  - "DEBUG HTTP REQUEST"
  - "DEBUG REVERSE PROXY"
  - "PRINT HTTP HEADERS"
  - "PRINT HTTP REQUEST"
  
permalink: https://frenchtechlead.com/posts/tech/20220804-http-snitch-the-byte-size-http-request-debugger/
description: "This is why you should never use AWS Route53 to manage your domain names pointing to non aws resources"
draft: false
---


![youtube-thumbnail](https://user-images.githubusercontent.com/10856604/182870189-d117e7ac-72f3-4130-9b60-17cf87cbccbe.png)

<Separator/>

## What is HTTP-SNITCH ?
HTTP-SNITCH is a mini HTTP server that prints out every requests that it receives.  

<Separator/>

## When you need to use HTTP-SNITCH
You can use HTTP-SNITCH to debug any HTTP Client,  
Send any valid HTTP request (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD, CONNECT, TRACE, QUERY) to HTTP-SNITCH, and it will print out the received request with its headers and body included.

<Separator/>

## Can HTTP-SNITCH be used to debug Reverse-Proxies ?
HTTP-SNITCH is great to debug various HTTP clients and reverse proxies just forward your requests to the listening HTTP-SNITCH server, and it will print out the received requests.

<Separator/>

## How to install HTTP-SNITCH ?
1- Make sure to have `python3` and `pip3` installed.  
2- Install the `colorama` python package `pip3 install colorama`  
3- Download the file `snitch.py` in the [official HTTP-SNITCH repository](https://github.com/FrenchTechLead/http-snitch)

<Separator/>

## How to run HTTP-SNITCH ?
In order to run HTTP-SNITCH open a new `Terminal` and run the following command:  
```cmd
python3 snitch.py
```
This will run HTTP-SNITCH on port 8080, if you want to run it on a different port just specify it like bellow:  
```cmd
python3 snitch.py 9090
```

<Separator/>

## Demo 
View the demo video on [Youtube](https://youtu.be/iTNLP3WP6m0)
