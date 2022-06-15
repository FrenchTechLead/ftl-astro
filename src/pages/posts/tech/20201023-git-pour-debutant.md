---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import img1 from '@assets/blog/tech/20201023-git-pour-debutant/1.png'
  import img2 from '@assets/blog/tech/20201023-git-pour-debutant/2.png'
  import img3 from '@assets/blog/tech/20201023-git-pour-debutant/3.png'
  import Image from '@comps/Image.astro'
title: L’essentiel de Git & Gitlab pour les débutants
publishDate: December 15, 2020
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20201023-git-pour-debutant/0.png
postImageAlt: L’essentiel de Git & Gitlab pour les débutants
postImageWidth: 1400
postImageHeight: 700
keywords:
  - HTTP
  - HTTP Protocol
  - REST
  - SOAP
  - GraphQL
  - Rfc2616
permalink: https://frenchtechlead.com/posts/tech/20201023-git-pour-debutant/
description: "HTTP stands for Hypertext Transfer Protocol, initially created for web browser/server communication, it has many more use cases today."
draft: false
---

Dans cet article, nous allons découvrir l’essentiel de Git et Gitlab afin de permettre une prise en main rapide de ces deux outils 🚀.

1.  **Git** est un outil de gestion de version, c’est à dire qu’il permet de sauvegarder plusieurs versions de fichiers et dossiers, ce versioning permet de suivre l’évolution des fichiers et permet aussi de revenir sur n’importe quelle version de ces fichiers au besoin.
2.  **Gitlab** est une plateforme de DevOps complète, elle offre énormément de fonctionnalités permettant le travail collaboratif dans le développement logiciel notamment Git, dans ce cours nous allons seulement aborder la partie **dépôt distant** de Gitlab.

<Separator/>

## 1. Git:

**Prérequis:**

