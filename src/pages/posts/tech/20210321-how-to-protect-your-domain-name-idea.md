---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import Image from '@comps/Image.astro'
  import img1 from '@assets/blog/tech/20210321-how-to-protect-your-domain-name-idea/1.gif'
title: How To Protect Your Domain Name Idea
publishDate: March 21, 2021
authorName: '@FrenchTechLead'
authorSocial: 'https://twitter.com/FrenchTechLead'
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20210321-how-to-protect-your-domain-name-idea/0.jpg
postImageLocal: /assets/blog/tech/20210321-how-to-protect-your-domain-name-idea/0.avif
postImageAlt: 'How To Protect Your Domain Name Idea'
postImageWidth: 842
postImageHeight: 462
keywords:
  - Domain Name
  - Digital Marketing
  - DNS
permalink: https://frenchtechlead.com/posts/tech/20210321-how-to-protect-your-domain-name-idea/
description: "A lot of websites offer you the possibility to check for the availability of any domain name, but do you garuntee that these websites are safe?"
draft: false
---

A lot of websites offer the possibility to check for the availability of domain names, but do you trust them? did you know that you can check domains directly from your terminal?

```bash
~  ./dn-check.sh "google"
google.com: "❌ not available"
google.org: "❌ not available"
google.fr:  "❌ not available"
~  ./dn-check.sh "abcnews"
abcnews.com: "❌ not available"
abcnews.org: "❌ not available"
abcnews.fr : "✅ available"
```
<Separator/>
There are a lot of websites offering the possibility to check for domain name availability, but are you sure that they won't use your search for unwanted purposes? can't they just buy your domain name idea and sell it for a higher price?
For these reasons you should consider another way to check the availability of a domain name, fortunately, there is a way to do that straight from the Terminal of your Mac / Linux or Windows.
<Separator/>

How To check for Domain Name Availability from the Terminal
---

1. Create a file **dn-check.sh** with the following content :

```bash
#!/bin/bash 
 
if [ "$#" == "0" ]; 
then 
    echo "You need tu supply at least one argument!" 
    exit 1
fi 

DOMAINS=( '.com' '.org' '.fr')
ELEMENTS=${#DOMAINS[@]} 
 
while (( "$#" )); 
do 
    for (( i=0;i<$ELEMENTS;i++)); 
    do 
        whois $1${DOMAINS[${i}]} | egrep -q '^No match|^NOT FOUND|^Not fo|AVAILABLE|^No Data Fou|has not been regi|No entri' 
	    if [ $? -eq 0 ]; 
        then 
            tput setaf 2; 
	        echo  "$1${DOMAINS[${i}]} : available"
        else
            tput setaf 1; 
	        echo  "$1${DOMAINS[${i}]} : not available"
	    fi 
        tput setaf 0;
    done 
shift 
done 
```

2. Make the script executable :
```bash
chmod +x dn-check.sh
```
3. Execute the script :
```bash
./dn-check.sh google
```
<Separator/>

Domain Name Availability Script in Action
---

<img src={img1} width="852" height="700" alt="Domain Name Availability Script in Action" loading="lazy" >

> This script will check in the **.com** / **.org** / **.fr** domains, you can edit line 9 (DOMAINS Array) in order to check for other domains as well.

<Separator/>


Final Thoughts,
----------------
Domain names are critical choices for the success of any company, that’s why some domain names cost many millions of $, if you find an interesting name for your next business you need to make sure to protect it and buy it fast, for this reason, make sure not to share it with any third party service before acquiring it!  


If you find this article interesting, make sure to hit the 👏 button below.