---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img0 from '@assets/blog/tech/20220803-never-use-route53-to-manage-your-domain-name-outside-of-aws/0.png'
  import img1 from '@assets/blog/tech/20220803-never-use-route53-to-manage-your-domain-name-outside-of-aws/1.png'
  import Image from '@comps/Image.astro'
title: Never use AWS Route53 to manage your domain names pointing to non aws resources
publishDate: August 03, 2022
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220803-never-use-route53-to-manage-your-domain-name-outside-of-aws/0.png
postImageAlt: Never use AWS Route53 to manage your domain names pointing to non aws resources
postImageWidth: 842
postImageHeight: 468
keywords:
  - "AWS"
  - "Route53"
  - "DNS"
  - "Domain name registration"
  
permalink: https://frenchtechlead.com/posts/tech/20220803-never-use-route53-to-manage-your-domain-name-outside-of-aws/
description: "This is why you should never use AWS Route53 to manage your domain names pointing to non aws resources"
draft: false
---

## What is Route53 ?
Amazon Route 53 is a highly available and scalable Domain Name System (DNS) web service. that can perform the following tasks:
- Register domain names
- Route internet traffic to the resources for your domain
- Check the health of your resources


<Separator/>

## Why you should never use AWS Route53 to manage your domain names pointing to non-AWS resources ?
Route53 is great to route traffic to AWS resources because it brings simplicity for pointing to AWS resources directly by using their ARN, this way you can easilly target the resources from the AWS Console or by using Infrastructure as Code tools like Terraform or CloudFormation.

<Image w={1008} h={764} src={img1} solo={true} t='Route53 Record definition' />

The above screenshot shows how it's nice and easy to point to an aws ressource, however the problem is that **Route53** restricts **ALIAS** record types to their network, so if you want to point your domain to let say a **Heroku** hosted website, you will have to go throught a dirty [workaround to make it work](https://devcenter.heroku.com/articles/route-53), this workround will increase your AWS bill and will make your infrastructure more complex.


<Separator/>

## So what DNS provider you need to choose for an external hosting ?
If you need an entreprise grade solution that is affordable, I would recomand [dnsimple](https://dnsimple.com/r/831d68650580b6), they have a great [documentation](https://support.dnsimple.com/) and a [great support](https://support.dnsimple.com/), they also have a [free plan](https://dnsimple.com/pricing) that is great for small projects, they also have connectors for various [infrastructure as code tools](https://dnsimple.com/integrations) like Terraform, CloudFormation, Ansible, Chef, Puppet, SaltStack, as well as One-click services that makes it possible to add all DNS records for a specific service with one click, if you feel convinced, use my [referral link](https://dnsimple.com/r/831d68650580b6) to get a **5$** credit on your first invoice.

<Separator/>

## Final thoughts
I had to learn the hard way that **Route53** is not a good solution for managing your domain names pointing to non aws resources, I hope this post will help you to avoid the same mistake.