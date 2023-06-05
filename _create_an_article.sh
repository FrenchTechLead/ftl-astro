# a script to create a blogpost in src/content/posts directory
# it also creates a folder with the same name as the blogpost
# in the public/assets/blog/tech directory

# Usage: ./_create_an_article.sh "blogpost title"

TODAY=$(date +%Y%m%d)
FILENAME=$TODAY-$(echo $1 | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

mkdir public/assets/blog/tech/$FILENAME
cp public/assets/blog/tech/0.png public/assets/blog/tech/$FILENAME/0.png

echo "---
authorID: akram_mecheri
title: $1
description: $1
keywords:
 - toto
tags:
 - toto
lang: en
draft: true
---
import Separator from '@comps/Separator.jsx'
import img0 from '@assets/blog/tech/20230108-comment-deployer-une-application-spring-boot-sur-kubernetes/0.png'

import Image from '@comps/Image.astro'

## Introduction

" >> src/content/posts/$FILENAME.mdx


