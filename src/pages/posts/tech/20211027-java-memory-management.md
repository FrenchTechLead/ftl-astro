---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
  import SVG2 from '@svg/20211027-java-memory-management/SVG2.astro'
  import SVG3 from '@svg/20211027-java-memory-management/SVG3.astro'
  import SVG4 from '@svg/20211027-java-memory-management/SVG4.astro'
  import SVG5 from '@svg/20211027-java-memory-management/SVG5.astro'
  import SVG6 from '@svg/20211027-java-memory-management/SVG6.astro'
  import SVG7 from '@svg/20211027-java-memory-management/SVG7.astro'
  import SVG8 from '@svg/20211027-java-memory-management/SVG8.astro'
title: Java Memory Management
publishDate: October 27, 2021
authorName: '@FrenchTechLead'
authorSocial: 'https://twitter.com/FrenchTechLead'
postImageUrl: https://frenchtechlead.com/assets/blog/tech/20211027-java-memory-management/1.png
postImageLocal: /assets/blog/tech/20211027-java-memory-management/1.png
postImageAlt: 'Java Memory Management'
permalink: https://frenchtechlead.com/posts/tech/20211027-java-memory-management/
description: "In this short article, I’ll try to briefly explain how Java manages Random Access Memory (RAM), explaining the basics of garbage collecting, the two main Memory types in Java, Memory Leaks: how to diagnose them and how to ensure that your application handles the memory the right way."
---

In this short article, I’ll try to briefly explain how Java manages Random Access Memory (RAM), explaining the basics of garbage collecting, the two main Memory types in Java, Memory Leaks: how to diagnose them and how to ensure that your application handles the memory the right way.

<Separator />

## Types of memories in a computer

| Type                       | Usage                                                                                                                                   |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Read Only Memory (ROM)     | - Read Only.<br /> - Required for computer startup, BIOS.                                                                               |
| Disc Memory (HDD/SDD)      | - Read/Write.<br /> - Contains large files, eg: Operation Systtem, multimedia files, etc.<br/> - Low R/W speed.                         |
| Random Access Memory (RAM) | - Read/Write.<br /> - Its content is deleted on restart.<br/> - Necessary for the operation of any application. <br/> - High R/W speed. |

We find in a computer three main types of memories, **Read-Only Memory (ROM)** is physically contained on the motherboard of the computer, it contains the programming needed to start a PC, which is essential for boot-up; it performs major input/output tasks and holds programs or software instructions, on the other hand, **Disc Memory** is used for containing large files such as operating systems and multimedia files, it has a low Read/Write speed comparing to RAM.

**Random Access Memory (RAM)** is a volatile type of memory, which means that its content is not permanent, it only exists for a short period of time during the execution of software, in other words, RAM provides storage for input data that the processor handles and storage for the resulting output data.

<Separator />

## How does the JVM use RAM?
<SVG2/>
The Java Virtual Machine (JVM) uses RAM memory in two main ways, the first one is the **Stack**, it’s an ordered data structure that can be compared to books that are put one on top of each other, the second one is **Heap** which has no particular order.

<SVG3/>
Actually, there are N number of stacks per Java process, where N is equal to the number of Java threads being executed, **1 Thread = 1 Stack.**

On the other hand, there is only **one Java Heap per Java process.**

<Separator/>

## Stack
Let's take a look at the following program :
```java
public class Stack {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        if(a == 10) {
          int c = a + b;
        }
    }
}
```
<SVG4/>
Stack memory is always referenced in **LIFO (Last-In-First-Out)** order. **Whenever a method is invoked, a new block is created on top of the stack memory** for the method to hold local primitive values and reference to other objects in the method, As soon as the method ends, the block is popped from the top of the stack, Stack memory size is very less compared to Heap memory.

<Separator/>

## Heap
Let's take a look at the following program :
```java
public static void main(String[] args) {
    int x = 1;
    int y = 2;
    String name = "FrenchTechLead";
}

```
<SVG5/>
The above example represents the state of the Stack and the heap on the execution of the last line of code of the main method, we notice that the first instructions are on the bottom of the Stack and the last one on the top of it, we also notice that the Stack holds primitive values and references to non-primitive types that are stored on the Heap memory.

<Separator/>

## StackOverFlowError
Let's take a look at the following program :
```java
public static void main(String[] args) {
    toto();
}
public static void toto() {
    toto();
}
```
The above program will cause a **StackOverFlowError** because **toto()** method is called recursively without a stop condition.

<SVG6/>
**StackOverflowError** is a very common error in Java and in programming in general, it happens when the **Stack** memory is overflowed with content.

Like we said before every method invocation creates a block on the top of the stack memory, and since the program of the example above recursively invokes the **toto()** method with no stop condition, it causes a **StackOverFlow** error.

<Separator/>

