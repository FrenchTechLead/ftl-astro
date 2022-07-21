---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img0 from '@assets/blog/tech/20220717-my-route53-domain-is-not-resolved/0.png'
  import img1 from '@assets/blog/tech/20220717-my-route53-domain-is-not-resolved/1.png'
  import img2 from '@assets/blog/tech/20220717-my-route53-domain-is-not-resolved/2.png'
  import img3 from '@assets/blog/tech/20220717-my-route53-domain-is-not-resolved/3.png'
  import Image from '@comps/Image.astro'
title: My Route53 domain is not getting resolved
publishDate: Jully 17, 2022
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220717-my-route53-domain-is-not-resolved/0.png
postImageAlt: My Route53 Domain is not getting resolved
postImageWidth: 842
postImageHeight: 468
keywords:
  - "AWS"
  - "Route53"
  - "DNS"
  - "HostedZonePartiallyDelegated"
  
permalink: https://frenchtechlead.com/posts/tech/20220717-my-route53-domain-is-not-resolved/
description: "Dubugging why my newely created Route53 domain name is not getting resolved on the internet"
draft: false
---
A few days ago i bought a new domain name (https://bienparler.fr) for my Nth side project 😅, I purchased the domain name directly from AWS Route53 but surprisingly, the domain name was not getting resolved.
<Separator/>
## Debugging with nslookup & dig 🕵️
At first, I thought that the issue was just about the DNS propagation, so I waited one day to check if the domain name was actually being resolved.
2 Days later, the domain name was still not being resolved, so I decided to start debuging with `nslookup` & `dig` commands.
```bash
nslookup bienparler.fr
```
```bash
dig bienparler.fr
```

The output of the above commands was a `SERVFAIL` error with no further information. so I tried to check the registration status of the domain name with `whois` command.
```bash
whois bienparler.fr
```
```bash
domain:      bienparler.fr
status:      ACTIVE
hold:        NO
holder-c:    ANO00-FRNIC
admin-c:     ANO00-FRNIC
tech-c:      G768-FRNIC
zone-c:      NFC1-FRNIC
nsl-id:      NSL150563-FRNIC
registrar:   GANDI
Expiry Date: 2023-07-08T10:40:45Z
created:     2022-07-08T10:40:45Z
last-update: 2022-07-15T13:04:25Z
source:      FRNIC

ns-list:     NSL150563-FRNIC
nserver:     ns-857.awsdns-11.net
nserver:     ns-1196.awsdns-22.org
nserver:     ns-1975.awsdns-33.co.uk
nserver:     ns-475.awsdns-44.com
...
```

The two interesting things about the output of the `whois` command are the `ns-list` and `status` fields.
In my case it shows that the domain name is registered and is active and also that the nameservers that are being used are the AWS nameservers.
```bash
nserver:     ns-857.awsdns-11.net
nserver:     ns-1196.awsdns-22.org
nserver:     ns-1975.awsdns-33.co.uk
nserver:     ns-475.awsdns-44.com
```
The above nameservers were assigned by AWS on domain registration and before creating a hosted zone for the domain.  
when I created a hosted zone for the domain, some different nameservers were assigned to my hosted zone that were visible on the `NS` record type in the hosted zone.
<Image w="1472" h="851" src={img1} t="AWS Hosted Zone Records" solo="true" />

We notice a mismatch between the nameservers that were returned by the `whois` command and the nameservers that were assigned to the hosted zone.
Actually the nameservers returned by the `whois` command were on a different page of the AWS console.  

**Route53 > Registered domains > bienparler.fr**
<Image w="1063" h="273" src={img2} t="AWS Registred Domains Tab" solo="true" />

**So the Problem for me was a mismatch between the nameservers of the Hosted Zone and those of the Registred Domains.**


I could fix this problem by changing the nameservers by clicking on **Add or edit name servers** in the Registred Domains tab so that the nameservers of the Hosted Zone are used.

After that the DNS propagation started and my site was available on the internet after one day.
<Image w="649" h="444" src={img3} t="DNS Propagation Map" solo="true" />

<Separator/>

## Final Thoughts,

In this article to describe my experience with Route53 for a .fr domain name, it seemes that the only way to add DNS records to a Route53 managed domain is by creating a hosted zone, and by creating the hosted zone some nameservers are assaigned to it but they are not automatically assigned to the domain, so you need to manually copy the nameservers from the hosted zone to the domain in the Registred Domains tab of the AWS Console.