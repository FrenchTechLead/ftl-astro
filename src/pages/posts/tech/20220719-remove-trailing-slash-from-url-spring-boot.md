---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img0 from '@assets/blog/tech/20220719-remove-trailing-slash-from-url-spring-boot/0.png'
  import Image from '@comps/Image.astro'
title: Remove trailing slash from URL with Spring Boot
publishDate: Jully 19, 2022
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220719-remove-trailing-slash-from-url-spring-boot/0.png
postImageAlt: Remove trailing slash from URL with Spring Boot
postImageWidth: 842
postImageHeight: 468
keywords:
  - "Remove trailing slash from URL with spring-boot"
  - "spring boot trailing slash 301 "
  - "SEO"
  
permalink: https://frenchtechlead.com/posts/tech/20220719-remove-trailing-slash-from-url-spring-boot/
description: "A step by step guide to remove trailing slash from URL with Spring Boot"
draft: false
---

## Why should you remove a trailing slash from your URL ?
It's all about SEO, Google will consider a page having a trailing slash as a duplicate of the one without the trailing slash.  
So for beater SEO you should redirect the page having a trailing slash to the page without the trailing slash and vice versa.


### Remove trailing slash from URL with Spring Boot
```java
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class TrailingSlashRedirectingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String fullURL = ServletUriComponentsBuilder
                .fromRequest(request)
                .build()
                .toString();
        String URI = request.getRequestURI();
        if (fullURL.endsWith("/") && !URI.equals("/")) {
            fullURL = fullURL.substring(0, fullURL.length() - 1);
            response.setStatus(HttpStatus.MOVED_PERMANENTLY.value());
            response.setHeader(HttpHeaders.LOCATION, fullURL);
        } else if(URI.equals("")){
            response.setStatus(HttpStatus.MOVED_PERMANENTLY.value());
            response.setHeader(HttpHeaders.LOCATION, fullURL + "/");
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
```

### Code explanation
The Above code is a simple filter that redirects the request to the URL without the trailing slash if the request URL ends with a trailing slash. Except for the root URL, which is redirected to the URL with a trailing slash.