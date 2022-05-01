---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import Image from '@comps/Image.astro'
  import NewsLetter from '@comps/NewsLetter.astro'
  import img1 from '@assets/blog/tech/20220430-svg-as-angular-template/1.avif'
title: Use SVG as Angular Template
publishDate: April 30, 2022
authorName: '@FrenchTechLead'
authorSocial: 'https://twitter.com/FrenchTechLead'
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220430-svg-as-angular-template/0.jpg
postImageLocal: /assets/blog/tech/20220430-svg-as-angular-template/0.avif
postImageAlt: Use SVG as Angular Template
postImageWidth: 600
postImageHeight: 327
keywords:
  - Angular
  - Templates
  - SVG
  - Figma
permalink: https://frenchtechlead.com/posts/tech/20211027-java-memory-management/
description: 'This article we explain how to use Angular SVG Components to create a dynamic diagrams, we discuss the pros and cons of this approach and we also give some tips to help you to get started whith Angular SVG Components.'
draft: false
---

One of the least known features of **Angular** is its capability to handle **SVGs** as **Templates**, most people use **HTML** as the templating language for their components, but do you know that you can use **SVG** as well? I didn't ! until I came across a situation where I had to represent a very complicated and dynamic **network diagram** the same way it was designed on the **Figma** Mockup by the UI Team of my company.

<Separator/>


SVG templates in Angular
----------------

> Just like **HTML**, **SVG** consists of a **DOM** tree of elements that can be styled, scripted and animated using **CSS** and **Javascript**, **SVG** elements can dispatch **Javascript** events in response of user interaction.  by combining **SVG** and **Angular**, you can easily enhance mobile and web applications with interactive controls and states.  
Using **SVG** based templates in **Angular** supercharges the **SVG** images by the power of **Angular** framework, all the cool functionalities such as **property binding**, **event binding**, **directives** ,**inputs and outputs** and so on, make **SVG** images interactive, dynamic, responsive and strongly typed !

<Separator/>

Why using SVG as Angular template?
----------------
In my squad, we didn't think of using **SVG** to represent the **network diagram** at first because we didn't know it was possible to dynamically change the **network diagram** based on the **network state**, so we tried at first to represent the **network diagram** using some javascript libraries but the result wasn't satisfying for our stakehoders as it wasn't complitly the same as represented on the **Figma** Mockup, the problem  was that most libraries automatically calculate the positions of the elements of the network and it's not possible to have the same positions as on the **Figma** Mockup.  
One of the stakehoders asked us a simple question :
> Can't you just take an image of the network diagram and overlay the data on top of it?  

Well i thought it was a brilliant idea 💡  
And that's how i came up with the idea of using **SVG** as **Angular** template.  
The actual **network diagram** is a property of my previous company, so I'll use a different diagram to illustrate the idea.

<Separator/>

Example of an Angular SVG Template
----------------
To illustrate the idea i'll start by creating a simple **SVG** image on **Figma** and export it as **.svg** file. 
<Image w="800" h="660" t="Figma mockup export to SVG" src={img1}/>
The corresponding Dom tree is as follows:
```xml
<svg width="400" height="400" >
  <rect width="400" height="400" fill="white"/>
  <circle cx="58" cy="56" r="40" fill="red"/>
  <circle cx="347" cy="345" r="40" fill="green"/>
  <path d="M313.993 320.5C314.822 320.504 315.496 319.835 315.5 319.007L315.559 305.507C315.563 304.678 314.894 304.004 314.065 304C313.237 303.997 312.563 304.665 312.559 305.494L312.507 317.493L300.507 317.441C299.678 317.437 299.004 318.106 299 318.934C298.997 319.763 299.665 320.437 300.494 320.441L313.993 320.5ZM84.9347 90.056L312.935 320.056L315.065 317.944L87.0653 87.944L84.9347 90.056Z" fill="black"/>
</svg>
```
As you can see, the **SVG** image is a 400x400 pixels frame containing a **circle** with a **green** fill, and a **red** circle with a **black** stroke, you don't even need to be familiar with **SVG** to understand the Dom tree 😉  
So let's now play with this image and see how it can be used in **Angular**. 

First, lets create an Angular component that use the above **SVG** image as a template.

```typescript
// app.component.ts
@Component({
  selector: 'my-app',
  template: 'app.component.svg',
})
export class AppComponent {}
```

```xml
<!-- app.component.svg -->

<svg width="400" height="400" >
  <rect width="400" height="400" fill="white"/>
  <circle cx="58" cy="56" r="40" fill="red"/>
  <circle cx="347" cy="345" r="40" fill="green"/>
  <path d="M313.993 320.5C314.822 320.504 315.496 319.835 315.5 319.007L315.559 305.507C315.563 304.678 314.894 304.004 314.065 304C313.237 303.997 312.563 304.665 312.559 305.494L312.507 317.493L300.507 317.441C299.678 317.437 299.004 318.106 299 318.934C298.997 319.763 299.665 320.437 300.494 320.441L313.993 320.5ZM84.9347 90.056L312.935 320.056L315.065 317.944L87.0653 87.944L84.9347 90.056Z" fill="black"/>
</svg>
```

