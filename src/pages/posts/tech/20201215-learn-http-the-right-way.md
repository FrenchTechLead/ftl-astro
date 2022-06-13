---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img1 from '@assets/blog/tech/20201215-learn-http-the-right-way/0.png'
  import Image from '@comps/Image.astro'
title: Learn HTTP The Right Way
publishDate: December 15, 2020
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20201215-learn-http-the-right-way/0.png
postImageLocal: /assets/blog/tech/20201215-learn-http-the-right-way/0.png
postImageAlt: Learn HTTP The Right Way
postImageWidth: 1400
postImageHeight: 700
keywords:
  - HTTP
  - HTTP Protocol
  - REST
  - SOAP
  - GraphQL
  - Rfc2616
permalink: https://frenchtechlead.com/posts/tech/20201215-learn-http-the-right-way/
description: "HTTP stands for Hypertext Transfer Protocol, initially created for web browser/server communication, it has many more use cases today."
draft: true
---

HTTP stands for Hypertext Transfer Protocol, initially created for **web** browser/server communication, it has many more use cases today.

In the last few years, I’ve observed many junior developers having a hard time creating and maintaining Rest and Soap services, after a short discussion with them, I often realized that the main reason was the lack of knowledge of the HTTP protocol.

So in this article, I’ll briefly explain the fundamentals of the HTTP protocol.

![](https://miro.medium.com/max/1400/0*x6RlFfWpFDEEDYaR.png)HTTP REQUEST / HTTP RESPONSE

The HTTP protocol is a request/response protocol based on the client/server based architecture where web browsers, robots, and search engines, etc. act like HTTP clients, and the Web server acts as a server.

**1\. HTTP REQUEST** 💻 ➡ 🌎
============================

![](https://miro.medium.com/max/1400/1*lTeInGCSh3y-H9OgCmlhzw.png)Example of an HTTP Request

**1–1 Request-Line**

An HTTP request must at least have a **Request-Line**:

```
$METHOD /$PATH $HTTP\_VERSION
```

E.g:

```
GET /posts/post-1.html HTTP/1.1
```

**1-1-1 Request-Methods:**

_Most used HTTP Methods :_

*   **GET**: This method means retrieve whatever information (in the form of an entity) is identified by the Request-URI.
*   **POST**: The actual function performed by the POST method is determined by the server, in most cases, it’s used to post a message as a new subordinate of the resource identified by the Request-URI.
*   **PUT**: This method requests that the enclosed entity be stored under the supplied Request-URI. If the Request-URI refers to an already existing resource, the enclosed entity **SHOULD** be considered as a modified version of the one residing on the origin server. If the Request-URI does not point to an existing resource, and that URI is capable of being defined as a new resource.
*   **DELETE:** This method requests that the origin server delete the resource identified by the Request-URI.
*   **OPTIONS**: this method represents a request for information about the communication options available on the request/response chain identified by the Request-URI, such as pre-flight requests for Cross-Origin Ressource Sharing (CORS).

> Other HTTP Methods exists like : HEAD, CONNECT, PATCH… we will not cover them in this article because they are rarely used in API design.

**1–1–2: Request-URI (Path):**

The **Request-URI** is a Uniform Resource Identifier and identifies the resource on the server upon which to apply the request.

**1-2 Request-Headers:**

The **Request-header** fields allow the client to pass additional information about the request, and about the client itself, to the server. this information is exploited by the server in different ways such as Authentication, Routing, Analytics, and so on.

E.g:

```
**User-Agent:** Used to identify the HTTP client.  
**Authorization:** Used for authentication purpose.  
**Host:** Identifies the server being requested.  
**Content-Type:** Identifies the MIME type of the entity-body carried in   
HTTP Request or Response.
```

**1–3 Request-Body:**

The Request-Body of an HTTP Request is used to carry the entity-body associated with the request, A Request-Body MUST NOT be included in a request if the specification of the request method does not allow sending an entity-body in requests.

2\. HTTP RESPONSE 💻 ⬅🌎
========================

![](https://miro.medium.com/max/1400/1*3X8ZM5SZBeYKXQFxbMhAmQ.png)Example of an HTTP Response

**2–1 Status-Line** 🆗

The first line of a Response message is the Status-Line, consisting of the protocol version followed by a numeric status code and its associated textual phrase, E.g :

```
HTTP/1.1 200 OK
```

You can find the exhaustive list of status codes in the [official RFC of HTTP](https://tools.ietf.org/html/rfc2616#section-10).

**2–2 Response-Headers:**

The R**esponse-Header** fields allow the server to pass additional information about the response which cannot be placed in the **Status-Line**. These header fields give information about the server and about further access to the resource identified by the Request-URI, E.g:

```
**Content-Type:** Indicates the media type of the entity-body.  
**Content-Length:** Indicates the size of the entity-body, in decimal number of bytes.
```

**2–3 Response-Body:**

The Response-Body is N bytes of content with N specified in the Content-Length header, some of the most used types of content are: `Image/jpg, Text/plain, Text/html`.

Now that we understand the basics of HTTP, let’s see now how to establish a TCP connexion to an HTTP server and send/receive some bytes to/from it using Python.

http client using python

Running this Python code will render the following output :

![](https://miro.medium.com/max/1400/1*NjDGZE6Cpaal0rTMBA-8Rw.png)

A Web browser works exactly the same as the previous python program :

*   It starts by establishing a TCP connexion to the HTTP server.
*   Then it sends a well-formatted HTTP-Request.
*   The server responds with a well-formatted HTTP-Response.
*   The web browser parses the HTTP-Response and displays it.
