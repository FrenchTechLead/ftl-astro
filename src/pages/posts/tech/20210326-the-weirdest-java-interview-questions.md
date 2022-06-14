---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import Image from '@comps/Image.astro'
title: The Weirdest Java Interview Questions
publishDate: March 26, 2021
authorName: "@FrenchTechLead"
authorSocial: "https://twitter.com/FrenchTechLead"
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20210326-the-weirdest-java-interview-questions/1.jpg
postImageAlt: The Weirdest Java Interview Questions
postImageWidth: 842
postImageHeight: 462
keywords:
  - Java
  - Java Interview Questions
  - Weirdest Java Interview Questions
permalink: https://frenchtechlead.com/posts/tech/20210326-the-weirdest-java-interview-questions/
description: "This is a post that gathers the weirdest Java interview questions that I personally faced during job interviews or heard of during my career as a Software Engineer."
draft: false
---

This is a post that gathers the weirdest Java interview questions that I personally faced during job interviews or heard of during my career as a Software Engineer.

<Separator/>

## 1\. Print Hello World without using any semicolon :

> **Question 1.** Can you write a `Hello World` program without using any **semicolon**?

When I first heard this question I found it really funny, I was asking myself what would be the benefit of knowing such a trick? Would that make me a better programmer?

Well, No this has nothing to do with being a better programmer, but it highlights someone’s ability to think out of the box.

<Separator/>

**Answer 1.** Here is one way to do it :

```java
public static void main(String[] args) {
   if(System.out.printf("Hello World") == null) {}
}
```

The `printf` method not only prints a `String` to the standard output stream `System.out` but it also returns a `PrintStream` object representing this standard output stream, we can make a `null` condition check inside an `if` statement to achieve our goal.

<Separator/>

## 2\. The Weird Integer Type :

> **Question 2.** What’s the output of the following code?

```java
public static void main(String[] args) {
  Integer a = -1;
  Integer b = -1;
  System.out.println(a == b);
  Integer C = 1000;
  Integer d = 1000;
  System.out.println(c == d);
}
```

Intuitively, most people would say that the output is :

```bash
false
false
```

Arguing that **a, b, c, d** are not primitive types so they should not reference the same memory slots.

Actually, the output is:

```bash
true
false
```

**Answer 2.** Explanation :

This is because The `Integer` type keeps a cache of all objects with a value in the range of **-128** to **127** for performance reasons. So when you declare new variables in that range, you’re actually referring to the same object.

<Separator/>

## 3\. Checked VS Unchecked Exceptions :

> **Question 3.** Is the following code valid?

```java
// Snippet 1
interface A {
  public void method1() throws FileNotFoundException;
}

class B implements A {
  @Override
  public void method1() throws Exception {}
}
```

```java
// Snippet 2
interface C {
  public void method2() throws ArithmeticException;
}

class D implements C {
  @override
  public void method2() throws RuntimeException{}
}
```

**Answer 3.** Considering the following `Exception` Hierarchy :

```d
    ┌───────────┐
    │ Throwable │
    └─────▲─────┘
          │
    ┌─────┴─────┐
    │ Exception │◄─────────────────┐
    └─────▲─────┘                  │
          │                        │
┌─────────┴────────┐    ┌──────────┴────────────┐
│ RuntimeException │    │ FileNotFoundException │
└─────────▲────────┘    └───────────────────────┘
          │
┌─────────┴───────────┐
│ ArithmeticException │
└─────────────────────┘
```

Exceptions are categorized into two sections: **checked exceptions** like `FileNotFoundException` and **unchecked exceptions** like `ArithmeticException` .

**Checked exceptions** are checked by the Java compiler**,** Java forces you to handle these errors directly in your code in a `try/catch` block, ignoring them is a very bad practice in Java.

**Unchecked Exceptions** are subclasses of `RuntimeException` they are not checked by the compiler and they might occur in your program, once any buggy code is executed.