Let's then play a little bit whith this component as follows:
1. Export the data of the path element as a property binding to have a cleaner template.
2. Bind the colors of the circles to properties of the component.
3. Handle the click event of the circles by using the **event binding** and update the colors of the circles on click event.
4. Add a **\*ngFor** directive to a text element to loop over an array of labels and display them dynamically.

The resulting component and template are as follows:

```xml
<!-- app.component.svg -->

<svg width="400" height="400">

  <rect width="400" height="400" fill="white"/>
  <circle cx="58" cy="56" r="40" 
      [attr.fill]="color1" (click)="onCircleOneClick()"/>

  <circle cx="347" cy="345" r="40" 
      [attr.fill]="color2" (click)="onClircleTwoClick()"/>

  <path [attr.d]="pathData" fill="black"/>

  <text
    *ngFor="let e of labels"
    font-family="Arial"
    font-size="38"
    [attr.x]="e.x"
    [attr.y]="e.y"
    fill="white"
  > {{e.label}}
  </text>
  
</svg>
```


```typescript
// app.component.ts

@Component({
  selector: 'my-app',
  template: 'app.component.svg',
})
export class AppComponent {
  colors = ['red', 'green', 'black', 'blue', 'brown'];
  color1 = this.colors[0];
  color2 = this.colors[1];
  pathData =
    'M313.993 320.5C314.822 320.504 315.496 319.835 315.5 319.007L315.559 305.507C315.563 304.678 314.894 304.004 314.065 304C313.237 303.997 312.563 304.665 312.559 305.494L312.507 317.493L300.507 317.441C299.678 317.437 299.004 318.106 299 318.934C298.997 319.763 299.665 320.437 300.494 320.441L313.993 320.5ZM84.9347 90.056L312.935 320.056L315.065 317.944L87.0653 87.944L84.9347 90.056Z';

  labels: SvgTexts[] = [
    {
      label: '0',
      x: 48,
      y: 70,
    },
    {
      label: '1',
      x: 337,
      y: 360,
    },
  ];
  onCircleOneClick() {
    const randomIndex = this.getRandomColorIndex();
    this.color1 = this.colors[randomIndex];
    this.labels[0].label = randomIndex.toString();
  }

  onClircleTwoClick() {
    const randomIndex = this.getRandomColorIndex();
    this.color2 = this.colors[randomIndex];
    this.labels[1].label = randomIndex.toString();
  }

  getRandomColorIndex(): number {
    return Math.floor(Math.random() * this.colors.length);
  }
}

interface SvgTexts {
  label: string;
  x: number;
  y: number;
}
```

<Separator/>

Run Angular SVG Component on Stackblitz:
---------------------------------------------------------------------------------------------------
You can run now the component on Stackblitz by following this link : [Angular SVG Template](https://stackblitz.com/edit/angular-ivy-w68tpr?file=src/app/app.component.svg)


<Separator/>

Pros of using Angular SVG Components
----
You can have many advantages when using Angular SVG Components instead of a diagram javascript library.
1. Compliance with the Mockup provided by the UI squad (ISO Mockup).
2. Much more control on the elements of the diagram (hadle clicks, dynamic data binding ...).
3. No need to develop the diagram from scratch as you can use the provided template.
4. No need to add a heavy JS library to your project.
5. Gain of performance due to the fact that most of the SVG elements part of the first paint content of the component and don't need calculations to be rendered.
6. You don't have to learn a new library to use diagrams in your project (the learning curve of such a library is often an S-Curve).
7. SVG is basically XML, if you know HTML you know SVG too.

<Separator/>

Cons of using Angular SVG Components
----
On the other hand, you can have some disadvantages when using Angular SVG Components.
1. The maintance of the template is more difficult.
2. Little changes on the mockup might cause big ones on the template (No automatic calculations are done on the rendering phase to position the elements).
3. You create a dependency on the UI team that provides the mockup.
4. You need to mannually handle zoom events. (this is covred by JS diagram libraries out of the box).

> If you wanna handle zoom events I suggest you to try [panzoom](https://github.com/anvaka/panzoom) which does the job really well.

<Separator/>

Final thoughts,
----
In this article we explained how to use Angular SVG Components to create a dynamic diagram, we discussed the pros and cons of this approach and we also gave some tips to help you to get started.  We hope that you will find this article useful and that you will be able to create your own diagrams with Angular SVG Components.  
**That’s it**, if you find this article interesting don’t hesitate to let me a comment and/or hit the 👏 button below.