---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img1 from '@assets/blog/tech/20201223-how-to-fetch/0.avif'
  import Image from '@comps/Image.astro'
title: How To Fetch the Number of Claps and Comments Under a Medium Story
publishDate: December 23, 2020
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20201223-how-to-fetch/0.jpg
postImageLocal: /assets/blog/tech/20201223-how-to-fetch/0.jpg
postImageAlt: How To Fetch the Number of Claps and Comments Under a Medium Story
postImageWidth: 1400
postImageHeight: 700
keywords:
  - Medium.com
  - Claps
  - Stats
  - scraping
permalink: https://frenchtechlead.com/posts/tech/20201223-how-to-fetch-the-number-of-claps-of-a-medium-story/
description: "How to programmatically retrieve the stats (number of claps and comments) of any Medium.com post using a custom REST API."
draft: false
---

In this article I will explain how to programmatically retrieve the stats (number of claps and comments) of any Medium post using a custom REST API, the lack of this feature in the official Medium REST API is what motivated me to create this custom REST API.
<Separator/>

First, let’s see the documentation of the official public [REST API](https://github.com/Medium/medium-api-docs) by Medium.

<Separator/>

When it comes to articles (posts), The official Medium API only provides an HTTP POST method to create a Medium article (cf [section 3.3](https://github.com/Medium/medium-api-docs#33-posts)), **you can not edit or retrieve an article using the official REST API** 😥, I don’t really know why Medium staff has decided not to implement such a useful feature, but it’s certainly a regretting design choice.

> While working on a personal project, I needed to retrieve the stats (number of claps and comments) of my Medium posts within a reasonable response time, I looked everywhere to find a solution to my needs but I couldn’t find it, so I had no choice but coding it by my self.

My first intuition was to look at the official REST API but no such feature is provided, then I looked at [the RSS feed](https://help.medium.com/hc/en-us/articles/214874118-Using-RSS-feeds-of-profiles-and-publications) by Medium and nothing was there neither, after that I started inspecting Medium using Chrome’s DevTools in order to understand how the stats are retrieved then displayed under a Medium story.

![](https://miro.medium.com/max/1400/1*VV84EGcrF6iCqPvAyNQ1lQ.jpeg)

Surprisingly, among all the XHR requests there was no request to retrieve the stats 😮, which led me to look at the HTML response of the article page.

```
curl https://medium.com/p/POST_ID >> post.html
```

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <script>// gibberish</script>
  <body>
  <script>
    // gibberish
    window.__APOLLO_STATE__=
    {

      // gibberish
      "Post:POST_ID": {
        "clapCount": 78,
        "postResponses": {
          "count": 1
        }
      }
      // gibberish
    };
  </script>
  </body>
</html>
```

> We notice that the number of claps and comments are directly injected in the HTML response as a javascript variable.

 we can verify that by taping the following code in the JavaScript console :

```js
console.log(window.__APOLLO_STATE__["Post:POST_ID"]);
```


Now that we found where the stats are available at, we only need to parse the HTML page and look for the two tokens containing the number of claps and comments which are `clapCount` and `postResponses.count` .

<Separator/>

## How to use the custom API :


You can use the [custom API](https://github.com/FrenchTechLead/medium-stats-api) that I built right now as follows:

**Request** 💻 ➡ 🌎 **:**

```
curl http://localhost:8080/api/stats?story_url=THE_URL_OF_THE_MEDIUM_STORY
```

**Response** 💻 ⬅🌎 :

```json
{  
   "claps": 78,  
   "comments": 1  
}
```

The API responds within \[500, 1500\] ms which is pretty reasonable knowing that the API starts by sending an HTTP request to Medium then it parses the response before returning the stats to the requester.

The [API is Open Source](https://github.com/FrenchTechLead/medium-stats-api) we welcome any kind of contribution, if you find this post interesting let a comment and hit the 👏 button below.