*   Installer git sur votre PC [https://git-scm.com/](https://git-scm.com/) l’installation est très simple, cliquez sur suivant sans changer les valeurs par défaut.

> Les commandes ci-dessous doivent être saisies sur le programme git bash si vous utilisez windows, sinon utilisez un simple terminal pour mac et linux.

Dans cette première partie, toutes les commandes vont se dérouler sur votre poste local, il n’y aura pas d’interaction avec un dépôt distant.

Créer un dossier “mon\_blog” puis rentrer dans le dossier :

```
mkdir mon_blog  
cd mon_blog
```

Initialiser un dépôt Git local dans le dossier mon\_blog ( càd commencer à considérer le versioning du contenu de ce dossier) :

```
git init
```

Avec la commande ci-dessous, créer un fichier dont le nom est article-1.txt avec du contenu textuel :

```
echo "contenu de l’article 1" >> article-1.txt
```

Vérifier l’état de notre repository :

```
git status
```

Le résultat de la commande ci-dessus est le suivant :

![](https://miro.medium.com/max/1400/1*ujlsa60JTnWk8Z8PpzBn0A.png)

La première ligne veut dire qu’on se trouve sur la branche principale dont le nom est master.

La deuxième ligne veut dire qu’il n’y a pas eu de commit encore.

La troisième, quatrième et cinquième lignes veulent dire qu’il existe un fichier (article-1.txt) mais qui n’est pas tracké, c’est à dire qu’on a pas encore accordé la permission à Git de commencer à suivre les changements dans ce fichier.

Par la suite, Git propose la commande add afin de commencer à tracker notre fichier article-1.txt

```
git add article-1.txt
```

Puis on revérifie à nouveau l’état de notre dépôt avec la commande:

```
git status
```

![](https://miro.medium.com/max/1400/1*MN9L1sJtc7Pge3RsTCdGTQ.png)

Le résultat de la commande est maintenant différent car le fichier est tracké par Git, mais il n’est pas commité, càd que la version de ce fichier n’est pas encore enregistrée dans notre dépôt, afin de l’enregistrer on fait un commit :

```
git commit -m "ajout de l'article 1"
```

Maintenant on a bien enregistré une première version de notre article dans Git et on a associé le message _“ajout de l’article 1”_ à notre enregistrement.

Git est conçu selon un modèle de branches, un repository Git contient au minimum une branche (master), mais dans la pratique on a besoin de plusieurs branches.

![](https://miro.medium.com/max/1400/1*uiLZ-h0tlTazV92wFKOBxQ.png)

Dans le schéma ci-dessus chaque point bleu représente un commit, la branche épaisse est la branche principale qui porte le nom “master” et contient 5 commits.

La branche “brache\_1” a comme base le 3 ème commit de la branche “master” et contient 3 commits propres à elle seule.

la branche “branche\_2” a comme base le 4ème commit de la branche “master” et contient 3 commits propres à elle seule.

Revenons à notre exercice :

Tapez la commande suivante :

```
git log
```

![](https://miro.medium.com/max/1400/1*aaxN81NYA7O_OnHhsXIq1g.png)

La commande git log permet d’afficher les derniers commits effectués, on remarque un long identifiant alphanumérique pour notre commit, cet identifiant est unique à un commit ( il permet d’identifier notre enregistrement, l’ID généré sur votre terminal est certainement différent du mien) par contre il n’est pas facile de mémoriser un tel identifiant par un humain, pour cette raison on peut utiliser les tag de Git (le mot tag veut dire étiquette).

```
git tag v1.0.0 727ef82c26a75cba962757d1c9524a6f1030b825
```

Puis on tape la commande git log:

```
git log
```
![](https://miro.medium.com/max/1400/1*wuZeckIelDL60MWbONC76w.png)

On remarque l’apparition du tag **v1.0.0** sur notre commit initial.

Maintenant créons une nouvelle branche :

```
git checkout -b branche\_1
```

La commande ci-dessus permet d’abord de créer une nouvelle branche portant le nom “branche\_1” puis de se positionner dessus pour les prochains commit, càd que les prochains commits seront seulement sur la branche “branche\_1” et pas sur la branche précédente “master”.

Maintenant on va créer un nouveau fichier portant le nom “article-2.txt” puis on va l’ajouter à l’index puis le commiter.

```
echo "contenu de l'article 2" >> article-2.txt  
git add article-2.txt  
git commit -m "ajout de l'article 2"
```

Vérifions le contenu de notre dossier avec la commande ls :

```
ls  
article-1.txt      article-2.txt
```

On retrouve les deux fichiers article-1.txt et article-2.txt.

Maintenant on souhaite revenir sur notre branche précédente “master”, pour cela on fait un checkout :

```
git checkout master
```

En faisant “git checkout master” on reviens sur le dernier commit de la branche “master”.

Vérifions le contenu de notre dossier avec la commande ls :

```
ls  
article-1.txt
```

On ne retrouve que “article-1.txt” car en faisant “git checkout master” on est revenu à l’état de notre repository au dernier commit de la branche “master”.

Maintenant on va modifier le contenu du fichier “article-1.txt”, puis on va enregistrer ces modifications dans un nouveau commit :

```
echo "modification du contenu de l'article 1." >> article-1.txt  
git add article-1.txt  
git commit -m "modifications sur article 1."
```

La commande ci-dessous permet d’afficher le graphe Git qui représente nos branches et commits:

```
git log --all --decorate --oneline --graph
```

![](https://miro.medium.com/max/1400/1*nYSVT68ARr7oZAvmipIIxA.png)Chaque \* représente un commit

Maintenant on souhaite que le contenu de la branche “branche\_1”soit récupéré dans la branche “master”, pour cela on utilise la commande “git merge”:

```
git merge branche\_1
```

![](https://miro.medium.com/max/1400/1*wyW4sRPVpL3ODvMukMzNZg.png)

On saisit la commande ls, et on retrouve le fichier article-2.txt qui était créé dans la branche “branch\_1” :

```
ls  
article-1.txt        article-2.txt
```

On réaffiche le graphe de nos branches et commits:

```
git log --all --decorate --oneline --graph
```![](https://miro.medium.com/max/1400/1*vLaLa7uQva1MNbMd1lnJ2Q.png)Chaque \* représente un commit

On remarque que notre branche “branche\_1” a été fusionnée **dans** la branche “master”, c’est pour cette raison qu’on retrouve le fichier “article-2.txt” dans la branche “master”.

Maintenant qu’on a mergé la branche “branche\_1” on peut la supprimer:

```
git branch -d branche\_1
```

2\. Gitlab
==========

Dans cette partie nous allons envoyer le contenu de notre blog sur un serveur distant (Gitlab), de cette façon nous allons sauvegarder notre travail dans le cloud et on peut le partager avec nos équipes.

*   Créez un compte Gitlab sur [https://gitlab.com/](https://gitlab.com/)
*   Cliquez sur “Create a project”
*   Remplissez les champs comme ci-dessous puis cliquez sur “Create project”

![](https://miro.medium.com/max/1400/1*DXCiHO1_2tUqM6pDEOQXFg.png)

> Il est possible d’interagir avec Gitlab via deux protocoles, HTTPS et SSH, la méthode recommandée est en SSH.

Pour que vous puissiez interagir avec le serveur Gitlab, il vous faudra ajouter une clé SSH à votre profil, cliquez sur “Add SSH key”:

![](https://miro.medium.com/max/1400/1*SWvcZ_5LFgvEsp6GYa161A.png)

Attention si vous avez déjà une clé SSH dans votre dossier ~/.ssh vous n’avez pas besoin de taper la commande ci-dessous, dans le cas contraire tapez la commande suivante, puis appuyez sur “Entrer” plusieurs fois:

```
ssh-keygen
```

Puis tapez la commande :

```
cat ~/.ssh/id\_rsa.pub
```

Copiez le texte qui s’affiche puis collez le dans le champ “key” de l’interface Gitlab, ensuite cliquez sur “add key”.

Vous devriez avoir un résultat qui ressemble à ça :

![](https://miro.medium.com/max/1400/1*DapWQEoifn0P9rT77fXxHw.png)

Maintenant vous pouvez lier votre dépôt local avec le dépôt distant (Gitlab), pour cela revenez sur votre projet “mon\_blog” sur Gitlab, et cliquez sur “clone” et copiez l’URL qui s’affiche en dessous de “Clone with SSH”.

Revenez sur git bash et dans votre projet “mon\_blog” tapez la commande ci-dessous en adaptant la valeur de l’URL SSH avec celle que vous avez copié:

```
git remote add origin git@gitlab.com:mecheri.akram/mon\_blog.git
```

Pour envoyer le contenu de votre dépôt local vers le dépôt distant vous faites :

```
git push --set-upstream origin master
```

Actualisez la page web de Gitlab, vous verrez vos articles apparaitre !

![](https://miro.medium.com/max/1400/1*SmJvoX7VWC1tZunKoVNNvQ.png)

Maintenant on va prendre le chemin inverse, càd qu’on va créer un article sur l’interface web de Gitlab et on le récupérera dans notre dépôt local:

Sur l’interface Web de Gitlab :

*   Cliquez sur +
*   New file
*   Remplissez comme ci-dessous
*   Puis cliquez sur “Commit changes”

![](https://miro.medium.com/max/1400/1*EZsjT9od5FWUlV19IAB5ew.png)

Maintenant on a un 3ème article rédigé sur Gitlab.

![](https://miro.medium.com/max/1400/1*cRYO1ndJK-ol0vCbHoNRTw.png)

Pour récupérer l’article sur notre dépôt local :

```
git pull
```

Puis on vérifie le contenu de notre dépôt local:

```
ls  
article-1.txt     article-2.txt     article-3.txt
```

On retrouve le fichier article-3.txt qu’on a créé sur Gitlab.

Et voilà tout pour ce petit cours Git / Gitlab, vous êtes censé maintenant connaitre assez de commandes Git pour versionner vos fichiers, vous savez aussi comment envoyer ces fichiers sur un dépôts distant.

Pour aller plus loin je vous invite à explorer les commandes Git suivantes:

```
git diff  
git rebase  
git fetch  
git --help
```

Si vous souhaitez un cours plus approfondi sur Git et Gitlab, faites le moi savoir dans la section des commentaires, si ce cours vous a été utile n’hésitez pas à cliquer sur le bouton applaudissement 👏.