## OutOfMemoryError
Let's take a look at the following program :
```java
public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    while(true) {
        list.add(new String("FrenchTechLead"));
    }
}
```
The above program will cause an **OutOfMemoryError** it keeps adding new **String** instances until there is no more **Heap** memory available.
<SVG7/>
**OutOfMemoryError** is another common error in the Java world, it concerns the heap memory and happens when there is no more heap space to allocate for new objects, the above program creates new entries in a List of Strings until there is no more heap space for it.

<Separator/>

## Memory Leaks
<SVG8/>
**Java memory leak** happens when an application unintentionally (due to logical errors in code) holds on to object references that are no longer required. These unintentional object references prevent the built-in Java garbage collection mechanism from freeing up the memory consumed by these objects.

<Separator/>

## Performing a Heap Dump with Intellij
There are several ways to perfom a JVM Heap Dump using one of the many tools of the Java eco-system, most of the tools are prety similars, so what’s we’re going to see here with Intellij can be done with any other tool such as VisualVM or JDK Mission control …

> The infinit loop of the following program will allow the java process to be running while we perform the Heap Dump.

```java
public class Main {

  static String str = "";
    public static void main(String[] args) {
      int i = 0;
        while (true) {
          if(i < 2000)
            str += i + "-";
          i++;
    }
  }
}
```
Let’s run this simple program in Intellij’s IDE, and perform a Heap Dump using the default profiler of Intellij:
![intellij's Profiler](/assets/blog/tech/20211027-java-memory-management/9.png "intellij's Profiler")

When capturing a memory snapshot of the running process, intellij will create a .hprof file and parse it in the following tab :
![intellij's Profiler result](/assets/blog/tech/20211027-java-memory-management/10.png "intellij's Profiler result")
We observe that the largest object of our program is of type **Main** (the class we created), and that’s because it contains large static field **str**.

This view shows the state of the heap memory when the heap dump was performed, this helps a lot for analyzing memory leaks in large apps, we observe that there are a lot of objects loaded on the heap by **JDK** for our simple Java program, we must then pay attention when including libraries to our Java apps because they can overload the heap memory.

<Separator/>

There are several good practices and must-dos when it comes to writing memory efficient Java code, the following are some of them :

## Java good practice 1
Always declare variables in **the smallest possible scopes**, so that they are picked up by the Garbage Collector as soon as possible.
```java
// Bad Code ❌
public static void main(String(] args) {
  Random rand = new Random();
  float f = rand.nextFloat();
  for (int i = 0; i < args.length; i++) {
    if(i == 3){
      System.out.println(f);
    }
  }
}
```
```java
// Good Code ✅
public static void main(String(] args) {
  for (int i = 0; i < args.length; i++) {
    if(i == 3){
      Random rand = new Random();
      float f = rand.nextFloat();
      System.out.println(f);
    }
  }
}
```
## Java good practice 2
**The use of static attributes and methods must be justified.**

Java objects are created at their instantiation and destroyed after they are dereferenced. static attributes and methods are created when their class is loaded by the classLoader, and are only destroyed when the classLoader is itself picked up by the GC, for these reasons you need to use static fields/methods only when it’s convenient.

## Java must do (Always close IO Streams)
```java
static String readFirstLineFromFile(String path) throws IOException {
	try (FileReader fr = new FileReader(path);
	     BufferedReader br = new BufferedReader(fr)) {
	    return br.readLine();
	}
}
```
You need to make sure to close IO Streams after using them, you can do so by closing the Stream in a **finally** block following a **try-catch** statement or by using a **try-with-resources** statement, but for that, you need to make sure that your IO Stream implements the **Autocloseable** interface.

## Maven good practices
**Add only reliable dependencies.**  
Make sure that the libraries that you use in your project are reliable, maintained, and well designed, some libraries might cause memory leaks under the hood.

**The addition of a dependency in a project must be justified.**  
You need to make sure that the dependencies you are using in your project are necessary, you don’t add a whole Maven library to only consume one method of it because this will only add unnecessary entries to your classpath.

**Adapt the maven dependency scopes (test / runtime / compile …).**  
This will make sure that the dependency is added to the classpath at the convenient scope, eg: a test library is needed only during the test stage and doesn’t have to be loaded by the classloader during the runtime of your Java app.

```xml
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.18.22</version>
  <scope>provided</scope>
</dependency>

<dependency>
  <groupId>org.fluentlenium</groupId>
  <artifactId>fluentlenium-festassert</artifactId>
  <version>0.13.2</version>
  <scope>test</scope>
</dependency>
```
## JVM good practices
- Define the amount of memory reserved for the initialization of the JVM ex: **-Xms256m**
- Define the max memory size that the JVM can allocate ex: **-Xmx2048m**
- Define the Garbage Collector execution mode that best suits your configuration ex: **-XX: + UseSerialGC**

<Separator/>

**That’s it**, if you find this article interesting don’t hesitate to let me a comment and/or hit the 👏 button below.

