![](https://miro.medium.com/max/1400/1*brGnhu_m-W9-sQ-Yk7N8SQ.png)

The missing part of Medium’s REST API
=====================================

In this article I will explain how to programmatically retrieve the stats (number of claps and comments) of any Medium post using a custom REST API, the lack of this feature in the official Medium REST API is what motivated me to create this custom REST API.

First, let’s see the documentation of the official public [REST API](https://github.com/Medium/medium-api-docs) by Medium.

When it comes to articles (posts), The official Medium API only provides an HTTP POST method to create a Medium article (cf [section 3.3](https://github.com/Medium/medium-api-docs#33-posts)), **you can not edit or retrieve an article using the official REST API** 😥, I don’t really know why Medium staff has decided not to implement such a useful feature, but it’s certainly a regretting design choice.

> While working on a personal project, I needed to retrieve the stats (number of claps and comments) of my Medium posts within a reasonable response time, I looked everywhere to find a solution to my needs but I couldn’t find it, so I had no choice but coding it by my self.

My first intuition was to look at the official REST API but no such feature is provided, then I looked at [the RSS feed](https://help.medium.com/hc/en-us/articles/214874118-Using-RSS-feeds-of-profiles-and-publications) by Medium and nothing was there neither, after that I started inspecting Medium using Chrome’s DevTools in order to understand how the stats are retrieved then displayed under a Medium story.

![](https://miro.medium.com/max/1400/1*VV84EGcrF6iCqPvAyNQ1lQ.jpeg)Inspecting a Medium post page.

Surprisingly, among all the XHR requests there was no request to retrieve the stats 😮, which led me to look at the HTML response of the article page.

```
curl [https://medium.com/p/POST\_ID](https://medium.com/p/POST_ID) >> post.html
```![](https://miro.medium.com/max/1400/1*TtlQ9HTLD4-4Nkcn7zKBbw.png)A simplified Medium post page

🎉 🎉 🎉

We notice that the number of claps and comments are directly injected in the HTML response as a javascript variable, we can verify that by taping `console.log(window.__APOLLO_STATE__);` in the Javascript console of the Post page.

![](https://miro.medium.com/max/1400/1*bAsw-19WqltUUV5HbYUEEw.jpeg)The content of the `window.__APOLLO_STATE__ object`

Now that we found where the stats are available at, we only need to parse the HTML page and look for the two tokens containing the number of claps and comments which are `clapCount` and `responsesCount` .

**How to use the custom API :**
===============================

You can use the [custom API](https://github.com/FrenchTechLead/medium-stats-api) that I built right now as follows:

**Request** 💻 ➡ 🌎 **:**

```
curl https://medium-stats-api.herokuapp.com/api/stats?story\_url=THE\_URL\_OF\_THE\_MEDIUM\_STORY
```

**Response** 💻 ⬅🌎 :

```
{  
   "claps": 78,  
   "comments": 1  
}
```

The API responds within \[500, 1500\] ms which is pretty reasonable knowing that the API starts by sending an HTTP request to Medium then it parses the response before returning the stats to the requester.

The [API is Open Source](https://github.com/FrenchTechLead/medium-stats-api) we welcome any kind of contribution, if you find this post interesting let a comment and hit the 👏 button below.

**References :**

[

Medium/medium-api-docs
----------------------

### This repository contains the documentation for Medium 's API. Medium's API is a JSON-based OAuth2 API. All requests are…

github.com

](https://github.com/Medium/medium-api-docs)[

GitHub - FrenchTechLead/medium-stats-api: A simple Rest API to retrieve medium stats of a given…
------------------------------------------------------------------------------------------------

### A simple Rest API to retrieve medium stats of a given story. - GitHub - FrenchTechLead/medium-stats-api: A simple Rest…

github.com

](https://github.com/FrenchTechLead/medium-stats-api)