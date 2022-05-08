[![MECHERI Akram](https://miro.medium.com/fit/c/96/96/1*NYffRVoBiReNSOZpoq8meA.png)

](https://medium.com/?source=post_page-----2ec8b24be8ff--------------------------------)[MECHERI Akram](https://medium.com/?source=post_page-----2ec8b24be8ff--------------------------------)Follow

Mar 26, 2021

·5 min read

[

Save

](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F2ec8b24be8ff&operation=register&redirect=https%3A%2F%2Ffrench-tech-lead.medium.com%2Fthe-weirdest-java-interview-questions-that-you-ever-heard-of-2ec8b24be8ff&source=--------------------------bookmark_header-----------)

The Weirdest Java Interview Questions That You Ever Heard Of
============================================================

![](https://miro.medium.com/max/1400/1*_ylEDFO3_rtwlcjkdg6Qvg.png)

This is a post that gathers the weirdest Java interview questions that I personally faced during job interviews or heard of during my career as a Software Engineer.

1\. Print Hello World without using any semicolon :
---------------------------------------------------

_Question 1. Can you write a Hello World program without using a single semicolon?_

When I first heard this question I found it really funny, I was asking myself what would be the benefit of knowing such a trick? Would that make me a better programmer?

Well, No this has nothing to do with being a better programmer, but it highlights someone’s ability to think out of the box.

_Answer 1. Here is one way to do it :_

![](https://miro.medium.com/max/1400/1*4GN3LIx2ujbl1Be3aAA05A.png)Weird Hello World

The `printf` method not only prints a `String` to the standard output stream `System.out` but it also returns a `PrintStream` Object representing this standard output stream, we can make a `null` condition check inside an `if` statement to achieve our goal.

2\. The Weird Integer Type :
----------------------------

_Question 2. What’s the output of the following code?_

![](https://miro.medium.com/max/1400/1*cDGoIVKN18ntK5NuiXMOEw.png)Hmm, so what’s the output ?

Intuitively, most people would say that the output is :

```
false  
false
```

Arguing that **a, b, c, d** are not primitive types so they should not reference the same memory slots.

Actually, the output is:

```
true  
false
```

_Answer 2. Explanation :_

This is because The `Integer` type keeps a cache of all objects with a value in the range of **\-128** to **127** for performance reasons. So when you declare new variables in that range, you’re actually referring to the same object.

3\. Checked VS Unchecked Exceptions :
-------------------------------------

_Question 3. Is the following code valid?_

![](https://miro.medium.com/max/1400/1*Gw3tvKn0ME8S9yDAJfBkFQ.png)Focus!

_Answer 3. Considering the following Exception Hierarchy :_

![](https://miro.medium.com/max/1400/1*6lL0tszTfuLap_vP9BBieg.png)Java Exception Hierarchy

Exceptions are categorized into two sections: **checked exceptions** like `FileNotFoundException` and **unchecked exceptions** like `ArithmeticException` .

**Checked exceptions** are checked by the Java compiler**,** Java forces you to handle these errors directly in your code in a `try/catch` block, ignoring them is a very bad practice in Java.

**Unchecked Exceptions** are subclasses of `RuntimeException` they are not checked by the compiler and they might occur in your program, once any buggy code is executed.

The overriding method can not throw a higher `Exception` than the original. So if the original method throws `FileNotFoundException` , then the overriding method can not throw a superclass of `FileNotFoundException` e.g. `Exception` but it can throw any subclass of `FileNotFoundException` or simply does not throw any `Exception`. This rule only applies to **checked Exception** in Java, overridden method is free to throw any **unchecked Exception**.

So, Snippet 1 is **not valid** and Snippet 2 is **valid**!

4\. Enums and Lambda expressions :
----------------------------------

_Question 4. Refactor the following code (from L24 to L38) in order to export the calculation logic in a Java Enum having some Lambda expressions._

![](https://miro.medium.com/max/1400/1*lqyLmEt4zwc720CJZ9Goqg.png)Gotta love these Regex ❤

This is an exercise that I miserably failed, especially because I couldn’t imagine how I would put a lambda expression inside an Enum, that’s something that I never saw in a production running code.

Later, I was able to better understand Lambda expressions thanks to the following definition from Oracle :

> Lambda expressions let you express **instances** of single-method classes more compactly.

Most of the time we use Lambda expressions with the `Stream` API to transform a stream of data on the fly, this is so tricky because it hides the fact that a Lambda expression is just a compact representation of an **instance** of a functional interface.

**_So How would we refactor the code?_**

_Answer 4. This can be achieved by implementing the_`_@FunctionalInterface IntBinaryOperator_` _with a Java_ `_enum_`_._

_Let’s see how :_

![](https://miro.medium.com/max/1400/1*VEBNgpOaM7nz494X5CBPPA.png)Is this even Java ???

The use of lambdas, in this case, reduces boilerplate considerably, though these are some very simple calculation methods, it would not be correct to use lambdas when the methods are complex and require a lot of code. It would just become cumbersome, [source code is available here](https://gist.github.com/FrenchTechLead/cf056c419f92c158b5b0e6e4fed3be0d).

Final Thoughts :
----------------

Most of the code that you find here is for interview purposes only, I personally don’t think that you would ever have to write these snippets of code in real-world Java applications.

I’ll try to update this post as often as possible, if you know some more weird examples please feel free to relate them on the comment section, and if you like these kinds of articles hit the 👏 button below.

**Stories from the same author :**
----------------------------------

[

How i created a new programming language based on Java ♨️
---------------------------------------------------------

### I graduated from college on 2017, one year later one of my professors asked me to come and teach some computer science…

mecheri-akram.medium.com

](https://mecheri-akram.medium.com/how-i-created-a-new-programming-language-based-on-java-%EF%B8%8F-f88d0a522cca)[

Build a web bot in 2 minutes 🤖
-------------------------------

### There is a ton of repetitive tasks that we can automate thanks to bots, in this article i’ll show you the easiest and…

mecheri-akram.medium.com

](https://mecheri-akram.medium.com/build-a-web-bot-in-2-minutes-ab278bd63e6c)[

Before learning Rest / Soap /GraphQL / you need to understand HTTP !
--------------------------------------------------------------------

### HTTP stands for Hypertext Transfer Protocol, initially created for web browser/server communication, it has many more…

mecheri-akram.medium.com

](https://mecheri-akram.medium.com/before-learning-rest-soap-graphql-you-need-to-understand-http-9eb80de6cfbf)