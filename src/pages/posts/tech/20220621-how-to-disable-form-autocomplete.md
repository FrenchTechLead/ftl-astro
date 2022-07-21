---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import Image from '@comps/Image.astro'
  import img2 from '@assets/blog/tech/20220621-how-to-disable-form-autocomplete/2.png'
  import img3 from '@assets/blog/tech/20220621-how-to-disable-form-autocomplete/3.png'
title: How To Disable HTML Form Autocomplete
publishDate: June 21, 2022
authorName: '@FrenchTechLead'
authorSocial: 'https://twitter.com/FrenchTechLead'
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20220621-how-to-disable-form-autocomplete/0.png
postImageAlt: How To Disable HTML Form Autocomplete
postImageWidth: 842
postImageHeight: 462
keywords:
  - HTML Form Autocomplete
  - Google Chrome
  - Autofill
permalink: https://frenchtechlead.com/posts/tech/20220621-how-to-disable-form-autocomplete/
description: 'A Step By Step Guide on how to disable Autofill/Autocomplete HTML Forms with pure HTML and Angular.'
draft: false
---

Have you ever felt the frustration of Chrome’s form autocomplete suggesting values to your inputs that are not suitable to their context ?


<Separator/>

## Form Autocomplete in action:

### Example 1:

<label for="ex1">Click on the input below and see the autocomplete suggestions, Does it make sense ?</label><br/>

<input style="margin-top:20px;" placeholder="Name" name="name" id="ex1"/>

Well it does not make sense, because the suggestions are not relevant to the context of the input, For me Google Chrome is suggesting the following values to the input:

<Image w="385" h="339" src={img2} t="Input Autocomplete example" solo="true" />

Google Chrome is suggesting the above values based on the name attribute of the HTML input element.

```html
<input placeholder="Name" name="name" id="ex1"/>
```
Each time you submit a form containing an input having the **name attribute**, Google Chrome will save the submitted value to the browser’s local storage and will suggest the same value to the next input with the same **name** attribute.  
However, sometimes you want to disable this behavior, and have a clean and coherent experience for the user regardless of the value of the name attribute.

<Separator/>


## How to diable HTML Form Autofill / Autocomplete:
There are a lot of articles on the web that explain how to disable HTML Form Autofill / Autocomplete, but I wanted to share a step by step guide on how to find the right way to disable it, one great website using a pure HTML input that doesn't have the autocomplete bahaviour is https://google.com


<Image w="1110" h="492" src={img3} t="Google Search input" solo="true" />

By inspecting the Google Search input, we see that it has following attributes:

<input 
    name="name"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    title="Rechercher"
    >

```html
<input 
    name="q"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    title="Rechercher"
    >
```
> Other unrelated attributes were omitted for the sake of brevity.

So Google is using the above attributes in order to disable the browser's native autocomplete behaviour of the input, reagardless of the value of the name attribute with is always the same **(q)**.

<Separator/>

## Disabling HTML Form Autofill / Autocomplete with pure HTML:
Just do like Google and use the following **4** HTML Attributes:
```html
<input 
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    >
```

<Separator/>

## Disabling HTML Form Autofill / Autocomplete with Angular:
> It would be a boring and repeating task to put these **4** HTML attributes on all your HTML inputs, we can do better thanks to Angular **Directives**.

1. Start by generating a directive called **autocomplete-off** :
```
ng g d autocomplete-off
```
2. Then, paste the following code in **autocomplete-off.directive.ts**

```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autocompleteOff]'
})
export class AutocompleteOffDirective {
  constructor(private _el: ElementRef) {
    this._el.nativeElement.setAttribute('autocomplete', 'off');
    this._el.nativeElement.setAttribute('autocorrect', 'off');
    this._el.nativeElement.setAttribute('autocapitalize', 'off');
    this._el.nativeElement.setAttribute('spellcheck', 'false');
  }
}
```
3. Finally, you can use the directive directly on your inputs by specifying the directive’s selector :
```html
<input type="text" autocompleteOff />
```

This directive will put the **4** attributes on your inputs regardless of the browser being used, if you want to, you can edit the directive in order to add the attributes only if the browser is **Google Chrome**.

In order to turn off the autofill only for Google Chrome user agent, we start by detecting it, Google Chrome adds the attribute `chrome` to the global `window` object, we can check for this attribute in order to detect Google Chrome.

### The final code :

```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autocompleteOff]'
})
export class AutocompleteOffDirective {
  constructor(private _el: ElementRef) {
    let w: any = window;
    let isChrome = w.chrome;
    if (isChrome) {
      this._el.nativeElement.setAttribute('autocomplete', 'off');
      this._el.nativeElement.setAttribute('autocorrect', 'off');
      this._el.nativeElement.setAttribute('autocapitalize', 'off');
      this._el.nativeElement.setAttribute('spellcheck', 'false');
    }
  }
```

<Separator/>

Final thoughts,
----
If this article helped you get rid of the annoying Google Chrome form auto-fill, feel free to let a comment below, and/or hit the 👏 button.