---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img0 from '@assets/blog/tech/20220804-http-snitch-the-byte-size-http-request-debugger/0.png'
  import Image from '@comps/Image.astro'
title: HTTP Snitch - The Byte Size HTTP Request Debugger
publishDate: August 03, 2022
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220804-http-snitch-the-byte-size-http-request-debugger/0.png
postImageAlt: HTTP Snitch - The Byte Size HTTP Request Debugger
postImageWidth: 1280
postImageHeight: 720
keywords:
  - "DEBUG HTTP REQUEST"
  - "DEBUG REVERSE PROXY"
  - "PRINT HTTP HEADERS"
  - "PRINT HTTP REQUEST"
  
permalink: https://frenchtechlead.com/posts/tech/20220804-http-snitch-the-byte-size-http-request-debugger/
description: "HTTP-SNITCH is a tiny HTTP request debugger that prints the HTTP headers of the incoming requests. It is useful to debug reverse proxies, load balancers, and other HTTP servers."
draft: false
---


<Image src={img0} w={1280} h={720} t='HTTP-SNITCH' solo={true}/>
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

## Example of HTTP-SNITCH output
Running HTTP-SNITCH on port 8080 in a GitHub Workspace instance and sending a `GET` request to it will print out the following output:
<Image src='https://user-images.githubusercontent.com/10856604/183052857-427d2f48-a080-41aa-b5c0-c0613b820ede.png' w={1096} h={538} t='The console output of HTTP-SNITCH' solo={true}/>


<Separator/>

## Demo 
View the demo video on [Youtube](https://youtu.be/iTNLP3WP6m0)