The overriding method can not throw a higher `Exception` than the original. So if the original method throws `FileNotFoundException` , then the overriding method can not throw a superclass of `FileNotFoundException` e.g. `Exception` but it can throw any subclass of `FileNotFoundException` or simply does not throw any `Exception`. This rule only applies to **checked Exception** in Java, overridden method is free to throw any **unchecked Exception**.

So, Snippet 1 is **not valid** and Snippet 2 is **valid**!

<Separator/>

## 4\. Enums and Lambda expressions :

> **Question 4.** Refactor the following code (from **L24** to **L38**) in order to export the calculation logic in a Java `enum` having some Lambda expressions.

```java
class Calculator {

    public static void main(String[] args) {

        List <String> entries = new ArrayList <> ();
        entries.add("3 + 5");
        entries.add("4 - 1");
        entries.add("6 / 2");
        entries.add("3 * 2");

        entries.forEach(entry -> {

            String[] splited = entry.split("\\+|\\-|\\/|\\*");
            int left = new Integer(splited[0].trim());
            int right = new Integer(splited[1].trim());
            String symbol = entry.replaceAll("[0-9]|\\s", "");

            int result = 0;
            switch (symbol) {
                case "+":
                    result = left + right;
                    break;
                case "-":
                    result = left - right;
                    break;
                case "*":
                    result = left * right;
                    break;
                case "/":
                    result = left / right;
                    break;
            }
            System.out.println(entry + " = " + result);
        });
    }
}
// Gotta love these Regex ❤
```

This is an exercise that I miserably failed, especially because I couldn’t imagine how I would put a lambda expression inside an `enum`, that’s something that I never saw in a production running code.

Later, I was able to better understand Lambda expressions thanks to the following definition from **Oracle** :

> Lambda expressions let you express **instances** of single-method classes more compactly.

Most of the time we use Lambda expressions with the `Stream` API to transform a stream of data on the fly, this is so tricky because it hides the fact that a Lambda expression is just a compact representation of an **instance** of a functional interface.

_So How would we refactor the code?_

**Answer 4.** This can be achieved by implementing the @FunctionalInterface IntBinaryOperator with a Java `enum`.

_Let’s see how :_

```java
class Calculator {
    public static void main(String[] args) {

        List < String > entries = new ArrayList <>();
        entries.add("3 + 5");
        entries.add("4 - 1");
        entries.add("6 / 2");
        entries.add("3 * 2");

        entries.forEach(entry -> {

            String[] splited = entry.split("\\+|\\-|\\/|\\*");
            int left = new Integer(splited[0].trim());
            int right = new Integer(splited[1].trim());
            String symbol = entry.replaceAll("[0-9]|\\s", "");

            int result = 0;
            for (Operation op: Operation.values()) {
                if (op.getSymbol().equals(symbol)) {
                    result = op.applyAsInt(left, right);
                    System.out.println(entry + " = " + result);
                }
            }

        });

    }
}

enum Operation implements IntBinaryOperator {
    PLUS("+", (l, r) -> l + r),
    MINUS("-", (l, r) -> l - r),
    MULTIPLY("*", (l, r) -> l * r),
    DIVIDE("/", (l, r) -> l / r);

    private final String symbol;
    private final IntBinaryOperator binaryOperator;

    private Operation(final String symbol, final IntBinaryOperator binaryOperator) {
        this.symbol = symbol;
        this.binaryOperator = binaryOperator;
    }

    public String getSymbol() {
        return symbol;
    }

    @Override
    public int applyAsInt(int left, int right) {
        return binaryOperator.applyAsInt(left, right);
    }

}
```

> The use of lambdas, in this case, reduces boilerplate considerably, though these are some very simple calculation methods, it would not be correct to use lambdas when the methods are complex and require a lot of code. It would just become cumbersome.

<Separator/>

## Final Thoughts :

Most of the code that you find here is for interview purposes only, I personally don’t think that you would ever have to write these snippets of code in real-world Java applications.

I’ll try to update this post as often as possible, if you know some more weird examples please feel free to relate them on the comment section, and if you like these kinds of articles hit the 👏 button below.
